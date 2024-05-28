'use client'
import { Aluno } from "@/app/types"
import { CardAluno } from "./components/cardAluno"
import { IoPersonAddOutline } from "react-icons/io5";
import { FaAward, FaBackward, FaForward, FaSearch } from "react-icons/fa";
import { CiFilter } from "react-icons/ci";
import './style.css'
import {useSwipeable} from 'react-swipeable'
import Swipeable from "../_componnents/swipeable";
import { useEffect, useState } from "react";
import { Alunos } from "./components/alunos";

import MyModal from "../_componnents/dialog";
import { Add } from "./components/criar";



export default function AlunosPage(){
  const [data,setData] = useState<Aluno[]>();
  const [search,setSearch] = useState<string>('');
  useEffect(()=>{
    async function getData(){
      const data = await fetch('http://localhost:8000/api/user',{
      method:'GET',
  });
   const resUser: Aluno[] = await data.json()
   setData(resUser)
    }
    
   getData()

  },[data])
  let count = 0
  return(
    
    <div className="flex flex-col h-screen w-full space-y-5 css p-10">
      <h1 className="text-3xl font-bold text-white text-center">Alunos Cadastrados no TEA</h1>
      <div className="w-full flex space-x-3 m-auto justify-center">
        <button className="bg-zinc-900 rounded-full p-4">
        <MyModal icon={<IoPersonAddOutline color="#fff000" size={30} />}>
          <Add data={data} setData={setData}/>
        </MyModal>
       </button>
       <div className="search focus-within:space-x-3 bg-zinc-900  hover:group-last:w-14 hover:rounded-md hover:space-x-3 flex items-center justify-center p-4">
         <FaSearch className=" font-bold" size={30} color="#fff000"/>
         <input className="input " type="text" onChange={(v)=>{
          setSearch(v.currentTarget.value.toLowerCase());
          console.log(search)
         }}/>
       </div>
         <button className="bg-zinc-900 rounded-full p-4">
           <CiFilter  color="#fff000" size={30} />
         </button>
      </div>
      <div className="text-zinc-300 w-80 m-auto mt-3 ">
        <h1 className="text-center text-zinc-300">Arraste para direita para editar e esquerda para excluir</h1>
      </div>

      <div className="w-full h-max m-auto  p-6 ">
        <div className="flex h-10 ">
          <div className="w-16 flex">
            <h1 className="text-white m-auto">Foto</h1>
          </div>
          <div className="w-52 flex">
            <h1 className="text-white m-auto max-sm:ml-16">Nome</h1>
          </div>
          <div className=" w-72 max-sm:invisible flex">
            <h1 className="text-white m-auto ml-40">Email</h1>
          </div>
          <div className="w-28 ml-3 max-sm:invisible flex">
            <h1 className="text-white m-auto">Status</h1>
          </div>
        </div>
        {data ? <Alunos search={`${search}`} data={data!}/> : null}
      </div>
    </div>
  )
}