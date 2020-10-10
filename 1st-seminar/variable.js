var variableVar = "123"; //var타입은 재선언 가능
variableVar = "321";
console.log(' !variableVar : ', `${variableVar}`);

const variableConst = "123"; //const타입은 재선언 불가능
// variableConst = "321";
console.log(' !variableConst : ', `${variableConst}`);

const obj = {

}

obj.name = "leehyunjong";
console.log(' obj : ',obj)