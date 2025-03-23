const express = require("express"); //express....
const mongoose = require("mongoose");
const cors = require("cors");
//express object...
const app = express();
app.use(cors());
app.use(express.json()); //to accept data as json...

//import role routes
const roleRoutes = require("./src/routes/RoleRoutes");
app.use("/api", roleRoutes);

const UserRoutes = require("./src/routes/UserRoutes");
app.use(UserRoutes);

const StateRoutes = require("./src/routes/StateRoutes");
app.use(StateRoutes);

const CityRoutes = require("./src/routes/CityRoutes");
app.use(CityRoutes);

const AreaRoutes = require("./src/routes/AreaRoutes");
app.use(AreaRoutes);

const CategoryRoutes = require("./src/routes/CategoryRoutes");
app.use(CategoryRoutes);

const ProfileRoutes = require("./src/routes/ProfileRoutes");
app.use(ProfileRoutes);

// const SubCategoryController = require('./src/routes/SubCategoryRoutes')
// app.use(SubCategoryController)

const SubCategoryRoutes = require("./src/routes/SubCategoryRoutes");
app.use(SubCategoryRoutes);

const BookingModel = require("./src/routes/BookingRoutes");
app.use(BookingModel);

// app.get('/hello',(req,res)=>{
//     res.send("Hello,backend is working....");
// })

const CartRoutes = require("./src/routes/CartRoutes");
app.use(CartRoutes);

const packageRoutes = require("./src/routes/PackageRoutes");
app.use(packageRoutes);

const ServiceRoutes = require("./src/routes/ServiceRoutes");
app.use(ServiceRoutes);

const PaymentRoutes = require("./src/routes/PaymentRoutes");
app.use(PaymentRoutes);

mongoose
  .connect("process.env.MONGODB_URI")
  .then(() => {
    console.log("database connected....");
  })
  .catch((err) => {
    console.log("Error Connecting Database.....");
  });

app.post("/user/login", (req, res) => {
  // Handle login logic here
  res.send("Login successful");
});

//server creation...
const PORT = 4000;
app.listen(PORT, () => {
  console.log("server started on port number ", PORT);
});
