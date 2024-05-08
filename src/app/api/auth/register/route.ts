import { NextResponse } from "next/server"
import bcrypt, { compare } from 'bcrypt'
import { prisma } from "@/app/services/database"


export  async function POST(req:Request) {
  try{
    const {email,password,name} = await req.json()
    const salt = bcrypt.genSaltSync(10)
    const hashedPass = bcrypt.hashSync(password,salt)

    const res = await prisma.user.create({
      data:{
        email:email,
        name:name,
        password: hashedPass,
      }
    })

   
  } catch(e){
    console.log(e)
  
  }

  return NextResponse.json({sucess:"true"})
}