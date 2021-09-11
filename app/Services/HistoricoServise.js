let historico = [
  {
    id: 1,
    desc: 'Camisas',
    valor: '160,00',
    tipo: 'receita',
  },
  {
    id: 2,
    desc: 'Luz',
    valor: '330,60',
    tipo: 'despesa',
  },
  {
    id: 3,
    desc: 'Depósito',
    valor: '200,00',
    tipo: 'transfer',
  },
  {
    id: 4,
    desc: 'Bolsa Família',
    valor: '253,50',
    tipo: 'receita',
  },
  {
    id: 5,
    desc: 'Aluguel',
    valor: '500,00',
    tipo: 'despesa',
  },
  {
    id: 6,
    desc: 'Salário',
    valor: '2000,00',
    tipo: 'receita',
  },
  {
    id: 7,
    desc: 'Água',
    valor: '80,00',
    tipo: 'despesa',
  },
  {
    id: 8,
    desc: 'Saque',
    valor: '320,00',
    tipo: 'transfer',
  },
]

export default class HistoricoService { 
  static getHistorico = () => {      
    return historico;
  }
}