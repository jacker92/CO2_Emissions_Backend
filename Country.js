class Country {
    constructor(id, name, population, co2Data) {
        this.id = id;
        this.name = name;
        this.population = population;
        this.co2Data = co2Data;
    }

    populationToArray() {
        let array = [];
        for(let key in this.population) {
            array.push(this.population[key]);
        }
        return array;
    }
}

module.exports = Country;