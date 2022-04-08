const fs=require('fs')

fs.readFile('../file/hello.txt','utf-8', (err,data)=>{
    if(err){
        return console.log("文件读取失败！",err.message)
    }
    console.log(data.toString())
})