const express=require('express')
const router=express.Router()


router.get('/getUser',(req,res)=>{
    res.send({
        "name":"李星云",
        "age":28,
        "sex":"男"
    })
})

router.post('/postUser',(req,res)=>{
    res.send("请求成功")
})

router.get('/query',(req,res)=>{
    console.log(req.query)
    res.send(req.query)
})

router.get('/params/:id',(req,res)=>{
    console.log(req.params)
    res.send(req.params)
})

const king=function (req,res,next){
    console.log("这是一个局部中间件")
    next()
}
router.get('/hello',king,(req,res)=>{
    res.send("这是局部中间件生效")
})

module.exports=router