const db = require('../../../config/db.config')
const AdminModel = db.admin;
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const adminRegistration = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email) {
            return res.status(400).json({
                status: false,
                message: "Please provide an email"
            });
        }

        const hashedPassword = await bcrypt.hashSync(password, 10);

        const adminData = await AdminModel.create({
            email: email,
            password: hashedPassword
        });

        if (adminData) {
            return res.status(200).json({
                status: true,
                message: "Admin registration successful",
                data: adminData
            });
        } else {
            return res.status(400).json({
                status: false,
                message: "Admin not registered"
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

module.exports = { adminRegistration }


