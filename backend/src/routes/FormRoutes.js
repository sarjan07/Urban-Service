const routes = require("express").Router()
const formController = require("../controllers/FormController")

routes.get("/allform",formController.getallServices)
routes.post("/addform",formController.addService)
routes.get("/getcitybycategory/:categoryId",formController.getServiceByCategoryId)

module.exports = routes;