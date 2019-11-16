var express = require('express');
var router = express.Router();
var repo = require("../repository.js");

router.get('/', async (req, res, next) => {
	await repo.ReadAllCountriesCO2Data().then(async (data) => {
		await repo.ReadAllCountriesAsListAndMigrateCO2Data(data).then((finalData) => {
			res.send(finalData);
		})
	})
});

module.exports = router;