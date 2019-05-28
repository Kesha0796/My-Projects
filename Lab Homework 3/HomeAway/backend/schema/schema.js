const graphql = require('graphql');
const _ = require('lodash');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var crypt = require('../app/crypt');
var db = require('../app/db');
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var {UserInfo}=require('../models/userinfo');
var {Users}=require('../models/users');
var {Property}=require('../models/property');
var {Booking}=require('../models/booking');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

// dummy data
var books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
    { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
    { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
    { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' },
];

var authors = [
    { name: 'Patrick Rothfuss', age: 44, id: '1' },
    { name: 'Brandon Sanderson', age: 42, id: '2' },
    { name: 'Terry Pratchett', age: 66, id: '3' }
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args){
                return _.find(authors, { id: parent.authorId });
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return _.filter(books, { authorId: parent.id });
            }
        }
    })
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: ( ) => ({
        username: { type: GraphQLString },
        aboutme: { type: GraphQLString },
        firstname: { type: GraphQLString },
        lastname: { type: GraphQLString },
        city: { type: GraphQLString },
        Company: { type: GraphQLString },
        school: { type: GraphQLString },
        Hometown: { type: GraphQLString },
        Languages: { type: GraphQLString },
        gender: { type: GraphQLString },
        status:{ type: GraphQLString },
        token : { type: GraphQLString },
        password:{type:GraphQLString},
    })
});

const SearchType=new GraphQLObjectType(
    {
        name:'Search',
        fields: ( ) => (
            {
                place:{type:GraphQLString},
                username:{type:GraphQLString},
                arrivaldate:{type:GraphQLString},
                departdate:{type:GraphQLString},
                guest:{type:GraphQLString},
                address : {
                    type: GraphQLString
                },
                headline:{
                    type:GraphQLString
                },
                description:{
                    type:GraphQLString
                },
                bedrooms:
                {
                    type:GraphQLString
                },
                accomodates:{
                    type:GraphQLString
                },
                bathrooms:{
                    type:GraphQLString
                },
                currency:
    {
        type:GraphQLString
    },
    Nightbaserates:{
        type:GraphQLString
    },
    minstay:{
        type:GraphQLString
    },
    _id:{
        type:GraphQLString
    }
            }
        )
    }
)
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return _.find(books, { id: args.id });
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return _.find(authors, { id: args.id });
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return books;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return authors;
            }
        },
        Login: {
            type: UserType,
            args: { 
                        username: { type: GraphQLString },
                        password:{ type: GraphQLString } 
                     },
                 async resolve(parent, args){
                    console.log("login args",args)
                    var data
                    var user = await Users.findOne({"username":args.username})

                    if(user){
                      console.log("User",user.username)
                      console.log("User",user.password)
                      console.log("User",user)
                        
                  }  
                return(user)
            }
            
        },
        Search:{
            type: new GraphQLList(SearchType),
            args: { 
                        place: { type: GraphQLString },
                        arrivaldate:{ type: GraphQLString },
                        departdate:{ type:GraphQLString },
                        guest:{type:GraphQLString}
                     },
                 async resolve(parent, args){
                    console.log("search args",args)
                    var property=await Property.find(
                        {
                            "city":args.place,
                                
                        }) 

                        console.log("property data",property);
                                
                        console.log("Property found");        
                        return(property)      
                    }
                },
            Propertydetail:{
                    type: SearchType,
                    args: { 
                                headline:{type:GraphQLString}
                             },
                         async resolve(parent, args){
                            console.log("search args",args)
                            var property=await Property.findOne(
                                {
                                    "headline":args.headline,
                                        
                                }) 
        
                                console.log("property data",property);
                                        
                                console.log("Property found");        
                                return(property)      
                            }
                },

                mytrips:{
                    type: SearchType,
                    args: { 
                                username:{type:GraphQLString}
                             },
                         async resolve(parent, args){
                            console.log("search args",args)
                            var booking=await Booking.find(
                                {
                                    "username":args.username,
                                        
                                }) 
        
                                console.log("property data",booking);
                                        
                                console.log("booking found");        
                                return(booking)      
                            }
                },
                OwnerDash:{
                    type: new GraphQLList(SearchType),
                    args: { 
                                username: { type: GraphQLString },
                             },
                         async resolve(parent, args){
                            console.log("search args",args)
                            var property=await Property.find(
                                {
                                    "username":args.username,
                                        
                                }) 
        
                                console.log("property data",property);
                                        
                                console.log("Property for the owner",args.username);        
                                return(property)      
                            }
                        }
    }
});

var count=10;
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: GraphQLString },
                age: { type: GraphQLInt },
                id:{ type: GraphQLID }
            },
            resolve(parent, args){
                let author ={
                    name: args.name,
                    age: args.age,
                    id: args.id
                };
                authors.push(author)
                console.log("Authors",authors);
                return author;
            }
        },

        addBook: {
            type: BookType,
            args: {
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
                authorId: { type: GraphQLID },
            },
            resolve(parent, args){
                let book = {
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId,
                    id:count++
                }
                books.push(book);
                return book;
            }
        },

        BookMutation: {
            type: SearchType,
            args: {
                headline: { type: GraphQLString },
                username: { type: GraphQLString },
                startdate: { type: GraphQLString },
                enddate: { type: GraphQLString },
                guests: { type: GraphQLString },
                city: { type: GraphQLString },
                rates: { type: GraphQLString }
            },
            resolve(parent, args){
                var booking = new Booking( {
                    headline: args.headline,
                    username: args.username,
                    startdate: args.startdate,
                    enddate: args.enddate,
                    guests: args.guests,
                    city: args.city,
                    rates:args.rates
                })
                booking.save();
                Property.findOneAndUpdate({
                    "headline":args.headline
                },
                {
                    $set:
                    {
                        booked:1,
                        travellername:args.username,
                    }
                },
                {
                    upsert:true
                })
                console.log("Property is booked");
            }
        },

        Signup: {
            type: UserType,
            args: {
                firstname: { type: GraphQLString },
                lastname: { type: GraphQLString },
                username: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parent, args){
                console.log("args value",args);
                var user = new Users({
                    firstname: args.firstname,
                    lastname: args.lastname,
                    username: args.username,
                    plainpassword:args.password
                })
                user.save();
                console.log("Sign Up successfull")
                return(user)
            }
        },

        UpdateProfile: {
            type: UserType,
            args: {
                firstname: { type: GraphQLString },
                lastname: { type: GraphQLString },
                username: { type: GraphQLString },
                aboutme: { type: GraphQLString },
                city: { type: GraphQLString },
                company: { type: GraphQLString },
                school: { type: GraphQLString },
                hometown: { type: GraphQLString },
                language:{type:GraphQLString},
                gender:{type:GraphQLString}
            },
            resolve(parent, args){
                console.log("args value",args);
                var user=UserInfo.findOneAndUpdate({
                    username:args.username
                },
                {
                    $set:{
                        firstname: args.firstname,
                        lastname: args.lastname,
                        aboutme:args.aboutme,
                        city: args.city,
                        company: args.company,
                        school: args.school,
                        hometown:args.hometown,
                        language: args.language,
                        gender:args.gender
                    }
                },
                {upsert:true})
                console.log("Sign Up successfull")
                return(user)
            }
        }
    
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});