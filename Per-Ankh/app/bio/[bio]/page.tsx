"use client";

import { use } from "react";
import { useEffect, useState } from "react";

export default function ProfileCard({ params }) {
  const { bio } = use(params);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      if (!bio) return;
      const res = await fetch(`/api/user/${bio}`);
      const data = await res.json();
      setProfile(data);
    }
    fetchProfile();
  }, [bio]);

  return (
    <div className="min-h-screen mt-24 ml-10 bg-black p-6">
      <div className="bg-gray-600 rounded-2xl shadow-lg p-8 max-w-sm w-full text-center">
        <img
          src={profile?.user.image_url}
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-gray-300"
        />
        <h2 className="text-2xl font-bold text-white">
          {profile?.user.username}
        </h2>
        <h3 className="text-sm text-white mb-2">{profile?.user.email}</h3>
        <p className="text-white">{profile?.bio}</p>
      </div>
    </div>
  );
}
