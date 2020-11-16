const express = require('express')
const router = express.Router()
const upload = require('../../modules/multer')
const postController = require('../../controller/postController')

router.post('/',upload.single('image'),postController.createPost);

router.get('/',postController.readPost);

router.post('/:postId/like',postController.createLike);

module.exports = router;