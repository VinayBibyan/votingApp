const express = require('express');
const router = express.Router();
const user = require('../models/userSchema');
const {jwtAuthMiddleware, generateToken} = require('../jwt');
const candidate = require('../models/candidateSchema');

const checkAdmin = async(userID)=>{
    try {
        const response = await user.findById(userID);
        if(response.role === 'admin'){
            return true;
        }
    } catch (error) {
        console.log("yhh wala section")
        return false
    }

}

//to get list of all the candidates 
router.get('/list',async (req,res)=>{
    try {
        const data = await candidate.find().select('name party');;
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).send({error: 'can not show data'})
    }
})

//to vote for any candidate
router.post('/voteTo/:candidateId', jwtAuthMiddleware, async(req, res)=>{

    userID = req.user.id;
    candidateId = req.params.candidateId;
    console.log(userID)
    console.log(candidateId)

    try {
        // Find the Candidate document with the specified candidateID
        const candidateData = await candidate.findById(candidateId);
        if(!candidateData){
            return res.status(404).json({ message: 'Candidate not found' });
        }

        const voter = await user.findById(userID);
        //check if voter exist
        if(!voter){
            res.status(404).json({error: 'voter not found'});
        }
        //check whether user has already voted or not
        if(voter.isVoted){
            res.status(404).json({error: 'voter has already voted'});
        }
        //check if user is admin or not
        if(voter.role === 'admin'){
            res.status(404).json({error: 'admin can not vote'});
        }

        //update the candidate to record the vote
        candidateData.votes.push({user: userID});
        candidateData.voteCount++;
        await candidateData.save();

        //update the user
        voter.isVoted = true;
        await voter.save();
        
        return res.status(200).json('vote recorded successfully');
    } catch (error) {
        console.log(error);
        res.status(500).send({error: 'some error has occured'})
    }
})

//vote count of any party
router.get('/count',async (req,res)=>{
    try {
        const response = await candidate.find().sort({voteCount: 'desc'});

        const record = response.map((data)=>{
            return{
                party: data.party,
                count: data.voteCount
            }
        })
        return res.status(200).json(record);
    } catch (error) {
        console.log(error);
        return res.status(500).send({error: 'can not show data'})
    }
})

module.exports = router;