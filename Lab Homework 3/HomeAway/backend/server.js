var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
app.set('view engine', 'ejs');
const port = process.env.PORT || 3001;
var kafka = require('./kafka/client');
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
const path = require('path');
var {mongoose} = require('../backend/db/mangoose');
var {questions} = require('./models/questions');
const fs = require('fs');
const multer = require('multer');
var newFilename=" ";
var db = require('./app/db');

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
  const upload = multer({ storage });
  var property=[];
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

  app.post('/imageupload', upload.any(), (req, res) => {
      console.log(req.body);
    //console.log("Req : ",req);
    for (var i in property) {
        if (property[i].propid == 1) {
            var fileLocation = path.join(__dirname + '/uploads',newFilename);
            property[i].location=req.body.description;
            property[i].imagename=req.body.description;
        }
    }
    console.log(property);
    console.log("Res : ",res.file);
    res.send(); 
    });

  app.post('/ownerlogin',function(req,res){
    
    kafka.make_request('test',req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("Inside else");
            console.log("login data",results);
                res.cookie('ownername',results.result.user.username,{maxAge: 900000, httpOnly: false, path : '/'});
                res.json({
                    updatedList:results
                });
                res.end();
            }
        
    });

}); 
app.post('/getTravellerQuestionDetails',function(req,res){

    console.log("Inside fetching questionare for traveller");

    questions.find({travellername:req.body.travellername},function(err,result){
        if(err)
        {
            console.log(err);
            res.send("400");
            return;
        }
        else{
            console.log(result);
            res.writeHead(200,{
                'Content-Type' : 'application/json'
                })
                                   
                res.end(JSON.stringify(result));
        }
    })
})
app.post('/getOwnerQuestionDetails',function(req,res){

    console.log("Inside fetching questionare for owner");
    console.log(req.body);

    questions.find({ownername:req.body.ownername},function(err,result){
        if(err)
        {
            console.log(err);
            res.send("400");
            return;
        }
        else{
            console.log(result);
            res.writeHead(200,{
                'Content-Type' : 'application/json'
                })
            res.end(JSON.stringify(result));
        }
    })
})
app.post('/answer',function(req,res){

    console.log("Inside answer section for owner");
    console.log(req.body);

    questions.findOneAndUpdate({_id:req.body.questionID},{
        $set:
        {
            answer:req.body.answer,
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
})
    app.post('/download/:file(*)',(req, res) => {
        console.log("Inside download file");
        var file = req.params.file;
        var fileLocation = path.join(__dirname + '/uploads',file);
        var img = fs.readFileSync(fileLocation);
        var base64img = new Buffer(img).toString('base64');
        res.writeHead(200, {'Content-Type': 'image/png' });
        res.end(base64img);
      });
    
      app.post('/travellerdashboard',function(req,res){
    
        console.log("Inside traveller dashboard Post Request");
        kafka.make_request('travellerdashboard',req.body, function(err,results){
            console.log('in result');
            console.log(results);
            if (err){
                console.log("Inside err");
                res.json({
                    status:"error",
                    msg:"System Error, Try Again."
                })
            }else{
                console.log("Inside else");
                res.json({
                        updatedList:results
                    });
                    res.end();
                }
            
        });
    });
    app.post('/filter',function(req,res){
    
        console.log("Inside filter request");
        kafka.make_request('filter',req.body, function(err,results){
            console.log('in result');
            console.log(results);
            if (err){
                console.log("Inside err");
                res.json({
                    status:"error",
                    msg:"System Error, Try Again."
                })
            }else{
                console.log("Inside else");
                res.json({
                        updatedList:results
                    });
    
        //             this.setState({
                    res.end();
                }
            
        });
        });

        app.post('/ownerfilter',function(req,res){
    
            console.log("Inside filter request");
            kafka.make_request('ownerfilter',req.body, function(err,results){
                console.log('in result');
                console.log(results);
                if (err){
                    console.log("Inside err");
                    res.json({
                        status:"error",
                        msg:"System Error, Try Again."
                    })
                }else{
                    console.log("Inside else");
                    res.json({
                            updatedList:results
                        });
        
            //             this.setState({
                        res.end();
                    }
                
            });
            });
    
app.post('/checkproperty',function(req,res){
    console.log("In check property method");
        kafka.make_request('checkproperty',req.body, function(err,results){
            console.log('in result');
            console.log(results);
            if (err){
                console.log("Inside err");
                res.json({
                    status:"error",
                    msg:"System Error, Try Again."
                })
            }else{
                console.log("Inside else");
                res.json({
                        updatedList:results
                    });
    
        //             this.setState({
                    res.end();
                }
            
        });
        
    });
    app.post('/fetchpropiddata',function(req,res){
    
        kafka.make_request('fetchpropid',req.body, function(err,results){
            console.log('in result');
            console.log(results);
            if (err){
                console.log("Inside err");
                res.json({
                    status:"error",
                    msg:"System Error, Try Again."
                })
            }else{
                console.log("Inside else");
                res.json({
                        updatedList:results
                    });
    
                    res.end();
                }
            
        });
    });
    app.post('/fetchbookingdetails', function(req,res){
        console.log("In book property method");
        kafka.make_request('mytrips',req.body, function(err,results){
            console.log('in result');
            console.log(results);
            if (err){
                console.log("Inside err");
                res.json({
                    status:"error",
                    msg:"System Error, Try Again."
                })
            }else{
                console.log("Inside else");
                res.json({
                        updatedList:results
                    });
                    res.end();
                } 
        });
    })

    app.post('/signup',function(request,response){
        console.log("In signup method");
        kafka.make_request('signup',request.body, function(err,results){
            console.log('in result');
            console.log(results);
            if (err){
                console.log("Inside err");
                response.json({
                    status:"error",
                    msg:"System Error, Try Again."
                })
            }else{
                console.log("Inside else");
                response.json({
                        updatedList:results
                    });
                    response.end();
                } 
        });
    });
    app.post('/display1', function(req,res){
        console.log("In edit profile property method");
        kafka.make_request('editprofile',req.body, function(err,results){
            console.log('in result');
            console.log(results);
            if (err){
                console.log("Inside err");
                res.json({
                    status:"error",
                    msg:"System Error, Try Again."
                })
            }else{
                console.log("Inside else");
                res.json({
                        updatedList:results
                    });
                    res.end();
                } 
        });
        
    });
    app.post('/EditProfile',function(req,res){
        console.log("In edit profile method");
        kafka.make_request('profileedit',req.body, function(err,results){
            console.log('in result');
            console.log(results);
            if (err){
                console.log("Inside err");
                res.json({
                    status:"error",
                    msg:"System Error, Try Again."
                })
            }else{
                console.log("Inside else");
                res.json({
                        updatedList:results
                    });
                    res.end();
                } 
        });
         
        
        });
    
    app.post('/booking',function(req,res){
        console.log("In book property method");
        kafka.make_request('booking',req.body, function(err,results){
            console.log('in result');
            console.log(results);
            if (err){
                console.log("Inside err");
                res.json({
                    status:"error",
                    msg:"System Error, Try Again."
                })
            }else{
                console.log("Inside else");
                res.json({
                        updatedList:results
                    });
                    res.end();
                } 
        });
    });
app.post('/login',function(request,response){

    kafka.make_request('login',request.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("Inside else");
            console.log(results);
            response.cookie('name',results.username,{maxAge: 900000, httpOnly: false, path : '/'});
            response.json({
                    updatedList:results
                });

                response.end();
            }
        
    });
});
app.post('/ownersignup',function(request,response){
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
app.post('/question',function(req,res){
    console.log("in booking method");
                
                var question=new questions({
                    propertyid:req.body.propertyid,
                    ownername:req.body.ownername,
                    travellername:req.body.travellername,
                    questionheadline:req.body.questionHeadline,
                    questiondesc:req.body.questionDescription,
                    propertyaddress:req.body.propertyaddress
                })
                //console.log("data properties ",properties);
                question.save().then((question)=>{
                    console.log("Property created : ",question);
                    res.send("200");
                },(err)=>{
                console.log(err);
                console.log("Error Creating Property");
                res.send("400"); 
                })
        console.log("Question Added Successfully!!!!");
    
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

    var resData={
        property:property,
        data:req.body
    }
    kafka.make_request('pricedata',resData, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("Inside else");
                res.json({
                    updatedList:results
                });

                res.end();
            }
        
    });

    
    // }
    
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
app.post('/ownerdashboard', function(req,res){


    kafka.make_request('ownerdashboard',req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("Inside else");
                res.json({
                    updatedList:results
                });

                res.end();
            }
        
    });
    
})
app.post('/fetchownerbookingdetails', function(req,res){
    kafka.make_request('downloadimage',req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("Inside else");
                res.json({
                    updatedList:results
                });

                res.end();
            }
        
    });
    
})


app.listen(3001);
console.log("Server Listening on port 3001");