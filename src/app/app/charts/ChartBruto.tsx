'use client' // if you use app dir, don't forget this line

import dynamic from "next/dynamic";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });


export function ChartBruto(){

    

    const series = [{
        name: 'Bruto',
        data: [10400,11000,7000,9000,12345,19000]
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
                categories:['Janeiro','Fevereiro','Março','Abril','Junho','julho'],
              },
              theme:{
                palette:'#21ffda',
              
              },
              labels:['Ativos','Inativos','Atrasados'],
            }} type="line" series={series} width={'100%'} height={280} />
        </>
    )
    
}