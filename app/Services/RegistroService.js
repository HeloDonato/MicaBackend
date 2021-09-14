import {db, auth} from '../firebaseConfig';
const endpoint = 'registros';

export default{
    /*async listar(callback){
        db.ref(`usuarios/${auth.currentUser.uid}/tarefas/`).on('value', query => {
            const dados = query.val() ? query.val() : {};
            if (callback)
                callback(dados);
        });
    },*/
    adicionar(registro){
        db.ref(`usuarios/${auth.currentUser.uid}/registros/`)
            .push(registro);
    },/*
    removerTarefa(id) {
        db.ref(`usuarios/${auth.currentUser.uid}/tarefas/`)
            .child(id)
            .remove();
    },
    async atualizarTarefa(id, tarefa){
        db.ref(`usuarios/${auth.currentUser.uid}/tarefas/`)
            .update({
                [id]: {
                    ...tarefa,
                    status: !tarefa.status
                }
            });
    }*/
}