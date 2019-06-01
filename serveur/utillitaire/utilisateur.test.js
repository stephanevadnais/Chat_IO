const expect = require('expect');
const {Utilisateurs} = require('./UtilisateursClass');

describe('Class Utilisateur',()=>{
    var utilisateurs;

    beforeEach(()=>{
        utilisateurs = new Utilisateurs();
        utilisateurs.utilisateurTableaux = [{
            id:'1',
            speudo:'Mike',
            sujet: 'React'
        }, {
            id:'2',
            speudo:'Eric',
            sujet: 'Java'
        }, {
            id:'3',
            speudo:'Luc',
            sujet: 'React'
        }

        ]
    });



    it('devrais retourner un nouvel utilisateur',()=>{

        var utilisateurs = new Utilisateurs();
        var utilisateur = {
            id: '123',
            speudo: 'Vladsteak',
            sujet: 'nodejs'
        };


        var resultat = utilisateurs.ajoutUtilisateur(utilisateur.id,utilisateur.speudo,utilisateur.sujet);
        expect(utilisateurs.utilisateurTableaux).toEqual([utilisateur]);


    })


    it('devrais retourner les utilisateurs  pour le sujet React', ()=>{

       var utilisateurListe = utilisateurs.rechercheListeUtilisateurSujet('React');
       console.log(utilisateurListe);

       expect(utilisateurListe).toEqual(['Mike','Luc']);
    });

    it('devrais retourner les utilisateurs  pour le sujet Java', ()=>{

        var utilisateurListe = utilisateurs.rechercheListeUtilisateurSujet('Java');

        expect(utilisateurListe).toEqual(['Eric']);
    });

    it('devrais trouver un speudo utilisateur avec son id',()=>{

        var speudoID = '2';
        var utilisateur = utilisateurs.rechercheUtilisateur(speudoID);
        expect(utilisateur.id).toBe(speudoID);

    });

    it('devrais pas trouver un speudo non existant avec son id',()=>{

        var speudoID = '99';
        var utilisateur = utilisateurs.rechercheUtilisateur(speudoID);
        expect(utilisateur).toNotExist();
    });

    it('devrais enlever utilisateur dont son id est passe en argument',()=>{

        var speudoID = '3';
        var utilisateurID =  utilisateurs.enleverUtilisateur(speudoID);

        var redefiniTableaux = utilisateurs.utilisateurTableaux;

        expect(utilisateurID.id).toBe(speudoID);
        expect(utilisateurs.utilisateurTableaux.length).toBe(2);
        console.log(redefiniTableaux);
    })

    it ('ne devrais pas enlever un utilisateur dont id est invalide',()=>{

        var speudoID = '99';
        var utilisateurID =  utilisateurs.enleverUtilisateur(speudoID);

        expect(utilisateurs.id).toNotExist();
        expect(utilisateurs.utilisateurTableaux.length).toBe(3)

    })





})