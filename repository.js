const csv = require("csvtojson");
const dataLocation = "./data/data.csv";
const Country = require('./Country.js')

const ReadAllCountries = async () => {
    let jsonReturnValue = [];
    console.log("Reading all countries");
    await csv()
        .fromFile(dataLocation)
        .then((json) => {
            json.forEach(element => {
                jsonReturnValue.push(element["Country Name"]);
              });
        })

    return new Promise(resolve => {
        resolve(jsonReturnValue);
    });
}

const ReadCountryPopulation = async (country) => {
    let jsonReturnValue = [];
    console.log("Reading country population for country: " + country);
    await csv()
        .fromFile(dataLocation)
        .then((json) => {
            json.forEach(element => {
                if(element["Country Name"].toLowerCase() == country.toLowerCase() ||
                element["Country Code"].toLowerCase() == country.toLowerCase()) {
                    jsonReturnValue.push(element);
                }
              });
        })

    return new Promise(resolve => {
        resolve(jsonReturnValue);
    });
}

const ReadAllCountriesAsList = async () => {
    console.log("In read countries as list");
    let returnValue = {};
    await csv()
    .fromFile(dataLocation)
    .then((json) => {
        json.forEach(element => {
            let pop = {};
            for (let index = 1960; index < 2019; index++) {
                if(element[index]) {
                    pop[index] = element[index];
                };
            }
            returnValue[element["Country Name"]] = new Country(element["Country Code"],element["Country Name"], pop);
          });
    })

    return new Promise(resolve => {
        resolve(returnValue);
    });
}

module.exports = {
    ReadAllCountries,
    ReadCountryPopulation,
    ReadAllCountriesAsList
}





