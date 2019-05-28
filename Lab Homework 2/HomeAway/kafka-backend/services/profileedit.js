
var {mongoose} = require('../../backend/db/mangoose');
var {UserInfo}=require('../../backend/models/userinfo');

function handle_request(msg, callback){
    //console.log(req.body);
        var firstname=msg.firstname;
        var lastname=msg.lastname;
        console.log("Edit Profile");
    
        //mongodb edit profile logic
        
            var UserData=new UserInfo({
                    firstname:firstname,
                    lastname:lastname,
                    aboutme:msg.AboutMe,
                    city:msg.City,
                    Company:msg.Company,
                    school:msg.School,
                    HomeTown:msg.HomeTown,
                    Languages:msg.Language,
                    gender:msg.Gender
            });
            UserInfo.findOneAndUpdate({
                firstname:firstname
            },
            {
                $set:
                {
                    firstname:firstname,
                    lastname:lastname,
                    aboutme:msg.AboutMe,
                    city:msg.City,
                    company:msg.Company,
                    school:msg.School,
                    hometown:UserData.HomeTown,
                    languages:UserData.Languages,
                    gender:msg.Gender
                }
            },
            {
                upsert:true
            }).then((result)=> {
                console.log("Updated Document:",result);
                callback(null,result);
    
            },(err)=>{
                console.log(err);
                console.log("Error Creating Book");
                callback(null,[]);
            })
}

exports.handle_request = handle_request;