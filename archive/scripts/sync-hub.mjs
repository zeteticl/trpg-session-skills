import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "../..");
const hubDir = path.join(root, "examples/vault/campaigns/demo-table/hub");
const outDir = path.join(__dirname, "../src/data/hub");

fs.mkdirSync(outDir, { recursive: true });
for (const name of ["hub-manifest.yaml", "clue-board.md"]) {
  const src = path.join(hubDir, name);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(outDir, name));
    console.log("hub synced", name);
  }
}

const s001 = path.join(root, "examples/vault/campaigns/demo-table/sessions/001/recap.md");
if (fs.existsSync(s001)) {
  fs.copyFileSync(s001, path.join(outDir, "session-001-recap.md"));
  console.log("hub synced session-001-recap.md");
}
