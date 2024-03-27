import { NextResponse } from "next/server"
import {hash} from 'bcrypt'
import { prisma } from "@/app/services/database"


export  async function POST(req:Request) {
  try{
    const {email,password,fone,emerg,name,cpf} = await req.json()

    const hashedPass = await hash(password,10)

    const res = await prisma.user.create({
      data:{
        email:email,
        password:hashedPass,
        cpf:cpf,
        name:name,
        fone:fone,
        emerge:emerg
      }
    })
   
  } catch(e){
    console.log(e)
  }

  return NextResponse.json({message:"sucess"})
}