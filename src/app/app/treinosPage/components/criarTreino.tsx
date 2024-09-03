'use client'
import { useEffect, useState } from "react"
import MyModal from "../../_componnents/dialog";
import { Exercicio } from "@/app/types";
import Swipeable from "../../_componnents/swipeable";
import { CardExercicio } from "../../exerciciosPage/components/cardExercicio";
import { IoAdd, IoTrainOutline, IoTrashBinOutline, IoTrashOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { FaCheckCircle } from "react-icons/fa";
import Image from "next/image";
import AsyncSelect from 'react-select/async';


export default function CriarTreino() {

  const [treino, setTreino] = useState<Array<{ id: string, name: string, carga?: string, series?: string, restTime?: string, repeticao?: string, iden?: number }[]>>([])
  const [qtdDays, setQtDays] = useState<number>(0)
  const [data, setData] = useState<Exercicio[]>()
  const form = useForm();


  const [exercicios, setExercicios] = useState<{ value: String; label: String; }[]>()
  const [exercicio, setExercicio] = useState<{ value: String; label: String; }>()






  const filterColors = async (inputValue: string) => {
    console.log(inputValue);
    
    
    if(data){
      setExercicios(() => {
        const dataA = data.map(u => {
          return { value: u.id, label: u.name };
        })
        return dataA
      })
      if (exercicios) {
        return exercicios.filter(i => i.label.toLowerCase().includes(inputValue.toLowerCase()))
      }
    }
    return [{ value: undefined, label: "" }]
  };

  const loadOptions = (
    inputValue: string,
    callback: (options: { value: String | undefined, label: String }[]) => void
  ) => {
    setTimeout(async () => {
      callback(await filterColors(inputValue));
    }, 1000);
  };

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
      return { count: t.map(t => t) }
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

  return <div className="flex flex-col  h-max items-center p-6 space-y-4">
    <h1 className=" text-zinc-300 fontC font-bold text-center text-3xl">Adicione um treino ao TEA</h1>
    <div className="flex flex-col w-max h-max bg-zinc-900 space-y-4 rounded-lg p-6 max-sm:flex-col items-center justify-between">
      <div className="flex w-max space-x-6 space-y-4 rounded-lg p-6 max-sm:flex-col items-center justify-between" >
        <div className="w-40 h-40 bg-yellow-400 rounded-full"></div>
        <div className="space-y-4">
          <div>
            <h1 className="text-zinc-300  font-bold">Nome do Treino:</h1>
            <input className="px-3 py-3 focus-within:outline-0 focus-within:rounded-lg focus-within:border focus-within:border-yellow-300  text-zinc-300 bg-bg rounded-lg " {...form.register('name')} type="text" />
          </div>
          <div>
            <h1 className="text-zinc-300 font-bold">Treinador:</h1>
            <input className="px-3 py-3 text-zinc-300 focus-within:outline-0 focus-within:border focus-within:border-yellow-300 focus-within:rounded-lg bg-bg rounded-lg "  {...form.register('treinador')} type="text" />
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

            }} className="bg-bg text-zinc-300 focus-within:outline-0 focus-within:border focus-within:border-yellow-300 focus-within:rounded-lg rounded-lg p-3" name="formato" id="formato">
              {list.map((item) => {
                return <option key={item.id} value={item.id}>{item.name}</option>
              })}
            </select>
          </div>
          <div>
            <h1 className="text-zinc-300 font-bold">Objetivo:</h1>
            <input className="px-3 py-3 text-zinc-300 focus-within:outline-0 focus-within:border focus-within:border-yellow-300 focus-within:rounded-lg bg-bg rounded-lg " type="text" />
          </div>
        </div>

      </div>
      <button onClick={handlePost} className=" border border-yellow-400 rounded-lg flex p-2 items-center space-x-3 justify-center" type="submit">
        <IoAdd size={24} className="text-yellow-400" />
        <h1 className=" text-yellow-400 font-bold text-lg">Criar Treino</h1>
      </button>
    </div>
    <form className="w-full">
      <div className={`w-full ${qtdDays > 1 ? 'p-6' : ''}`}>
        {list.map(item => {

          count++
          if (item.id > qtdDays) return
          return <div key={item.id} className={`w-full mt-5 rounded-lg p-6 bg-zinc-900 `}>
            <div className="flex w-full items-center mb-6 justify-between">
              <h1 className=" text-2xl font-bold text-white">Dia {item.id}</h1>

              <MyModal small icon={
                <button type="button" className="p-3 flex max-sm:px-2 text-yellow-400 border border-yellow-300 focus-within:rounded-lg font-bold  rounded-lg items-center justify-center ">Adicionar exercício</button>
              }>
                <div className="space-y-4">
                  <h1 className="fontC font-bold text-xl text-yellow-400">Procure o Exercicio</h1>
                  <div className="flex space-x-2">
                    <AsyncSelect blurInputOnSelect onChange={async (v) => {
                      setExercicio({ value: v!.value as string, label: v?.label as string });
                    }} className="react-select-container" cacheOptions placeholder={'Busque por Aluno'} loadOptions={loadOptions} styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        width: '20rem',
                        outlineWidth: '0px',
                        padding: '0.4rem',
                        color: 'white',
                        border: 'none',
                      })
                    }} defaultOptions />
                    <button onClick={() => {
                      if (exercicio) {
                        setTreino(prev => {
                          const treino = [...prev];
                          const treinoCurrent = [...treino[item.id - 1]]
                          treinoCurrent.push({
                            id: exercicio?.value as string, name: exercicio?.label as string, iden: Math.floor(Math.random() * (900000000 - 1) + 1)
                          });
                          treino[item.id - 1] = treinoCurrent;
                          return treino;
                        })
                      }
                    }} className="p-3 bg-yellow-400 rounded-lg"><IoAdd size={24} /></button>
                  </div>
                </div>
              </MyModal>
            </div>
            <div className="flex justify-between">
              <div>
                <h1 className="fontC text-zinc-400">Nome</h1>
              </div>
              <div className="flex">
                <h1 className="w-32 fontC text-sm text-zinc-400">n de series</h1>
                <h1 className="w-36 mr-1 fontC text-sm text-zinc-400">n de repetições</h1>
                <h1 className="mr-6 fontC text-zinc-400 text-sm">tempo de descansço</h1>
                
              </div>
            </div>

            <div>
              {treino[item.id - 1].map((t) => {
                exercicioCurrent++
                integer++

                return <div className="mt-6 flex justify-between items-center space-x-2" key={`${integer}`}>
                  <h1 className="text-yellow-400 break-words max-w-52 br font-bold text-md">
                    {t.name}
                  </h1>
                  <div onClick={()=>{
                    setTreino(prev =>{
                      const treino = [...prev];
                      const treinoCurrent = [...treino[item.id - 1]];
                      const treinoNew = treinoCurrent.filter(e => e.iden !== t.iden);
                      treino[item.id - 1] = treinoNew;
                      return treino;
                    })
                  }} className="p-3 bg-red-500 rounded-lg"><IoTrashOutline/></div>
                  <div className="flex space-x-3">
                    <input className="p-3 w-28 text-zinc-300 bg-bg rounded-lg " onChange={(v) => {
                      if (Number(v.target.value) < 0) {
                        v.target.value = '0';
                        return
                      }
                      setTreino(prev => {
                        const treino = [...prev];
                        const treinoCurrent = [...treino[item.id - 1]];
                        const exercicioCurrent = treinoCurrent.filter(ex => ex.iden === t.iden);
                        exercicioCurrent[0].series = v.target.value;
                        treinoCurrent.map(treino => {
                          if (treino.name === exercicioCurrent[0].name) {
                            treino = exercicioCurrent[0];
                          }
                        })
                        treino[item.id - 1] = treinoCurrent;
                        return treino
                      })
                    }} type='number' />
                    <input className="p-3 w-36 text-zinc-300 bg-bg rounded-lg " onChange={(v) => {
                      if (Number(v.target.value) < 0) {
                        v.target.value = '0';
                        return
                      }
                      setTreino(prev => {
                        const treino = [...prev];
                        const treinoCurrent = [...treino[item.id - 1]];
                        const exercicioCurrent = treinoCurrent.filter(ex => ex.iden === t.iden);
                        exercicioCurrent[0].repeticao = v.target.value;
                        treinoCurrent.map(treino => {
                          if (treino.name === exercicioCurrent[0].name) {
                            treino = exercicioCurrent[0];
                          }
                        })
                        treino[item.id - 1] = treinoCurrent;
                        return treino
                      })

                    }} type='number' />
                    <input className="p-3 w-44 text-zinc-300 bg-bg rounded-lg " onChange={(v) => {
                      if (Number(v.target.value) < 0) {
                        v.target.value = '0';
                        return
                      }
                      setTreino(prev => {
                        const treino = [...prev];
                        const treinoCurrent = [...treino[item.id - 1]];
                        const exercicioCurrent = treinoCurrent.filter(ex => ex.iden === t.iden);
                        exercicioCurrent[0].restTime = v.target.value;
                        treinoCurrent.map(treino => {
                          if (treino.name === exercicioCurrent[0].name) {
                            treino = exercicioCurrent[0];
                          }
                        })
                        treino[item.id - 1] = treinoCurrent;
                        console.log(treino);
                        return treino
                      })


                    }} type='number' />
                    
                  </div>
                </div>
              })}
            </div>

          </div>
        })}
      </div>

    </form>

  </div>
}