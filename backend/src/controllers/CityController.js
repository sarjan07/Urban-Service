const CityModel = require("../models/CityModel");
const cityModel = require("../models/CityModel");

const addCity = async (req, res) => {
  try {
    const savedCity = await cityModel.create(req.body);
    res.status(201).json({
      message: "City added successfully",
      data: savedCity,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getallCities = async (req, res) => {
  try {
    const cities = await cityModel.find().populate("stateId");
    res.status(200).json({
      message: "All cities",
      data: cities,
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const getCityByStateId = async (req, res) =>{
  try{
    const cities = await CityModel.find({stateId: req.params.stateId});
    res.status(200).json({
      message: "city found",
      data:cities,
    });
  }catch(err){
    res.status(500).json({
      message: "city not found",
    })
  }
}

module.exports = {
     addCity,
     getallCities,
     getCityByStateId
};