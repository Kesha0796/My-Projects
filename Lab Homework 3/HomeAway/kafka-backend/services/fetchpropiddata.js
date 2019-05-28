
var {mongoose} = require('../../backend/db/mangoose');
var {Property}=require('../../backend/models/property');

function handle_request(msg, callback){
    console.log("Inside traveller dashboard id Post Request");
            var propid = msg.propid;
            console.log(propid);
            Property.find({
                _id:propid
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