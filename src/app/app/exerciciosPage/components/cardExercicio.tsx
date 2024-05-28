'use client'

import { Aluno, Exercicio, Treino } from "@/app/types"
import { MdOutlineEdit } from "react-icons/md";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import Link from "next/link";
import {useRouter } from "next/navigation";
import MyModal from "../../_componnents/dialog";
import { Edit } from "lucide-react";
import { Edite } from "../../alunosPage/components/edit";
import { EditeExercicio } from "./editExercicio";

export const CardExercicio = ({exercicioCurrent,editable}:{editable:boolean,exercicioCurrent:Exercicio}):JSX.Element=>{
  
  const route = useRouter()
  return <div className="flex w-full items-center justify-between">

    <div className="flex space-x-12 items-center">
      <div className="h-12 w-12 bg-yellow-400 rounded-full ">

      </div>

      <div className="w-56 max-sm:w-36 ">
        <h1 className="text-zinc-400 text-sm font-bold m-auto break-words">{exercicioCurrent.title}</h1>
      </div>

    


    </div>

    {editable ? <div className="flex max-sm:w-0  space-x-5">
      <MyModal  icon={<MdOutlineEdit className=" text-white hover:text-yellow-400" size={24} />}>
        <EditeExercicio {...exercicioCurrent}/>
      </MyModal>
      
    </div> : null}
    

  </div>
}