#!/usr/bin/env node
/**
 * Create empty vault shells (trpg-campaign-setup helper).
 *
 * Beginner bootstrap (create everything, no picking IDs):
 *   node scripts/setup_vault.mjs --vault <path> --bootstrap
 *
 * When a PDF/scenario arrives, rename placeholder defaults to a human-readable name:
 *   node scripts/setup_vault.mjs --vault <path> --rename-defaults \
 *     --title "碼頭燈籠" --from-file "Lantern_on_the_Pier.pdf"
 *   # optional short code: --code "A01" → folder "碼頭燈籠_A01"
 *
 * Targeted:
 *   node scripts/setup_vault.mjs --vault <path> --module my-mod --system coc7
 *   node scripts/setup_vault.mjs --vault <path> --campaign my-table --session 001
 *   node scripts/setup_vault.mjs --vault <path> --campaign my-table --embedded one-shot-id
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const PLACEHOLDER_MODULE = "starter-module";
const PLACEHOLDER_CAMPAIGN = "my-table";

function parseArgs(argv) {
  const out = {
    vault: null,
    module: null,
    campaign: null,
    session: null,
    embedded: null,
    system: "coc7",
    bootstrap: false,
    renameDefaults: false,
    fromFile: null,
    title: null,
    moduleId: null,
    campaignId: null,
    code: null,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const n = argv[i + 1];
    if (a === "--vault") out.vault = n;
    if (a === "--module") out.module = n;
    if (a === "--campaign") out.campaign = n;
    if (a === "--session") out.session = n;
    if (a === "--embedded") out.embedded = n;
    if (a === "--system") out.system = n;
    if (a === "--bootstrap") out.bootstrap = true;
    if (a === "--rename-defaults") out.renameDefaults = true;
    if (a === "--from-file") out.fromFile = n;
    if (a === "--title") out.title = n;
    if (a === "--module-id") out.moduleId = n;
    if (a === "--campaign-id") out.campaignId = n;
    if (a === "--code") out.code = n;
  }
  return out;
}

/**
 * Human-readable folder name (劇本名), not a URL slug.
 * Spaces → `_`. Only strips filesystem-illegal characters; keeps CJK and normal punctuation.
 */
function humanFolderName(raw) {
  if (!raw || !String(raw).trim()) return "";
  let s = String(raw).normalize("NFKC").trim();
  s = path.basename(s);
  s = s.replace(/\.(pdf|docx?|md|txt|rtf)$/i, "");
  s = s.replace(/[\s_]+/g, "_");
  // Windows-illegal + controls
  s = s.replace(/[<>:"/\\|?*\u0000-\u001f]/g, "");
  s = s.replace(/_+/g, "_").replace(/^_|_$/g, "");
  // Windows: no trailing dot
  s = s.replace(/\.+$/g, "");
  if (s.length > 80) s = s.slice(0, 80).replace(/_+$/g, "");
  return s;
}

function withOptionalCode(name, code) {
  const c = humanFolderName(code);
  if (!c) return name;
  if (name.includes(c)) return name;
  return `${name}_${c}`;
}

function uniqueFolderName(vault, kind, desired) {
  const parent = path.join(vault, kind === "module" ? "modules" : "campaigns");
  let id = desired;
  let n = 2;
  while (fs.existsSync(path.join(parent, id))) {
    id = `${desired}_${n}`;
    n += 1;
  }
  return id;
}

function rewriteFile(filePath, replacer) {
  if (!fs.existsSync(filePath)) return;
  const before = fs.readFileSync(filePath, "utf8");
  const after = replacer(before);
  if (after !== before) fs.writeFileSync(filePath, after, "utf8");
}

function yamlScalar(s) {
  if (s == null || s === "") return '""';
  // Safe unquoted: letters, digits, CJK, hyphen, underscore, dot — no spaces
  if (/^[\w.\u3400-\u9FFF-]+$/u.test(s)) return s;
  return JSON.stringify(s);
}

function yamlEscapeTitle(s) {
  return yamlScalar(s);
}

function displayTitleFromFile(fromFile) {
  const base = humanFolderName(fromFile);
  if (!base) return "";
  // Title field for humans: underscores → spaces
  return base.replace(/_/g, " ");
}

/**
 * Rename placeholder starter-module / my-table to a human-readable 劇本名.
 * Updates yaml ids, INDEX, and cross-references.
 */
function renameDefaults(vault, opts) {
  // Prefer 劇本名 (--title); else cleaned PDF/DOCX name; never kebab-slug / spaces.
  let moduleId = humanFolderName(
    opts.moduleId || opts.title || opts.fromFile || ""
  );
  if (!moduleId) {
    console.error("Need --title, --from-file, or --module-id to rename defaults");
    process.exit(1);
  }
  moduleId = withOptionalCode(moduleId, opts.code);
  let campaignId = opts.campaignId
    ? humanFolderName(opts.campaignId) || humanFolderName(String(opts.campaignId))
    : moduleId;
  if (opts.campaignId && !campaignId) {
    campaignId = moduleId;
  }

  const oldMod = path.join(vault, "modules", PLACEHOLDER_MODULE);
  const oldCamp = path.join(vault, "campaigns", PLACEHOLDER_CAMPAIGN);
  const hasMod = fs.existsSync(oldMod);
  const hasCamp = fs.existsSync(oldCamp);

  if (!hasMod && !hasCamp) {
    console.error(
      `No placeholders (${PLACEHOLDER_MODULE} / ${PLACEHOLDER_CAMPAIGN}) found under ${vault}`
    );
    process.exit(1);
  }

  if (hasMod) {
    if (fs.existsSync(path.join(vault, "modules", moduleId))) {
      moduleId = uniqueFolderName(vault, "module", moduleId);
    }
  }
  if (hasCamp) {
    if (!opts.campaignId) campaignId = moduleId;
    if (fs.existsSync(path.join(vault, "campaigns", campaignId))) {
      campaignId = uniqueFolderName(vault, "campaign", campaignId);
    }
  }

  const titleHint = (opts.title || "").trim();
  const fromDisplay = displayTitleFromFile(opts.fromFile);
  const zh =
    titleHint && /[\u3400-\u9FFF]/.test(titleHint)
      ? titleHint
      : /[\u3400-\u9FFF]/.test(moduleId)
        ? moduleId
        : "";
  const en =
    titleHint && /[A-Za-z]/.test(titleHint) && !/[\u3400-\u9FFF]/.test(titleHint)
      ? titleHint
      : fromDisplay && /[A-Za-z]/.test(fromDisplay)
        ? fromDisplay
        : "";

  const idYaml = (id) => yamlScalar(id);

  if (hasMod) {
    const newMod = path.join(vault, "modules", moduleId);
    fs.renameSync(oldMod, newMod);
    rewriteFile(path.join(newMod, "module.yaml"), (t) => {
      let out = t.replace(
        new RegExp(`^id:\\s*${PLACEHOLDER_MODULE}\\s*$`, "m"),
        `id: ${idYaml(moduleId)}`
      );
      if (zh || en) {
        out = out.replace(
          /title:\s*\n\s*zh-Hant:\s*.*\n\s*en:\s*.*/,
          `title:\n  zh-Hant: ${yamlEscapeTitle(zh)}\n  en: ${yamlEscapeTitle(en)}`
        );
      }
      return out;
    });
    console.log("renamed module", PLACEHOLDER_MODULE, "→", moduleId);
  }

  if (hasCamp) {
    const newCamp = path.join(vault, "campaigns", campaignId);
    fs.renameSync(oldCamp, newCamp);
    rewriteFile(path.join(newCamp, "campaign.yaml"), (t) => {
      let out = t
        .replace(
          new RegExp(`^id:\\s*${PLACEHOLDER_CAMPAIGN}\\s*$`, "m"),
          `id: ${idYaml(campaignId)}`
        )
        .replace(`[${PLACEHOLDER_MODULE}]`, `[${idYaml(moduleId)}]`)
        .replaceAll(PLACEHOLDER_MODULE, moduleId);
      const campTitle = zh || en || campaignId;
      out = out.replace(/^title:\s*.*$/m, `title: ${yamlEscapeTitle(campTitle)}`);
      return out;
    });
    rewriteFile(path.join(newCamp, "hub", "hub-manifest.yaml"), (t) =>
      t
        .replace(
          new RegExp(`campaign_id:\\s*${PLACEHOLDER_CAMPAIGN}`, "g"),
          `campaign_id: ${idYaml(campaignId)}`
        )
        .replace(`[${PLACEHOLDER_MODULE}]`, `[${idYaml(moduleId)}]`)
        .replaceAll(PLACEHOLDER_MODULE, moduleId)
    );
    const sessionsDir = path.join(newCamp, "sessions");
    if (fs.existsSync(sessionsDir)) {
      for (const name of fs.readdirSync(sessionsDir)) {
        const sdir = path.join(sessionsDir, name);
        if (!fs.statSync(sdir).isDirectory()) continue;
        for (const f of ["session.yaml", "archive-manifest.yaml"]) {
          rewriteFile(path.join(sdir, f), (t) =>
            t
              .replace(
                new RegExp(`campaign_id:\\s*${PLACEHOLDER_CAMPAIGN}`, "g"),
                `campaign_id: ${idYaml(campaignId)}`
              )
              .replace(`[${PLACEHOLDER_MODULE}]`, `[${idYaml(moduleId)}]`)
              .replaceAll(PLACEHOLDER_MODULE, moduleId)
              .replaceAll(PLACEHOLDER_CAMPAIGN, campaignId)
          );
        }
      }
    }
    console.log("renamed campaign", PLACEHOLDER_CAMPAIGN, "→", campaignId);
  }

  rewriteFile(path.join(vault, "INDEX.md"), (t) =>
    t
      .replaceAll(`modules/${PLACEHOLDER_MODULE}/`, `modules/${moduleId}/`)
      .replaceAll(`campaigns/${PLACEHOLDER_CAMPAIGN}/`, `campaigns/${campaignId}/`)
      .replaceAll(PLACEHOLDER_MODULE, moduleId)
      .replaceAll(PLACEHOLDER_CAMPAIGN, campaignId)
  );

  const result = {
    vault,
    module: hasMod ? moduleId : null,
    campaign: hasCamp ? campaignId : null,
    source_dir: hasMod ? path.join(vault, "modules", moduleId, "source") : null,
  };
  console.log("rename-defaults complete");
  console.log(JSON.stringify(result, null, 2));
  return result;
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function writeIfMissing(p, content) {
  if (fs.existsSync(p)) return false;
  ensureDir(path.dirname(p));
  fs.writeFileSync(p, content, "utf8");
  return true;
}

function moduleTree(base, id, system) {
  ensureDir(path.join(base, "source"));
  ensureDir(path.join(base, "prep"));
  for (const d of ["prompts", "portraits", "backdrops", "handouts", "tokens"]) {
    ensureDir(path.join(base, "assets", d));
  }
  writeIfMissing(
    path.join(base, "module.yaml"),
    `id: ${id}\nsystem: ${system}\ntitle:\n  zh-Hant: ""\n  en: ""\nlocales: [zh-Hant]\n`
  );
  writeIfMissing(
    path.join(base, "source", "README.md"),
    `# Source\n\n把 PDF 轉出的文字，或直接撰寫的劇本，放在這裡。\n\n建議檔名：\`scenario.zh-Hant.md\`\n`
  );
}

function createCampaign(vault, campaignId, system, sessionId, moduleIds) {
  const cdir = path.join(vault, "campaigns", campaignId);
  ensureDir(path.join(cdir, "pcs"));
  ensureDir(path.join(cdir, "sessions"));
  ensureDir(path.join(cdir, "hub"));
  ensureDir(path.join(cdir, "modules-embedded"));
  const mods = moduleIds.length ? `[${moduleIds.join(", ")}]` : "[]";
  writeIfMissing(
    path.join(cdir, "campaign.yaml"),
    `id: ${campaignId}\nsystem: ${system}\ntitle: ""\nmodules: ${mods}\nlocales: [zh-Hant]\n`
  );
  writeIfMissing(
    path.join(cdir, "hub", "hub-manifest.yaml"),
    `schema: campaign-hub/v1\ncampaign_id: ${campaignId}\nlocales: [zh-Hant, en]\nsessions: []\npcs: []\n`
  );
  writeIfMissing(
    path.join(cdir, "hub", "clue-board.md"),
    `# Clue board\n\n_(empty — fill via sessions then sync)_\n`
  );
  console.log("campaign", cdir);

  if (sessionId) {
    createSession(cdir, campaignId, sessionId, moduleIds);
  }
  return cdir;
}

function createSession(cdir, campaignId, sessionId, moduleIds) {
  const sdir = path.join(cdir, "sessions", sessionId);
  ensureDir(path.join(sdir, "media"));
  const modList = moduleIds.length ? `[${moduleIds.map((m) => m).join(", ")}]` : "[]";
  writeIfMissing(
    path.join(sdir, "session.yaml"),
    `id: "${sessionId}"\nmodule_ids: ${modList}\ndate: ""\ntitle:\n  zh-Hant: ""\n  en: ""\n`
  );
  writeIfMissing(path.join(sdir, "notes.md"), `# Session Notes — ${sessionId}\n\n`);
  writeIfMissing(path.join(sdir, "live-aid.md"), `# Live Aid — ${sessionId}\n\n`);
  writeIfMissing(
    path.join(sdir, "keep-appendix.md"),
    `# Keep Appendix (not for players)\n\n`
  );
  writeIfMissing(
    path.join(sdir, "archive-manifest.yaml"),
    `schema: archive-manifest/v1\ncampaign_id: ${campaignId}\nsession_id: "${sessionId}"\nmodule_ids: ${modList}\npublish_mode: players\nlocales: [zh-Hant, en]\ntitle:\n  zh-Hant: ""\n  en: ""\npaths:\n  recap: recap.md\n  unresolved_clues: unresolved-clues.md\n  media_dir: media/\n  keep_appendix: keep-appendix.md\n`
  );
  console.log("session", sdir);
}

function bootstrap(vault, system) {
  const moduleId = "starter-module";
  const campaignId = "my-table";
  const sessionId = "001";

  writeIfMissing(
    path.join(vault, "INDEX.md"),
    `# 備團資料夾（Vault）

這裡是給人類 GM 放模組、本桌與每一團紀錄的地方。剛建立時都是空的。

暫用資料夾名（\`starter-module\` / \`my-table\`）——**放入 PDF 或劇本後會依劇本自動改名**。

## 你現在有什麼

| 路徑 | 用途（白話） |
|------|----------------|
| \`modules/starter-module/\` | 放劇本原文／從 PDF 轉出的文字（暫用名） |
| \`campaigns/my-table/\` | 你這一桌的狀態（暫用名） |
| \`campaigns/my-table/sessions/001/\` | 第一團的筆記、開團表、之後的團錄 |
| \`campaigns/my-table/pcs/\` | 玩家角色 |
| \`campaigns/my-table/hub/\` | 以後多團總站用 |

## 下一步

1. 把 PDF／劇本文字交給助手；會改名資料夾並放到 \`modules/<劇本id>/source/\`
2. 再請助手跑「分析劇本／備團結構」（\`trpg-scenario-analyze\`）
`
  );

  const modBase = path.join(vault, "modules", moduleId);
  moduleTree(modBase, moduleId, system);
  console.log("module", modBase);

  createCampaign(vault, campaignId, system, sessionId, [moduleId]);

  const emb = path.join(vault, "campaigns", campaignId, "modules-embedded");
  ensureDir(emb);
  writeIfMissing(
    path.join(emb, "README.md"),
    `# Embedded modules\n\n一次性、不打算重用的劇本，可以整包放在這裡（結構與 modules/ 相同）。\n`
  );

  console.log("bootstrap complete", vault);
  console.log(
    JSON.stringify(
      { vault, system, module: moduleId, campaign: campaignId, session: sessionId },
      null,
      2
    )
  );
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.vault) {
    console.error("Required: --vault <path>");
    process.exit(1);
  }
  const vault = path.isAbsolute(args.vault)
    ? args.vault
    : path.resolve(process.cwd(), args.vault);
  ensureDir(vault);

  if (args.bootstrap) {
    bootstrap(vault, args.system);
    return;
  }

  if (args.renameDefaults) {
    renameDefaults(vault, {
      fromFile: args.fromFile,
      title: args.title,
      moduleId: args.moduleId || args.module,
      campaignId: args.campaignId || args.campaign,
      code: args.code,
    });
    return;
  }

  writeIfMissing(path.join(vault, "INDEX.md"), `# Vault\n\n- modules/\n- campaigns/\n`);

  if (args.module) {
    const base = path.join(vault, "modules", args.module);
    moduleTree(base, args.module, args.system);
    console.log("module", base);
  }

  if (args.campaign) {
    createCampaign(
      vault,
      args.campaign,
      args.system,
      args.session,
      args.module ? [args.module] : []
    );
    if (args.embedded) {
      const base = path.join(
        vault,
        "campaigns",
        args.campaign,
        "modules-embedded",
        args.embedded
      );
      moduleTree(base, args.embedded, args.system);
      console.log("embedded module", base);
    }
  }

  if (!args.module && !args.campaign) {
    console.error(
      "Provide --bootstrap, --rename-defaults, or --module and/or --campaign"
    );
    process.exit(1);
  }
}

main();
