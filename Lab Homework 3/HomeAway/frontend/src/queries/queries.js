import { gql } from 'apollo-boost';

const getAuthorsQuery = gql`
    {
        authors {
            name
            id
        }
    }
`;

const getBooksQuery = gql`
    {
        books {
            name
            id
        }
    }
`;

const Login = gql`
    query Login($username: String, $password: String){
        Login(username: $username, password: $password){
            username
            password
        }
    }
`;

const Search = gql`
    query Search($place: String, $arrivaldate: String, $departdate:String, $guest: String){
        Search(place: $place, arrivaldate: $arrivaldate, departdate: $departdate, guest: $guest){
           address
           headline
           description
           bedrooms
           accomodates
           bathrooms
           currency
           Nightbaserates
           minstay
        }
    }
`;

const OwnerDash = gql`
    query OwnerDash($username: String){
        OwnerDash(username: $username){
           address
           headline
           description
           bedrooms
           accomodates
           bathrooms
           currency
           Nightbaserates
           minstay
        }
    }
`;

const Propertydetail = gql`
    query Propertydetail($headline: String){
        Propertydetail(headline: $headline){
           address
           headline
           description
           bedrooms
           accomodates
           bathrooms
           currency
           Nightbaserates
           minstay
        }
    }
`;

const mytrips = gql`
    query mytrips($username: String){
        mytrips(username: $username){
           address
           headline
           description
           bedrooms
           accomodates
           bathrooms
           currency
           Nightbaserates
           minstay
        }
    }
`;

export { getAuthorsQuery, getBooksQuery,Login, Search,Propertydetail, mytrips, OwnerDash };