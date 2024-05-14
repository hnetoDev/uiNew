'use client'

import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  
  const routes = useRouter()
  
  const handleLogout = async()=>{
    await signOut()
  }
  return (
    <>
    <button onClick={handleLogout}>logout</button>
   

    </>
  );
}
