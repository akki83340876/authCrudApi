const express = require("express")
const router = express.Router()
const { refresh_token } = require("../../services/refreshToken")
const { generateAccessToken} = require('../../services/genrateToken')

router.post("/refresh", refresh_token)
router.post('/generate_token', generateAccessToken)

module.exports = router