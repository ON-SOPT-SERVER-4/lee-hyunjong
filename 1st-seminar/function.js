var arr2 = new Array(1,2,3,4,5);
console.log(arr2);
console.log(typeof arr2);

var arr3= ['현종',1,2,3,null,{name : 'hj',age:25}]
console.log(arr3);
console.log(typeof arr3);

/////////////////////////////////////////////
var arr = [1,2,3,4]
arr.push('이현종')
console.log('arr push : ',arr )
arr.pop()
console.log('arr pop : ',arr)

///////shift, unshift
arr.unshift('first item') //unshift 배열 맨 앞에 해당값 추가
console.log('arr unshift : ',arr);
arr.shift(); //shift 배열 맨 앞에 값 제거
console.log('arr shift : ',arr);

console.log('arr.include(4) : ',arr.includes(4));
console.log('arr.include(1000) : ',arr.includes(1000));

//indexOf
console.log('arr.indexOf(4) : ',arr.indexOf(4)); //indexof는 해당 값이 있는 배열의 index출력
console.log('arr.indexOf(100) : ',arr.indexOf(100));//해당값이 없다면 -1출력


//join
var location = ["서울","대전","대구","부산"]
console.log(location.join('-> '))
console.log('location reverse : ',location.reverse().join('-> '))


console.log('==============================================')
var serverPart = ["김현기", "석영현", "강준우", "송정우", "신지혜", "이영은", "이진호"];
let serverIndexStr = '서버파트 여러분 번호 한번 세겠습니다. "';
let serverPartMemberNameStr = '서버파트 여러분 이름 한번씩만 불러주세요~ "'

for(let item in serverPart){    //in은 각 배열값의 index
  serverIndexStr += item + '! ';
}
console.log(serverIndexStr);

for(let item of serverPart) {//of는 각 배열값의 value값
  serverPartMemberNameStr += item + '! ';
}
console.log(serverPartMemberNameStr);

serverPart.forEach( item => {
  console.log(item);//각 값들
})