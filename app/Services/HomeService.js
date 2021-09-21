import {db, auth, storage} from '../firebaseConfig';

export default{

    somaTotal(callback){
        var somaTotal = 0;
        db.ref(`usuarios/${auth.currentUser.uid}/registros/`)
            .on('value', function (snapshot){
               snapshot.forEach(function(item){
                   if(item.val().tipo == '2'){
                       somaTotal -= parseInt(item.val().valor);
                   }else if(item.val().tipo == '1'){
                       somaTotal += parseInt(item.val().valor);
                   }
                });
                callback(somaTotal);
                somaTotal = 0;
        });
    },

    somaCarteira(callback){
        var somaCt = 0;
        db.ref(`usuarios/${auth.currentUser.uid}/registros/`)
            .on('value', function (snapshot){
               snapshot.forEach(function(item){
                    if(item.val().tipo == '2' && item.val().destino == '2'){
                       somaCt -= parseInt(item.val().valor);
                    }else if(item.val().tipo == '1' && item.val().destino == '2'){
                       somaCt += parseInt(item.val().valor);
                    }else if(item.val().tipo == '3' && item.val().destino == '2'){
                        somaCt += parseInt(item.val().valor);
                    }else if(item.val().tipo == '3' && item.val().destino == '1'){
                        somaCt -= parseInt(item.val().valor);
                    }
                });
                callback(somaCt);
                somaCt=0;
        });
    },

    somaConta(callback){
        var somaC = 0;
        db.ref(`usuarios/${auth.currentUser.uid}/registros/`)
            .on('value', function (snapshot){
               snapshot.forEach(function(item){
                    if(item.val().tipo == '2' && item.val().destino == '1'){
                       somaC -= parseInt(item.val().valor);
                    }else if(item.val().tipo == '1' && item.val().destino == '1'){
                       somaC += parseInt(item.val().valor);
                    }else if(item.val().tipo == '3' && item.val().destino == '1'){
                        somaC += parseInt(item.val().valor);
                    }else if(item.val().tipo == '3' && item.val().destino == '2'){
                        somaC -= parseInt(item.val().valor);
                    }
                });
                callback(somaC);
                somaC = 0;
        });
    },
    
    somaReceitas(callback){
        var d = new Date();
        var n = d.getMonth() + 1;
        var somaR = 0;
        db.ref(`usuarios/${auth.currentUser.uid}/registros/`)
            .on('value', function (snapshot){
               snapshot.forEach(function(item){
                  let x =  Date.parse(item.val().data);
                  let y = new Date(x).getMonth() + 1;
                   if(item.val().tipo == '1' && y == n)
                       somaR += parseInt(item.val().valor);
                });
                callback(somaR);
                somaR = 0;
        });
    },

    somaDespesas(callback){
        var d = new Date();
        var n = d.getMonth() + 1;
        var somaR = 0;
        db.ref(`usuarios/${auth.currentUser.uid}/registros/`)
            .on('value', function (snapshot){
               snapshot.forEach(function(item){
                  let x =  Date.parse(item.val().data);
                  let y = new Date(x).getMonth() + 1;
                   if(item.val().tipo == '2' && y == n)
                       somaR += parseInt(item.val().valor);
                });
                callback(somaR);
                somaR = 0;
        });
    },
}
