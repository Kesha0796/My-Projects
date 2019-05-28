import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import img from 'react-image';
import { connect } from 'react-redux';

//Define a Login Component
class travellerdashboard extends Component
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
            currentPage: 1,
            propertiesPerPage: 10,
            filter:false,
            filterplace:" ",
            filterbedroom:" ",
            filterstartdate:" ",
            filterenddate:" ",
            filterprice:" "
        }
        this.handleClick = this.handleClick.bind(this);
        this.filterplaceChangeHandler = this.filterplaceChangeHandler.bind(this);
        this.filterbedroomChangeHandler = this.filterbedroomChangeHandler.bind(this);
        this.filterstartdateChangeHandler = this.filterstartdateChangeHandler.bind(this);
        this.filterenddateChangeHandler = this.filterenddateChangeHandler.bind(this);
        this.filterpriceChangeHandler = this.filterpriceChangeHandler.bind(this);
        this.filter=this.filter.bind(this);
    }
    filterplaceChangeHandler(event){
        this.setState({
            filterplace : event.target.value
        })
    }
    filterbedroomChangeHandler(event){
        this.setState({
            filterbedroom : event.target.value
        })
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
    filterpriceChangeHandler(event){
        this.setState({
            filterprice : event.target.value
        })
    }
    handleClick(event) {
        this.setState({
          currentPage: Number(event.target.id)
        });
      }
    //Call the Will Mount to set the auth Flag to false
    componentDidMount()
    {
        this.props.onStateHandle(data);
        var data={
            place:this.props.city,
            startdate:this.props.startdate,
            enddate:this.props.enddate,
            guest:this.props.accomodates
        }
        console.log(data);
        // this.props.onDisplayHandle(data);
        axios.post('http://localhost:3001/travellerdashboard',data)
        .then((response) => 
        {
            console.log("data is",response.data);
            this.setState({
                properties : this.state.properties.concat(response.data.updatedList) 
            });
            var i;
            //console.log(properties);
            this.state.properties.map(property =>
            {
                i=property.imagename.split(',');
                console.log(property.imagename);
                axios.post('http://localhost:3001/download/'+i[0])
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


    myDelete(propertyid,username,address,city,country,zipcode)
    {
                console.log("inside delete method");
                var data={
                    propertyid:propertyid,
                    ownername:username,
                    address:address+" "+city+" "+country+"-"+zipcode
                }
                console.log("response"+propertyid+" "+username);
                this.props.onDisplayHandle(data);
                // axios.post('http://localhost:3001/displaytravdata',data).then(response => {
                //     if(response.status === 200){
                //         console.log(response);
                //         this.setState({
                //             display : true
                //         })
                //     }else{
                //         this.setState({
                //             display : false
                //         })
                //     }
                // });
    }
    filter()
    {
            this.setState({
                properties:[]
            });
                console.log("inside filter method");
                var data={
                    place:this.state.filterplace,
                    startdate:this.state.filterstartdate,
                    enddate:this.state.filterenddate,
                    bedroom:this.state.filterbedroom,
                    price:this.state.filterprice
                }
                console.log("Data is",data);
                axios.post('http://localhost:3001/filter',data)
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

    render()
    {
        const { properties, currentPage, propertiesPerPage } = this.state;

        const indexOfLastTodo = currentPage * propertiesPerPage;
        const indexOfFirstTodo = indexOfLastTodo - propertiesPerPage;
        const currentProperties = properties.slice(indexOfFirstTodo, indexOfLastTodo);
        const currentImages = this.state.imageView.slice(indexOfFirstTodo, indexOfLastTodo);
        console.log(currentProperties);
        let redirectVar = null;
        if(this.props.getproperty){
            redirectVar = <Redirect to= "/traveldata"/>
        }
        var i=-1;
        let details = currentProperties.map(property => {
        i=i+1
                return (
                    <div class="row border1">
                    <div class="col-sm-6">                   
                    <img class="imgformat" src={currentImages[i]} onClick={this.myDelete.bind(this,property._id,property.username,property.address,property.city,property.country,property.zipcode)}></img> 
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
            <div class="filterformat">
                <div class="row">
                &nbsp;&nbsp;&nbsp;
                <input type="text" class="col-sm -4 " placeholder="enter place" onChange = {this.filterplaceChangeHandler}/>&nbsp;&nbsp;&nbsp;
                <input type="text" class="col-sm -4" placeholder="no of bedrooms" onChange = {this.filterbedroomChangeHandler}/>&nbsp;&nbsp;&nbsp;
                <input type="date" class="col-sm -4 placeholderclass" placeholder="start date" onChange ={this.filterstartdateChangeHandler}/>&nbsp;&nbsp;&nbsp;
                <input type="date" class="col-sm -4" placeholder="end date"  onChange = {this.filterenddateChangeHandler}/>&nbsp;&nbsp;&nbsp;
                <input type="text" class="col-sm -4" placeholder="max price" onChange = {this.filterpriceChangeHandler}/>
                <input type="button" class="col-sm -4 btn-primary filterbtn" value="filter" onClick={this.filter}></input>
                </div>
            </div>
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
        display : state.display,
        city:state.city,
        startdate:state.startdate,
        enddate:state.enddate,
        accomodates:state.accomodates,
        getproperty:state.getproperty
    }
}

const mapDispatchStateToProps = dispatch => {
    return {

        onDisplayHandle : (data) => {
            console.log("display data",data);
            
            dispatch({type: 'GETPROPERTY',payload : data,statusCode : 200})
        },
        onStateHandle:(data)=>{
            console.log("In state handle method");
            dispatch({type:'HANDLESTATE',payload:data,statuscode:200})
            
        }
        
    }
}
// export default travellerdashboard;
export default connect(mapStateToProps,mapDispatchStateToProps)(travellerdashboard);