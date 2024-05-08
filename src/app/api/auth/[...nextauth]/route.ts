import { prisma } from "@/app/services/database";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { randomBytes, randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { toast } from "react-toastify";
const nextOptions : NextAuthOptions = {
  adapter:PrismaAdapter(prisma),
  session:{
    strategy:'jwt',
    maxAge:30*24*60*60,
  },
  secret:process.env.NEXTAUTH_SECRET,
  pages:{
    signIn:'/auth',
    signOut:'/auth',
    newUser:'/auth'
    
  
  },
  providers:[
    CredentialsProvider({
      credentials: {
        email: { label: "email", type: "text", placeholder: "m@example.com" },
        password:{},
      },
      async authorize(credentials,req) {

      console.log('sig')
     
      const res = await prisma.user.findMany({
        where:{
          email:credentials?.email
        }
      })
      
      const user = res[0];
      if(!user){
        console.log('No-email')
      }
      
      const passwordCorret = await compare(credentials?.password || '',user.password!)
  
      console.log(passwordCorret)

      if(passwordCorret){
        console.log('pass correct')
        const cookie = cookies()
        const data = cookie.set('nextjs-data-user',`${user.name}`)
        return{
          id:user.id,
          email:user.email,
        }
      }

       return null
      }
    })
  ]
}
const handler = NextAuth(nextOptions)

export {handler as GET,handler as POST}
