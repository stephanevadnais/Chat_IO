const request = require('request');
const chemin = require('path');
const http = require('http');
const cheminPublique = chemin.join(__dirname, '../publique');
const {generationMessage, generationLocalisation,generationMeteoLocale} = require('./utillitaire/message');
const {validationChampsUtilisateur} = require('./utillitaire/valide');
const {Utilisateurs} = require('./utillitaire/UtilisateursClass');
const port = process.env.PORT || 3000;
const express = require('express');
const socketIO = require('socket.io');
var utilisateurs = new Utilisateurs();
var {obtenirTemperature} = require('./utillitaire/MeteoDarkSky')

let date = require('date-and-time');
var moment = require('moment');
var app = express();
var serveur = http.createServer(app);
var io = socketIO(serveur);



app.use(express.static(cheminPublique));
io.on('connection', (socket) => {

    console.log('Nouvel utilisateur Connecte');

    socket.on('disconnect', () => {

        var utilisateur = utilisateurs.enleverUtilisateur(socket.id);


        if(utilisateur){
            io.to(utilisateur.sujet).emit('miseAjourListe',utilisateurs.rechercheListeUtilisateurSujet(utilisateur.sujet));
            io.to(utilisateur.sujet).emit('nouveauMessage',generationMessage('Administrateur', `${utilisateur.speudo} ne fait plus partie du groupe de discussion`))
        }

        console.log('Utilisateur deconnecte');
    });


    socket.on('rejoindre', (parametres, fonctionRetour) => {
        if (!validationChampsUtilisateur(parametres.speudo) || !validationChampsUtilisateur(parametres.sujet)) {

            return fonctionRetour('Votre Speudo et le Sujet est requis');
        }

        socket.join(parametres.sujet);
        utilisateurs.enleverUtilisateur(socket.id);
        utilisateurs.ajoutUtilisateur(socket.id,parametres.speudo,parametres.sujet);

        io.to(parametres.sujet).emit('miseAjourListe',utilisateurs.rechercheListeUtilisateurSujet(parametres.sujet));
        socket.emit('nouveauMessage', generationMessage('Administrateur', 'Bienvenue sur le chat'));
        socket.broadcast.to(parametres.sujet).emit('nouveauMessage', generationMessage('Administration', `${parametres.speudo} ce joint au groupe de discution`));
        fonctionRetour()

    });

    socket.on('nouveauMessage', (nvmess, fonctionRetour) => {

        var speudo = utilisateurs.rechercheUtilisateurSpeudo(socket.id);



        if(speudo && validationChampsUtilisateur(nvmess.texte)){
            console.log('Nouveau Message', nvmess);
            io.to(speudo.sujet).emit('nouveauMessage', generationMessage(speudo.speudo, nvmess.texte));

        }


        fonctionRetour();

    });

    socket.on('partageGeoLocation', (coordonnees) => {
        var capture = obtenirTemperature(coordonnees.lat, coordonnees.long);
        var celcius = capture.celcius;
        var fahrenheit = capture.fahrenheit;
        var pression = capture.pression;

        var utilisateur = utilisateurs.rechercheUtilisateurSpeudo(socket.id);

        if(utilisateur){

            io.to(utilisateur.sujet).emit('partageLocalisation',generationLocalisation(`${utilisateur.speudo}`,`${coordonnees.lat}`,`${coordonnees.long}`));
            io.to(utilisateur.sujet).emit('meteoLocale',generationMeteoLocale(`${utilisateur.speudo}`,celcius,fahrenheit,pression));
        }


        // io.emit('nouveauMessage', generationMessage('Coordonnees', `${coordonnees.lat},${coordonnees.long}`));
        // io.emit('partageGeoLocation', generationLocalisation('Administrateur', coordonnees.lat, coordonnees.long));



        // let timerId = setTimeout(function tick() {
        //     obtenirTemperature(coordonnees.lat,coordonnees.long);
        //     timerId = setTimeout(tick, 6000);
        // }, 6000);

    });




});


serveur.listen(port, () => {

    console.log(`Serveur en fonction sur le port  ${port}`)
})


