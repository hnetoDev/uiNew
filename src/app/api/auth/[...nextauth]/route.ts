import { prisma } from "@/app/services/database";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
export const nextOptions : NextAuthOptions = {
  adapter:PrismaAdapter(prisma),
  pages:{
    signIn:'/auth',
    
  },
  providers:[
    CredentialsProvider({
      credentials: {
        email: { label: "email", type: "text", placeholder: "m@example.com" },
        password: {  label: "Password", type: "password", placeholder:"********" }
      },
      async authorize(credentials,req) {
        console.log('aq')
      const res = await prisma.user.findMany({
        where:{
          email:credentials?.email
        }
      })
      const user = res[0];
      console.log(user)
      
      const passwordCorret = await compare(credentials?.password || '', user.password!)
      console.log(passwordCorret)

      if(passwordCorret){
        return{
          id:user.id,
          email:user.email,
        }
      }
      console.log('errado')
      
       return null
      }
    })
  ]
}
const handler = NextAuth(nextOptions)

export {handler as GET,handler as POST}
