const fs=require('fs')

fs.readFile('../file/score.txt','utf-8',function (err,data){
    if(err){
        return console.log("文件读取失败！",err.message)
    }
    console.log(data)
    let scoreArr=data.split(',')
    scoreArr=scoreArr.join('\r\n')
    fs.writeFile('../file/score_copy.txt',scoreArr,function (err){
        if(err){
            return console.log("文件写入失败",err.message)
        }
        console.log("文件写入成功")
    })
})