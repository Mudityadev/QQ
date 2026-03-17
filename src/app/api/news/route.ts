import { NextRequest, NextResponse } from 'next/server';
import { aggregateNews } from '@/lib/news/aggregate';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q') ?? undefined;
  const region = request.nextUrl.searchParams.get('region') ?? undefined;
  const source = (request.nextUrl.searchParams.get('source') as 'all' | undefined) ?? 'all';
  const limit = Number(request.nextUrl.searchParams.get('limit') ?? 50);

  try {
    const items = await aggregateNews({ q, region, source, limit });
    return NextResponse.json({ ok: true, count: items.length, items });
  } catch (error) {
    return NextResponse.json({ ok: false, error: (error as Error).message }, { status: 500 });
  }
}
