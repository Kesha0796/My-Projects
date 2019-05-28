var mongoose = require('mongoose');

var Property = mongoose.model('Property',{
    username :{
        type : String
    },
    address : {
        type: String
    },
    city: {
        type: String
    },
    country:{
        type:String
    },
    zipcode:{
        type:String
    },
    headline:{
        type:String
    },
    description:{
        type:String
    },
    bedrooms:
    {
        type:String
    },
    accomodates:{
        type:String
    },
    bathrooms:{
        type:String
    },
    startdate:
    {
        type:Date
    },
    enddate:{
        type:Date
    },
    currency:
    {
        type:String
    },
    Nightbaserates:{
        type:String
    },
    minstay:{
        type:String
    },
    image:{
        type:String
    },
    proptype:
    {
        type:String
    },
    imagename:{
        type:String
    },
    travellername:
    {
        type:String
    },
    ratings:{
        type:String
    },
    booked:{
        type:String
    }

},'Property');

module.exports = {Property};