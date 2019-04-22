const chemin = require('path');
const cheminPublique =  chemin.join(__dirname, '../publique');
const port = process.env.PORT || 3000
const express = require('express');
var app = express();


app.use(express.static(cheminPublique));

app.listen(port,()=>{

    console.log(`Serveur en fonction sur le port  ${port}`)
})


