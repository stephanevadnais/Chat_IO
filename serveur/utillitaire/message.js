var generationMessage = (de,texte)=>{

    return {
        de,
        texte,
        dateCreation: new Date().getTime()


    };
};


var generationLocalisation = (De,latitude,longitude)=>{
    return {

        De,
        url:`https://www.google.com/maps?q=${latitude},${longitude}`,
        dateCreation: new Date().getTime()
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