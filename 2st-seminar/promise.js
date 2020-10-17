const getNumber = new Promise((resolve,reject)=>{
    console.log('getNumber!')
    setTimeout(()=>{
        resolve(100)
    },1000)
})

getNumber
.then((value)=>{
    console.log(value)
    return value*5
})
.then((value)=>{
    console.log(value)
    return +1
})
.then((value)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(value*1000)
        },2000)
    })
})
.then((value)=> console.log(value))