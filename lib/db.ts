import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

const globalForDb = global as unknown as { conn: mysql.Pool | undefined };

// Use createPool instead of createConnection for better performance and connection management
// Remove query params from connection string as they might cause issues with mysql2
const connectionString = process.env.DATABASE_URL?.split('?')[0];

const connection = globalForDb.conn ?? mysql.createPool({
  uri: connectionString,
  connectionLimit: 5,
  waitForConnections: true,
  queueLimit: 0
});

if (process.env.NODE_ENV !== "production") globalForDb.conn = connection;

export const db = drizzle(connection, { schema, mode: "planetscale" });
