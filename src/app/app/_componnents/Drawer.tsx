import './index.css'
import { DrawerProps } from '@/app/types'
import {Drawer} from 'antd'; 
import { IoIosCloseCircle } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";

export function DrawerCustom(props:DrawerProps):JSX.Element{
  const onclose = ()=>{
    props.setOpen(false);
  }
  return <Drawer closeIcon={<div><IoIosCloseCircle color='red' size={35} /></div>} styles={{
    content:{background:'zinc-900'},
    
  }} className='bg-zinc-900'
  open={props.isOpen}
  onClose={onclose}
  >
    <div className='flex flex-col justify-stretch space-y-3'>
      <div className='m-auto bg-yellow-400 w-40 h-40 rounded-full'></div>
      <div className='bg-bg w-max m-auto rounded-lg p-4'>
        <h1 className='text-zinc-300 '>dr.helzurocha@gmail.com</h1>
      </div>
      <div>
        <div className='flex space-x-3 items-start'>
          <div className='flex rounded-full bg-yellow-400 bg-opacity-45 p-2'>
            <FiLogOut size={20} color='yellow'  />
          </div>
          <h1 className='text-red-500 font-bold text-lg'>Logout</h1>
        </div>
      </div>
      <div>

      </div>
    </div>
  </Drawer>
}