const express = require("express")

const router = express.Router();

const categoryRoutes = require("./category_routes/category.routes");
const serviceRoutes =  require("./service_routes/service.routes")
const refreshTokenRoutes = require("./refreshToken_routes/refresh_token.routes");
// Admin
const adminRoutes = require("./admin_routes/admin.routes");

router.use("/",categoryRoutes);
router.use("/",serviceRoutes);
router.use("/",adminRoutes);
router.use("/",refreshTokenRoutes);

module.exports = router
