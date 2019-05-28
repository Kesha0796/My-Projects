import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
// import {browserHistory} from 'react-router';

//Define a Login Component
class SignUp extends Component
{
    //call the constructor method
    constructor(props)
    {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            username : "",
            password : "",
            authFlag : false
        }
        //Bind the handlers to this class
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            authFlag : false
        })
    }
    //username change handler to update state variable with the text entered by the user
    usernameChangeHandler = (e) => {
        this.setState({
            username : e.target.value
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
        // browserHistory.push('/signupinner');
        this.props.history.push('/signupinner');
        // var headers = new Headers();
        // //prevent page from refresh
        // e.preventDefault();
        // const data = {
        //     username : this.state.username,
        //     password : this.state.password
        // }
        // //set the with credentials to true
        // axios.defaults.withCredentials = true;
        // //make a post request with the user data
        // axios.post('http://localhost:3001/login',data)
        //     .then(response => {
        //         console.log("Status Code : ",response.status);
        //         if(response.status === 200){
        //             this.setState({
        //                 authFlag : true
        //             })
        //         }else{
        //             this.setState({
        //                 authFlag : false
        //             })
        //         }
        //     });
    }

    render()
    {
        //redirect based on successful login
        // let redirectVar = null;
        // if(cookie.load('cookie')){
        //     redirectVar = <Redirect to= "/home"/>
        // }
        return(        
        <div class="container">
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
            
            <div class="signupbackclr">
                <div class="loginheader">
                    <h1 class="loginhome">Sign Up for HomeAway </h1>
                    <div class>
                    <h4>
                        <span>Already have an account? </span>
                        <a class="a1" href="#">Log in</a>
                        </h4>
                        
                    </div>
                </div>
                <div class="login-form">
                    <div class="main-divsignup">
                            <div>
                            <button onClick = {this.submitLogin} class="btn btn-primarysignup btndesign">Sign Up with Email</button>
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
                        <label class="footer-label">By creating an account you are accepting our <a class="a1" href="http://www.homeaway.com/info/about-us/legal/terms-conditions" target="_blank">Terms and Conditions</a> and <a class="a1" href="http://www.homeaway.com/info/about-us/legal/privacy-policy" target="_blank">Privacy Policy</a>.</label>
            </div>
                    </div>         
                    </div>
                </div>
            </div>
            
        )
    }
}
//export Login Component
export default SignUp;