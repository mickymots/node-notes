const request = require('request')

//https://api.darksky.net/forecast/7cccb5665bd6bd19a2fa4247738167d8/37.8267,-122.4233

const getCurrentWeather = (addressObject, callback) =>{
    const url = `https://api.darksky.net/forecast/7cccb5665bd6bd19a2fa4247738167d8/${addressObject.lat},${addressObject.lng}`

    request(url, function(error, response, body) {
      const result = JSON.parse(body)

      if (error) {
        callback('Unable to contact forecast services') // Print the error if one occurred
      } else if (result.status === 'ZERO_RESULTS') {
        callback('Unable to find current weather for given location')
      } else {
        // const weatherObj = { current: result.currently , "timezone":result.timezone}
        callback(undefined, result)
      }
    })


  }

module.exports = {
  getCurrentWeather
}