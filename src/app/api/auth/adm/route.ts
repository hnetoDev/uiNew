import { prisma } from "@/app/services/database";
import { NextRequest, NextResponse } from "next/server";
import {hash} from 'bcrypt'
export async function POST(req:NextRequest){
  const {email,password} = await req.json()

  const hashedPass = await hash(password,10)
  try{
    const res = await prisma.adm.create({
      data:{
        email:email,
        password:hashedPass
      }
    })
  } catch (e){
    console.log(e)
  }



  return NextResponse.json({cadastrado:'sucess'})
}