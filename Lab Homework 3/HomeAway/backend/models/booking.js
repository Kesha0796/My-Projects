var mongoose = require('mongoose');

var Booking = mongoose.model('Booking',{
    propertyid :{
        type : String
    },
    headline:{
        type:String
    },
    username : {
        type : String
    },
    startdate : {
        type: String
    },
    enddate: {
        type: String
    },
    guests:{
        type:String
    },
    rates:{
        type:String
    },
    totalcharge:{
        type:String
    },
    city:{
        type:String
    }

},'Booking');

module.exports = {Booking};