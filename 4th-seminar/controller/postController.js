const util = require('../modules/util')
const responseMessage = require('../modules/responseMessage')
const statusCode = require('../modules/statusCode');
const { User,Post,Like } = require('../models');

module.exports={
    createPost: async(req,res)=>{
        console.log('multer파일확인 : ',req.file)
        const {title,contents,userId} = req.body;
        const postImageUrl = req.file.location;
        try{
            const post = await Post.create({title,contents,UserId:userId,postImageUrl})
            return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.CREATE_POST_SUCCESS,post))
        }catch(err){
            console.log(err)
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,responseMessage.CREATE_POST_FAIL));
        }
    },
    readPost : async(req,res)=>{//Liker가 빈배열이 나옴 왜 그럴까
        try{
            const posts = await Post.findAll({
                attributes:['title','contents'],
                include:[{
                    model:User,
                    attributes:['id','email','userName']
                },{
                    model:User,
                    as:'Liker',
                    attributes:{exclude:['password','salt']}
                }]
            });
            return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.READ_POST_ALL_SUCCESS,posts))
        }catch(err){
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,responseMessage.READ_POST_ALL_FAIL));
        }
    },
    createLike:async(req,res)=>{
        const PostId = req.params.postId;
        const UserId = req.body.userId;
        try{
            const like = await Like.create({UserId,PostId})
            return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.CREATE_LIKE_SUCCESS,like))
        }catch(err){
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,responseMessage.CREATE_LIKE_FAIL))
        }
    },
    deleteLike:async(req,res)=>{
        const PostId = req.params.postId;
        const UserId = req.body.userId;
        try{
            const like = await Like.destroy({where:{UserId,PostId}})
            return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.DELETE_LIKE_SUCCESS,like))
        }catch(err){
            console.error(err)
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,responseMessage.DELETE_LIKE_FAIL))
        }
    }
}