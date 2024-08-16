
import { useRouter } from "next/navigation";
import { CiFilter } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import { IoAddOutline, IoPersonAddOutline } from "react-icons/io5";
import MyModal from "../../_componnents/dialog";
import { Add } from "../../alunosPage/components/criar";
import '../../alunosPage/style.css'
import { CgGym } from "react-icons/cg";
import { CriarExercicio } from "./criarExercicios";
import { TypeOfExercicio } from "@/app/types";
import { Dispatch, SetStateAction } from "react";

export function CaixaPesquisaExercicio({setCategory,setSearch}:{setCategory:Dispatch<SetStateAction<string | undefined>>,setSearch:Dispatch<SetStateAction<string | undefined>>}){
  
  return <div className="w-full flex space-x-3 m-auto justify-center">
  <button className="bg-zinc-900 rounded-full p-4">
    <MyModal icon={<IoAddOutline color="#fff000" size={30} />}>
      <CriarExercicio/>
    </MyModal>
  </button>
  <div className="search focus-within:space-x-3 bg-zinc-900  hover:group-last:w-14 hover:rounded-md hover:space-x-3 flex items-center justify-center p-4">
    <FaSearch className=" font-bold" size={30} color="#fff000"/>
    <input className="input " type="text" onChange={(v)=>{
      setSearch(v.currentTarget.value)
    }}/>
  </div>
  <select className="bg-zinc-900 p-3 text-zinc-300 rounded-lg" defaultValue={undefined}  onChange={(v)=>{setCategory(v.currentTarget.value)}}>
    
            {TypeOfExercicio.map( t => {
              return <option key={`${t}`} value={`${t}`}>{t}</option>
            })}
  </select>
  
</div>
}