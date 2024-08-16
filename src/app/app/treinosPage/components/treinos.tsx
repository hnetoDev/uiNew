'use client'

import { Treino } from "@/app/types"
import { CardAluno } from "../../alunosPage/components/cardAluno"
import Swipeable from "../../_componnents/swipeable"
import { useState } from "react"
import { FaBackward, FaForward } from "react-icons/fa"
import '../../global.css'
import { CardTreino } from "./cardTreino"
export function Treinos({data}:{data:Treino[]}){


  let count = 1
  const [page,setPage] = useState(count)
  const pagesTotal = Math.round(data.length / 10)
  const [nSlice, setSlice] = useState([0,10])
  const treino = data.slice(nSlice[0],nSlice[1])
  return <div className="w-full css2 max-sm:overflow-x-auto overflow-x-hidden ">
  {treino.map(u =>{
  count++;
  return <div key={`${u.id}`} className={`${count % 2 === 0 || count === 0 ? 'bg-zinc-900 p-3 rounded-lg' : 'bg-bg p-3 rounded-lg'} w-full `}>
  <Swipeable treino={u} > <CardTreino {...u}/> </Swipeable>
</div>
  })}
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