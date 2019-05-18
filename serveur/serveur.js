const request = require('request');
const chemin = require('path');
const http = require('http');
const cheminPublique =  chemin.join(__dirname, '../publique');
const {generationMessage,generationLocalisation} = require('./utillitaire/message');
const port = process.env.PORT || 3000;
const express = require('express');
const socketIO = require('socket.io');
let date = require('date-and-time');
var moment = require('moment');
var app = express();
var serveur = http.createServer(app);
var io = socketIO(serveur);
var obtenirTemperature = (latitude, longitude)=> {

    request({
        url: `https://api.darksky.net/forecast/b82d8a6f2d1d5d720ef2e24c89cededa/${latitude},${longitude}`,
        json:true
    },(erreur, reponse, page)=> {
        if (erreur){

            console.log('Connection Impossible Au Serveur DarkSky');
        }
        else if (reponse.statusCode === 403){

            console.log('Page Non Autorisé');
        }

        else if (reponse.statusCode === 200){

            let maintenant = new Date();
            date.locale('fr');
            var dateFormater = date.format(maintenant, 'dddd D MMMM');


             let now = new Date();
             var heureFormater = date.format(now, 'HH:mm:ss A');



            //32,13 °F − 32) × 5/9 = 0 °C
            var Fahrenheit = page.currently.temperature ;
            var Celcius = ((Fahrenheit - 32) * (5/9)).toFixed(1) ;
            var url = `https://www.google.com/maps?q=${latitude},${longitude}`;

            if ((page.daily.icon) === "snow"){
                console.log("Il Y'aura accumulation de neige aujourd'hui " + ((page.daily.data[0].precipAccumulation) / 0.39370078740157).toFixed(2) + " cm ");

            };

            console.log(url);



            // console.log(`Il Fait Maintenant ${Celcius} °C`);
            // console.log(`Heure Locale est ${HeureFormatter}`);

            io.emit('meteoLocale',{

                Celcius: `${Celcius}`,
                url: `${url}`,
                dateLocale:`${dateFormater}`,
                heureLocale:`${heureFormater}`

            });





        }





    });




}

app.use(express.static(cheminPublique));
io.on('connection',(socket)=>{

    console.log('Nouvel utilisateur Connecte');

    socket.on('disconnect',()=>{
        console.log('Utilisateur deconnecte')
    });

    socket.emit('nouveauMessage',generationMessage('Administrateur','Bienvenue sur le chat'));

    socket.broadcast.emit('nouveauMessage',generationMessage('Administration','Nouvel Utilisateur s est joint au groupe de discution'));

    socket.on('nouveauMessage', (nvmess,fonctionRetour)=>{
        console.log('Nouveau Message',nvmess);

        io.emit('nouveauMessage',generationMessage(nvmess.de,nvmess.texte));
        fonctionRetour();

    });

    socket.on('partageGeoLocation',(coordonnees)=>{


        io.emit('nouveauMessage',generationMessage('Coordonnees',`${coordonnees.lat},${coordonnees.long}`));
        io.emit('partageGeoLocation',generationLocalisation('Administrateur',coordonnees.lat,coordonnees.long));


        obtenirTemperature(coordonnees.lat,coordonnees.long);







        // let timerId = setTimeout(function tick() {
        //     obtenirTemperature(coordonnees.lat,coordonnees.long);
        //     timerId = setTimeout(tick, 6000);
        // }, 6000);

    });

});


serveur.listen(port,()=>{

    console.log(`Serveur en fonction sur le port  ${port}`)
})


