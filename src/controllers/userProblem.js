const {getLanguageById,submitBatch} = require('../utils/problemUtility');
const Problem = require('../models/problem');
const Submission = require('../models/submission');


const createProblem = async (req, res) => {
    const {title, description, difficulty,tags,visibleTestCases,hiddenTestCases,startCode,referenceSolution,problemCreator} = req.body;

    try{
        for(const {language,completeCode} of referenceSolution){

        // source_code:
        // language_id:
        // stdin:
        // expected_output:

        const languageId = getLanguageById(language);
        
const submissions = visibleTestCases.map((testcase) => ({
            source_code: completeCode,
            language_id: languageId,
            stdin: testcase.input,
            expected_output: testcase.output
}));

const submitResult = await submitBatch(submissions);

const resultToken = submitResult.map((value)=> value.token);

    //    dce7bbc5-a8c9-4159-a28f-ac264e48c371,1ed737ca-ee34-454d-a06f-bbc73836473e,9670af73-519f-4136-869c-340086d406db

const testResult = await submitToken(resultToken);

console.log(testResult);

for(const test of testResult){
        if(test.status_id!==3){
            return res.status(400).send("Error Occured");
        }
    }
 }

//  we can store it in database

   const userProblem = await Problem.create({
            ...req.body,
            problemCreator: req.result._id
        });

    res.status(201).send("Problem Saved Successfully");
}
catch(err){
        res.status(400).send("Error"+err);
    }
}

const updateProblem = async (req, res) => {
    const {id} = req.params;
    const {title, description, difficulty,tags,visibleTestCases,hiddenTestCases,startCode,referenceSolution,problemCreator

    } = req.body;

    try{

        if(!id){
            return res.status(400).send("Missing ID field");
        }

        const DsaProblem = await Problem.findById(id);
        if(!DsaProblem){
            return res.status(404).send("ID is not present in server");
        }

for(const {language,completeCode} of referenceSolution){

        // source_code:
        // language_id:
        // stdin:
        // expected_output:

    const languageId = getLanguageById(language);
            
    const submissions = visibleTestCases.map((testcase) => ({
            source_code: completeCode,
            language_id: languageId,
            stdin: testcase.input,
            expected_output: testcase.output
}));

const submitResult = await submitBatch(submissions);

const resultToken = submitResult.map((value)=> value.token);

    //    dce7bbc5-a8c9-4159-a28f-ac264e48c371,1ed737ca-ee34-454d-a06f-bbc73836473e,9670af73-519f-4136-869c-340086d406db

const testResult = await submitToken(resultToken);


for(const test of testResult){
        if(test.status_id!==3){
            return res.status(400).send("Error Occured");
        }
    }
 }

   await Problem.findByIdAndUpdate(id,{...req.body},{runValidators:true , new:true});

   res.status(200).send(newProblem);

}
    catch(err){
        res.status(404).send("Error: "+err);
    }

}


const deleteProblem = async (req, res) => {
    const {id} = req.params;    
    try{
        if(!id)
            return res.status(400).send("ID is Missing");

        const deletedProblem = Problem.findByIdAndDelete(id);

        if(!deleteProblem)
            return res.status(404).send("Problem is Missing")

       res.status(200).send("successfully Deleted")
    }
    catch(err){
        res.status(500).send("Error: "+err);
    }
}


const getProblemById = async(req,res) => {
    const {id} = req.params;    
    try{
        if(!id)
            return res.status(400).send("ID is Missing");

const getProblem = await Problem.findById(id).select('_id title description difficulty tags visibleTestCases startCode referenceSolution');

        if(!getProblem)
            return res.status(404).send("Problem is Missing")

       res.status(200).send("getProblem")
    }
    catch(err){
        res.status(500).send("Error: "+err);
    }
}

const getAllProblem = async(req,res) => {
try{
  const getProblem = await Problem.find({}).select('_id title difficulty tags');

        if(!getProblem.length == 0)
            return res.status(404).send("Problem is Missing")

       res.status(200).send("getProblem")
    }
    catch(err){
        res.status(500).send("Error: "+err);
    }
}

const solvedAllProblembyUser = async (req,res) => {
    try{

        const userId = req.result._id;
        const user = await user.findById({userId}).populate({
            path:"problemsSolved",
            select:"_id title difficulty tags"
        });
        res.status(200).send(  count);

    }
    catch{
        res.status(500).send("Server Error");
    }
}

const submittedProblem = async (req,res) => {
    try{

        const userId = req.result._id;
        const problemId = req.params.pid;
        
        const ans = Submission.find({userId, problemId});

        if(ans.length == 0)
            res.status(200).send("No Submission is Present");

        res.status(200).send(ans);  
    }
    catch(err){

        res.status(500).send("Internal Server Error");

    }
}

module.exports = {createProblem,updateProblem,deleteProblem,getProblemById, getAllProblem,solvedAllProblembyUser}; 


