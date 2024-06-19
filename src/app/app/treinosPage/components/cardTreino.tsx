'use client'

import { Aluno, Treino } from "@/app/types"
import { MdOutlineEdit } from "react-icons/md";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import Link from "next/link";
import {useRouter } from "next/navigation";
import MyModal from "../../_componnents/dialog";
import { Edit } from "lucide-react";
import { Edite } from "../../alunosPage/components/edit";

export const CardTreino = (treinoCurrent:Treino):JSX.Element=>{
  
  const route = useRouter()
  return <div className="flex w-full items-center justify-between">

    <div className="flex space-x-12 items-center">
      <div className="h-12 w-12 bg-yellow-400 rounded-full ">

      </div>

      <div className="w-56 max-sm:w-36 ">
        <h1 className="text-zinc-400 text-sm font-bold m-auto break-words">{treinoCurrent.name}</h1>
      </div>

    


    </div>

    <div className="flex max-sm:w-0  space-x-5">
      <MyModal  icon={<MdOutlineEdit className=" text-white hover:text-yellow-400" size={24} />}>
        <h1>a</h1>
      </MyModal>
      
    </div>
    

  </div>
}