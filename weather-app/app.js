const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./forecast/forecast')

const argv = yargs
    .command('address', 'Geocode an address', {
        address: {
            alias: 'a',
            default: '174 Rothbury Terrace, NE65DD UK',
            demand: true
        }
    })
    .help().argv;


//console.log(argv.a)
geocode.geocodeAddress(argv.a, (errorMessage, result) => {
    if (errorMessage) {
        console.log(errorMessage)
    } else {
        console.log(JSON.stringify(result, undefined, 2))
        weather.getCurrentWeather(result, (errorMessage, result) => {
            if (errorMessage) {
                console.log(errorMessage)
            }else{
                console.log(`it's currently ${result.currently.temperature}F. it feels like ${result.currently.apparentTemperature}F`)
          
                console.log(`it's currently ${fToC(result.currently.temperature)}. it feels like ${fToC(result.currently.apparentTemperature)}`)
            }
        })
    }
})


const fToC = (fTemp) => Math.round((fTemp - 32)*5/9) 