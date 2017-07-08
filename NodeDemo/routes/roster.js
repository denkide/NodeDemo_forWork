var express = require('express');
var router = express.Router();
var Roster=require('../models/roster');

router.get('/getPatrolAssignments', function(req, res, next) {
   Roster.getPatrolAssignments(function(err,rows){
        if(err)
        {
            res.json(err);
        }
        else{
            res.json(rows);
        }
   })
});

router.get('/showAll', function(req, res, next) {
    Roster.showAll(function(err,rows){
        if(err)
        {
            res.json(err);
        }
        else
        {
            res.json(rows);
        }
    });
});

router.get('/:patrolid?',function(req,res,next){
    Roster.getPatrol(req.params.patrolid,function(err,rows){
        if(err)
        {
            res.json(err);
        }
        else{
            res.json(rows);
        }
    }); 
    //res.send('xxx respond with a ' + req.params.patrolid); 
}); 

module.exports=router;