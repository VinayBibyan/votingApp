const express = require('express');
const router = express.Router();
const candidate = require('../models/candidateSchema');
const {jwtAuthMiddleware, generateToken} = require('../jwt')
const user = require('../models/userSchema')

//to get all candidates data to the admin
router.get('/CandidateList',async (req,res)=>{
    try {
        const data = await candidate.find();
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).send({error: 'can not show data'})
    }
})

//to add new candidate
router.post('/new', jwtAuthMiddleware, async(req, res)=>{
    try {
        const data = req.body;
        if (data.age < 18) {
            return res.status(400).json({ error: "Candidate must be at least 18 years old" });
        }
        const newCandidate = new candidate(data);
        const savedCandidate = await newCandidate.save();

        res.status(200).json({response: savedCandidate});
    } catch (error) {
        console.log()
        res.status(500).send(error)
    }
})

//to update candidate data
router.put('/:candidateID', jwtAuthMiddleware, async(req, res)=>{
    try {
        const candidateID = req.params.candidateID;
        const updatedCandidateData = req.body;

        const response = await candidate.findByIdAndUpdate(candidateID, updatedCandidateData);

        if(!response ){
            return res.status(403).json({error: "candidate not found"});
        }

        console.log('data updated');
        res.status(200).json({message: 'data updated'})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
})

//to delete any candidate
router.delete('/:candidateID', jwtAuthMiddleware, async(req, res)=>{
    try {
        const candidateID = req.params.candidateID;

        const response = await candidate.findByIdAndDelete(candidateID);

        if(!response ){
            return res.status(404).json({error: "candidate not found"});
        }

        console.log('candidate deleted');
        res.status(200).json({message: 'candidate deleted'})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
})

module.exports = router;