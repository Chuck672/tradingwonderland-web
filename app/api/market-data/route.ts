import { NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'path';

// Force dynamic but allow edge caching with stale-while-revalidate
export const dynamic = 'force-dynamic';

// Simple in-memory cache for market data to prevent DB overload
const cache = new Map<string, { data: any, timestamp: number }>();
const CACHE_TTL_MS = 60 * 1000; // 1 minute cache

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol') || 'XAUUSDz';
  const timeframe = searchParams.get('timeframe') || 'H1';
  const limit = parseInt(searchParams.get('limit') || '1000', 10);
  const before = searchParams.get('before');

  const cacheKey = `${symbol}-${timeframe}-${limit}-${before || 'latest'}`;
  
  // 1. Check Memory Cache
  const cached = cache.get(cacheKey);
  if (cached && (Date.now() - cached.timestamp < CACHE_TTL_MS)) {
    return NextResponse.json(cached.data, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
        'X-Cache': 'HIT'
      }
    });
  }

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

    // 2. Set Memory Cache
    cache.set(cacheKey, { data: rows, timestamp: Date.now() });

    // 3. Return with HTTP Cache headers for CDN/Browser caching
    return NextResponse.json(rows, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
        'X-Cache': 'MISS'
      }
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
