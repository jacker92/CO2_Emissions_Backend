var express = require('express');
var router = express.Router();
var repo = require("../repository.js");

router.get('/allCountries', async (req, res, next) => {
	await repo.ReadAllCountriesCO2Data().then((data) => {
		res.send(data);
	})
});

router.get('/allCountriesWithPopulation', async (req, res, next) => {
	await repo.ReadAllCountriesCO2Data().then(async (data) => {
		await repo.ReadAllCountriesAsListAndMigrateCO2Data(data).then((finalData) => {
			res.send(finalData);
		})
	})
});

router.get('/byCountry', async (req, res, next) => {
	if(req.query["country"]) {
		await repo.ReadCountryCO2Emissions(req.query["country"]).then((data) => {
			res.json(data);
		})
	} else {
		res.status(400).send();
	}
});

module.exports = router;