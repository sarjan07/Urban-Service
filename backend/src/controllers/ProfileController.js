const profileModel = require("../models/ProfileModel");
const multer = require("multer");
const path = require("path");
const cloudinaryUtil = require("../utili/CloudnaryUtil");
//storage engine

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});


///multer object....

const upload = multer({
  storage: storage,
  //fileFilter:
}).single("image");

const addProfile = async (req, res) => {
  try {
    const savedHording = await profileModel.create(req.body);
    res.status(201).json({
      message: "Hording added successfully",
      data: savedHording,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllProfiles = async (req, res) => {
  try {
    const hordings = await profileModel
      .find()
      .populate("stateId cityId userId");
    if (hordings.length === 0) {
      res.status(404).json({ message: "No hordings found" });
    } else {
      res.status(200).json({
        message: "Profile found successfully",
        data: hordings,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllProfileByUserId = async (req, res) => {
  
  try {
    const hordings = await hordingModel
      .find({userId:req.params.userId})
      .populate("stateId cityId userId");
    if (hordings.length === 0) {
      res.status(404).json({ message: "No profiles found" });
    } else {
      res.status(200).json({
        message: "Profile found successfully",
        data: hordings,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// const addHordingWithFile = async (req, res) => {
//   upload(req, res, (err) => {
//     if (err) {
//       res.status(500).json({
//         message: err.message,
//       });
//     } else {
//       // database data store
//       //cloundinary
//       console.log(req.body);
//       res.status(200).json({
//         message: "File uploaded successfully",
//         data: req.file,
//       });
//     }
//   });
// };

const addProfileWithFile = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else {
      //cloundinary

      const cloundinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req.file);
      console.log(cloundinaryResponse);
      console.log(req.body);

      //store data in database
      req.body.hordingURL = cloundinaryResponse.secure_url
      const savedProfile = await profileModel.create(req.body);

      res.status(200).json({
        message: "profile saved successfully",
        data: savedProfile
      });
    }
  });
};

const updateProfile = async (req, res) => {
  //update tablename set  ? where id = ?
  //update new data -->req.body
  //id -->req.params.id

  try {
    const updatedProfile = await profileModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({
      message: "Profile updated successfully",
      data: updatedProfile,
    });
  } catch (err) {
    res.status(500).json({
      message: "error while update profile",
      err: err,
    });
  }
};

module.exports = { 
    addProfile,
    getAllProfiles,
    addProfileWithFile ,
    getAllProfileByUserId,
    updateProfile
  };