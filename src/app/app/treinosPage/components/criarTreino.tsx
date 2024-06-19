'use client'
import { useEffect, useState } from "react"
import MyModal from "../../_componnents/dialog";
import { Exercicio } from "@/app/types";
import Swipeable from "../../_componnents/swipeable";
import { CardExercicio } from "../../exerciciosPage/components/cardExercicio";


export  function CriarTreino2({data}:{data?:Exercicio[]}){
  
  const [treino,setTreino] = useState<Array<Exercicio[]>>([[],[],[],[],[],[],[]])
  const [qtdDays,setQtDays] = useState<number>(0)
  
  const list = [
    {id:1,name:'A'},
    {id:2,name:'AB'},
    {id:3,name:'ABC'},
    {id:4,name:'ABCD'},
    {id:5,name:'ABCDE'},
    {id:6,name:'ABCDEF'},
  ];
  
  
  const [eSelected,setESelected] = useState<Exercicio[]>([]);

  let n =0
  
  let integer = 0

  let index = 0
  let treinoDia: Exercicio[] = [];
  let count = 0;

  return <div className="flex flex-col items-center p-6 space-y-4">
    <h1 className=" text-zinc-300 font-bold text-center text-3xl">Adicione um treino ao TEA</h1>
    <div className="flex w-max space-x-6 bg-zinc-900 space-y-4 rounded-lg p-6 max-sm:flex-col items-center justify-between" >
      <div className="w-40 h-40 bg-yellow-400 rounded-full"></div>
      <div className="space-y-4">
        <div>
          <h1 className="text-zinc-300 font-bold">Nome do Treino:</h1>
          <input className="px-3 py-3 text-zinc-300 bg-bg rounded-lg " type="text"   />
        </div>
        <div>
          <h1 className="text-zinc-300 font-bold">Treinador:</h1>
          <input className="px-3 py-3 text-zinc-300 bg-bg rounded-lg " type="text"   />
        </div>
      </div>
  
      <div className="flex flex-col space-y-4" >
        <div>  
        <h1 className="text-zinc-300 font-bold">Formato:</h1>
          <select defaultValue={''} onChange={(e)=>{
   
            setQtDays(Number(e.target.value))
            console.log(qtdDays)
          
          }} className="bg-bg text-zinc-300 rounded-lg p-3" name="formato" id="formato">
           {list.map((item)=>{
            return <option key={item.id} value={item.id}>{item.name}</option>
           })}
          </select>
        </div>
        <div>
          <h1 className="text-zinc-300 font-bold">Objetivo:</h1>
          <input className="px-3 py-3 text-zinc-300 bg-bg rounded-lg " type="text"   />
        </div>
        </div>    
    </div>
    <div className="w-full bg-zinc-900">
      {list.map(item =>{
        
        count++
        if(item.id > qtdDays) return
        return <div key={item.id}  className={`${count % 2 === 0 || count === 0 ? 'border border-yellow-400 p-3 rounded-lg' : ' p-3 rounded-lg'} w-full rounded-lg mt-3 p-6 bg-bg `}>
          <div className="flex w-full items-center mb-6 justify-between">
            <h1 className=" text-2xl text-white">Dia {item.id}</h1>
            <MyModal icon={
              <button className="p-3 flex max-sm:px-2 bg-green-400 font-bold  rounded-lg items-center justify-center ">Adicionar exercício</button>
            }> 
              <div>
                {data? data.map(u =>{
                 treinoDia.push(u)
                 console.log(treinoDia)
                  return <div  key={`${u.id}`} className={`${count % 2 === 0 || count === 0 ? 'bg-zinc-900 p-3 rounded-lg' : 'bg-bg p-3 rounded-lg'} w-full `}>
                             <button >
                               <CardExercicio editable={false} exercicioCurrent={u}/>
                             </button>
                        </div>
              }) : null}
              </div>
            </MyModal>
          </div>

          <div>
           {treino[0].map((t)=>{
            
            integer++
            return <div key={`${integer}`}>
              <h1 className="text-white">{t.name}</h1>
            </div>
           })}
          </div>
         
        </div>
      })}
    </div>
    {count}
  </div>
}