const routes = require("express").Router()
const userController =require("../controllers/UserController")

routes.get("/users",userController.getAllUsers)
routes.post("/user1",userController.addUser1)
routes.post("/useer",userController.addUser)
routes.post("/user",userController.signUp)
routes.post("/user/login",userController.loginUser)
routes.get("/user/:id",userController.getUserById)
routes.put("/edituser",userController.updateUser)
routes.post("/user/forgotpassword",userController.forgotPassword)
routes.post("/user/resetpassword",userController.resetPassword)
routes.delete("/deleteuserbyuserid/:userid",userController.deleteUser)

module.exports = routes