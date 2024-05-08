'use client'
import { Aluno } from "@/app/types";
import { useForm } from "react-hook-form";
import { IoTrashOutline } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import '../global.css'
export function Edite({user}: {user:Aluno}){
  const headers = new Headers({
    "Content-type":"aplication/json"
  })
  const form = useForm()
  const update =  form.handleSubmit(async (data) =>{
    console.log(data.name)
    const res = await fetch(`https://api-nvjt0eai8-hnetos-projects.vercel.app/api/user/update/${user.id}`,{
      method:'PUT',
      body:JSON.stringify({
        name:data.name,
        cpf:data.cpf,
        email:data.email,
        tel:data.tel,
        emerg:data.emerg,
      }),
      headers:headers,
      mode:'cors'
    })
    if(res.ok){
      console.log(res.json())
    }
  })

  

  return <div className="css space-y-3">
    <h1 className="text-white text-2xl text-center">Edite os dados de {user.name}</h1>
    <div className="mx-auto rounded-lg space-y-3 bg-zinc-900  p-6 ">
     <div className="flex max-sm:flex-col"> 
      <div className="w-2/5 max-sm:w-full first-letter:h-full ">
        <div className="w-36 h-36 m-auto bg-yellow-400 rounded-full"></div>
        <div className="space-y-4 flex  flex-col justify-stretch">
          <div className="flex flex-col justify-stretch">
            <h1 className="text-zinc-300 font-bold">Nome:</h1>
            <input className="px-3 py-3 text-zinc-300 bg-bg rounded-lg " type="text" defaultValue={`${user.name}`} {...form.register('name')} />
          </div>
          <div className="flex flex-col justify-stretch" >
            <h1 className="text-zinc-300 font-bold">Email:</h1>
            <input className="px-3 py-3 text-zinc-300 bg-bg rounded-lg " type="text" defaultValue={`${user.email}`} {...form.register('email')} />
          </div>
        </div>
      </div>
      <div className="ml-4 w-3/5 max-sm:w-full max-sm:ml-0 flex flex-col space-y-4">
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
          <select className="bg-bg text-zinc-300 rounded-lg p-3" name="planos" id="planos">
            <option value="Plano Basico">Plano Basico</option>
            <option value="Plano familia">Plano Familia</option>
          </select>
        </div>    
      </div>   
     </div> 
     <div className="flex max-sm:space-x-1 max-sm:justify-between space-x-2 justify-end">
       <button onClick={update} className="p-3 flex max-sm:px-2 bg-green-400 max-sm:space-x-1 rounded-lg items-center justify-center space-x-2">
        <MdOutlineEdit />
        <h1 className="font-bold">Editar</h1>
       </button>
       <button className="p-3 max-sm:px-2 flex border border-red-500 rounded-lg items-center justify-center max-sm:space-x-1 space-x-2">
        <IoTrashOutline className="text-red-500" />
        <h1 className="font-bold text-red-500">Apagar</h1>
       </button>
       
     </div>
    </div>
  </div>
}