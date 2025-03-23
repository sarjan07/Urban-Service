const routes = require("express").Router()
const Area = require("../controllers/AreaController")

routes.get("/allareas",Area.getallAreas)
routes.post("/addarea",Area.addArea)
routes.get("/getareabycity/:cityId",Area.getAreaByCityId)

module.exports = routes;