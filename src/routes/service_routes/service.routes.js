const express = require("express")

const router = express.Router();
const { authorize} = require("../../middleware/authorization")

const { createServices,getALlService,deleteService,updateService} = require("../../controller/service_controller/service.controller")

router.post('/categoryId_service',authorize(['admin']), createServices) 
router.get('/categoryId_services',authorize(['admin']),getALlService)

router.patch('/update_service/:id',authorize(['admin']),updateService) 

router.delete('/del_service_by_id/:serviceId',authorize(['admin']), deleteService)

module.exports = router