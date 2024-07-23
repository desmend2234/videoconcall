import { auth, currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import React from 'react';

export async function GET() {
  const { userId } = auth();
  const user = await currentUser();

  if (!userId) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  return NextResponse.json(
    { message: 'Authenticated', data: { userId, userName: user?.username } },
    { status: 200 }
  );
}
