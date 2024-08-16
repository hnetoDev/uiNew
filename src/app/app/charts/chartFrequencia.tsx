'use client' // if you use app dir, don't forget this line



import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });


export function ChartFrequencia(){


   

    return(
        <>
            <ApexChart options={{
              
              chart: {
                
                type: "radialBar",
              },
            
              series: [67],
              colors: ["#e6d820"],
              plotOptions: {
                radialBar: {
                  hollow: {
                    margin: 0,
                    size: "70%",
                    background: "#121212"
                  },
                  track:{
                    show:false
                  },
                 
                  dataLabels: {
                    name: {
                      offsetY: -10,
                      color: "#fff",
                      fontSize: "13px"
                    },
                    value: {
                      color: "#fff",
                      fontSize: "30px",
                      show: true
                    }
                  }
                }
              },
              fill: {
                type: "gradient",
                gradient: {
                  shade: "dark",
                  type: "vertical",
                  gradientToColors: ["#ecce1f"],
                  stops: [0, 100]
                }
              },
              stroke: {
                
                lineCap: "butt"
              },
              labels: ["% de alunos "]
          
            }} series={[70]} type="radialBar" width={'100%'} height={280} />
        </>
    )
    
} 