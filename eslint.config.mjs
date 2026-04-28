import { defineConfig } from "eslint/config";
import next from "eslint-config-next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig([{
    ignores: [
        "**/pretrade-checklist-template-v6/**",
        "**/priceaction_courses/**",
        "**/priceactiontradingmanual/**",
        "**/react-trading-journal-template-enhanced-v4/**",
        "**/tradingsystemv2p0/**",
        "**/volumeprofile_courses/**",
        "**/private-tools/**",
        "**/drizzle/**",
    ],
    rules: {
        "react/no-unescaped-entities": "off",
    },
    extends: [...next],
}]);
