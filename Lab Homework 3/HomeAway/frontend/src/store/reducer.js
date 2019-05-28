
const initialStore = {
    authFlag : false,
    inserted:false,
    Users : [],
    username:"",
    firstname:"",
    edited:false,
    avail:false,
    imageinsert:false,
    details:false,
    location:false,
    price:false,
    search:false,
    city:" ",
    startdate:" ",
    enddate:" ",
    accomodates:" ",
    display:false,
    getproperty:false,
    propertyid:" ",
    book:false,
    ownername:" ",
    ownerprop:false,
    ownerpropid:" ",
    isowner:false,
    propertyaddress:" "
}

const reducer = (state = initialStore,action) => {
    if(action.type === "LOGIN" && action.statusCode == 200){
        return {
            ...state,
            authFlag : true,
            username:action.payload.username,
            firstname:action.payload.firstname
        }
    }
    if(action.type === "LOGIN" && action.status == 401){
        return {
            ...state,
            authFlag : false
        }
    }   
    if(action.type === "SIGNUP" && action.statusCode == 200){
        return {
            ...state,
            Users:state.Users.concat(action.payload),
            inserted : true,
            firstname:action.payload.firstname,
            username:action.payload.username
        }
    }
    if(action.type === "SIGNUP" && action.status == 400){
        return {
            ...state,
            inserted : false
        }
    }   
    if(action.type === "OWNERSIGNUP" && action.statusCode == 200){
        return {
            ...state,
            inserted : true,
        }
    }
    if(action.type === "OWNERSIGNUP" && action.status == 400){
        return {
            ...state,
            inserted : false
        }
    }   
    if(action.type === "EDITPROFILE" && action.statusCode == 200){
        return {
            ...state,
            edited : true
        }
    }
    if(action.type === "EDITPROFILE" && action.status == 400){
        return {
            ...state,
            edited : false
        }
    } 
    if(action.type === "OWNERLOGIN" && action.statusCode == 200){
        return {
            ...state,
            ownerlogin : true,
            isowner:true,
            ownername:action.payload.user.username
        }
    }
    if(action.type === "OWNERLOGIN" && action.status == 400){
        return {
            ...state,
            ownerlogin : false
        }
    } 
    if(action.type === "OWNERPROP" && action.statusCode == 200){
        return {
            ...state,
            ownerprop : true,
            ownername:action.payload.username,
            ownerpropid:action.payload.propertyid
        }
    }
    if(action.type === "OWNERPROP" && action.status == 400){
        return {
            ...state,
            ownerprop : false
        }
    } 
    if(action.type === "BOOK" && action.statusCode == 200){
        return {
            ...state,
            book : true,
            search:false
        }
    }
    if(action.type === "BOOK" && action.status == 400){
        return {
            ...state,
            book : false
        }
    } 
    if(action.type === "FETCHPROPIDDATA" && action.statusCode == 200){
        return {
            ...state,
            edited : true
        }
    }
    if(action.type === "FETCHPROPIDDATA" && action.status == 400){
        return {
            ...state,
            edited : false
        }
    } 
    if(action.type === "HANDLESTATE" && action.statusCode == 200){
        console.log("In Hande state reducer method");
        console.log("Payload value",action.payload);
        return {
            ...state,
            getproperty : false
        }
    }
    if(action.type === "GETPROPERTY" && action.statusCode == 200){
        console.log("reducer data:",action);
        return {
            ...state,
            getproperty : true,
            propertyid:action.payload.propertyid,
            ownername:action.payload.ownername,
            propertyaddress:action.payload.address
        }
    }
    if(action.type === "GETPROPERTY" && action.status == 400){
        return {
            ...state,
            getproperty : false
        }
    } 
    if(action.type === "PRICEDATA" && action.statusCode == 200){
        return {
            ...state,
            price : true
        }
    }
    if(action.type === "PRICEDATA" && action.status == 400){
        return {
            ...state,
            price : false
        }
    } 
    if(action.type === "DISPLAY" && action.statusCode == 200){
        return {
            ...state,
            display : true
        }
    }
    if(action.type === "DISPLAY" && action.status == 400){
        return {
            ...state,
            display : false
        }
    } 
    if(action.type === "SEARCH" && action.statusCode == 200){
        console.log(action.payload);
        return {
            ...state,
            city:action.payload.city,
            startdate:action.payload.startdate,
            enddate:action.payload.enddate,
            accomodates:action.payload.accomodates,
            search : true
        }
    }
    if(action.type === "SEARCH" && action.status == 400){
        return {
            ...state,
            search : false
        }
    } 
    if(action.type === "AVAIL" && action.statusCode == 200){
        return {
            ...state,
            avail : true
        }
    }
    if(action.type === "AVAIL" && action.status == 400){
        return {
            ...state,
            avail : false
        }
    } 
    if(action.type === "IMAGEUPLOAD" && action.statusCode == 200){
        return {
            ...state,
            imageinsert : true
        }
    }
    if(action.type === "IMAGEUPLOAD" && action.status == 400){
        return {
            ...state,
            imageinsert : false
        }
    } 
    if(action.type === "DETAILS" && action.statusCode == 200){
        return {
            ...state,
            details : true
        }
    }
    if(action.type === "DETAILS" && action.status == 400){
        return {
            ...state,
            details : false
        }
    }  
    if(action.type === "LOCATIONPROP" && action.statusCode == 200){
        return {
            ...state,
            location : true
        }
    }
    if(action.type === "LOCATIONPROP" && action.status == 400){
        return {
            ...state,
            location : false
        }
    }    
    if(action.type === "LOGOUT"){
        return {
            ...state,
            authFlag : false,
            bookCreated : false,
            books : []
        }
    }
    return state;
}

export default reducer;