const routes = require("express").Router()
const userController =require("../controllers/UserController")

routes.get("/users",userController.getAllUsers)
routes.post("/user1",userController.addUser1)
// routes.post("/user",userController.addUser)
routes.post("/user",userController.signUp)
routes.post("/user/login",userController.loginUser)
routes.delete("/user/:id",userController.deleteUser)
routes.get("/user/:id",userController.getUserById)
routes.post("/user/forgotpassword",userController.forgotPassword)
routes.post("/user/resetpassword",userController.resetPassword)

module.exports = routes