var db=require('../dbconnection');

var Roster={
    showAll:function(callback){
        return db.query('call sp_GetRoster(@response);select @response;',callback);
     },
    getPatrolAssignments:function(callback){
        return db.query('SELECT PatrolAssignment from PatrolAssignment Order by PatrolAssignment',callback);
    },
    getPatrol:function(patrolid, callback){
        return db.query('call sp_GetPatrol("' + patrolid + '",@response);select @response;', callback);
    }
};
module.exports=Roster;