
var {mongoose} = require('../../backend/db/mangoose');
var {Property}=require('../../backend/models/property');

function handle_request(msg, callback){
    console.log("Inside filter Request");
       // console.log(req.body);
            var arrivaldate = msg.startdate;
            var departdate = msg.enddate;
            Property.find({
                startdate:{$lte: arrivaldate},
                enddate:{$gte: departdate},
            },function(err,result)
            {if(err)
            {
                console.log(err);
                callback(null,[]);
            }
            else{
                console.log("Property fetched");
                console.log(result);
                callback(null,result);
    
            }}
            )
}

exports.handle_request = handle_request;