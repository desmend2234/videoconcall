import { UserProfile } from '@clerk/nextjs';
import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

const Profile = async () => {
  const { userId } = auth();
  const isAuth = !!userId;
  const user = await currentUser();
  if (!isAuth) {
    redirect('/');
  }
  console.log(user);
  return (
    <div className="flex items-center justify-center flex-col mt-4">
      <h1 className="text-2xl mb-2">{user?.firstName}</h1>
      <UserProfile />
    </div>
  );
};

export default Profile;
