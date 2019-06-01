var moment = require('moment');

var generationMessage = (de, texte) => {

    return {
        de,
        texte,
        dateCreation: moment().valueOf()


    };
};


var generationLocalisation = (de, latitude, longitude) => {
    return {

        de,
        url: `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`



    };


};


var generationMeteoLocale = (de,celcius,fahrenheit,pression) => {
    return {
        de,
        celcius:`${celcius}`,
        fahrenheit: `${fahrenheit}`,
        pression: `${pression}`

    };


};





module.exports = {generationMessage, generationLocalisation,generationMeteoLocale};