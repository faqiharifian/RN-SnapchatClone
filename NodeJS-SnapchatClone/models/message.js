var db = require('./base').db;
var sql = require('sql');
sql.setDialect('mysql');

var message = sql.define({
    name: 'messages',
    columns: ['id', 'sender', 'content', 'timestamp']
});

var Message = function () { }

Message.get = function (callback) {
    var query = message.from(message).order(message.timestamp.descending, message.id.descending).toQuery().text;

    db.query(query, function (err, results, fields) {
        if (err) throw callback(err);

        callback(null, results);
    })
}

module.exports = Message;