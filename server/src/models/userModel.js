import mongoose, { mongo } from "mongoose";
import bcrypt from 'bcryptjs'
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

userSchema.pre('save',async function (next) {
    
    if (!this.isModified('password'))
        next();
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

const User = mongoose.model('User',userSchema);

export { User };