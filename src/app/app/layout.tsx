'use client'

import Image from "next/image";
import Link from "next/link";
import { ReactNode, useState } from "react";
import React from "react";
import './global.css'
import { IoExitOutline, IoHomeOutline } from "react-icons/io5";
import { FaBars } from "react-icons/fa";
import { Poppins } from "next/font/google";
import { CgGym } from "react-icons/cg";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { DrawerCustom } from "./_componnents/Drawer";
import { signOut } from "next-auth/react";

const myFont = Poppins({
  weight:['300'],
  subsets:['latin']
})



export default function Layout({children}:Readonly<{
  children:ReactNode
}>):JSX.Element{
  const [isOpen,setIsOpen] = useState<boolean>(false);




  return(
    <div className=" overflow-x-hidden h-screen ">

      <div className={myFont.className}>
        <div className="flex flex-col h-screen ">

          <div className=" bg-zinc-900 px-6 py-3 flex  justify-between">
            <Link href={{pathname:'/app'}}>
              <Image
                src='/images/logo.png'
                width={60}
                height={0}
                content="fill"
                alt="logo"
                className=" p-0 mx-auto css"
               />
            </Link>
            <div className="flex max-sm:space-x-6 space-x-8 css">
              <Link href={'/app'} className="flex items-center justify-start space-x-2">
                <div className="flex space-x-2">
                  <IoHomeOutline size={22} className="text-yellow-300 m-auto  font-bold"/>
                  <h1 className="text-zinc-400 max-sm:w-0  max-sm:text-transparent">Home</h1>
                </div>
              </Link>
              <Link href={'/app/alunosPage'} className="flex items-center justify-start space-x-2">
                <div className="flex space-x-2">
                <IoPersonOutline size={22} className="text-yellow-300 m-auto  font-bold"/>
                <h1 className="text-zinc-400 max-sm:w-0 max-sm:text-transparent">Alunos</h1>
                </div>
              </Link>
              <Link href={'/app/treinosPage'} className="flex items-center justify-start space-x-2">
                <div className="flex space-x-2">
                  <CgGym size={22} className="text-yellow-300 m-auto  font-bold"/>
                  <h1 className="text-zinc-400 max-sm:w-0  max-sm:text-transparent">Treinos</h1>
                </div>
              </Link>
              <Link href={'/app/financeiroPage'} className="flex items-center justify-start space-x-2">
                <div className="flex space-x-2">
                  <FaRegMoneyBillAlt size={22} className="text-yellow-300 m-auto  font-bold"/>
                  <h1 className="text-zinc-400 max-sm:w-0 max-sm:text-transparent">Financeiro</h1>
                </div>
              </Link>
              <div onClick={async()=>{
                await signOut()
              }} className="flex cursor-pointer space-x-2">
                  <IoExitOutline size={22} className="text-red-500 m-auto font-bold"/>
                  <h1 className="text-zinc-400 m-auto max-sm:w-0 max-sm:text-transparent">Sair</h1>
              </div>
              
              

              <DrawerCustom setOpen={setIsOpen} isOpen={isOpen}/>
            
            </div>
          </div>
          {children}
          
        </div>
      </div>
    
    </div>
  )
}