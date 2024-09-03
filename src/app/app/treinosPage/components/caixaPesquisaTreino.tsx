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

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Exercicio } from "@/app/types";
import CriarTreino from "./criarTreino";

export function CaixaPesquisaTreino({setSearch}:{setSearch:Dispatch<SetStateAction<string | undefined>>}){
  

  return <div className="w-full flex space-x-3 m-auto justify-center">
  <button className="bg-zinc-900 rounded-full p-4">
    
  
    <MyModal bgTransparent icon={<IoAddOutline color="#fff000" size={30} />}>
      <CriarTreino/>
    </MyModal>
  
    
      
   
  </button>
  <div className="search focus-within:space-x-3 focus-within:rounded-md bg-zinc-900  hover:group-last:w-14 hover:rounded-md hover:space-x-3 flex items-center justify-center p-4">
    <FaSearch className=" font-bold" size={30} color="#fff000"/>
    <input className="input" type="text"  onChange={(v)=>{
      setSearch(v.currentTarget.value)
    }}/>
  </div>
  
  
</div>
}