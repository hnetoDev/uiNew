export type Aluno = {
  id: String
  name: String
  cpf: String
  email: String
  password: String
  genero: String
  tel: String
  emerg: String
  active: boolean
  mensalidade: String
  planoId: String
  treinoId: string,
  img: string
}



export type Entrada = {
  dinheiro: number,
  pix: number,
  aplicativo: number,
  entradas: {
    id: string,
    name: string,
    method: string,
    date: string,
    value: string,
    month: number,
    userId: string,
    planoId: string
  }[],
  pages:number
}

export type EntradaSimples = {
  id: string,
  name: string,
  method: string,
  date: string,
  value: string,
  month: number,
  userId: string,
  planoId: string
}

export type Plano = {
  id: String
  name: String
  value: String
  duration: String
  qtd: Number
}



export type Exercicio = {
  name: String,
  desc: String,
  id: String
  img: String
  category: string
}

export type DrawerProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  isOpen: boolean
}

export type FilterType = {
  status?: String
  date?: String
}

export type Treino = {
  id: String
  name: String
  exercicios: JSON
}

export const TypeOfExercicio = [
  "BICEPS",
  "PEITO",
  "COSTAS",
  "TRICEPS",
  "OMBRO",
  "ANTEBRACO",
  "ABDOMEN",
  "GLUTEO",
  "POSTERIOR",
  "QUADRICEPS",
  "PANTURRILHA",
  "TRAPEZIO"
]