'use client'

import { Aluno, FilterType } from "@/app/types"
import { CardAluno } from "./cardAluno"
import Swipeable from "../../_componnents/swipeable"
import { useState } from "react"
import { FaBackward, FaCheckCircle, FaForward } from "react-icons/fa"
import '../style.css'
import { Edite } from "./edit"
import MyModal from "../../_componnents/dialog"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { env } from "process"
export function Alunos({data}:{data:Aluno[]}){

  const routes = useRouter()

  let count = 1
  const [page,setPage] = useState(count)
  let pagesTotal = Math.round(data.length / 10)
  if(data.length < 10){
    pagesTotal = 1
  }
  
  const [nSlice, setSlice] = useState([0,10])
  const user = data.slice(nSlice[0],nSlice[1])
  
  console.log(user)
  return <div className="w-full css2 max-sm:overflow-x-auto  ">
  {user.map(u =>{
  count++;
  return <div key={`${u.id}`} className={`${count % 2 === 0 || count === 0 ? 'bg-zinc-900 p-3 rounded-lg' : 'bg-bg p-3 rounded-lg'} w-full max-sm:w-max `}>
  <CardAluno {...u}/> 
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
            <h1 className="text-white"> de {pagesTotal} pags</h1>
          </div>
        </div>
</div> 
} 