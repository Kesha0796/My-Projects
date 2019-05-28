import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import Header from '../Header/Header';
import  cookie from 'react-cookies';
import '../../App.css';
// import TravellerHeader from './TravellerHeader';
//import { confirmAlert } from 'react-confirm-alert'; // Import
//import 'react-confirm-alert/src/react-confirm-alert.css'
export default class EditProfile extends Component{
    constructor(props){
        super(props);
        this.state = {
            firstname:'',
            lastname:'',
            AboutMe:'',
            City:'',
            Company:'',
            School:'',
            HomeTown:'',
            Language:'',
            value:''};
        this.handleChange = this.handleChange.bind(this);
        this.LastNameChangeHandler=this.LastNameChangeHandler.bind(this);
        this.FirstNameChangeHandler=this.FirstNameChangeHandler.bind(this);
        this.AboutMeChangeHandler=this.AboutMeChangeHandler.bind(this);
        this.CityChangeHandler=this.CityChangeHandler.bind(this);
        this.CompanyChangeHandler=this.CompanyChangeHandler.bind(this);
        this.HomeTownChangeHandler=this.HomeTownChangeHandler.bind(this);
        this.LanguageChangeHandler=this.LanguageChangeHandler.bind(this);
        this.SchoolChangeHandler=this.SchoolChangeHandler.bind(this);
    }
    handleChange(event) {
        
        this.setState({value: event.target.value});
    }
    LastNameChangeHandler(event) {
        
        this.setState({lastname: event.target.value});
    }
    FirstNameChangeHandler(event) {
        
        this.setState({firstname: event.target.value});
    }
    AboutMeChangeHandler(event) {
        
        this.setState({AboutMe: event.target.value});
    }
    CityChangeHandler(event) {
        
        this.setState({City: event.target.value});
    }
    CompanyChangeHandler(event) {
        
        this.setState({Company: event.target.value});
    }
    HomeTownChangeHandler(event) {
        
        this.setState({HomeTown: event.target.value});
    }
    LanguageChangeHandler(event) {
        
        this.setState({Language: event.target.value});
    }
    SchoolChangeHandler(event){
        this.setState({School: event.target.value});
    }

    componentDidMount(){
        const data1={
            firstname:cookie.load('name')
        }
        axios.post('http://localhost:3001/display1',data1)
                .then((response) => {
                this.setState({

                    firstname:response.data[0].Firstname,
                    lastname:response.data[0].Lastname,
                    City:response.data[0].City,
                    AboutMe:response.data[0].AboutMe,
                    School:response.data[0].School,
                    
                    Company:response.data[0].Company,
                    
                    HomeTown:response.data[0].HomeTown,
                    Language:response.data[0].Languages,
                    value:response.data[0].Gender

                  
                });
              console.log(response);
               
               
            });
            
    }

    submitLogin = (e) => {
        e.preventDefault();
        const data = {
           firstname:this.state.firstname,
           earlier: cookie.load('username'),
           lastname:this.state.lastname,
           AboutMe:this.state.AboutMe,
           City:this.state.City,
           Company:this.state.Company,
           School:this.state.School,
           HomeTown:this.state.HomeTown,
           Language:this.state.Language,
           Gender:this.state.value

        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/EditProfile',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    this.setState({
                        authFlag : true,
                        inserted:true
                       
                    })
                    cookie.remove('cookie', { path: '/' });
                    window.location.href="http://localhost:3000/login"
                }else{
                    this.setState({
                        authFlag : false
                    })
                }
            });
     
       
 
        
    }


    render(){
        let redirectVar = null;
        if(this.state.details){
            redirectVar = <Redirect to= "/firstpage"/>
        }
        
        return(
           
           <div>
            {redirectVar}
               <div class="Profile">
             <Header></Header>
             </div>
            <div class="backclear">
            <div class="Inside">
            {cookie.load('cookie')}
            <div class="main-div1">
            Profile Information
            <div class="form-group space">
              <input onChange = {this.FirstNameChangeHandler} value={this.state.firstname} type="text" class="form-control" name="add1" placeholder="First" autofocus/>
             </div>
             <div class="form-group space">
              <input onChange = {this.LastNameChangeHandler} value={this.state.lastname} type="text" class="form-control" name="add1"  autofocus/>
             </div>
             <div class="form-group space">
              <input onChange = {this.AboutMeChangeHandler} value={this.state.AboutMe} type="textarea" class="form-control2" name="add1" placeholder=" About Me" autofocus/>
             </div>
             <div class="form-group space">
              <input onChange = {this.CityChangeHandler} value={this.state.City} type="text" class="form-control" name="add1" placeholder="My City,Country"  autofocus/>
             </div>
             <div class="form-group space">
              <input onChange = {this.CompanyChangeHandler} value={this.state.Company} type="text" class="form-control" name="add1" placeholder="Company" autofocus/>
             </div>
             <div class="form-group space">
              <input onChange = {this.SchoolChangeHandler} value={this.state.School} type="text" class="form-control" name="add1" placeholder="School" autofocus/>
              
             </div>
             <div class="form-group space">
              <input onChange = {this.HomeTownChangeHandler} value={this.state.Howntown}type="text" class="form-control" name="add1" placeholder="HomeTown" autofocus></input>
              
             </div>
             <div class="form-group space">
              <input onChange = {this.LanguageChangeHandler} type="text" class="form-control" name="add1" placeholder="Language" autofocus/>
             </div>
             <div class="form-group"><div>
                                <select  id="rates-onboarding-currencyCode" value={this.state.value} onChange={this.handleChange} class="form-control currency-select">
                                <option value="">Gender</option>
                                <option value="AUD">Female</option>
                                <option value="SGD">Male</option>
                                </select>
                                
                                </div>
                                </div>
                                <button onClick = {this.submitLogin} class="btn btn-primary btndesign">Save Changes</button>
            </div>
            </div>
            </div>
            </div>
            
        )
    }
}
