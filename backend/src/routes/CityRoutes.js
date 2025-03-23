const routes = require("express").Router()
const cityController = require("../controllers/CityController")

routes.get("/allcity",cityController.getallCities)
routes.post("/addcity",cityController.addCity)
routes.get("/getcitybystate/:stateId",cityController.getCityByStateId)

module.exports = routes