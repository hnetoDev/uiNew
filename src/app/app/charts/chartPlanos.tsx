'use client'

import React, { Fragment, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { AgChartsReact } from "ag-charts-react";
import { AgChartOptions, AgCharts } from "ag-charts-community";
import { Aluno, Plano } from "@/app/types";


export function ChartPlanos(){
  


  const [options, setOptions] = useState<AgChartOptions>({
    
    theme:'ag-polychroma-dark',
   
    background:{
      visible:false
    },
    data: [
      { asset: "Plano Basico", amount: 0 },
      { asset: "Plano Familia", amount: 0 },
      { asset: "Familia", amount: 0 },
    ] ,
  
    series: [
      {
        calloutLabelKey: 'asset',
        sectorLabelKey: 'amount',
        sectorLabel: {
            color: 'white',
            fontWeight: 'bold',
        },
        type:'pie' ,
        angleKey: "amount",
        legendItemKey: "asset",
      },
      
    ],
  
    
    
  });

  useEffect(()=>{
    async function getData(){
      const res = await fetch('http://localhost:8000/api/user/planos')
      const planos:Plano[] = await res.json();
      console.log('aq')
      console.log(planos)


      setOptions({
    
        theme:'ag-polychroma-dark',
        
        background:{
          visible:false
        },
        data: planos.map(p =>{
          return { asset: p.name, amount: p.qtd }
        }) ,
        
        series: [
          {
            calloutLabelKey: 'asset',
            sectorLabelKey: 'amount',
            sectorLabel: {
                color: 'white',
                fontWeight: 'bold',
            },
            type: "pie",
            angleKey: "amount",
            legendItemKey: "asset",
          },
        ],
        
      })
      
    }
    
    getData()
    
  },[])
  
  

  return <AgChartsReact options={options} />;
};
