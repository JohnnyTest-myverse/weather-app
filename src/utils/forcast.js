const request = require('request');

const forecast = (lat,lon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ad0fd6643ef998bc5f1c90a95a97b2e6&query=' + lon +','+ lat + '&units=f';
    request({url:url, json:true}, (error, response)=> {
        if(error) {
            callback('Unable to connect to location services!', undefined)
        } else if(response.body.error) {
            callback('Unable to find Location, try another search', undefined)
        } else {
            callback(undefined,
                response.body.location.name + ' is currently ' + response.body.current.temperature + ' degrees out. There is ' + response.body.current.precip + '% chance of rain.')
        }
    })
}

module.exports= forecast;