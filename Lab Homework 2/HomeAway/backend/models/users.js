var mongoose = require('mongoose');

var Users = mongoose.model('Users',{
    username :{
        type : String
    },
    password : {
        type : String
    },
    firstname : {
        type: String
    },
    lastname: {
        type: String
    },
    plainpassword:{
        type:String
    }
},'Users');

module.exports = {Users};