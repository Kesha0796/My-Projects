import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Accordion,AccordionItem,AccordionItemTitle,AccordionItemBody} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';



class Messages extends Component{
        constructor(props){
            super(props);

            this.state={
                data:[],
                answer:""
            }
            
            
            this.submitAnswer=this.submitAnswer.bind(this);
            this.answerHandler=this.answerHandler.bind(this);
        }

        componentDidMount=(e)=>{

            if(this.props.isowner){
                var data={
                    ownername:this.props.ownername
                }
                axios.post('http://localhost:3001/getOwnerQuestionDetails',data)
                .then(response=>{
                    console.log("Response received",response.data);
                    this.setState({
                        data:response.data
                    })
                    console.log("state data",this.state.data);
                })

            }else{
                data={
                    travellername:this.props.username
                }
                axios.post('http://localhost:3001/getTravellerQuestionDetails',data)
                .then(response=>{
                    console.log("Response received",response.data);
                    this.setState({
                        data:response.data
                    })
                    console.log("state data",this.state.data);
                })
            }
        }

        answerHandler=(e)=>{
            this.setState({
                answer:e.target.value
            })
          }

          submitAnswer=id=>(e)=>{

            console.log("Question id ",id);
            const data={
                answer:this.state.answer,
                questionID:id
            }
            console.log("Data to be sent",data);

            axios.post('http://localhost:3001/answer',data)
                .then(response=>{
                    console.log("Status code: ",response.status);
                    if(response.status===200){
                        console.log("Asnwer submitted successfully");
                    alert("Answer submitted successfully");
                        // window.location.href('/ownerdashboard');
                        this.props.history.push('/ownerdashboard'); 
                    }
                })
                .catch(err=>{
                    console.log("Error while sending the answer")
                })
            }

            render(){

                let detailsForTraveller=this.state.data.map((qanda,i)=>{
                    return(
                        <div>
               
                        <Accordion style={{'marginTop':'20px'}}> 
                 <AccordionItem >
                 <AccordionItemTitle>
                 
                 <h3 className="u-position-relative" style={{'font-family': '"Comic Sans MS", cursive, sans-serif'}}>{i+1}
                 {qanda.questionheadline}
                 <div className="accordion__arrow" role="presentation"/>
                </h3>
        
            </AccordionItemTitle>
            <AccordionItemBody>
                        <h4>Address:{qanda.propertyaddress}</h4>
                <h4>Question: {qanda.questiondesc}</h4>
                
                <h4>Answer:  {qanda.answer}</h4>

            </AccordionItemBody>
        </AccordionItem>
        
    </Accordion>
                
            </div>

                    )

                })

                let detailsForOwner=this.state.data.map((qanda,i)=>{
                    return(
                        <div>
                           
                           <Accordion style={{'marginTop':'20px'}}> 
                    <AccordionItem >
                    <AccordionItemTitle>
                    
                    <h3 className="u-position-relative" style={{'font-family': '"Comic Sans MS", cursive, sans-serif'}}>{i+1} {qanda.questionheadline}
                    <div className="accordion__arrow" role="presentation"/>
                    </h3>
                    
                        </AccordionItemTitle>
                        <AccordionItemBody>
                        <h4>Address:{qanda.propertyaddress}</h4>
                            <h4>{qanda.questiondesc}</h4>
            
                             <div>
                             <textarea id="ta" onChange={this.answerHandler} name="Answer" placeholder="Answer here" rows="5" cols="20" style={{'margin-left':'1px','width': '100%','padding':  '9px 14px','font-size':  '18px','border-radius':  '0px','line-height':  '1.33','margin-top':  '16px'}}></textarea>
                             
                             <input type="submit" onClick={this.submitAnswer(qanda._id)}  value="Submit Answer"  style={{'vertical-align':'middle','width':'40%','height':'44px','background-color':'#ff8a00','border-color':'#ff8a00','font-size':'18px','color':'#FFE','padding':' 7px 31px','text-align':'center'}}/>
            
                            </div>
                            
                        </AccordionItemBody>
                    </AccordionItem>    
                </Accordion>
                            
                        </div>
                    )
                })
if(!this.props.isowner)
{
    return(
        
        <div>
        
        <div className="row" style={{ 'height': '10px' ,'margin':'30px'}}>
                    <div style={{'top':'0','left':'0','position':'absolute'}}>
                    <Link to="/firstpage" ><img class="imgformatt" id="logo1"  alt="Home Away" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/logo-bceheader-white.svg"></img>
                    </Link></div>

                    <div style={{'top':'0','right':'0%','float':'right','padding-left':'1200px','position':'absolute',}}>
                    <Link to="/firstpage" > <img class="imgformatt" id ="image" alt="Home Away" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/birdhouse-bceheader-white.svg"></img></Link>
                    </div>
            </div>

                
                <h2>Questions and Answers</h2>

                {detailsForTraveller}
        </div>
    )
}

else {
    return(
        <div style={{'marginTop':'70px'}}>
            
            
             <div className="row" style={{ 'height': '10px' ,'margin':'30px'}}>
                    <div style={{'top':'0','left':'0','position':'absolute'}}>
                    <Link to="/ownerdashboard"> <img class="imgformatt" id="logo1"  alt="Home Away" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/logo-bceheader-white.svg"></img></Link>
                    </div>

                    <div style={{'top':'0','right':'0%','float':'right','padding-left':'1200px','position':'absolute',}}>
                    <Link to="/ownerdashboard" > <img class="imgformatt"  id ="image" alt="Home Away" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/birdhouse-bceheader-white.svg"></img></Link>
                    </div>
            </div>

            <div className="rowMessage" style={{'backgroundColor':'rgb(248, 249, 250)'}}>
            <div className="columnMessage">
                {detailsForOwner}
            </div>
            <div className="columnMessage" style={{'marginTop':'100px','backgroundColor':''}}>

            </div>

                
             </div>   
            
               
        </div>
    )

}
}}

const mapStateToProps = state =>{
    console.log(state);
    return {
        isowner:state.isowner,
        ownername:state.ownername,
        username:state.username
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
export default connect(mapStateToProps,mapDispatchStateToProps)(Messages);