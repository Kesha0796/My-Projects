
var {mongoose} = require('../../backend/db/mangoose');
var {Booking}=require('../../backend/models/booking');

function handle_request(msg, callback){
    console.log("inside booking details method");
    console.log(msg.propertyid);

    Booking.find({
        propertyid:msg.propertyid
    },
    function(err,result)
    {
        if(err)
        {
            console.log(err);
            callback(null,[]);
        }
        else
        {
            console.log("Booked Properties");
            console.log(result);
            var resData={
                status:200,
                result:result
            }
           callback(null,resData);
        }
    }
    )
}

exports.handle_request = handle_request;