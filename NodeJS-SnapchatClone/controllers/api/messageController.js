var Message = require('../../models/message');

exports.list = function (req, res) {
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