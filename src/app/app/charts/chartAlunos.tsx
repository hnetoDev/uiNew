'use client' // if you use app dir, don't forget this line

import dynamic from "next/dynamic";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });


export function ChartAlunos(){

    

    const series = [{
        name: 'Alunos',
        data: [150,100,30]
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
                colors:['#ffff00','#ffff00','#ff0000213']
              },
              chart:{
                type:'bar'
              },
              xaxis:{
                categories:['Ativos','Inativos','Atrasados'],
              },
              theme:{
                palette:'#21ffda',
              
              },
              labels:['Ativos','Inativos','Atrasados'],
            }} type="bar" series={series} width={'100%'} height={250}/>
        </>
    )
    
}