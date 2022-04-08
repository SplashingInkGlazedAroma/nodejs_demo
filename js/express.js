const express=require('express')
const router=require('./router')

const app=express()

const mv=function (req,res,next){
    console.log("这是一个全局中间件")
    next()
}

app.use(mv)
app.use(router)
app.use(express.static('../public'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.post('/json',(req,res)=>{
    console.log(req.body)
    res.send(req.body)
})

app.post('/encoded',(req,res)=>{
    console.log(req.body)
    res.send(req.body)
})

app.get('/error',(req,res)=>{
    throw new Error("服务器发生未知错误！！")
})

//错误级别中间件必须在所有路由之后
app.use(function(err,req,res,next){
    console.log("出错啦",err.message)
    res.send(err.message)
})

app.listen(8220,'127.0.0.1',()=>{
    console.log("Server is running at http://127.0.0.1:"+8220)
})