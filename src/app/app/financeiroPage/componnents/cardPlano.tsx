'use client'
import { FaCheckCircle, FaRegMoneyBillAlt } from "react-icons/fa"
import MyModal from "../../_componnents/dialog"
import { MdOutlineEdit } from "react-icons/md"
import { Edite } from "../../alunosPage/components/edit"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { Plano } from "@/app/types"
import { IoTrashOutline } from "react-icons/io5"

export function CardPlano(userCurrent:Plano){


  return <div className="flex w-full items-center justify-between">

    <div className="flex space-x-12 items-center">
      <div className="h-12 w-12 bg-yellow-400 rounded-full ">

      </div>

      <div className="w-48 max-sm:w-12 ">
        <h1 className="text-zinc-400 text-sm font-bold m-auto break-words">{userCurrent.name}</h1>
      </div>

      <div className=" max-sm:w-12 w-32   overflow-hidden">
        <h1 className="text-green-400 max-sm:ml-0 ml-14 text-center text-sm font-bold m-auto break-words">{userCurrent.value}</h1>
      </div> 

      <div className="w-48  break-words ">
        <h1 className=" text-yellow-400 text-sm max-sm:invisible font-bold text-center break-words">{userCurrent.duration}</h1>
      </div>

      

    </div>
    <div className="bg-red-500 p-3 rounded-lg">
        <MyModal icon={<div className=""><IoTrashOutline className=" text-black text-center " size={24} /></div>}>
          <div className="">
            <h1 className="text-xl font-medium text-red-500">
              Exclusão
            </h1>
            <p className="mt-2 text-sm text-white/50">
              Confirmar a exclusão da conta do plano: {userCurrent.name}
            </p>
            <div className="mt-4 space-x-3">
              <button
                className="rounded-lg bg-red-500 py-2 px-3 font-bold"
                onClick={async () => {
                  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/plano/${userCurrent.id}`, {
                    method: "DELETE",
                  
                  })
                  
                  toast({
                    className: "bg-bg border border-yellow-300 text-red-500 ",
                    title: 'Plano excluido',
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
}