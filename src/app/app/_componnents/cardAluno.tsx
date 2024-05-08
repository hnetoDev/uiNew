'use client'

import { Aluno } from "@/app/types"
import { MdOutlineEdit } from "react-icons/md";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import Link from "next/link";
import {useRouter } from "next/navigation";
import MyModal from "./dialog";
import { Edit } from "lucide-react";
import { Edite } from "./edit";

export const CardAluno = (userCurrent:Aluno):JSX.Element=>{
  const route = useRouter()
  return <div className="flex w-full items-center justify-between">

    <div className="flex space-x-12 items-center">
      <div className="h-12 w-12 bg-yellow-400 rounded-full ">

      </div>

      <div className="w-20 max-sm:w-16 ">
        <h1 className="text-zinc-400 text-sm font-bold m-auto break-words">{userCurrent.name}</h1>
      </div>

      <div className=" max-sm:w-12 w-0 overflow-hidden">
        <MyModal icon={<FaRegMoneyBillAlt className="text-green-400 text-center" size={24}/>  }>
           <h1 className="text-xl font-medium text-white">
                    Pagamentos
                  </h1>
                  <p className="mt-2 text-sm text-white/50">
                    Confirmar o pagamento do plano do aluno: {userCurrent.name}
                  </p>
                  <div className="mt-4 space-x-3">
                    <button
                      className="rounded-lg bg-green-400 py-2 px-3 font-bold"
                      
                    >
                      Confirmar
                    </button>
                    <button
                      className="rounded-lg border border-red-500 py-2 px-3 font-bold text-red-500 "
                      
                    >
                      Sair
                    </button>
                  </div>
        </MyModal>
      </div> 

      <div className="w-48  break-words ">
        <h1 className=" text-zinc-400 text-sm max-sm:invisible font-bold text-center break-words">{userCurrent.email}</h1>
      </div>

      <div className="w-20 max-sm:w-0 max-sm:invisible">
        {userCurrent.active ? <h1 className="text-green-400">Ativo</h1> : <h1 className="text-red-400">Inativo</h1> }
      </div>

    </div>

    <div className="flex space-x-5">
      <MyModal  icon={<MdOutlineEdit className=" text-white hover:text-yellow-400" size={24} />}>
        <Edite user={userCurrent}/>
      </MyModal>
      <MyModal  icon={<FaRegMoneyBillAlt className="text-green-400" size={24}  />}>
        <h1 className="text-xl font-medium text-white">
                    Pagamentos
                  </h1>
                  <p className="mt-2 text-sm text-white/50">
                    Confirmar o pagamento do plano do aluno: {userCurrent.name}
                  </p>
                  <div className="mt-4 space-x-3">
                    <button
                      className="rounded-lg bg-green-400 py-2 px-3 font-bold"
                      
                    >
                      Confirmar
                    </button>
                    <button
                      className="rounded-lg border border-red-500 py-2 px-3 font-bold text-red-500 "
                      
                    >
                      Sair
                    </button>
                  </div>
      </MyModal>
    </div>
    

  </div>
}