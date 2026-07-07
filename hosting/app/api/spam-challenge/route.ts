import { NextResponse } from 'next/server';
import { createChallenge } from '../../../lib/spamGuard';

export async function GET() {
  return NextResponse.json(createChallenge());
}
