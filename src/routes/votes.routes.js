const {getVotes, updateVotes, createVotes} =  require('../controllers/votes.controller')
const express = require('express')

const router = express.Router();

router.post('/create',createVotes);
router.put('/update', updateVotes);
router.get('/number/:id',getVotes)

module.exports = router;