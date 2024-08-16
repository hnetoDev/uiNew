'use client'

import { TypeOfExercicio } from "@/app/types"
import { toast } from "@/components/ui/use-toast"
import { useForm } from "react-hook-form"
import { FaCheckCircle } from "react-icons/fa"
import { IoAdd, IoPersonAddOutline, IoTrashOutline } from "react-icons/io5"
import { LuImagePlus } from "react-icons/lu"
import axios from 'axios';
import { useState } from "react"
import * as multer from 'multer'
import Image from "next/image"


export function CriarExercicio(){
  const form = useForm()
  const [file,setFile] = useState<File| null>()

  const handleSubmit = form.handleSubmit(async(data)=>{
    const formData = new FormData()

    formData.append("name",data.name)
    formData.append("desc",data.desc)
    formData.append("category",data.category)
    if(file){
      formData.append("img",file)
    }
    
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/exercicio`,formData,{
      headers:{
        'Content-Type':'multipart/form-data'
      },
      transformRequest:formData => formData
    })
    /* const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/exercicio`,{
      method:'POST',
      headers:{
        'Content-Type': 'multipart/form-data'
      },
      body:formData
    }); */

  
    if(res.status === 201){
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
        <div className={`w-36 h-36 m-auto ${file ? 'border-2 border-yellow-400' : `bg-yellow-400`} rounded-full flex justify-center items-center`}>
          <input type="file" onChange={(v)=>{
            setFile(v.currentTarget.files![0] as File)
          }} className=" opacity-0 hover:cursor-pointer  z-20 absolute" />
          
          { file ? <img className="w-32 h-32 rounded-full" src={URL.createObjectURL(file)} alt="img" width={100} height={100}/> : null }
          <button className="absolute z-10 bg-bg rounded-md p-4">
            <LuImagePlus className="m-auto text-yellow-400 font-bold" size={30}  />
          </button>
        </div>
        
      </div>
      <div className="ml-4 w-3/5 max-sm:w-full max-sm:ml-0 flex flex-col space-y-4">
        <div className="flex flex-col justify-stretch" >
            <h1 className="text-zinc-300 font-bold">Nome do exercício:</h1>
            <input className="px-3 py-3 text-zinc-300 bg-bg rounded-lg " type="text" {...form.register('name')} required  />
          </div>
        <div className="flex flex-col justify-stretch" >
            <h1 className="text-zinc-300 font-bold">Descrição:</h1>
            <textarea className="bg-bg p-3 text-white" {...form.register('desc')}/>
        </div>
        <div>
        <h1 className="text-zinc-300 font-bold">Categoria</h1>
          <select className="bg-bg p-3 text-zinc-300 rounded-lg"  {...form.register('category')}>
            {TypeOfExercicio.map( t => {
              return <option key={`${t}`} value={`${t}`}>{t}</option>
            })}
          </select>
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