let usuario = [
  {
    id: 1,
    nome: 'Anderson',
    sobrenome: 'Ferreira',
    email: 'andersonopai@gmail.com',
    senha: 'paianderson',
    logado: true,
  }
]

export default class UsuarioService { 
  static getUsuario = () => {      
    return usuario;
  }
  
  /*static adicionarTarefa = (tarefa, callback) => {

  }*/

  static alterarStatusDoUsuario = (usuario) => {
    usuario.logado = !usuario.logado;
    console.log(usuario);        
  }
}