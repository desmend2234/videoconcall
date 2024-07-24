import { SignOutButton, UserButton, useUser } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import React from 'react';

function Navbar() {
  const { userId } = auth();
  return (
    <div className=" bg-black">
      <ul className="flex justify-end px-4 items-center py-6 text-white text-xl ">
        {/* <div>
          <Link href="/">Home</Link>
        </div> */}

        <div className="gap-8 flex items-center ">
          {!userId ? (
            <>
              <Link href="/sign-in" className="hover:text-blue-400 ransition-all duration-300">
                <li>Login</li>
              </Link>
              <Link href="/sign-up" className="hover:text-blue-400 ransition-all duration-300">
                <li>SignUp</li>
              </Link>
            </>
          ) : (
            <>
              <Link href="/profile" className="hover:text-blue-400 ransition-all duration-300">
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
