'use client'
import { useState } from "react"
import MyModal from "../../_componnents/dialog";
import { Exercicio } from "@/app/types";
import Swipeable from "../../_componnents/swipeable";
import { CardExercicio } from "../../exerciciosPage/components/cardExercicio";


export  function CriarTreino(){

  const [qtdDays,setQtDays] = useState<number>(0)
  const [exercicios,setExercicios] = useState()
  const list = [
    {id:1,name:'A'},
    {id:2,name:'AB'},
    {id:3,name:'ABC'},
    {id:4,name:'ABCD'},
    {id:5,name:'ABCDE'},
    {id:6,name:'ABCDEF'},
  ];
  const [treinoCompleto,setTreinoCompleto] = useState<Exercicio[][][]>([[],[],[],[],[],[],[]])
  const data:Exercicio[] = [
    {
    title:'Rosca alternada',
    desc:'faca isso aquilo',
    img:'1',
    id:'1'
  },
  {
    title:'Rosca na polia',
    desc:'faca isso aquilo',
    img:'1',
    id:'2'
  },
  {
    title:'Rosca sccot',
    desc:'faca isso aquilo',
    img:'1',
    id:'3'
  }
]
const [eSelected,setESelected] = useState<Exercicio[]>([]);

  let n =0

  const getExercicios =  async()=>{

  }

  let index = 0

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
       
        if(item.id > qtdDays) return
        return <div key={item.id} className="w-full rounded-lg bg-bg">
          
          <div className="flex w-full items-center mb-6 justify-between">
            <h1 className=" text-2xl text-white">Dia {item.id}</h1>
            <MyModal icon={
              <button onClick={getExercicios} className="p-3 flex max-sm:px-2 bg-green-400 font-bold  rounded-lg items-center justify-center ">Adicionar exercício</button>
            }> 
              <div>
                {data.map(u =>{
                  count++;
                  return <div onClick={(i)=>{
                    console.log(i)
                    setTreinoCompleto(prev =>{
                      prev[0][index]?.push(u)
                      index++
                      return prev;
                    })
                   
                    }
                    }  key={`${u.id}`} className={`${count % 2 === 0 || count === 0 ? 'bg-zinc-900 p-3 rounded-lg' : 'bg-bg p-3 rounded-lg'} w-full `}>
                             <Swipeable treino={u} > <CardExercicio   exercicioCurrent={u} editable={false}/> </Swipeable>
                        </div>
              })}
              </div>
            </MyModal>
          </div>
          <div>
            {treinoCompleto[0][0].map(u =>{
                  n++
                  count++;
                  return <div  key={`${u.id}`} className={`${count % 2 === 0 || count === 0 ? 'bg-zinc-900 p-3 rounded-lg' : 'bg-bg p-3 rounded-lg'} w-full `}>
                             <Swipeable treino={u} > <CardExercicio   exercicioCurrent={u} editable={false}/> </Swipeable>
                        </div>
              })}
          </div>
         
        </div>
      })}
    </div>
  </div>
}