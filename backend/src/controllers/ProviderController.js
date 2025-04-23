const providerModel = require("../models/ProviderModel");

// Create new provider
const addProvider = async (req, res) => {
  try {
    const savedProvider = await providerModel.create(req.body);
    res.status(201).json({
      message: "Provider added successfully",
      data: savedProvider,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all providers
const getAllProviders = async (req, res) => {
  try {
    const providers = await providerModel.find();
    res.status(200).json({
      message: "All providers retrieved",
      data: providers,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get provider by ID
const getProviderById = async (req, res) => {
  try {
    const provider = await providerModel.findById(req.params.id);
    if (!provider) {
      return res.status(404).json({ message: "Provider not found" });
    }
    res.status(200).json({
      message: "Provider found",
      data: provider,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update provider
const updateProvider = async (req, res) => {
  try {
    const updatedProvider = await providerModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProvider) {
      return res.status(404).json({ message: "Provider not found" });
    }
    res.status(200).json({
      message: "Provider updated successfully",
      data: updatedProvider,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete provider
const deleteProvider = async (req, res) => {
  try {
    const deletedProvider = await providerModel.findByIdAndDelete(req.params.id);
    if (!deletedProvider) {
      return res.status(404).json({ message: "Provider not found" });
    }
    res.status(200).json({
      message: "Provider deleted successfully",
      data: deletedProvider,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addProvider,
  getAllProviders,
  getProviderById,
  updateProvider,
  deleteProvider
};
