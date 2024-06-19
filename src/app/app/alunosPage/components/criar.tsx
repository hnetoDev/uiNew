'use client'
import { Aluno, Plano, Treino } from "@/app/types";
import { LuImagePlus } from "react-icons/lu";
import { useForm } from "react-hook-form";
import { IoPersonAddOutline, IoTrashOutline } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import '../../global.css'
import { headers } from "next/headers";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";
import { env } from "process";
export function Add({data,setData}:{data?:Aluno[],setData:Dispatch<SetStateAction<Aluno[] | undefined>>}){

  const [planos,setPlanos] = useState<Plano[]>();
  const [treinos,setTreinos] = useState<Treino[]>()
  useEffect(()=>{
    async function getData(){
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/planos`,{
        method:"GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      })
      const planos:Plano[] = await res.json();
      setPlanos(planos);
    }
    
    async function getData2() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/treinos`,{
        method:'GET'
      })
      const treinos:Treino[] = await res.json()
      setTreinos(treinos)
    }
    getData()
    getData2()
    console.log(planos);

  },[])
  const routes = useRouter()
  const form = useForm()
  const update = form.handleSubmit(async (data) =>{
    
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`,{
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
        planoId:data.plano,
        mensalidade:data.data,
        genero:data.genero
        
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
    <form onSubmit={update}>
    <h1 className="text-white text-2xl text-center">Adicione um novo aluno</h1>
    <div className="mx-auto rounded-lg space-y-3  p-4 ">
     <div className="flex max-sm:flex-col"> 
      <div className="w-2/6 max-sm:w-full first-letter:h-full ">
        <div className="w-40 h-40 mb-4 m-auto bg-yellow-400 flex justify-center items-center rounded-full">
          <LuImagePlus className="m-auto font-bold" size={30}  /> 
        </div>
        <div className="space-y-4 flex  flex-col justify-stretch">
          <div className="flex flex-col justify-stretch">
            <h1 className="text-zinc-300 font-bold">Nome:</h1>
            <input className="px-3 py-3 text-zinc-300 bg-bg rounded-lg " type="text" required  {...form.register('name')} />
          </div>
          <div className="flex flex-col justify-stretch" >
            <h1 className="text-zinc-300 font-bold">Email:</h1>
            <input className="px-3 py-3 text-zinc-300 bg-bg rounded-lg " type="text" required {...form.register('email')} />
          </div>
          
        </div>
      </div>
      <div className="ml-4 w-3/6 max-sm:w-full max-sm:ml-0 flex flex-col space-y-4">
        <div className="flex flex-col justify-stretch" >
            <h1 className="text-zinc-300 font-bold">CPF:</h1>
            <input className="px-3 py-3 text-zinc-300 bg-bg rounded-lg " required type="text" {...form.register('cpf')}  />
          </div>
        <div className="flex flex-col justify-stretch" >
            <h1 className="text-zinc-300 font-bold">Tel:</h1>
            <input className="px-3 py-3 text-zinc-300 bg-bg rounded-lg " required type="text" {...form.register('tel')} />
        </div>
        <div className="flex flex-col justify-stretch" >
            <h1 className="text-zinc-300 font-bold">Tel. Emergência:</h1>
            <input className="px-3 py-3 text-zinc-300 bg-bg rounded-lg " required type="text" {...form.register('emerg')}  />
        </div>

        <div className="flex flex-col justify-stretch" >
            <h1 className="text-zinc-300 font-bold">Data de nascimento:</h1>
            <input className="px-3 py-3 text-zinc-300 bg-bg rounded-lg " required placeholder="--/--/--" type="date" {...form.register('data')} />
        </div>

        <div className="flex flex-col justify-stretch" >
          <h1 className="text-zinc-300 font-bold">Gênero:</h1>
          <select className="bg-bg  text-zinc-300 rounded-lg p-3" required defaultValue={''}  id="genero" {...form.register('genero')}>
            <option className="bg-blue-500 p-4 text-bg" value="m">Masculino</option>
            <option className="bg-pink-500 p-4 text-bg" value="f">Feminino</option>
          </select>
        </div>    
        
      </div> 
      <div className="ml-4 space-y-4 max-sm:ml-0">

      <div className="flex flex-col justify-stretch" >
          <h1 className="text-zinc-300 font-bold">Planos:</h1>
          <select className="bg-bg  text-zinc-300 rounded-lg p-3" required   defaultValue={''} id="planos " {...form.register('plano')}>
            {planos?.map(p =>{
              return <option key={`${p.id}`} value={p.id as string}>{p.name}</option>
            })}
          </select>
        </div>    

        <div className="flex flex-col justify-stretch" >
            <h1 className="text-zinc-300 font-bold">Data:</h1>
            <input className="px-3 py-3 text-zinc-300 bg-bg rounded-lg " required placeholder="--/--/--" type="date" {...form.register('matricula')} />
        </div>
        <div className="flex flex-col justify-stretch" >
            <h1 className="text-zinc-300 font-bold">Objetivo:</h1>
            <input className="px-3 py-3 text-zinc-300 bg-bg rounded-lg " required type="text" {...form.register('objetivo')} />
        </div>
        <div className="flex flex-col justify-stretch" >
            <h1 className="text-zinc-300 font-bold">Senha:</h1>
            <input className="px-3 py-3 text-zinc-300 bg-bg rounded-lg " required type="text" {...form.register('password')}  />
        </div>

        <div className="flex flex-col justify-stretch" >
          <h1 className="text-zinc-300 font-bold">Treino:</h1>
          <select className="bg-bg  text-zinc-300 rounded-lg p-3" defaultValue={''} required  id="treino" {...form.register('treino')}>
           {treinos?.map((t)=>{
            return <option className="p-3" value={t.id as string} key={`${t.id}`}>{t.name}</option>
           })}
          </select>
        </div>    
      </div> 
        
     </div> 
     <div className="flex max-sm:space-x-1 max-sm:justify-between space-x-2 justify-end">
       <button type="submit" className="p-3 css2 flex max-sm:px-2 border border-green-400 max-sm:space-x-1 rounded-lg items-center justify-center space-x-2">
        <IoPersonAddOutline className="text-green-400"/>
        <h1 className="font-bold text-green-400">Adicionar</h1>
       </button>
       
       
     </div>
    </div>
  </form>
  </div>
}