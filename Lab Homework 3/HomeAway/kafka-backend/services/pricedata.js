//var mongo = require('./mongo');
//var bcrypt = require('bcrypt');
var {mongoose} = require('../../backend/db/mangoose');
var {Property}=require('../../backend/models/property');


function handle_request(msg, callback){
    console.log("in post price method");
        console.log(msg);
        for (var i in msg.property) {
            if (msg.property[i].propid == 1) {
                var address=msg.property[i].add1 + msg.property[i].add2;
                var properties = new Property({
                    username : msg.property[i].username,
                    address : address,
                    city : msg.property[i].city,
                    country : msg.property[i].country,
                    zipcode : msg.property[i].zipcode,
                    headline : msg.property[i].headline,
                    description : msg.property[i].description,
                    bedrooms : msg.property[i].bedrooms,
                    accomodates : msg.property[i].accomodates,
                    bathrooms : msg.property[i].bathrooms,
                    startdate : msg.property[i].startdate,
                    enddate : msg.property[i].enddate,
                    currency : msg.data.currency,
                    Nightbaserates : msg.data.nightbaserent,
                    minstay : msg.data.minstay,
                    image : msg.property[i].location,
                    proptype : msg.property[i].proptype,
                    imagename : msg.property[i].imagename,
                    travellername : " ",
                    booked:0
                });
                console.log("data properties ",properties);
                properties.save().then((property)=>{
                    console.log("Property created : ",property);
                    callback(null,property);
                },(err)=>{
                console.log(err);
                console.log("Error Creating Property");
                callback(null,[]); 
                })
        console.log("Property Added Successfully!!!!");
            }
        }
}

exports.handle_request = handle_request;