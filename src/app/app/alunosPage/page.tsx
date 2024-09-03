'use client'
import { Aluno, FilterType } from "@/app/types"
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
import { Filter } from "./components/filter";
import { ChartAlunos } from "../charts/chartAlunos";


export default function AlunosPage(){
  const [filter,setFilter] = useState<boolean | undefined>()
  const [data,setData] = useState<Aluno[]>();
  const [search,setSearch] = useState<string>('');
  const [index,setIndex] =useState<string>('1');
  const [pages,setPages] = useState<number>(1);

  useEffect(()=>{
    console.log(process.env.NEXT_PUBLIC_API_URL)
    console.log(search)
    console.log(filter)
    async function getData(){

      const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/search`,{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        active:filter,
        search:search,
        index:index
      })
  });
  const resUser = await data.json()
  setData(resUser['users'])
 
  setPages(resUser['pages'])
  }
    
   getData()

  },[ ,data,index])
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
       <div className={`${search ? 'border-2 border-green-400' : null} search focus-within:space-x-3 bg-zinc-900 focus-within:rounded-md  hover:group-last:w-14 hover:rounded-md hover:space-x-3 flex items-center justify-center p-4`}>
         <FaSearch className=" font-bold" size={30} color="#fff000"/>
         <input className="input focus-within:outline-0 " type="text" onChange={(v)=>{
          setSearch(v.currentTarget.value.toLowerCase());
          console.log(search)
         }}/>
       </div>
         <button className={` ${filter !== undefined ? 'border-2 border-green-400' : null}  bg-zinc-900 rounded-full p-4`}>
           <MyModal icon={<CiFilter  color="#fff000" size={30} />}>
              <Filter filter={filter} setFilter={setFilter}/>
           </MyModal>
         </button>
      </div>
      
     
      <div className="w-full h-max m-auto p-6 ">
        <div className="flex h-10 max-sm:invisible max-lg:invisible max-md:invisible  ">
          <div className="w-16 flex">
            <h1 className="text-white m-auto">Foto</h1>
          </div>
          <div className="w-52 flex">
            <h1 className="text-white m-auto ">Nome</h1>
          </div>
          <div className=" w-72  flex">
            <h1 className="text-white m-auto ml-40">Email</h1>
          </div>
          <div className="w-28 ml-6 flex">
            <h1 className="text-white m-auto">Status</h1>
          </div>
        </div>
        {data ? <Alunos  pages={pages} setIndex={setIndex} data={data!}/> : null}
      </div>
      <div className="">
        <ChartAlunos/>
      </div>
    </div>
  )
}