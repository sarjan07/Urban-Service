const routes = require("express").Router()
const packageController = require("../controllers/PackageController")

routes.get("/allpackages",packageController.getallPackages)
routes.post("/addpackage",packageController.addPackage)
routes.get("/getpackagebyuser/:userId",packageController.getPackageByUserId)

module.exports = routes;    