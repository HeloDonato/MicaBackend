let objetivo = [
  {
    id: 1,
    desc: 'Limite de 500 reais com salão',
    meta: 500,
    atual: 477,
    categoria: 'estética',
    dataIni: '01/05/2021',
    dataFim: '31/05/2021',
    tipo: 'limite'
  },
  {
    id: 2,
    desc: 'Arrecadar 2000 reais no mês',
    meta: 2000,
    atual: 1500,
    categoria: 'geral',
    dataIni: '01/06/2021',
    dataFim: '31/06/2021',
    tipo: 'reserva'
  },
]


export default class ObjetivoService { 
  static getObjetivo = () => {      
    return objetivo;
  }
}