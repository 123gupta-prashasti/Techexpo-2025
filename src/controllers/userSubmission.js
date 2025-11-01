const Problem = require('../models/problem');
const Submission = require('../models/submission');
const {getLanguageById,submitBatch,submitToken} = require('../utils/problemUtility');
const submitCode = async(req,res) => {
    // 
    try{
        const userId = req.result._id;
        const problemId = req.params.id;

        const {code, language} = req.body;

        if(userId && problemId && code && language){
            // 
           return res.status(400).send("Some field missing");
        }

        // Fetch the problem from DB
        const problem = await Problem.findById(problemId);
        // testcases(Hidden)

        // kya apne submission store kar du pehle...
const submittedResult  = await Submission.create({
            userId,
            problemId,
            code,
            language,
            testCasesPassed:0,
            status: 'pending',
            testCasesTotal: Problem.hiddenTestCases.length
        })

        // judge0 ko ab code submit karna hai

        const languageId = getLanguageById(language);

        const submissions = Problem.hiddenTestCases.map((testcase) => ({
            source_code: code,
            language_id: languageId,
            stdin: testcase.input,
            expected_output: testcase.output
        }));

const submitResult = await submitBatch(submissions)
const resultToken = submitResult.map((value)=> value.token)
const testResult = await submitToken(resultToken);

        // submittedResult ko update karo
        let testCasesPassed = 0;
        let runtime = 0;
        let status = 'accepted';
        let errorMessage = null;

        for(const test of testResult){
            if(test.status_id===3){
                testCasesPassed++;
                runtime += parseFloat(test.time);
                memory = Math.max(memory, test.memory);
            }
            else{
                if(test.status_id===4){
                    status = 'error'
                    errorMessage = test.stderr;
                }
                else{
                    status = 'wrong'
                    errorMessage = test.stderr;
                }
            }
        }


        // store the result in database in submission
        submittedResult.status = status;
        submittedResult.testCasesPassed = testCasesPassed;
        submittedResult.runtime = runtime;
        submittedResult.errorMessage = errorMessage;
        submittedResult.memory = memory;

        await submittedResult.save();

        // problemid ko insert renge userchema me if it is already present there

        if(!req.result.problemSolved.includes(problemId)){
            req.result.problemSolved.push(problemId);
            await req.result.save();
        }

        res.status(200).send(submittedResult);
    }
    catch(err){         

        res.status(500).send("Internal Server Error"+err);


    }
}

const runCode = async(req,res) => {
        try{
        const userId = req.result._id;
        const problemId = req.params.id;

        const {code, language} = req.body;

        if(userId && problemId && code && language){
            // 
           return res.status(400).send("Some field missing");
        }

        // Fetch the problem from DB
        const problem = await Problem.findById(problemId);
        // testcases(Hidden)

        // judge0 ko ab code submit karna hai

        const languageId = getLanguageById(language);

        const submissions = Problem.visibleTestCases.map((testcase) => ({
            source_code: code,
            language_id: languageId,
            stdin: testcase.input,
            expected_output: testcase.output
        }));

const submitResult = await submitBatch(submissions)
const resultToken = submitResult.map((value)=> value.token)
const testResult = await submitToken(resultToken);

        res.status(200).send(testResult);
    }
    catch(err){         

        res.status(500).send("Internal Server Error"+err);


    }
}

module.exports = { submitCode, runCode };