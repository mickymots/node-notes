const request = require('request')
const yargs = require('yargs')
const geocoder = require('./geocoder/geocoder')
//const weather = require('weather')


const address = '174 rothbury terrace'

const getWeatherData = (geocodedAddress) => {
    const url = `https://api.darksky.net/forecast/7cccb5665bd6bd19a2fa4247738167d8/${geocodedAddress.lat},${geocodedAddress.lng}`

    const weatherData = new Promise((resolve, reject) => {

        request(url, function (error, response, body) {
            const result = JSON.parse(body)

            if (error) {
                reject('Unable to contact forecast services') // Print the error if one occurred
            } else if (result.status === 'ZERO_RESULTS') {
                reject('Unable to find current weather for given location')
            } else {
                // const weatherObj = { current: result.currently , "timezone":result.timezone}
                resolve(result)
            }
        })

    })

    return weatherData
}

//function marked with async await
const getCurrentWeather = async (address) => {
    const geocodedAddress = await geocoder.getGeocodedAddeess(address)
    const currentWeatherData = await getWeatherData(geocodedAddress)
    return currentWeatherData
}

//function with promise chain
const getCurrentWeatherPromiseWay = (addressString) => {
    const geocodedAddress = geocoder.getGeocodedAddeess(addressString)

    const weatherData = geocodedAddress.then(address => {
        return getWeatherData(address).then(weatherData => {
            return weatherData.currently
        })
    })

    return weatherData
}


//Called function with promise chain 
getCurrentWeatherPromiseWay(address).then(data => {
    console.log(data)
}).catch(error => {
    console.log(" ERROR" + error)
})

//Called function with async await
getCurrentWeather(address).then(data => {
    console.log('\n------------------------\n')
    console.log(data.currently)
}, error => {
    console.log(error)
})