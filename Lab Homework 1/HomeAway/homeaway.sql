-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Oct 08, 2018 at 06:54 AM
-- Server version: 5.7.21
-- PHP Version: 5.6.35

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `homeaway`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookingdetails`
--

DROP TABLE IF EXISTS `bookingdetails`;
CREATE TABLE IF NOT EXISTS `bookingdetails` (
  `bookingid` int(3) NOT NULL AUTO_INCREMENT,
  `propertyid` int(3) NOT NULL,
  `userid` int(3) NOT NULL,
  `startdate` date NOT NULL,
  `enddate` date NOT NULL,
  `guests` varchar(3) NOT NULL,
  `rates` varchar(10) NOT NULL,
  `totalcharge` varchar(10) NOT NULL,
  `city` varchar(30) NOT NULL,
  PRIMARY KEY (`bookingid`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bookingdetails`
--

INSERT INTO `bookingdetails` (`bookingid`, `propertyid`, `userid`, `startdate`, `enddate`, `guests`, `rates`, `totalcharge`, `city`) VALUES
(1, 3, 1, '2018-10-06', '2018-10-08', '3', '50', '100', 'San Jose'),
(5, 1, 1, '2018-10-06', '2018-10-08', '3', '10', '20', 'San Jose'),
(3, 3, 1, '2018-10-06', '2018-10-08', '4', '50', '100', 'New York'),
(4, 1, 1, '2018-10-06', '2018-10-08', '2', '10', '20', 'San Jose');

-- --------------------------------------------------------

--
-- Table structure for table `property`
--

DROP TABLE IF EXISTS `property`;
CREATE TABLE IF NOT EXISTS `property` (
  `propertyid` int(3) NOT NULL AUTO_INCREMENT,
  `address` varchar(150) NOT NULL,
  `city` varchar(30) NOT NULL,
  `country` varchar(30) NOT NULL,
  `zipcode` varchar(10) NOT NULL,
  `headline` varchar(100) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `bedrooms` varchar(3) NOT NULL,
  `accomodates` varchar(3) NOT NULL,
  `bathrooms` varchar(3) NOT NULL,
  `startdate` date NOT NULL,
  `enddate` date NOT NULL,
  `currency` varchar(10) NOT NULL,
  `Nightbaserates` varchar(10) NOT NULL,
  `minstay` varchar(10) NOT NULL,
  `userid` int(3) NOT NULL,
  `image` varchar(100) NOT NULL,
  `proptype` varchar(30) NOT NULL,
  `imagename` varchar(30) NOT NULL,
  `travellerid` int(3) DEFAULT NULL,
  `ratings` varchar(3) DEFAULT NULL,
  `booked` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`propertyid`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `property`
--

INSERT INTO `property` (`propertyid`, `address`, `city`, `country`, `zipcode`, `headline`, `description`, `bedrooms`, `accomodates`, `bathrooms`, `startdate`, `enddate`, `currency`, `Nightbaserates`, `minstay`, `userid`, `image`, `proptype`, `imagename`, `travellerid`, `ratings`, `booked`) VALUES
(1, '868 south#215', 'San Jose', 'USA', '95112', 'Welcome to DaLords!!! Bienvenidos a LosLores!!! Si, hablamos español!', 'Villa Torino boasts 1, 2, and 3 bedroom floor plans with large living areas perfect for entertaining, generous bedrooms for the perfect at home feel, plush carpeting throughout, and tiled kitchens and baths. Select units feature separate dining areas, generously sized kitchens with modern appliances and cabinetry. ', '2', '5', '2', '2018-10-01', '2018-10-15', 'USD', '10', '1', 1, 'C:\\Users\\HP\\Desktop\\CMPE273-61\\Lab Homework 1\\HomeAway\\backend\\uploads\\CMPE_272_TCP_Plot.png', 'apartment', 'image.png', 1, NULL, 1),
(2, '875 North#652', 'San Jose', 'USA', '95121', 'Bright, All New Semi Basement Apartment', 'A place with a soul. That’s what you get when you move into the Foundry Commons. Part industrial. Part sophisticated. But all very real. Foundry Commons is where doers, originators, and creatives not only call home but make it as well. Unique to this community are resort-like amenities such as a Pool, Petanque Court, Bike Workshop, Dog Spa, Library Loft and a MicroGallery. Offering a variety of living options that mesh with your unique styles, Foundry Commons is where you can make a life for yourself.', '3', '6', '3', '2018-10-03', '2018-10-14', 'USD', '100', '2', 1, 'C:\\Users\\HP\\Desktop\\CMPE273-61\\Lab Homework 1\\HomeAway\\backend\\uploads\\care confirmation.png', 'barn', 'apartments.png', NULL, NULL, 0),
(3, '879 New York767 West', 'New York', 'USA', '98382', 'Private Room 5 Minutes to JFK NYC Airport & 15 Minutes To Laguardua A/port', 'This remarkably large convertible three-bedroom, 2.5 bathroom home enjoys abundant space and sunlight and has north, south, and eastern Exposures. Its spacious living room is west facing and a large dining area can easily convert to a 124 x103 third bedroom with its own closet', '2', '8', '2', '2018-10-02', '2018-10-24', 'USD', '50', '1', 2, 'C:\\Users\\HP\\Desktop\\CMPE273-61\\Lab Homework 1\\HomeAway\\backend\\uploads\\Photo.jpg', 'cabin', 'image1.png', 1, NULL, 1),
(5, '867 North#442', 'San Jose', 'USA', '87762', 'lmf bf, b,fm m', '  vf.d b.fbf b.f bf ', '3', '7', '3', '2018-10-06', '2018-10-11', 'USD', '200', '1', 1, 'C:\\Users\\HP\\Desktop\\CMPE273-61\\Lab Homework 1\\HomeAway\\backend\\uploads\\update profile.png', 'cabin', 'update profile.png', NULL, NULL, 0),
(4, 'A/11 bulkSN JLDK', 'New York', 'USA', '95756', 'For the quick NYC stay .....1 Small Room & Bathroom', 'Beautiful railroad style apartment available for rent in the heart of Bushwick! Located around the block from Maria Hernandez Park, and one block from the L Train Jefferson St Station. ', '2', '5', '2', '2018-10-07', '2018-10-09', 'USD', '100', '4', 1, 'C:\\Users\\HP\\Desktop\\CMPE273-61\\Lab Homework 1\\HomeAway\\backend\\uploads\\CMPE_272_TCP_Plot.png', 'bungalow', 'image2.png', NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `userinfo`
--

DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE IF NOT EXISTS `userinfo` (
  `userid` int(3) NOT NULL AUTO_INCREMENT,
  `Firstname` varchar(30) NOT NULL,
  `Lastname` varchar(30) NOT NULL,
  `AboutMe` varchar(200) DEFAULT NULL,
  `City` varchar(30) DEFAULT NULL,
  `Company` varchar(30) DEFAULT NULL,
  `School` varchar(30) DEFAULT NULL,
  `Hometown` varchar(30) DEFAULT NULL,
  `Languages` varchar(30) DEFAULT NULL,
  `Gender` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `userinfo`
--

INSERT INTO `userinfo` (`userid`, `Firstname`, `Lastname`, `AboutMe`, `City`, `Company`, `School`, `Hometown`, `Languages`, `Gender`) VALUES
(1, 'kesha', 'shah', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'admin', 'admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, 'Jugal', 'Shah', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(4, 'demo', 'demo', NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `usertable`
--

DROP TABLE IF EXISTS `usertable`;
CREATE TABLE IF NOT EXISTS `usertable` (
  `userid` int(3) NOT NULL AUTO_INCREMENT,
  `Username` varchar(30) NOT NULL,
  `Password` varchar(300) NOT NULL,
  `Firstname` varchar(30) NOT NULL,
  `Lastname` varchar(30) NOT NULL,
  `PlainPassword` varchar(30) NOT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `usertable`
--

INSERT INTO `usertable` (`userid`, `Username`, `Password`, `Firstname`, `Lastname`, `PlainPassword`) VALUES
(1, 'kesha@gmail.com', '$2a$10$qxqo9r1SqWRVMOebBUljBupN/wFxuWLWOIX9njxmPwE0orPkX.rVC', 'kesha', 'shah', 'kesha'),
(2, 'admin@gmail.com', '$2a$10$mJT8mxJhakDjqKzsX8V3kOlMpa.xxLI0WEqbUuNMB2BElWE705zbu', 'admin', 'admin', 'admin'),
(3, 'jugal@gmail.com', '$2a$10$5vNBDbCK.BTeHynHZ.1o3OA5mN2HbsL6.KoLSWqnRJ1Zp90xPdZJq', 'Jugal', 'Shah', 'jugal'),
(4, 'demo@gmail.com', '$2a$10$o0KvSLBKbe2pTqP0etccUOiCS3BjfxiBbAUOSsau4rV9ahNRihd0.', 'demo', 'demo', 'demo');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
