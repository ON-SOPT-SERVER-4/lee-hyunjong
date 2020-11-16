const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const util = require('../../modules/util');
const responseMessage = require('../../modules/responseMessage');
const statusCode = require('../../modules/statusCode');
const { User } = require('../../models');
const userController = require('../../controller/userController');

router.post('/signup',userController.signup)

router.post('/signin', async (req, res) => {
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE))
    }
    try{
        const finduser = await validateEmailAndPW(email,password,res)
        return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.SIGN_IN_SUCCESS,{id:finduser.id,email:finduser.email,userName:finduser.userName}))
    }catch(err){
        console.error(err)
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,responseMessage.SIGN_IN_FAIL))
    }
})

router.get('/', async (req, res) => {
    try{
        const users = await User.findOne({
            attributes:['id','email','userName'],
        });
        return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.MEMBER_READ_ALL_SUCCESS,users));
    }catch(error){
        console.error(error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,responseMessage.MEMBER_READ_ALL_SUCCESS));
    }
})

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    const user = await validateId(id,read,res)
    return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.MEMBER_READ_SUCCESS,user))
})

router.post('/update/:id',async(req,res)=>{
    const {id} = req.params;
    const {email,userName,password} = req.body;
    if(!email||!userName||!password){
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE))
    }
    try{
        const user = await validateId(id,'update',res);
        const hashedPassword = crypto.pbkdf2Sync(password,user.dataValues.salt,10000,64,'sha512').toString('base64');
        const updateUser = await User.update({...User,email:email,userName:userName,password:hashedPassword},
            {where:{id:id}},{attributes:['id','userName','email']})
        console.log(updateUser)
        return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.MEMBER_UPDATE_SUCCESS,updateUser))
    }catch(error){
        console.error(error)
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,responseMessage.MEMBER_UPDATE_FAIL))
    }
})

router.delete('/delete/:id', async(req,res)=>{
    const {id} = req.params;
    try{
        const user = await validateId(id,'delete',res)
        await User.destroy({
            where:{
                id:user.id
            }
        })
        return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.MEMBER_DELETE_SUCCESS))
    }catch(error){
        console.error(error)
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,responseMessage.MEMBER_DELETE_FAIL))
    }
})

const validateEmailAndPW=async (email,password,res)=>{
    const user = await User.findOne({
        where:{
            email : email
        }
    })
    if(user == null){
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.NO_USER));
    }
    
    const hashedPassword = crypto.pbkdf2Sync(password,user.dataValues.salt,10000,64,'sha512').toString('base64')
    if(hashedPassword != user.dataValues.password){
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.MISS_MATCH_PW));
    }
    return user
}

const validateId = async(id,type,res)=>{
    var user={}
    console.log(type)
    type !='update' ?
    user = await User.findOne({
        where:{
            id:id
        },
        attributes:['id','email','userName']
    }) :
    user = await User.findOne({
        where:{
            id:id
        }
    }) 
    if(user == null){
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.NO_USER));
    }
    return user
}

module.exports = router;