var db = require('./base').db;
var sql = require('sql');
sql.setDialect('mysql');

var user = sql.define({
    name: 'users',
    columns: ['id', 'username', 'password']
});

var User = function () { }

User.getById = function (id, callback) {
    var query = user.select(user.id, user.username).from(user).where(user.id.equals(id)).toQuery()
    db.query({
        sql: query.text,
        values: query.values
    }, function (err, results, fields) {
        if (err) throw callback(err)
        
        callback(null, results)
    })
}

User.getByUsername = function (username, callback) { 
    var query = user.from(user).where(user.username.equals(username)).toQuery()
    db.query({
        sql: query.text,
        values: query.values
    }, function (err, results, fields) {
        if (err) throw callback(err)
        
        callback(null, results)
    })
}

User.insert = function (username, password, callback) {
    var query = user.insert(user.username.value(username), user.password.value(password)).toQuery()
    // callback(null, query)
    db.query({
        sql: query.text,
        values: query.values
    }, function(err, results, fields){
        if (err) throw callback(err)
        
        callback(null, results.insertId)
    })
}

module.exports = User