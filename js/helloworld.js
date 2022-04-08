let str='Hello World'
console.log(str)

const os=require('os')
console.log(os.hostname())

const request=require('request')

request({
    url:'https://www.baidu.com',
    json:true
},    (error,response,body)=>{
    console.log(error,response);
    console.log(JSON.stringify(body,null,2))
})

const https=require('https')

const url='https://www.lagou.com'
https.get(url,function (res){
    let html='';
    res.on('data',function (data){
        html+=data;
    })
    res.on('end',function (){
        console.log(html)
    })
    res.on('error',function (err){
        console.log(err)
    })
})