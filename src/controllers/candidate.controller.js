const { Candidate, validCandidate } = require('../models/candidate.model')
require('dotenv').config()

const addCandidate = async (req, res) => {
    try {
        const candidateData = req.body;
        console.log(candidateData);
        const { error } = validCandidate.validate(candidateData)

        if (error) {
            return res.status(400).json({ error: error.details[0].message })
        }
        else {
            const candidateExist = await Candidate.findOne({ email: candidateData.email })

            if (candidateExist) {
                return res.status(400).json({
                    error: "Candidate already exists"
                })
            }
            const candidateToBeSaved = new Candidate(candidateData);
            candidateToBeSaved.save()
                .then((result) => {
                    return res.status(201).json(result)
                })
                .catch((err) => {
                    console.log(err)
                    return res.status(500).json({ error: "Failed to save Candidate" })
                })

        }
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ error: "Failed to save Candidate" })
    }
}

const listCandidates = async (req, res) => {
    try {
        const result = await Candidate.find();
        if(result) {
            return res.status(200).json({
              result
            })
        }
        res.status(400).json({error: "unable to fetch data "})
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ error: "Candidates not found" })
    }
}


module.exports = { addCandidate, listCandidates }