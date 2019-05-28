
var {mongoose} = require('../../backend/db/mangoose');
var {Property}=require('../../backend/models/property');

function handle_request(msg, callback){
    console.log("Inside check property Post Request");
            var place = msg.place;
            var arrivaldate = msg.arrivaldate;
            var departdate = msg.departdate;
            var guest = msg.guest;
            console.log(place+" "+arrivaldate+" "+departdate+" "+guest);
            Property.find(
            {
                    city:place,
                    startdate:arrivaldate,
                    enddate:departdate,
                    accomodates:guest
            },function(err,users){
                if (err) {
                    console.log(err);
                    console.log("Error fetching property");
                    callback(null,[]);
    
                }
                else{
                    var resData={
                        city:msg.place,
                        startdate:msg.arrivaldate,
                        enddate:msg.departdate,
                        accomodates:msg.guest
                    }
                    console.log("Property obtained: ",users);
                    callback(null,resData);
                }
            })
}

exports.handle_request = handle_request;