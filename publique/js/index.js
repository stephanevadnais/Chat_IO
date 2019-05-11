
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


var geo = jQuery('#envoie-geolocalisation');

geo.on('click',function(){
    if(!navigator.geolocation){
        return alert('GeoLocation pas supporter');
    }

    navigator.geolocation.getCurrentPosition(function(position){
        socket.emit('partageGeoLocation',{
                     lat:position.coords.latitude,
                     long:position.coords.longitude
        });

    }),function(){

        alert('Probleme de permission')
    }

});


socket.on('partageGeoLocation',function(geoLocation){

    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">Ma Position Geographique</a>');

    li.text(`${geoLocation.De}:`);
    a.attr('href',geoLocation.url);
    li.append(a);

    jQuery('#messages').append(li);


});




socket.on('meteoLocale',function(meteo){

    var h3 = jQuery('<h3></h3>');


    h3.text(`Aujourdhui ${meteo.HeureLocale}, il fait présentenent ${meteo.Celcius} ‎°C`);

    h3.append(h3);

    jQuery('#meteo').append(h3);

    console.log(meteo);


});




















