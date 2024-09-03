'use client'
import { IoAdd, IoTrash, IoTrashOutline } from "react-icons/io5";
import MyModal from "../../_componnents/dialog";
import { useEffect, useState } from "react";
import { Planos } from "./planos";
import { Plano } from "@/app/types";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { FaCheckCircle } from "react-icons/fa";
import { Check, CheckIcon, X } from "lucide-react";

export function CardPlanos(){

  const [data,setData] = useState<Plano[]>()
  const [name,setName] = useState<string>();
  const [value,setValue] = useState<string>();
  const [beneficio,setBeneficio] = useState<string>('');
  const [beneficios,setBeneficios] = useState<string[]>([]);
  const [modeDelete,setModeDelete] = useState<boolean>(false)
  const form = useForm();


  
  const postData = form.handleSubmit(async (data)=>{
    console.log("aq")
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/plano`,{
      method:'POST',
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        name:data.name,
        value:data.value,
        duration:data.duration,
        beneficios:[...beneficios],
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/plano`,{
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




  return <div className="w-full border border-yellow-400 bg-zinc-900 rounded-lg">

    <div className="flex items-center p-6 py-3 justify-between">
      <h1 className="text-4xl font-bold text-white fontC">Planos</h1>
      <button className="bg-bg rounded-full p-3">
        <MyModal medium icon={<IoAdd color="#fff000" size={30} />}>
        <div className="flex max-sm:flex-col max-sm:space-x-0 max-sm:space-y-4 w-full space-x-4">
          <div>
          <h1 className="text-2xl font-bold text-yellow-400 fontC">Criar Plano</h1>
          <div className="mt-4 w-full space-y-2  flex flex-col">
             <div className="w-full flex flex-col">
               <h1 className="text-zinc-300 font-bold fontC">Nome</h1>
               <input className="px-3 py-3 text-zinc-300 bg-bg rounded-lg fontC " type="text"  {...form.register('name')}  onChange={(v)=>{
                setName(v.target.value);
               }}/>
             </div>
             <div className="w-full flex flex-col">
               <h1 className="text-zinc-300 font-bold fontC">Valor</h1>
               <input className="px-3 py-3 text-zinc-300 bg-bg rounded-lg " type="text" placeholder="R$ 0,00"  {...form.register('value')}  onChange={(v)=>{
                setValue(v.target.value);
               }}/>
             </div>  
             <div className="w-full flex flex-col">
               <h1 className="text-zinc-300 font-bold fontC">Duração em dias</h1>
               <input className="px-3 py-3 text-zinc-300 bg-bg rounded-lg " type="text" placeholder="30"  {...form.register('duration')}/>
             </div>
             <div className="w-full flex flex-col">
               <h1 className="text-zinc-300 font-bold fontC">Adicione Beneficios</h1>
               <div className="bg-bg rounded-lg flex space-x-1">
                <input className="px-3 py-3 text-zinc-300 bg-transparent rounded-lg " type="text" placeholder="Acesso Mensal..."  {...form.register('beneficio')} onChange={(v)=>{
                  setBeneficio(v.target.value);
                }}/>
                <button onClick={()=>{
                  setBeneficios(prev =>{
                    const newArr = [...prev,beneficio];
                    return newArr;
                  })
                }} className="bg-yellow-400 flex items-center outline-none rounded-lg p-3">
                  <IoAdd className="text-black" size={24}/>
                </button>
                <button onClick={()=>{
                  setModeDelete(prev =>{
                    if(prev){
                      return false
                    }
                    return true
                  })
                }} className="bg-red-500 flex items-center outline-none rounded-lg p-3">
                  {modeDelete ? <Check className="text-black" size={24}/> : <IoTrashOutline className="text-black" size={24}/>}
                </button>
               </div>
             </div>
           
          </div>
          <div className="flex max-sm:space-x-1 max-sm:justify-between space-x-2 justify-end">
            <button onClick={postData} className="p-3 mt-4 css2 flex max-sm:px-2 w-full border border-green-400 max-sm:space-x-1 rounded-lg items-center justify-center space-x-2">
              <IoAdd className="text-green-400"/>
              <h1 className="font-bold text-green-400 fontC">Adicionar</h1>
            </button>
       
       
     </div>
       
     </div>
     <div className="w-full bg-bg rounded-xl">
      <h1 className="text-white font-bold text-xl text-center fontC">Preview</h1>
      <div className=" h-full w-max m-auto  rounded-md p-4">
        <div className="rounded-xl flex flex-col justify-between h-5/6 bg-zinc-900 p-3 border border-yellow-400 border-opacity-30">
          <div className="mr-10 p-2">
            <h1 className=" font-bold text-2xl text-white fontC">{name ?? 'Nome do Plano'}</h1>
            <h1 className=" font-bold text-xl text-yellowMod fontC ">R$ {value ?? 100},00</h1>
          </div>
          <div>
            {beneficios.length >= 1 ? beneficios.map(b =>{
              return <div key={b} className={`p-1 flex mb-1 justify-start items-center space-x-1 ${modeDelete ? ' hover:cursor-pointer' : ''}`} onClick={(v)=>{
                console.log(v.currentTarget.innerText);
                if(modeDelete){
                  setBeneficios(prev =>{
                    const arrPrev = [...prev];
                    const forDelete:string[] = [];
                    const arrMid = arrPrev.map(a => {
                      if(a === b){
                        forDelete.push(a);
                      }
                      return a
                    });
                    const arrNew:string[] = arrMid.filter(a => a !== b);
                    if(forDelete.length > 1){
                      const arrRepete = forDelete.shift()
                      return [...arrNew,...forDelete];
                    }
                    return arrNew;
                  })
                }
              }}>
              {modeDelete ? <X className="text-red-500" size={10}/> : <CheckIcon className={` ${modeDelete ? 'text-red-500' : 'text-zinc-600'}`} size={10}/>}
              <h1 className={`${modeDelete ? 'text-red-500' : 'text-zinc-600'} text-base fontC`}>{b}</h1>
            </div>
            }) : <div className="flex justify-start items-center space-x-1">
              <CheckIcon className="text-zinc-600" size={14}/>
              <h1 className="text-zinc-600 text-sm fontC">Adicione os Benefícios</h1>
            </div>}
          </div>
          <button className="bg-yellow-500 border-2 border-yellowMod bg-opacity-5 p-2 rounded-xl w-full">
            <h1 className="text-yellowMod fontC">Escolher Plano</h1>
          </button>
        </div>
      </div>

     </div>
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