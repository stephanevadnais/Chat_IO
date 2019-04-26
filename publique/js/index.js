
var socket = io();
socket.on('connect',function(){
    console.log('Connection etablie sur le serveur');

});

socket.on('disconnect',function(){

    console.log('Vous etes deconnecte du serveur');
});

socket.on('nouveauMessage',function(message){

    console.log('De nouveau message on ete envoye',message);
});


