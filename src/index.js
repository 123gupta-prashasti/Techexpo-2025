const express = require('express')
const app = express()
require('dotenv').config();
const main = require('./config/db')
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/userAuth');
const redisClient = require('./config/redis');

// (async () => {
//   try {
//     await redisClient.connect();
//     console.log("Redis Connected Successfully!");
//   } catch (err) {
//     console.error(" Redis Connection Failed:", err);
//   }
// })();


app.use(express.json());
app.use(cookieParser());

app.use('/user',authRouter);

const InitalizeConnection = async () =>{
    try{
        await Promise.all([main(),redisClient.connect()])
        console.log("DB Connected");

        app.listen(process.env.PORT, ()=>{
            console.log("server listening at port no. :"+process.env.PORT);
})
    }
    catch(err){
        console.log("Error: "+err);
    }
}


InitalizeConnection();
