


export function cpfValidator(cpfR:string){


  const cpf = cpfR.replace(/[^0-9]/g,'')

  const cpfArr = cpf.split('')

  const digitosValidadores = cpfArr.slice(9,11)

  
  // validar digitos
  const verificaDigito = (dig:string[]) =>{
    let soma = dig.length + 1;
    let total:number =0;
    dig.map((value)=>{
      total += Number(value) * soma;
     
      soma--
    })
    const result = 11 - (total % 11)
    return result
  }
  
  
  const dig1 = verificaDigito(cpfArr.slice(0,9))
  const dig2 = verificaDigito(cpfArr.slice(0,10))
  if(dig1 === Number(digitosValidadores[0]) && dig2 === Number(digitosValidadores[1])){
    return true
  }
  return false
  
  
  
}