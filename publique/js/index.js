
var socket = io();
socket.on('connect',function(){
    console.log('Connection etablie sur le serveur');

});

socket.on('disconnect',function(){

    console.log('Vous etes deconnecte du serveur');
});

socket.on('nouveauMessage',function(message){

    console.log('De nouveau message on ete envoye',message);
    var li = jQuery('<li></li>');
    li.text(`${message.de}: ${message.texte}`);

    jQuery('#messages').append(li);
});

socket.emit('creationAccuseReception',
    {
        utilisateur:'ok',
        texte:'Bien recu'
    },
    function(data){
        console.log('Envoie',data);
    });

jQuery('#formulaire-message').on('submit',function(e){
    e.preventDefault();

    socket.emit('nouveauMessage',{
        de:'Formulaire',
        texte:jQuery('[name=message]').val()

    },function(){


    })

});



