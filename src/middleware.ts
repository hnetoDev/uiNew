  export {default} from 'next-auth/middleware'






console.log('aq')

export const config = {
  matcher:['/((?!api|_next/static|_next/image|favicon.ico),*)','/app']
}