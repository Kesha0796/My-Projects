var mongoose = require('mongoose');

var questions = mongoose.model('questions',{
    propertyid :{
        type : String
    },
    ownername : {
        type : String
    },
    travellername : {
        type: String
    },
    questionheadline: {
        type: String
    },
    answer:{
        type:String
    },
    questiondesc:{
        type:String
    },
    propertyaddress:{
        type:String
    },
    time:
    {type:String}

},'questions');

module.exports = {questions};