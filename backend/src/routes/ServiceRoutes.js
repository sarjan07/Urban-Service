const routes = require("express").Router()
const serviceController = require("../controllers/ServiceController")

routes.get("/allservices",serviceController.getallServices)
routes.post("/addservice",serviceController.addService)
routes.get("/getservicebycategory/:categoryId",serviceController.getServiceByCategoryId)
// routes.delete("/deleteservice",serviceController.delservice)

module.exports = routes;    