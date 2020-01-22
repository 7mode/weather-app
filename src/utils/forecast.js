const request = require('request')

forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/4e2d5ae5bbb9191e2a6b67d790777286/' + latitude + ',' + longitude

    request({ url, json: true },(error, { body }) => {
        if (error) {
            callback('Unable connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const weatherData = body.daily.data[0];
            const weatherSummary = weatherData.summary;
            const temperature = body.currently.temperature;
            const temperatureHigh = weatherData.temperatureHigh;
            const temperatureLow = weatherData.temperatureLow;
            callback(undefined, weatherSummary + ' It is currently ' +  temperature + ' degrees out. This high today is ' + temperatureHigh +' with a low of ' + temperatureLow)
        }
    })
}

module.exports = forecast