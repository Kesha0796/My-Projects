import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { graphql, compose,withApollo } from 'react-apollo';
import {OwnerDash} from "../../queries/queries";
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
            currentPage: 1,
            propertiesPerPage: 5,
            filter:false,
            filterstartdate:" ",
            filterenddate:" ",
        }
        this.handleLogout = this.handleLogout.bind(this);
        this.filterstartdateChangeHandler = this.filterstartdateChangeHandler.bind(this);
        this.filterenddateChangeHandler = this.filterenddateChangeHandler.bind(this);
        this.filter=this.filter.bind(this);
        this.handleClick = this.handleClick.bind(this);
    
    }
    handleLogout = () => {
       localStorage.clear();
    }
    filterstartdateChangeHandler(event){
        this.setState({
            filterstartdate : event.target.value
        })
    }

    filterenddateChangeHandler(event){
        this.setState({
            filterenddate : event.target.value
        })
    }
    handleClick(event) {
        this.setState({
          currentPage: Number(event.target.id)
        });
      }
      filter()
    {
            this.setState({
                properties:[]
            });
                console.log("inside filter method");
                var data={
                    startdate:this.state.filterstartdate,
                    enddate:this.state.filterenddate,
                }
                console.log("Data is",data);
                axios.post('http://localhost:3001/ownerfilter',data)
                .then((response) => 
                {
                    this.setState({
                        properties : this.state.properties.concat(response.data.updatedList) 
                    });
                    //console.log(properties);
                    this.state.properties.map(property =>
                    {
                        console.log(property.imagename);
                        axios.post('http://localhost:3001/download/'+property.imagename)
                        .then(response =>
                        {
                           // console.log("Imgae Res : ",response);
                            let imagePreview = 'data:image/jpg;base64, ' + response.data;
                            this.setState({
                                imageView: this.state.imageView.concat(imagePreview)
                            })
                        });
                    })
                });
    }
    //Call the Will Mount to set the auth Flag to false
    componentDidMount(){
        var properties;
        var data=this.props.client.query(
            {
                query:OwnerDash,
                variables:{
                    username:localStorage.getItem("owneremail"),
                }
            }
        ).then(res=>{
            console.log("Data",res);
            console.log("Data",res.data.OwnerDash);
            
            
                this.setState({
                    properties : this.state.properties.concat(res.data.OwnerDash) 
                });
            
            
        })

    }
    myDelete(headline)
        {
                console.log("inside view owned property details method");
                
              
                localStorage.setItem("ownerheadline",headline);
               window.location.reload();
                // axios.post('http://localhost:3001/ownerbookdetails',data).then(response => {
                //     if(response.status === 200){
                //         console.log(response);
                //         this.setState({
                //             booking : true
                //         })
                //     }else{
                //         this.setState({
                //             booking : false
                //         })
                //     }
                // });
        }
    render()
    {
        const { properties, currentPage, propertiesPerPage } = this.state;

        const indexOfLastTodo = currentPage * propertiesPerPage;
        const indexOfFirstTodo = indexOfLastTodo - propertiesPerPage;
        const currentProperties = properties.slice(indexOfFirstTodo, indexOfLastTodo);
        const currentimages=this.state.imageView.slice(indexOfFirstTodo,indexOfLastTodo);
        console.log(currentProperties);
        let redirectVar = null;
        if(localStorage.getItem("ownerheadline")){
            redirectVar = <Redirect to= "/ownerbookedprops"/>
        }
        // else
        // {
        //     redirectVar = <Redirect to= "/bookingnotavailable"/>
        // }
        var i=-1;
        let details = currentProperties.map(property => {
            i=i+1;
            console.log("i="+1);
            
            if(property.booked==1)
            {
                var booking="Booked";
            }
            else
            {
                var booking="Available";
            }
          
            return (
                <div class="row border1" onClick={() => this.myDelete(property._id)}>
                    <div class="col-sm-6">                   
                    
                            <img class="imgformat" src={currentimages[i]} onClick={() => this.myDelete(property.headline)}></img> 
                           
                    
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
        const pageNumbers = [];
            for (let i = 1; i <= Math.ceil(properties.length / propertiesPerPage); i++) {
              pageNumbers.push(i);
            }
            const renderPageNumbers = pageNumbers.map(number => {
                return (
                   
                  <li class="fontcolor"
                    key={number}
                    id={number}
                    onClick={this.handleClick}>
                    {number}
                  </li>
                  
                );
              });
        var names=localStorage.getItem("owneremail");
        return(      
              
            <div class="container">
            <div class="navbar navbar-inverseownerhome ownerhome">
            <div class="logo">
                    <Link to="/ownerdashboard"> <img id="logo1"  alt="Home Away" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/logo-bceheader-white.svg"></img></Link>
           </div>
                    
          <div class="navbar1">
          <Link to="/ownerdashboard" > <img  id ="image" alt="Home Away" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/birdhouse-bceheader-white.svg"></img></Link>
          <ul class="text">
         <li><Link class="list btn btn-default btn-inverse" to="/listprop" >List your property</Link></li>
         </ul>
                          
         <ul>
             <li class="nav-link"><Link to="#">TripBoards</Link></li>  
               <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle"  id="navbardrop" data-toggle="dropdown">
                        {names}
                        <span aria-hidden="true" class="caret"></span>
                    </a>
                     <div class="dropdown-menu">
                       <Link class="dropdown-item" to="/ownerinbox">Inbox</Link><br></br>
                       <a class="dropdown-item " href="#"><Link class="bluecolor" to="/ownerlogin" onClick = {this.handleLogout}><span class="glyphicon glyphicon-user"></span>Logout</Link></a>
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
            <div class="filterformat">
                <div class="row">
                &nbsp;&nbsp;&nbsp;
                <input type="date" class="col-sm -4 placeholderclass" placeholder="start date" onChange ={this.filterstartdateChangeHandler}/>&nbsp;&nbsp;&nbsp;
                <input type="date" class="col-sm -4" placeholder="end date"  onChange = {this.filterenddateChangeHandler}/>&nbsp;&nbsp;&nbsp;
                <input type="button" class="col-sm -4 btn-primary filterbtn" value="filter" onClick={this.filter}></input>
                </div>
            </div>
            {redirectVar}
               {details}
               <div class="pagenumber">
            <div class="pagination">
            <ul>
            <li class="fontcolor">&laquo;</li>
            {renderPageNumbers}   
            <li class="fontcolor">&raquo;</li>
                  </ul>
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
        ownerprop:state.ownerprop,
        ownername:state.ownername
    }
}

const mapDispatchStateToProps = dispatch => {
    return {

        onPropClickHandle : (data) => {
            console.log(data);
                    dispatch({type: 'OWNERPROP',payload : data,statusCode : "200"})
            
            
        }
    }
}
export default compose(graphql(OwnerDash,{name:"OwnerDash"}),connect(mapStateToProps,mapDispatchStateToProps))(withApollo(ownerdashboard));
//export Login Component
// export default ownerdashboard;