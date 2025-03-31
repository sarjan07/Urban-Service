const packageModel = require("../models/PackageModel");

const addPackage = async (req, res) => {
  try {
    const savedPackage = await packageModel.create(req.body);
    res.status(200).json({
      message: "Package added successfully",
      data: savedPackage,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getallPackages = async (req, res) => {
  try {
    const packages = await packageModel.find();
    res.status(200).json({
      message: "All Packages",
      data: packages,
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const getPackageByCategoryId = async (req, res) => {
  try {
    const package = await packageModel.find({ userId: req.params.userId });
    res.status(200).json({
      message: "Package found",
      data: package,
    });
  } catch (err) {
    res.status(500).json({
      message: "Package not found",
    });
  }
};

module.exports={
    addPackage,
    getallPackages,
    getPackageByCategoryId
};
