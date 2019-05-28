
var {mongoose} = require('../../backend/db/mangoose');
var {Property}=require('../../backend/models/property');
var {Booking}=require('../../backend/models/booking');

function handle_request(msg, callback){
    console.log("in booking method");
                    var date1 = new Date(msg.startdate);
                    var date2 = new Date(msg.enddate);
                    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
                    var totaldays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
                    var totalcharge=totaldays*msg.rates;
                    var booking=new Booking({
                        propertyid:msg.propertyid,
                        username:msg.username,
                        startdate:msg.startdate,
                        enddate:msg.enddate,
                        guests:msg.guests,
                        rates:msg.rates,
                        totalcharge:totalcharge,
                        city:msg.city
                    })
                    //console.log("data properties ",properties);
                    booking.save().then((bookproperty)=>{
                        console.log("Property created : ",bookproperty);
                        Property.findOneAndUpdate({
                            "_id":msg.propertyid
                        },
                        {
                            $set:
                            {
                                booked:1,
                                travellername:msg.username,
                            }
                        },
                        {
                            upsert:true
                        }).then((result)=> {
                            console.log("Updated Prperty:",result);   
                            callback(null,result);   
                        },(err)=>{
                            console.log(err);
                            console.log("Error Updating Property");
                            callback(null,[])
                        })
                     
                        callback(null,result);
                    },(err)=>{
                    console.log(err);
                    console.log("Error Creating Property");
                   callback(null,[]);
                    })
                   
            //console.log(property);
            console.log("Property Added Successfully!!!!");
        
}

exports.handle_request = handle_request;