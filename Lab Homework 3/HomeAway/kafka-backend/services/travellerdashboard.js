
var {mongoose} = require('../../backend/db/mangoose');
var {Property}=require('../../backend/models/property');

function handle_request(msg, callback){
    console.log("Inside traveller dashboard Post Request");
       // console.log(req.body);
            var place = msg.place;
            var arrivaldate = msg.startdate;
            var departdate = msg.enddate;
            var guest = msg.guest;
    
            Property.find({
                city:place,
                startdate:{$lte: arrivaldate},
                enddate:{$gte: departdate},
                accomodates:{$gte:guest},
                booked:0
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