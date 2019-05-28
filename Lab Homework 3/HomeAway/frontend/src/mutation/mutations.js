
import { gql } from 'apollo-boost';

const BookMutation = gql`
    mutation BookMutation($headline: String, $username: String, $startdate: String, $enddate: String, $guests: String,$city: String, $rates: String){
        BookMutation(headline: $headline, username: $username, startdate: $startdate, enddate: $enddate, guests: $guests, city: $city, rates: $rates){
            headline
        }
    }
`;

const Signup = gql`
    mutation Signup($firstname: String, $username: String, $lastname: String, $password: String){
        Signup(firstname: $firstname, username: $username, lastname: $lastname, password: $password){
            firstname
            username
            lastname
            password
        }
    }
`;

export {BookMutation,Signup};