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
    resultado({...objetivo}, callback) {
        var somaT = 0;
        
        let x =  Date.parse(objetivo.dataInicial);
        let y = new Date(x).getTime();

        let x1 =  Date.parse(objetivo.dataFinal);
        let z = new Date(x1).getTime();

        
        db.ref(`usuarios/${auth.currentUser.uid}/registros/`)
            .on('value', function (snapshot){
               snapshot.forEach(function(item){
                let n =  Date.parse(item.val().data);
                let n1 = new Date(n).getTime();
                   
                if(n1 >= x && n1 <= z){
                    if (item.val().categoria == objetivo.categoria && item.val().tipo == '2'){
                       somaT += parseInt(item.val().valor);
                       console.log(item.val().categoria, objetivo.categoria)
                    }
                    else if (item.val().categoria == objetivo.categoria && item.val().tipo == '1'){
                        somaT += parseInt(item.val().valor);
                        console.log(item.val().categoria, objetivo.categoria)
                     }
                }
                console.log(n1);

                });            
                console.log(somaT);
                console.log(y);
                console.log(z);
                if (callback)
                    callback(somaT);

                somaT = 0;
        });
    },

    async atualizar(id, {dataInicial, dataFinal, ...registro}){
        return db.ref(`usuarios/${auth.currentUser.uid}/objetivos/`)
            .child(id)
            .update({...registro, dataInicial:dataInicial.toUTCString(), dataFinal:dataFinal.toUTCString()});
    }
}