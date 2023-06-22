const Votes = require('../models/votes.model')
const Candidate = require('../models/candidate.model')

async function validCandidate(id) {
    const result = await Candidate.findOne(id);
    if(result) {
        return true;
    }
    return false;
}

const getVotes = async(req,res) => {
    const data = req.body;
    console.log(data)
}

const updateVotes = async(req,res) => {
    const data = req.body;

    const isValidCandidate = data._id;
    if(!isValidCandidate) {
        res.status(400).json({error: "Candidate Not Found"})
        return;
    }

    const votes = new Votes(data);

    votes.save()
    .then((result) => {
        res.status(200).json({result})
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({error: err})
    })
}

module.exports = {getVotes, updateVotes}