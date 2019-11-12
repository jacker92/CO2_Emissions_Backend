var express = require('express');
var router = express.Router();
var repo = require("../repository.js");

/* GET countries listing. */
router.get('/allCountries', async (req, res, next) => {
	await repo.ReadAllCountriesAsList().then((data) => {
		res.send(data);
	})
});

router.get('/byCountry', async (req, res, next) => {
	if(req.query["country"]) {
		await repo.ReadCountryPopulation(req.query["country"]).then((data) => {
			res.json(data);
		})
	} else {
		res.status(400).send();
	}
});

module.exports = router;
