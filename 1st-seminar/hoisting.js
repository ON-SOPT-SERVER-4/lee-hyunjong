hoistFunction1('test1');
hoistFunction2('test2');

const hoistFunction1 = (test1) =>{
    console.log('1 : ',test1)
}

function hoistFunction2(test2){
    console.log('2 : ',test2)
}