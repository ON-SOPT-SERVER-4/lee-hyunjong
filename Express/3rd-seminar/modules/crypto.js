const crypto = require('crypto')

module.exports={
    encrypt: async(password)=>{
        return new Promise((resolve,reject)=>{
            try{
                const salt = crypto.randomBytes(64).toString('base64')
                crypto.pbkdf2(password, salt,100000,64,'sha512',(err,key)=>{
                    if(err) throw err
                    resolve({
                        salt:salt,
                        hashed:key.toString('base64')
                    })
                })
            }catch(err){
                reject(err)
            }
        })
    }
}