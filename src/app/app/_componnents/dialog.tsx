'use client'
import { Button, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { ReactNode, useState } from 'react'
import { FaRegMoneyBillAlt } from 'react-icons/fa'
import { IconType } from 'react-icons/lib'

export default function MyModal({children,icon}:Readonly<{children:ReactNode,icon:ReactNode}>) {
  let [isOpen, setIsOpen] = useState(false)
  

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  return (
    <>
      
      <div className='' onClick={open}>
        {icon}
      </div>
      

      <Transition appear show={isOpen}>
        <Dialog as="div" className="relative z-10" onClose={close}>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full bg-bg/60 backdrop-blur-sm items-center justify-center p-4">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-1/2 max-xl:w-3/5 max-sm:w-2/3 max-sm:h-2/3 rounded-lg  bg-zinc-900 p-6 ">
                 {children}
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}