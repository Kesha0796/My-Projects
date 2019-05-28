import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

//Define a Login Component
class ListPropDetails extends Component
{
    //call the constructor method
    constructor(props)
    {
        //Call the constrictor of Super class i.e The Component
        super(props);
        this.state = {
            headline : "",
            description:"",
            proptype:"",
            bedrooms : "",
            accomodates:"",
            bathrooms : "",
            details : false
        }
        //Bind the handlers to this class
        this.headlineChangeHandler = this.headlineChangeHandler.bind(this);
        this.descChangeHandler = this.descChangeHandler.bind(this);
        this.proptypeChangeHandler = this.proptypeChangeHandler.bind(this);
        this.bedroomsChangeHandler = this.bedroomsChangeHandler.bind(this);
        this.accomodatesChangeHandler = this.accomodatesChangeHandler.bind(this);
        this.bathroomsChangeHandler = this.bathroomsChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        
    }
    componentWillMount(){
        this.setState({
            details : false
        })
    }
    headlineChangeHandler = (e) => {
        this.setState({
            headline : e.target.value
        })
    }

    descChangeHandler = (e) => {
        this.setState({
            description : e.target.value
        })
    }

    proptypeChangeHandler = (e) => {
        this.setState({
            proptype : e.target.value
        })
    }
    bedroomsChangeHandler = (e) => {
        this.setState({
            bedrooms : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    accomodatesChangeHandler = (e) => {
        this.setState({
            accomodates : e.target.value
        })
    }
    bathroomsChangeHandler = (e) => {
        this.setState({
            bathrooms : e.target.value
        })
    }
    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            headline:this.state.headline,
            description : this.state.description,
            proptype:this.state.proptype,
            bedrooms : this.state.bedrooms,
            accomodates : this.state.accomodates,
            bathrooms : this.state.bathrooms
        }
        console.log(data);
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/detailsdata',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    this.setState({
                        details:true
                    })
                }else{
                    this.setState({
                        details : false
                    })
                }
            });
    }
    render()
    {
        let redirectVar = null;
        if(this.state.details){
            redirectVar = <Redirect to= "/image"/>
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
                <div><a  href="/listprop">Location</a></div>
                <a class="highlighted" href="/listpropdetails">Details</a>
                <a href="#">Booking Options</a>
                <a href="/image">Photos</a>
                <a href="#">Security</a>
                <a href="#">Payment</a>
                <a href="listpropavailability">Pricing</a>
                <div class="innersidebar">
                    <a href="listpropavailability">Availbiity</a>
                    <a href="/rentalprice">Rental Rates</a>
                    <a href="#">Taxes</a>
                    <a href="#">Fees</a>    
                </div>       
            </div>
            <div class="col-md-7 content-panel-container deatils">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <div><div class="checklist-header-container ">
                        <h3><span>Describe your property</span></h3>
                        <hr></hr>
                        </div>
                        <div>
                            <div></div>
                            <form role="form">
                            <div>
                                <span>Start out with a descriptive headline and a detailed summary of your property.</span>
                            </div>
                            <div class="row headline-container out-of-limits">
                                <div class="col-xs-12">
                                    <div class="form-group floating-label empty">
                                        <input class="form-control" aria-label="Headline" aria-invalid="false" aria-describedby="headline__help" id="headline" name="headline" type="text"  onChange={this.headlineChangeHandler} />
                                        <label class="" for="headline">Headline</label>
                                        <span class="help-block" id="headline__help">(minimum 20) 80 characters left</span>
                                    </div>
                                </div>
                            </div>
                            <div class="row out-of-limits">
                                <div class="col-xs-12">
                                    <div class="form-group floating-label empty">
                                        <textarea class="FormTextArea__textarea form-control" aria-label="Property description" aria-describedby="description__help" id="description" name="description" rows="8" onChange={this.descChangeHandler}></textarea>
                                        <label class="FormTextArea__floating-label" for="description">Property description</label>
                                        <span class="help-block" id="description__help">(minimum 400) 10,000 characters left</span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-12 col-lg-6">
                                    <div class="form-group floating-label not-empty">
                                        <label>Property type</label>
                                            <div class="FormSelect__wrapper">
                                                <select aria-label="Property type" name="propertyType" class="form-control FormSelect__select" onChange={this.proptypeChangeHandler}>
                                                    <option value=""></option>
                                                    <option value="apartment">Apartment</option>
                                                    <option value="barn">Barn</option>
                                                    <option value="bed &amp; breakfast">Bed &amp; Breakfast</option>
                                                    <option value="boat">Boat</option>
                                                    <option value="bungalow">Bungalow</option>
                                                    <option value="cabin">Cabin</option>
                                                    <option value="campground">Campground</option>
                                                    <option value="castle">Castle</option>
                                                    <option value="chalet">Chalet</option>
                                                    <option value="country house / chateau">Chateau / Country House</option>
                                                    <option value="condo">Condo</option>
                                                    <option value="corporate apartment">Corporate Apartment</option>
                                                    <option value="cottage">Cottage</option>
                                                    <option value="estate">Estate</option>
                                                    <option value="farmhouse">Farmhouse</option>
                                                    <option value="guest house/pension">Guest House</option>
                                                    <option value="hostel">Hostel</option>
                                                    <option value="hotel">Hotel</option>
                                                    <option value="hotel suites">Hotel Suites</option>
                                                    <option value="house">House</option>
                                                    <option value="house boat">House Boat</option>
                                                    <option value="lodge">Lodge</option>
                                                    <option value="Mill">Mill</option>
                                                    <option value="mobile home">Mobile Home</option>
                                                    <option value="Recreational Vehicle">Recreational Vehicle</option>
                                                    <option value="resort">Resort</option>
                                                    <option value="studio">Studio</option>
                                                    <option value="Tower">Tower</option>
                                                    <option value="townhome">Townhome</option>
                                                    <option value="villa">Villa</option>
                                                    <option value="yacht">Yacht</option></select>
                                                    <i aria-hidden="true" class="icon-chevron-down FormSelect__chevron"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xs-12 col-lg-6">
                                            <div class="form-group floating-label not-empty">
                                                <input class="form-control" aria-label="Bedrooms" aria-invalid="false" id="bedrooms" name="bedrooms" type="number" step="1" onChange={this.bedroomsChangeHandler} />
                                                <label class="" for="bedrooms">Bedrooms</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xs-12 col-lg-6">
                                            <div class="form-group floating-label not-empty">
                                                <input class="form-control" aria-label="Accommodates" aria-invalid="false" id="sleeps" name="sleeps" type="number" max="500" min="1" step="1" onChange={this.accomodatesChangeHandler} />
                                                <label class="" for="sleeps" >Accommodates</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xs-12 col-lg-6">
                                            <div class="form-group floating-label not-empty">
                                                <input class="form-control" aria-label="Bathrooms" aria-invalid="false" id="bathrooms" name="bathrooms" type="number" max="500" min="1" step="0.5" onChange={this.bathroomsChangeHandler} />
                                                <label class="" for="bathrooms">Bathrooms</label>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <hr></hr>
                        <div class="panel-control step-footer-wrapper">
                            <div class="row">
                                <div class="col-xs-6">
                                    <button class="btnback    btn-default btn-rounded btn-sm backbtn" label="Back"  type="button">
                                    <span class="btn__label">Back</span>
                                    </button>
                                </div>
                                <div class="col-xs-6">
                                <button class="btnnext btn-primary btn-rounded btn-sm" label="Next" type="button" onClick = {this.submitLogin}>
                                <span class="btn__label">Next</span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div></div>
        </div>
    </div>
)
}
}
export default ListPropDetails;