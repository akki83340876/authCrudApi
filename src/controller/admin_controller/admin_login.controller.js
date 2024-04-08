const db = require("../../../config/db.config");
const User = db.admin;
const bcrypt = require("bcryptjs");
const Token = require("../../services/genrateToken")


const Admin_login = async (req, res) => {

    try {
        if (!req.body.email) {
            return res.status(200).json({ error: 'Please enter your email ' });
        }
        if (!req.body.password) {
            return res.status(200).json({ error: 'please enter your password' });
        }
        const user = await User.findOne({ where: { email: req.body.email } });

        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if (!validPassword) {
            return res.status(200).json({ error: 'Invalid email or password' });
        }
        const verifyEmail = await User.findOne({
            where: {
                email: req.body.email,
            }
        })
        
        if (!verifyEmail) {
           return res.status(400).json({ message: 'Please verify your mobile number first then try to login' })
        }

        const access_token = Token.generateAccessToken(user)
        const refresh_token = Token.generateRefreshToken()
        const Refresh_token_expiration = Date.now() + (7 * 24 * 60 * 60 * 1000);

        user.refreshToken = refresh_token
        user.refreshToken_Expiration = Refresh_token_expiration
        await user.save()
        res.cookie("refresh_token", refresh_token, { httpOnly: true })

        return res.status(200).json({
            status: true,
            message: "Successfully login",
            data: user,
            access_token: access_token
        })
    
    
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
          status: false,
          message: error.message,
        });
    }
}

module.exports = { Admin_login }


