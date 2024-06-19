'use client'
import { useEffect, useState } from "react";
import MyModal from "../_componnents/dialog";
import { CaixaPesquisaExercicio } from "./components/caixaPesquisaTreino";
import { CriarExercicio } from "./components/criarExercicios";
import { Exercicios } from "./components/exercicios";
import { Exercicio } from "@/app/types";

export default function ExerciciosPage(){

  const [data,setData] = useState<Exercicio[]>()
  useEffect(()=>{
    async function getData(){
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/exercicios`)
      const exercicios:Exercicio[] = await res.json()
      setData(exercicios)
    }
    getData()
  },[data,])

  return <div className="flex flex-col h-screen w-full space-y-5 css p-10">
  <h1 className="text-3xl font-bold text-white text-center">Exercícios Cadastrados no TEA</h1>
    <CaixaPesquisaExercicio/>
  <div className="text-zinc-300 mt-3 space-y-2 ">
  
    <h1 className="text-center text-zinc-300">Arraste para direita para editar</h1>
  </div>
  <div className="h-max">
    {data ? <Exercicios data={data}/> : null }
  </div>
</div>
}