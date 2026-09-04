import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "../..");
const sessionDir = path.join(
  root,
  "examples/vault/campaigns/demo-table/sessions/001"
);
const outDir = path.join(__dirname, "../src/data/session");

const allow = ["recap.md", "unresolved-clues.md", "session.yaml", "archive-manifest.yaml"];

fs.mkdirSync(outDir, { recursive: true });
for (const name of allow) {
  const src = path.join(sessionDir, name);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(outDir, name));
    console.log("synced", name);
  }
}

const blocked = path.join(sessionDir, "keep-appendix.md");
if (fs.existsSync(blocked)) {
  console.log("ok: keep-appendix.md intentionally not synced");
}
