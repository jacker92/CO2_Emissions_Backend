var express = require('express');
var router = express.Router();
var repo = require("../repository.js");

router.get('/', async (req, res, next) => {
	await repo.ReadAllCountriesCO2Data().then((data) => {
		res.send(data);
	})
});

router.get('/:country', async (req, res, next) => {
	if(req.params["country"]) {
		await repo.ReadCountryCO2Emissions(req.params["country"]).then((data) => {
			res.json(data);
		})
	} else {
		res.status(400).send();
	}
});

module.exports = router;