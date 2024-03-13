import { NextResponse } from "next/server"
import {hash} from 'bcrypt'
import { prisma } from "@/app/services/database"
export  async function POST(req:Request) {
  try{
    const {email,password} = await req.json()
    console.log({email,password})

    const hashedPass = await hash(password,10)

    const res = await prisma.user.create({
      data:{
        email:email,
        password:hashedPass
      }
    })
  } catch(e){
    console.log(e)
  }

  return NextResponse.json({message:"sucess"})
}