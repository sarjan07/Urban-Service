const categoryModel = require("../models/CategoryModel");

const addCategory = async(req,res) => {
    try{
        const savedCategory = await categoryModel.create(req.body)
        res.status(201).json({
            message: "Category added Successfully",
            data: savedCategory,
        });
    } catch(err){
        res.status(500).json({ message:err.message})
    }
};

const getAllCategory =async (req, res) =>{
    try{
        const allcategory = await categoryModel.find();
        res.status(200).json({
            message: "All Category addedd Successfully",
            data: allcategory,
          });

    }catch(err) {
        res.status(500).json({
            message:"All category fetched Successfully...",
            data: getAllCategory,
        });
    }
}

const deleteCategoryById =async (req, res) =>{
    try{
        const delcategory = await categoryModel.find().populate("categoryId");
        res.status(200).json({
            message: "Delete Category Successfully",
            data: delcategory,
          });

    }catch(err) {
        res.status(500).json({
            message:"Delete category failed...",
            // data: delCategory,
        });
    }
}

module.exports = {
    addCategory,
    getAllCategory,
    deleteCategoryById
};