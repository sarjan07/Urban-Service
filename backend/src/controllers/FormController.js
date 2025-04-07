const formModel = require("../models/FormModel");

const addService = async (req, res) => {
  try {
    const savedService = await formModel.create(req.body);
    res.status(200).json({
      message: "Service added successfully",
      data: savedService,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getallServices = async (req, res) => {
  try {
    const allservices = await formModel.find()
    res.status(201).json({
      message: "All Services",
      data: allservices,
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const getServiceByCategoryId = async (req, res) => {
  try {
    const services = await formModel.find({ categoryId: req.params.categoryId });
    res.status(200).json({
      message: "Service found",
      data: services,
    });
  } catch (err) {
    res.status(500).json({
      message: "Service not found",
    });
  }
};

module.exports={
    addService,
    getallServices,
    getServiceByCategoryId
};