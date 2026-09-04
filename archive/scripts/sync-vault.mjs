#!/usr/bin/env node
/**
 * Sync Campaign Vault → Astro data for Session Archives + Campaign Hub.
 * Scans sessions/*, pcs/*, never copies keep-appendix.md.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "../..");
const campaignRel =
  process.env.TRPG_CAMPAIGN_PATH || "examples/vault/campaigns/demo-table";
const campaignDir = path.join(root, campaignRel);
const sessionsDir = path.join(campaignDir, "sessions");
const pcsDir = path.join(campaignDir, "pcs");
const hubVaultDir = path.join(campaignDir, "hub");

const dataRoot = path.join(__dirname, "../src/data");
const sessionsOut = path.join(dataRoot, "sessions");
const pcsOut = path.join(dataRoot, "pcs");
const hubOut = path.join(dataRoot, "hub");
const exportsOut = path.join(dataRoot, "exports");

const SESSION_ALLOW = [
  "recap.md",
  "unresolved-clues.md",
  "session.yaml",
  "archive-manifest.yaml",
];

const EXPORT_FILES = [
  "archive-manifest.yaml",
  "live-aid.md",
];

function read(p) {
  return fs.existsSync(p) ? fs.readFileSync(p, "utf8") : "";
}

function parseTitle(yamlText) {
  const zh = /zh-Hant:\s*(.+)/.exec(yamlText)?.[1]?.trim();
  const en = /^\s*en:\s*(.+)$/m.exec(yamlText)?.[1]?.trim();
  return { "zh-Hant": zh || "", en: en || zh || "" };
}

function parsePublishMode(manifest) {
  return /publish_mode:\s*(\w+)/.exec(manifest)?.[1] ?? "players";
}

function cluesFromMarkdown(md, sessionId) {
  const items = [];
  for (const line of md.split(/\r?\n/)) {
    const m = /^[-*]\s+(.+)/.exec(line.trim());
    if (!m) continue;
    items.push({
      session_id: sessionId,
      text: m[1].trim(),
      status: "open",
    });
  }
  return items;
}

function resetDir(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
}

function main() {
  if (!fs.existsSync(sessionsDir)) {
    console.error("No sessions dir:", sessionsDir);
    process.exit(1);
  }

  resetDir(sessionsOut);
  resetDir(pcsOut);
  resetDir(hubOut);
  resetDir(exportsOut);
  const legacySession = path.join(dataRoot, "session");
  if (fs.existsSync(legacySession)) {
    fs.rmSync(legacySession, { recursive: true, force: true });
  }

  const campaignYaml = read(path.join(campaignDir, "campaign.yaml"));
  const campaignId =
    /(?:^|\n)id:\s*([^\s]+)/.exec(campaignYaml)?.[1] ?? path.basename(campaignDir);

  const sessionIds = fs
    .readdirSync(sessionsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  const sessions = [];
  const allClues = [];

  for (const id of sessionIds) {
    const src = path.join(sessionsDir, id);
    const dest = path.join(sessionsOut, id);
    fs.mkdirSync(dest, { recursive: true });

    for (const name of SESSION_ALLOW) {
      const f = path.join(src, name);
      if (fs.existsSync(f)) {
        fs.copyFileSync(f, path.join(dest, name));
      }
    }
    if (fs.existsSync(path.join(src, "keep-appendix.md"))) {
      console.log(`ok: ${id}/keep-appendix.md not synced`);
    }

    const mediaDir = path.join(src, "media");
    const media = [];
    if (fs.existsSync(mediaDir)) {
      for (const name of fs.readdirSync(mediaDir)) {
        const full = path.join(mediaDir, name);
        if (fs.statSync(full).isFile()) media.push(name);
      }
    }
    fs.writeFileSync(
      path.join(dest, "media.json"),
      JSON.stringify({ files: media }, null, 2) + "\n",
      "utf8"
    );

    const exportDir = path.join(exportsOut, id);
    fs.mkdirSync(exportDir, { recursive: true });
    for (const name of EXPORT_FILES) {
      const f = path.join(src, name);
      if (fs.existsSync(f)) {
        fs.copyFileSync(f, path.join(exportDir, name));
      }
    }

    const sessionYaml = read(path.join(dest, "session.yaml"));
    const manifest = read(path.join(dest, "archive-manifest.yaml"));
    const cluesMd = read(path.join(dest, "unresolved-clues.md"));
    const title = parseTitle(sessionYaml) || parseTitle(manifest);
    const clues = cluesFromMarkdown(cluesMd, id);
    allClues.push(...clues);

    sessions.push({
      id,
      title,
      publish_mode: parsePublishMode(manifest),
      has_recap: fs.existsSync(path.join(dest, "recap.md")),
      clue_count: clues.length,
      media_count: media.length,
      href: `/sessions/${id}/`,
    });
    console.log("synced session", id);
  }

  const pcs = [];
  if (fs.existsSync(pcsDir)) {
    for (const name of fs.readdirSync(pcsDir)) {
      if (!/\.(md|yaml|yml)$/i.test(name)) continue;
      const src = path.join(pcsDir, name);
      const base = name.replace(/\.(md|yaml|yml)$/i, "");
      fs.copyFileSync(src, path.join(pcsOut, name));
      const body = read(src);
      const id = /(?:^|\n)id:\s*([^\s]+)/.exec(body)?.[1] ?? base;
      const title = parseTitle(body);
      if (!title["zh-Hant"] && !title.en) {
        const n = /(?:^|\n)name:\s*(.+)/.exec(body)?.[1]?.trim();
        title["zh-Hant"] = n || base;
        title.en = n || base;
      }
      // nested name: block
      const zhName = /name:\s*\n\s*zh-Hant:\s*(.+)/.exec(body)?.[1]?.trim();
      const enName = /name:\s*\n\s*zh-Hant:.*\n\s*en:\s*(.+)/.exec(body)?.[1]?.trim();
      if (zhName) title["zh-Hant"] = zhName;
      if (enName) title.en = enName;

      pcs.push({
        id,
        title,
        file: name,
        href: `/pcs/${id}/`,
        body,
      });
      console.log("synced pc", id);
    }
  }

  // Prefer vault hub clue-board only as override note; board is regenerated
  const boardLines = [
    "# Clue board",
    "",
    "Aggregated from sessions/*/unresolved-clues.md",
    "",
    "| Session | Clue | Status |",
    "|---------|------|--------|",
    ...allClues.map(
      (c) => `| ${c.session_id} | ${c.text.replace(/\|/g, "\\|")} | ${c.status} |`
    ),
  ];
  const boardMd = boardLines.join("\n") + "\n";
  fs.writeFileSync(path.join(hubOut, "clue-board.md"), boardMd, "utf8");
  fs.writeFileSync(
    path.join(hubVaultDir, "clue-board.md"),
    boardMd,
    "utf8"
  );

  const hub = {
    schema: "campaign-hub/v1",
    campaign_id: campaignId,
    locales: ["zh-Hant", "en"],
    generated_at: new Date().toISOString(),
    sessions,
    pcs,
    clues: allClues,
  };

  fs.writeFileSync(path.join(hubOut, "hub.json"), JSON.stringify(hub, null, 2) + "\n");
  fs.writeFileSync(
    path.join(hubVaultDir, "hub-manifest.yaml"),
    [
      "schema: campaign-hub/v1",
      `campaign_id: ${campaignId}`,
      "locales: [zh-Hant, en]",
      "sessions:",
      ...sessions.map(
        (s) =>
          `  - id: "${s.id}"\n    href: ${s.href}\n    title:\n      zh-Hant: ${JSON.stringify(s.title["zh-Hant"])}\n      en: ${JSON.stringify(s.title.en)}`
      ),
      "pcs:",
      ...(pcs.length
        ? pcs.map((p) => `  - id: ${p.id}\n    href: ${p.href}`)
        : ["  # none"]),
    ].join("\n") + "\n",
    "utf8"
  );

  console.log(
    `hub: ${sessions.length} session(s), ${pcs.length} pc(s), ${allClues.length} clue(s)`
  );
}

main();
