var express = require('express');
var router = express.Router();
var request = require("request");
var async = require("async");
var jwt= require("jsonwebtoken");

var authenticateController=require('../controllers/authenticate-controller');
process.env.SECRET_KEY="thisismysecretkey";

// validation middleware
router.use(function(req,res,next){
    console.log("Patrol 1a");
	//var token=jwt.sign(true,"thisismysecretkey",{
	//					expiresIn:"1h"
	//				});
	
	var token = jwt.sign({
		exp: Math.floor(Date.now() / 1000) + (60 * 60)
	}, process.env.SECRET_KEY);
	
	console.log("Token = " + token);
	
	//var token=req.body.token || req.headers['token'];
    if(token){
        jwt.verify(token,process.env.SECRET_KEY,function(err,ress){
            if(err){
                //res.status(500).send('Token Invalid');
				res.render('tokenerr', { message: "Invalid credentials", layout : 'tokenerr'});
            }else{
                console.log("Patrol 2");
				next();
            }
        })
    }else{
        res.send('Please send a token')
    }
})



router.get('/', function(req, res, next) {
    
    // use async package
    // https://caolan.github.io/async/docs.html#series
    
    async.series([
		function(callback){
            // get PatrolAssinments
            var patroloptions = {  
                url: 'http://localhost:3000/roster/getPatrolAssignments',
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Accept-Charset': 'utf-8'
                }
              };

              request(patroloptions, function(err, res, body) {  
                let json = JSON.parse(body);
                callback(null,json)
              });               

            console.log("Series one")
		},
		function(callback){
            request({
                url: 'http://localhost:3000/roster/Patrol1',
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Accept-Charset': 'utf-8'
                }
            }, function(err, res, body) {  
                let json = JSON.parse(body);
                callback(null,json);
            });
		} ,
		function(callback){
            request({
                url: 'http://localhost:3000/roster/Patrol2',
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Accept-Charset': 'utf-8'
                }
            }, function(err, res, body) {  
                let json = JSON.parse(body);
                callback(null,json);
            });
		},
		function(callback){
            request({
                url: 'http://localhost:3000/roster/Patrol3',
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Accept-Charset': 'utf-8'
                }
            }, function(err, res, body) {  
                let json = JSON.parse(body);
                callback(null,json);
            });
		},
		function(callback){
            request({
                url: 'http://localhost:3000/roster/Patrol4',
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Accept-Charset': 'utf-8'
                }
            }, function(err, res, body) {  
                let json = JSON.parse(body);
                callback(null,json);
            });
		},
		function(callback){
            request({
                url: 'http://localhost:3000/roster/Flex',
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Accept-Charset': 'utf-8'
                }
            }, function(err, res, body) {  
                let json = JSON.parse(body);
                callback(null,json);
            });
		},
		function(callback){
            request({
                url: 'http://localhost:3000/roster/Admin',
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Accept-Charset': 'utf-8'
                }
            }, function(err, res, body) {  
                let json = JSON.parse(body);
                callback(null,json);
            });
		},
		function(callback){
            request({
                url: 'http://localhost:3000/roster/Alumni',
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Accept-Charset': 'utf-8'
                }
            }, function(err, res, body) {  
                let json = JSON.parse(body);
                callback(null,json);
            });
		},
		function(callback){
            request({
                url: 'http://localhost:3000/roster/Management',
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Accept-Charset': 'utf-8'
                }
            }, function(err, res, body) {  
                let json = JSON.parse(body);
                callback(null,json);
            });
		},
		function(callback){
            request({
                url: 'http://localhost:3000/roster/Vet',
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Accept-Charset': 'utf-8'
                }
            }, function(err, res, body) {  
                let json = JSON.parse(body);
                callback(null,json);
            });
		}
	],
    // optional callback
    // results contains an array of all of the previous async call results
	function(err, results) {
        console.log("SSSS: " + JSON.stringify(results[1]));
    
        res.render('roster', { 
            title: "Patrol All", 
            layout : 'roster', 
            patrolassignments: results[0],
            patrol1: results[1],
            patrol2: results[2],
            patrol3: results[3],
            patrol4: results[4],
            patrolFlex: results[5],
            patrolAdmin: results[6],
            patrolAlumni: results[7],
            patrolManagement: results[8],
            patrolVet: results[9]
        });
    });
    
});

router.get('/:patrolid?', function(req, res, next) {
    var patrolid = req.params.patrolid;
    async.series([
		function(callback){
            // get PatrolAssinments
            var patroloptions = {  
                url: 'http://localhost:3000/roster/getPatrolAssignments',
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Accept-Charset': 'utf-8'
                }
              };

              request(patroloptions, function(err, res, body) {  
                let json = JSON.parse(body);
                callback(null,json)
              });               
		},
		function(callback){

            var options = {  
                url: 'http://localhost:3000/roster/' + patrolid,
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Accept-Charset': 'utf-8'
                }
              };
            
            request(options, function(err, res, body) {  
                let json = JSON.parse(body);
                
                 console.log("WEEE: " + body);
                
                callback(null,json) 
            });
    
			console.log("Series two")
		}
	],
    // optional callback
	function(err, results) {
        res.render('roster', { 
            title: patrolid, 
            layout : 'roster', 
            patrol: results[1], 
            patrolassignments: results[0]
        });
	});
});

module.exports = router;