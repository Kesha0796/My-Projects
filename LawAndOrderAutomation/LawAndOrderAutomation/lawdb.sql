-- phpMyAdmin SQL Dump
-- version 3.4.10.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 27, 2018 at 12:19 PM
-- Server version: 5.5.20
-- PHP Version: 5.3.10

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `lawdb`
--

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
  `PhoneNumber` varchar(15) NOT NULL,
  `PhoneNumberAlt` varchar(15) DEFAULT NULL,
  `Emailid` varchar(50) NOT NULL,
  `EmergencyPh1` int(10) NOT NULL,
  `EmergencyPh2` int(10) DEFAULT NULL,
  `EmergenyPh3` int(10) DEFAULT NULL,
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `AadharNumber` int(20) NOT NULL,
  `password` varchar(25) NOT NULL,
  `full_name` varchar(25) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=43132 ;

--
-- Dumping data for table `citizen_login_signup`
--

INSERT INTO `citizen_login_signup` (`PhoneNumber`, `PhoneNumberAlt`, `Emailid`, `EmergencyPh1`, `EmergencyPh2`, `EmergenyPh3`, `id`, `AadharNumber`, `password`, `full_name`) VALUES
('8866331538', '8866331538', 'kesha@gmail.com', 67, 767, 677, 1, 1, 'swapnil', ''),
('2147483647', '345466', 'mehar@gmail.com', 0, NULL, NULL, 43124, 1, 'mehar123', 'Mehar Shahani'),
('0', NULL, '', 0, NULL, NULL, 43125, 0, '', ''),
('0', NULL, '', 0, NULL, NULL, 43126, 1, '', ''),
('0', NULL, '', 0, NULL, NULL, 43127, 0, '', ''),
('2147483647', NULL, '', 0, NULL, NULL, 43128, 1, 'kesha', 'jnzns'),
('2147483647', NULL, '', 0, NULL, NULL, 43129, 7877, 'kesha', 'jnzns'),
('2147483647', '2147483647', 'kesha@gmail.com', 878787889, 877865556, 985556556, 43130, 86677, 'kesha', 'kesha shah'),
('2147483647', '2147483647', 'kesha@gmail.com', 878787889, 877865556, 985556556, 43131, 86677, 'kesha', 'kesha shah');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `criminal_request`
--

INSERT INTO `criminal_request` (`RequestId`, `RequestDate`, `CriminalName`, `UploadedPhoto`, `RequestStatus`, `DetectiveId`, `DescriptionOfRequest`) VALUES
(1, '2018-03-28', 'Guru Mann', 'upload/2719235.gif', '', 0, 'free');

-- --------------------------------------------------------

--
-- Table structure for table `detective_login_signup`
--

CREATE TABLE IF NOT EXISTS `detective_login_signup` (
  `Detective_id` int(10) NOT NULL AUTO_INCREMENT,
  `Detective_Proof` varchar(100) NOT NULL,
  `Phone_Number` varchar(10) NOT NULL,
  `Email_id` varchar(50) NOT NULL,
  `Password` varchar(15) NOT NULL,
  `NameOfTheOrganisation` varchar(50) NOT NULL,
  PRIMARY KEY (`Detective_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `detective_login_signup`
--

INSERT INTO `detective_login_signup` (`Detective_id`, `Detective_Proof`, `Phone_Number`, `Email_id`, `Password`, `NameOfTheOrganisation`) VALUES
(3, 'uploadproof/DataConnection.docx', '9725056044', 'jigar@gmail.com', '123', 'freee');

-- --------------------------------------------------------

--
-- Table structure for table `laws_table`
--

CREATE TABLE IF NOT EXISTS `laws_table` (
  `Lawid` int(10) NOT NULL AUTO_INCREMENT,
  `LawType` varchar(20) NOT NULL,
  `Source` varchar(250) NOT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`Lawid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `laws_table`
--

INSERT INTO `laws_table` (`Lawid`, `LawType`, `Source`, `image`) VALUES
(1, 'criminal', 'upload/Receipt Summary Janvi.pdf', ''),
(2, 'women safety', 'upload/Receipt Summary Janvi1.pdf', ''),
(3, 'women safety', 'upload/State Bank of India.pdf', ''),
(4, 'women safety', 'upload/bca76_project_guideline-2012.pdf', 'uploadimg/670IMG_5370.JPG');

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
(2147483647, 'arms', 'hfrheih', '1', 'approved', 'khghj', 865, '2017-09-07', 'hkgshdlsh', '0'),
(747326527, 'arms', 'khfsnkh', '1', 'khgkrhsk', 'kdjg,snk', 856856, '2017-09-06', 'jgkdi', '-1');

-- --------------------------------------------------------

--
-- Table structure for table `police_login_signup`
--

CREATE TABLE IF NOT EXISTS `police_login_signup` (
  `Police_Proof` varchar(20) NOT NULL,
  `Phone_Number` varchar(10) NOT NULL,
  `AadharNumber` varchar(15) NOT NULL,
  `Phone_Number_Alt` varchar(10) NOT NULL,
  `PoliceId` int(15) NOT NULL AUTO_INCREMENT,
  `Email` varchar(50) NOT NULL,
  `Password` varchar(15) NOT NULL,
  PRIMARY KEY (`PoliceId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `police_login_signup`
--

INSERT INTO `police_login_signup` (`Police_Proof`, `Phone_Number`, `AadharNumber`, `Phone_Number_Alt`, `PoliceId`, `Email`, `Password`) VALUES
('uploadproof/agile.pp', '9725056044', '98653214A554A', '8866473632', 1, 'divyangsodha.2330@gmail.com', '123'),
('uploadproof/agile.pp', '8899665896', '87542Adf22445', '9725056044', 2, 'kirti@gmail.com', ' 123');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
