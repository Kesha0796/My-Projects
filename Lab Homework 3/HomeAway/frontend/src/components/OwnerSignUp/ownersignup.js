import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { connect } from 'react-redux';

//Define a Login Component
class SignUpInner extends Component
{
    //call the constructor method
    constructor(props)
    {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            firstname : "",
            lastname:"",
            email:"",
            password : ""
        }
        //Bind the handlers to this class
        this.firstnameChangeHandler = this.firstnameChangeHandler.bind(this);
        this.lastnameChangeHandler = this.lastnameChangeHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
    }
    //username change handler to update state variable with the text entered by the user
    firstnameChangeHandler = (e) => {
        this.setState({
            firstname : e.target.value
        })
    }

    lastnameChangeHandler = (e) => {
        this.setState({
            lastname : e.target.value
        })
    }

    emailChangeHandler = (e) => {
        this.setState({
            email : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password : e.target.value
        })
    }
    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            firstname:this.state.firstname,
            lastname : this.state.lastname,
            email:this.state.email,
            password : this.state.password
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;

        //react sign up call
        // //make a post request with the user data
        // axios.post('http://localhost:3001/signup',data)
        //     .then(response => {
        //         console.log("Status Code : ",response.status);
        //         if(response.status === 200){
        //             this.setState({
        //                 inserted:true
        //             })
        //         }else{
        //             this.setState({
        //                 inserted : false
        //             })
        //         }
        //     });
        this.props.onSubmitHandle(data);

    }

    render()
    {
        let redirect = null;
        if(this.props.inserted){
            redirect = <Redirect to= "/ownerlogin"/>
        }
        //redirect based on successful login
        // let redirectVar = null;
        // if(cookie.load('cookie')){
        //     redirectVar = <Redirect to= "/home"/>
        // }
        return(        
        <div class="container">
        {redirect}
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
            
            <div class="innersignupbackclr">
                <div class="loginheader">
                    <h1 class="loginhome">Owner Sign Up for HomeAway </h1>
                    <div class>
                    <h4>
                        <span>Already have an account? </span>
                        <a class="a1" href="/login">Log in</a>
                        </h4>
                        
                    </div>
                </div>
                <div class="login-form">
                    <div class="main-divinnersignup">
                        <div class="row">
                            <div class="col-xs-6">
                            <input type="text" class="form-control" name="fname" placeholder="First Name" onChange={this.firstnameChangeHandler}/>
                            </div>
                            <div class="col-xs-6">
                            <input type="text" class="form-control" name="lname" placeholder="Last Name" 
                            onChange={this.lastnameChangeHandler}/>
                            </div>
                        </div>
                        <br/>
                        <div>
                        <input id="emailAddress" name="emailAddress" class="form-control input-lg" placeholder="Email address" type="email" onChange={this.emailChangeHandler}/>
                        </div>
                        <br/>
                        <div class="form-group">
                            <input id="password" name="password" class="form-control input-lg" onChange={this.passwordChangeHandler}  placeholder="Password" type="password" />
                        </div>
                        <br/>
                            <div>
                            <button onClick = {this.submitLogin} class="btn btn-primarysignup btndesign">Sign Me Up</button>
                            </div>
                            <div class="hr-sect"><em>or</em></div>
                            <button class="loginBtn loginBtnsignup--facebook">
                            Login with Facebook
                            </button>
                            <button class="loginBtn loginBtnsignup--google">
                            Login with Google
                            </button>
                            <div class="footer-label" >
                            <small>We don't post anything without your permission.</small>
                            </div>
                            <div class="text-center">
                        <label class="footer-label">By creating an account you are accepting our <a class="a1"  href="http://www.homeaway.com/info/about-us/legal/terms-conditions" target="_blank">Terms and Conditions</a> and <a class="a1" href="http://www.homeaway.com/info/about-us/legal/privacy-policy" target="_blank">Privacy Policy</a>.</label>
            </div>
                    </div>         
                    </div>
                </div>
            </div>
            
        )
    }
}
const mapStateToProps = state =>{
    console.log(state);
    return {
        inserted : state.inserted
    }
}

const mapDispatchStateToProps = dispatch => {
    return {
        onSubmitHandle : (data) => {
            axios.post('http://localhost:3001/ownersignup', data)
                .then((response) => {
                    console.log(response.data);
                    dispatch({type: 'OWNERSIGNUP',payload : response.data.updatedList,statusCode : response.status})
            });
        }
    }
}
//export Login Component
export default connect(mapStateToProps,mapDispatchStateToProps)(SignUpInner);