'use client'
import { CgGym } from "react-icons/cg";
import { CaixaPesquisaTreino } from "./components/caixaPesquisaTreino";
import MyModal from "../_componnents/dialog";
import { Treinos } from "./components/treinos";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Treino } from "@/app/types";


export default function TreinoPage(){
  const [treinos,setTreinos] = useState<Treino[]>()

  useEffect(()=>{

    async function getData() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/treinos`,{
        method:'GET'
      })
      const treinos:Treino[] = await res.json()
      setTreinos(treinos)
    }
    getData()

    

  },[treinos])

  return <div className="flex flex-col h-screen w-full space-y-5 css p-10">
    <h1 className="text-3xl font-bold text-white text-center">Treinos Cadastrados no TEA</h1>
    <CaixaPesquisaTreino/>
    <div className="text-zinc-300 mt-3 space-y-2 ">
      <Link href={{pathname:'/app/exerciciosPage'}} className="flex cursor-pointer  bg-zinc-900 w-max p-4 space-x-2 rounded-lg m-auto">
        <h1 className=" text-yellow-400 ">Ver exercícios</h1>
        
      </Link>
        
    
      <h1 className="text-center text-zinc-300">Arraste para direita para editar</h1>
    </div>
    {treinos ? <div className="h-max"><Treinos data={treinos}/></div> : null}
   
  </div>
}