import Link from "next/link";
import { ReactNode } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
export default function layoutApp({children}:Readonly<{children:ReactNode}>){
  return(
    <div className="overflow-hidden">
       <main className="bg-zinc-900 h-max px-4 py-3">
         <div className="flex flex-col">
           <header className="flex justify-between">
             <h1 className="text-4xl font-bold text-purple-400"> Frelles</h1>
             <div className="flex">
              <nav>
                <ul className="flex space-x-2">
                  <li className="p-2 text-white text-lg">Produtos</li>
              
                  <li className="p-2 text-white text-lg">docs</li>
                  <li className="p-2 flex items-center space-x-2 bg-purple-400 rounded-md text-white text-lg">
                    <AiOutlineShoppingCart size={20}/>
                    <h1>Carrinho</h1>
                  </li>
                  
                  
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