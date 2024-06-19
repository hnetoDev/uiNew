export type Aluno = {
  id: String
  name: String
  cpf: String
  email:String
  password:String
  genero:String
  tel:String
  emerg:String   
  active:boolean
  mensalidade:String
  plano:String
}


export type Entrada = {
  id:String
  name:String
  method:String
  date:String
}

export type Plano = {
  id:String
  name: String
  value:String
  duration:String
  qtd:Number
}

export type CaixaType = {
  name: Number
  aplicativo:Number
  pix: Number
  dinheiro:Number
}

export type Exercicio = {
  name:String,
  desc:String,
  img:String,
  id:String
}

export type DrawerProps = {
  setOpen:React.Dispatch<React.SetStateAction<boolean>>,
  isOpen:boolean
}

export type FilterType = {
  status?:String
  date?:String
}

export type Treino = {
  id:String
  name:String
  exercicioId?:String
}