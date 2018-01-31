const axios = require("axios");

function getWeather({ lat, lng }, callback) {
    axios.get(`https://api.darksky.net/forecast/a66327bb38f7a02b623c7362b1daacf5/${lat},${lng}`)
        .then(({ data }) => {
            let { temperature, apparentTemperature } = data.currently;
            callback(undefined, {
                temperature,
                apparentTemperature
            })
        })
        .catch(error => {
            callback(error)
        })
}

exports.getWeather = getWeather;