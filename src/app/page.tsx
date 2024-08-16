'use client'

import { getSession, signOut } from "next-auth/react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";

export default function Home() {
  
  const routes = useRouter()
  redirect('/app');

  
  const handleLogout = async()=>{
    await signOut()
  }
  return (
    <>
    <button onClick={handleLogout}>logout</button>
   

    </>
  );
}
