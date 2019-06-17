const userCols = require('../../models/user')
const jwtSimple = require('jwt-simple')

const controller = {
    register: (req, res, next) => {
        const {username, password, email, adminType} = req.body
  
        userCols.find({
            username: username
        }).then(foundUser => {
            if(foundUser.length === 0) {
                userCols.create(
                    req.body
                ).then(newUser => {
                    res.status(200).send({
                        message: "New user succes to register",
                        data: newUser
                    })
                }).catch(error => {
                    res.status(500).send({
                        message: "Database error",
                        error: error
                    })
                })
            } else {
                res.status(200).send({
                    message: 'User Already Exist'
                })
            }
        }).catch(error => {
            res.status(500).send({
                message: "Database error",
                error: error
            })
        })
        
    },

    login: (req, res) => {
        const { username, password } = req.body

        userCols.find({
            username: username,
            password: password
        }).then(foundUser => {
            console.log(foundUser)
            if(foundUser[0]){
                foundUser[0].password = null
                token = jwtSimple.encode(foundUser[0], "SECRET")

                res.status(200).send({
                    message: "Success to Login",
                    data: token
                })
            } else {
                res.status(200).send({
                    message: "user not registered, ask your admin to register",
                    error: true
                })
            }
        }).catch(error => {
            res.status(500).send({
                message: "Database error",
                error: error
            })
        })
    },

    get: (req, res) => {
        const { adminType } = req.query

        userCols.find({
            adminType: adminType
        }).then(allUser => {
            if(allUser[0]) {
                res.status(200).send({
                    mesasge: "success to get all users",
                    data: allUser
                })
            } else {
                res.status(200).send({
                    message: "no user has been creates",
                    error: true
                })
            }
        }).catch(error => {
            res,status(500).send({
                message: "Database error",
                error: error
            })
        })
    }
}

module.exports = controller
