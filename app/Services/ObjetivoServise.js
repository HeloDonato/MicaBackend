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
            if (y < 10)
                y = 0 + '' + y;
        let y1 = new Date(x).getMonth() + 1;
            if (y1 < 10)
                y1 = 0 + '' + y1;
        let y2 = new Date(x).getFullYear();
        
        let dataInicial = y2 + '' + y1 + '' + y;
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
            if (z < 10)
                z = 0 + '' + z;
        let z1 = new Date(x1).getMonth() + 1;
            if (z1 < 10)
                z1 = 0 + '' + z1;
        let z2 = new Date(x1).getFullYear();
        
        let dataFinal = z2 + '' + z1 + '' + z;

        
        db.ref(`usuarios/${auth.currentUser.uid}/registros/`)
            .on('value', function (snapshot){
               snapshot.forEach(function(item){
                let n =  Date.parse(item.val().data);
                let n1 = new Date(n).getDate();
                    if (n1 < 10)
                        n1 = 0 + '' + n1;
                let n2 = new Date(n).getMonth() + 1;
                    if (n2 < 10)
                        n2 = 0 + '' + n2;
                let n3 = new Date(n).getFullYear();
                let dataCompara = n3 + '' + n2 + '' + n1;
                console.log(dataCompara, dataFinal, dataInicial);

                if(dataCompara >= dataInicial && dataCompara <= dataFinal ){
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