export type Aluno = {
  id: String
  name: String
  cpf: String
  email:String
  password:String
  tel:String
  emerg:String   
  active:boolean
  mensalidade:String
}
export type Treino = {
  title: String
  img:String
  desc:String
  id:String
}

export type Exercicio = {
  title:String,
  desc:String,
  img:String,
  id:String
}

export type DrawerProps = {
  setOpen:React.Dispatch<React.SetStateAction<boolean>>,
  isOpen:boolean
}