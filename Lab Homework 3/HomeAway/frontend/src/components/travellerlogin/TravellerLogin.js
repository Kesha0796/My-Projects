import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { connect } from 'react-redux';
import { graphql, compose,withApollo } from 'react-apollo';
import {Login} from "../../queries/queries";

//Define a Login Component
class LoginUser extends Component
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
            authFlag : false,
            err:""
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
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        if(this.state.username=="" || this.state.password=="")
        {
            alert("username or password required");
        }
        else
        {
        const data1 = {
            username : this.state.username,
            password : this.state.password
        }
        var data=this.props.client.query(
            {
                query:Login,
                variables:{
                    username:data1.username,
                    password:data1.password
                }
            }
        ).then(res=>{
            console.log("Data",res);
            console.log("Data",res.data.Login);
            
            if(res.data.Login)
            {
                localStorage.setItem("email",res.data.Login.username);
                window.location.reload();
            }
            else 
            {
                this.setState({
                    err : "Invalid Login"
                })
                alert("Incorrect Username or Password")
            }
        })
    }
        //make a post request with the user data
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
        let redirectVar = null;
        // console.log(cookie.load('userid'));
        if(localStorage.getItem("email")){
            redirectVar = <Redirect to= "/firstpage"/>
        }
        //redirect based on successful login
        // let redirectVar = null;
        // if(cookie.load('cookie')){
        //     redirectVar = <Redirect to= "/home"/>
        // }
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
            
            <div class="backclr">
            <div class="mainlogin">
                <div class="loginheader">
                    <h1 class="loginhome">Log in to HomeAway </h1>
                    <div>
                    <h4>
                        <span>Need an account? </span>
                        <a class="a1" href="/signup">Sign Up</a>
                        </h4>
                        
                    </div>
                </div>
                <div class="login-form">
                    <div class="main-div">
                        <div class="panel">
                            <h2>Account Login</h2>
                        </div>
                        
                            <div class="form-group">
                                <input class="form-control" onChange = {this.usernameChangeHandler} type="text" name="username" placeholder="Email Address" required/>
                            </div>
                            <div class="form-group">
                                <input class="form-control" onChange = {this.passwordChangeHandler} type="password" name="password" placeholder="Password" required/>
                            </div>
                            <div class="forgot a">
                            <span id="forgotpassword">
                                <a class="a1" href="#">Forgot Password?</a>
                            </span>
                            </div>
                            <div>
                            <button onClick = {this.submitLogin} class="btn btn-primarytrlogin btndesign">Login</button>
                            </div>
                            <div class="checkDIV">
                                <input class="rememberme" checked="true" type="checkbox" name="signedin" value="signedin" />Keep Me signed in
                            </div>
                            <br/>
                            <div class="hr-sect"><em>or</em></div>
                            <button class="loginBtn loginBtn--facebook">
                            Login with Facebook
                            </button>
                            <button class="loginBtn loginBtn--google">
                            Login with Google
                            </button>
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
        authFlag : state.authFlag
    }
}

const mapDispatchStateToProps = dispatch => {
    return {
        onSubmitHandle : (data) => {
            axios.post('http://localhost:3001/login', data)
                .then((response) => {
                    if(response==[])
                    {
                        alert("incorrect username or password");
                    }
                    else
                    {
                    console.log(response);
                    dispatch({type: 'LOGIN',payload : response.data.resData,statusCode : response.status})
                    }
            });
        }
    }
}
//export Login Component
export default compose(graphql(Login,{name:"Login"}),connect(mapStateToProps,mapDispatchStateToProps))(withApollo(LoginUser));
