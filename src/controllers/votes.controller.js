const {Votes} = require('../models/votes.model')
const {Candidate} = require('../models/candidate.model')

async function validCandidate(id) {

    const result = await Candidate.findOne({_id: id});
    if (result) {
        return true;
    }
    return false;
}

const createVotes = async (req, res) => {
    const voteData = req.body;
  
    console.log(voteData);
    const votes = new Votes(voteData);
  
    await votes
      .save()
      .then((result) => {
        console.log(result);
        return res.status(201).json({ result });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ error: "Failed to create votes" });
      });
  };
  

const getVotes = async (req, res) => {
    try {
        const candidateId = req.params.id;

        const isValidCandidate = validCandidate(candidateId)

        if (isValidCandidate) {
            const result = await Votes.findOne({ candidateId: candidateId })
            if (result) {
                return res.status(200).json({ result })
            }
            return res.status(400).json({ error: "Failed to fetch votes" })
        }
        else {
            return res.status(400).json({ error: "Invalid candidate" })
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({error: "Server error"})
    }
}

const updateVotes = async (req, res) => {
    const data = req.body;

    const isValidCandidate = data._id;
    if (!isValidCandidate) {
        res.status(400).json({ error: "Candidate Not Found" })
        return;
    }

    console.log(data);
    const votes = new Votes(data);

    votes.save()
        .then((result) => {
            res.status(200).json({ result })
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({ error: err })
        })
}

module.exports = { getVotes, updateVotes, createVotes }