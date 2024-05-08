
import { Aluno } from "@/app/types"
import { useForm } from "react-hook-form"
import { IoTrashOutline } from "react-icons/io5"
import { MdOutlineEdit } from "react-icons/md"
import { Edite } from "../../_componnents/edit"

export default async function EditePage(
  {params}:{params : {id:string}}
){
  
  
  
  
  const userRes = await fetch(`https://api-nvjt0eai8-hnetos-projects.vercel.app/api/user/${params.id}`,{
    method:"GET"
  })
  const user:Aluno = await userRes.json() 
 


  return <div className="w-screen">
    <Edite user={user}/>
  </div>
}