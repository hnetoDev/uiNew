'use client'
import { Aluno, Plano } from "@/app/types";
import { useForm } from "react-hook-form";
import { IoTrashOutline } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import '../../global.css'
import { IoMdExit } from "react-icons/io";
import bcrypt from "bcrypt";
import { useEffect, useState } from "react";
export function Edite({user}: {user:Aluno}){

  const [planos,setPlanos] = useState<Plano[]>();

  
  useEffect(()=>{
    async function getData(){
      const res = await fetch("http://localhost:8000/api/user/planos",{
        method:"GET"
      })

      if(res.ok){
        const planos:Plano[] = await res.json();
        setPlanos(planos)
        console.log(planos)
      }
      if(!res.ok){
        console.log("erro")
      }
    }

    getData();
  },[])
  const form = useForm()
  const update =  form.handleSubmit(async (data) =>{
    console.log(data.name)
    const res = await fetch(`http://localhost:8000/api/user/update/${user.id}`,{
      method:'PUT',
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
      })
     
    })
    
    console.log(res.json())
  })

  

  return <div className=" w-full  css  space-y-3 ">
  <h1 className="text-white text-2xl text-center">Edite os dados do aluno :{user.name}</h1>
  <div className="mx-auto rounded-lg space-y-3  p-3 ">
   <div className="flex max-sm:flex-col"> 
    <div className="w-2/6 max-sm:w-full first-letter:h-full ">
      <div className="w-40 h-40 mb-4 m-auto bg-yellow-400 rounded-full"></div>
      <div className="space-y-4 flex  flex-col justify-stretch">
        <div className="flex flex-col justify-stretch">
          <h1 className="text-zinc-300 font-bold">Nome:</h1>
          <input className="px-3 py-3 text-zinc-300 bg-bg rounded-lg " type="text" defaultValue={`${user.name}`} {...form.register('name')} />
        </div>
        <div className="flex flex-col justify-stretch" >
          <h1 className="text-zinc-300 font-bold">Email:</h1>
          <input className="px-3 py-3 text-zinc-300 bg-bg rounded-lg " type="text" defaultValue={`${user.email}`}  {...form.register('email')} />
        </div>
        
      </div>
    </div>
    <div className="ml-4 w-3/6 max-sm:w-full max-sm:ml-0 flex flex-col space-y-4">
      <div className="flex flex-col justify-stretch" >
          <h1 className="text-zinc-300 font-bold">CPF:</h1>
          <input className="px-3 py-3 text-zinc-300 bg-bg rounded-lg " type="text" defaultValue={`${user.cpf}`} {...form.register('cpf')}  />
        </div>
      <div className="flex flex-col justify-stretch" >
          <h1 className="text-zinc-300 font-bold">Tel:</h1>
          <input className="px-3 py-3 text-zinc-300 bg-bg rounded-lg " type="text" defaultValue={`${user.tel}`} {...form.register('tel')} />
      </div>
      <div className="flex flex-col justify-stretch" >
          <h1 className="text-zinc-300 font-bold">Tel. Emergência:</h1>
          <input className="px-3 py-3 text-zinc-300 bg-bg rounded-lg " type="text" defaultValue={`${user.emerg}`} {...form.register('emerg')}  />
      </div>
      
      <div className="flex flex-col justify-stretch" >
        <h1 className="text-zinc-300 font-bold">Planos:</h1>
        <select className="bg-bg  text-zinc-300 rounded-lg p-3" {...form.register('plano')} id="planos">
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
          <input className="px-3 py-3 text-zinc-300 bg-bg rounded-lg " type="text" defaultValue={'***********'} {...form.register('password')}  />
      </div>
    </div> 
      
   </div> 
   <div className="flex max-sm:space-x-1 max-sm:justify-between space-x-2 justify-end">
     <button onClick={update} className="p-3 css2 flex max-sm:px-2 border border-green-400 max-sm:space-x-1 rounded-lg items-center justify-center space-x-2">
      <MdOutlineEdit   className="text-green-400"/>
      <h1 className="font-bold text-green-400">Editar</h1>
     </button>
     
     
   </div>
  </div>
</div>
}