var mongoose = require('mongoose');

var UserInfo = mongoose.model('UserInfo',{
    username :{
        type : String
    },
    aboutme : {
        type : String
    },
    firstname : {
        type: String
    },
    lastname: {
        type: String
    },
    city:{
        type:String
    },
    Company:{
        type:String
    },
    school:{
        type:String
    },
    Hometown:{
        type:String
    },
    Languages:
    {
        type:String
    },
    gender:{
        type:String
    }

},'UserInfo');

module.exports = {UserInfo};