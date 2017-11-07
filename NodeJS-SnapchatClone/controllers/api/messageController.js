var Message = require('../../models/message');

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
    res.send(req.body)
}