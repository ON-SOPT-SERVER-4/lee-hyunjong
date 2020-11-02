const crypto = require('crypto');
const express = require('express');
const router = express.Router();
const util = require('../../modules/util');
const responseMessage = require('../../modules/responseMessage');
const statusCode = require('../../modules/statusCode');
let usersDB = require('../../modules/users');
const {
    stat
} = require('fs');
const {
    response
} = require('../../app');
router.post('/signup', (req, res) => {
    const {
        id,
        password
    } = req.body;
    const type = "signup"
    console.log('usersDB:', usersDB)
    checkReqData(id, password, type, res);
    createHashing(id, password, res);
})

router.post('/signin', async (req, res) => {
    const {
        id,
        password
    } = req.body;
    const type = "signin"
    checkReqData(id, password, type, res);
})

router.get('/', (req, res) => {
    return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.MEMBER_READ_SUCCESS, usersDB))
})

const checkReqData = (id, password, type, res) => {
    if (!id || !password) {
        return res.status(statusCode.BAD_REQUEST).send(util.success(statusCode.OK, responseMessage.NULL_VALUE))
    } else {
        compareID(id, password, type, res)

    }
}

const compareID = (id, password, type, res) => {
    let userID = usersDB.filter(member => member.id == id)
    if (type == "signup") {
        if (userID.length != 0) {
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.ALREADY_ID))
        } else return true

    } else if (type == "signin") {
        if (userID.length == 0) {
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.ALREADY_ID))
        } else {
            comparePW(id, password, res)
        }
    } else return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.ALREADY_ID))
}

const comparePW = (id, password, res) => {
    let user = usersDB.filter(member => member.id == id)
    if (user.length == 0 || user.length > 1) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER))
    } else {
        crypto.pbkdf2(password, user[0].salt, 100000, 64, 'sha512', (err, key) => {
            if (err) {
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.SIGN_UP_FAIL, err))
            }
            if (user[0].password != key.toString('base64')) {
                return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, responseMessage.MISS_MATCH_PW))
            } else {
                let filterDB = []
                usersDB.map((v, i) => {
                    filterDB.push({
                        "idx": i,
                        "id": v.id
                    })
                })
                return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SIGN_IN_SUCCESS, filterDB))
            }
        })

    }
}

const createHashing = (id, password, res) => {
    let filterDB = [];
    crypto.randomBytes(64, (err, buf) => {
        if (err) {
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.SIGN_UP_FAIL, err))
        }
        const salt = buf.toString('base64');
        crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err, key) => {
            if (err) {
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.SIGN_UP_FAIL, err))
            }
            usersDB.push({
                "id": id,
                "password": password,
                "salt": salt
            })
            usersDB.map((v, i) => {
                filterDB.push({
                    "idx": i,
                    "id": v.id
                })
            })
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SIGN_UP_SUCCESS, filterDB))
        })
    })
}
module.exports = router;