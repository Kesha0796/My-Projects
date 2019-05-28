var connection =  new require('./kafka/Connection');
//topics files
//var signin = require('./services/signin.js');
var ownerlogin = require('./services/ownerlogin');
var ownerdashboard=require('./services/ownerdashboard');
var downloadimage=require('./services/downloadimage');
var login=require('./services/login');
var pricedata=require('./services/pricedata');
var checkproperty=require('./services/checkproperty');
var travellerdashboard=require('./services/travellerdashboard');
var filter=require('./services/filter');
var fetchpropid=require('./services/fetchpropiddata');
var booking=require('./services/booking');
var mytrips=require('./services/mytrips');
var signup=require('./services/signup');
var editprofile=require('./services/editprofile');
var profileedit=require('./services/profileedit');
var ownerfilter=require('./services/ownerfilter');

function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    
    consumer.on('message', function (message) {
        console.log("Message kafka....",message );
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("test",ownerlogin)
handleTopicRequest("ownerdashboard",ownerdashboard)
handleTopicRequest("downloadimage",downloadimage)
handleTopicRequest("login",login)
handleTopicRequest("pricedata",pricedata)
handleTopicRequest("checkproperty",checkproperty)
handleTopicRequest("travellerdashboard",travellerdashboard)
handleTopicRequest("filter",filter)
handleTopicRequest("fetchpropid",fetchpropid)
handleTopicRequest("booking",booking)
handleTopicRequest("mytrips",mytrips)
handleTopicRequest("signup",signup)
handleTopicRequest("editprofile",editprofile)
handleTopicRequest("profileedit",profileedit)
handleTopicRequest("ownerfilter",ownerfilter)

