'use client'

import { Aluno, Exercicio, Treino } from "@/app/types"
import { MdOutlineEdit } from "react-icons/md";
import { FaCheckCircle, FaRegMoneyBillAlt } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MyModal from "../../_componnents/dialog";
import { Edit } from "lucide-react";
import { Edite } from "../../alunosPage/components/edit";
import { EditeExercicio } from "./editExercicio";
import Image from "next/image";
import { toast } from "@/components/ui/use-toast";
import { IoTrashOutline } from "react-icons/io5";

export const CardExercicio = ({ exercicioCurrent, editable }: { editable: boolean, exercicioCurrent: Exercicio }): JSX.Element => {

  const route = useRouter()
  return <div className="flex w-full items-center justify-between">

    <div className="flex space-x-12 items-center">
      <div className={ exercicioCurrent.img ? `h-12 w-12 rounded-full` : `h-12 w-12 rounded-full`}>
        <img
          className="h-12 w-12 rounded-full"
          src={exercicioCurrent.img  ? `${process.env.NEXT_PUBLIC_API_URL}/public/exercicios/${exercicioCurrent.img}` : '/images/academia.png'}
          alt="Image Ex"
          width={80}
          height={80}
        />
      </div>

      <div className="w-56 max-sm:w-36 ">
        <h1 className="text-zinc-400 text-sm font-bold m-auto break-words">{exercicioCurrent.name}</h1>
      </div>

    </div>

    

    <div className="flex space-x-2 items-center w-max ">

    <div className="mr-5 w-24">
      <h1 className="text-green-400">{exercicioCurrent.category}</h1>
    </div>

      <div className="bg-yellow-400 p-3 rounded-lg">
        <MyModal icon={<MdOutlineEdit className=" text-black" size={24} />}>
          <EditeExercicio {...exercicioCurrent} />
        </MyModal>
      </div>

      <div className="bg-red-500 p-3 rounded-lg">
        <MyModal icon={<div className=""><IoTrashOutline className=" text-black text-center " size={24} /></div>}>
          <div className="">
            <h1 className="text-xl font-medium text-red-500">
              Exclusão
            </h1>
            <p className="mt-2 text-sm text-white/50">
              Confirmar a exclusão do exercicio: {exercicioCurrent.name}
            </p>
            <div className="mt-4 space-x-3">
              <button
                className="rounded-lg bg-red-500 py-2 px-3 font-bold"
                onClick={async () => {
                  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/exercicio/${exercicioCurrent.id}`, {
                    method: "DELETE",

                  })

                  toast({
                    className: "bg-bg border border-yellow-300 text-red-500 ",
                    title: 'Aluno excluido com sucesso',
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

    {editable ? <div className="flex max-sm:w-0  space-x-5">
      <MyModal icon={<MdOutlineEdit className=" text-white hover:text-yellow-400" size={24} />}>
        <EditeExercicio {...exercicioCurrent} />
      </MyModal>

    </div> : null}


  </div>
}