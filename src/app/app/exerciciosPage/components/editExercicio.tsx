'use client'
import { Exercicio, TypeOfExercicio } from "@/app/types"
import { toast } from "@/components/ui/use-toast"
import axios from "axios"
import Image from "next/image"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { FaCheckCircle } from "react-icons/fa"
import { IoAdd, IoTrashOutline } from "react-icons/io5"
import { LuImagePlus } from "react-icons/lu"
import { MdOutlineEdit } from "react-icons/md"

export function EditeExercicio(exercicio:Exercicio){

  
  const form = useForm()
  const [file,setFile] = useState<FileList | null>()

  const handleSubmit = form.handleSubmit(async(data)=>{
    const formData = new FormData()

    formData.append("name",data.name)
    formData.append("desc",data.desc)
    formData.append("category",data.category)
    if(file){
      formData.append("img",file[0])
    }

    
    
    const res = await axios.patchForm(`${process.env.NEXT_PUBLIC_API_URL}/exercicio/${exercicio.id}`,formData,{
      headers:{
        'Content-Type':'multipart/form-data'
      },
      transformRequest:formData => formData
    }).then(r =>{
      console.log(r.data)
      return r
    });
    /* const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/exercicio`,{
      method:'POST',
      headers:{
        'Content-Type': 'multipart/form-data'
      },
      body:formData
    }); */

  
    if(res.status === 200){
      toast({
        className:"bg-bg border border-yellow-300 text-green-400 ",
        title:'Exercicio Cadastrado com sucesso',
        duration:1000,
        action: <FaCheckCircle size={25}/>
    })
    setFile(null)
  }
})





  return <div className=" w-full  css  space-y-3 ">
  <div className="flex justify-center space-x-1">
    <h1 className="text-white text-2xl text-center">Edite o exercicio: </h1>
    <h1 className="text-yellow-400 text-2xl text-center">{exercicio.name.toUpperCase()} </h1>
  </div>
  <div className="mx-auto rounded-lg space-y-3   p-6 ">
   <div className="flex max-sm:flex-col"> 
    <div className="w-2/5 space-y-4 max-sm:w-full first-letter:h-full ">
    <h1 className="text-center text-zinc-300 fontC font-bold">Adicione uma IMAGEM ou GIF</h1>
      <div className="w-36 h-36 m-auto bg-yellow-400 rounded-2xl flex justify-center items-center">
        <input type="file" onChange={(v)=>{
          setFile(v.currentTarget.files)
        }} className=" opacity-0 hover:cursor-pointer  z-20 absolute" />
        {exercicio.img ? <img 
        className="w-36 h-36 rounded-full"
        src={`${process.env.NEXT_PUBLIC_API_URL}/public/exercicios/${exercicio.img}`}
        alt="exercicio"
        width={10}
        height={10}
        /> : null}
        <LuImagePlus className="m-auto w-16 h-16 font-bold z-0"  size={30}  /> 
      </div>
      <div>
          <h1 className=" text-zinc-300 fontC font-bold">Link de video explicativo:</h1>
          <input className="px-3 py-3 w-full text-zinc-300 bg-bg rounded-lg " type="text" {...form.register('name')} required  />
      </div>


      
    </div>
    <div className="ml-4 w-3/5 max-sm:w-full max-sm:ml-0 flex flex-col space-y-4">
      <div className="flex flex-col justify-stretch" >
          <h1 className="text-zinc-300 font-bold">Nome do exercício:</h1>
          <input className="px-3 py-3 text-zinc-300 bg-bg rounded-lg " type="text" {...form.register('name')} defaultValue={exercicio.name as string} required  />
        </div>
      <div className="flex flex-col justify-stretch" >
          <h1 className="text-zinc-300 font-bold">Descrição:</h1>
          <textarea className="px-3 py-3 text-zinc-300 bg-bg rounded-lg " defaultValue={exercicio.desc as string}  {...form.register('desc')} />
      </div>
      <div>
      <h1 className="text-zinc-300 font-bold">Categoria</h1>
        <select className="bg-bg p-3 text-zinc-300 rounded-lg" defaultValue={exercicio.category as string}{...form.register('category')}>
          {TypeOfExercicio.map( t => {
            return <option key={`${t}`} value={`${t}`}>{t}</option>
          })}
        </select>
      </div>
     
    </div>   
   </div> 
   <div className="flex max-sm:space-x-1 max-sm:justify-between space-x-2 justify-end">
     <button onClick={handleSubmit}  className="p-3 flex max-sm:px-2 bg-green-400 max-sm:space-x-1 rounded-lg items-center justify-center space-x-2">
      <MdOutlineEdit className="text-bg"/>
      <h1 className="font-bold">Editar</h1>
     </button>
    
   </div>
  </div>
</div>
}