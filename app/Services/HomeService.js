import {db, auth, storage} from '../firebaseConfig';

export default{

    somaTotal(){
        var somaTotal = 0;
        db.ref(`usuarios/${auth.currentUser.uid}/registros/`)
            .on('value', function (snapshot){
               snapshot.forEach(function(item){
                   if(item.val().tipo == '2'){
                       somaTotal -= JSON.parse(item.val().valor);
                   }else{
                       somaTotal += JSON.parse(item.val().valor);
                   }
                });
            console.log(somaTotal);
        });
    },

    somaCarteira(){
        var somaCt = 0;
        db.ref(`usuarios/${auth.currentUser.uid}/registros/`)
            .on('value', function (snapshot){
               snapshot.forEach(function(item){
                   if(item.val().tipo == '2' && item.val().destino == '2'){
                       somaCt -= JSON.parse(item.val().valor);
                   }else if(item.val().tipo != '2' && item.val().destino == '2'){
                       somaCt += JSON.parse(item.val().valor);
                   }
                });
                console.log(somaCt);
        });
    },

    somaConta(){
        var somaC = 0;
        db.ref(`usuarios/${auth.currentUser.uid}/registros/`)
            .on('value', function (snapshot){
               snapshot.forEach(function(item){
                   if(item.val().tipo == '2' && item.val().destino == '1'){
                       somaC -= JSON.parse(item.val().valor);
                   }else if(item.val().tipo != '2' && item.val().destino == '1'){
                       somaC += JSON.parse(item.val().valor);
                   }
                });
                console.log(somaC);
        });
    },
}
