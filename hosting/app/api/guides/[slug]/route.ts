import { NextResponse } from 'next/server';
import { getGuideBySlugWithHtml } from '../../../../lib/guides';

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const guide = await getGuideBySlugWithHtml(slug);
    return NextResponse.json(guide);
  } catch {
    return NextResponse.json({ error: 'Guide not found' }, { status: 404 });
  }
}
