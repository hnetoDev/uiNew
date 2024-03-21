  export {default} from 'next-auth/middleware'


import { getServerSession } from "next-auth"
import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"


console.log('aq')

export const config = {
  matcher:['/((?!api|_next/static|_next/image|favicon.ico),*)','/app']
}