'use client'

import { IoPersonAddOutline } from "react-icons/io5";
import MyModal from "../_componnents/dialog";
import { Add } from "../alunosPage/components/criar";
import { FaMoneyBillAlt, FaSearch } from "react-icons/fa";
import { CiFilter } from "react-icons/ci";
import { useEffect, useState } from "react";
import { Aluno, Entrada, EntradaSimples, Plano } from "@/app/types";
import { Financeiro } from "./componnents/financeiro";
import { CardPlanos } from "./componnents/criarPlano";
import { ChartBruto } from "../charts/ChartBruto";
import { Caixa } from "./componnents/caixa";
import './style.css'
import AsyncSelect from 'react-select/async';


export default function FinanceiroPage() {

  const [data, setData] = useState<Entrada>();
  const [entradaFiltrada, setEntradaFiltrada] = useState<EntradaSimples[]|undefined>(undefined);
  const [user, setUser] = useState<{ value: String; label: String; }[]>()

  


  const filterColors = async (inputValue: string) => {
    const usera:Aluno[] = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/search`,{
      method:"POST",
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        search:inputValue,
        status:undefined
      })
    }).then(async(u) =>{
      return await u.json()
    })
    setUser(()=>{
      const data = usera.map(u => {
        return {value: u.id,label:u.name};
      })
      return data
    })
    if(user){
      return user
    }
    return [{value:undefined,label:""}]
  };

  const loadOptions = (
    inputValue: string,
    callback: (options: {value:String|undefined,label:String}[]) => void
  ) => {
    setTimeout(async() => {
      callback(await filterColors(inputValue));
    }, 1000);
  };

  






  useEffect(() => {

    async function getData() {

      const getData = new Date();
      const month = getData.getMonth()
      const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/entrada/mensal/${month}`, {
        method: 'GET'

      });
      const resEntrada: Entrada = await data.json()
      setData(resEntrada)
    };



    getData()


  }, [])
  let count = 0


  return <div className="flex flex-col h-screen w-full space-y-5 css p-10">
    <div className="flex items-center justify-center space-x-4">
      <h1 className="text-4xl font-bold text-yellow-400 text-center">Financeiro</h1>
      <FaMoneyBillAlt size={60} className="text-green-400" />
    </div>


    <div className="bg-zinc-900 rounded-lg ">
      {data ? <Caixa caixa={data!} /> : <div className="h-20 flex items-center justify-center"> <h1 className="text-yellow-300">Carregando...</h1> </div>}
    </div>

    <div className="flex flex-col   space-y-2 p-4 rounded-lg bg-zinc-900">
      <h1 className="text-center text-white font-bold text-2xl">Capital bruto</h1>
      <ChartBruto />
    </div>

    <CardPlanos />

    <div className="p-6 py-0 pt-8 flex items-center justify-between max-sm:flex-col space-x-3 ">
      <h1 className="text-4xl font-bold text-white">Entradas</h1>
      <div className="bg-zinc-900 space-x-2 flex">
        <AsyncSelect blurInputOnSelect onChange={async(v)=>{
          if(v?.value !== undefined){
            const res:EntradaSimples[] = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/entrada/user/${v?.value}`).then(async(res) => await res.json())
            return setEntradaFiltrada(res)
          }
          return setEntradaFiltrada(undefined)
        }} className="react-select-container"   cacheOptions placeholder={'Busque por Aluno'} loadOptions={loadOptions} defaultOptions />
      </div>
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
      {data ? <Financeiro dataA={data!} entradaFilter={entradaFiltrada} /> : null}
    </div>

  </div>
}