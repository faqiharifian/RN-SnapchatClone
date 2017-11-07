var db = require('./base').db
var User = require('./user')
var sql = require('sql')
sql.setDialect('mysql')

var user = User.sql

var message = sql.define({
    name: 'messages',
    columns: ['id', 'from_id', 'to_id', 'content', 'timestamp']
});

var Message = function () { }

Message.sql = message

Message.get = function (callback) {
    var query = message.from(message).order(message.timestamp.descending, message.id.descending).toQuery().text;

    db.query(query, function (err, results, fields) {
        if (err) throw callback(err);

        callback(null, results);
    })
}

Message.getByToId = function (id, callback) {
    var query = "SELECT m.id as id, from_id, u.username as from_name, to_id, to_name, content, timestamp FROM (SELECT m.id as id, to_id, username as to_name, from_id, content, timestamp FROM messages m INNER JOIN users u ON m.to_id = u.id WHERE m.to_id = " + id + ") m INNER JOIN users u ON m.from_id = u.id"
    
    db.query(query, function (err, results, fields) {
        if (err) throw callback(err)
        
        callback(null, results)
    })
}

Message.insert = function (from_id, to_id, content, callback) {
    var query = message.insert(message.from_id.value(from_id), message.to_id.value(to_id), message.content.value(content)).toQuery()

    db.query({
        sql: query.text,
        values: query.values
    }, function (err, results, fields) {
        if (err) throw callback(err)
        
        callback(null, results)
    })
}

module.exports = Message;