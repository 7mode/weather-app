const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiN21vZGUiLCJhIjoiY2s1MGt3Z3MwMGlpYjNlbWllbHB4ZmMwbyJ9.V7RJjuMHVfVTG5yUUbWL_w&limit=1'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search!', undefined)
        } else {
            const longitude = body.features[0].center[0];
            const latitude = body.features[0].center[1];
            callback(undefined, {
                longitude,
                latitude,
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode