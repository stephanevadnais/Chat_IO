const request = require('request');

var geoLocalisation = (Endroit, fonctionRetour) => {
    var encodedAddress = encodeURIComponent(Endroit);

    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress},+CA&key=AIzaSyDWcVL1o5b246aKep4UXQNVyGUvk4MW9n4`,
        json: true
    }, (erreur, reponse, page) => {
        if (erreur) {
            fonctionRetour('Connection Impossible au Serveur Google.');
        } else if (page.status === 'ZERO_RESULTS') {
            fonctionRetour('Endroit Introuvable.');
        } else if (page.status === 'OK') {
            fonctionRetour(undefined, {
                Endroit: page.results[0].formatted_address,
                latitude: page.results[0].geometry.location.lat,
                longitude: page.results[0].geometry.location.lng,

            });
        }
    });
};

module.exports.geoLocalisation = geoLocalisation;