import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config();

// Remove connection_limit query param for introspection as it might cause issues with drizzle-kit
const connectionString = process.env.DATABASE_URL?.split('?')[0];

export default defineConfig({
  dialect: "mysql",
  schema: "./lib/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: connectionString!,
  },
});
