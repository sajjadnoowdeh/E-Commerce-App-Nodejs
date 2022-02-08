const express = require('express')
const app = express();

const moongose = require('mongoose')
moongose.connect('mongodb+srv://noowdeh:09365679101@cluster0.820i4.mongodb.net/shop?retryWrites=true&w=majority')
.then(()=>{
    console.log('DBConnection Successfull!!')
}).catch((error)=>{
    console.log(error);
})
app.listen(5000,()=>{
    console.log('Backend is running')
})