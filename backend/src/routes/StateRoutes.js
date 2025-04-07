const routes = require("express").Router()
const stateController = require("../controllers/StateController")

routes.get("/states",stateController.getAllStates)
routes.post("/addstate",stateController.addState)

module.exports = routes