var expect = require('expect');

var {generationMessage,generationLocalisation} = require('./message');


describe('Generation Message',()=>{


    it('devrais generer la mise en forme correct du message',()=>{

        var de = 'test';
        var texte = 'message test';
        var message = generationMessage(de,texte);

        expect(message.dateCreation).toBeA('number');
        expect(message).toInclude({de, texte});

    })
})


describe('generationEndroit',()=>{


    it('devrais retourner endroit sur map google',()=>{
        var De = 'Vlad';
        var latitude = 25;
        var longitude = 20;
        var url = 'https://www.google.com/maps?q=25,20';
        var message = generationLocalisation(De,latitude,longitude);

        expect(message.dateCreation).toBeA('number');
        expect(message).toInclude({De, url});



        }
    )
})




