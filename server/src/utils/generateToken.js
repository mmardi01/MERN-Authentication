import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const generateAccessToken = (id,username,email) => {
    
    return jwt.sign({id, username, email}, process.env.TOKEN_SECRET,{expiresIn:'180s'});
}

export { generateAccessToken };