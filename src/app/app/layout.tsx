'use client'

import Image from "next/image";
import Link from "next/link";
import { ReactNode, useState } from "react";
import React from "react";
import './global.css'
import { IoExitOutline, IoHomeOutline } from "react-icons/io5";
import { FaBars } from "react-icons/fa";
import { JetBrains_Mono } from "next/font/google";
import { CgGym } from "react-icons/cg";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { DrawerCustom } from "./_componnents/Drawer";
import { signOut } from "next-auth/react";
import { ComboboxDemo } from "@/components/compBox";
import { HomeIcon } from "@radix-ui/react-icons";
import { NavigationMenuDemo } from "@/components/nav";
import { DropdownMenuDemo } from "@/components/dropDown";

const myFont = JetBrains_Mono({
  weight: ['300'],
  subsets: ['latin']
})



export default function Layout({ children }: Readonly<{
  children: ReactNode
}>): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);




  return (
    <div className=" overflow-x-hidden h-screen ">

      <div className={myFont.className}>
        <div className="flex flex-col h-screen ">

          <div className="p-6 flex justify-between">
            <div className="flex">
              <ComboboxDemo/>
              <NavigationMenuDemo/>
            </div>
            <div>
              <DropdownMenuDemo/>
            </div>
          </div>
          {children}

        </div>
      </div>

    </div>
  )
}