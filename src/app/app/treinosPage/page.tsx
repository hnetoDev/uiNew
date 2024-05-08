import { CgGym } from "react-icons/cg";
import { CaixaPesquisaTreino } from "../_componnents/caixaPesquisaTreino";
import MyModal from "../_componnents/dialog";
import { Treinos } from "../_componnents/treinos";

export default function TreinoPage(){
  return <div className="flex flex-col h-screen w-full space-y-5 css p-10">
    <h1 className="text-3xl font-bold text-white text-center">Treinos Cadastrados no TEA</h1>
    <CaixaPesquisaTreino/>
    <div className="text-zinc-300 mt-3 space-y-2 ">
    <MyModal icon={<div className="flex cursor-pointer  bg-zinc-900 w-max p-4 space-x-2 rounded-lg m-auto">
        <h1 className=" text-yellow-400 ">Adiconar exercícios</h1>
        <CgGym size={22} className="text-yellow-300 m-auto  font-bold"/>
      </div>}>
        <h1>criar exercicio</h1>
      </MyModal>
      <h1 className="text-center text-zinc-300">Arraste para direita para editar</h1>
    </div>
    <div className="h-max"><Treinos/></div>
   
  </div>
}