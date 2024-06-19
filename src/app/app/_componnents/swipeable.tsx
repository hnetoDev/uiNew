'use client'
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
  Type
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import MyModal from "./dialog";
import { Edite } from "../alunosPage/components/edit";
import { MdOutlineEdit } from "react-icons/md";
import { Aluno, Exercicio, Plano, Treino } from "@/app/types";
import { IoTrashOutline } from "react-icons/io5";




export default function Swipeable({childrenMyModal,childrenExit,children,aluno,treino,exercicio,plano}:Readonly<{childrenMyModal?:ReactNode,childrenExit?:ReactNode,children?:ReactNode, aluno?:Aluno,plano?:Plano,treino?:Treino,exercicio?:Exercicio}>){
  const router = useRouter()

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        onClick={() => console.info('swipe action triggered')}
      >
        <MyModal  icon={<div className="m-auto ml-2 rounded-lg  p-3"><IoTrashOutline className=" text-red-500 text-center " size={24} /></div>}>
          {childrenExit}
        </MyModal>
      </SwipeAction>
    </TrailingActions>
  );

  const leadingActions = () => {
    return <LeadingActions  >
      <SwipeAction onClick={() =>{}} >
        <MyModal  icon={<div className="m-auto mr-2 rounded-lg bg-green-400 p-3"><MdOutlineEdit className=" text-bg text-center  " size={24} /></div>}>
          {childrenMyModal}
        </MyModal>
      </SwipeAction>
    </LeadingActions>
  };
  return <SwipeableList  type={Type.IOS}
  swipeStartThreshold={0.2}
   threshold={0.2} className=" flex justify-between">
  <SwipeableListItem className=" flex justify-between"
    
    leadingActions={childrenMyModal ? leadingActions(): null}
    trailingActions={childrenExit ? trailingActions() : null }
    threshold={0.2}
    

  >
    {children}
  </SwipeableListItem>
</SwipeableList>;


}