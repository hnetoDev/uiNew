'use client'


import { useForm } from "react-hook-form"

import { Swiper, SwiperSlide} from 'swiper/react'



import 'swiper/css';
import '../_components/form.css'
import 'swiper/css/pagination';
import { useState } from "react";
import { AiOutlineLock } from "react-icons/ai";

export default function RegisterPage() {

  const [init,setInit] = useState<boolean>(false)
  const form = useForm()


  const handleSubmit = form.handleSubmit(async (data) => {
    const res = await fetch('/auth/register',{
      method:'POST',
      body:JSON.stringify({
        nome:data.nome,
        email:data.email,
        password:data.password,
        cpf:data.cpf,
        fone:data.fone,
        idade:data.idade
      }),
    })
    if(res.ok){

    }
  })

  const InputP = (props:{
    title:string,
    data:string,
  }):JSX.Element=>{
    return (
      <div className="flex flex-col w-2/3">
        <h1 className="text-white text-xl">{`${props.title}:`}</h1>
        <div className="flex items-center  py-0 px-2 space-x-3 border rounded-md border-yellow-500">
                <AiOutlineLock color="white" size={24} />
                <input type={props.data} id={props.data} className=" outline-none py-2  w-full text-zinc-500   my-2 placeholder:text-zinc-500 bg-transparent" {...form.register(`${props.data}`)}/>
              </div>
      </div>
    )
  }
  return (
    <>
      <div className="w-full h-screen  bg-bg flex justify-center items-center">
      <div className='my-auto max-md:m-auto css pl-12 max-sm:pl-0  w-1/2 max-sm:w-max max-md:w-5/6 space-y-3 p-0'>
          <h1 className='text-6xl max-md:text-5xl max-sm:text-4xl  text-yellow-400'>informe os campos</h1>
          <h1 className='text-white text-6xl max-md:text-5xl max-sm:text-4xl'> para cadastro TEA</h1>
          
        </div>
        <div className="m-auto w-max p-8  css  max-sm:h-max max-sm:w-max max-md:w-2/3 max-md:h-max bg-card rounded-lg shadow-2xl shadow-yellow-500/10">
          <div className="mt-4 flex justify-stretch i flex-col">
            <form onSubmit={handleSubmit} className="w-full h-2/3 overflow-hidden space-y-4">
            <InputP title="Nome" data="nome"/>
              <InputP title="Email" data="email"/>
              <InputP title="Senha" data="password"/>
              <InputP title="CPF" data="cpf"/>
              <InputP title="Fone" data="fone"/>
              <InputP title="idade" data="idade"/>
            </form>
          </div>
        </div>
      </div>
         
    </>
  )
}