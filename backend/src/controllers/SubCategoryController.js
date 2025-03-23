const subcategoryModel = require("../models/SubCategoryModel");

// const 
const addsubCategory = async(req,res) => {
    try{
        const savedCategory = await subcategoryModel.create(req.body)
        res.status(201).json({
            message: "Category added Successfully",
            data: savedCategory,
        });
    } catch(err){
        res.status(500).json({ message:err.message})
    }
};

const getAllsubCategory =async (req, res) =>{
    try{
        const allsubcategory = await subcategoryModel.find().populate('CategoryId')
        res.status(200).json({
            message: "All Sub-category added Successfully...",
            data: allsubcategory,
          });

    }catch(err) {
        res.status(500).json({
            message:"All category fetched Successfully...",
            data: getAllCategory,
        });
    }
}

module.exports = {
    addsubCategory,
    getAllsubCategory
};