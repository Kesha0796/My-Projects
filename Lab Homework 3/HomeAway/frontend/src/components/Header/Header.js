import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import cookie from 'react-cookies';
import { connect } from 'react-redux';


class Header extends Component{
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        localStorage.clear();
        cookie.remove('name', { path: '/firstpage' });
        cookie.remove('userid', { path: '/firstpage' })
    }
  
    
    render(){
    if(localStorage.getItem("email"))
        {
            var names=localStorage.getItem("email");
            console.log("Name is",names);
        return(
            <div class="container">
             <div class="navbar navbar-inverse">
                     <div class="logo">
                             <Link to="/firstpage"> <img id="logo1"  alt="Home Away" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/logo-bceheader-white.svg"></img></Link>
                    </div>
                             
                   <div class="navbar1">
                   <Link to="/firstpage"> <img  id ="image" alt="Home Away" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/birdhouse-bceheader-white.svg"></img></Link>
                   <ul class="text"></ul>
                                   
                  <ul>
                      <li class="nav-link"><Link to="/firstpage">TripBoards</Link></li>  
                     <li class="nav-link"><Link to="/firstpage">Help<span aria-hidden="true" class="caret"></span></Link></li>
                        
                        <li class="nav-item dropdown">
                             <a class="nav-link dropdown-toggle"  id="navbardrop" data-toggle="dropdown">
                                 {names}
                                 <span aria-hidden="true" class="caret"></span>
                             </a>
                              <div class="dropdown-menu">
                                <Link class="dropdown-item" to="/ownerinbox">Inbox</Link><br></br>
                                <Link class="dropdown-item" to="/mytrips">My trips</Link>
                                <br/>
                                <Link class="dropdown-item" to="/editprofile">Edit Profile</Link>
                                <br/>
                                <Link class="dropdown-item" to="/firstpage">Account</Link>
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
                             <Link to="/firstpage"> <img id="logo1"  alt="Home Away" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/logo-bceheader-white.svg"></img></Link>
                    </div>
                             
                   <div class="navbar1">
                   <Link to="/firstpage"> <img  id ="image" alt="Home Away" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/birdhouse-bceheader-white.svg"></img></Link>
                   <ul class="text">
                  </ul>
                                   
                  <ul>
                      <li class="nav-link"><Link to="/firstpage">TripBoards</Link></li>
                      <li class="nav-link"><Link to="/firstpage">Help<span aria-hidden="true" class="caret"></span></Link></li>
                        
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
const mapStateToProps = state =>{
    console.log(state);
    return {
        authFlag:state.authFlag,
        username:state.username
    }
}

const mapDispatchStateToProps = dispatch => {
    return {

        onLoginHandle : (data) => {
            console.log(data);
            
        }
    }
}
export default connect(mapStateToProps,mapDispatchStateToProps)(Header);
// export default Header;