const express=require('express')
const bodyParser=require('./customerBodyParser')

const app=express()
app.use(bodyParser)

app.post('/user',(req,res)=>{
    res.send(req.body)
})

app.listen("9455","127.0.0.1",function (){
    console.log("Server is running at http://127.0.0.1:9455")
})