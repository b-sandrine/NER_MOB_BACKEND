const {getVotes, updateVotes} =  require('../controllers/votes.controller')
const express = require('express')

const router = express.Router();

router.put('/update', updateVotes);
router.get('/votes',getVotes)

module.exports = router;