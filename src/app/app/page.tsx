

import { Aluno } from "../types"
import { CardAluno } from "./alunosPage/components/cardAluno";
import { ChartAlunos} from "./charts/chartAlunos";
import { ChartBruto } from "./charts/ChartBruto";
import './global.css';

import { ChartPlanos } from "./charts/chartPlanos";
import { ChartFrequencia } from "./charts/chartFrequencia";




export default function AppPage(){
 


  
  return(
    <main className=" h-max w-full flex  p-5 flex-col ">
      <div className="grid grid-cols-3 css2   grid-rows-2 max-sm:grid-cols-1 gap-4">


        <div className="flex flex-col  space-y-2 p-4 rounded-lg bg-zinc-900">
          <h1 className="text-center text--primary font-bold text-2xl">Alunos Cadastrados</h1>
          <ChartAlunos/>
        </div>

        <div className="flex flex-col   space-y-2 p-4 rounded-lg max-lg:col-span-2 max-xl:col-span-2 max-2xl:col-span-2 max-sm:col-span-1  bg-zinc-900">
          <h1 className="text-center text-white font-bold text-2xl">Capital bruto</h1>
         <ChartBruto/>
        </div>
        <div className="flex flex-col  space-y-2 p-4 rounded-lg bg-zinc-900">
          <h1 className="text-center text-white font-bold text-2xl">Alunos por Plano</h1>
         <ChartPlanos/>
        </div>

        <div className="flex flex-col  space-y-2 p-4 rounded-lg bg-zinc-900">
          <h1 className="text-center text-white font-bold text-2xl">Frequência de alunos <br/> ATIVOS</h1>
         <ChartFrequencia/>
        </div>

        <div className="w-full flex flex-col justify-between bg-zinc-900 rounded-lg  p-6 ">
          <div>
            <h1 className="text-yellow-400  font-bold text-3xl">Notificações</h1>
            <h1 className="text-white font-bold  text-xl">envie uma mensagem para os alunos matriculados.</h1>
          </div>
          <div className="w-full flex flex-col space-y-4">
            <input type="text" className="bg-bg border border-yellow-200 rounded-lg text-white p-4" />
            <button className="bg-yellow-400 font-bold p-4 rounded-lg text-bg">Enviar</button>
          </div>
        </div>

        
          
       
      </div>
    </main>
  )
}