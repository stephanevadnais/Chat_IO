var generationMessage = (de,texte)=>{

    return {
        de,
        texte,
        dateCreation: new Date().getTime()


    };
};

module.exports = {generationMessage};