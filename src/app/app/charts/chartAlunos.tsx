'use client' // if you use app dir, don't forget this line

import { Aluno } from "@/app/types";
import dynamic from "next/dynamic";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });


export function ChartAlunos(){
  const [data,setData] = useState<number[]>();


  useEffect(()=>{
    async function getData() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`)
      const aluno:Aluno[] = await res.json();

      const alunosAtivos = aluno.filter(a => a.active === true)
      console.log(alunosAtivos)
      const alunosInativos = aluno.length - alunosAtivos.length


      setData([alunosAtivos.length,alunosInativos])
    }

    getData()

  },[])

    const series = [{
        name: 'Alunos',
        data: data ? [data![0],data![1],1] : [0,0,0]
      }]

    return(
        <>
            <ApexChart options={{
              dataLabels:{
                enabled:true,
                
                
              },
              stroke:{
                show:true,
                colors:['transparent']
              },
              fill:{
                
              },
              colors:['#eeff00c5','#2600ff','#ff0000213'],
              chart:{
                type:'bar',
                events:{
                   dataPointSelection: function(event, chartContext, config) {
                    console.log(config.w.config.labels[config.dataPointIndex]);
                    
                   }
                
                }
              },
              xaxis:{
                categories:['Ativos','Inativos','Atrasados'],
              },
              theme:{
                palette:'#21ffda',
              
              },
              labels:['Ativos','Inativos','Atrasados'],
            }} type="bar" series={series} width={'100%'} height={280}/>
        </>
    )
    
}