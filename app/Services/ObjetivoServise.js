import {db, auth, storage} from '../firebaseConfig';

export default{
    listar(callback){
        db.ref(`usuarios/${auth.currentUser.uid}/objetivos/`).on('value', query => {
            const dados = query.val() ? query.val() : {};
            if (callback)
                callback(dados);
        });
    },

    adicionar({dataInicial, dataFinal, ...registro}){
      console.log(dataInicial);
      console.log(dataFinal);
        return db.ref(`usuarios/${auth.currentUser.uid}/objetivos/`)
            .push({dataInicial:dataInicial.toUTCString(), dataFinal:dataFinal.toUTCString(), ...registro});
    },

    remover(id) {
        db.ref(`usuarios/${auth.currentUser.uid}/objetivos/`)
            .child(id)
            .remove();
    },

    async atualizar(id, {dataInicial, dataFinal, ...registro}){
        return db.ref(`usuarios/${auth.currentUser.uid}/objetivos/`)
            .child(id)
            .update({...registro, dataInicial:dataInicial.toUTCString(), dataFinal:dataFinal.toUTCString()});
    }
}