var mysql=require('mysql');
var connection=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'root',
    database:'thunderbox_WPSP',
    multipleStatements: true
});
module.exports=connection;