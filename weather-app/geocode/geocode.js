const axios = require("axios")

exports.geocodeAddress = function ({ address }, callback) {
    const encodeAddress = encodeURIComponent(address)

    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}`)
        .then((res) => {
            let { status, results } = res.data;
            if (status === 'ZERO_RESULTS') {
                callback("Unable to find that address");
            } else if (status === 'OK') {
                let result = results[0];
                callback(undefined, {
                    address: result.formatted_address,
                    lat: result.geometry.location.lat,
                    lng: result.geometry.location.lng
                })
            }
        })
        .catch((er) => {
            callback(er);
        })
}
