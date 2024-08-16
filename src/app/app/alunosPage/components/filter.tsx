import { FilterType } from "@/app/types";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { IoAdd } from "react-icons/io5";

export function Filter({filter,setFilter}:{filter?: boolean | undefined,setFilter:Dispatch<SetStateAction<boolean | undefined>>}){
  
  const form = useForm();

  
  const handleSubmit = form.handleSubmit(async(data)=>{
    if(data.status === 'active'){
      setFilter(true)
    }
    if(data.status === 'inative'){
      setFilter(false)
    }
  })



  return <div className="flex flex-col space-y-4">
    <form onSubmit={handleSubmit}>
    <h1 className="text-white text-2xl font-bold text-center">Filtre os Alunos</h1>
    <div className="flex justify-between max-sm:flex-col mt-2 w-full ">

      <div className="flex w-full space-x-4 max-sm:space-x-0 max-sm:space-y-3 max-sm:flex-col">
        
      <div className="space-y-2 max-sm:w-full">
        <h1 className="text-zinc-300 font-bold ">Status</h1>
        <select id="status" className="bg-bg max-sm:w-full text-zinc-300 rounded-lg p-4" {...form.register('status')}>
          <option className="bg-green-400 py-2 text-bg"  value="active">Ativo</option>
          <option className="py-2" value="inative"><h1 className="p-2">Inativo</h1></option>
          <option className="bg-red-500 py-2 text-bg" value="">Desistente</option>
        </select>
      </div>

      <div className="space-y-2 max-sm:w-full">
        <h1 className="text-zinc-300 font-bold ">Apartir de:</h1>
        <input className="px-3 py-3 text-zinc-300 max-sm:w-full bg-bg rounded-lg "  {...form.register('date')} placeholder="--/--/--" type="date" />
      </div>

      <div className="flex justify-center max-sm:justify-start items-center max-sm:w-full">
         <button onClick={(e)=>{
          e.preventDefault()
          setFilter(undefined)
         }} className="p-3 mt-7 max-sm:mt-0 max-sm:w-full flex max-sm:px-2 bg-yellow-400 max-sm:space-x-0 rounded-lg items-center justify-center space-x-2">
            <h1 className="font-bold text-bg">Limpar</h1>
         </button>
      </div>


      </div>

      
       <div className="flex max-sm:w-full items-center justify-center">
         <button type="submit" className="p-3 mt-4  max-sm:w-full flex max-sm:px-2 border border-green-400 max-sm:space-x-1 rounded-lg items-center justify-center space-x-2">
            <IoAdd className="text-green-400 p-0"/>
            <h1 className="font-bold text-green-400">Adicionar</h1>
         </button>
       </div>
       
       
     
      


    </div>
    </form>
  </div>
}