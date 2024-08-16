'use client' // if you use app dir, don't forget this line



import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });


export function ChartBruto(){


    const months = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']
    const [data,setData] = useState<number[]>()
    useEffect(()=>{
      async function getData() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/entrada/caixa`,{
          method:'POST',
        })
        if(res.ok){
          const data:number[] = await res.json();
          setData(data)
        }
      }

      getData()
    },[]);
    
    let m = 0;
    const series = [{
        name: 'Bruto',
        data: data ? data.map(d => d) : [10400,11000,7000,9000,12345,19000]
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