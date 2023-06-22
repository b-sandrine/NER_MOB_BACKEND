const mongoose = require('mongoose');
const Joi = require('joi')

const voteSchema = mongoose.Schema({
    votes: {
        type: Number,
    },
    candidate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'candidates',
        required: true
    }
})

const Votes = mongoose.model('votes', voteSchema);

const validVotes = Joi.object({
    votes: Joi.number().required(),
    candidateId: Joi.string().required()
})

module.exports = {Votes, validVotes};