import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

//Define a Login Component
class ListProp extends Component
{
    //call the constructor method
    constructor(props)
    {
        //Call the constrictor of Super class i.e The Component
        super(props);
        this.state = {
            firstname : "",
            lastname:"",
            email:"",
            password : "",
            location : false
        }
        //Bind the handlers to this class
        this.aad1ChangeHandler = this.aad1ChangeHandler.bind(this);
        this.add2ChangeHandler = this.add2ChangeHandler.bind(this);
        this.cityChangeHandler = this.cityChangeHandler.bind(this);
        this.zipcodeChangeHandler = this.zipcodeChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        
    }

    componentWillMount(){
        this.setState({
            location : false
        })
    }
    aad1ChangeHandler = (e) => {
        this.setState({
            add1 : e.target.value
        })
    }

    add2ChangeHandler = (e) => {
        this.setState({
            add2 : e.target.value
        })
    }

    cityChangeHandler = (e) => {
        this.setState({
            city : e.target.value
        })
    }
    zipcodeChangeHandler = (e) => {
        this.setState({
            zipcode : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    countryChangeHandler = (e) => {
        this.setState({
            country : e.target.value
        })
    }
    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            add1:this.state.add1,
            add2 : this.state.add2,
            city:this.state.city,
            zipcode : this.state.zipcode,
            country : this.state.country,
            cookiedata:cookie.load("userid")
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/locdata',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    this.setState({
                        location:true
                    })
                }else{
                    this.setState({
                        location : false
                    })
                }
            });
    }

    render()
    {
        let redirectVar = null;
        if(this.state.location){
            redirectVar = <Redirect to= "/listpropdetails"/>
        }
        return( 

    <div class="container">
    {redirectVar}
        <div class=" navbar .header-bce .header.navbar loginnavbar">
            <div class="HomeAwayLeft">
                <div class="navbar-inner">
                    <a href="#" class="logo" title="HomeAway"><img src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/logo-bceheader.svg"></img></a>
                </div>
            </div>
        </div>
        <div class="header-bce-birdhouse-container">
            <div class="flip-container">
                <div class="flipper">
                    <div class="front btn-bce">
                        <img src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/birdhouse-bceheader.svg">
                        </img>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <div class="checklist-progress-bar-container">
                    <div class="checklist-progress-bar">
                        <div class="progress-message">
                            <div id="message-text">Progress</div>
                        </div>
                        <div class="progress">
                            <div class="progress-bar" role="progressbar"></div>
                        </div>
                        <hr></hr>
                    </div>
                    <div class="nav-list-toggle">
                    <i class="icon icon-chevron-down" aria-hidden="true"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 sidenav">
                <div> <a href="#">Welcome</a></div>
                <div><a class="highlighted" href="/listprop">Location</a></div>
                <a href="/listpropdetails">Details</a>
                <a href="#">Booking Options</a>
                <a href="/image">Photos</a> 
                <a href="#">Security</a>
                <a href="#">Payment</a>
                <a href="/listpropavailability">Pricing</a>
                <div class="innersidebar">
                    <a href="/listpropavailability">Availbiity</a>
                    <a href="/rentalprice">Rental Rates</a>
                    <a href="#">Taxes</a>
                    <a href="#">Fees</a>    
                </div>       
            </div>
            <div class="location">
            <div class="login-form">
            <div class="main-location">
                <div class="panel">
                    <h2>Address</h2>
                </div>
                
                    <div class="form-group">
                        <input onChange = {this.aad1ChangeHandler} type="text" class="form-control" name="add1" placeholder="Address Line 1" autofocus/>
                    </div>
                    <div class="form-group">
                        <input onChange = {this.add2ChangeHandler} type="text" class="form-control" name="add2" placeholder="Address Line 2"/>
                    </div>
                    <div class="form-group">
                        <input type="text" onChange = {this.cityChangeHandler} class="form-control" name="city" placeholder="Enter City"/>
                    </div>

                    <div class="row loc">
                        <div class="col-md-6">
                            <input type="text" onChange = {this.countryChangeHandler} class="form-control" name="country" placeholder="Enter Country"/>
                        </div>
                        <div class="col-md-6">
                            <input type="text" onChange = {this.zipcodeChangeHandler} class="form-control" name="postalcode" placeholder="Enter Zip Code"/>
                        </div>
                    </div>
                    <div>
                    <button onClick = {this.submitLogin} class="btn btn-primaryloc btndesign">Submit</button>
                    </div>
                
            </div>         
            </div>
            </div>
        </div>
    </div>
)
}
}
export default ListProp;