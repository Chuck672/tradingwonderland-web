import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import test from "node:test";

const root = path.resolve(import.meta.dirname, "..");

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (name.endsWith(".tsx")) out.push(full);
  }
  return out;
}

function dictionary(source: string, which: "zh" | "en"): Map<string, string> {
  const start = source.indexOf(`  ${which}: {`);
  const end = which === "zh" ? source.indexOf("  en: {") : source.length;
  const block = source.slice(start, end);
  const map = new Map<string, string>();
  for (const match of block.matchAll(/"([A-Za-z0-9_.]+)"\s*:\s*"((?:\\.|[^"\\])*)"/g)) {
    map.set(match[1], match[2]);
  }
  return map;
}

function referencedKeys(): string[] {
  const keys: string[] = [];
  for (const file of [...walk(path.join(root, "app")), ...walk(path.join(root, "components"))]) {
    const source = readFileSync(file, "utf8");
    for (const match of source.matchAll(/(?<![\w.])t\(\s*(['"`])([^'"`\n]+)\1/g)) {
      const key = match[2];
      if (key.includes("${n}")) {
        for (const n of ["1", "2", "3", "4"]) keys.push(key.replace("${n}", n));
      } else if (!key.includes("${")) {
        keys.push(key);
      }
    }
    for (const match of source.matchAll(/"(home\.[A-Za-z0-9_]+)"/g)) {
      keys.push(match[1]);
    }
  }
  return keys;
}

test("every t() key has real English and Chinese copy", () => {
  const source = readFileSync(path.join(root, "components/language-provider.tsx"), "utf8");
  const zh = dictionary(source, "zh");
  const en = dictionary(source, "en");
  const missing: string[] = [];
  for (const key of referencedKeys()) {
    const zhValue = zh.get(key);
    const enValue = en.get(key);
    if (!zhValue || zhValue === key) missing.push(`zh ${key}`);
    if (!enValue || enValue === key) missing.push(`en ${key}`);
  }
  assert.deepEqual(missing, []);
});
