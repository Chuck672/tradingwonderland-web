import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

const globalForDb = global as unknown as { conn: mysql.Pool | undefined };

// Use createPool instead of createConnection for better performance and connection management
// Remove query params from connection string as they might cause issues with mysql2
const connectionString = process.env.DATABASE_URL?.split('?')[0];

const connection = globalForDb.conn ?? mysql.createPool({
  uri: connectionString,
  connectionLimit: 15, // 适当增加连接池大小，以处理更高的并发
  waitForConnections: true,
  queueLimit: 0,
  enableKeepAlive: true, // 保持长连接，避免频繁创建和销毁连接带来的开销
  keepAliveInitialDelay: 10000,
});

if (process.env.NODE_ENV !== "production") globalForDb.conn = connection;

export const db = drizzle(connection, { schema, mode: "default" });
