-- phpMyAdmin SQL Dump
-- version 4.0.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 05, 2017 at 12:45 PM
-- Server version: 5.6.12-log
-- PHP Version: 5.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `lawdb`
--
CREATE DATABASE IF NOT EXISTS `lawdb` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `lawdb`;

-- --------------------------------------------------------

--
-- Table structure for table `aadhar_details`
--

CREATE TABLE IF NOT EXISTS `aadhar_details` (
  `AadharNumber` int(15) NOT NULL,
  `FirstName` varchar(20) NOT NULL,
  `LastName` varchar(20) NOT NULL,
  `Photo` varchar(50) NOT NULL,
  `Emailid` varchar(50) NOT NULL,
  `PhoneNumber` int(10) NOT NULL,
  `Address` varchar(80) NOT NULL,
  `City` varchar(20) NOT NULL,
  PRIMARY KEY (`AadharNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `aadhar_details`
--

INSERT INTO `aadhar_details` (`AadharNumber`, `FirstName`, `LastName`, `Photo`, `Emailid`, `PhoneNumber`, `Address`, `City`) VALUES
(1, 'jkgfh', 'hgg', 'ggghg', 'kesha@gmail.com', 8687, 'gfhh', 'hbvhn');

-- --------------------------------------------------------

--
-- Table structure for table `citizen_login_signup`
--

CREATE TABLE IF NOT EXISTS `citizen_login_signup` (
  `PhoneNumber` int(10) NOT NULL,
  `PhoneNumberAlt` int(10) DEFAULT NULL,
  `AadharNumber` int(15) NOT NULL,
  `Emailid` varchar(50) NOT NULL,
  `EmergencyPh1` int(10) NOT NULL,
  `EmergencyPh2` int(10) DEFAULT NULL,
  `EmergenyPh3` int(10) DEFAULT NULL,
  PRIMARY KEY (`AadharNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `citizen_login_signup`
--

INSERT INTO `citizen_login_signup` (`PhoneNumber`, `PhoneNumberAlt`, `AadharNumber`, `Emailid`, `EmergencyPh1`, `EmergencyPh2`, `EmergenyPh3`) VALUES
(87587, 978, 1, 'kesha@gmail.com', 67, 767, 677);

-- --------------------------------------------------------

--
-- Table structure for table `complaint_details`
--

CREATE TABLE IF NOT EXISTS `complaint_details` (
  `ComplaintId` int(15) NOT NULL AUTO_INCREMENT,
  `ComplaintDate` date NOT NULL,
  `Location` varchar(50) NOT NULL,
  `Audio` varchar(100) NOT NULL,
  `Video` varchar(100) NOT NULL,
  `Description` varchar(350) NOT NULL,
  `Image` varchar(100) NOT NULL,
  `AadharNumber` int(15) NOT NULL,
  `FirstName` varchar(20) NOT NULL,
  `LastName` varchar(20) NOT NULL,
  `PoliceFirstName` varchar(20) NOT NULL,
  `PoliceLastName` varchar(20) NOT NULL,
  `Post` varchar(20) NOT NULL,
  `Comments` varchar(500) NOT NULL,
  `Status` varchar(15) NOT NULL,
  `PolicePhoneNumber` int(10) NOT NULL,
  `PoliceId` int(15) NOT NULL,
  PRIMARY KEY (`ComplaintId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `criminal_details`
--

CREATE TABLE IF NOT EXISTS `criminal_details` (
  `CriminalId` int(10) NOT NULL AUTO_INCREMENT,
  `CriminalName` varchar(50) NOT NULL,
  `CriminalImage` varchar(250) NOT NULL,
  `Age` int(3) NOT NULL,
  `Gender` varchar(10) NOT NULL,
  `Crime` varchar(100) NOT NULL,
  `Sections` varchar(100) NOT NULL,
  `Address` varchar(100) NOT NULL,
  `City` varchar(35) NOT NULL,
  `PhoneNumber` int(10) NOT NULL,
  `Status` varchar(30) NOT NULL,
  `RecordDetail` varchar(250) NOT NULL,
  `FirNumber` varchar(20) NOT NULL,
  `PoliceComments` varchar(500) NOT NULL,
  PRIMARY KEY (`CriminalId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `criminal_request`
--

CREATE TABLE IF NOT EXISTS `criminal_request` (
  `RequestId` int(10) NOT NULL AUTO_INCREMENT,
  `RequestDate` date NOT NULL,
  `CriminalName` varchar(250) NOT NULL,
  `UploadedPhoto` varchar(250) DEFAULT NULL,
  `RequestStatus` varchar(25) NOT NULL,
  `DetectiveId` int(10) NOT NULL,
  `DescriptionOfRequest` varchar(500) NOT NULL,
  PRIMARY KEY (`RequestId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `detective_login_signup`
--

CREATE TABLE IF NOT EXISTS `detective_login_signup` (
  `Detective_id` int(10) NOT NULL AUTO_INCREMENT,
  `Detective_Proof` varchar(100) NOT NULL,
  `Phone_Number` int(10) NOT NULL,
  `Email_id` varchar(50) NOT NULL,
  `Password` varchar(15) NOT NULL,
  `NameOfTheOrganisation` varchar(50) NOT NULL,
  PRIMARY KEY (`Detective_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `laws_table`
--

CREATE TABLE IF NOT EXISTS `laws_table` (
  `Lawid` int(10) NOT NULL AUTO_INCREMENT,
  `LawType` varchar(20) NOT NULL,
  `Source` varchar(250) NOT NULL,
  PRIMARY KEY (`Lawid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `laws_table`
--

INSERT INTO `laws_table` (`Lawid`, `LawType`, `Source`) VALUES
(1, 'criminal', 'upload/Receipt Summary Janvi.pdf'),
(2, 'women safety', 'upload/Receipt Summary Janvi1.pdf'),
(3, 'women safety', 'upload/State Bank of India.pdf');

-- --------------------------------------------------------

--
-- Table structure for table `license_application`
--

CREATE TABLE IF NOT EXISTS `license_application` (
  `AadharNumber` int(15) NOT NULL,
  `LicenseType` varchar(50) NOT NULL,
  `Documents` varchar(50) NOT NULL,
  `PoliceStatus` varchar(50) NOT NULL,
  `Comment` varchar(150) NOT NULL,
  `Description` varchar(500) NOT NULL,
  `Licenseid` int(10) NOT NULL AUTO_INCREMENT,
  `LicenseDate` date NOT NULL,
  `Location` varchar(50) NOT NULL,
  `AdminStatus` varchar(50) NOT NULL,
  PRIMARY KEY (`Licenseid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=856857 ;

--
-- Dumping data for table `license_application`
--

INSERT INTO `license_application` (`AadharNumber`, `LicenseType`, `Documents`, `PoliceStatus`, `Comment`, `Description`, `Licenseid`, `LicenseDate`, `Location`, `AdminStatus`) VALUES
(2147483647, 'arms', 'hfrheih', '1', 'approved', 'khghj', 865, '2017-09-07', 'hkgshdlsh', '1'),
(747326527, 'arms', 'khfsnkh', '1', 'khgkrhsk', 'kdjg,snk', 856856, '2017-09-06', 'jgkdi', '-1');

-- --------------------------------------------------------

--
-- Table structure for table `police_login_signup`
--

CREATE TABLE IF NOT EXISTS `police_login_signup` (
  `Police_Proof` varchar(20) NOT NULL,
  `Phone_Number` int(10) NOT NULL,
  `AadharNumber` int(15) NOT NULL,
  `Phone_Number_Alt` int(10) NOT NULL,
  `PoliceId` int(15) NOT NULL AUTO_INCREMENT,
  `Email` varchar(50) NOT NULL,
  `Password` varchar(15) NOT NULL,
  PRIMARY KEY (`PoliceId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
