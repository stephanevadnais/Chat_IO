const request = require('request');
var tableauResultat = [];

var obtenirTemperature = (latitude, longitude)=> {


    request({
            url: `https://api.darksky.net/forecast/b82d8a6f2d1d5d720ef2e24c89cededa/${latitude},${longitude}?lang=fr`,
            json: true
        }, (erreur, reponse, page) => {
            if (erreur) {

                console.log('Connection Impossible Au Serveur DarkSky');
            }
            else if (reponse.statusCode === 403) {

                console.log('Page Non Autorisé');
            }

            else if (reponse.statusCode === 200) {


                //32,13 °F − 32) × 5/9 = 0 °C
                var pression = page.currently.pressure;
                var Fahrenheit = page.currently.temperature;
                var Celcius = ((Fahrenheit - 32) * (5 / 9)).toFixed(1);

                if ((page.daily.icon) === "snow") {
                    console.log("Il Y'aura accumulation de neige aujourd'hui " + ((page.daily.data[0].precipAccumulation) / 0.39370078740157).toFixed(2) + " cm ");

                }
                ;

                // console.log(`Il Fait Maintenant ${Celcius} °C`);


                tableauResultat.push(Celcius);
                tableauResultat.push(Fahrenheit);
                tableauResultat.push(pression);




            }







        });

    return {

        celcius: `${tableauResultat[0]}`,
        fahrenheit:`${tableauResultat[1]}`,
        pression:`${tableauResultat[2]}`,


    }







}






module.exports = {obtenirTemperature};

