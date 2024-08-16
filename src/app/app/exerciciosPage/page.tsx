'use client'
import { useEffect, useState } from "react";
import MyModal from "../_componnents/dialog";
import { CaixaPesquisaExercicio } from "./components/caixaPesquisaTreino";
import { CriarExercicio } from "./components/criarExercicios";
import { Exercicios } from "./components/exercicios";
import { Exercicio, TypeOfExercicio } from "@/app/types";
import { IoAddOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import '../alunosPage/style.css'

export default function ExerciciosPage() {
  const [category, setCategory] = useState<string | undefined>()
  const [data, setData] = useState<Exercicio[]>()
  const [search, setSearch] = useState<string | undefined>(undefined)
  useEffect(() => {
    async function getData() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/exercicio/search`, {
        method: "POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          category: category,
          search: search,
        })
      })
      const exercicios: Exercicio[] = await res.json()
      setData(exercicios)
    }
    getData()
  }, [ ,data, search])

  return <div className="flex flex-col h-screen w-full space-y-5 css p-10">
    <h1 className="text-3xl font-bold text-white text-center">Exercícios Cadastrados no TEA</h1>
    <div className="w-full flex space-x-3 m-auto justify-center">
      <button className="bg-zinc-900 rounded-full p-4">
        <MyModal icon={<IoAddOutline color="#fff000" size={30} />}>
          <CriarExercicio />
        </MyModal>
      </button>
      <div className="search focus-within:space-x-3 bg-zinc-900  hover:group-last:w-14 hover:rounded-md hover:space-x-3 flex items-center justify-center p-4">
        <FaSearch className=" font-bold" size={30} color="#fff000" />
        <input className="input " type="text" onChange={(v) => {
          setSearch(v.currentTarget.value)
        }} />
      </div>
      <select  className="bg-zinc-900 p-3 border border-yellow-400 text-zinc-300 rounded-lg" onChange={(v) => { setCategory(v.currentTarget.value) }}>
        <option  value={undefined}>Todas Categorias</option>
        {TypeOfExercicio.map(t => {
          return <option key={`${t}`} value={`${t}`}>{t}</option>
        })}
      </select>

    </div>
    <div className="text-zinc-300 mt-3 space-y-2 ">

      <h1 className="text-center text-zinc-300">Arraste para direita para editar</h1>
    </div>
    <div className="h-max w-full">
      {data ? <Exercicios data={data} /> : null}
    </div>
  </div>
}