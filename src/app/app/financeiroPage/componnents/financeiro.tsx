'use client'

import {Entrada, EntradaSimples } from "@/app/types"
import Swipeable from "../../_componnents/swipeable"
import { Dispatch, SetStateAction, useState } from "react"
import { FaBackward, FaCheckCircle, FaForward } from "react-icons/fa"
import '../style.css'

import MyModal from "../../_componnents/dialog"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { CardEntrada } from "../../financeiroPage/componnents/cardEntrada"
import { Edite } from "../../alunosPage/components/edit"
export function Financeiro({dataA,entradaFilter,setIndex}:{setIndex:Dispatch<SetStateAction<string>>,dataA:Entrada,entradaFilter:EntradaSimples[]|undefined}){
  const routes = useRouter()
  
  const user = entradaFilter !== undefined ? entradaFilter : dataA.entradas
  let count = 1
  const [page,setPage] = useState(count)

  
  let pagesTotal = dataA.pages;
  
  
  
  return <div className="w-full css2 max-sm:overflow-x-auto overflow-x-hidden ">
  {user.map(u =>{
  count++;
  return <div key={`${u.id}`} className={`${count % 2 === 0 || count === 0 ? 'bg-zinc-900 p-3 rounded-lg' : 'bg-bg p-3 rounded-lg'} w-full h-max`}>
  <CardEntrada {...u}/> 
</div>
  })}
  <div className="flex">
          <div className="flex p-4 space-x-3 items-center">
            <div>
              <FaBackward onClick={()=>{
                if(page === 1) return
          
                let n = page - 1
                setPage(n)
                setIndex(prev => `${Number(prev) - 1}`)
             
              }} className=" active:text-yellow-400 text-white" />
            </div>
            <div className="text-white">{page}</div>
            <div>
              <FaForward onClick={()=>{
                if(page === pagesTotal) return
              
                let n = page + 1
                setPage(n)
                setIndex(prev => `${Number(prev) + 1}`)
              
              }} className=" active:text-yellow-400 text-white" />
            </div>
          </div>
          <div className="flex p-4 items-center">
            <h1 className="text-white"> de {pagesTotal} pags</h1>
          </div>
        </div>
</div> 
} 