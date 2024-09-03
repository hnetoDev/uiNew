'use client'

import { Aluno, FilterType } from "@/app/types"
import { CardAluno } from "./cardAluno"
import Swipeable from "../../_componnents/swipeable"
import { Dispatch, SetStateAction, useState } from "react"
import { FaBackward, FaCheckCircle, FaForward } from "react-icons/fa"
import '../style.css'
import { Edite } from "./edit"
import MyModal from "../../_componnents/dialog"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { env } from "process"
export function Alunos({data,setIndex,pages}:{pages:number,setIndex:Dispatch<SetStateAction<string>>,data:Aluno[]}){

  const routes = useRouter()

  let count = 1
  const [page,setPage] = useState(count)

  
  const user = data
  
  console.log(user)
  return <div className="w-full css2 max-sm:overflow-x-auto max-md:overflow-x-auto max-lg:overflow-x-auto  ">
  {user.map(u =>{
  count++;
  return <div key={`${u.id}`} className={`${count % 2 === 0 || count === 0 ? 'bg-zinc-900 p-3 rounded-lg' : 'bg-bg p-3 rounded-lg'} w-full max-sm:w-max max-md:w-max max-lg:w-max `}>
  <CardAluno {...u}/> 
</div>
  })  } 
  <div className="flex">
          <div className="flex p-4 space-x-3 items-center">
            <div>
              <FaBackward className=" active:text-yellow-400 text-white"  onClick={()=>{
                if(page === 1) return
               
                let n = page - 1
                setPage(n)
                setIndex(prev => `${Number(prev) - 1}`)
                
      
              }} />
            </div>
            <div className="text-white">{page}</div>
            <div>
              <FaForward className=" active:text-yellow-400 text-white" onClick={()=>{
                if(page === pages) return
             
                let n = page + 1
                setPage(n)
                setIndex(prev => `${Number(prev) + 1}`)
         
              }} />
            </div>
          </div>
          <div className="flex p-4 items-center">
            <h1 className="text-white"> de {pages} pags</h1>
          </div>
        </div>
</div> 
} 