import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import '../../pricing.css';

//Define a Login Component
class rentalprice extends Component
{
    //call the constructor method
    constructor(props)
    {
        //Call the constrictor of Super class i.e The Component
        super(props);
        this.state = {
            currency : "",
            nightbaserent:"",
            minstay:"",
            price : false
        }
        //Bind the handlers to this class
        this.currencyChangeHandler = this.currencyChangeHandler.bind(this);
        this.nightbaserentChangeHandler = this.nightbaserentChangeHandler.bind(this);
        this.minstayChangeHandler = this.minstayChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        
    }
    componentWillMount(){
        this.setState({
            price : false
        })
    }
    currencyChangeHandler = (e) => {
        this.setState({
            currency : e.target.value
        })
    }

    nightbaserentChangeHandler = (e) => {
        this.setState({
            nightbaserent : e.target.value
        })
    }
    minstayChangeHandler = (e) => {
        this.setState({
            minstay : e.target.value
        })
    }
    submitLogin = (e) => {
    
        //prevent page from refresh
        e.preventDefault();
        const data = {
            currency:this.state.currency,
            nightbaserent : this.state.nightbaserent,
            minstay:this.state.minstay
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/pricedata',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    this.setState({
                        price:true
                    })
                }else{
                    this.setState({
                         price : false
                    })
                }
            });
    }
    render()
    {
        let redirectVar = null;
        if(this.state.price){
            redirectVar = <Redirect to= "/firstpage"/>
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

        <div class="row backclrprg">
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
        <div class="row backclrprg">
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
                    <a href="listpropavailability">Availbiity</a>
                    <a class="highlighted" href="/rentalprice">Rental Rates</a>
                    <a href="#">Taxes</a>
                    <a href="#">Fees</a>    
                </div>       
            </div>
            
            <div class="backclrprice">
            <div class="mainlogin">
            
                <div class="login-form">
                    <div class="main-divprice">
                        <div class="panel">
                        <div>
                        <div>
                            <div class="le-nav-header">
                                <button class="nav-header-back nav-header-back-button-link" data-automation-class="nav-header-back">
                                <span class="icon-chevron-left glyphicon-"></span></button>
                                <h1 class="nav-header-text">How much do you want to charge?</h1>
                            </div><hr></hr>
                        </div>
                    </div>
                    <article class="onboarding-page-item articlest">
                    <div class="rates-onboarding-rates-page-title">
                        <p>We recommend starting with a low price to get a few bookings and earn some initial guest reviews. You can update your rates at any time.</p>
                    </div>
                    </article>  
                        </div>
                        
                        <article class="onboarding-page-item">
                                                <div class="form-inline onboarding-inline-row">
                                                    <div class="form-group form-group-label">
                                                        <label class="control-label currency-select-label" for="rates-onboarding-currencyCode">Currency</label>
                                                    </div>
                                                    <div class="form-group">
                                                        <div>
                                                            <select id="rates-onboarding-currencyCode" class="form-control currency-select" onChange={this.currencyChangeHandler}>
                                                                <option value=""></option>
                                                                <option value="AUD">Australian Dollar (AUD)</option>
                                                                <option value="SGD">Singapore Dollar (SGD)</option>
                                                                <option value="JPY">Japanese Yen (JPY)</option>
                                                                <option value="EUR">Euros (EUR)</option>
                                                                <option value="GBP">Great British Pound (GBP)</option>
                                                                <option value="USD">US Dollar (USD)</option>
                                                                <option value="CAD">Canadian Dollar (CAD)</option>
                                                                <option value="NZD">New Zealand Dollar (NZD)</option>
                                                                <option value="BRL">Brazil Real (BRL)</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </article>
                            <hr></hr>
                            <article class="onboarding-page-item padding-top-20">
                                                <fieldset id="base-period-editor-container" disabled="">
                                                    <form class="rates-onboarding-base-period-editor">
                                                        <div class="form-inline onboarding-inline-row">
                                                            <div class="form-group form-group-label">
                                                                <label class="control-label currency-select-label" for="rates-onboarding-base-rate-amount">Nightly Base Rate</label>
                                                            </div>
                                                            <div class="form-group">
                                                                <div class="">
                                                                    <div class="form-group form-control-text-overlay-container left">
                                                                        <input type="text" min="1" max="10000" class="form-control"  maxlength="10" title="(USD)" id="rates-onboarding-base-rate-amount" disabled="" onChange={this.nightbaserentChangeHandler} />
                                                                        <span class="form-control-text-overlay text-muted">$</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="form-inline onboarding-inline-row minimum-stay-block">
                                                            <div class="form-group form-group-label">
                                                                <label class="control-label currency-select-label" for="rates-onboarding-base-rate-minstay">Minimum stay</label>
                                                            </div>
                                                            <div class="form-group nightmargin">
                                                                <div class="form-group form-control-text-overlay-container right">
                                                                    <input type="number" id="rates-onboarding-base-rate-minstay" disabled="" class="form-control no-number-styles" pattern="\d*" onChange={this.minstayChangeHandler}/>
                                                                    <span class="form-control-text-overlay text-muted">night</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </fieldset>
                                            </article>
                                            <hr></hr>
                            
                            <article class="onboarding-page-item">
                                                
                                                <div class="le-nav-footer">
                                                    <div class="nav-footer-back">
                                                        <button class="btn btn-link btn-block" data-automation-class="nav-footer-back" type="button">Back</button>
                                                
                                                        <div class="nav-footer-next" aria-describedby="footer-next-button-popover">
                                                            <button class="btn btn-primary btn-block btnfooter" data-automation-class="nav-footer-next" type="button" onClick = {this.submitLogin} >Submit</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </article>
                            
                    </div>         
                    </div>
                </div>
            </div>
        </div>
    </div>
)
}
}
export default rentalprice;