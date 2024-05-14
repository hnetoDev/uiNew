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
import { Aluno, Exercicio, Treino } from "@/app/types";




export default function Swipeable({childrenMyModal,children,aluno,treino,exercicio}:Readonly<{childrenMyModal?:ReactNode,children?:ReactNode, aluno?:Aluno,treino?:Treino,exercicio?:Exercicio}>){
  const router = useRouter()
  
  const leadingActions = () => {
    return <LeadingActions  >
      <SwipeAction onClick={() =>{}} >
        <MyModal  icon={<div className="m-auto mr-2 rounded-lg bg-green-400 p-3"><MdOutlineEdit className=" text-bg text-center  hover:text-yellow-400" size={24} /></div>}>
          {childrenMyModal}
        </MyModal>
      </SwipeAction>
    </LeadingActions>
  };
  return <SwipeableList  type={Type.IOS} threshold={0.1} className=" flex justify-between">
  <SwipeableListItem className=" flex justify-between"
    
    leadingActions={leadingActions()}

    
    

  >
    {children}
  </SwipeableListItem>
</SwipeableList>;


}