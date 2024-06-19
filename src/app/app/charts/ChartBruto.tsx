'use client' // if you use app dir, don't forget this line

import { CaixaType } from "@/app/types";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });


export function ChartBruto(){


    const months = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']
    const [data,setData] = useState<CaixaType[]>()
    useEffect(()=>{
      async function getData() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/caixas`,{
          method:'GET'
        })
        if(res.ok){
          const data:CaixaType[] = await res.json();
          setData(data)
        }
      }

      getData()
    },[]);

    const series = [{
        name: 'Bruto',
        data:  data ? data.map(d => {
          return Number(d.aplicativo) + Number(d.dinheiro) + Number(d.pix)
        }) : [10400,11000,7000,9000,12345,19000]
      }]

    return(
        <>
            <ApexChart options={{
              dataLabels:{
                enabled:false,
              },
              stroke:{
                show:true,
                colors:['#ffff00'],
                curve:'straight',
                dashArray:[0,8,5]
              },
              fill:{
                colors:['#ffff00','#ffff00','#ff0000213']
              },
              markers:{
                size:1,
                hover:{
                  sizeOffset:4
                }
              },
              chart:{
                type:'line',
                zoom:{
                  enabled:false
                },
              },
              xaxis:{
                categories:months
              },
              theme:{
                palette:'#21ffda',
              
              },
              labels:['Ativos','Inativos','Atrasados'],
            }} type="line" series={series} width={'100%'} height={280} />
        </>
    )
    
}