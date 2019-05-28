import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import image from '../PostSignUp/Profile.png';
import '../../App.css';
import cookie from 'react-cookies';

 export default class PostSignUp extends Component{
    constructor(props)
    {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            name : "",
            password : "",
            authFlag : false,
            inserted:false
        }
        this.submitLogin = this.submitLogin.bind(this) ;
    }
    
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            authFlag : false,
            name:cookie.load('name')
        })

    }
  
    submitLogin = (e) => {
        this.props.history.push('/editprofile');
    }

    render(){
       
        return(

           
            <div class="backcl">
              
                <div class="location2">
                <div>
                <h3 class="loginhome1">ThankYou For Creating A Account </h3>
                  <h1 class="h1">Welcome <b>{this.state.name}</b></h1>
                  <hr></hr>
                  </div>
                  <div class="image1">
                  <img  id ="imag" src={image}></img>
                  </div>
                  <p>Please take a few moments to <a class="a3" href="/">Update Your Profile</a> with a picture and a few details</p>
                  about yourself. property Owners are more likely to respond more quickly to
                  travelers with profiles.
                  <hr></hr>
                  <div class="row1">
                  <a  class="a2" href="/Traveller">Continue</a>
                  <button onClick = {this.submitLogin} class="btn btn-primary ">Update Your Profile</button>
                  </div>
                  </div>
                  
                  
                  
                    </div>         
                   
              
                      
        )
    }
}

 