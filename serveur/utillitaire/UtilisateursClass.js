var _ = require('lodash');



class Utilisateurs {

    constructor(){

        this.utilisateurTableaux = [];
    }

    ajoutUtilisateur (id,speudo,sujet) {
    var utilisateur = {id,speudo,sujet};
    this.utilisateurTableaux.push(utilisateur);
    return utilisateur;

}

    enleverUtilisateur (id){

      var utilisateurID = this.rechercheUtilisateurSpeudo(id);

      if(utilisateurID){

          this.utilisateurTableaux = this.utilisateurTableaux.filter((utilisateur) => utilisateur.id !== id);

      }

      return utilisateurID;

    }

    rechercheUtilisateurSpeudo (id){

        return this.utilisateurTableaux.filter((utilisateur)=> utilisateur.id === id)[0]

    }

    rechercheListeUtilisateurSujet (sujet){

    var utilisateurTableaux = this.utilisateurTableaux.filter((utilisateur) => {
        return utilisateur.sujet === sujet;




    });

    var nommageSujetTableaux = utilisateurTableaux.map((utilisateur)=> {
        return utilisateur.speudo

    });

     return nommageSujetTableaux;

     }

}

module.exports = {Utilisateurs};