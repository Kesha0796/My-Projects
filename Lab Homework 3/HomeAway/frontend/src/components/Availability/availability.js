import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { connect } from 'react-redux';

//Define a Login Component
class ListPropAvailability extends Component
{
    //call the constructor method
    constructor(props)
    {
        //Call the constrictor of Super class i.e The Component
        super(props);
        this.state = {
            startdate :"",
            enddate:""
        }
        this.startdateChangeHandler = this.startdateChangeHandler.bind(this);
        this.enddateChangeHandler = this.enddateChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        
    }
    componentWillMount(){
        
    }
    startdateChangeHandler = (e) => {
        this.setState({
            startdate : e.target.value
        })
    }

    enddateChangeHandler = (e) => {
        this.setState({
            enddate : e.target.value
        })
    }

    submitLogin = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            startdate:this.state.startdate,
            enddate : this.state.enddate
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        this.props.onAvailHandle(data);

        //make a post request with the user data
        // axios.post('http://localhost:3001/availdata',data)
        //     .then(response => {
        //         console.log("Status Code : ",response.status);
        //         if(response.status === 200){
        //             this.setState({
        //                 avail:true
        //             })
        //         }else{
        //             this.setState({
        //                  avail : false
        //             })
        //         }
        //     });
    }
    render()
    {
        let redirectVar = null;
        if(this.props.avail){
            redirectVar = <Redirect to= "/rentalprice"/>
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
                <div><a href="/listprop">Location</a></div>
                <a href="/listpropdetails">Details</a>
                <a href="#">Booking Options</a>
                <a href="/image">Photos</a> 
                <a href="#">Security</a>
                <a href="#">Payment</a>
                <a href="listpropavailability">Pricing</a>
                <div class="innersidebar">
                    <a class="highlighted" href="listpropavailability">Availbiity</a>
                    <a href="/rentalprice">Rental Rates</a>
                    <a href="#">Taxes</a>
                    <a href="#">Fees</a>    
                </div>       
            </div>
            
            <div class="avail">
            <div class="headerinfo">
            <h3 class="headertagh">Select a starting point for setting up your availability</h3>
            </div>
            <div class="login-form">
            <div class="main-availability">
                <div class="panel">
                    <h2>Enter Dates</h2>
                </div>
                
                    <div class="form-group">
                        <input onChange = {this.startdateChangeHandler} type="date" class="form-control dateclass placeholderclass" name="startdate" placeholder="Start Date" autoFocus/>
                    </div>
                    <div class="form-group">
                        <input onChange = {this.enddateChangeHandler} type="date" class="form-control dateclass placeholderclass" name="enddate" placeholder="End Date"/>
                    </div>
                    <div>
                    <br/>
                    <button onClick = {this.submitLogin} class="btn btn-primaryavail btndesign">Submit</button>
                    </div>
                
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
        avail : state.avail
    }
}

const mapDispatchStateToProps = dispatch => {
    return {
        onAvailHandle : (data) => {
            axios.post('http://localhost:3001/availdata', data)
                .then((response) => {
                    dispatch({type: 'AVAIL',payload : response.data.resData,statusCode : response.status})
            });
        }
    }
}
//export Login Component
export default connect(mapStateToProps,mapDispatchStateToProps)(ListPropAvailability);
