import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import img from 'react-image';
import { connect } from 'react-redux';
import { graphql, compose,withApollo } from 'react-apollo';
import { mytrips } from '../../queries/queries';

//Define a Login Component
class traveldata extends Component
{
    //call the constructor method
    constructor(props)
    {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            trips : [],
            imageView: [],
            mytrips:false
        }
    }
    //Call the Will Mount to set the auth Flag to false
    componentDidMount(){
        var properties;
        
        
        var data=this.props.client.query(
            {
                query:mytrips,
                variables:{
                    username:localStorage.getItem("email"),
                }
            }
        ).then(res=>{
            console.log("Data",res);
            console.log("Data",res.data.mytrips);
            
            
                this.setState({
                    trips : this.state.trips.concat(res.data.mytrips) 
                });
            
            
        })
    }
    render()
    {
        let details = this.state.trips.map(trip => {
            
                return (
                    <div class="row borderbooking">
                    <table>  
                    <tr><td class="bluecolor" rowspan='2'>Trip to {trip.city} </td></tr>
                    <tr><td>No of Guests:</td><td>{trip.guests}</td></tr>   
                    <tr><td>Arrival Date:</td><td>{trip.startdate}</td></tr>     <tr><td>Departure Date:</td><td>{trip.enddate}</td></tr>
                     <tr><td>Total Cost:</td><td>{trip.totalcharge}</td></tr>
                    
                    <div class="HitInfo__infoBar hover-bg"><div class="HitInfo__priceSuperlativeGroup"><div class="HitInfo__price"><span class="InstantBook__icon" aria-hidden="true" title="Book without waiting for owner approval"><span>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
        <path d="M6.9,8.9l-0.5,5.9c0,0.6,0.2,0.7,0.5,0.2l5.6-7c0.3-0.4,0.2-0.8-0.4-0.8h-3l0.5-5.9 c0-0.6-0.2-0.7-0.5-0.2l-5.6,7C3.1,8.5,3.3,8.9,3.9,8.9H6.9z"></path>
    </svg>
                </span></span><span class="Price"><span class="Price__value" data-wdio="Price" data-price="100">$&nbsp;{trip.rates}</span><span class="Price__period">per night</span></span></div></div><div class="HitInfo__badgeRatingGroup"></div></div>
                </table>
                </div>
                )
            })
        
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
                
            <div class="container dashbackclr">
               {details}
            </div>
        </div>
            
        )
    }
}
const mapStateToProps = state =>{
    console.log(state);
    return {
        username:state.username
    }
}

const mapDispatchStateToProps = dispatch => {
    return {

        onLoginHandle : (data) => {
            console.log(data);
            axios.post('http://localhost:3001/ownerlogin', data)
                .then((response) => {
                    dispatch({type: 'OWNERLOGIN',payload : response.data.user,statusCode : response.status})
            });
            
        }
    }
}
export default compose(graphql(mytrips,{name:"mytrips"}),connect(mapStateToProps,mapDispatchStateToProps))(withApollo(traveldata));
//export Login Component
// export default traveldata;