'use client'
import { Aluno, Plano, Treino } from "@/app/types";
import { useForm } from "react-hook-form";
import { IoPerson, IoPersonAddOutline, IoTrashOutline } from "react-icons/io5";
import { MdEmail, MdOutlineEdit, MdPassword, MdWorkOutline } from "react-icons/md";
import '../../global.css'
import { IoMdExit } from "react-icons/io";
import bcrypt from "bcrypt";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaGenderless } from "react-icons/fa";
import { toast } from "@/components/ui/use-toast";
import { LuImagePlus } from "react-icons/lu";
import axios from "axios";
import { CgGym } from "react-icons/cg";
import { LockIcon, PhoneCall, PhoneIcon, TargetIcon } from "lucide-react";
import InputMask from 'react-input-mask'
import { cpfValidator } from "@/app/services/validators";

export function Edite({ user }: { user: Aluno }) {

  const [planos, setPlanos] = useState<Plano[]>();
  const [treinos, setTreinos] = useState<Treino[]>()
  const [file, setFile] = useState<File | null>()
  const [cpf,setCpf] = useState<boolean>(true)
  useEffect(() => {
    async function getData() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/plano`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        },
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
  const form = useForm()
  const update = form.handleSubmit(async (data) => {

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
    formData.append('planoId', (data.planoId === '' ? user.planoId : data.planoId))
    formData.append('mensalidade', data.mensalidade)
    formData.append('genero', data.genero)
    formData.append('treinoId', (data.treinoId === '' ? user.treinoId : data.treinoId))


    const res = await axios.patchForm(`${process.env.NEXT_PUBLIC_API_URL}/user/${user.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      transformRequest: formData => formData
    }).then(r => {
      console.log(r.data)
      return r
    });
    console.log(res.status)




    const user2: Aluno = await res.data


    if (res.status === 200) {


      toast({
        className: "bg-bg border border-yellow-300 text-green-400 ",
        title: 'Aluno Cadastrado com sucesso',
        duration: 1000,
        action: <FaCheckCircle size={25} />
      })


    }
  })
  

  return <div className=" w-full space-y-3 ">
    <form onSubmit={update}>
      <h1 className="text-yellow-400 font-bold text-2xl text-center">Edite os dados do aluno: {user.name}</h1>
      <div className="mx-auto rounded-lg space-y-3  p-4 ">
        <div className="flex max-sm:flex-col">
          <div className="w-2/6 max-sm:w-full first-letter:h-full ">
            <div className={`w-40 h-40 mb-4 m-auto ${file ? 'bg-bg border-2 border-yellow-400' : 'bg-yellow-400'} ${user.img ? 'bg-zinc-900 border-yellow-400 border-2' : null} flex justify-center items-center rounded-full`}>
              {file ? <img className="w-32 h-32 rounded-full" src={URL.createObjectURL(file)} alt="img" width={100} height={100} /> : user.img ? <img className="w-32 h-32 rounded-full" src={`${process.env.NEXT_PUBLIC_API_URL}/public/users/${user.img}`} alt="img" width={100} height={100}/> : null }

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
                  <input className=" py-3 text-zinc-300 bg-bg rounded-lg outline-none " type="text" required defaultValue={`${user.name}`} {...form.register('name')} />
                </div>
              </div>
              <div className="flex flex-col justify-stretch" >
                <h1 className="text-zinc-300 font-bold">Email:</h1>
                <div className="bg-bg rounded-lg px-2 py-1 space-x-2  flex items-center">
                  <MdEmail className="w-5 h-5 text-yellow-400" />
                  <input className=" py-3 text-zinc-300 bg-bg rounded-lg outline-none " type="text" required defaultValue={`${user.email}`} {...form.register('email')} />
                </div>
              </div>
            </div>
          </div>
          <div className="ml-4 w-3/6 max-sm:w-full max-sm:ml-0 flex flex-col space-y-4">
            <div className="flex flex-col justify-stretch" >
              <h1 className="text-zinc-300 font-bold">CPF:</h1>
              <div className={`${cpf ? 'border-green-400' : 'border-2 border-red-500'} bg-bg rounded-lg px-2 py-1 space-x-2  flex items-center`}>
                <MdPassword className="w-5 h-5 text-yellow-400" />
                <InputMask className=" py-3 text-zinc-300 bg-bg rounded-lg outline-none "  mask='999.999.999-99' defaultValue={`${user.cpf}`} color="black" type="text" required
                {...form.register('cpf')} onChange={(v)=>{
                  if(v.target.value.length === 14){
                    setCpf(cpfValidator(v.target.value))
                  }
                }}/>
              </div>
            </div>
            <div className="flex flex-col justify-stretch" >
              <h1 className="text-zinc-300 font-bold">Tel:</h1>
              <div className="bg-bg rounded-lg px-2 py-1 space-x-2  flex items-center">
                <PhoneIcon className="w-5 h-5 text-yellow-400" />
                <InputMask mask='(99) 99999-9999' className=" py-3 text-zinc-300 bg-bg rounded-lg outline-none " defaultValue={`${user.tel}`} type="text" required {...form.register('tel')} />
              </div>
            </div>
            <div className="flex flex-col justify-stretch" >
              <h1 className="text-zinc-300 font-bold">Tel. Emergência:</h1>
              <div className="bg-bg rounded-lg px-2 py-1 space-x-2  flex items-center">
                <PhoneCall className="w-5 h-5 text-yellow-400" />
                <InputMask mask='(99) 99999-9999' className=" py-3 text-zinc-300 bg-bg rounded-lg outline-none " defaultValue={`${user.emerg}`} type="text" required {...form.register('emerg')} />
              </div>
            </div>

            <div className="flex flex-col justify-stretch" >
              <h1 className="text-zinc-300 font-bold">Data de nascimento:</h1>
              <input className="px-3 py-3 text-zinc-300 bg-bg rounded-lg " required  type="date" {...form.register('data')} />
            </div>

            <div className="flex flex-col justify-stretch" >
              <h1 className="text-zinc-300 font-bold">Gênero:</h1>
              <div className="bg-bg rounded-lg px-2 py-1 space-x-2  flex items-center">
                <FaGenderless className="w-5 h-5 text-yellow-400" />
                <select className="bg-bg w-full  text-zinc-300 rounded-lg p-3" required defaultValue={`${user.genero}`} id="genero" {...form.register('genero')}>
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
                <select className="bg-bg w-full text-zinc-300 rounded-lg p-3" required defaultValue={`${user.planoId}`} id="planos " {...form.register('planoId')}>
                  {planos?.map(p => {
                    return <option key={`${p.id}`} value={p.id as string}>{p.name}</option>
                  })}
                </select>

              </div>
            </div>

            <div className="flex flex-col justify-stretch" >
              <h1 className="text-zinc-300 font-bold">Data:</h1>
              <input className="px-3 py-3 text-zinc-300 bg-bg rounded-lg " required defaultValue={`${user.mensalidade}`}  type="date" {...form.register('mensalidade')} />
            </div>
            <div className="flex flex-col justify-stretch" >
              <h1 className="text-zinc-300 font-bold">Objetivo:</h1>
              <div className="bg-bg rounded-lg px-2 py-1 space-x-2  flex items-center">
                <TargetIcon className="w-5 h-5 text-yellow-400" />
                <input className=" py-3 text-zinc-300 bg-bg rounded-lg outline-none " type="text" required {...form.register('objetivo')} />
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
                <select className="bg-bg w-full  text-zinc-300 rounded-lg p-3" defaultValue={`${user.treinoId}`} required id="treino" {...form.register('treinoId')}>
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
            <MdOutlineEdit className="text-green-400" />
            <h1 className="font-bold text-green-400">Editar</h1>
          </button>


        </div>
      </div>
    </form>
  </div>
}