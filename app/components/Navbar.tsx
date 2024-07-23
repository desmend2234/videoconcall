import { SignOutButton, UserButton, useUser } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import React from 'react';

function Navbar() {
  const { userId } = auth();
  return (
    <div className=" bg-black">
      <ul className="flex justify-between py-4 px-6 text-white">
        <div>
          <Link href="/">Home</Link>
        </div>
        <div className="flex items-center">
          <Link href="/client">Client page</Link>
        </div>
        <div className="gap-6 flex items-center">
          {!userId ? (
            <>
              <Link href="/sign-in">
                <li>Login</li>
              </Link>
              <Link href="/sign-up">
                <li>Sign-up</li>
              </Link>
            </>
          ) : (
            <>
              <Link href="/profile">
                <li>Profile</li>
              </Link>
              <li className="flex items-center">
                <UserButton />
              </li>
            </>
          )}
        </div>
      </ul>
    </div>
  );
}

export default Navbar;
