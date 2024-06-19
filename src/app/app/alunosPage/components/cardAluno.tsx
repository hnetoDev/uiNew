'use client'

import { Aluno } from "@/app/types"
import { MdOutlineEdit } from "react-icons/md";
import { FaCheckCircle, FaRegMoneyBillAlt } from "react-icons/fa";
import Link from "next/link";
import {useRouter } from "next/navigation";
import MyModal from "../../_componnents/dialog";
import { Edit } from "lucide-react";
import { Edite } from "./edit";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import Image from "next/image";
import { env } from "process";

export const CardAluno = (userCurrent:Aluno):JSX.Element=>{


  const [pix,setPix] = useState<boolean>(false)
  const [dinheiro,setDinheiro] = useState<boolean>(false)
  const [inativa,setInativa] = useState<boolean>(false)
  const [data,setData] = useState<String>();






  const payment = async()=>{
    console.log(data)
    if(!pix && !dinheiro && !inativa){
      return toast({
        className:"bg-bg border border-yellow-300 text-red-500 ",
        title:'Selecione um metodo de pagamento',
        action: <FaCheckCircle size={25}/>,
        duration:1000
    })
    }
    if(data === undefined){
      return toast({
        className:"bg-bg border border-yellow-300 text-red-500 ",
        title:'Selecione a data do pagamento',
        action: <FaCheckCircle size={25}/>,
        duration:1000
    })
    }
    let paymentS = inativa
    if(userCurrent.active === true && !paymentS === true){
      return toast({
        className:"bg-bg border border-yellow-300 text-red-500 ",
        title:'Aluno com mensalidade paga',
        action: <FaCheckCircle size={25}/>,
        duration:1000
    })
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/updatePayment/${userCurrent.id}`,{
      method:'PUT',
      body:JSON.stringify({
        active:inativa ? false : true,
        method:pix ? 'pix' : 'dinheiro',
        date:data
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    })
    if(res.status === 200){
      return toast({
        className:"bg-bg border border-yellow-300 text-green-400 ",
        title:'Pagamento aprovado com sucesso',
        action: <FaCheckCircle size={25}/>,
        duration:1000
    }) 
    
    }
    return toast({
      className:"bg-bg border border-yellow-300 text-green-400 ",
      title:'Pagamento não aprovado por erro',
      action: <FaCheckCircle size={25}/>,
      duration:1000
  })
  }
  const route = useRouter()
  return <div className="flex w-full items-center justify-between">

    <div className="flex space-x-12 items-center">
      <div className="h-12 w-12 flex justify-center items-center bg-yellow-400 rounded-full ">
        <Image src={userCurrent.genero === 'm' ? '/images/gerente.png' : '/images/woman.png'} alt="man" width={25} height={25}/>
      </div>

      <div className="w-40 max-sm:w-16 ">
        <h1 className="text-zinc-400 text-sm font-bold m-auto break-words">{userCurrent.name}</h1>
      </div>

      <div className=" max-sm:w-12 w-0 overflow-hidden">
        <MyModal icon={<FaRegMoneyBillAlt className="text-green-400 text-center" size={24}/>  }>
           <h1 className="text-xl font-medium text-white">
                    Pagamentos
                  </h1>
                  <p className="mt-2 flex text-sm text-white/50">
                    Confirmar o pagamento do plano do aluno <p className="text-yellow-400">: {userCurrent.name}</p>
                  </p>
                  <input type="date" className="p-3 bg-bg"  />
                  <div className="mt-4 space-x-3">
                    <button onClick={()=>{
                     
                     
                    }}
                      className="rounded-lg bg-green-400 py-2 px-3 font-bold"
                      
                    >
                      PIX
                    </button>
                    <button onClick={()=>{
                      
                     
                    }}
                      className="rounded-lg bg-green-400 py-2 px-3 font-bold"
                      
                    >
                      dinheiro
                    </button>
                    <button onClick={()=>{
                      
                     
                    }}
                      className="rounded-lg border border-red-500 py-2 px-3 font-bold text-red-500 "
                      
                    >
                      Sair
                    </button>
                  </div>
        </MyModal>
      </div> 

      <div className="w-48  break-words ">
        <h1 className=" text-yellow-300 text-sm max-sm:invisible font-bold text-center break-words">{userCurrent.email}</h1>
      </div>

      <div className="w-20 max-sm:w-0 max-sm:invisible">
        {userCurrent.active ? <h1 className="text-green-400">Ativo</h1> : <h1 className="text-red-400">Inativo</h1> }
      </div>

    </div>

    <div className="flex space-x-5">
      <MyModal  icon={<MdOutlineEdit className=" text-white hover:text-yellow-400" size={24} />}>
        <Edite user={userCurrent}/>
      </MyModal>
      <MyModal  icon={<FaRegMoneyBillAlt className="text-green-400 cursor-pointer" size={24}  />}>
        <h1 className="text-xl font-medium text-white">
                    Pagamentos
                  </h1>
                  <p className="mt-2 flex text-sm text-white/50">
                    Confirmar o pagamento do plano do aluno <p className="text-yellow-400">: {userCurrent.name}</p>
                  </p>

                  <div className="flex justify-between items-center">
                  <div className="flex space-x-4 items-center">
                  <input type="date" className="p-3 mt-4 rounded-lg bg-bg text-zinc-300" onChange={(d)=>{
                    setData(d.target.value)
                  }}  />
                  
                  <div className="mt-4 space-x-3">
                    <button onClick={()=>{
                      setPix(true)
                      setDinheiro(false)
                      setInativa(false)
                    }}
                      className={`rounded-lg ${pix ? 'bg-green-500 text-bg' : 'border border-green-400 text-green-400'} py-2 px-3 font-bold`}
                      
                    >
                      PIX
                    </button>
                    <button onClick={()=>{
                      setPix(false)
                      setDinheiro(true)
                      setInativa(false)
                    }}
                    className={`rounded-lg ${dinheiro ? 'bg-green-500 text-bg' : 'border border-green-400 text-green-400'} py-2 px-3 font-bold`}
                      
                    >
                      Dinheiro
                    </button>
                    <button onClick={()=>{
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
                    <button onClick={()=>{
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
    

  </div>
}