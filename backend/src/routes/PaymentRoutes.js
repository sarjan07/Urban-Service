const routes = require("express").Router();
const paymentMethodController = require("../controllers/PaymentController");

routes.get("/get", paymentMethodController.getAllPayments);
routes.post("/create", paymentMethodController.createPaymentMethod);
routes.put("/updatepay/:id", paymentMethodController.updatePaymentMethod);
routes.delete("/delpay/:id", paymentMethodController.deletePaymentMethod);

module.exports = routes;