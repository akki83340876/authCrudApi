const express = require("express");

const router = express.Router();
// const {uploads} = require('../../middleware/multer');
const { authorize } = require("../../middleware/authorization")


const { createCategory,getCategory,updateCategory,deleteCategory } = require("../../controller/category_controller/category.controller")


//category Routes
router.post("/category",authorize(['admin'])  ,createCategory);
router.get("/categories",authorize(['admin']),  getCategory);
router.put("/category/:categoryId",authorize(['admin']),updateCategory);
router.delete("/category/:categoryId",authorize(['admin']),deleteCategory)



module.exports= router;

