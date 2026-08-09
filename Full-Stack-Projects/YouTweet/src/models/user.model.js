import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema({

    username: {
        type: String,
        required: [true, "username is required."],
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },

    email: {
        type: String,
        required: [true, "email is required."],
        unique: true,
        lowercase: true,
        trim: true,
    },

    fullName: {
        type: String,
        required: [true, "fullName is required."],
        index: true,
    },

    avtar: {
        type: String, // cloudinary url used
        required: [true, "avtar is required."],
    },

    coverImage: {
        type: String,
    },

    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video",
        }
    ],

    password: {
        type: String,
        required: [true, "Password is required."],
    },

    refreshTockens: {
        type: String,
    }

}, {timestapms: true});


// Using Middleware ==> To encrypt password
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password, 10);
    next();
  }
)

userSchema.methods.isPsswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessTocken = function() {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOCKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOCKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshTocken = function() {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOCKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOCKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema);