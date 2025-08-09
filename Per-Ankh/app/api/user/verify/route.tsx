import knex from 'knex';
import { NextResponse, NextRequest } from 'next/server';
import config from '@/knexfile';
require('dotenv').config();

const kn = knex(config.development);

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const session = await kn('sessions')
      .where({ token })
      .where('expires_at', '>', new Date())
      .first();
    if (!session) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }

    const user = await kn('users').where({ use_id: session.user_id }).first();
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      user: { id: user.id, email: user.email },
      expiresAt: session.expires_at,
    });
  } catch (error) {
    console.error('GET /api/auth/verify error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}