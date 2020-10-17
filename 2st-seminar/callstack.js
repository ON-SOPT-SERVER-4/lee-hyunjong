function wakeup(){
    wash();
    console.log('일어나기')
}

function wash(){
    breakfast();
    console.log('씻기')
}

function breakfast(){
    console.log('밥먹기')
    throw new Error('콜스택에서 에러찾기')
}

wakeup()
