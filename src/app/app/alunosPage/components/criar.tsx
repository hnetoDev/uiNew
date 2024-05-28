'use client'
import { Aluno, Plano } from "@/app/types";
import { useForm } from "react-hook-form";
import { IoPersonAddOutline, IoTrashOutline } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import '../../global.css'
import { headers } from "next/headers";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";
export function Add({data,setData}:{data?:Aluno[],setData:Dispatch<SetStateAction<Aluno[] | undefined>>}){

  const [planos,setPlanos] = useState<Plano[]>();
  
  useEffect(()=>{
    async function getData(){
      const res = await fetch('http://localhost:8000/api/user/planos',{
        method:"GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      })
      const planos:Plano[] = await res.json();
      setPlanos(planos);
    }
     getData()
  },[])
  const routes = useRouter()
  const form = useForm()
  const update = form.handleSubmit(async (data) =>{
    console.log(data.name)
    console.log(data.cpf)
    
    const res = await fetch(`http://localhost:8000/api/user`,{
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
      body:JSON.stringify({
        name:data.name,
        cpf:data.cpf,
        email:data.email,
        tel:data.tel,
        emerg:data.emerg,
        password:data.password,
        planoId:data.plano
        
      }),
      
    
    })
    const user:Aluno = await res.json()

  
    if(res.ok){
      setData((prev) => {
        prev!.push(user)
        return prev
      })
      toast({
        className:"bg-bg border border-yellow-300 text-green-400 ",
        title:'Aluno Cadastrado com sucesso',
        duration:1000,
        action: <FaCheckCircle size={25}/>
    })
    
    
    }
  })

  

  return <div className=" w-full  css  space-y-3 ">
    <h1 className="text-white text-2xl text-center">Adicione um novo aluno</h1>
    <div className="mx-auto rounded-lg space-y-3  p-4 ">
     <div className="flex max-sm:flex-col"> 
      <div className="w-2/6 max-sm:w-full first-letter:h-full ">
        <div className="w-40 h-40 mb-4 m-auto bg-yellow-400 rounded-full"></div>
        <div className="space-y-4 flex  flex-col justify-stretch">
          <div className="flex flex-col justify-stretch">
            <h1 className="text-zinc-300 font-bold">Nome:</h1>
            <input className="px-3 py-3 text-zinc-300 bg-bg rounded-lg " type="text"  {...form.register('name')} />
          </div>
          <div className="flex flex-col justify-stretch" >
            <h1 className="text-zinc-300 font-bold">Email:</h1>
            <input className="px-3 py-3 text-zinc-300 bg-bg rounded-lg " type="text"  {...form.register('email')} />
          </div>
          
        </div>
      </div>
      <div className="ml-4 w-3/6 max-sm:w-full max-sm:ml-0 flex flex-col space-y-4">
        <div className="flex flex-col justify-stretch" >
            <h1 className="text-zinc-300 font-bold">CPF:</h1>
            <input className="px-3 py-3 text-zinc-300 bg-bg rounded-lg " type="text" {...form.register('cpf')}  />
          </div>
        <div className="flex flex-col justify-stretch" >
            <h1 className="text-zinc-300 font-bold">Tel:</h1>
            <input className="px-3 py-3 text-zinc-300 bg-bg rounded-lg " type="text" {...form.register('tel')} />
        </div>
        <div className="flex flex-col justify-stretch" >
            <h1 className="text-zinc-300 font-bold">Tel. Emergência:</h1>
            <input className="px-3 py-3 text-zinc-300 bg-bg rounded-lg " type="text" {...form.register('emerg')}  />
        </div>
        
        <div className="flex flex-col justify-stretch" >
          <h1 className="text-zinc-300 font-bold">Planos:</h1>
          <select className="bg-bg  text-zinc-300 rounded-lg p-3"  id="planos " {...form.register('plano')}>
            {planos?.map(p =>{
              return <option key={`${p.id}`} value={p.id as string}>{p.name}</option>
            })}
          </select>
        </div>    
      </div> 
      <div className="ml-4 space-y-4 max-sm:ml-0">
        <div className="flex flex-col justify-stretch" >
            <h1 className="text-zinc-300 font-bold">Objetivo:</h1>
            <input className="px-3 py-3 text-zinc-300 bg-bg rounded-lg " type="text" {...form.register('objetivo')} />
        </div>
        <div className="flex flex-col justify-stretch" >
            <h1 className="text-zinc-300 font-bold">Senha:</h1>
            <input className="px-3 py-3 text-zinc-300 bg-bg rounded-lg " type="text" {...form.register('password')}  />
        </div>
      </div> 
        
     </div> 
     <div className="flex max-sm:space-x-1 max-sm:justify-between space-x-2 justify-end">
       <button onClick={update} className="p-3 css2 flex max-sm:px-2 border border-green-400 max-sm:space-x-1 rounded-lg items-center justify-center space-x-2">
        <IoPersonAddOutline className="text-green-400"/>
        <h1 className="font-bold text-green-400">Adicionar</h1>
       </button>
       
       
     </div>
    </div>
  </div>
}