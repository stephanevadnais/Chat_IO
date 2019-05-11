const yargs = require('yargs');

const Geo = require('./GoogleRequestApi_v1');

const Meteo = require('./MeteoDarkSky')


const argv = yargs
    .options({
     a: {
         demand: true,
         alias: 'Endroit',
         describe: 'Endroit à trouver',
         string:true
     }
     })
.help()
.alias('help', 'h')
.argv;


Geo.geoLocalisation(argv.Endroit, (erreurMessage, resultats)=>{

    if (erreurMessage){
        console.log(erreurMessage);
    }else {
        // console.log(JSON.stringify(resultats,undefined,2));
        console.log(resultats.Endroit);
        Meteo.obtenirTemperature(resultats.latitude,resultats.longitude);
    }
});




