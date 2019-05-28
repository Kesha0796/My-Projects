import React, {Component} from 'react';
import '../../App1.css';
import Header from '../Header/Header';
import axios from 'axios';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';

// import 'react-day-picker/lib/style.css';
class homepage extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            arrivaldate:'',
            departdate:'',
            guest:'',
            place:'',
            search : false
        }
        this.placeChangeHandler = this.placeChangeHandler.bind(this);
        this.arrivaldateChangeHandler = this.arrivaldateChangeHandler.bind(this);
        this.departdateChangeHandler = this.departdateChangeHandler.bind(this);
        this.guestChangeHandler = this.guestChangeHandler.bind(this);
 
    }
   
    
    componentWillMount(){
        this.setState({
            search : false
        })
    }
    arrivaldateChangeHandler = (e) => {
        this.setState({
            arrivaldate : e.target.value
        })
    }
    departdateChangeHandler = (e) => {
        this.setState({
            departdate : e.target.value
        })
    }
    guestChangeHandler = (e) => {
        this.setState({
            guest : e.target.value
        })
    }
    placeChangeHandler = (e) => {
        this.setState({
            place : e.target.value
        })
    }

   
    
    submitLogin = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            place : this.state.place,
            arrivaldate : this.state.arrivaldate,
            departdate : this.state.departdate,
            guest : this.state.guest
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/checkproperty',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    this.setState({
                        search : true
                    })
                }else{
                    this.setState({
                        search : false
                    })
                }
            });
    }
    render(){
        let redirectVar = null;
        if(this.state.search){
         redirectVar = <Redirect to= "/travellerdashboard" />
       }
       
        return(
          <div class="body1"> 
          {redirectVar}
            <Header></Header>
                <div class="main">
                      <div class="main-inner">
                         <div class="main-content">
                            <h1 class="content">
                            <span >Book beach houses, cabins,</span>
                            <br></br>
                            <span >condos and more, worldwide</span>
                            </h1>
                   
                            <div>
                            <form >
                          
                            <input type="text" class="input" placeholder="Where do you want to go?" onChange= {this.placeChangeHandler} />
                            <input type="date" class="input1" placeholder="Arrival" onChange={this.arrivaldateChangeHandler} />
                            <input type="date" class="input1" placeholder="Depart" onChange={this.departdateChangeHandler} />
                            <input type="text" class="input2" placeholder="Guest" onChange={this.guestChangeHandler} />
                            <button class="btn1 btn-primary btn-lg " onClick = {this.submitLogin}>Search</button>

                            </form>
                                </div>
                
                        

                   
                                       
                </div>
                <div>
                    
                </div>
                    
                </div> 
             </div>
            
        
        </div>
        
        )
    
            
          
               
    
        
    }
}

export default homepage;