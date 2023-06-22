const express = require('express')
const {addCandidate, listCandidates} = require('../controllers/candidate.controller')
const router = express.Router();

/**
 * @swagger
 * /api/candidates/create:
 *   post:
 *     summary: Create Candidate
 *     description: Creating a new candidate
 *     responses:
 *       '201':
 *         description: Candidate Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Candidate'
 * /api/candidates/list:
 *   get:
 *     summary: Get Candidates
 *     description: Getting all existing candidates
 *     responses:
 *       '200':
 *         description: Request Ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Candidate'
 */
router.post('/create', addCandidate);
router.get('/list', listCandidates);

module.exports = router;
