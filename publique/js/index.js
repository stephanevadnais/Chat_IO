
var socket = io();
socket.on('connect',function(){
    console.log('Connection etablie sur le serveur');

});

socket.on('disconnect',function(){

    console.log('Vous etes deconnecte du serveur');
});

socket.on('nouveauMessage',function(message){

    console.log('Votre message a ete envoye au serveur',message);
});


