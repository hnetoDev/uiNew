import { FilterType } from "@/app/types";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { IoAdd } from "react-icons/io5";

export function Filter({filter,setFilter}:{filter?:string,setFilter:Dispatch<SetStateAction<string | undefined>>}){
  
  const form = useForm();

  
  const handleSubmit = form.handleSubmit(async(data)=>{
    setFilter(data.status)
  })



  return <div className="flex flex-col space-y-4">
    <form onSubmit={handleSubmit}>
    <h1 className="text-white text-2xl font-bold text-center">Filtre os Alunos</h1>
    <div className="flex justify-between">

      <div className="flex space-x-4">
        
      <div className="space-y-2">
        <h1 className="text-zinc-300 font-bold ">Status</h1>
        <select id="status" className="bg-bg text-zinc-300 rounded-lg p-4" {...form.register('status')}>
          <option className="bg-green-400 text-bg"  value="active">Ativo</option>
          <option className="" value="inative">Atrasado</option>
          <option className="bg-red-500 text-bg" value="">Desistente</option>
        </select>
      </div>

      <div className="space-y-2">
        <h1 className="text-zinc-300 font-bold ">Apartir de:</h1>
        <input className="px-3 py-3 text-zinc-300 bg-bg rounded-lg "  {...form.register('date')} placeholder="--/--/--" type="date" />
      </div>

      <div className="flex justify-center items-center">
         <button onClick={(e)=>{
          e.preventDefault()
          setFilter('false')
         }} className="p-3 mt-7 css2 flex max-sm:px-2 border border-yellow-400 max-sm:space-x-1 rounded-lg items-center justify-center space-x-2">
            <h1 className="font-bold text-yellow-400">Limpar</h1>
         </button>
      </div>


      </div>

      
       <div className="flex items-center justify-center">
         <button type="submit" className="p-3 mt-4 css2 flex max-sm:px-2 border border-green-400 max-sm:space-x-1 rounded-lg items-center justify-center space-x-2">
            <IoAdd className="text-green-400 p-0"/>
            <h1 className="font-bold text-green-400">Adicionar</h1>
         </button>
       </div>
       
       
     
      


    </div>
    </form>
  </div>
}