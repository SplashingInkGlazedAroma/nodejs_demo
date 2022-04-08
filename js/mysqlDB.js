const mysql=require('mysql')

const db=mysql.createPool({
    host:'127.0.0.1',
    port:3306,
    user:'root',
    password:'15320721xzw12340',
    database:'test'
})

db.query('select * from user',(err,results)=>{
    if(err){
        console.log(err.message)
    }
    console.log(results)
})

/*const user={name:"徐念凉",age:12,sex:"女"}
const sqlStr="insert into user(name,age,sex) values(?,?,?)"
db.query(sqlStr,[user.name,user.age,user.sex],(err,results)=>{
    if(err){
        console.log(err.message)
    }
    console.log(results)
    if(results.affectedRows===1){
        console.log("数据插入成功")
    }
})*/

//插入数据的便捷写法
/*const user2={name:"徐骁",age:82,sex:"男"}
const sqlStr2="insert into user set ?"
db.query(sqlStr2,user2,(err,results)=>{
    if(err){
        console.log(err.message)
    }
    console.log(results)
    if(results.affectedRows===1){
        console.log("数据插入成功")
    }
})*/

/*
const joker={id:14,name:"林如芬",age:35,sex:"女"}
const updateStr="update user set name=?,age=?,sex=? where id=?"
db.query(updateStr,[joker.name,joker.age,joker.sex,joker.id],(err,result)=>{
    if(err){
        console.log(err.message)
    }
    if(result.affectedRows===1){
        console.log("更新数据成功")
    }
})
*/

//更新数据便捷写法
/*const knight={id:2,name:"袁雪妃",age:30,sex:"女"}
const updateStr="update user set ? where id=?"
db.query(updateStr,[knight,knight.id],(err,result)=>{
    if(err){
        console.log(err.message)
    }
    if(result.affectedRows===1){
        console.log("更新数据成功")
    }
})*/

/*const deleteStr="delete from user where id=?"
db.query(deleteStr,7,(err,results)=>{
    if(err){
        console.log(err.message)
    }
    if(results.affectedRows===1){
        console.log("删除数据成功")
    }
})*/
