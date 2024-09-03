'use client'

import { Aluno } from "@/app/types"
import { MdOutlineEdit } from "react-icons/md";
import { FaCheckCircle, FaRegMoneyBillAlt } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MyModal from "../../_componnents/dialog";
import { Edit } from "lucide-react";
import { Edite } from "./edit";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import Image from "next/image";
import { env } from "process";
import { IoTrashOutline } from "react-icons/io5";


export const CardAluno = (userCurrent: Aluno): JSX.Element => {


  const [pix, setPix] = useState<boolean>(false)
  const [dinheiro, setDinheiro] = useState<boolean>(false)
  const [inativa, setInativa] = useState<boolean>(false)
  const [data, setData] = useState<String>();

  const routes = useRouter()




  const payment = async () => {
    console.log(data)
    if (!pix && !dinheiro && !inativa) {
      return toast({
        className: "bg-bg border border-yellow-300 text-red-500 ",
        title: 'Selecione um metodo de pagamento',
        action: <FaCheckCircle size={25} />,
        duration: 1000
      })
    }
    if (data === undefined) {
      return toast({
        className: "bg-bg border border-yellow-300 text-red-500 ",
        title: 'Selecione a data do pagamento',
        action: <FaCheckCircle size={25} />,
        duration: 1000
      })
    }
    let paymentS = inativa
    if (userCurrent.active === true && !paymentS === true) {
      return toast({
        className: "bg-bg border border-yellow-300 text-red-500 ",
        title: 'Aluno com mensalidade paga',
        action: <FaCheckCircle size={25} />,
        duration: 1000
      })
    }
    console.log(userCurrent.planoId)
    const dataTratada = (Number(data.slice(5, 7)) - 1)

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/entrada`, {
      method: 'POST',
      body: JSON.stringify({
        name: userCurrent.name,
        active: inativa ? false : true,
        method: inativa ? null : pix ? 'pix' : 'dinheiro',
        date: data,
        planoId: userCurrent.planoId,
        userId: userCurrent.id,
        month: dataTratada
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    if (res.status === 201) {
      return toast({
        className: inativa ? "bg-bg border border-red-500 text-red-500 "  : "bg-bg border border-yellow-300 text-green-400 ",
        title: inativa ? 'Aluno Inativado' : `Pagamento aprovado com sucesso`,
        action: <FaCheckCircle size={25} />,
        duration: 1000
      })

    }
    return toast({
      className: "bg-bg border border-yellow-300 text-green-400 ",
      title: 'Pagamento não aprovado por erro',
      action: <FaCheckCircle size={25} />,
      duration: 1000
    })
  }
  const route = useRouter()
  return <div className="flex w-full items-center justify-between">

  <div className="flex space-x-12 items-center">
    <div className={` ${userCurrent.img ? 'bg-zinc-900' : null} h-16 w-16 flex justify-center items-center bg-yellow-400 rounded-full `}>
      <img className={userCurrent.img ? `h-16 w-16 rounded-full` : `h-8 w-8 `} src={userCurrent.img ? `${process.env.NEXT_PUBLIC_API_URL}/public/users/${userCurrent.img}` : userCurrent.genero === 'm' ? '/images/gerente.png' : '/images/woman.png'} alt="man" width={300} height={300} />
    </div>

    <div className="w-48 max-sm:w-24 ">
      <h1 className="text-zinc-400 text-sm font-bold m-auto break-words">{userCurrent.name}</h1>
    </div>



    <div className="w-48  break-words ">
      <h1 className=" text-yellow-300 text-sm font-bold text-center break-words">{userCurrent.email}</h1>
    </div>

    <div className="w-20 ">
      {userCurrent.active ? <h1 className="text-green-400">Ativo</h1> : <h1 className="text-red-400">Inativo</h1>}
    </div>

  </div>

  <div className="flex space-x-5">

    <div className="bg-yellow-400 p-3 rounded-lg">
      <MyModal icon={<MdOutlineEdit className=" text-black" size={24} />}>
        <Edite user={userCurrent} />
      </MyModal>
    </div>

    <div className="bg-green-400 p-3 rounded-lg">
      <MyModal icon={<FaRegMoneyBillAlt className="text-black cursor-pointer" size={24} />}>
        <h1 className="text-xl font-medium text-green-400">
          Pagamentos
        </h1>
        <p className="mt-2 flex text-sm text-white/50">
          Confirmar o pagamento do plano do aluno <p className="text-yellow-400">: {userCurrent.name}</p>
        </p>

        <div className="flex justify-between items-center">
          <div className="flex space-x-4 items-center">
            <input type="date" className="p-3 mt-4 rounded-lg bg-bg text-zinc-300" onChange={(d) => {
              setData(d.target.value)
            }} />

            <div className="mt-4 space-x-3">
              <button onClick={() => {
                setPix(true)
                setDinheiro(false)
                setInativa(false)
              }}
                className={`rounded-lg ${pix ? 'bg-green-500 text-bg' : 'border border-green-400 text-green-400'} py-2 px-3 font-bold`}

              >
                PIX
              </button>
              <button onClick={() => {
                setPix(false)
                setDinheiro(true)
                setInativa(false)
              }}
                className={`rounded-lg ${dinheiro ? 'bg-green-500 text-bg' : 'border border-green-400 text-green-400'} py-2 px-3 font-bold`}

              >
                Dinheiro
              </button>
              <button onClick={() => {
                setPix(false)
                setDinheiro(false)
                setInativa(true)

              }}
                className={`rounded-lg ${inativa ? 'bg-red-500 text-bg' : 'border border-red-400 text-red-400'} py-2 px-3 font-bold`}

              >
                Inativar
              </button>
            </div>
          </div>
          <div className="mt-4">
            <button onClick={() => {
              payment()

            }}
              className={`rounded-lg bg-yellow-400 py-2 px-3 font-bold`}

            >
              Concluir
            </button>

          </div>
        </div>
      </MyModal>
    </div>

    <div className="bg-red-500 p-3 rounded-lg">
      <MyModal icon={<div className=""><IoTrashOutline className=" text-black text-center " size={24} /></div>}>
        <div className="">
          <h1 className="text-xl font-medium text-red-500">
            Exclusão
          </h1>
          <p className="mt-2 text-sm text-white/50">
            Confirmar a exclusão da conta do aluno: {userCurrent.name}
          </p>
          <div className="mt-4 space-x-3">
            <button
              className="rounded-lg bg-red-500 py-2 px-3 font-bold"
              onClick={async () => {
                const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${userCurrent.id}`, {
                  method: "DELETE",
                
                })
                
                toast({
                  className: "bg-bg border border-yellow-300 text-red-500 ",
                  title: 'Aluno excluido com sucesso',
                  duration: 1000,
                  action: <FaCheckCircle size={25} />
                })

                routes.push('/app/alunosPage')

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