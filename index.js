const express = require('express')
const app = express();
const moongose = require('mongoose')
const dotenv = require('dotenv')
const  authRouter = require('./routers/auth')
dotenv.config();

moongose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log('DBConnection Successfull!!')
}).catch((error)=>{
    console.log(error);
})

app.use(express.json())

app.use('/api/auth',authRouter)


app.listen(process.env.PORT || 5000,()=>{
    console.log('Backend is running')
})