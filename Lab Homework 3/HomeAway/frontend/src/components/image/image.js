import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { connect } from 'react-redux';
//Define a Login Component
class image extends Component
{
    //call the constructor method
    constructor(props)
    {
        //Call the constrictor of Super class i.e The Component
        super(props);
        this.state = {
            description: '',
            selectedFile: []
        }
        
    }
    onChange = (e) => {
        if(e.target.name == 'selectedFile'){
          
            var join= this.state.selectedFile.concat(...e.target.files);
            console.log(join);
            this.setState({
              selectedFile:join
            });
            
          
        }else{
          this.setState({ [e.target.name]: e.target.value,flag:false });
        }
    }
    onSubmit = (e) => {
        e.preventDefault();
        const { description, selectedFile} = this.state;
       var name1='';
        
        let formData = new FormData();
    for(let size=0;size<selectedFile.length;size++){
        
        formData.append('selectedFile', selectedFile[size]);
        console.log(this.state.selectedFile[size].name);
        if(name1=='')
        {
            name1=this.state.selectedFile[size].name;
        }
        else{
        name1=name1+','+this.state.selectedFile[size].name ;
        }
        console.log(name1);
       
    }
    formData.append('description', name1);
    console.log(formData);
        // const { description, selectedFile } = this.state;
        // let formData = new FormData();
    
        // formData.append('description', description);
        // formData.append('selectedFile', selectedFile);
    
        this.props.onImageHandle(formData);

        //   axios.post('http://localhost:3001/imageupload', formData)
        //     .then((result) => {
        //     this.setState( {imageinsert:true});
        //     });
    
      }
    componentWillMount(){
        this.setState({
            imageinsert : false
        })
    }

    

    render()
    {
        const { description, selectedFile } = this.state;
        let redirectVar = null;
        if(this.props.imageinsert){
            redirectVar = <Redirect to= "/listpropavailability"/>
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
            <h3 class="headertagh">Select up to 5 images for your property</h3>
            </div>
            <div class="login-form">
            <div class="main-availability">
                <div class="panel">
                    <h2>Upload Image</h2>
                </div>
                <form onSubmit={this.onSubmit}>
                    <div class="form-group">
                    <input
                    type="text"
                    name="description"
                    value={description}
                    onChange={this.onChange}
                    multiple />
                    </div>
                    <div class="form-group">
                    <input type="file" name="selectedFile" onChange={this.onChange} multiple />
                    </div>
                    <div>
                    <br/>
                    <button type="submit" class="btn btn-primaryavail btndesign">Submit</button>
                    </div>
                    </form>
                
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
        imageinsert : state.imageinsert
    }
}

const mapDispatchStateToProps = dispatch => {
    return {
        onImageHandle : (data) => {
            axios.post('http://localhost:3001/imageupload', data)
                .then((response) => {
                    dispatch({type: 'IMAGEUPLOAD',payload : response.data.resData,statusCode : 200})
            });
        }
    }
}

export default connect(mapStateToProps,mapDispatchStateToProps)(image);