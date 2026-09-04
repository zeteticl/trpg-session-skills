#!/usr/bin/env node
/**
 * Create empty vault shells (trpg-campaign-setup helper).
 *
 * Beginner bootstrap (create everything, no picking IDs):
 *   node scripts/setup_vault.mjs --vault <path> --bootstrap
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

function parseArgs(argv) {
  const out = {
    vault: null,
    module: null,
    campaign: null,
    session: null,
    embedded: null,
    system: "coc7",
    bootstrap: false,
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
  }
  return out;
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

## 你現在有什麼

| 路徑 | 用途（白話） |
|------|----------------|
| \`modules/starter-module/\` | 放劇本原文／從 PDF 轉出的文字 |
| \`campaigns/my-table/\` | 你這一桌的狀態 |
| \`campaigns/my-table/sessions/001/\` | 第一團的筆記、開團表、之後的團錄 |
| \`campaigns/my-table/pcs/\` | 玩家角色 |
| \`campaigns/my-table/hub/\` | 以後多團總站用 |

## 下一步

1. 把 PDF 轉出的文字，或貼上的劇本，放到 \`modules/starter-module/source/scenario.zh-Hant.md\`
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
    console.error("Provide --bootstrap, or --module and/or --campaign");
    process.exit(1);
  }
}

main();
