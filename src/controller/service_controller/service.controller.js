const db = require("../../../config/db.config")
const category = db.category;
const services = db.service;
const User = db.User;
const {Sequelize,Op, where} = require('sequelize');
// API for add Services
const createServices = async(req, res)=>{
    const { categoryId , name ,type} = req.query;
    // const { serviceName } = req.body
    try {
        const findCategory = await category.findByPk(categoryId)
        
        if(!findCategory ){
            return res.status(404).json({
                status : false,
                message : "Category is are not found"
            })
        }    
            const addServices = await services.create({
            categoryId : categoryId,
            name:name ,
            type :type
            })

            await addServices.update(req.body)

            return res.status(200).json({
                status : true,
                message : "Service add succesfully with respected category",
                data : addServices
            })
        
    } catch (error) {
        return res.status(500).json({
            status : false,
            message : error.message
        })
    }
}

// API for getAll Services
const getALlService = async(req, res) =>{
    try {
       
        const {type_of_service} = req.query;
        let query = {
            where: {},
          };
          if (type_of_service) {
            query.where.type_of_service = { [Sequelize.Op.like]: `%${type_of_service}%` };
          }

        const getServices = await services.findAll({
            // where: { type_of_service: req.query.type_of_service },
            where: query.where,
            include:[{
                model: category,
                as: "category",
              },
            
        ],
        order: [["id", "DESC"]],

        })
        if(getServices){
            return res.status(200).json({
                status : true,
                message : " get all services",
                data : getServices,
              
            })
        }else{
            return res.status(404).json({
                status : false,
                message : "services not found"
            })
        }
    } catch (error) {
        return res.status(500).json({
            status : false,
            message : error.message
        })
    }
}




const updateService = async (req, res) => {
    const {
      categoryId,
      name,
      type
    } = req.query;
    let id = req.params.id;
    try {
      const findCategory = await category.findByPk(categoryId);
  
      if(!findCategory ){
          return res.status(404).json({
              status : false,
              message : "Category or sub Category are not found"
          })
      }
    const updateData = await services.update({
        categoryId: categoryId,
        name : name,
        type : type
    },{
      where : {
          id : id
      }
    });

    const find_service = await services.findByPk(id);

      if(updateData){
          return res.status(200).json({
              status : true,
              message : "Service updated successfully",
              data : updateData
          })
      }else{
          return req.status(400).json({
              status : false,
              message : "service not updated"
          })
      }
    } catch (error) {
      return res.status(500).json({
          status :false,
          message : error.message
      })    
    }
  };



// API for delete Services
const deleteService = async(req, res) => {
    const { categoryId , service_id } = req.params;
    try {
        const delServices = await services.findAll( {
            categoryId : categoryId,
            id : service_id
        })
        if(delServices){
       await delServices.destroy(delServices)
        return res.status(200).json({
            status : true,
            message : "Data delete successfully"
        })
    }else{
        return res.status(404).json({
            status : false,
            message : "service Id not found and services not deleted"
        })
    }
    } catch (error) {
        return res.status(500).json({
            status : false,
            message : error.message
        })
    }
}


module.exports = {
    createServices,
    getALlService,
    deleteService,
    updateService,
}