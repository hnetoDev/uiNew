'use client'
import { useRouter } from "next/navigation";
import { CiFilter } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import { IoAddOutline, IoPersonAddOutline } from "react-icons/io5";
import MyModal from "../../_componnents/dialog";
import { Add } from "../../alunosPage/components/criar";
import '../../alunosPage/style.css'
import { CgGym } from "react-icons/cg";
import Link from "next/link";

import { useState, useEffect } from "react";
import { Exercicio } from "@/app/types";

export function CaixaPesquisaTreino(){
  
  const [data,setData] = useState<Exercicio[]>()
  useEffect(()=>{
    async function getData(){
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/exercicios`)
      const exercicios:Exercicio[] = await res.json()
      setData(exercicios)
    }
    getData()
  },[])

  return <div className="w-full flex space-x-3 m-auto justify-center">
  <button className="bg-zinc-900 rounded-full p-4">
    
  <Link href='/app/treinosPage/criarTreino'><IoAddOutline color="#fff000" size={30}/></Link>
    
      
   
  </button>
  <div className="search focus-within:space-x-3 bg-zinc-900  hover:group-last:w-14 hover:rounded-md hover:space-x-3 flex items-center justify-center p-4">
    <FaSearch className=" font-bold" size={30} color="#fff000"/>
    <input className="input " type="text"/>
  </div>
  <button className="bg-zinc-900 rounded-full p-4">
    <CiFilter  color="#fff000" size={30} />
  </button>
  
</div>
}