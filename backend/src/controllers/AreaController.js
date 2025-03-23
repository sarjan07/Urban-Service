// const AreaModel = require("../models/AreaModel");
const areaModel = require("../models/AreaModel");

const addArea = async (req, res) => {
  try {
    const savedArea = await areaModel.create(req.body);
    res.status(200).json({
      message: "Area added successfully",
      data: savedArea,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getallAreas = async (req, res) => {
  try {
    const cities = await areaModel.find().populate("cityId");
    res.status(200).json({
      message: "All Areas",
      data: getallAreas,
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const getAreaByCityId = async (req, res) => {
  try {
    const areas = await areaModel.find({ cityId: req.params.cityId });
    res.status(200).json({
      message: "Area found",
      data: areas,
    });
  } catch (err) {
    res.status(500).json({
      message: "Area not found",
    });
  }
};

module.exports={
    addArea,
    getallAreas,
    getAreaByCityId
};