const mongoose = require('mongoose')
const Joi = require('joi')

const userSchema = mongoose.Schema({
    fullnames: {
        type: String
    },
    address: {
        type: String
    },
    email : {
        type: String
    },
    phoneNumber: {
        type: String
    },
    nid: {
        type: Number
    },
    password: {
        type: String
    },
    role: {
        type: String,
        enum: ["admin","voter"],
        default: "voter"
    }
})

const User = mongoose.model("users", userSchema);

const validUser = Joi.object({
    fullnames: Joi.string().min(5).max(50).required(),
    email: Joi.string().email().required(),
    nid: Joi.number().integer().min(1190000000000000).max(1200700000000000).required(),
    phoneNumber: Joi.string().required(),
    address: Joi.string().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('admin','voter').default('voter')
})

const validLoginUser = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
})

module.exports = {User, validUser, validLoginUser};