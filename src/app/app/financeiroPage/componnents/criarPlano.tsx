'use client'
import { IoAdd } from "react-icons/io5";
import MyModal from "../../_componnents/dialog";
import { useEffect, useState } from "react";
import { Planos } from "./planos";
import { Plano } from "@/app/types";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { FaCheckCircle } from "react-icons/fa";

export function CardPlanos(){

  const [data,setData] = useState<Plano[]>()
  const form = useForm();


  
  const postData = form.handleSubmit(async (data)=>{
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user/planos/create`,{
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        name:data.name,
        value:data.value as number,
        duration:data.duration 
      })
    })

    if(res.ok){
      toast({
        className:"bg-bg border border-yellow-300 text-green-400 ",
        title:'Plano criado com sucesso',
        duration:1000,
        action: <FaCheckCircle size={25}/>
    })
    }
  })

  useEffect(()=>{
    async function getData(){
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/planos`,{
        method:"GET"
      })

      if(res.ok){
        const planos:Plano[] = await res.json();
        setData(planos)
        console.log(planos)
      }
      if(!res.ok){
        console.log("erro")
      }
    }

    getData();
  },[data,postData])




  return <div className="w-full border border-yellow-400 bg-zinc-900 rounded-lg ">

    <div className="flex items-center p-6 py-3 justify-between">
      <h1 className="text-4xl font-bold text-white">Planos</h1>
      <button className="bg-bg rounded-full p-3">
        <MyModal small={true} icon={<IoAdd color="#fff000" size={30} />}>
          <h1 className="text-2xl font-bold text-yellow-400">Criar Plano</h1>
          <div className="mt-4 w-full space-y-2  flex flex-col">
             <div className="w-full flex flex-col">
               <h1 className="text-zinc-300 font-bold">Nome</h1>
               <input className="px-3 py-3 text-zinc-300 bg-bg rounded-lg " type="text"  {...form.register('name')} />
             </div>
             <div className="w-full flex flex-col">
               <h1 className="text-zinc-300 font-bold">Valor</h1>
               <input className="px-3 py-3 text-zinc-300 bg-bg rounded-lg " type="text" placeholder="R$ 0,00"  {...form.register('value')} />
             </div>  
             <div className="w-full flex flex-col">
               <h1 className="text-zinc-300 font-bold">Duração em dias</h1>
               <input className="px-3 py-3 text-zinc-300 bg-bg rounded-lg " type="text" placeholder="30"  {...form.register('duration')} />
             </div>
           
          </div>
          <div className="flex max-sm:space-x-1 max-sm:justify-between space-x-2 justify-end">
            <button onClick={postData} className="p-3 mt-4 css2 flex max-sm:px-2 border border-green-400 max-sm:space-x-1 rounded-lg items-center justify-center space-x-2">
              <IoAdd className="text-green-400"/>
              <h1 className="font-bold text-green-400">Adicionar</h1>
            </button>
       
       
     </div>
          
        </MyModal>
       </button>
    </div>


    <div className="w-full h-max m-auto  p-6 ">
      <div className="flex h-10 "> 
        <div className="w-16 flex">
          <h1 className="text-white m-auto">Foto</h1>
        </div>
        <div className="w-48 max-sm:w-4 flex">
          <h1 className="text-white m-auto max-sm:ml-16">Nome</h1>
        </div>
        <div className=" w-72 max-sm:  flex">
          <h1 className="text-white m-auto ml-40">Valor</h1>
        </div>
        <div className="w-28 ml-3 max-sm:invisible flex">
          <h1 className="text-white m-auto">Duração</h1>
        </div>
      </div>
      {data ? <Planos  data={data!}/> : null}
    </div>


  </div>
}