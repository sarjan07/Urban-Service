// const AreaModel = require("../models/AreaModel");
const Book = require("../models/BookingModel");

const addBooking = async (req, res) => {
  try {
    const savedBooking = await Book.create(req.body);
    res.status(200).json({
      message: "Booking added successfully",
      data: savedBooking,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getallBooking = async (req, res) => {
  try {
    const Booking = await Book.find().populate("cityId");
    res.status(200).json({
      message: "All Bookings",
      data: Booking,
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const getBookbyPackageId = async (req, res) => {
  try {
    const books = await Book.find({ cityId: req.params.cityId });
    res.status(200).json({
      message: "Booking found",
      data: books,
    });
  } catch (err) {
    res.status(500).json({
      message: "Booking not found",
    });
  }
};

module.exports={
    addBooking,
    getallBooking,
    getBookbyPackageId
};