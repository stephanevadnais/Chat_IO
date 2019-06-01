
// process.env.DARK_SKY
const DarkSky = require('dark-sky');
const darksky = new DarkSky('b82d8a6f2d1d5d720ef2e24c89cededa');


darksky
    .coordinates({lat: 37.8267, lng: -122.423})
    .units('ca')
    .language('fr')
    .get()
    .then(console.log())
    .catch(console.log)


