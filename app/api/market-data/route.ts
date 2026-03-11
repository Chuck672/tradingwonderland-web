import { NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol') || 'XAUUSDz';
  const timeframe = searchParams.get('timeframe') || 'H1';
  const limit = parseInt(searchParams.get('limit') || '1000', 10);
  const before = searchParams.get('before');

  try {
    const dbPath = process.env.SQLITE_DB_PATH || path.join(process.cwd(), 'market_data.db');
    const db = new Database(dbPath, { readonly: true });
    
    let rows;
    if (before) {
      const beforeTime = parseInt(before, 10);
      const stmt = db.prepare(`
        SELECT time, open, high, low, close, delta_volume
        FROM ohlcv_data
        WHERE symbol = ? AND timeframe = ? AND time < ?
        ORDER BY time DESC
        LIMIT ?
      `);
      rows = stmt.all(symbol, timeframe, beforeTime, limit);
    } else {
      const stmt = db.prepare(`
        SELECT time, open, high, low, close, delta_volume
        FROM ohlcv_data
        WHERE symbol = ? AND timeframe = ?
        ORDER BY time DESC
        LIMIT ?
      `);
      rows = stmt.all(symbol, timeframe, limit);
    }
    
    db.close();

    // The chart requires data to be in ascending order by time
    rows.reverse();

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
