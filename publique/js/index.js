
var socket = io();
socket.on('connect',function(){
    console.log('Connection etablie sur le serveur');

});

socket.on('disconnect',function(){

    console.log('Vous etes deconnecte du serveur');
});

socket.on('nouveauMessage',function(message){

    console.log('De nouveau message on ete envoye',message);
    var heureFormater = moment(message.dateCreation).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        De: message.de,
        texte: message.texte,
        heure: heureFormater
    });

    jQuery('#messages').append(html);

    // var heureFormater = moment(message.dateCreation).format('h:mm a');
    // var li = jQuery('<li></li>');
    //
    // li.text(`De: ${message.de}  ---  Heure: ${heureFormater}  ---  Message: ${message.texte}`);
    //
    // jQuery('#messages').append(li);

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

    var messageBoite = jQuery('[name=message]');

    socket.emit('nouveauMessage',{
        de:'Utilisateur',
        texte:messageBoite.val()

    },function(){
        messageBoite.val("");
        })


});


var geo = jQuery('#envoie-geolocalisation');

geo.on('click',function(){
    if(!navigator.geolocation){
        return alert('GeoLocation pas supporter');
    }



    navigator.geolocation.getCurrentPosition(function(position){
        geo.attr('disabled', 'disabled').text("envoie de voter position....");
        socket.emit('partageGeoLocation',{
                     lat:position.coords.latitude,
                     long:position.coords.longitude
        });

    }),function(){

        alert('Probleme de permission')
    }

});



socket.on('meteoLocale',function(meteo){

    var template = jQuery('#geolocalisation-template').html();
    var html = Mustache.render(template, {
        celcius: meteo.Celcius,
        url: meteo.url,
        date:meteo.dateLocale,
        heure:meteo.heureLocale

    });


    jQuery('#messages').append(html);


    // var h3 = jQuery('<h3></h3>');
    // h3.text(`Aujourdhui ${meteo.heureDateFormater}, il fait présentenent ${meteo.Celcius} ‎°C `);
    // h3.append(h3);
    //
    // jQuery('#meteo').append(h3);
    //
    //
    //
    // console.log(meteo);


});




















