var validationChampsUtilisateur = function(champs){

    return typeof champs === 'string'  &&  champs.trim().length > 0;

};

module.exports = {validationChampsUtilisateur};