var mysql=require('mysql');
var connection=mysql.createPool({
    host:'localhost',
    user:'xxxxx',
    password:'xxxxx',
    database:'thunderbox_WPSP',
    multipleStatements: true
});
module.exports=connection;
