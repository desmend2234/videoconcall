'use client';
import { useUser } from '@clerk/nextjs';
import React from 'react';

function ClientPage() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return <div>Hello, {user.firstName} welcome to Clerk</div>;
}

export default ClientPage;
