var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
app.set('view engine', 'ejs');
var mysql = require('mysql');
var pool = require('./pool');
const port = process.env.PORT || 3001;
const multer = require('multer');
const uuidv4 = require('uuid/v4');
const path = require('path');
const fs = require('fs');
var morgan = require('morgan');
var passport = require('passport');
var config = require('./config/settings');
var jwt = require('jsonwebtoken');
var crypt = require('./app/crypt');
var db = require('./app/db');
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var {UserInfo}=require('./models/userinfo');
var {Property}=require('./models/property');
var {Booking}=require('./models/booking');
var {Users}=require('./models/users');

 

var newFilename=" ";
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads');
    },
    filename: (req, file, cb) => {

     // const newFilename = `test${path.extname(file.originalname)}`;
     newFilename = file.originalname;
      cb(null, newFilename);
    },
  });
  var con1=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"homeaway"
  });
  
  // Log requests to console
app.use(morgan('dev'));

//console.log("here");
//require('./app/routes')(app);
app.use(passport.initialize());

// Bring in defined Passport Strategy
require('./config/passport')(passport);

  const upload = multer({ storage });
//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret              : 'cmpe273_kafka_passport_mongo',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    next();
  });
  app.post('/imageupload', upload.single
  ('selectedFile'), (req, res) => {
    //console.log("Req : ",req);
    for (var i in property) {
        if (property[i].propid == 1) {
            var fileLocation = path.join(__dirname + '/uploads',newFilename);
            property[i].location=fileLocation;
            property[i].imagename=newFilename;
        }
    }
    console.log(property);
    console.log("Res : ",res.file);
    res.send();
});
 
var property=[];

  //Route to handle Post Request Call
app.post('/login',function(request,response){

    db.findUser({
        username: request.body.username,
        password:request.body.password
    }, function (res) {
        var user = {
            id: res.userid,
            username: res.Username,
        };
        var passwordHash;
        console.log("Password is"+request.body.password);
        console.log(res.password);
        crypt.createHash(request.body.password, function (res) {
            passwordHash = res;
        })
        console.log(passwordHash);
        // Check if password matches
        crypt.compareHash(request.body.password, res.password, function (err, isMatch) {
            if (isMatch && !err) {
                // Create token if the password matched and no error was thrown
                var token = jwt.sign(user, config.secret, {
                    expiresIn: 10080 // in seconds
                });
                console.log(token);
                var resData={
                    authFlag:true,
                    username:request.body.username,
                    firstname:res.firstname
                }
                console.log("success");
                response.cookie('name',res.firstname,{maxAge: 900000, httpOnly: false, path : '/'});
                response.cookie('userid',res.userid,{maxAge: 900000, httpOnly: false, path : '/'});
                response.cookie('username',res.Username,{maxAge: 900000, httpOnly: false, path : '/'});
                response.status(200).json({success: true, token: 'JWT ' + token,resData});
            } else {
                console.log("error");
                console.log(err);
                response.status(401).json({
                    success: false,
                    message: 'Authentication failed. Passwords did not match.'
                });
            }
        }, function (err) {
            console.log(err);
            response.status(401).json({success: false, message: 'Authentication failed. User not found.'});
        });
    }, function (err) {
        console.log(err);
        response.status(401).json({success: false, message: 'Authentication failed. User not found.'});
    });



    // login without decrypt
    // console.log("Inside Login Post Request");
    //     var username = req.body.username;
    //     var password = req.body.password;
    //     var sql = "SELECT *  FROM UserTable WHERE Username = " + 
    //             mysql.escape(username) + "and Password = " + mysql.escape(password);

    // pool.getConnection(function(err,con){
    //     if(err){
    //         res.writeHead(400,{
    //             'Content-Type' : 'text/plain'
    //         })
    //         console.log(err);
    //         console.log("connection object no found");
    //         res.end("Could Not Get Connection Object");
    //     }else{  
    //         con.query(sql,function(err,result){
    //             if(err){
    //                 console.log("Inavlid Credentials");
    //                 res.writeHead(400,{
    //                     'Content-Type' : 'text/plain'
    //                 })
    //                 res.end("Invalid Credentials");
    //             }else{
    //                 console.log("successful login");
    //                 req.session.user = result;
    //                 var users=JSON.stringify(result);
    //                 var user=JSON.parse(users);
    //                 for(var i=0;i<user.length;i++)
    //                 {
    //                     res.cookie('name',user[i].Firstname,{maxAge: 900000, httpOnly: false, path : '/'});
    //                     res.cookie('userid',user[i].userid,{maxAge: 900000, httpOnly: false, path : '/'});
    //                     console.log(user[i].Firstname);
    //                 }

    //                     res.writeHead(200,{
    //                         'Content-Type' : 'text/plain'
    //                     })
    //                     res.end("Successful Login");
    //             }
    //         });
    //     }
    // });
    
});
con1.connect(function(err)
{
    if(err) throw err;
    console.log("Connected!");
})
app.post('/withoutpoollogin',function(request,response)
{
    console.log("Inside Login Post Request");
        var username = req.body.username;
        var password = req.body.password;
        var sql = "SELECT *  FROM UserTable WHERE Username = " + 
                mysql.escape(username) + "and Password = " + mysql.escape(password);

    
            con1.query(sql,function(err,result){
                if(err){
                    console.log("Inavlid Credentials");
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Invalid Credentials");
                }else{
                    console.log("successful login");
                    req.session.user = result;
                    var users=JSON.stringify(result);
                    var user=JSON.parse(users);
                    for(var i=0;i<user.length;i++)
                    {
                        res.cookie('name',user[i].Firstname,{maxAge: 900000, httpOnly: false, path : '/'});
                        res.cookie('userid',user[i].userid,{maxAge: 900000, httpOnly: false, path : '/'});
                        console.log(user[i].Firstname);
                    }

                        res.writeHead(200,{
                            'Content-Type' : 'text/plain'
                        })
                        res.end("Successful Login");
                }
            });
        
    
});
app.post('/display1', function(req,res){
    console.log("display");
    console.log(req.body);
    //mongodb logic for getting edit profile data
    UserInfo.findOne({
        firstname:req.body.firstname
    }, function(err,users){
        if (err) {
            // res.code = "400";
            // res.value = "The email and password you entered did not match our records. Please double-check and try again.";
            console.log(res.value);
            // res.sendStatus(400).end(); 
            failureCallback(err);
            console.log("in");
                return;
        } else{
            // res.code = "200";
            // res.value = users;
            console.log("display data");
            console.log(users);
            res.writeHead(200,{
            'Content-Type' : 'application/json'
            })
                               
            res.end(JSON.stringify(users));
        }
    })

    //mysql logic for getting edit profile data
    // var sql = "SELECT * FROM userinfo WHERE userinfo.Firstname = " +mysql.escape(req.body.firstname)+ "";
    // console.log(sql);
    // pool.getConnection(function(err,con){
    //     if(err){
    //         res.writeHead(400,{
    //             'Content-Type' : 'text/plain'
    //         })
    //         res.end("Could Not Get Connection Object");
    //     }else{
    //         con.query(sql,function(err,result){
    //             if(err){
    //                 res.writeHead(400,{
    //                     'Content-Type' : 'text/plain'
    //                 })
    //                 res.end("Could Not Get Connection Object");   
    //             }else{
    //                 res.writeHead(200,{
    //                     'Content-Type' : 'application/json'
    //                 })
                   
    //                 res.end(JSON.stringify(result));
    //                 console.log(JSON.stringify(result));
    //             }
    //         });
    //     }
    // })
    
});

app.post('/EditProfile',function(req,res){
    console.log(req.body);
    var firstname=req.body.firstname;
    var lastname=req.body.lastname;
    console.log("Edit Profile");

    //mongodb edit profile logic
    
        var UserData=new UserInfo({
                firstname:firstname,
                lastname:lastname,
                aboutme:req.body.AboutMe,
                city:req.body.City,
                Company:req.body.Company,
                school:req.body.School,
                HomeTown:req.body.HomeTown,
                Languages:req.body.Language,
                gender:req.body.Gender
        });
        UserInfo.findOneAndUpdate({
            firstname:firstname
        },
        {
            $set:
            {
                firstname:firstname,
                lastname:lastname,
                aboutme:req.body.AboutMe,
                city:req.body.City,
                company:req.body.Company,
                school:req.body.School,
                hometown:UserData.HomeTown,
                languages:UserData.Languages,
                gender:req.body.Gender
            }
        },
        {
            upsert:true
        }).then((result)=> {
            console.log("Updated Document:",result);
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            res.end('InsertSuccess');

        },(err)=>{
            console.log(err);
            console.log("Error Creating Book");
            res.writeHead(400,{
            'Content-Type' : 'text/plain'
            })
            res.end("Error creating book");
        })
     
    
    });

    

    //mysql edit profile logic
    // var sql = "UPDATE usertable SET usertable.Firstname = " +mysql.escape( firstname )+ ",Lastname = " +mysql.escape( lastname )+ " WHERE Username="+mysql.escape(req.body.earlier)+"";
    // var sql1 = "UPDATE userinfo SET userinfo.Firstname = " +mysql.escape( firstname )+ ",userinfo.Lastname = " +mysql.escape( lastname )+ ",userinfo.AboutMe= " +mysql.escape( req.body.AboutMe )+ ",userinfo.City = " +mysql.escape( req.body.City )+ ",userinfo.Company = " +mysql.escape( req.body.Company )+ ",userinfo.School = " +mysql.escape( req.body.School )+ ",userinfo.Hometown = " +mysql.escape( req.body.HomeTown )+ ",userinfo.Languages = " +mysql.escape( req.body.Language )+ 
    // ",userinfo.Gender = " +mysql.escape( req.body.Gender )+ " WHERE userinfo.Firstname="+mysql.escape(req.body.firstname)+"";
    // console.log(sql);
    // pool.getConnection(function(err,con){
    //     if(err){
    //         res.writeHead(400,{
    //             'Content-Type' : 'text/plain'
    //         })
    //         console.log("Could not get connection object");
    //         res.end("Could Not Get Connection Object");
    //     }else
    //     {
    //         con.query(sql1,function(err){
    //             if (err){
    //                 console.log("in");
    //             }
    //        });
    // con.query(sql,function(err,result){
    //     if(err){
    //         console.log(err);
    //         res.writeHead(400,{
    //             'Content-Type' : 'text/plain'
    //         })
    //         res.end("Error While inserting data");
    //     }else{
    //         res.writeHead(200,{
    //             'Content-Type' : 'text/plain'
    //         })
    //         res.end('InsertSuccess');
       
    //     }
    //     });
        
    //     }
        
    // });

app.post('/checkproperty',function(req,res){
    
    console.log("Inside check property Post Request");
        var place = req.body.place;
        var arrivaldate = req.body.arrivaldate;
        var departdate = req.body.departdate;
        var guest = req.body.guest;
        console.log(place+" "+arrivaldate+" "+departdate+" "+guest);
        Property.find(
        {
                city:req.body.place,
                startdate:req.body.arrivaldate,
                enddate:req.body.departdate,
                accomodates:req.body.guest
        },function(err,users){
            if (err) {
                console.log(err);
                console.log("Error fetching property");
                failureCallback();

            }
            else{
                var resData={
                    city:req.body.place,
                    startdate:req.body.arrivaldate,
                    enddate:req.body.departdate,
                    accomodates:req.body.guest
                }
                console.log("Property obtained: ",users);
                res.send("200",resData);
            }
        })
        
        
        // .then((property)=>{

        //     var resData={
        //         city:req.body.place,
        //         startdate:req.body.arrivaldate,
        //         enddate:req.body.departdate,
        //         accomodates:req.body.guest
        //     }
        //     console.log("Property obtained: ",property);
        //     res.send("200",resData);
        // },(err)=>{
        //     console.log(err);
        //     console.log("Error fetching property");
        //     failureCallback();  
        // }
        
        
        
        // var sql = "SELECT *  FROM property WHERE city = " + 
        //         mysql.escape(place) + "and startdate <= " + mysql.escape(arrivaldate) + " and enddate >=" + mysql.escape(departdate) + " and accomodates >=" + mysql.escape(guest) + "and booked=0";

    // pool.getConnection(function(err,con){
        // if(err){
        //     res.writeHead(400,{
        //         'Content-Type' : 'text/plain'
        //     })
        //     console.log(err);
        //     console.log("connection object no found");
        //     res.end("Could Not Get Connection Object");
        // }else{  
            // con.query(sql,function(err,result){
            //     if(err){
            //         console.log("property not available");
            //         res.writeHead(400,{
            //             'Content-Type' : 'text/plain'
            //         })
            //         res.end("Property not available");
            //     }else{
            //         console.log("property available");
            //         req.session.user = result;
            //         var properties=JSON.stringify(result);
            //             console.log(properties);
            //             res.cookie('place',req.body.place,{maxAge: 900000, httpOnly: false, path : '/'});
            //             res.cookie('startdate', req.body.arrivaldate,{maxAge: 900000, httpOnly: false, path : '/'});
            //             res.cookie('enddate',req.body.departdate,{maxAge: 900000, httpOnly: false, path : '/'});
            //             res.cookie('guest',req.body.guest,{maxAge: 900000, httpOnly: false, path : '/'});

            //             res.writeHead(200,{
            //                 'Content-Type' : 'text/plain'
            //             })
            //             var resData={

            //             }
            //             res.end(JSON.stringify(result));
            //     }
           // });
       // }
    //});
    
});

app.post('/travellerdashboard',function(req,res){
    
    console.log("Inside traveller dashboard Post Request");
    console.log(req.body);
        var place = req.body.place;
        var arrivaldate = req.body.startdate;
        var departdate = req.body.enddate;
        var guest = req.body.guest;

        Property.find({
            city:place,
            startdate:{$lte: arrivaldate},
            enddate:{$gte: departdate},
            accomodates:{$gte:guest}
        },function(err,result)
        {if(err)
        {
            console.log(err);
            failureCallback(err);
            return;
        }
        else{
            
            console.log("Property fetched");
            console.log(result);
            res.send(result);

        }}
        )
        

        // console.log(place+" "+arrivaldate+" "+departdate+" "+guest);
        // var sql = "SELECT *  FROM property WHERE city = " + 
        //         mysql.escape(place) + "and startdate <= " + mysql.escape(arrivaldate) + " and enddate >=" + mysql.escape(departdate) + " and accomodates >=" + mysql.escape(guest);

    // pool.getConnection(function(err,con){
        // if(err){
        //     res.writeHead(400,{
        //         'Content-Type' : 'text/plain'
        //     })
        //     console.log(err);
        //     console.log("connection object no found");
        //     res.end("Could Not Get Connection Object");
        // }else{  
            // con.query(sql,function(err,result){
                // if(err){
                //     console.log("property not available");
                //     res.writeHead(400,{
                //         'Content-Type' : 'text/plain'
                //     })
                //     res.end("Property not available");
                // }else{
                //     console.log("property available");
                //     req.session.user = result;
                //     console.log("traveller request",result);
                //     var properties=JSON.stringify(result);
                //         //console.log(properties);

                //         res.writeHead(200,{
                //             'Content-Type' : 'text/plain'
                //         })
                //         //console.log(properties);
                //         res.end(properties);
                // }
           // });
       // }
    //});
    
});
app.post('/filter',function(req,res){
    
    console.log("Inside traveller dashboard Post Request");
    console.log(req.body);
        var place = req.body.place;
        var arrivaldate = req.body.startdate;
        var departdate = req.body.enddate;
        var bedroom = req.body.bedroom;
        var price = req.body.price;

        Property.find({
            city:place,
            startdate:{$lte: arrivaldate},
            enddate:{$gte: departdate},
            bedrooms:bedroom,
            Nightbaserates:{$lte:price}
        },function(err,result)
        {if(err)
        {
            console.log(err);
            res.statusCode("400");
            return;
        }
        else{
            console.log("Property fetched");
            console.log(result);
            res.send(result);

        }}
        )
    });
app.post('/fetchpropiddata',function(req,res){
    
    console.log("Inside traveller dashboard id Post Request");
        var propid = req.body.propid;
        console.log(propid);
        Property.find({
            _id:propid
        },function(err,result)
        {if(err)
        {
            console.log(err);
            failureCallback(err);
            return;
        }
        else{
            
            console.log("Property fetched");
            console.log(result);
            res.send(result);

        }}
        )
    //     var sql = "SELECT *  FROM property WHERE propertyid = " + 
    //             mysql.escape(propid) ;

    // pool.getConnection(function(err,con){
    //     if(err){
    //         res.writeHead(400,{
    //             'Content-Type' : 'text/plain'
    //         })
    //         console.log(err);
    //         console.log("connection object no found");
    //         res.end("Could Not Get Connection Object");
    //     }else{  
    //         con.query(sql,function(err,result){
    //             if(err){
    //                 console.log("property not available");
    //                 res.writeHead(400,{
    //                     'Content-Type' : 'text/plain'
    //                 })
    //                 res.end("Property not available");
    //             }else{
    //                 console.log("property available");
    //                 var properties=JSON.stringify(result);
    //                     console.log(properties);

    //                     res.writeHead(200,{
    //                         'Content-Type' : 'text/plain'
    //                     })
    //                     console.log(properties);
    //                     res.end(properties);
    //             }
    //         });
    //     }
    // });
    
});
app.post('/download/:file(*)',(req, res) => {
    console.log("Inside download file");
    var file = req.params.file;
    var fileLocation = path.join(__dirname + '/uploads',file);
    var img = fs.readFileSync(fileLocation);
    var base64img = new Buffer(img).toString('base64');
    res.writeHead(200, {'Content-Type': 'image/png' });
    res.end(base64img);
  });
app.post('/ownerlogin',function(req,res){
    
    console.log("Inside Owner Login Post Request");
        var username = req.body.username;
        var password = req.body.password;
        console.log(username+" "+password);
        Users.findOne({username:username,plainpassword:password}).then((user)=>{
            console.log("Users",user)
            res.code = "200";
            res.send({user});
        },(err) => {
            res.code = "400";
            res.send("Bad Request");
        })
        // Users.findOne({
        //     username:username,
        //     password:password
        // }, function(err,result){
        //     if (err) {
        //         res.code = "400";
        //         console.log(res.value);
        //         // res.sendStatus(400).end(); 
        //         failureCallback(err);
        //         console.log("in");
        //             return;
        //     } 
        //     else
        //     {
        //         // res.code = "200";
        //         // res.value = users;
        //         console.log("Login success");
        //         console.log(result);
        //         // res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
        //         res.send("200",result);
        //     }
        // })
        // var sql = "SELECT *  FROM UserTable WHERE Username = " + 
        //         mysql.escape(username) + "and PlainPassword = " + mysql.escape(password);

    // pool.getConnection(function(err,con){
    //     if(err){
    //         res.writeHead(400,{
    //             'Content-Type' : 'text/plain'
    //         })
    //         console.log(err);
    //         console.log("connection object no found");
    //         res.end("Could Not Get Connection Object");
    //     }else{  
    //         con.query(sql,function(err,result){
    //             if(err){
    //                 console.log("Inavlid Credentials");
    //                 res.writeHead(400,{
    //                     'Content-Type' : 'text/plain'
    //                 })
    //                 res.end("Invalid Credentials");
    //             }else{
    //                 console.log("successful login");
    //                 req.session.user = result;
    //                 var users=JSON.stringify(result);
    //                 var user=JSON.parse(users);
    //                 console.log(users);
    //                 for(var i=0;i<user.length;i++)
    //                 {
    //                     res.cookie('ownername',user[i].Firstname,{maxAge: 900000, httpOnly: false, path : '/'});
    //                     res.cookie('owneruserid',user[i].userid,{maxAge: 900000, httpOnly: false, path : '/'});
    //                     console.log(user[i].Firstname);
    //                 }

    //                     res.writeHead(200,{
    //                         'Content-Type' : 'text/plain'
    //                     })
    //                     res.end("Successful Login");
    //             }
    //         });
    //     }
    // });
    
});
app.post('/ownerdashboard', function(req,res){
    console.log("inside ownerdashboard");
    console.log(req.body.userid);

    Property.find({
        username:req.body.username
    },
    function(err,result){
        if(err)
        {
            console.log(err);
            res.send("400");
        }
        else
        {
            console.log(result);
            res.send("200",JSON.stringify(result));
        }
    })
    // var sql = "SELECT * FROM property where userid="+
    // req.body.userid;
    // pool.getConnection(function(err,con){
    //     if(err){
    //         res.writeHead(400,{
    //             'Content-Type' : 'text/plain'
    //         })
    //         console.log("Could not get connection object");
    //         res.end("Could Not Get Connection Object");
    //     }else{
    //         con.query(sql,function(err,result){
    //             if(err){
    //                 res.writeHead(400,{
    //                     'Content-Type' : 'text/plain'
    //                 })
    //                 console.log("error while fetching data ");
    //                 res.end("Could Not Get Connection Object");   
    //             }else{
    //                 res.writeHead(200,{
    //                     'Content-Type' : 'application/json'
    //                 })
    //                 console.log("fetching successfull");
    //                 console.log(JSON.stringify(result));
    //                 res.end(JSON.stringify(result));
    //             }
    //         });
    //     }
    // })
    
})

app.post('/signup',function(request,response){
    console.log("Inside Create Request Handler");
    if (!request.body.email || !request.body.password) {
        response.status(400).json({success: false, message: 'Please enter username and password.'});
        console.log("False Method");
    }
    else
    {
        console.log("True Mthod");
        var newUser = {
            username: request.body.email,
            password: request.body.password,
            firstname:request.body.firstname,
            lastname:request.body.lastname
        };

        // Attempt to save the user
        db.createUser(newUser, function (res) {
           console.log("user created");
           var resData={
            username: request.body.email,
            password: request.body.password,
            firstname:request.body.firstname,
            lastname:request.body.lastname
        }
            return response.status(200).json({success: true, message: 'username address done',resData});
        }, function (err) {
            console.log("error creating user");
            console.log(err);
            return response.status(400).json({success: false, message: 'That username address already exists.',resData});
        });



        //normal signup without decrypt
    // var sql = "INSERT INTO  usertable(Firstname,Lastname,Username,Password) VALUES ( " + 
    // mysql.escape(req.body.firstname) + " , " + mysql.escape(req.body.lastname ) + " , "+ mysql.escape(req.body.email ) + ","+
    // mysql.escape(req.body.password ) + " ) ";
    // pool.getConnection(function(err,con){
    //     if(err){
    //         res.writeHead(400,{
    //             'Content-Type' : 'text/plain'
    //         })
    //         console.log("Could not get connection object");
    //         res.end("Could Not Get Connection Object");
    //     }else
    //     {
    // con.query(sql,function(err,result){
    //     if(err){
    //         console.log(err);
    //         res.writeHead(400,{
    //             'Content-Type' : 'text/plain'
    //         })
    //         res.end("Error While inserting data");
    //     }else{
    //         res.writeHead(200,{
    //             'Content-Type' : 'text/plain'
    //         })
    //         res.end('Sign Up Successfull');
       
    //     }
    //     });
    //     }
    // });
}
});

//Protected authenticated route with JWT
app.get('/protectedRoute', requireAuth, function (request, response) {
    response.send('Your User id is: ' + request.user.id + ', username is: ' + request.user.username + '.');
});

// Home route. We'll end up changing this to our main front end index later.
app.get('/', function (req, res) {
    res.send('This Route is not yet defined.');
});
app.post('/locdata',function(req,res){
    console.log("in post location method");
    // console.log(req.session.user);
    // if(!req.session.user){
    //     res.redirect('/');
    // }else{
        console.log(req.body);
        var newprop = {propid:1,add1: req.body.add1, add2: req.body.add2, city : req.body.city,zipcode: req.body.zipcode, country: req.body.country, headline:"",description:"",proptype:"",bedrooms:"",accomodates:"",bathrooms:"",startdate:"",enddate:"",currency:"",Nightbaserate:"",minstay:"",username :req.body.username};
        property.push(newprop);
        console.log(property);
        console.log("Location Added Successfully!!!!");
        res.send("200");
    // }
    
});
app.post('/displaytravdata',function(req,res){
    console.log("in post display traveller method");
    res.cookie('proptravid',req.body.propertyid,{maxAge: 900000, httpOnly: false, path : '/'});
    res.end("200"); 
});
app.post('/ownerbookdetails',function(req,res){
    console.log("in post booking owner method");
    res.cookie('propbookid',req.body.propertyid,{maxAge: 900000, httpOnly: false, path : '/'});
    res.end("200"); 
});
app.post('/detailsdata',function(req,res){
    console.log("in post details method");
    // console.log(req.session.user);
    // if(!req.session.user){
    //     res.redirect('/');
    // }else{
        console.log(req.body);
        for (var i in property) {
            if (property[i].propid == 1) {
                property[i].headline = req.body.headline;
                property[i].description = req.body.description;
                property[i].proptype = req.body.proptype;
                property[i].bedrooms = req.body.bedrooms;
                property[i].accomodates = req.body.accomodates;
                property[i].bathrooms = req.body.bathrooms;
            }
          }
        console.log(property);
        console.log("Details Added Successfully!!!!");
        res.send("200");
    // }
    
});

app.post('/availdata',function(req,res){
    console.log("in post availability method");
    // console.log(req.session.user);
    // if(!req.session.user){
    //     res.redirect('/');
    // }else{
        console.log(req.body);
        for (var i in property) {
            if (property[i].propid == 1) {
                property[i].startdate = req.body.startdate;
                property[i].enddate = req.body.enddate;
            }
          }
        console.log(property);
        console.log("Details Added Successfully!!!!");
        res.send("200");
    // }
    
});

app.post('/pricedata',function(req,res){
    console.log("in post price method");
    // console.log(req.session.user);
    // if(!req.session.user){
    //     res.redirect('/');
    // }else{
        
        console.log(req.body);
        for (var i in property) {
            if (property[i].propid == 1) {
                var address=property[i].add1 + property[i].add2;
                var properties = new Property({
                    username : property[i].username,
                    address : address,
                    city : property[i].city,
                    country : property[i].country,
                    zipcode : property[i].zipcode,
                    headline : property[i].headline,
                    description : property[i].description,
                    bedrooms : property[i].bedrooms,
                    accomodates : property[i].accomodates,
                    bathrooms : property[i].bathrooms,
                    startdate : property[i].startdate,
                    enddate : property[i].enddate,
                    currency : req.body.currency,
                    Nightbaserates : req.body.nightbaserent,
                    minstay : req.body.minstay,
                    image : property[i].location,
                    proptype : property[i].proptype,
                    imagename : property[i].imagename,
                    travellername : " ",
                    booked:0
                });
                console.log("data properties ",properties);
                properties.save().then((property)=>{
                    console.log("Property created : ",property);
                    res.send("200");
                },(err)=>{
                console.log(err);
                console.log("Error Creating Property");
                res.send("400"); 
                })
    

                //mysql logic for inserting property
                // var sql = "INSERT INTO  Property(address,city,country,zipcode,headline,description,bedrooms,accomodates,bathrooms,startdate,enddate,currency,Nightbaserates,minstay,userid,image,proptype,imagename) VALUES ( " + 
                // mysql.escape(address) + " , " + mysql.escape(property[i].city) + " , "+
                // mysql.escape(property[i].country) + " , " + mysql.escape(property[i].zipcode)+" , " +
                // mysql.escape(property[i].headline)+" , " +mysql.escape(property[i].description)+" , " +mysql.escape(property[i].bedrooms)+" , " +mysql.escape(property[i].accomodates)+" , " +mysql.escape(property[i].bathrooms)+" , " +mysql.escape(property[i].startdate)+" , " +mysql.escape(property[i].enddate)+" , " +mysql.escape(req.body.currency)+" , " +mysql.escape(req.body.nightbaserent)+" , " +mysql.escape(req.body.minstay)+" , " +mysql.escape(property[i].userid)+" , " +mysql.escape(property[i].location)  + " , " + mysql.escape(property[i].proptype) + " , " + mysql.escape(property[i].imagename) +
                // " ) ";
            }
          }
        //   pool.getConnection(function(err,con){
            // if(err){
            //     res.writeHead(400,{
            //         'Content-Type' : 'text/plain'
            //     })
            //     console.log("Could not get connection object");
            //     res.end("Could Not Get Connection Object");
            // }else
            // {
        //con.query(sql,function(err,result){
            // if(err){
            //     console.log(err);
            //     res.writeHead(400,{
            //         'Content-Type' : 'text/plain'
            //     })
            //     res.end("Error While Creating property");
            // }else{
            //     res.writeHead(200,{
            //         'Content-Type' : 'text/plain'
            //     })
            //     res.end('Property added Successfully');
           
            // }
            //});
           // }
        // });
        console.log(property);
        console.log("Property Added Successfully!!!!");
    // }
    
});
app.post('/booking',function(req,res){
    console.log("in booking method");
    // console.log(req.session.user);
    // if(!req.session.user){
    //     res.redirect('/');

    // }else{
                var date1 = new Date(req.body.startdate);
                var date2 = new Date(req.body.enddate);
                var timeDiff = Math.abs(date2.getTime() - date1.getTime());
                var totaldays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
                var totalcharge=totaldays*req.body.rates;
                var booking=new Booking({
                    propertyid:req.body.propertyid,
                    username:req.body.username,
                    startdate:req.body.startdate,
                    enddate:req.body.enddate,
                    guests:req.body.guests,
                    rates:req.body.rates,
                    totalcharge:req.body.totalcharge,
                    city:req.body.city
                })
                //console.log("data properties ",properties);
                booking.save().then((bookproperty)=>{
                    console.log("Property created : ",bookproperty);
                    Property.findOneAndUpdate({
                        "_id":req.body.propertyid
                    },
                    {
                        $set:
                        {
                            booked:1,
                            travellername:req.body.username,
                        }
                    },
                    {
                        upsert:true
                    }).then((result)=> {
                        console.log("Updated Prperty:",result);      
                    },(err)=>{
                        console.log(err);
                        console.log("Error Updating Property");
                        res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                        })
                        res.end("Error Updating Property");
                    })
                 
                    res.send("200");
                },(err)=>{
                console.log(err);
                console.log("Error Creating Property");
                res.send("400"); 
                })
                // var sql = "INSERT INTO  bookingdetails(propertyid,userid,startdate,enddate,guests,rates,totalcharge,city) VALUES ( " + 
                // mysql.escape(req.body.propertyid) + " , " + mysql.escape(req.body.userid) + " , "+
                // mysql.escape(req.body.startdate) + " , " + mysql.escape(req.body.enddate)+" , " +
                // mysql.escape(req.body.guests)+" , " +mysql.escape(req.body.rates)+" , " +mysql.escape(totalcharge)  + " , " +
                // mysql.escape(req.body.city) +
                // " ) ";
                
                // var sql1 = "UPDATE property SET booked = 1,	travellerid = " +mysql.escape(req.body.userid)+ " WHERE propertyid="+mysql.escape(req.body.propertyid)+"";
                
         // pool.getConnection(function(err,con){
            // if(err){
            //     res.writeHead(400,{
            //         'Content-Type' : 'text/plain'
            //     })
            //     console.log("Could not get connection object");
            //     res.end("Could Not Get Connection Object");
            // }else
            // {
            //     con.query(sql1,function(err){
            //         if (err){
            //             console.log("in");
            //         }
            //    });
        //con.query(sql,function(err,result){
            // if(err){
            //     console.log(err);
            //     res.writeHead(400,{
            //         'Content-Type' : 'text/plain'
            //     })
            //     res.end("Error While booking");
            // }else{
            //     res.writeHead(200,{
            //         'Content-Type' : 'text/plain'
            //     })
            //     res.end('BookingSuccess');
           
            // }
            //});
            
            
            //}
        //});
        console.log(property);
        console.log("Property Added Successfully!!!!");
    // }
    
});
app.post('/fetchbookingdetails', function(req,res){
    console.log("inside bboking details method");
    console.log(req.body.username);

    Booking.find({
        username:req.body.username
    },
    function(err,result)
    {
        if(err)
        {
            console.log(err);
            res.send("400");
        }
        else
        {
            console.log("My Trips Data",result);
            res.send("200",JSON.stringify(result));
        }
    })
    // var sql = "SELECT * FROM bookingdetails where userid="+
    // req.body.userid;
    // pool.getConnection(function(err,con){
    //     if(err){
    //         res.writeHead(400,{
    //             'Content-Type' : 'text/plain'
    //         })
    //         console.log("Could not get connection object");
    //         res.end("Could Not Get Connection Object");
    //     }else{
    //         con.query(sql,function(err,result){
    //             if(err){
    //                 res.writeHead(400,{
    //                     'Content-Type' : 'text/plain'
    //                 })
    //                 console.log("error while fetching booking data ");
    //                 res.end("Could Not Get Connection Object");   
    //             }else{
    //                 res.writeHead(200,{
    //                     'Content-Type' : 'application/json'
    //                 })
    //                 console.log("fetching successfull");
    //                 console.log(JSON.stringify(result));
    //                 res.end(JSON.stringify(result));
    //             }
    //         });
    //     }
    // })
    
})
app.post('/fetchownerbookingdetails', function(req,res){
    console.log("inside bboking details method");
    console.log(req.body.propertyid);

    Booking.find({
        propertyid:req.body.propertyid
    },
    function(err,result)
    {
        if(err)
        {
            console.log(err);
            res.send("400");
        }
        else
        {
            console.log("Booked Properties");
            console.log(result);
            res.send("200",result);
        }
    }
    )

    // var sql = "SELECT * FROM bookingdetails where propertyid="+
    // req.body.propertyid;
    // pool.getConnection(function(err,con){
    //     if(err){
    //         res.writeHead(400,{
    //             'Content-Type' : 'text/plain'
    //         })
    //         console.log("Could not get connection object");
    //         res.end("Could Not Get Connection Object");
    //     }else{
    //         con.query(sql,function(err,result){
    //             if(err){
    //                 res.writeHead(400,{
    //                     'Content-Type' : 'text/plain'
    //                 })
    //                 console.log("error while fetching booking data ");
    //                 res.end("Could Not Get Connection Object");   
    //             }else{
    //                 res.writeHead(200,{
    //                     'Content-Type' : 'application/json'
    //                 })
    //                 console.log("fetching successfull");
    //                 console.log(JSON.stringify(result));
    //                 res.end(JSON.stringify(result));
    //             }
    //         });
    //     }
    // })
    
})

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");