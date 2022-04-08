const fs=require('fs')

fs.writeFile("../file/job.txt",'进击的巨人',function (err){
    if(err){
        return console.log("文件写入失败",err.message)
    }
    console.log("文件写入成功",err)
})