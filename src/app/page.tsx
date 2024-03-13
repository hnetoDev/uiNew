'use client'

import { signOut } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const handleLogout = async()=>{
    await signOut()
  }
  return (
    <>
    <button onClick={handleLogout}>logout</button>
    </>
  );
}
