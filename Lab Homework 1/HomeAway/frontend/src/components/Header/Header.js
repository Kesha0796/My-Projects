import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import cookie from 'react-cookies';


class Header extends Component{
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
        console.log(cookie.load("name"));
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        cookie.remove('name', { path: '/' });
        cookie.remove('userid', { path: '/' })
    }
  
    
    render(){
    if(cookie.load('name'))
        {
            var names=cookie.load("name");
        return(
            <div class="container">
             <div class="navbar navbar-inverse">
                     <div class="logo">
                             <a href="/"> <img id="logo1"  alt="Home Away" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/logo-bceheader-white.svg"></img></a>
                    </div>
                             
                   <div class="navbar1">
                   <a > <img  id ="image" alt="Home Away" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/birdhouse-bceheader-white.svg"></img></a>
                   <ul class="text">
                  <li><a class="list btn btn-default btn-inverse" href="/listprop" >List your property</a></li>
                  </ul>
                                   
                  <ul>
                      <li class="nav-link"><Link to="/">TripBoards</Link></li>  
                     <li class="nav-link"><Link to="/">Help<span aria-hidden="true" class="caret"></span></Link></li>
                        
                        <li class="nav-item dropdown">
                             <a class="nav-link dropdown-toggle"  id="navbardrop" data-toggle="dropdown">
                                 {names}
                                 <span aria-hidden="true" class="caret"></span>
                             </a>
                              <div class="dropdown-menu">
                                <a class="dropdown-item" href="#">Inbox</a><br></br>
                                <a class="dropdown-item" href="/mytrips">My trips</a>
                                <br/>
                                <a class="dropdown-item" href="/editprofile">Edit Profile</a>
                                <br/>
                                <a class="dropdown-item" href="#">Account</a>
                                <br/>
                                <a class="dropdown-item " href="#"><Link class="bluecolor" to="/login" onClick = {this.handleLogout}><span class="glyphicon glyphicon-user"></span>Logout</Link></a>
                                <br></br>
                                            
                            </div>
                        </li>
                        <li>
                            <i aria-hidden="true" class="flag-us"></i>
                        </li>            
                   </ul>       
                       </div>
                </div>             
                </div>
        )
        }
        else
        {
            return(
            <div class="container">
             <div class="navbar navbar-inverse">
                     <div class="logo">
                             <a href="/"> <img id="logo1"  alt="Home Away" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/logo-bceheader-white.svg"></img></a>
                    </div>
                             
                   <div class="navbar1">
                   <a > <img  id ="image" alt="Home Away" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/birdhouse-bceheader-white.svg"></img></a>
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
                </div>
            )
        }
    }
}

export default Header;