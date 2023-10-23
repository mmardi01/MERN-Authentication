import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const generateAccessToken = (username,email) => {
    
    return jwt.sign({username, email}, process.env.TOKEN_SECRET,{expiresIn:'180s'});
}

export { generateAccessToken };