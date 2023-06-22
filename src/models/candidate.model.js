const mongoose = require('mongoose')
const Joi = require('joi')

const candidateSchema = mongoose.Schema({
    fullnames: {
        type: String
    },
    address: {
        type: String
    },
    email : {
        type: String,
        unique: true
    },
    phoneNumber: {
        type: String,
        unique: true
    },
    nid: {
        type: Number,
        unique: true
    },
    profile: {
        type: String,
        required: true
    }
})

const candidate = mongoose.model("candidates", candidateSchema);

const validCandidate = Joi.object({
    fullnames: Joi.string().min(5).max(50).required(),
    email: Joi.string().email().required(),
    nid: Joi.number().integer().min(1190000000000000).max(1200700000000000).required(),
    phoneNumber: Joi.string().required(),
    address: Joi.string().required(),
    profile: Joi.string().required()
})

module.exports = {candidate, validCandidate};