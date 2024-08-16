'use client'

import { Aluno, Treino } from "@/app/types"
import { MdOutlineEdit } from "react-icons/md";
import { FaCheckCircle, FaRegMoneyBillAlt } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MyModal from "../../_componnents/dialog";
import { Edit } from "lucide-react";
import { Edite } from "../../alunosPage/components/edit";
import { toast } from "@/components/ui/use-toast";
import { IoTrashOutline } from "react-icons/io5";
import  EditeTreino  from "./editTreino";

export const CardTreino = (treinoCurrent: Treino): JSX.Element => {

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
      <div className="bg-yellow-400 p-3 rounded-lg">
        <MyModal icon={<MdOutlineEdit className=" text-black" size={24} />}>
          <EditeTreino {...treinoCurrent}/>
        </MyModal>
      </div>
      <div className="bg-red-500 p-3 rounded-lg">
        <MyModal icon={<div className=""><IoTrashOutline className=" text-black text-center " size={24} /></div>}>
          <div className="">
            <h1 className="text-xl font-medium text-red-500">
              Exclusão
            </h1>
            <p className="mt-2 text-sm text-white/50">
              Confirmar a exclusão da conta do Treino: {treinoCurrent.name}
            </p>
            <div className="mt-4 space-x-3">
              <button
                className="rounded-lg bg-red-500 py-2 px-3 font-bold"
                onClick={async () => {
                  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/treino/${treinoCurrent.id}`, {
                    method: "DELETE",

                  })

                  toast({
                    className: "bg-bg border border-yellow-300 text-red-500 ",
                    title: 'Treino excluido',
                    duration: 1000,
                    action: <FaCheckCircle size={25} />
                  })


                }}
              >
                Excluir
              </button>

            </div>
          </div>
        </MyModal>
      </div>


    </div>


  </div>
}