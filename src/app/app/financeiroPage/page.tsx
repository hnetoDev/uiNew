'use client'

import { IoPersonAddOutline } from "react-icons/io5";
import MyModal from "../_componnents/dialog";
import { Add } from "../alunosPage/components/criar";
import { FaSearch } from "react-icons/fa";
import { CiFilter } from "react-icons/ci";
import { useEffect, useState } from "react";
import { Aluno } from "@/app/types";
import { Financeiro } from "./componnents/financeiro";
import { CardPlanos } from "./componnents/criarPlano";
import { ChartBruto } from "../charts/ChartBruto";

export default function FinanceiroPage(){

  const [data,setData] = useState<Aluno[]>();
  const [search,setSearch] = useState<string>('');
  useEffect(()=>{
    async function getData(){
      const data = await fetch('http://localhost:8000/api/user',{
      method:'GET',
  });
   const resUser = await data.json()
   setData(resUser)
    }
    
   getData()

  },[data])
  let count = 0

  
  return <div className="flex flex-col h-screen w-full space-y-5 css p-10">
    <h1 className="text-3xl font-bold text-yellow-400 text-center">Financeiro TEA</h1>

    <div className="flex flex-col   space-y-2 p-4 rounded-lg bg-zinc-900">
      <h1 className="text-center text-white font-bold text-2xl">Capital bruto</h1>
      <ChartBruto/>
    </div>

    <CardPlanos/>

    <div className="p-6 py-0 pt-8">
      <h1 className="text-xl font-bold text-white">Entradas</h1>
    </div>
    <div className="w-full mt-5 h-max m-auto py-0  p-6 ">
      <div className="flex h-10 ">
        <div className="w-16 flex">
          <h1 className="text-white m-auto">Foto</h1>
        </div>
        <div className="w-48 max-sm:w-4 flex">
          <h1 className="text-white m-auto max-sm:ml-16">Nome</h1>
        </div>
        <div className=" w-72 max-sm:  flex">
          <h1 className="text-white m-auto ml-40">Metodo</h1>
        </div>
        <div className="w-28 ml-3 max-sm:invisible flex">
          <h1 className="text-white m-auto">Data</h1>
        </div>
      </div>
      {data ? <Financeiro search={`${search}`} data={data!}/> : null}
    </div>
  </div>
}