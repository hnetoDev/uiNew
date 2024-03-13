'use client'
import { AiOutlineUser,AiOutlineLock } from "react-icons/ai";
import { signIn } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

export function Form(){

  const form = useForm()
  const [isLogin,SetIsLogin] = useState<boolean>()
  const [text,setText] = useState<string>('Register')
  const [text2,setText2] = useState<string>('Create your credentials to register')
  const router = useRouter()


  const handleSubmit = form.handleSubmit(async (data)=>{
    if(!isLogin){
      const res = await fetch('/api/auth/register',{
        method:'POST',
        body:JSON.stringify({
          email:data.email,
          password:data.password,
        })
      })
      console.log(res)
      return
    }
    const res = await signIn('credentials',{
      email:data.email,
      password:data.password,
      redirect:false
    })
    if(!res?.error){
      router.push('/app');
      router.refresh();
    }
    
    
   

    
  })
  const handleBtnLogin = ()=>{
    setText('Login')
    setText2('Enter your credentials correct')

    SetIsLogin(true)

  }
  const handleBtnRegister = ()=>{
    setText('Register')
    setText2('Create your credentials to register')

    SetIsLogin(false)
  }
  return(
    <>
      <div className="w-full h-screen bg-zinc-900 flex  ">
        <div className="m-auto w-1/3 p-8 max-sm:h-4/5 max-sm:w-2/3 max-md:h-4/5 max-md:w-2/3 bg-zinc-950 rounded-md shadow-2xl shadow-purple-400/10">
          <div className=" space-y-4">
            <h1 className="font-bold text-5xl text-center text-purple-400">{text}</h1>
            <p className="text-zinc-300 text-center">{text2}</p>
          </div>
          <div className="mt-4 flex justify-stretch  flex-col">
            <form onSubmit={handleSubmit} className="w-full space-y-2">
              <div className="flex items-center border border-purple-400 py-0 px-2 space-x-3 rounded-md">
                <AiOutlineUser color='white' size={24}/>
                <input type="text" id="email" className=" outline-none py-2  w-full text-zinc-500   my-2 placeholder:text-zinc-500 bg-transparent" placeholder="m@example.com" {...form.register('email')} />
              </div>
              <div className="flex items-center border border-purple-400 py-0 px-2 space-x-3 rounded-md">
                <AiOutlineLock color="white" size={24} />
                <input type="password" id="password" className=" outline-none py-2  w-full text-zinc-500   my-2 placeholder:text-zinc-500 bg-transparent" placeholder="********" {...form.register('password')}/>
              </div>
              <button className="text-center w-full rounded-md py-2 text-purple-400 bg-black my-2">Submit</button>
            </form>
            <div className="flex max-sm:flex-col max-md:flex-col ">
              <button onClick={handleBtnLogin}  className={`text-center font-bold w-full rounded-md py-2 ${isLogin ? 'bg-purple-400 text-white' : 'bg-black text-purple-400'} my-2`}>Login</button>
              <button onClick={handleBtnRegister} className={`text-center w-full font-bold rounded-md py-2 ${!isLogin ? 'bg-purple-400 text-white' : 'bg-black text-purple-400'}  my-2`}>Register</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}