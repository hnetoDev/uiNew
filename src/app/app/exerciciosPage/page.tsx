import MyModal from "../_componnents/dialog";
import { CaixaPesquisaExercicio } from "./components/caixaPesquisaTreino";
import { CriarExercicio } from "./components/criarExercicios";
import { Exercicios } from "./components/exercicios";

export default function ExerciciosPage(){
  return <div className="flex flex-col h-screen w-full space-y-5 css p-10">
  <h1 className="text-3xl font-bold text-white text-center">Exercícios Cadastrados no TEA</h1>
    <CaixaPesquisaExercicio/>
  <div className="text-zinc-300 mt-3 space-y-2 ">
  
    <h1 className="text-center text-zinc-300">Arraste para direita para editar</h1>
  </div>
  <div className="h-max"><Exercicios/></div>
 
</div>
}