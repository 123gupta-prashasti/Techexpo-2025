const axios = require('axios');

const getLanguageById = (lang) => {
    const language = {
        "c++": 54,
        "java": 62,
        "javascript": 63,
    }
    return language[lang.toLowerCase()];
}


const submitBatch = async (submissions) => {



const waiting = async(timer)=> {
  setTimeout(()=>{
    return 1;
  },timer);
}
const submitToken = async (resultToken) => {

}

const options = {
  method: 'POST',
  url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
  params: {
    tokens: resultToken.join(','),
    base64_encoded: 'true',
    fields: '*'
  },
  headers: {
    'x-rapidapi-key': JUDGE0_API_KEY,
    'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
    'Content-Type': 'application/json'
  },
  data: {
    submissions
  }
};

async function fetchData() {
	try {
		const response = await axios.request(options);
		return response.data;
	} catch (error) {
		console.error(error);
	}
}

while(true){


const result =  await fetchData();

const IsResultObtained = result.submissions.every((r)=>r.status_id>2);

if(IsResultObtained)
  return result.submissions;

await waiting(1000);

}

}

const waiting = async(timer)=> {
  setTimeout(()=>{
    return 1;
  },timer);
}
const submitToken = async (resultToken) => {

const options = {
  method: 'GET',
  url: 'https://judge0-ce.p.rapidapi.com/submissions/2e979232-92fd-4012-97cf-3e9177257d10',
  params: {
    tokens: resultToken.join(','),
    base64_encoded: 'false',
    fields: '*'
  },
  headers: {
    'x-rapidapi-key': 'c545610eb0mshfe29cc1f9ccd9d6p1474f3jsndf44b111f1a8',
    'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
  }
};

async function fetchData() {
	try {
		const response = await axios.request(options);
    return response.data;
	} catch (error) {
		console.error(error);
	}
}

while(true){

const result = await fetchData();
const IsResultObtained = result.submissions.every((r)=>r.status_id>2);

if(IsResultObtained)
  return result.submissions;  

await waiting(1000);

}

}


module.exports = {getLanguageById,submitBatch,submitToken};

