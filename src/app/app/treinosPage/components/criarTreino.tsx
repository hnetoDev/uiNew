'use client'
import { useState } from "react"


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
        return <div key={item.id} className="w-full">
          
          <div className="flex w-full items-center justify-between">
            <h1 className=" text-2xl text-white">Dia {item.id}</h1>
            <button className="p-3 flex max-sm:px-2 bg-green-400 font-bold  rounded-lg items-center justify-center ">Adicionar exercício</button>
          </div>
         
        </div>
      })}
    </div>
  </div>
}