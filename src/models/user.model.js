import mongoose from "mongoose";
import jwt from "jsonwebtoken" // jwt ek bearer token hai, matlab yeh token jiske v pass hai mai usse data bej dunga...
import bcrypt from "bcrypt"


const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        index : true
    },
    email : {
        type: String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
    },
    fullname : {
        type : String,
        required : true,
        trim : true,
        index : true
    },
    avatar: {
        type : String, // cloudinary ka url use karenge ...
        required : true,
    },
    coverImage : {
        type : String, // cloudinary se aayega...
    },
    watchHistory : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : "video"
        },
    ],
    password : {
        type : String,
        required : [true, 'Password is required'],
    },
    refreshToken : {
        type : String,
    }
}, {
    timestamps : true
})

userSchema.pre("save",async function (next) {
    if(!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password, 10)
    next()
}) //iska matlab save hone se pehle rokho and jo kham karna hai uske satth vo karo,, matlab password ko encrypt karo... 


userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id: this.id,
        email : this.email,
        username : this.username,
        fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    }
)
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id: this.id,
        email : this.email,
        username : this.username,
        fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    }
)
}
export const User = mongoose.model("User", userSchema);