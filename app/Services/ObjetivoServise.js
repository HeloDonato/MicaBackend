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
        let y = new Date(x).getDate();
        let y1 = new Date(x).getMonth() + 1;
        let y2 = new Date(x).getFullYear();

        /*
          Váriavel x1 pega a data intera
          O javascript não considera datas como iguais,
          ou seja, para comparar datas, precisamos fragmentar ela em
          váriaveis diferentes para que a igualdade seja aceita.
          Por exemplo, se um objetivo foi marcado no dia 23 e ocorreu um
          registro para o mesmo dia, o Js não consideraria, pq as datas não são iguais
        */
        let x1 =  Date.parse(objetivo.dataFinal);
        let z = new Date(x1).getDate();
        let z1 = new Date(x1).getMonth() + 1;
        let z2 = new Date(x1).getFullYear();


        
        db.ref(`usuarios/${auth.currentUser.uid}/registros/`)
            .on('value', function (snapshot){
               snapshot.forEach(function(item){
                let n =  Date.parse(item.val().data);
                let n1 = new Date(n).getDate();
                let n2 = new Date(n).getMonth() + 1;
                let n3 = new Date(n).getFullYear();
        
                if(n1 >= y && n1 <= z && n2 >= y1 && n2 <= z1 && n3 >= y2 && n2 <= z2){
                    if (item.val().categoria == objetivo.categoria && item.val().tipo == '2'){
                       somaT += parseInt(item.val().valor);
                       console.log(item.val().categoria, objetivo.categoria)
                    }
                    else if (item.val().categoria == objetivo.categoria && item.val().tipo == '1'){
                        somaT += parseInt(item.val().valor);
                        console.log(item.val().categoria, objetivo.categoria)
                     }
                }
                //console.log(n1, n2, n3);

                });            
                //console.log(somaT);
                //console.log(y, y1, y2);
                //console.log(z, z1, z2);
                if (callback)
                    callback(somaT);

                somaT = 0;
        });
    },

    async atualizar(id, {dataInicial, dataFinal, ...registro}){
        try{
        return db.ref(`usuarios/${auth.currentUser.uid}/objetivos/`)
            .child(id)
            .update({...registro, dataInicial:dataInicial.toUTCString(), dataFinal:dataFinal.toUTCString()});
        }catch(error){
            console.log9(error);
        }
    }
}