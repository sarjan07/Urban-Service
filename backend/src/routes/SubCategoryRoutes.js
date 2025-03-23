const routes = require("express").Router()
const subcategoryController = require("../controllers/SubCategoryController")

routes.get("/allsubcategory",subcategoryController.getAllsubCategory)
routes.post("/addsubcategory",subcategoryController.addsubCategory)

module.exports = routes