import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';

//Define a Login Component
class ownerdashboard extends Component
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
            imageView:[],
            length:'',
            booking:false
        }
    
    }
    //Call the Will Mount to set the auth Flag to false
    componentDidMount(){
        this.setState
        {
            booking:false
        }
        var properties;
        var data={
            userid:cookie.load('owneruserid')
        }
         var userid=cookie.load('owneruserid');
        console.log(userid);
        axios.post('http://localhost:3001/ownerdashboard',data)
        .then((response) => {
            console.log("response length"+response.data.length);
        this.setState({
            properties : this.state.properties.concat(response.data) ,
            length:response.data.length
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

    }
    myDelete(propertyid)
        {
                console.log("inside delete method");
                var data={
                    propertyid:propertyid
                }
                console.log("response"+propertyid);
                axios.post('http://localhost:3001/ownerbookdetails',data).then(response => {
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
            redirectVar = <Redirect to= "/ownerbookedprops"/>
        }
        // else
        // {
        //     redirectVar = <Redirect to= "/bookingnotavailable"/>
        // }
        var i=-1;
        let details = this.state.properties.map(property => {
            i=i+1;
            console.log("i="+1);
            
            if(property.booked)
            {
                var booking="Booked";
            }
            else
            {
                var booking="Available";
            }
          
            return (
                <div class="row border1" onClick={() => this.myDelete(property.propertyid)}>
                    <div class="col-sm-6">                   
                    
                            <img class="imgformat" src={this.state.imageView[i]} onClick={() => this.myDelete(property.propertyid)}></img> 
                           
                    
                    </div>
                   
                    
                     <div class="col-sm-4 dataformat">
                      {property.headline}
                    </div>
                    <div >
                        <table class="formatpropdata">
                            <tbody>
                                <tr><td class="tdformat">{property.proptype} | </td><td>{property.bedrooms} BR | </td>
                                <td>{property.bathrooms} BA | </td>
                                <td>Sleeps {property.accomodates}</td></tr>
                                </tbody>
                         </table>
                    <div>
                        {property.description}
                    </div>
                </div>
                <div class="HitInfo__infoBar hover-bg">
                    <div class="HitInfo__priceSuperlativeGroup">
                        <div class="HitInfo__price">
                            <span class="InstantBook__icon" aria-hidden="true" title="Book without waiting for owner approval">
                            <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                <path d="M6.9,8.9l-0.5,5.9c0,0.6,0.2,0.7,0.5,0.2l5.6-7c0.3-0.4,0.2-0.8-0.4-0.8h-3l0.5-5.9 c0-0.6-0.2-0.7-0.5-0.2l-5.6,7C3.1,8.5,3.3,8.9,3.9,8.9H6.9z"></path>
                            </svg>
                            </span>
                            </span>
                            <span class="Price">
                                <span class="Price__value" data-wdio="Price" data-price="100">$&nbsp;{property.Nightbaserates}</span>
                                <span class="Price__period">per night</span></span>
                            </div>
                        </div>
                        <br></br>
                    <div class="HitInfo__badgeRatingGroup">{booking}</div></div>
                </div>
            )
        
        })
        return(      
              
            <div class="container">
                <div class="navbar navbar-inverse">
                    <div class="logo">
                            <a href="/"> <img id="logo1"  alt="Home Away" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/logo-bceheader.svg"></img></a>
                   </div>
                            
                  <div class="navbar1">
                  <a > <img  id ="image" alt="Home Away" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/birdhouse-bceheader.svg"></img></a>
                  <ul class="text">
                 <li><a class="list btn btn-default btn-inverse" href="/listprop" >List your property</a></li>
                 </ul>
                                  
                 <ul>
                     <li class="nav-link"><Link to="/">TripBoards</Link></li>
                     <li class="nav-link"><Link to="/">Help<span aria-hidden="true" class="caret"></span></Link></li>
                       
                       <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle"  id="navbardrop" data-toggle="dropdown">
                                Login
                                <span aria-hidden="true" class="caret"></span>
                            </a>
                             <div class="dropdown-menu">
                               <a class="dropdown-item" href="/ownerlogin">Owners Login</a><br></br>
                               <a class="dropdown-item" href="/login">Travellers Login</a>
                               <br></br>
                                           
                           </div>
                       </li>
                       <li>
                           <i aria-hidden="true" class="flag-us"></i>
                       </li>            
                  </ul>       
            
               </div>             
               </div>
            
            <div class="container dashbackclr">
            {redirectVar}
               {details}
            </div>
            </div>
            
        )
    }
}
//export Login Component
export default ownerdashboard;