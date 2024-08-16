'use client'
import { useEffect, useState } from "react"
import MyModal from "../../_componnents/dialog";
import { Exercicio } from "@/app/types";
import Swipeable from "../../_componnents/swipeable";
import { CardExercicio } from "../../exerciciosPage/components/cardExercicio";
import { IoAdd } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { FaCheckCircle } from "react-icons/fa";
import Image from "next/image";


export default function CriarTreino() {

  const [treino, setTreino] = useState<Array<{id:string,name:string,series?:string,timeOut?:string,repeticao?:string}[]>>([])
  const [qtdDays, setQtDays] = useState<number>(0)
  const [data, setData] = useState<Exercicio[]>()
  const form = useForm();

  useEffect(() => {
    async function getData() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/exercicio`)
      const exercicios = await res.json()
      setData(exercicios);

    }
    getData()
  }, [])

  const handlePost = form.handleSubmit(async (dataF) => {
    let count = 0;

    const data = treino.map(t => {
      return { count: t.map(t => t)}
    })

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/treino`, {
      method: "POST",
      body: JSON.stringify({
        treino: data.map(d => d.count),
        name: dataF.name,
        treinador: dataF.treinador
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (res.ok) {
      toast({
        className: "bg-bg border border-yellow-300 text-green-400 ",
        title: 'Treino criado com sucesso',
        duration: 1000,
        action: <FaCheckCircle size={25} />
      })
    }
  })

  const list = [
    { id: 1, name: 'A' },
    { id: 2, name: 'AB' },
    { id: 3, name: 'ABC' },
    { id: 4, name: 'ABCD' },
    { id: 5, name: 'ABCDE' },
    { id: 6, name: 'ABCDEF' },
  ];


  const [eSelected, setESelected] = useState<Exercicio[]>([]);

  let exercicioCurrent = -1

  let integer = 0

  let count = 0;

  return <div className="flex flex-col items-center p-6 space-y-4">
    <h1 className=" text-zinc-300 font-bold text-center text-3xl">Adicione um treino ao TEA</h1>
    <div className="flex flex-col w-max  bg-zinc-900 space-y-4 rounded-lg p-6 max-sm:flex-col items-center justify-between">
      <div className="flex w-max space-x-6 bg-zinc-900 space-y-4 rounded-lg p-6 max-sm:flex-col items-center justify-between" >
        <div className="w-40 h-40 bg-yellow-400 rounded-full"></div>
        <div className="space-y-4">
          <div>
            <h1 className="text-zinc-300 font-bold">Nome do Treino:</h1>
            <input className="px-3 py-3 text-zinc-300 bg-bg rounded-lg " {...form.register('name')} type="text" />
          </div>
          <div>
            <h1 className="text-zinc-300 font-bold">Treinador:</h1>
            <input className="px-3 py-3 text-zinc-300 bg-bg rounded-lg "  {...form.register('treinador')} type="text" />
          </div>
        </div>

        <div className="flex flex-col space-y-4" >
          <div>
            <h1 className="text-zinc-300 font-bold">Formato:</h1>
            <select defaultValue={''} onChange={(e) => {

              const qtdDay = Number(e.currentTarget.value)
              console.log(qtdDay)
              setQtDays(Number(e.currentTarget.value))
              setTreino([[]]);
              for (let i = 0; i < qtdDay - 1; i++) {
                setTreino(prev => {
                  prev?.push([])
                  return prev
                })
                i++;
              }

            }} className="bg-bg text-zinc-300 rounded-lg p-3" name="formato" id="formato">
              {list.map((item) => {
                return <option key={item.id} value={item.id}>{item.name}</option>
              })}
            </select>
          </div>
          <div>
            <h1 className="text-zinc-300 font-bold">Objetivo:</h1>
            <input className="px-3 py-3 text-zinc-300 bg-bg rounded-lg " type="text" />
          </div>
        </div>

      </div>
      <button onClick={handlePost} className=" border border-yellow-400 rounded-lg flex p-2 items-center space-x-3 justify-center" type="submit">
        <IoAdd size={24} className="text-yellow-400" />
        <h1 className=" text-yellow-400 font-bold text-lg">Criar Treino</h1>
      </button>
    </div>
    <form className="w-full">
      <div className="w-full p-8  bg-zinc-900">
        {list.map(item => {

          count++
          if (item.id > qtdDays) return
          return <div key={item.id} className={`w-full mt-5 rounded-lg p-6 bg-bg `}>
            <div className="flex w-full items-center mb-6 justify-between">
              <h1 className=" text-2xl font-bold text-white">Dia {item.id}</h1>
              <MyModal icon={
                <button type="button" className="p-3 flex max-sm:px-2 bg-green-400 font-bold  rounded-lg items-center justify-center ">Adicionar exercício</button>
              }>
                <div>
                  {data ? data.map((u: Exercicio) => {
                    let contadorPrev = 0;
                    return <div key={`${u.id}`} className={`${count % 2 === 0 || count === 0 ? 'bg-zinc-900 p-3 rounded-lg' : 'bg-bg p-3 rounded-lg'} w-full m-2 flex justify-between `}>
                      <button className="flex items-center justify-between w-full" type="button" onClick={(e) => {

                        e.preventDefault()

                        setTreino(prev => {

                          const dataa = prev.map(d => {
                            if (contadorPrev === item.id - 1) {
                              d.push({id:u.id as string,name:u.name as string,series:'',repeticao:'',timeOut:''})
                            }
                            contadorPrev++
                            return [...prev]
                          })



                          return dataa[item.id]

                        })
                        console.log(treino)
                      }} >
                        <div className="flex space-x-6 items-center">
                          <div className={u.img ? `h-12 w-12 rounded-full` : `h-12 w-12 rounded-full`}>
                            <Image
                              className="h-12 w-12 rounded-full"
                              src={u.img ? `${process.env.NEXT_PUBLIC_API_URL}/public/exercicios/${u.img}` : '/images/academia.png'}
                              alt="Image Ex"
                              width={80}
                              height={80}
                            />
                          </div>
                            <h1 className="text-white">{u.name}</h1>
                          </div>
                          <div>
                            <h1 className="text-green-400">{u.category}</h1>
                          </div>
                          
                      </button>
                    </div>
                  }) : null}
                </div>
              </MyModal>
            </div>

            <div>
              {treino[item.id - 1].map((t) => {
                exercicioCurrent++
                integer++
                return <div className="mt-6 flex justify-between items-center space-x-2" key={`${integer}`}>
                  <h1 className="text-yellow-400 break-words max-w-52 br font-bold text-xl">
                    {t.name} 
                  </h1>
                  <div className="flex space-x-3">
                    <input className="p-3 w-28 text-zinc-300 bg-zinc-900 rounded-lg " onChange={(v)=>{
                      setTreino(prev =>{
                        prev[item.id - 1][exercicioCurrent] = {
                          id: t.id,
                          name: 'alterado',
                          series: v.target.value ? v.target.value : '',
                          repeticao: t.repeticao,
                          timeOut: t.timeOut 
                        }
                        return prev
                      })
                      console.log(treino)
                      console.log(exercicioCurrent)
                    }} type="text" placeholder="n de series" />
                    <input className="p-3 w-36 text-zinc-300 bg-zinc-900 rounded-lg " onChange={(v)=>{
                      setTreino(prev =>{
                        prev[item.id - 1][exercicioCurrent] = {
                          id: t.id,
                          name: t.name,
                          series: t.series,
                          repeticao: v.target.value ? v.target.value : '',
                          timeOut: t.series
                        }
                        return prev
                      })
                      console.log(treino)
                      console.log(exercicioCurrent)
                    }} type="text" placeholder="n de repetições" />
                    <input className="p-3 w-44 text-zinc-300 bg-zinc-900 rounded-lg " onChange={(v)=>{
                      setTreino(prev =>{
                        prev[item.id - 1][exercicioCurrent] = {
                          id: t.id,
                          name: t.name,
                          series: t.series,
                          repeticao: t.repeticao,
                          timeOut: v.target.value ? v.target.value : ''
                        }
                        return prev
                      })
                      console.log(treino)
                      console.log(exercicioCurrent)
                    }} type="text" placeholder="tempo de descanço" />
                  </div>
                </div>
              })}
            </div>

          </div>
        })}
      </div>

    </form>
    {count}
  </div>
}