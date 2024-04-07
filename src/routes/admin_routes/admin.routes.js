const express = require('express');
const router = express.Router();
const { authorize } = require("../../middleware/authorization");


const { adminRegistration , loginAdmin} = require('../../controller/admin_controller/registration.controller')

router.post('/admin_registration', adminRegistration)
router.post('/admin_login',loginAdmin); // Done 


module.exports = router;