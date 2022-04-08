const express=require('express')
const app=express()

app.use(express.urlencoded({extended:false}))

//jsonp接口必须在cors之前才是jsonp接口
app.get('/api/jsonp',(req,res)=>{
    const funName=req.query.callback
    const data=JSON.stringify({"name":"唐三","age":26,"sex":"男"})
    const scriptStr="${funName}(${data})"
    console.log(scriptStr,funName)
    res.send(scriptStr)
})

const cors=require('cors')
app.use(cors())

const router=require('./apiRouter')
app.use('/api',router)


app.listen("8744","127.0.0.1",()=>{
    console.log("Server is running at http://127.0.0.1:8744")
})