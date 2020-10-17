const 자퇴 = false;
const middleSchool = () => new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve('중학교')
    },1000)
})

const highSchool = school => new Promise((resolve, reject)=>{
    if(자퇴){
        setTimeout(()=>{
            reject(new Error('에러!'))
        },1000)
    }else{
        setTimeout(()=>{
            resolve(`${school}=>고등학교`)
        },1000)
    }
})

const univ = school => new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve(`${school} => 대학교`)
    },1000)
})

async function func1(){
    try{
        const middle = await middleSchool()
    const high = await highSchool(middle)
    const un = await univ(high)
    console.log(un)
    }catch(err){
        console.error(err)
    }
}
func1()