const chemin = require('path');
const http = require('http');
const cheminPublique =  chemin.join(__dirname, '../publique');
const port = process.env.PORT || 3000;
const express = require('express');
const socketIO = require('socket.io');
var app = express();
var serveur = http.createServer(app);
var io = socketIO(serveur);


app.use(express.static(cheminPublique));
io.on('connection',(socket)=>{
    console.log('Nouvel utilisateur Connecte');

    socket.on('disconnect',()=>{
        console.log('Utilisateur deconnecte')
    });

    socket.emit('nouveauMessage',{
        de:'Administration',
        texte:'Bienvenue sur le chat',
        dateCreation: new Date().getTime()
    });

    socket.broadcast.emit('nouveauMessage',{
        de:'Administration',
        texte:'Nouvel Utilisateur s est joint au groupe de discution',
        dateCreation: new Date().getTime()
    });


    socket.on('nouveauMessage', (nvmess)=>{
        console.log('Nouveau Message',nvmess);

        io.emit('nouveauMessage',{
            de:nvmess.de,
            texte:nvmess.texte,
            dateCreation: new Date().getTime()

        });

    });




})

serveur.listen(port,()=>{

    console.log(`Serveur en fonction sur le port  ${port}`)
})


