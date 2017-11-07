var User = require('../../models/user')
var bcrypt = require('bcrypt')
var deasync = require('deasync')

exports.auth = function (req, res) {
    let username = req.body.username
    let password = req.body.password
    let user
    let passwordCheck
    User.getByUsername(username, function (err, result) {
        if (err) throw err

        if (result.length <= 0) {
            let hashed
            bcrypt.hash(password, 10, function (err, hash) {
                if (err) throw err
                
                hashed = hash
            })
            deasync.loopWhile(function () { return hashed === undefined })

            User.insert(username, hashed, function (err, result) {
                if (err) throw err

                id = result

                User.getById(id, function (err, result) {
                    if (err) throw err

                    user = result[0]
                    passwordCheck = true
                })
            })
        } else {
            user = result[0]
            bcrypt.compare(password, user.password, function (err, same) {
                if (err) throw err
                
                passwordCheck = same
            })
        }
    })
    deasync.loopWhile(function () { return user === undefined })
    deasync.loopWhile(function () { return passwordCheck === undefined })

    if (passwordCheck) {
        res.json({
            success: true,
            data: {
                id: user.id,
                username: user.username
            }
        })
    } else {
        res.json({
            success: false,
            message: "Username or password is incorrect"
        })
    }    
}