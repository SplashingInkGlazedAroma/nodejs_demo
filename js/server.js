const http = require('http')
const fs = require('fs')
const ejs=require('ejs')
const path=require('path')

const config = require('./server_config').config

const server = http.createServer((req, res) => {
        switch (req.url) {
            case '/':
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/plain;charset=UTF-8');
                res.end('这是根路径');
                break;
            case '/about' :
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/plain;charset=UTF-8');
                res.end("这是关于界面");
                break;
            case '/readFile':
                fs.readFile(path.join(__dirname,'\\..\\page\\index.html'), 'utf-8', function (error, data) {
                    if (error) {
                        res.statusCode = 404;
                        res.setHeader('Content-Type', 'text/plain;charset=UTF-8');
                        res.end("没有找到相关文件")
                    } else {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'text/html;charset=UTF-8');
                        res.end(data)
                    }
                });
                break;
            case '/readFileEjs':
                let template=fs.readFileSync(path.join(__dirname,'\\..\\ejs\\hello.ejs'),'utf-8');
                let data=ejs.render(template,{
                    title:'ejs',
                    content:'这是ejs渲染后的内容'
                });
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html;charset=UTF-8');
                res.end(data)
                break;
            default:
                res.end("Not found");
                break;
        }
    }
)

server.listen(config.port, config.host, () => {
    console.log('Server is running at http://' + config.host + ":" + config.port)
})