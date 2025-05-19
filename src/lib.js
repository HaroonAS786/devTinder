//testing numbers
module.exports.absolute = function (number) {
    return number >= 0 ? number : -number
    // if (number > 0) return number;
    // if (number < 0) return -number;
    // return 0
}

// Testing strings
module.exports.greet = function (name) {
    return `Hello ${name}`
}

// Testing arrays
module.exports.getCurrencies = function (name) {
    return ['USD',"AUD","EUR"]
}