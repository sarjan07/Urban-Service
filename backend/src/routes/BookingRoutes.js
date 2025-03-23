const routes = require("express").Router()
const Book = require("../controllers/BookingController")

routes.get("/allbookings",Book.getallBooking)
routes.post("/addbook",Book.addBooking)
routes.get("/getBookbyPackageId/:packageId",Book.getBookbyPackageId)

module.exports = routes;