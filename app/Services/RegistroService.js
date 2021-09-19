import {db, auth, storage} from '../firebaseConfig';

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

    atualizar(id, registro){
        console.log(id);
        return db.ref(`usuarios/${auth.currentUser.uid}/registros/`)
            .child(id)
            .update({...registro});
    },

    async uploadImagem(imagem){

        const blob = await new Promise((resolve, reject) =>{
            const xhr = new XMLHttpRequest();            
            xhr.onload = function(){
                resolve(xhr.response);
            }
            xhr.responseType = 'blob'            
            xhr.open('GET', imagem, true);
            xhr.send(null);
        });

        const comprovante = 
            storage.
                ref()
                .child(`usuarios/${auth.currentUser.uid}/registros/${new Date().getTime()}`);
                
        await comprovante.put(blob);
        let url = await comprovante.getDownloadURL();
        return url; 
    }
    
}