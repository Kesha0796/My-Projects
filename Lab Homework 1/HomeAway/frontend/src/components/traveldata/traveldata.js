import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import img from 'react-image';


//Define a Login Component
class traveldata extends Component
{
    //call the constructor method
    constructor(props)
    {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.myDelete = this.myDelete.bind(this);
        this.state = {
            properties : [],
            imageView: [],
            booking:false
        }
    }
    //Call the Will Mount to set the auth Flag to false
    componentDidMount(){
        var properties;
        var data={
            propid:cookie.load('proptravid')
        }
        console.log(data);
        axios.post('http://localhost:3001/fetchpropiddata',data)
        .then((response) => {
        this.setState({
            properties : this.state.properties.concat(response.data) 
        });
        console.log(properties);
        this.state.properties.map(property =>
            {
                // var dataimage =
                // {
                //     path:property.image,
                //     name:property.imagename
                // }
                console.log(property.imagename);
                axios.post('http://localhost:3001/download/'+property.imagename)
                .then(response => {
                    console.log("Imgae Res : ",response);
                    let imagePreview = 'data:image/jpg;base64, ' + response.data;
                    this.setState({
                        imageView: this.state.imageView.concat(imagePreview)
                    })
                });
            })  
        });
        console.log(properties);
    }
    myDelete(propertyid,rate)
        {
                console.log("inside delete method");
                var data={
                    propertyid:propertyid,
                    userid:cookie.load('userid'),
                    startdate:cookie.load('startdate'),
                    enddate:cookie.load('enddate'),
                    guests:cookie.load('guest'),
                    city:cookie.load('place'),
                    rates:rate
                }
                console.log("response"+propertyid);
                axios.post('http://localhost:3001/booking',data).then(response => {
                    if(response.status === 200){
                        console.log(response);
                        this.setState({
                            booking : true
                        })
                    }else{
                        this.setState({
                            booking : false
                        })
                    }
                });
        }
    render()
    {
        let redirectVar = null;
        if(this.state.booking){
            redirectVar = <Redirect to= "/firstpage"/>
        }
        let details = this.state.properties.map(property => {
            
                return (
                    <div class="row border1">
                    <div class="col-sm-6">                   
                    <img class="imgformat" src={this.state.imageView}></img> 
                    </div>
                     <div class="col-sm-4 dataformat">
                    {property.headline}
                    </div>
                    <div >
                    <table class="formatpropdata">
                    <tbody>
                        <tr class="trwidth"><td>{property.proptype} | </td><td>   {property.bedrooms} BR | </td>
                        <td>{property.bathrooms} BA | </td>
                        <td>Sleeps {property.accomodates}</td></tr>
                        <tr class="trwidth"><td rowspan='4'>{property.description}</td></tr>
                        </tbody>
                    </table>
                    </div>
                    <div class="HitInfo__infoBar hover-bg"><div class="HitInfo__priceSuperlativeGroup"><div class="HitInfo__price"><span class="InstantBook__icon" aria-hidden="true" title="Book without waiting for owner approval"><span>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
        <path d="M6.9,8.9l-0.5,5.9c0,0.6,0.2,0.7,0.5,0.2l5.6-7c0.3-0.4,0.2-0.8-0.4-0.8h-3l0.5-5.9 c0-0.6-0.2-0.7-0.5-0.2l-5.6,7C3.1,8.5,3.3,8.9,3.9,8.9H6.9z"></path>
    </svg>
                </span></span><span class="Price"><span class="Price__value" data-wdio="Price" data-price="100">$&nbsp;{property.Nightbaserates}</span><span class="Price__period">per night</span></span></div></div><div class="HitInfo__badgeRatingGroup"></div></div>
                    <div><input type = "submit" value= "Book" class="btn btn-primary" onClick={() => this.myDelete(property.propertyid,property.Nightbaserates)} /></div>
                </div>
                )
            })
        
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
                
            <div class="container dashbackclr">
               {details}
            </div>
        </div>
            
        )
    }
}
//export Login Component
export default traveldata;