'use client'

import { toast } from "@/components/ui/use-toast"
import { useForm } from "react-hook-form"
import { FaCheckCircle } from "react-icons/fa"
import { IoAdd, IoPersonAddOutline, IoTrashOutline } from "react-icons/io5"

export function CriarExercicio(){
  const form = useForm()

  const handleSubmit = form.handleSubmit(async(data)=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/exercicios/create`,{
      method:'POST',
      headers:{
         'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        name:data.name,
        desc:data.desc
      })
    })

    
    if(res.ok){
      toast({
        className:"bg-bg border border-yellow-300 text-green-400 ",
        title:'Exercicio Cadastrado com sucesso',
        duration:1000,
        action: <FaCheckCircle size={25}/>
    })
  }
})

  return <div className=" w-full  css  space-y-3 ">
    <h1 className="text-white text-2xl text-center">Adicione um novo Exercício</h1>
    <div className="mx-auto rounded-lg space-y-3   p-6 ">
     <div className="flex max-sm:flex-col"> 
      <div className="w-2/5 max-sm:w-full first-letter:h-full ">
        <div className="w-36 h-36 m-auto bg-yellow-400 rounded-full"></div>
      </div>
      <div className="ml-4 w-3/5 max-sm:w-full max-sm:ml-0 flex flex-col space-y-4">
        <div className="flex flex-col justify-stretch" >
            <h1 className="text-zinc-300 font-bold">Nome do exercício:</h1>
            <input className="px-3 py-3 text-zinc-300 bg-bg rounded-lg " type="text" {...form.register('name')} required  />
          </div>
        <div className="flex flex-col justify-stretch" >
            <h1 className="text-zinc-300 font-bold">descrição</h1>
            <input className="px-3 py-3 text-zinc-300 bg-bg rounded-lg " type="text" {...form.register('desc')} />
        </div>
       
      </div>   
     </div> 
     <div className="flex max-sm:space-x-1 max-sm:justify-between space-x-2 justify-end">
       <button onClick={handleSubmit}  className="p-3 flex max-sm:px-2 bg-green-400 max-sm:space-x-1 rounded-lg items-center justify-center space-x-2">
        <IoAdd className="text-bg"/>
        <h1 className="font-bold">Adicionar</h1>
       </button>
      
     </div>
    </div>
  </div>
}