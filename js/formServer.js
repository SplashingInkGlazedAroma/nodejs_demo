const http = require('http')
const fs = require('fs')
const ejs=require('ejs')
const qs=require('query-string')

const config = require('./server_config').config

let posts=[]
let template=fs.readFileSync(__dirname+'\\..\\ejs\\forum.ejs','utf-8')

const server=http.createServer((req,res)=>{
    if(req.method==='POST'){
        req.data='';
        req.on('readable',function (){
            let info=req.read();
            if(info){
                req.data+=info
            }
        });
        req.on('end',function (){
            let query=qs.parse(req.data);
            posts.push(query.content);
            showForm(posts,res);
        })
    }else{
        showForm(posts,res);
    }
})


function showForm(p_posts,res){
    let data=ejs.render(template,{
        title:'我的论坛',
        posts:p_posts
    });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html;charset=UTF-8');
    res.end(data)
}

server.listen(config.port, config.host, () => {
    console.log('Server is running at http://' + config.host + ":" + config.port)
})