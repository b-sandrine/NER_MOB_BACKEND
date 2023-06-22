const { Candidate, validCandidate } = require('../models/candidate.model')
require('dotenv').config()

const KEY = process.env.SECRET_KEY;

const addCandidate = async (req, res) => {
    try {
        const CandidateData = req.body;
        const { error } = validCandidate.validate(CandidateData)

        if (error) {
            return res.status(400).json({ error: error.details[0].message })
        }
        else {
            const CandidateExist = await Candidate.findOne({ email: CandidateData.email })

            if (CandidateExist) {
                return res.status(400).json({
                    error: "Candidate already exists",
                    Candidate: CandidateExist
                })
            }
            const Candidate = new Candidate(CandidateData);
            Candidate.save()
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