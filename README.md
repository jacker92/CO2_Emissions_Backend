# CO2 Emissions backend

Tämä on osa [CO2 Emissions](https://github.com/jacker92/CO2_Emissions)-projektia.

## API Endpoints

Endpointit palauttavat JSON-muodossa olevan vastauksen.

### Population

#### api/population/allCountries
- Palauttaa kaikkien maiden väestötiedot

#### api/population/byCountry?country=countryName
- Palauttaa yhden maan väestötiedot
- Maan nimi syötetään query-parametrinä **country** joko selkokielisessä muodossa (esim. finland) tai maakoodina (esim. fin)
  
### CO2 Data

#### api/co2/allCountries
- Palauttaa kaikkien maiden hiilidioksidipäästöt

#### api/co2/allCountriesWithPopulation
- Palauttaa kaikkien maiden hiilidioksidipäästöt ja väestötiedot.

#### api/co2/byCountry?country=countryName
- Palauttaa yhden maan hiilidioksidipäästöt
- Maan nimi syötetään query-parametrinä **country** joko selkokielisessä muodossa (esim. finland) tai maakoodina (esim. fin)
