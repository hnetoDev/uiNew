'use client'
import { Aluno, Plano, Treino } from "@/app/types";
import { LuImagePlus } from "react-icons/lu";
import { useForm } from "react-hook-form";
import { IoPerson, IoPersonAddOutline, IoTrashOutline } from "react-icons/io5";
import { MdEmail, MdError, MdOutlineEdit, MdOutlineEmail, MdPassword, MdWorkOutline } from "react-icons/md";
import '../../global.css'
import InputMask from 'react-input-mask'
import { headers } from "next/headers";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { FaCheckCircle, FaGenderless } from "react-icons/fa";
import { env } from "process";
import axios, { AxiosError, AxiosResponse } from "axios";
import Image from "next/image";
import { LockIcon, PhoneCall, PhoneIcon, TargetIcon } from "lucide-react";
import { CgGym } from "react-icons/cg";
import { cpfValidator } from "@/app/services/validators";
export function Add({ data, setData }: { data?: Aluno[], setData: Dispatch<SetStateAction<Aluno[] | undefined>> }) {

  const [planos, setPlanos] = useState<Plano[]>();
  const [treinos, setTreinos] = useState<Treino[]>()
  const [file, setFile] = useState<File | null>();
  const [cpf,setCpf] = useState<boolean>(true)


  useEffect(() => {
    async function getData() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/plano`, {
        method: "GET",
      })
      const planos: Plano[] = await res.json();
      setPlanos(planos);
    }

    async function getData2() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/treino`, {
        method: 'GET'
      })
      const treinos: Treino[] = await res.json()
      setTreinos(treinos)
    }
    getData()
    getData2()
    console.log(planos);

  }, [])
  const routes = useRouter()
  const form = useForm()
  const update = form.handleSubmit(async (data) => {

    const cpf = cpfValidator(data.cpf);
    if(!cpf){
      toast({
        className: "bg-bg border border-red-400 text-red-500 ",
        title: 'CPF Invalido',
        duration: 1000,
        action: <FaCheckCircle size={25} />
      })
      setCpf(cpf)
      return
    }
  

    const formData = new FormData()
    if (file) {
      formData.append('img', file)
    }
    formData.append('name', data.name)
    formData.append('cpf', data.cpf)
    formData.append('email', data.email)
    formData.append('tel', data.tel)
    formData.append('emerg', data.emerg)
    formData.append('password', data.password)
    formData.append('planoId', data.planoId)
    formData.append('mensalidade', data.mensalidade)
    formData.append('genero', data.genero)
    formData.append('treinoId', data.treinoId)


    const res = await axios.postForm(`${process.env.NEXT_PUBLIC_API_URL}/user`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      transformRequest: formData => formData
    }).then(v => {
      if (v.status === 201) {
        toast({
          className: "bg-bg border border-yellow-300 text-green-400 ",
          title: 'Aluno cadastrado com sucesso',
          duration: 1000,
          action: <FaCheckCircle size={25} />
        })
      }
    }).catch((e: AxiosError) => {
      if (e.response) {
        switch (e.response.status) {
          case 600:
            toast({
              className: "bg-bg border border-yellow-300 text-red-500 ",
              title: 'EMAIL e CPF já estão registrados',
              duration: 1000,
              action: <FaCheckCircle size={25} />
            })
            break;
          case 601:
            toast({
              className: "bg-bg border border-yellow-300 text-red-500 ",
              title: 'CPF já registrado',
              duration: 1000,
              action: <FaCheckCircle size={25} />
            })
            break;
          case 602:
            toast({
              className: "bg-bg border border-yellow-300 text-red-500 ",
              title: 'EMAIL já registrado',
              duration: 1000,
              action: <FaCheckCircle size={25} />
            })
            break;
          default:
            toast({
              className: "bg-bg border border-red-500 text-red-500 ",
              title: 'Erro desconhecio, Tente novamente',
              duration: 1000,
              action: <FaCheckCircle size={25} />
            })
            break;
        }

      }
    })





  })



  return <div className=" w-full   space-y-3 ">
    <form onSubmit={update}>
      <h1 className="text-white font-bold text-2xl text-center">Adicione um novo aluno</h1>
      <div className="mx-auto rounded-lg space-y-3  p-4 ">
        <div className="flex max-sm:flex-col">
          <div className="w-2/6 max-sm:w-full first-letter:h-full ">
            <div className={`w-40 h-40 mb-4 m-auto ${file ? 'border-2 border-yellow-400' : 'bg-yellow-400'} flex justify-center items-center rounded-full`}>
              {file ? <img className="w-32 h-32 rounded-full" src={URL.createObjectURL(file)} alt="img" width={100} height={100} /> : null}

              <button className="absolute z-10 bg-bg rounded-md p-4">
                <LuImagePlus className="m-auto text-yellow-400 font-bold" size={30} />
              </button>

              <input type="file" onChange={(v) => {
                setFile(v.currentTarget.files![0] as File)
              }} className=" opacity-0 hover:cursor-pointer  z-20 absolute" />
            </div>
            <div className="space-y-4 flex  flex-col justify-stretch">
              <div className="flex flex-col justify-stretch">
                <h1 className="text-zinc-300 font-bold">Nome:</h1>
                <div className="bg-bg rounded-lg px-2 py-1 space-x-2  flex items-center">
                  <IoPerson className="w-5 h-5 text-yellow-400" />
                  <input className=" py-3 text-zinc-300 bg-bg rounded-lg outline-none " type="text" required {...form.register('name')} />
                </div>
              </div>
              <div className="flex flex-col justify-stretch" >
                <h1 className="text-zinc-300 font-bold">Email:</h1>
                <div className="bg-bg rounded-lg px-2 py-1 space-x-2  flex items-center">
                  <MdEmail className="w-5 h-5 text-yellow-400" />
                  <input className=" py-3 text-zinc-300 bg-bg rounded-lg outline-none " type="text" required {...form.register('email')} />
                </div>
              </div>
            </div>
          </div>
          <div className="ml-4 w-3/6 max-sm:w-full max-sm:ml-0 flex flex-col space-y-4">
            <div className="flex flex-col justify-stretch" >
              <h1 className="text-zinc-300 font-bold">CPF:</h1>
              <div className={`${cpf ? '' : 'border-2 border-red-500'} bg-bg rounded-lg px-2 py-1 space-x-2  flex items-center`}>
                <MdPassword className="w-5 h-5 text-yellow-400" />
                <InputMask className=" py-3 text-zinc-300 bg-bg rounded-lg outline-none "  mask='999.999.999-99' color="black" type="text" required
                {...form.register('cpf')} onChange={(v)=>{
                  setCpf(true)
                }}/>
              </div>
            </div>
            <div className="flex flex-col justify-stretch" >
              <h1 className="text-zinc-300 font-bold">Tel:</h1>
              <div className="bg-bg rounded-lg px-2 py-1 space-x-2  flex items-center">
                <PhoneIcon className="w-5 h-5 text-yellow-400" />
                <InputMask mask='(99) 99999-9999' className=" py-3 text-zinc-300 bg-bg rounded-lg outline-none " type="text" required {...form.register('tel')} />
              </div>
            </div>
            <div className="flex flex-col justify-stretch" >
              <h1 className="text-zinc-300 font-bold">Tel. Emergência:</h1>
              <div className="bg-bg rounded-lg px-2 py-1 space-x-2  flex items-center">
                <PhoneCall className="w-5 h-5 text-yellow-400" />
                <InputMask mask='(99) 99999-9999' className=" py-3 text-zinc-300 bg-bg rounded-lg outline-none " type="text" required {...form.register('emerg')} />
              </div>
            </div>

            <div className="flex flex-col justify-stretch" >
              <h1 className="text-zinc-300 font-bold">Data de nascimento:</h1>
              <input className="px-3 py-3 text-zinc-300 bg-bg rounded-lg "  type="date" {...form.register('data')} />
            </div>

            <div className="flex flex-col justify-stretch" >
              <h1 className="text-zinc-300 font-bold">Gênero:</h1>
              <div className="bg-bg rounded-lg px-2 py-1 space-x-2  flex items-center">
                <FaGenderless className="w-5 h-5 text-yellow-400" />
                <select className="bg-bg w-full  text-zinc-300 rounded-lg p-3" required defaultValue={''} id="genero" {...form.register('genero')}>
                  <option className="bg-blue-500 p-4 text-bg" value="m">Masculino</option>
                  <option className="bg-pink-500 p-4 text-bg" value="f">Feminino</option>
                </select>
              </div>
            </div>

          </div>
          <div className="ml-4 space-y-4 max-sm:ml-0">

            <div className="flex flex-col justify-stretch" >
              <h1 className="text-zinc-300 font-bold">Planos:</h1>
              <div className="bg-bg rounded-lg px-2 py-1 space-x-2  flex items-center">
                <MdWorkOutline className="w-5 h-5 text-yellow-400" />
                <select className="bg-bg w-full text-zinc-300 rounded-lg p-3" required defaultValue={''} id="planos " {...form.register('planoId')}>
                  {planos?.map(p => {
                    return <option key={`${p.id}`} value={p.id as string}>{p.name}</option>
                  })}
                </select>

              </div>
            </div>

            <div className="flex flex-col justify-stretch" >
              <h1 className="text-zinc-300 font-bold">Data:</h1>
              <input className="px-3 py-3 text-zinc-300 bg-bg rounded-lg " required  type="date" {...form.register('mensalidade')} />
            </div>
            <div className="flex flex-col justify-stretch" >
              <h1 className="text-zinc-300 font-bold">Objetivo:</h1>
              <div className="bg-bg rounded-lg px-2 py-1 space-x-2  flex items-center">
                <TargetIcon className="w-5 h-5 text-yellow-400" />
                <input className=" py-3 text-zinc-300 bg-bg rounded-lg outline-none " type="text"  {...form.register('objetivo')} />
              </div>
            </div>
            <div className="flex flex-col justify-stretch" >
              <h1 className="text-zinc-300 font-bold">Senha:</h1>
              <div className="bg-bg rounded-lg px-2 py-1 space-x-2  flex items-center">
                <LockIcon className="w-5 h-5 text-yellow-400" />
                <input className=" py-3 text-zinc-300 bg-bg rounded-lg outline-none " type="text" required {...form.register('password')} />
              </div>
            </div>

            <div className="flex flex-col justify-stretch" >
              <h1 className="text-zinc-300 font-bold">Treino:</h1>
              <div className="bg-bg rounded-lg px-2 py-1 space-x-2  flex items-center">
                <CgGym className="w-5 h-5 text-yellow-400" />
                <select className="bg-bg w-full  text-zinc-300 rounded-lg p-3" defaultValue={''} required id="treino" {...form.register('treinoId')}>
                  {treinos?.map((t) => {
                    return <option className="p-3" value={t.id as string} key={`${t.id}`}>{t.name}</option>
                  })}
                </select>

              </div>
            </div>
          </div>

        </div>
        <div className="flex max-sm:space-x-1 max-sm:justify-between space-x-2 justify-end">
          <button type="submit" className="p-3 css2 flex max-sm:px-2 border border-green-400 max-sm:space-x-1 rounded-lg items-center justify-center space-x-2">
            <IoPersonAddOutline className="text-green-400" />
            <h1 className="font-bold text-green-400">Adicionar</h1>
          </button>


        </div>
      </div>
    </form>
  </div>
}