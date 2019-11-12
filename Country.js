class Country {
    constructor(id, name, population) {
        this.id = id;
        this.name = name;
        this.population = population;
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