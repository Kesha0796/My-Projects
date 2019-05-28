import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { connect } from 'react-redux';
//Define a Login Component
class Login extends Component
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
            ownauthFlag : false
        }
        //Bind the handlers to this class
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            ownauthFlag : false
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
        else{
        const data = {
            username : this.state.username,
            password : this.state.password
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        this.props.onLoginHandle(data);}
        //set the with credentials to true
        //make a post request with the user data
        // axios.post('http://localhost:3001/ownerlogin',data)
        //     .then(response => {
        //         console.log("Status Code : ",response.status);
        //         if(response.status === 200){
        //             this.setState({
        //                 ownauthFlag : true
        //             })
        //         }else{
        //             this.setState({
        //                 ownauthFlag : false
        //             })
        //         }
        //     });
    }

    render()
    {
        //redirect based on successful login
         let redirectVar = null;
         if(this.props.ownerlogin){
          redirectVar = <Redirect to= "/ownerdashboard" />
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
            
            <div class="ownerbackclr">
            <div class="col-md-6 col-sm-6 hidden-xs bgimage">
            <a id="personyzeContent"></a>
            </div>
                <div class="login-form">
                    <div class="main-divowner">
                        <div class="panel">
                        <div>
                        <h4>
                            <span>Need an account? </span>
                            <a class="a1" href="/ownersignup">Sign Up</a>
                            </h4>
                            
                        </div>
                            <h2>Owner Login</h2>
                        </div>
                        
                            <div class="form-group">
                                <input onChange = {this.usernameChangeHandler} type="text" class="form-control" name="username" placeholder="Email Address" autofocus/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.passwordChangeHandler} type="password" class="form-control" name="password" placeholder="Password"/>
                            </div>
                            <div class="forgot a">
                            <span id="forgotpassword">
                                <a class="a1" href="#">Forgot Password?</a>
                            </span>
                            </div>
                            <div>
                            <button onClick = {this.submitLogin} class="btn btn-primaryowlog btndesign">Log In</button>
                            </div>
                            <div class="checkDIV">
                                <input class="rememberme" checked="true" type="checkbox" name="signedin" value="signedin" />Keep Me signed in
                            </div>
                            <br/>
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
        ownerlogin:state.ownerlogin
    }
}

const mapDispatchStateToProps = dispatch => {
    return {

        onLoginHandle : (data) => {
            console.log(data);
            axios.post('http://localhost:3001/ownerlogin', data)
                .then((response) => {
                    console.log("response from login method",response.data);
                    dispatch({type: 'OWNERLOGIN',payload : response.data.updatedList.result,statusCode : response.data.updatedList.status})
            });
            
        }
    }
}
export default connect(mapStateToProps,mapDispatchStateToProps)(Login);
//export Login Component
// export default Login;