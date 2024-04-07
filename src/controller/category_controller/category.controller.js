
const db = require("../../../config/db.config");
const Category = db.category;
const User = db.User;
const service = db.service;

// API for create category
const createCategory = async (req, res) => {
  const { name } = req.body;
  try {


    const addCategory = await Category.create({
      name:name,
    
    });

    return res.status(200).json({
      status: true,
      message: "Category add successfully....",
      data: addCategory,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// Get all Category Api
const getCategory = async (req, res) => {
  try {
    
    const getAllcategory = await Category.findAll({
      include:[{
        model: service,
        as: "service",
      }],

    });
    
    if (!getAllcategory) {
      return res.status(200).json({
        status: false,
        message: "Category not found",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Categories retrieved successfully",
      data: getAllcategory,
      
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// // get category by id including subcategory
// const getCategoryById = async (req, res) => {
//   if (!req.params.categoryId) {
//     return res.json({
//       status: false,
//       message: "categoryId is Not provide",
//     });
//   }
//   try {
    
//     const categoryBy_id = await Category.findOne({
//       where: {
//         id: req.params.categoryId,
//       }, 
//       include:[{
//         model: service,
//         as: "service",
//       }],
    
//     });
  

//     if (!categoryBy_id) {
//       return res.status(404).json({
//         status: false,
//         message: "Category is not found",
//       });
//     }
//     return res.status(200).json({
//       status: true,
//       message: "Categories retrieved successfully",
//       data: categoryBy_id,
 
//     });
//   } catch (error) {
//     return res.status(500).json({
//       status: false,
//       message: error.message,
//     });
//   }
// };


const updateCategory = async (req, res) => {
  const { name} = req.body;
  if (!req.params.categoryId) {
    return res.json({
      status: false,
      message: "Please provide category id",
    });
  }
  try {
    const update_category = await Category.findOne({
      where: { id: req.params.categoryId },
    });
    if (update_category) {
      const update = await Category.update( 
        {
          name:name,
      
        },
        {
          where: { id: req.params.categoryId },
        }
      );
      if (update) {
        return res.status(200).json({
          status: true,
          message: "category update successfully ",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// delete category by id
const deleteCategory = async (req, res) => {
    if (!req.params.categoryId) {
      return res.status(200).json({
        status: false,
        message: "Category id required",
      });
    }
    try {
      const rowsDeleted = await Category.destroy({
        where: { id: req.params.categoryId },
      });
      if (rowsDeleted > 0) {
        return res.status(200).json({
          status: true,
          message: "Category deleted successfully",
        });
      }
      return res.status(404).json({
        status: false,
        message: "Category not found or already deleted",
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  };

module.exports = {
  createCategory,
  getCategory,
  updateCategory,
  // getCategoryById,
  deleteCategory
};
