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
        let y = new Date(x).getMonth() + 1;
        let y2 = new Date(x).getDate();
        let y3 = parseInt(y2 + "" + y);


        let x1 =  Date.parse(objetivo.dataFinal);
        let z = new Date(x1).getMonth() + 1;
        let z2 = new Date(x1).getDate();
        let z3 = parseInt(z2 + "" + z);

        
        db.ref(`usuarios/${auth.currentUser.uid}/registros/`)
            .on('value', function (snapshot){
               snapshot.forEach(function(item){
                let n =  Date.parse(item.val().data);
                let n1 = new Date(n).getMonth() + 1;
                let n2 = new Date(n).getDate();
                let n3 = parseInt(n2 + "" + n1);
                   
                if(n3 >= y3 && n3 <= z3){
                    if (item.val().categoria == objetivo.categoria){
                       somaT += parseInt(item.val().valor);
                       console.log(item.val().categoria, objetivo.categoria)
                    }
                }
                console.log(n3);

                });            
                console.log(somaT);
                console.log(y3);
                console.log(z3);
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