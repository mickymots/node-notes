const request = require('request')

const getGeocodedAddeess = address => {
  const encodedAddress = encodeURIComponent(address)

  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyDPzKqoOTB5ItN-Aqj0aiSdbkbwnLLs3XY`

  const addressGeocode = new Promise((resolve, reject) => {
    request.get(url, (error, response, body) => {
      if (error) {
        reject('error in connecting google api')
      } else if (response.status == 'ZERO_RESULTS') {
        reject('No Address record found')
      } else {
        const result = JSON.parse(body)
        const geocode = {
          lat: result.results[0].geometry.location.lat,
          lng: result.results[0].geometry.location.lng
        }
        resolve(geocode)
      }
    })
  })

  return addressGeocode
}


module.exports = {
  getGeocodedAddeess
}