import { NextRequest, NextResponse } from "next/server";
import bcrypt, { compare } from 'bcrypt'
import { prisma } from "@/app/services/database";
export async function sigInF(req:NextRequest){
  const {email,password} = await req.json()

  const res = await prisma.user.findMany({
    where:{
      email:email
    }
  });

  const user = res[0];

  const passCorrect = await compare(user.password || '', password)
  if (passCorrect){
    return NextResponse.json
  }
  return null
}