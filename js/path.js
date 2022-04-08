const path=require('path')

const myPath=path.join('a','/b/c','../','./d','/e')
console.log(myPath)

const fullPath='/king/joker/index.html'
console.log(path.basename(fullPath))
console.log(path.basename(fullPath,'.html'))
console.log(path.extname(fullPath))