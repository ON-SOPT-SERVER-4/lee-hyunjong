// console.log('start');
// setTimeout(()=>{
//     console.log('wait 3second')
// },3000)
// console.log('end')
var a;
var cnt=1
console.log('start');
while(cnt<3){
    setTimeout(()=>{
        console.log(a)
    },0)
    cnt+=1;
}
function fun(){
    a=10;
}
console.log('end')

fun()