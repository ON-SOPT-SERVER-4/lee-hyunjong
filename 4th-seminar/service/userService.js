const {User} = require('../models')
const crypto = require('crypto')

module.exports={
    emailCheck:async(email)=>{
        try{
            const alreadyEmail = await User.findOne({
                where: {
                    email: email,
                }
            });
            console.log(alreadyEmail)
            return alreadyEmail;
        }catch(error){
            throw error
        }
    },
    signup:async(email,password,userName)=>{
        try{
            const salt = crypto.randomBytes(64).toString('base64');
            const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');
            const user = await User.create({
                email: email,
                password: hashedPassword,
                userName: userName,
                salt: salt,
            });
            return user
        }catch(error){
            throw error
        }
    }
}