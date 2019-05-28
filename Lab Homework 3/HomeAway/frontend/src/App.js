import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import {Route} from 'react-router-dom';
import Login from './components/travellerlogin/TravellerLogin';
import logo from './logo.svg';
import OwnerLogin from './components/ownerlogin/OwnerLogin';
import SignUp from './components/signup/SignUp';
import {BrowserRouter} from 'react-router-dom';
import './App.css';
import SignUpInner from './components/signupinner/SignUpInner';
import homepage from './components/HomePage/homepage';
import ListProp from './components/ListProperty/listproperty';
import ListPropDetails from './components/ListPropDetails/listpropdetails';
import ListPropAvailability from './components/Availability/availability';  
import rentalprice from './components/RentalPrice/rentalprice';
import image from './components/image/image';
import ownerdashboard from './components/ownerdashboard/ownerdashboard';
import travellerdashboard from './components/travellerdashboard/travellerdashboard';
import propertynotavailable from './components/propertynotavailable/propertynotavailable';
import editprofile from './components/editprofile/EditProfile';
import postsignup from './components/PostSignUp/postsignup';
import traveldata from './components/traveldata/traveldata';
import mytrips from './components/mytrips/mytrips';
import ownerinbox from './components/OwnerInbox/ownerinbox';
import ownersignup from './components/OwnerSignUp/ownersignup';
import ownerbookedprops from './components/ownerbookingprops/ownerbookingprops';

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql'
});
class App extends Component
{
  render() {
    return (
      <ApolloProvider client={client}>
      <BrowserRouter>

      <div>
      <Route path="/image" component={image}/>
      <Route path="/traveldata" component={traveldata}/>
      <Route path="/postsignup" component={postsignup}/>
      <Route path="/login" component={Login}/>
      <Route path="/signup" component={SignUp}/>
      <Route path="/ownerlogin" component={OwnerLogin}/>
      <Route path="/signupinner" component={SignUpInner}/>
      <Route path="/firstpage" component={homepage}/>
      <Route path="/listprop" component={ListProp}/>
      <Route path="/listpropdetails" component={ListPropDetails}/>
      <Route path="/listpropavailability" component={ListPropAvailability}/>
      <Route path="/rentalprice" component={rentalprice}/>
      <Route path="/ownerdashboard" component={ownerdashboard}/>
      <Route path="/travellerdashboard" component={travellerdashboard}/>
      <Route path="/editprofile" component={editprofile}/>
      <Route path="/mytrips" component={mytrips}/>
      <Route path="/ownerbookedprops" component={ownerbookedprops}/>
      <Route path="/ownerinbox" component={ownerinbox}/>
      <Route path="/ownersignup" component={ownersignup}/>
  
      </div>
      </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
