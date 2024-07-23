'use client';
import { useUser } from '@clerk/nextjs';
import React from 'react';

function ClientPage() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <div className="flex justify-center items-center bg-black text-white h-screen">
      Hello, {user.firstName}, welcome to have a call with friends
    </div>
  );
}

export default ClientPage;
