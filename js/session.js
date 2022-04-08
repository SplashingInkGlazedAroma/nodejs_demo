const express=require('express')
const session=require('express-session')
const jwt=require('jsonwebtoken')
const expressJWT=require('express-jwt')
const bcrypt=require('bcryptjs')
const Joi=require('joi')
const expressJoi = require('@escook/express-joi')
const mysql=require('mysql')

const db=mysql.createPool({
    host:'127.0.0.1',
    port:3306,
    user:'root',
    password:'15320721xzw12340',
    database:'test'
})

const app=express()
const secretKey="king"

app.use(session({
    secret:'king',
    resave:false,
    saveUnintialized:false
}))

//解析token字符串
app.use(expressJWT({
    secret:secretKey,
    algorithms:['HS256'],
    credentialsRequired:true  //true 校验,false 不校验，
}).unless({
    path:[/^\/api\//]
}))

//解析application/x-form-urlencoded表单数据
app.use(express.urlencoded({extended:false}))

app.use(function (req,res,next){
    res.cc=function (err,status=1){
        return res.send({
            status,
            message: err instanceof Error?err.message:err
        })
    }
    next()
})

const policeSchema={
    body:{
        username:Joi.string().min(3).max(12).required(),
        password: Joi.string().pattern(/^[\S]{6,12}$/).required()
    }
}

const passwordSchema={
    body:{
        oldPassword:Joi.string().min(3).max(12).required(),
        newPassword:Joi.not(Joi.ref('oldPassword')).concat(Joi.string().min(3).max(12).required())

    }
}

app.post('/api/register',expressJoi(policeSchema),(req,res)=>{
    const username=req.body.username
    const queryStr='select * from police where username=?'

    db.query(queryStr,username,(err,results)=>{
        if(err){
            return res.cc(err)
        }
        if(results.length>0){
            return res.cc("用户名已经被注册",1)
        }

        const insertStr='insert into police(username,password) values(?,?)'

        const password=bcrypt.hashSync(req.body.password,5)

        db.query(insertStr,[username,password],(err,results)=>{
            if(err){
                return res.cc(err)
            }
            if(results.affectedRows===1){
                res.send({
                    status:0,
                    message:'注册成功'
                })
            }
        })
    })
})

app.post('/api/login',(req,res)=>{
    const {username,password}=req.body
    const sqlStr="select * from police where username=?"

    db.query(sqlStr,username,(err,results)=>{
        if(err){
            return res.cc(err)
        }
        if(results.length!=1){
            return res.cc('用户不存在',1)
        }
        const flag=bcrypt.compareSync(password,results[0].password)
        if(!flag){
            return  res.cc("密码不正确",1)
        }
        req.session.user=req.body
        req.session.isLogin=true

        // 注意默认情况 Token 必须以 Bearer+空格 开头
        const tokenStr='Bearer '+jwt.sign({username:username},secretKey,{expiresIn:'120s'})
        console.log(tokenStr)
        res.send({
            status:0,
            message:'登录成功',
            token:tokenStr
        })
    })
})

app.get('/api/getUser',(req,res)=>{
    if(!req.session.isLogin){
        return res.cc("用户未登录！！",1)
    }
    res.send({
        status:0,
        message:'获取用户信息成功',
        user:{
            username:req.session.user.username,
            password:req.session.user.password
        }
    })
})

app.get('/api/logout',(req,res)=>{
    req.session.destroy()
    res.send({
        status:0,
        message:'成功登出'
    })
})


app.get('/admin/user',(req,res)=>{
    res.send(req.user)
})

app.post('/api/updatePolice',expressJoi(policeSchema),(req,res)=>{
    const username=req.body.username
    const password=bcrypt.hashSync(req.body.password,5)

    const updateStr='update police set username=?, password=?  where id=?'
    db.query(updateStr,[username,password,req.body.id],(err,results)=>{
        if(err){
            return res.cc(err)
        }
        if(results.affectedRows===1){
            return res.send({
                status:0,
                message:'更新数据成功'
            })
        }
        res.cc('更新数据失败',1)
    })
})

app.post('/api/updatePassword',expressJoi(passwordSchema),(req,res)=>{
    const password=bcrypt.hashSync(req.body.newPassword,5)
    const updateStr='update police set password=? where id=?'

    db.query(updateStr,[password,12],(err,results)=>{
        if(err){
            return res.cc(err)
        }
        if(results.affectedRows===1){
            return res.send({
                status:0,
                message:'更新密码成功'
            })
        }
        res.cc('更新密码失败',1)
    })
})

//认证失败的中间件
app.use(function (err, req, res, next) {
    console.log(err)
    if (err.name === 'UnauthorizedError') {
        return res.status(401).send('invalid token')
    }
    //Joi 参数校验失败
    if (err instanceof Joi.ValidationError) {
        return res.cc(err)
    }
    res.cc(err,500)
})

app.listen('9462','127.0.0.1',()=>{
    console.log("Server is running at http://127.0.0.1:9462")
})