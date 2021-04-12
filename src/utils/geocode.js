const request = require('request');

const geoCode = (address, callback) => {
    const geoURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?types=address&access_token=pk.eyJ1IjoiamFzazExNDkiLCJhIjoiY2tuOXYwaW9jMGE1ejJ3bzA1N2M2ZWNpYyJ9.ydYK2W8C1OC4eDRNS89Wcw&limit=1';

    request({url:geoURL, json:true}, (error, response)=> {
        if(error) {
            callback('Unable to connect to location services!', undefined)
        } else if(response.body.features.length === 0) {
            callback('Unable to find Location, try another search', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports= geoCode;