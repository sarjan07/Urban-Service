const routes = require("express").Router()
const categoryController = require("../controllers/CategoryControllerr")

routes.get("/allcategory",categoryController.getAllCategory)
routes.post("/addcategory",categoryController.addCategory)

module.exports = routes