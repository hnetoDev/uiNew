'use client'

import { useState } from "react";
import { Aluno } from "../types"
import { CardAluno } from "./alunosPage/components/cardAluno";
import { ChartAlunos} from "./charts/chartAlunos";
import { ChartBruto } from "./charts/ChartBruto";
import './global.css'


// eslint-disable-next-line @next/next/no-async-client-component
export default async function AppPage(){
 


  
  return(
    <main className="h-screen w-full flex  bg-bg p-5 flex-col ">
      <div className="grid grid-cols-3 css2  grid-rows-3 max-sm:grid-cols-1 gap-4">


        <div className="flex flex-col  space-y-2 p-4 rounded-lg  bg-zinc-900">
          <h1 className="text-center text-white font-bold text-2xl">Alunos Cadastrados</h1>
          <ChartAlunos/>
        </div>

        <div className="flex flex-col  space-y-2 p-4 rounded-lg bg-zinc-900">
          <h1 className="text-center text-white font-bold text-2xl">Capital bruto</h1>
         <ChartBruto/>
        </div>

        <div className="w-full flex flex-col justify-between bg-zinc-900 rounded-lg  p-6 ">
          <div>
            <h1 className="text-yellow-400  font-bold text-3xl">Notificações</h1>
            <h1 className="text-white font-bold  text-xl">envie uma mensagem para os alunos matriculados.</h1>
          </div>
          <div className="w-full flex flex-col space-y-4">
            <input type="text" className="bg-bg border border-yellow-200 rounded-lg text-white p-4" />
            <button className="bg-yellow-400 font-bold p-4 rounded-lg text-bg">Enviar</button>
          </div>
        </div>
          
       
      </div>
    </main>
  )
}