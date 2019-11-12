const csv = require("csvtojson");
const populationDataLocation = "./data/population.csv";
const co2DataLocation = "./data/co2.csv";
const Country = require('./Country.js')

const ReadAllCountries = async () => {
    let jsonReturnValue = [];
    console.log("Reading all countries");
    await csv()
        .fromFile(populationDataLocation)
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
        .fromFile(populationDataLocation)
        .then((json) => {
            json.forEach(element => {
                if (element["Country Name"].toLowerCase() == country.toLowerCase() ||
                    element["Country Code"].toLowerCase() == country.toLowerCase()) {
                    jsonReturnValue.push(element);
                }
            });
        })

    return new Promise(resolve => {
        resolve(jsonReturnValue);
    });
}

const ReadCountryCO2Emissions = async (country) => {
    let jsonReturnValue = [];
    console.log("Reading co2 emissions for country: " + country);
    await csv()
        .fromFile(co2DataLocation)
        .then((json) => {
            json.forEach(element => {
                if (element["Country Name"].toLowerCase() == country.toLowerCase() ||
                    element["Country Code"].toLowerCase() == country.toLowerCase()) {
                    jsonReturnValue.push(element);
                }
            });
        })

    return new Promise(resolve => {
        resolve(jsonReturnValue);
    });
}

const ReadAllCountriesCO2Data = async () => {
    console.log("In read countries CO2 data as list");
    let returnValue = {};
    await csv()
        .fromFile(co2DataLocation)
        .then((json) => {
            json.forEach(element => {
                let co2 = {};
                for (let index = 1960; index < 2019; index++) {
                    if (element[index]) {
                        co2[index] = element[index];
                    };
                }
                returnValue[element["Country Name"]] = co2
            });
        })

    return new Promise(resolve => {
        resolve(returnValue);
    });
}

const ReadAllCountriesAsList = async () => {
    console.log("In read countries as list");
    let returnValue = {};
    await csv()
        .fromFile(populationDataLocation)
        .then((json) => {
            json.forEach(element => {
                let pop = {};
                for (let index = 1960; index < 2019; index++) {
                    if (element[index]) {
                        pop[index] = element[index];
                    };
                }
                returnValue[element["Country Name"]] = new Country(element["Country Code"], element["Country Name"], pop);
            });
        })

    return new Promise(resolve => {
        resolve(returnValue);
    });
}

const ReadAllCountriesAsListAndMigrateCO2Data = async (co2Data) => {
    console.log("In read countries as list and migrate");
    let returnValue = {};
    await csv()
        .fromFile(populationDataLocation)
        .then((json) => {
            json.forEach(element => {
                let pop = {};
                let co2 = {};
                let country = element["Country Name"];
                for (let index = 1960; index < 2019; index++) {
                    if (element[index]) {
                        pop[index] = element[index];
                        co2[index] = co2Data[country][index];
                    };
                }
                returnValue[country] = new Country(element["Country Code"], country, pop, co2);
            });
        })

    return new Promise(resolve => {
        resolve(returnValue);
    });
}

module.exports = {
    ReadAllCountries,
    ReadCountryPopulation,
    ReadAllCountriesAsList,
    ReadAllCountriesCO2Data,
    ReadAllCountriesAsListAndMigrateCO2Data,
    ReadCountryCO2Emissions
}





