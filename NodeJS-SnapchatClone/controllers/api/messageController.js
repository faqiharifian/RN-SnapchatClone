var Message = require('../../models/message');
var User = require('../../models/user')
var deasync = require('deasync')

exports.list = function (req, res) {
    let id = req.query.id
    if (id != undefined) {
        Message.getByToId(id, function (err, result) {
            if (err) {
                res.json({
                    success: false,
                    message: err
                })
            } else {
                res.json({
                    success: true,
                    data: result
                })
            }
        })
    } else {
        Message.get(function (err, result) {
            if (err) {
                res.json({
                    success: false,
                    message: err
                })
            } else {
                res.json({
                    success: true,
                    data: result
                })
            }
        });
    }    
}

exports.post = function (req, res) {
    let from_id = req.body.from
    let to_name = req.body.to
    let content = req.body.content

    let user
    let message
    User.getByUsername(to_name, function (err, result) {
        if (err) {
            message = err
            user = null
        } else {
            if (result.length <= 0) {
                message = "User not found"
                user = null
            } else {
                user = result[0]
            }
        }
    })
    deasync.loopWhile(function () { return user === undefined })

    if (user != null) {
        Message.insert(from_id, user.id, content, function (err, result) {
            if (err) {
                res.json({
                    success: false,
                    message: err
                })
            } else {
                res.json({
                    success: true,
                    message: "Message Sent"
                })
            }
        })
    }else{
        res.json({
            success: false,
            message: message
        })
    } 
}