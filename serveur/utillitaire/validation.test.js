const expect = require('expect');

const {validationChampsUtilisateur} = require('../utillitaire/valide');


describe('Valeur approuvées', ()=>{

    it('devais retourner faux, valeur entrer est un nombre',()=>{

        var resultat = validationChampsUtilisateur(68);
        expect(resultat).toBe(false);

    });

    it('devrais retourner vrai avec les espace enlever',()=>{

        var resultat = validationChampsUtilisateur('   Vladsteak   ');
        expect(resultat).toBe(true);

    });

    it('devrais retourner faux si seulement des espace sont inséré',()=>{

        var resultat = validationChampsUtilisateur('    ');
        expect(resultat).toBe(false);
    })

})