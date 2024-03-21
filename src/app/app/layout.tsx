'use client'
import Link from "next/link";
import { ReactNode, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";


export default function layoutApp({children}:Readonly<{children:ReactNode}>){
  
  return(
    <div className="overflow-hidden">
       <main className="bg-zinc-900 h-max px-5 py-3  flex justify-center ">
         <div className="flex flex-col w-full ">
           <header className="flex justify-between">
             <h1 className="text-4xl font-bold text-yellow-500">TEA</h1>
             <div className="flex">
              <nav>
                <ul className="flex space-x-2">
                  <li className="p-2 text-white text-lg">Produtos</li>
              
                  <li className="p-2 text-white text-lg p-2 bg-yellow-500 rounded-md">Login/Register</li>
                  
                </ul>
              </nav>
             </div>
           </header>
          </div>
          
        </main>
      {children}
    </div>
  )
}