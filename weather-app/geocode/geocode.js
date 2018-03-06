const request = require('request')
const forecast = require('../forecast/forecast')



const geocodeAddress = (address, callback) => {
    const encodeAddress = encodeURIComponent(address)
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}&key=AIzaSyDPzKqoOTB5ItN-Aqj0aiSdbkbwnLLs3XY`

    request(url, function (error, response, body) {
        const result = JSON.parse(body);

        if (error) {
            callback('Unable to contact google services'); // Print the error if one occurred
        } else if (result.status === 'ZERO_RESULTS') {
            callback('No Address Found');
        } else {
            const obj = {
                lat: result.results[0].geometry.location.lat,
                lng: result.results[0].geometry.location.lng
            }
            callback(undefined, obj)
        }
    });


}

const checkMain = () =>{
    console.log('main file = ' + require.main.filename)
    console.log('main file = ' + __filename)
}

module.exports = {
    geocodeAddress,
    checkMain

}