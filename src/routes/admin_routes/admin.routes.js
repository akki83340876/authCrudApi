const express = require('express');
const router = express.Router();
const { authorize } = require("../../middleware/authorization");


const { adminRegistration , loginAdmin} = require('../../controller/admin_controller/registration.controller')
const {  Admin_login} = require("../../controller/admin_controller/admin_login.controller")

router.post('/admin_registration', adminRegistration)

router.post('/admin_login',Admin_login);


module.exports = router;
