import {db, auth} from '../firebaseConfig';

export default{
    listar(callback){
        db.ref(`usuarios/${auth.currentUser.uid}/registros/`).on('value', query => {
            const dados = query.val() ? query.val() : {};
            if (callback)
                callback(dados);
        });
    },
    adicionar({data, ...registro}){
        console.log(registro);
        return db.ref(`usuarios/${auth.currentUser.uid}/registros/`)
            .push({...registro, data:data.toUTCString()});
    },
    remover(id) {
        db.ref(`usuarios/${auth.currentUser.uid}/registros/`)
            .child(id)
            .remove();
    },
    /*
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