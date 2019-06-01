var socket = io();



function defillementMessage() {

    var conteneur = jQuery('#messages');
    var nouveauMessages = conteneur.children('li:last-child'); //nouvelle partie qui apparaît
    var conteneurVisible = conteneur.prop('clientHeight');//partie visible de l'utilisateur
    var conteneurHaut = conteneur.prop('scrollTop'); // partie du haut qui peut être disparue
    var conteneurHauteur = conteneur.prop('scrollHeight'); // hauteur totale
    var nouveauMessageHauteur = nouveauMessages.innerHeight();//calcul de la hauteur du message
    var dernierMessageHauteur = nouveauMessages.prev().innerHeight();

    if (conteneurVisible + conteneurHaut + nouveauMessageHauteur + dernierMessageHauteur >= conteneurHauteur) {
        // console.log('devrais défiller');
        // console.log(`partie du haut : ${conteneurHaut}px -- partie Visible : ${conteneurVisible}px -- nouveau message : ${nouveauMessageHauteur}px conteneur hauteur totale ${conteneurHauteur}px`);
        conteneur.scrollTop(conteneurHauteur);


    }
}

socket.on('connect', function () {
    console.log('Connection etablie sur le serveur');
    var parametres = jQuery.deparam(window.location.search);

    socket.emit('rejoindre', parametres, function(erreur){

        if (erreur){
            alert(erreur);
            window.location.href = '/'

        } else {
            console.log('parametres acceptes');

        }

    })
});

socket.on('disconnect', function () {

    console.log('Vous etes deconnecte du serveur');
});


socket.on('miseAjourListe',function(utilisateurTableaux){

    console.log('Liste Utilisateur',utilisateurTableaux);

    var ol = jQuery('<ol></o>');

    utilisateurTableaux.forEach(function(utilisateur){

        ol.append(jQuery('<li></li>').text(utilisateur))
    });

    jQuery('#utilisateurs').html(ol);


})

socket.on('nouveauMessage', function (message) {

    console.log('De nouveau message on ete envoye', message);

    var heureFormater = moment(message.dateCreation).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        De:message.de,
        texte: message.texte,
        heure: heureFormater
    });

    jQuery('#messages').append(html);
    defillementMessage();

    // var heureFormater = moment(message.dateCreation).format('h:mm a');
    // var li = jQuery('<li></li>');
    //
    // li.text(`De: ${message.de}  ---  Heure: ${heureFormater}  ---  Message: ${message.texte}`);
    //
    // jQuery('#messages').append(li);

});



jQuery('#formulaire-message').on('submit', function (e) {
    e.preventDefault();

    var messageBoite = jQuery('[name=message]');

    socket.emit('nouveauMessage', {

        texte: messageBoite.val()

    }, function () {
        messageBoite.val("");
    })


});


var geo = jQuery('#envoie-geolocalisation');

geo.on('click', function () {
    if (!navigator.geolocation) {
        return alert('GeoLocation pas supporter');
    }


    navigator.geolocation.getCurrentPosition(function (position) {
        geo.attr('disabled', 'disabled').text("envoie de voter position....");
        socket.emit('partageGeoLocation', {
            lat: position.coords.latitude,
            long: position.coords.longitude

        });


    }), function () {

        alert('Probleme de permission')
    }

});


socket.on('partageLocalisation', function (localisation) {

    var template = jQuery('#geolocalisation-template').html();
    var html = Mustache.render(template, {

        de: localisation.de,
        url: localisation.url

    });


    jQuery('#messages').append(html);
    defillementMessage()


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


socket.on('meteoLocale', function (meteo) {

    var template = jQuery('#meteo-template').html();
    var html = Mustache.render(template, {
        de:meteo.de,
        celcius: meteo.celcius,
        fahrenheit:meteo.fahrenheit,
        pression:meteo.pression

    });


    jQuery('#messages').append(html);
    defillementMessage()



});




















