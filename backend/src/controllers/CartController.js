// const AreaModel = require("../models/AreaModel");
const cartModel = require("../models/AreaModel");

const addCart = async (req, res) => {
  try {
    const savedCart = await cartModel.create(req.body);
    res.status(200).json({
      message: "Area added successfully",
      data: savedCart,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getallCarts = async (req, res) => {
  try {
    const cities = await cartModel.find().populate("cityId");
    res.status(200).json({
      message: "All Areas",
      data: getallCarts,
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const getCartByPackageId = async (req, res) => {
  try {
    const carts = await cartModel.find({ userId: req.params.userId });
    res.status(200).json({
      message: "Cart found",
      data: carts,
    });
  } catch (err) {
    res.status(500).json({
      message: "carts not found",
    });
  }
};

module.exports={
    addCart,
    getallCarts,
    getCartByPackageId
};