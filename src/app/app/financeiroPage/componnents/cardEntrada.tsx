
import { FaCheckCircle, FaRegMoneyBillAlt } from "react-icons/fa"
import MyModal from "../../_componnents/dialog"
import { MdOutlineEdit } from "react-icons/md"
import { Edite } from "../../alunosPage/components/edit"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { Entrada } from "@/app/types"

export function CardEntrada(userCurrent:Entrada){

  const payment = async(payment:boolean)=>{

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/updatePayment/${userCurrent.id}`,{
      method:'PUT',
      body:JSON.stringify({
        active:payment
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
      mode:'cors'
    })
    toast({
      className:"bg-bg border border-yellow-300 text-green-400 ",
      title:'Pagamento aprovado com sucesso',
      action: <FaCheckCircle size={25}/>,
      duration:1000
  })
  }
  const route = useRouter()

  return <div className="flex w-full items-center justify-between">

    <div className="flex space-x-12 items-center">
      <div className="h-12 w-12 bg-yellow-400 rounded-full ">

      </div>

      <div className="w-48 max-sm:w-12 ">
        <h1 className="text-zinc-400 text-sm font-bold m-auto break-words">{userCurrent.name}</h1>
      </div>

      <div className=" max-sm:w-12 w-32   overflow-hidden">
        <h1 className="text-green-400 max-sm:ml-0 ml-14 text-center text-sm font-bold m-auto break-words uppercase">{userCurrent.method}</h1>
      </div> 

      <div className="w-48  break-words ">
        <h1 className=" text-yellow-400 text-sm max-sm:invisible font-bold text-center break-words">{userCurrent.date}</h1>
      </div>

      

    </div>


  </div>
}