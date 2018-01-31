const yargs = require('yargs');
const geocode = require("./geocode/geocode");
const weather = require("./weather/weather")
//a66327bb38f7a02b623c7362b1daacf5
const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

function geocodeAddressCallback(errorMessage, results) {
    if (errorMessage) {
        console.log(errorMessage)
    } else {
        weather.getWeather(results, weatherCallback)
    }
}

function weatherCallback(errorMessage, results) {
    if (errorMessage) {
        console.log(errorMessage)
    } else {
        console.log(JSON.stringify(results, undefined, 4))
    }
}


geocode.geocodeAddress(argv, geocodeAddressCallback)



// const axios = require("axios");

// axios.get('https://api.darksky.net/forecast/a66327bb38f7a02b623c7362b1daacf5/24.8741704,67.0149788')
//     .then(({ data }) => {
//         console.log("----------------------")
//         console.log(data.currently)
//     })
//     .catch(error => {
//         console.log(error)
//     })