const routes = require("express").Router()
const Cart = require("../controllers/CartController")

routes.get("/all",Cart.getallCarts)
routes.post("/add",Cart.addCart)
routes.get("/getCartbyPackageId/:PackageId",Cart.getCartByPackageId)

module.exports = routes;