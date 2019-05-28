import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import img from 'react-image';
import { connect } from 'react-redux';
import Popup from 'reactjs-popup';
import Modal from 'react-responsive-modal';
import {Link} from 'react-router-dom';
import Carousel from 'react-image-carousel';

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
            open:false
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.questionHeadlineHandler=this.questionHeadlineHandler.bind(this);
        this.questionDescriptionHandler=this.questionDescriptionHandler.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        var properties,i;
        var data={
            propid:this.props.propertyid
        }
        console.log(data);
        axios.post('http://localhost:3001/fetchpropiddata',data)
        .then((response) => {
        this.setState({
            properties : this.state.properties.concat(response.data.updatedList) 
        });
        console.log(properties);
        this.state.properties.map(property =>
            {
                // var dataimage =
                // {
                //     path:property.image,
                //     name:property.imagename
                // }  console.log(property.ImageName);
               i= property.imagename.split(',');
               console.log(i.length);
              
               
            for(let size=0;size<i.length;size++){
                console.log(size);  
     axios.post('http://localhost:3001/download/'+i[size])
               .then(response => {
                   console.log("Imgae Res : ",response);
                   let imagePreview = 'data:image/jpg;base64, ' + response.data;
                this.setState({imageView: this.state.imageView.concat(imagePreview)  });
               });
           }
                // console.log(property.imagename);
                // axios.post('http://localhost:3001/download/'+property.imagename)
                // .then(response => {
                //     console.log("Imgae Res : ",response);
                //     let imagePreview = 'data:image/jpg;base64, ' + response.data;
                //     this.setState({
                //         imageView: this.state.imageView.concat(imagePreview)
                //     })
                // });
            })  
       });
        console.log(properties);
    }
    
    myDelete(propertyid,rate)
        {
                console.log("inside delete method");
                var data={
                    propertyid:this.props.propertyid,
                    username:this.props.username,
                    startdate:this.props.startdate,
                    enddate:this.props.enddate,
                    guests:this.props.accomodates,
                    city:this.props.city,
                    rates:rate
                }
                console.log("response"+propertyid);
                this.props.onBookHandle(data);
                // axios.post('http://localhost:3001/booking',data).then(response => {
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
        openModal (){
            this.setState({ open: true })
          }
          closeModal () {
            this.setState({ open: false })
          }
          questionHeadlineHandler=(e)=>{
            this.setState({
                questionHeadline:e.target.value
            })
          }
    
          questionDescriptionHandler=(e)=>{
    
            this.setState({
                questionDescription:e.target.value
            })
    
          }
          sendQuestion=(e)=>{

            e.preventDefault();
            
            console.log("e value",e);
        const data={
            questionHeadline:this.state.questionHeadline,
            questionDescription:this.state.questionDescription,
            ownername:this.props.ownername,
            propertyid:this.props.propertyid,
            travellername:this.props.username,
            propertyaddress:this.props.propertyaddress
        }
        console.log("Data from react",data);

        axios.post('http://localhost:3001/question',data)
            .then(response=>{
                console.log("Status code ",response.status);
                if(response.status===200){
                    console.log("Question submitted successfully");
                    

                    this.setState({
                        open:false
                    })
                }else{
                    console.log("Error in the scene");
                }

            })
            .catch(err=>{
                console.log("Error in question part");
            })
        }
    render()
    {
        const {open}=this.state;
        let redirectVar = null;
        if(this.props.book){
            redirectVar = <Redirect to= "/firstpage"/>
        }
        let details = this.state.properties.map(property => {
            
                return (
                    <div class="row border1">
                    <div class="col-sm-6">                   
                    <Carousel images={this.state.imageView} 
                    thumb={true}
                    loop={true}
                    autoplay={3000} class="imagedetail">  </Carousel> 
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
                    <div class="HitInfo__infoBar hover-bg"><div class="HitInfo__priceSuperlativeGroup"><div class="HitInfo__price"><span class="InstantBook__icon" aria-hi  dden="true" title="Book without waiting for owner approval"><span>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
        <path d="M6.9,8.9l-0.5,5.9c0,0.6,0.2,0.7,0.5,0.2l5.6-7c0.3-0.4,0.2-0.8-0.4-0.8h-3l0.5-5.9 c0-0.6-0.2-0.7-0.5-0.2l-5.6,7C3.1,8.5,3.3,8.9,3.9,8.9H6.9z"></path>
    </svg>
                </span></span><span class="Price"><span class="Price__value" data-wdio="Price" data-price="100">$&nbsp;{property.Nightbaserates}</span><span class="Price__period">per night</span></span></div></div><div class="HitInfo__badgeRatingGroup"></div></div>
                <div class="row ">
                    <div class="col-sm -6 divformatbook"><input type = "submit" value= "Book" class="btn btn-primary" onClick={() => this.myDelete(property._id,property.Nightbaserates)} /></div>
                    <div class="col-sm -6 divformatques">
                    <button class="btn btn-primary" onClick={this.openModal}>Ask Question?</button> 
                    
                    <Modal open={open} onClose={this.closeModal} center>
                    <h2 style={{'marginTop':'50px','marginBottom':'25px'}}>Get answer to your Queries</h2>
                    <div style={{'horizontalAlign':'middle'}}>
                    <span style={{'display':'block'}}>               
                                      <input type="text" placeholder="What is it about?" onChange={this.questionHeadlineHandler} style={{'margin-bottom':'10px','width': '100%','height': '44px','padding':  '9px 14px','font-size':  '18px','border-radius':  '0px','line-height':  '1.33','margin-top':  '16px'}}/>
                  </span>
          
                      <span style={{'display':'block'}}>
                                      <textarea onChange={this.questionDescriptionHandler} placeholder="Tell us more about your query" rows="5" cols="10" style={{'margin-bottom':'10px','width': '100%','padding':  '9px 14px','font-size':  '18px','border-radius':  '0px','line-height':  '1.33','margin-top':  '16px'}}></textarea>
                      </span>
          
          
                      <span style={{'justifyContent':'center','display':'flex'}}>
                      <input type="submit" value="Not Now" onClick={this.closeModal} style={{'vertical-align':'middle','width':'40%','height':'44px','background-color':'light-grey','border-color':'light-grey','font-size':'18px','color':'black','padding':' 7px 31px','text-align':'center','cursor':'pointer'}}/>
                      
                      
                      <input type="submit"  value="Send"  onClick={this.sendQuestion}  style={{'margin-left':'5px','vertical-align':'middle','width':'40%','height':'44px','background-color':'#ff8a00','border-color':'#ff8a00','font-size':'18px','color':'#FFE','padding':' 7px 31px','text-align':'center','cursor':'pointer'}}/>
          
                      </span>
          
                    </div>
                  </Modal></div>
                    </div>
                </div>
                )
            })
        
        return(       
        <div class="container">
            {redirectVar}
            <div class=" navbar .header-bce .header.navbar loginnavbar">
                <div class="HomeAwayLeft">
                    <div class="navbar-inner">
                        <Link to="/travellerdashboard" class="logo" title="HomeAway"><img src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/logo-bceheader.svg"></img></Link>
                    </div>
                </div>
            </div>
            <div class="header-bce-birdhouse-container">
                <div class="flip-container">
                    <div class="flipper">
                        <div class="front btn-bce">
                            <Link to="/travellerdashboard"><img src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/birdhouse-bceheader.svg">
                            </img></Link>
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
        propertyid:state.propertyid,
        username:state.username,
        startdate:state.startdate,
        enddate:state.enddate,
        city:state.city,
        accomodates:state.accomodates,
        book:state.book,
        ownername:state.ownername,
        propertyaddress:state.propertyaddress
    }
}

const mapDispatchStateToProps = dispatch => {
    return {

        onBookHandle : (data) => {
            console.log(data);
            axios.post('http://localhost:3001/booking', data)
                .then((response) => {
                    dispatch({type: 'BOOK',payload : response.data.updatedList,statusCode : response.status})
            });
            
        }
    }
}
export default connect(mapStateToProps,mapDispatchStateToProps)(traveldata);
//export Login Component
// export default traveldata;