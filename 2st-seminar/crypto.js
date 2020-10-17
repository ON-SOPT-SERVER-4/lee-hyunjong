const crypto = require('crypto')

const password = '123456';
const password2 = '123123';
const base64 = crypto.createHash('sha512').update(password).digest('base64');
const base642 = crypto.createHash('sha512').update(password2).digest('base64')
const hex = crypto.createHash('sha512').update(password).digest('hex')

console.log(base64)
console.log(base642)
console.log(hex)