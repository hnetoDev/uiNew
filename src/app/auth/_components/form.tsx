'use client'
import './form.css'
import { AiOutlineUser,AiOutlineLock } from "react-icons/ai";
import { signIn } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast,Bounce } from "react-toastify";
import { useToast } from "@/components/ui/use-toast"
import Link from 'next/link';
import { title } from 'process';


export function Form(){
  
  
  const form = useForm()
  const [isLogin,SetIsLogin] = useState<boolean>()
  const [text,setText] = useState<string>('Register')
  const [text2,setText2] = useState<string>('Create your credentials to register')
  const router = useRouter()
  const {toast} = useToast()
  const [errorCredentials, setErrorCredentials] = useState(false)
  
  const handleSubmit = form.handleSubmit(async (data)=>{
 
    toast({
      className:'bg-zinc-900 text-yellow-200 border border-zinc-900 ',
      title:'Confirmando dados...',
      duration:1500
    })
    const res = await signIn('credentials',{
      email:data.email,
      password:data.password,
      redirect:false
    })
    if(res?.error){
      console.log('error')
      setErrorCredentials(true)
      return null
    }
    if(!res?.error){
      toast({
        className:"bg-green-400 border border-green-400 text-bg ",
        title:'Logado com sucesso',
        duration:1000
    })
      router.push('/app');
      return
      
    }
    
    
    
   

    
  })
  
  return(
    <>
      <div className="w-full h-screen overflow-scroll sc  bg-bg flex max-md:flex-col overflow-x-hidden ">
        <div className='m-auto max-md:m-auto css pl-12 max-sm:pl-0  w-1/2 max-sm:w-4/5 max-md:w-5/6 space-y-3 p-0'>
          <h1 className='text-6xl max-md:text-5xl max-sm:text-5xl   text-yellow-400'>Insira os dados</h1>
          <h1 className='text-white text-6xl max-md:text-5xl max-sm:text-4xl'>p/Administrar TEA</h1>
          
        </div>
        <div className="m-auto w-1/3 p-8  css2  max-sm:h-max max-sm:w-max max-md:w-2/3 max-md:h-max bg-card rounded-2xl shadow-2xl shadow-yellow-500/10">
          <div className="mt-4 max-sm:mt-0 flex justify-stretch i flex-col">
            <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-4">
              <div className="flex items-center  py-0 px-2 space-x-3 rounded-md">
                <AiOutlineUser color='white' size={24}/>
                <input onClick={()=>{setErrorCredentials(false)}} type="text" id="email"  className=" outline-none py-2  w-full text-zinc-500   my-2 placeholder:text-zinc-500 bg-transparent" placeholder="m@example.com" {...form.register('email')} />
              </div>

              <div className="flex items-center  py-0 px-2 space-x-3 rounded-md">
                <AiOutlineLock color="white" size={24} />
                <input type="password" id="password" className=" outline-none py-2  w-full text-zinc-500   my-2 placeholder:text-zinc-500 bg-transparent" placeholder="********" {...form.register('password')}/>
              </div>
              {errorCredentials ? <h1 className="text-red-400 text-sm"> error - Credentials Invalid!</h1> : null }
              <button type='submit' className="text-center w-full rounded-md py-4 text-black bg-yellow-500 my-2 font-bold   active:bg-yellow-500/10">Login</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}