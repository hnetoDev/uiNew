import { Entrada } from "@/app/types";


export function Caixa({caixa}:{caixa:Entrada}){

  
  
  if(caixa !== undefined){
    const total = Number(caixa.aplicativo !== undefined ? caixa.aplicativo : 0) + Number(caixa.dinheiro ? caixa.dinheiro : 0) + Number(caixa.pix ? caixa.pix : 0)

    return <div className="flex p-5 max-sm:p-5 max-sm:space-y-4 items-center max-sm:space-x-0 space-x-5 max-sm:flex-col justify-between">
    <div className="bg-bg border max-sm:w-full border-green-400 rounded-lg p-4 items-center justify-center">
      <h1 className="text-xl text-white font-bold text-center">Total:</h1>
      <h1 className="font-bold text-center text-green-400 text-xl">R${String(total)},00</h1>
    </div>

    <div className="flex max-sm:w-full items-center max-sm:flex-col max-sm:space-y-3 max-sm:space-x-0 space-x-4">

      <h1 className="text-xl font-bold text-yellow-400">Metodos de pagamento:</h1>

      <div className="bg-bg border max-sm:w-full border-yellow-400 rounded-lg p-4 items-center justify-center">
        <h1 className="text-xl text-white font-bold text-center">Aplicativo</h1>
        <h1 className="font-bold text-center text-green-400 text-xl">R${caixa.aplicativo !== null ? String(caixa.aplicativo) : '00' },00</h1>
      </div>

      <div className="bg-bg border max-sm:w-full border-yellow-400 rounded-lg p-4 items-center justify-center">
        <h1 className="text-xl text-white font-bold text-center">Pix:</h1>
        <h1 className="font-bold text-center text-green-400 text-xl">R${caixa.pix ? String(caixa.pix) : '00' },00</h1>
      </div>

      <div className="bg-bg border max-sm:w-full border-yellow-400 rounded-lg p-4 items-center justify-center">
        <h1 className="text-xl text-white font-bold text-center">Dinheiro</h1>
        <h1 className="font-bold text-center text-green-400 text-xl">R${caixa.dinheiro ? String(caixa.dinheiro) : '00'},00</h1>
      </div>

    </div>
    
  </div>
  }
  return null
  
}