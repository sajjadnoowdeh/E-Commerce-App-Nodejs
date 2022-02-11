const express = require('express')
const app = express();
const moongose = require('mongoose')
const dotenv = require('dotenv')
const  authRouter = require('./routers/auth')
const userRouter = require('./routers/user')
const productRouter= require('./routers/product')
const cartRouter = require('./routers/cart')
const orderRouter= require('./routers/order')
const stripeRouter= require('./routers/stripe')
const cors = require('cors')
dotenv.config();

moongose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log('DBConnection Successfull!!')
}).catch((error)=>{
    console.log(error);
})
app.use(cors())
app.use(express.json())

app.use('/api/auth',authRouter)
app.use('/api/users',userRouter)
app.use('/api/products',productRouter)
app.use('/api/carts',cartRouter)
app.use('/api/orders',orderRouter)
app.use('/api/checkout',stripeRouter)
app.listen(process.env.PORT || 5000,()=>{
    console.log('Backend is running')
})