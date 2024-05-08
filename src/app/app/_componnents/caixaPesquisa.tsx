
import { useRouter } from "next/navigation";
import { CiFilter } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import { IoPersonAddOutline } from "react-icons/io5";
import MyModal from "./dialog";
import { Add } from "./criar";

export function CaixaPesquisa(){
  
  return <div className="w-full flex space-x-3 m-auto justify-center">
  <button className="bg-zinc-900 rounded-full p-4">
    <MyModal icon={<IoPersonAddOutline color="#fff000" size={30} />}>
      <Add/>
    </MyModal>
  </button>
  <div className="search focus-within:space-x-3 bg-zinc-900  hover:group-last:w-14 hover:rounded-md hover:space-x-3 flex items-center justify-center p-4">
    <FaSearch className=" font-bold" size={30} color="#fff000"/>
    <input className="input " type="text"/>
  </div>
  <button className="bg-zinc-900 rounded-full p-4">
    <CiFilter  color="#fff000" size={30} />
  </button>
</div>
}