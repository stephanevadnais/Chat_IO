var moment = require('moment');

var generationMessage = (de,texte)=>{

    return {
        de,
        texte,
        dateCreation: moment().valueOf()


    };
};


var generationLocalisation = (De,latitude,longitude)=>{
    return {

        De,
        url:`https://www.google.com/maps?q=${latitude},${longitude}`,
        dateCreation: moment().valueOf()
    };


};


var meteoLocale = (Celcius,HeureLocale)=>{

    return {
        Celcius,
        HeureLocale,
        dateCreation: new Date().getTime()


    };
};

module.exports = {generationMessage,generationLocalisation};