'use client'

import {Entrada } from "@/app/types"
import Swipeable from "../../_componnents/swipeable"
import { useState } from "react"
import { FaBackward, FaCheckCircle, FaForward } from "react-icons/fa"
import '../style.css'

import MyModal from "../../_componnents/dialog"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { CardEntrada } from "../../financeiroPage/componnents/cardEntrada"
import { Edite } from "../../alunosPage/components/edit"
export function Financeiro({data,search}:{data:Entrada[],search:string}){
  const routes = useRouter()

  let count = 1
  const [page,setPage] = useState(count)
  let pagesTotal = Math.floor(data.length / 10) + Math.round(data.length % 10)
  if(data.length < 10){
    pagesTotal = 1
  }
  const searched = search !== '' ? data.filter(v => v.name.toLowerCase().startsWith(search)) : null
  const [nSlice, setSlice] = useState([0,10])
  const user = data.slice(nSlice[0],nSlice[1])
  
  return <div className="w-full css2 max-sm:overflow-x-auto overflow-x-hidden ">
  {search === '' ? user.map(u =>{
  count++;
  return <div key={`${u.id}`} className={`${count % 2 === 0 || count === 0 ? 'bg-zinc-900 p-3 rounded-lg' : 'bg-bg p-3 rounded-lg'} w-full h-max`}>
  <Swipeable  childrenExit={
    <div>
        <h1 className="text-xl font-medium text-white">
                    Exclusão
                  </h1>
                  <p className="mt-2 text-sm text-white/50">
                    Confirmar a exclusão da conta do aluno: {u.name}
                  </p>
                  <div className="mt-4 space-x-3">
                    <button
                      className="rounded-lg bg-green-400 py-2 px-3 font-bold"
                      onClick={async()=>{
                        const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/delete/${u.id}`,{
                          method:"DELETE"
                        })
                        toast({
                          className:"bg-bg border border-yellow-300 text-red-500 ",
                          title:'Aluno excluido com sucesso',
                          duration:1000,
                          action: <FaCheckCircle size={25}/>
                      })
                        
                        routes.push('/app/alunosPage')
                        
                      }}
                    >
                      Confirmar
                    </button>
                    
                  </div>
    </div>
  } > <CardEntrada {...u}/> </Swipeable>
</div>
  }) : searched!.map(u =>{
    count++;
    return <div key={`${u.id}`} className={`${count % 2 === 0 || count === 0 ? 'bg-zinc-900 p-3 rounded-lg' : 'bg-bg p-3 rounded-lg'} w-full `}>
    <Swipeable childrenExit={
      <div>
          <h1 className="text-xl font-medium text-white">
                      Exclusão
                    </h1>
                    <p className="mt-2 text-sm text-white/50">
                      Confirmar a exclusão da conta do aluno: {u.name}
                    </p>
                    <div className="mt-4 space-x-3">
                      <button
                        className="rounded-lg bg-green-400 py-2 px-3 font-bold"
                        onClick={async()=>{
                          const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/delete/${u.id}`,{
                            method:"DELETE"
                          })
                          routes.push('/app/alunosPage')
                          
                        }}
                      >
                        Confirmar
                      </button>
                      
                    </div>
      </div>
    } >  <CardEntrada {...u} /> </Swipeable>
  </div>
    })  } 
  <div className="flex">
          <div className="flex p-4 space-x-3 items-center">
            <div>
              <FaBackward onClick={()=>{
                if(page === 1) return
                let s = [nSlice[0] - 10,nSlice[1] - 10]
                let n = page - 1
                setPage(n)
                setSlice(s)
              }} color="white"/>
            </div>
            <div className="text-white">{page}</div>
            <div>
              <FaForward onClick={()=>{
                if(page === pagesTotal) return
                let s = [nSlice[0] + 10,nSlice[1] + 10]
                let n = page + 1
                setPage(n)
                setSlice(s)
              }} color="white"/>
            </div>
          </div>
          <div className="flex p-4 items-center">
            <h1 className="text-white">1 de {pagesTotal} pags</h1>
          </div>
        </div>
</div> 
} 