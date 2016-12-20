-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 20, 2016 at 08:14 AM
-- Server version: 5.5.52-MariaDB-1ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `gwc_pline`
--

-- --------------------------------------------------------

--
-- Table structure for table `formulas`
--

DROP TABLE IF EXISTS `formulas`;
CREATE TABLE IF NOT EXISTS `formulas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `formula` varchar(1000) CHARACTER SET gbk NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=33 ;

--
-- Dumping data for table `formulas`
--

INSERT INTO `formulas` (`id`, `formula`) VALUES
(1, '=IF(ISBLANK(A1), "", IF(A1="2",-30,0))'),
(2, '=IF(OR(A2="",A3="",AND(A4="",A5="")),"", IF(OR(A4="",AND(A4>A3,A4<A2)),0,-0.2)+IF(OR(A5="",AND(A5>A3,A5<A2)),0,-0.2))'),
(3, '=IF(A6="","",IF(A6="2",-30,0))'),
(4, '=IF(OR(A8="",A9="",AND(A7="",A10="")),"", IF(OR(A7="",AND(A7>A8,A7<A9)),0,-0.2)+IF(OR(A10="",AND(A10>A8,A10<A9)),0,-0.2))'),
(5, '=IF(OR(A12="",A13="",AND(A11="",A14="")),"", IF(OR(A11="",AND(A11>A12,A11<A13)),0,-0.2)+IF(OR(A14="",AND(A14>A12,A14<A13)),0,-0.2))'),
(6, '=IF(A15="","", IF(A15<1, 0, IF(AND(A15>=1,A15<1.5), -1, IF(A15<=2.5, -3, -15))))'),
(7, '=IF(OR(A17="",A18="",AND(A16="",A19="")),"", IF(OR(A16="",AND(A16>A17,A16<A18)),0,-0.2)+IF(OR(A19="",AND(A19>A17,A19<A18)),0,-0.2))'),
(8, '=IF(A20="","",IF(A20="2",-30,0))'),
(9, '=IF(OR(A22="",A23="",AND(A21="",A24="")),"", IF(OR(A21="",AND(A21>A22,A21<A23)),0,-0.2)+IF(OR(A24="",AND(A24>A22,A24<A23)),0,-0.2))'),
(10, '=IF(OR(A26="",A27="",AND(A25="",A28="")),"", IF(OR(A25="",AND(A25>A26,A25<A27)),0,-0.2)+IF(OR(A28="",AND(A28>A26,A28<A27)),0,-0.2))'),
(11, '=IF(A29="","", IF(A29<1, 0, IF(AND(A29>=1,A29<1.5), -1, IF(A29<=2.5, -3, -15))))'),
(12, '=IF(OR(A31="",A32="",A30=""),"",IF(AND(A30>A31,A30<A32),0,-1))'),
(13, '=IF(A33="","",IF(A33="2",-30,0))'),
(14, '=IF(OR(A35="",A36="",A34=""),"",IF(AND(A34>A35,A34<A36),0,-1))'),
(15, '=IF(OR(A38="",A39="",AND(A37="",A40="")),"", IF(OR(A37="",AND(A37>A38,A37<A39)),0,-0.2)+IF(OR(A40="",AND(A40>A38,A40<A39)),0,-0.2))'),
(16, '=IF(OR(A42="",A43="",AND(A41="",A40="")),"", IF(OR(A37="",AND(A41>A42,A41<A43)),0,-0.3)+IF(OR(A44="",AND(A44>A42,A44<A43)),0,-0.3))'),
(17, '=IF(OR(A46="",A47="",AND(A45="",A48="")),"", IF(OR(A45="",AND(A45>A46,A45<A47)),0,-0.2)+IF(OR(A48="",AND(A48>A46,A48<A47)),0,-0.2))'),
(18, '=IF(OR(A50="",A51="",AND(A49="",A52="")),"", IF(OR(A49="",AND(A49>A50,A49<A51)),0,-0.5)+IF(OR(A52="",AND(A52>A50,A52<A51)),0,-0.5))'),
(19, '=IF(OR(A54="",A55="",AND(A53="",A56="")),"", IF(OR(A53="",AND(A53>A54,A53<A55)),0,-0.3)+IF(OR(A56="",AND(A56>A54,A56<A55)),0,-0.3))'),
(20, '=IF(A57="","",IF(A57="2",-30,0))'),
(21, '=IF(A58="","", IF(A58<1, 0, IF(AND(A58>=1,A58<1.5), -1, IF(A58<=2, -3, -15))))'),
(22, '=IF(A59="","",IF(A59="2",-30,0))'),
(23, '=IF(A60="","", IF(A60<1, 0, IF(AND(A60>=1,A60<1.5), -1, IF(A60<=2, -3, -15))))'),
(24, '=IF(A61="","",IF(A61="2",-30,0))'),
(25, '=IF(A62="","",IF(A62="2",-30,0))'),
(26, '=IF(A63="","", IF(A63<1, 0, IF(AND(A63>=1,A63<1.5), -1, IF(A63<=2, -3, -15))))'),
(27, '=IF(OR(A65="",A66="",AND(A64="",A67="",A68="",A69="")),"", IF(OR(A64="",AND(A64>A65,A64<A66)),0,-0.5)+IF(OR(A67="",AND(A67>A65,A67<A66)),0,-0.5)+IF(OR(A68="",AND(A68>A65,A68<A66)),0,-0.5)+IF(OR(A69="",AND(A69>A65,A69<A66)),0,-0.5))'),
(28, '=if(A70="","",if(A70="2",-30,0))'),
(29, '=IF(OR(A72="",A73="",AND(A71="",A74="",A75="",A76="")),"", IF(OR(A71="",AND(A71>A72,A71<A73)),0,-0.5)+IF(OR(A74="",AND(A74>A72,A74<A73)),0,-0.5)+IF(OR(A75="",AND(A75>A72,A75<A73)),0,-0.5)+IF(OR(A76="",AND(A76>A72,A76<A73)),0,-0.5))'),
(30, '=IF(OR(A78="",A77=""),"",IF(A77<A78,0,-1))'),
(31, '=IF(OR(A79="",A80=""),"",IF(A79<A80,0,-1))'),
(32, '=IF(OR(A81="",A82=""),"",IF(A81<A82,-1,0))');

-- --------------------------------------------------------

--
-- Table structure for table `inspection`
--

DROP TABLE IF EXISTS `inspection`;
CREATE TABLE IF NOT EXISTS `inspection` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product` varchar(80) NOT NULL,
  `penalties` int(11) NOT NULL COMMENT 'ptr to the id of penalties',
  `specs` int(11) NOT NULL COMMENT 'ptr to specs table',
  `number` varchar(80) NOT NULL,
  `inspector` varchar(16) NOT NULL,
  `date` datetime NOT NULL,
  `score` varchar(6) NOT NULL,
  `result` tinyint(4) NOT NULL,
  `pendingReason` varchar(200) NOT NULL,
  `disposal` tinyint(4) NOT NULL,
  `matNotNR` varchar(12) NOT NULL,
  `inspectorDis` varchar(12) NOT NULL,
  `batchNr` varchar(12) NOT NULL,
  `prodStat` tinyint(4) NOT NULL COMMENT 'production status',
  `rawMatOK` tinyint(4) NOT NULL COMMENT 'is raw material OK?',
  `1_matinMoistA` varchar(6) NOT NULL COMMENT '1st material moisture input',
  `1_matinMoistB` varchar(6) NOT NULL COMMENT '1st material moisture input',
  `1_moistOK` tinyint(4) NOT NULL COMMENT '1st moisture identification OK?',
  `1_matoutMoistA` varchar(6) NOT NULL COMMENT '1st output material moisture',
  `1_matoutMoistB` varchar(6) NOT NULL COMMENT '1st output material moisture',
  `1_matoutTempA` varchar(6) NOT NULL COMMENT '1st material output temperature',
  `1_matoutTempB` varchar(6) NOT NULL COMMENT '1st material output temperature',
  `1_accuracy` varchar(6) NOT NULL COMMENT '1st process accuracy',
  `2_matinMoistA` varchar(6) NOT NULL COMMENT '2nd material input moisure',
  `2_matinMoistB` varchar(6) NOT NULL COMMENT '2nd material input moisure',
  `2_moistOK` tinyint(4) NOT NULL COMMENT '2nd moisture identification OK?',
  `2_matoutMoistA` varchar(6) NOT NULL COMMENT '2nd output material moisture',
  `2_matoutMoistB` varchar(6) NOT NULL COMMENT '2nd output material moisture',
  `2_matoutTempA` varchar(6) NOT NULL COMMENT '2nd output material temperature',
  `2_matoutTempB` varchar(6) NOT NULL COMMENT '2nd output material temperature',
  `2_accuracy` varchar(6) NOT NULL COMMENT '2nd process accuracy',
  `storageTime` varchar(6) NOT NULL COMMENT 'how long kept in storage',
  `storageMatOK` tinyint(4) NOT NULL COMMENT 'storage material ok?',
  `cutWidth` varchar(6) NOT NULL COMMENT 'cut in strips - width',
  `cyl_matinMoistA` varchar(6) NOT NULL COMMENT 'cylinder material in moisture',
  `cyl_matinMoistB` varchar(6) NOT NULL COMMENT 'cylinder material in moisture',
  `cyl_matoutMoistA` varchar(6) NOT NULL COMMENT 'cylinder material out moisture',
  `cyl_matoutMoistB` varchar(6) NOT NULL COMMENT 'cylinder material out moisture',
  `cyl_matoutTempA` varchar(6) NOT NULL COMMENT 'cylinder material out temperature',
  `cyl_matoutTempB` varchar(6) NOT NULL COMMENT 'cylinder material out temperature',
  `dry_matoutMoistA` varchar(6) NOT NULL COMMENT 'drying material out moisture',
  `dry_matoutMoistB` varchar(6) NOT NULL COMMENT 'drying material out moisture',
  `dry_matoutTempA` varchar(6) NOT NULL COMMENT 'drying material out temperature',
  `dry_matoutTempB` varchar(6) NOT NULL COMMENT 'drying material out temperature',
  `blendcutMatOK` tinyint(4) NOT NULL COMMENT 'blend cut stem OK?',
  `blendcutAccuracy` varchar(6) NOT NULL COMMENT 'blending cut accuracy',
  `blendexpMatOK` tinyint(4) NOT NULL COMMENT 'blend expanded material OK?',
  `blendexpAccuracy` varchar(6) NOT NULL COMMENT 'blend expanded accuracy',
  `blendreID` varchar(6) NOT NULL COMMENT 'blend recycled material id',
  `blendreOK` tinyint(4) NOT NULL COMMENT 'blend recycled OK',
  `flavorOK` tinyint(4) NOT NULL COMMENT 'flavor OK?',
  `flavorAccuracy` varchar(6) NOT NULL COMMENT 'flavor accuracy',
  `flavor_matoutMoistA` varchar(6) NOT NULL COMMENT 'flavor material output moisture',
  `flavor_matoutMoistB` varchar(6) NOT NULL COMMENT 'flavor material output moisture',
  `flavor_matoutMoistC` varchar(6) NOT NULL COMMENT 'flavor material output moisture',
  `flavor_matoutMoistD` varchar(6) NOT NULL COMMENT 'flavor material output moisture',
  `blendstorMix` tinyint(4) NOT NULL COMMENT 'blended tobacco mixed?',
  `blendstorMoistA` varchar(6) NOT NULL COMMENT 'blended stored tobacco moisture',
  `blendstorMoistB` varchar(6) NOT NULL COMMENT 'blended stored tobacco moisture',
  `blendstorMoistC` varchar(6) NOT NULL COMMENT 'blended stored tobacco moisture',
  `blendstorMoistD` varchar(6) NOT NULL COMMENT 'blended stored tobacco moisture',
  `amountLongStems` varchar(6) NOT NULL COMMENT 'amount of long stems',
  `amountShortStems` varchar(6) NOT NULL COMMENT 'amount of short stems',
  `fillingPower` varchar(6) NOT NULL COMMENT 'Filling power',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=gbk AUTO_INCREMENT=44 ;

--
-- Dumping data for table `inspection`
--

INSERT INTO `inspection` (`id`, `product`, `penalties`, `specs`, `number`, `inspector`, `date`, `score`, `result`, `pendingReason`, `disposal`, `matNotNR`, `inspectorDis`, `batchNr`, `prodStat`, `rawMatOK`, `1_matinMoistA`, `1_matinMoistB`, `1_moistOK`, `1_matoutMoistA`, `1_matoutMoistB`, `1_matoutTempA`, `1_matoutTempB`, `1_accuracy`, `2_matinMoistA`, `2_matinMoistB`, `2_moistOK`, `2_matoutMoistA`, `2_matoutMoistB`, `2_matoutTempA`, `2_matoutTempB`, `2_accuracy`, `storageTime`, `storageMatOK`, `cutWidth`, `cyl_matinMoistA`, `cyl_matinMoistB`, `cyl_matoutMoistA`, `cyl_matoutMoistB`, `cyl_matoutTempA`, `cyl_matoutTempB`, `dry_matoutMoistA`, `dry_matoutMoistB`, `dry_matoutTempA`, `dry_matoutTempB`, `blendcutMatOK`, `blendcutAccuracy`, `blendexpMatOK`, `blendexpAccuracy`, `blendreID`, `blendreOK`, `flavorOK`, `flavorAccuracy`, `flavor_matoutMoistA`, `flavor_matoutMoistB`, `flavor_matoutMoistC`, `flavor_matoutMoistD`, `blendstorMix`, `blendstorMoistA`, `blendstorMoistB`, `blendstorMoistC`, `blendstorMoistD`, `amountLongStems`, `amountShortStems`, `fillingPower`) VALUES
(1, '狮牌（鸿运当头）', 2, 1, '', '---', '2016-09-21 09:25:23', '96.3', 3, ' ', 0, '', '', '16092001', 1, 0, '', '', 0, '17.75', '15.72', '', '', '', '', '', 1, '', '', '', '', '0.02', '2', 1, '', '', '', '', '', '', '', '12.72', '13.1', '', '', 1, '0.36', 0, '', '', 1, 1, '0.23', '12.99', '12.88', '12.84', '12.53', 1, '', '', '', '', '89', '1', '4.16'),
(2, '长城（醇雅奶香）', 3, 1, '', '---', '2016-09-20 00:00:00', '97', 1, '', 0, '', '', '16091601', 1, 1, '', '', 0, '30.56', '31.8', '54.35', '53.6', '0.02', '', '', 0, '27.65', '27.8', '45.8', '45.58', '', '1', 1, '', '', '', '27.9', '27.8', '47.6', '48', '14.7', '14.6', '47.5', '47.1', 1, '0.31', 1, '0.31', '', 0, 1, '0.7', '13.62', '13.46', '13.53', '13.5', 1, '', '', '', '', '63.6', '6.5', '5.19'),
(3, '长城（醇雅奶香）', 4, 0, '', '---', '2016-09-29 15:52:51', '95.6', 2, '', 0, '', '', '16091801', 1, 1, '', '', 1, '29.35', '27.65', '39.44', '41.36', '0.04', '', '', 0, '27.39', '29.08', '43.8', '49.59', '', '2', 1, '', '', '', '27.9', '29.3', '48.72', '49.55', '14.53', '15.09', '46.15', '48.2', 1, '0.31', 1, '0.31', '', 0, 1, '0.22', '13.97', '14.28', '13.88', '13.73', 1, '', '', '', '', '66.8', '6.5', '4.93'),
(4, '狮牌（草莓）', 5, 0, '', '---', '2016-09-29 16:37:40', '96.9', 0, '', 0, '', '', '16090701', 1, 1, '', '', 1, '30.18', '30.21', '39.48', '41', '0.02', '', '', 0, '26.35', '26.12', '49.27', '50.32', '', '1', 0, '', '', '', '34.27', '33.36', '48.65', '47.6', '14.35', '14.7', '49.55', '50', 0, '', 0, '', '', 0, 1, '0.73', '13.24', '13.41', '13.47', '13.54', 1, '', '', '', '', '64.3', '6.6', '5.55'),
(5, '狮牌（草莓）', 6, 0, '', '', '2016-09-30 10:25:54', '99', 1, '', 0, '', '', '16091801', 1, 1, '', '', 1, '29.67', '30.35', '39.01', '40.6', '0.06', '', '', 0, '27.64', '26.53', '50.23', '48.66', '', '1', 1, '', '', '', '27.8', '27.65', '47.1', '48.2', '14.2', '13.61', '47.5', '48.2', 0, '', 0, '', '', 0, 1, '0.47', '13.31', '13.24', '13.08', '13.65', 1, '', '', '', '', '', '', ''),
(6, '狮牌（草莓）', 7, 0, '', '---', '2016-09-30 10:52:59', '96.5', 2, '', 0, '', '', '16092001', 1, 1, '', '', 1, '29.81', '30.63', '40.65', '39.97', '0.76', '', '', 0, '25.47', '24.64', '46.23', '44.18', '', '1', 1, '', '', '', '28.4', '28.4', '49.6', '49.8', '13.9', '14', '49.6', '49.3', 0, '', 0, '', '', 0, 1, '0.63', '13.33', '13.09', '13.06', '13.1', 0, '', '', '', '', '64', '6', '5.87'),
(7, '长城（132醇味）川版', 8, 0, '', '', '2016-09-30 10:57:49', '96', 1, '', 0, '', '', '16091101', 1, 1, '', '', 0, '15.23', '16.2', '', '', '', '', '', 1, '', '', '', '', '0.01', '1.5', 1, '', '', '', '', '', '', '', '12.8', '12.65', '', '', 0, '', 0, '', '', 0, 1, '0.8', '13.3', '13.2', '12.23', '12.48', 1, '', '', '', '', '80.4', '2.1', '3.66'),
(8, '狮牌（原香）', 9, 0, '', '', '2016-09-30 11:03:38', '98', 1, '', 0, '', '', '16090201', 1, 1, '', '', 0, '16.12', '15.86', '', '', '', '', '', 1, '', '', '', '', '0.06', '1.5', 1, '', '', '', '', '', '', '', '12.57', '12.44', '', '', 1, '0.26', 0, '', '', 0, 1, '0.74', '12.62', '12.57', '12.82', '12.57', 1, '', '', '', '', '80.6', '2.2', '4.05'),
(9, '工字（红）', 10, 0, 'null', '---', '2016-09-30 11:18:58', '100', 1, '', 0, '', '---', '1609501', 1, 1, '', '', 0, '', '', '', '', '', '', '', 0, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '', '', '', '', 0, '', 0, '', '', 0, 1, '0.14', '13.16', '13.04', '13.01', '13.07', 1, '', '', '', '', '', '', ''),
(10, '工字（1号）', 11, 0, '', '', '2016-09-30 11:58:35', '100', 1, '', 0, '', '', '16090101', 1, 1, '', '', 0, '', '', '', '', '', '', '', 0, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '', '', '', '', 0, '', 0, '', '', 0, 1, '0.2', '12.38', '12.54', '12.55', '12.37', 1, '', '', '', '', '', '', ''),
(11, '长城（醇雅薄荷）', 12, 0, 'null', '---', '2016-09-30 12:00:39', '98', 1, '', 0, '', '---', '16090401', 1, 1, '', '', 1, '30.37', '30.9', '', '', '0.5', '', '', 0, '', '', '', '', '', '2.5', 1, '', '', '', '', '', '', '', '13.3', '13.6', '', '', 1, '0.28', 0, '', '', 0, 1, '0.26', '13.39', '13.05', '13.29', '12.96', 1, '', '', '', '', '69.2', '4.6', '4.26'),
(12, '长城（传奇)', 13, 0, 'null', '---', '2016-09-30 12:06:04', '96.5', 0, '', 0, '', '---', '16090101', 1, 1, '', '', 0, '16.68', '15.23', '', '', '', '', '', 1, '', '', '', '', '0.03', '1', 1, '', '', '', '', '', '', '', '12.92', '13.26', '', '', 1, '0.14', 0, '', '', 0, 1, '0.27', '12.76', '12.69', '12.91', '12.7', 1, '', '', '', '', '82.1', '2', '4.01'),
(13, '', 14, 0, '', '', '2016-11-11 13:07:12', '', 0, '', 0, '', '', '', 0, 0, '', '', 0, '', '', '', '', '', '', '', 0, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '', '', '', '', 0, '', 0, '', '', 0, 0, '', '', '', '', '', 0, '', '', '', '', '', '', ''),
(14, '长城（传奇)', 15, 0, 'null', '---', '2016-11-24 00:00:00', '100', 0, '', 0, '', '', '', 1, 0, '', '', 0, '', '', '', '', '', '', '', 0, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '', '', '', '', 0, '', 0, '', '', 0, 0, '', '', '', '', '', 0, '', '', '', '', '', '', ''),
(15, '', 16, 0, '', '', '2016-11-24 10:51:05', '', 0, '', 0, '', '', '', 0, 0, '', '', 0, '', '', '', '', '', '', '', 0, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '', '', '', '', 0, '', 0, '', '', 0, 0, '', '', '', '', '', 0, '', '', '', '', '', '', ''),
(16, '长城（传奇)', 17, 0, 'null', '谢晓琼', '2016-11-24 10:51:34', '100', 0, '', 0, '', '', '', 1, 1, '', '', 0, '', '', '', '', '', '', '', 0, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '', '', '', '', 0, '', 0, '', '', 0, 0, '', '', '', '', '', 0, '', '', '', '', '', '', ''),
(17, '长城（132醇味）川版', 18, 0, '', '', '2016-11-24 10:53:07', '100', 0, '', 0, '', '', '', 1, 1, '', '', 0, '', '', '', '', '', '', '', 0, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '', '', '', '', 0, '', 0, '', '', 0, 0, '', '', '', '', '', 0, '', '', '', '', '', '', ''),
(18, '', 19, 0, '', '', '2016-11-24 10:53:34', '100', 0, '', 0, '', '', '', 0, 0, '', '', 0, '', '', '', '', '', '', '', 0, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '', '', '', '', 0, '', 0, '', '', 0, 0, '', '', '', '', '', 0, '', '', '', '', '', '', ''),
(19, '长城（传奇)', 20, 0, '', '谢晓琼', '2016-11-24 10:53:36', '98', 1, '', 0, '', '', '16112401', 1, 1, '', '', 0, '15.53', '16.45', '', '', '', '', '', 1, '', '', '', '', '0.01', '1', 1, '', '', '', '', '', '', '', '12.65', '  12.8', '', '', 1, '0.14', 0, '', '', 0, 1, '0.27', '12.7', '12.74', '12.73', '12.76', 1, '', '', '', '', '81.9', '1.7', '4.93'),
(20, '长城（醇雅奶香）', 21, 0, '', '谢晓琼', '2016-11-24 11:01:54', '98.6', 1, '', 0, '', '---', '16112401', 1, 1, '', '', 1, '32.6', '31.78', '', '', '0.06', '', '', 0, '', '', '', '', '      ', '1', 1, '', '', '', '', '', '', '', '13.68', '13.80', '', '', 1, '0.18', 1, '0.13', '', 0, 0, '0.29', '13.20', '13.53', '13.48', '13.22', 1, '', '', '', '', '', '', ''),
(21, '长城（传奇)', 22, 0, '', '刘卫红', '2016-11-25 00:00:00', '97.8', 1, '', 0, '', '', '16112501', 1, 1, '', '', 0, '16.71', '17.6', '', '', '', '', '', 1, '', '', '', '', '0.01', '1', 0, '1', '', '', '', '', '', '', '12.82', '12.75', '', '', 1, '0.17', 0, '', '', 0, 1, '0.35', '12.73', '12.80', '12.73', '12.73', 1, '', '', '', '', '81.4', '1.8', '4.73'),
(22, '长城（传奇)', 23, 0, '', '谢晓琼', '2016-11-25 08:27:06', '98', 1, '', 0, '', '', '16112502', 1, 1, '', '', 0, '16.27', '16.12', '', '', '', '', '', 1, '', '', '', '', '0.09', '1', 1, '', '', '', '', '', '', '', '12.69', '12.61', '', '', 1, '0.15', 0, '', '', 0, 1, '0.32', '12.62', '12.69', '12.75', '12.56', 1, '', '', '', '', '84.5', '1.7', '4.81'),
(23, ' 狮牌（完美时光）', 24, 0, 'null', '何伟', '2016-11-25 08:56:01', '95.6', 0, '', 0, '', '', '16112701', 1, 1, '', '', 0, '15.55', '15.29', '', '', '', '', '', 1, '', '', '', '', '0.15', '1', 1, '', '', '', '', '', '', '', '12.88', '12.78', '', '', 0, '', 0, '0.3', '', 1, 1, '0.19', '12.63', '12.74', '12.76', '12.87', 1, '', '', '', '', '85.8', '1.6', '4.51'),
(24, '长城（传奇)', 25, 0, 'null', '何伟', '2016-11-25 09:00:06', '100', 0, '', 0, '', '', '', 1, 1, '', '', 1, '', '', '', '', '', '', '', 0, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '', '', '', '', 0, '', 0, '', '', 0, 0, '', '', '', '', '', 0, '', '', '', '', '', '', ''),
(25, '长城（传奇)', 26, 0, '', '刘卫红', '2016-11-25 10:38:38', '100', 0, '', 0, '', '', '16112502', 1, 1, '', '', 0, '', '', '', '', '', '', '', 0, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '', '', '', '', 0, '', 0, '', '', 0, 0, '', '', '', '', '', 0, '', '', '', '', '', '', ''),
(26, '长城（传奇)', 27, 0, '', '何伟', '2016-11-28 08:34:53', '97', 1, '', 0, '', '', '16112801', 1, 1, '', '', 0, '16.10', '15.67', '', '', '', '', '', 1, '', '', '', '', '0.1', '1', 1, '', '', '', '', '', '', '', '12.63', '12.72', '', '', 1, '0.32', 0, '', '', 1, 1, '0.53', '12.89', '12.9', '12.85', '12.93', 1, '', '', '', '', '85.3', '1.6', '4.65'),
(27, '长城（传奇)', 28, 0, '', '何伟', '2016-12-19 00:00:00', '98', 1, '', 0, '', '', '16112802', 1, 1, '', '', 0, '15.58', '16.69', '', '', '', '', '', 1, '', '', '', '', '0.01', '1', 1, '', '', '', '', '', '', '', '12.83', '12.69', '', '', 1, '0.15', 0, '', '', 1, 1, '0.51', '12.69', '12.75', '12.86', '12.78', 1, '', '', '', '', '80.5', '2.1', '4.45'),
(28, '长城（醇雅奶香）', 29, 0, 'null', '何伟', '2016-11-28 09:59:28', '99.1', 1, '', 0, '', '', '16112801', 1, 1, '', '', 1, '31.25', '30.18', '', '', '0.08', '', '', 0, '', '', '', '', '', '2.5', 1, '', '', '', '', '', '', '', '14.16', '13.85', '', '', 1, '0.29', 1, '0.29', '', 0, 1, '0.52', '', '', '', '', 1, '', '', '', '', '', '', ''),
(29, '长城（传奇)', 30, 0, 'null', '谢晓琼', '2016-11-29 08:30:15', '98.5', 1, '', 0, '', '', '16112901', 1, 1, '', '', 0, '16.82', '16.21', '', '', '', '', '', 1, '', '', '', '', '0.03', '3', 1, '', '', '', '', '', '', '', '12.78', '13.12', '', '', 1, '0.13', 0, '', '', 0, 1, '0.59', '12.9', '12.84', '12.81', '12.71', 0, '', '', '', '', '84.6', '1.7', '4.67'),
(30, '长城（传奇)', 31, 0, '', '谢晓琼', '2016-11-29 10:50:22', '97.3', 0, '', 0, '', '', '16112902', 1, 1, '', '', 0, '17.05', '16.82', '', '', '', '', '', 1, '', '', '', '', '0.01', '1', 1, '', '', '', '', '', '', '', '12.85', '12.7', '', '', 1, '0.15', 0, '', '', 0, 1, '0.32', '12.84', '12.69', '12.8', '12.91', 0, '', '', '', '', '80.51', '1.94', '4.68'),
(31, '工字（红）', 32, 0, '', '谢晓琼', '2016-11-29 10:50:41', '99.6', 0, '', 0, '', '', '16112901', 1, 1, '', '', 1, '28.93', '31.25', '', '', '', '', '', 0, '', '', '', '', '', '1.5', 1, '', '', '', '', '', '', '', '14.2', '14.1', '', '', 1, '', 1, '', '', 0, 1, '0.03', '13.33', '13.54', '13.72', '13.28', 0, '', '', '', '', '', '', ''),
(32, '长城（传奇)', 33, 0, '', '何伟', '2016-11-30 08:22:05', '97.5', 1, '', 0, '', '', '16113001', 1, 1, '', '', 0, '16.91', '15.70', '', '', '', '', '', 1, '', '', '', '', '0.10', '1', 1, '', '', '', '', '', '', '', '12.89', '12.7', '', '', 1, '0.16', 0, '', '', 0, 1, '0.28', '12.77', '12.86', '12.9', '12.83', 0, '', '', '', '', '84.1', '1.7', '4.9'),
(33, '长城（醇雅奶香）', 34, 0, '', '何伟', '2016-12-02 00:00:00', '98.1', 1, '', 0, '', '', '16113001', 1, 1, '', '', 1, '30.42', '30.69', '', '', '0.06', '', '', 0, '', '', '', '', '', '2.5', 1, '', '', '', '', '', '', '', '14.72', '15.2', '', '', 1, '0.22', 1, '0.22', '', 0, 1, '0', '13.62', '13.46', '13.55', '13.7', 0, '', '', '', '', '65.26', '5.44', '6.17'),
(34, '狮牌（原香）', 35, 0, '', '谢晓琼', '2016-12-02 08:49:15', '97.3', 1, '', 0, '', '', '16120201', 1, 1, '', '', 0, '16.52', '17.63', '', '', '', '', '', 1, '', '', '', '', '0.02', '1', 1, '', '', '', '', '', '', '', '12.86', '12.67', '', '', 1, '0.24', 0, '', '', 1, 1, '0.17', '12.81', '12.95', '13.13', '12.98', 1, '', '', '', '', '83.3', '1.6', '4.68'),
(35, '长城（传奇)', 36, 0, '', '何伟', '2016-12-02 09:32:51', '97.5', 1, 'test', 0, '', '', '16120201', 1, 1, '', '', 0, '16.84', '16.11', '', '', '', '', '', 1, '', '', '', '', '0.03 ', '1', 1, '', '', '', '', '', '', '', '12.89', '13.25', '', '', 1, '0.11', 0, '', '', 0, 1, '0.42', '12.74', '12.85', '12.91', '12.81', 1, '', '', '', '', '81.2', '1.9', '4.52'),
(36, '长城（传奇)', 37, 0, '', '何伟', '2016-12-02 10:15:49', '96.1', 1, 'test', 0, '', '', '16120201', 1, 1, '', '', 1, '32.53', '29.53', '', '', '0.06', '', '', 0, '', '', '', '', '', '2.5', 1, '2', '', '', '', '', '', '', '14.5', '15.6', '', '', 1, '0.24', 1, '0.24', '', 0, 0, '0.61', '12.74', '12.85', '12.91', '12.81', 1, '', '', '', '', '65.4', '5.4', '6.44'),
(37, '狮牌（原香）', 38, 0, '', '何伟', '2016-12-03 07:54:14', '97.5', 1, '', 0, '', '', '16120301', 1, 1, '', '', 0, '15.15', '15.82', '', '', '', '', '', 1, '', '', '', '', '0', '1', 1, '', '', '', '', '', '', '', '12.85', '12.83', '', '', 1, '0.28', 0, '', '', 0, 1, '0.6', '13.71', '13.71', '13.6', '12.89', 1, '', '', '', '', '', '', ''),
(38, '狮牌（原香）', 39, 0, '', '何伟', '2016-12-03 07:54:16', '98.5', 1, '', 0, '', '', '16120302', 1, 1, '', '', 0, '16.83', '16.69', '', '', '', '', '', 1, '', '', '', '', '0.03', '1', 1, '', '', '', '', '', '', '', '12.78', '13.07', '', '', 1, '0.14', 0, '', '', 0, 1, '0.34', '12.93', '12.88', '12.77', '12.84', 1, '', '', '', '', '', '', ''),
(39, '长城（风尚） ', 40, 0, '', '何伟', '2016-12-03 07:54:22', '97.6', 1, '', 0, '', '', '16120301', 1, 1, '', '', 1, '29.35', '30.2', '', '', '0.11', '', '', 0, '', '', '', '', '', '3', 1, '', '', '', '', '', '', '', '14.1', '13.8', '', '', 0, '', 1, '0.20', '', 0, 1, '0.41', '12.9', '12.97', '13.08', '12.93', 1, '', '', '', '', '67.9', '5.1', '5.58'),
(40, '长城（醇雅奶香）', 41, 0, '', '何伟', '2016-12-03 10:55:27', '99.6', 1, '', 0, '', '', '16120301', 1, 1, '', '', 1, '31.25', '30.4', '', '', '0.01', '', '', 0, '', '', '', '', '', '3', 1, '', '', '', '', '', '', '', '', '', '', '', 1, '0.30', 1, '0.42', '', 0, 1, '0', '13.49', '13.7', '13.55', '13.79', 1, '', '', '', '', '', '', ''),
(41, '长城（醇雅奶香）', 42, 0, '', '谢晓琼', '2016-12-05 08:41:06', '98.6', 1, '', 0, '', '', '16120501', 1, 1, '', '', 1, '31.55', '33.61', '', '', '0.12', '', '', 0, '', '', '', '', '', '3', 1, '', '', '', '', '', '', '', '14', '13.62', '', '', 1, '0.29', 1, '0.29', '', 0, 1, '0.39', '13.71', '13.71', '13.6', '13.61', 1, '', '', '', '', '', '', ''),
(42, '/', 43, 0, '', '谢晓琼', '2016-12-05 10:59:17', '100', 1, '', 0, '', '', '16120501', 1, 1, '', '', 1, '20.15', '20.14', '', '', '0.29', '', '', 0, '', '', '', '', '', '4', 1, '', '', '', '', '', '', '', '12.49', '12.62', '', '', 1, '0.6', 0, '', '', 0, 1, '0.53', '12.6', '12.56', '12.63', '12.35', 1, '', '', '', '', '75.4', '3.7', '5.38'),
(43, '狮牌（原香）', 44, 0, '', '谢晓琼', '2016-12-07 08:44:36', '97.6', 0, '', 0, '', '', '16120701', 1, 1, '', '', 0, '17.33', '17.47', '', '', '', '', '', 1, '', '', '', '', '0.02', '1', 1, '', '', '', '', '', '', '', '12.57', '12.28', '', '', 1, '', 0, '', '', 0, 1, '', '', '', '', '', 1, '', '', '', '', '81.3', '1.7', '4.42');

-- --------------------------------------------------------

--
-- Table structure for table `names`
--

DROP TABLE IF EXISTS `names`;
CREATE TABLE IF NOT EXISTS `names` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `inspector` text CHARACTER SET gbk NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COMMENT='names of persons, each line one name' AUTO_INCREMENT=2 ;

--
-- Dumping data for table `names`
--

INSERT INTO `names` (`id`, `inspector`) VALUES
(1, '何伟\n刘卫红\n谢晓琼');

-- --------------------------------------------------------

--
-- Table structure for table `penalties`
--

DROP TABLE IF EXISTS `penalties`;
CREATE TABLE IF NOT EXISTS `penalties` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `master` int(11) NOT NULL COMMENT 'ptr to the id of inspection',
  `FeedMatID` varchar(6) NOT NULL COMMENT 'material id',
  `1_matinMoist` varchar(6) NOT NULL COMMENT '1st material moisture input',
  `1_matMoistID` varchar(6) NOT NULL COMMENT '1st moisture identification',
  `1_matoutMoist` varchar(6) NOT NULL COMMENT '1st output material moisture',
  `1_matoutTemp` varchar(6) NOT NULL COMMENT '1st material output temperature',
  `1_accuracy` varchar(6) NOT NULL COMMENT '1st process accuracy',
  `2_matinMoist` varchar(6) NOT NULL COMMENT '2nd material input moisure',
  `2_matMoistID` varchar(6) NOT NULL COMMENT '2nd moisture identification',
  `2_matoutMoist` varchar(6) NOT NULL COMMENT '2nd output material moisture',
  `2_matoutTemp` varchar(6) NOT NULL COMMENT '2nd output material temperature',
  `2_accuracy` varchar(6) NOT NULL COMMENT '2nd process accuracy',
  `storTime` varchar(6) NOT NULL COMMENT 'how long kept in storage',
  `stormatOK` varchar(6) NOT NULL COMMENT 'storage should not be mixed',
  `cutWidth` varchar(6) NOT NULL COMMENT 'cut in strips - width',
  `cyl_matinMoist` varchar(6) NOT NULL COMMENT 'cylinder material in moisture',
  `cyl_matoutMoist` varchar(6) NOT NULL COMMENT 'cylinder material out moisture',
  `cyl_matoutTemp` varchar(6) NOT NULL COMMENT 'cylinder material out temperature',
  `dry_matoutMoist` varchar(6) NOT NULL COMMENT 'drying material out moisture',
  `dry_matoutTemp` varchar(6) NOT NULL COMMENT 'drying material out temperature',
  `blendcutStemID` varchar(6) NOT NULL COMMENT 'blend cut stem identification',
  `blendcutAccuracy` varchar(6) NOT NULL COMMENT 'blending cut accuracy',
  `blendexpMatOK` varchar(6) NOT NULL COMMENT 'blend expanded material id',
  `blendexpAccuracy` varchar(6) NOT NULL COMMENT 'blend expanded accuracy',
  `blendreMatOK` varchar(6) NOT NULL COMMENT 'blend recycled material id',
  `blendflavorMatOK` varchar(6) NOT NULL COMMENT 'blended flavor OK?',
  `blendflavorAccuracy` varchar(6) NOT NULL COMMENT 'flavor accuracy',
  `blendflavorMoist` varchar(6) NOT NULL COMMENT 'flavor material output moisture',
  `blendstorMatOK` varchar(6) NOT NULL COMMENT 'blended tobacco mixed?',
  `blendstorMoist` varchar(6) NOT NULL COMMENT 'blended stored tobacco moisture',
  `amountLongStems` varchar(6) NOT NULL COMMENT 'amount of long stems',
  `amountShortStems` varchar(6) NOT NULL COMMENT 'amount of short stems',
  `fillingPower` varchar(6) NOT NULL COMMENT 'Filling power',
  `score` varchar(6) NOT NULL COMMENT 'calculated score',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=gbk AUTO_INCREMENT=45 ;

--
-- Dumping data for table `penalties`
--

INSERT INTO `penalties` (`id`, `master`, `FeedMatID`, `1_matinMoist`, `1_matMoistID`, `1_matoutMoist`, `1_matoutTemp`, `1_accuracy`, `2_matinMoist`, `2_matMoistID`, `2_matoutMoist`, `2_matoutTemp`, `2_accuracy`, `storTime`, `stormatOK`, `cutWidth`, `cyl_matinMoist`, `cyl_matoutMoist`, `cyl_matoutTemp`, `dry_matoutMoist`, `dry_matoutTemp`, `blendcutStemID`, `blendcutAccuracy`, `blendexpMatOK`, `blendexpAccuracy`, `blendreMatOK`, `blendflavorMatOK`, `blendflavorAccuracy`, `blendflavorMoist`, `blendstorMatOK`, `blendstorMoist`, `amountLongStems`, `amountShortStems`, `fillingPower`, `score`) VALUES
(2, 1, '0', '', '', '-0.2', '', '', '', '0', '', '', '0', '-1', '0', '', '', '', '', '-0.5', '', '0', '0', '', '', '0', '0', '0', '0', '0', '', '-1', '0', '-1', '96.3'),
(3, 2, '0', '', '', '-0.2', '0', '0', '', '', '-0.4', '0', '', '0', '0', '', '', '0', '-0.4', '-1', '0', '0', '0', '0', '0', '', '0', '0', '0', '0', '', '0', '-1', '0', '97'),
(4, 3, '0', '', '0', '-0.2', '-0.4', '0', '', '', '-0.4', '-0.2', '', '0', '0', '', '', '-0.3', '-0.4', '-1', '0', '0', '0', '0', '0', '', '0', '0', '-0.5', '0', '', '0', '-1', '0', '95.6'),
(5, 4, '0', '', '0', '0', '-0.4', '0', '', '', '0', '0', '', '0', '', '', '', '-0.3', '-0.4', '-1', '0', '', '', '', '', '', '0', '0', '0', '0', '', '0', '-1', '0', '96.9'),
(6, 5, '0', '', '0', '0', '-0.4', '0', '', '', '-0.2', '0', '', '0', '0', '', '', '0', '-0.4', '0', '0', '', '', '', '', '', '0', '0', '0', '0', '', '', '', '', '99'),
(7, 6, '0', '', '0', '0', '-0.4', '0', '', '', '-0.2', '-0.2', '', '-1', '0', '', '', '-0.3', '-0.4', '0', '0', '', '', '', '', '', '0', '0', '0', '', '', '0', '-1', '0', '96.5'),
(8, 7, '0', '', '', '0', '', '', '', '0', '', '', '0', '0', '0', '', '', '', '', '-1', '', '', '', '', '', '', '0', '0', '-1', '0', '', '-1', '0', '-1', '96'),
(9, 8, '0', '', '', '0', '', '', '', '0', '', '', '0', '0', '0', '', '', '', '', '0', '', '0', '0', '', '', '', '0', '0', '0', '0', '', '-1', '0', '-1', '98'),
(10, 9, '0', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '0', '0', '0', '0', '', '', '', '', '100'),
(11, 10, '0', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '0', '0', '', '0', '', '', '', '', '100'),
(12, 11, '0', '', '0', '0', '', '0', '', '', '', '', '', '0', '0', '', '', '', '', '-0.5', '', '0', '0', '', '', '', '0', '0', '-0.5', '0', '', '0', '0', '-1', '98'),
(13, 12, '0', '', '', '0', '', '', '', '0', '', '', '0', '-1', '0', '', '', '', '', '0', '', '0', '0', '', '', '', '0', '0', '-0.5', '0', '', '-1', '0', '-1', '96.5'),
(14, 13, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(15, 14, '0', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '100'),
(16, 15, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(17, 16, '0', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '100'),
(18, 17, '0', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '100'),
(19, 18, '0', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '100'),
(20, 19, '0', '', '', '0', '', '', '', '0', '', '', '0', '-1', '0', '', '', '', '', '0', '', '0', '0', '', '', '', '0', '0', '0', '0', '', '-1', '0', '0', '98'),
(21, 20, '0', '', '0', '-0.4', '', '0', '', '', '', '', '0', '-1', '0', '', '', '', '', '0', '', '0', '0', '0', '0', '', '', '0', '0', '0', '', '', '', '', '98.6'),
(22, 21, '0', '', '', '-0.2', '', '', '', '0', '', '', '0', '-1', '', '0', '', '', '', '0', '', '0', '0', '', '', '', '0', '0', '0', '0', '', '-1', '0', '0', '97.8'),
(23, 22, '0', '', '', '0', '', '', '', '0', '', '', '0', '-1', '0', '', '', '', '', '0', '', '0', '0', '', '', '', '0', '0', '0', '0', '', '-1', '0', '0', '98'),
(24, 23, '0', '', '', '-0.4', '', '', '', '0', '', '', '0', '-1', '0', '', '', '', '', '-1', '', '', '', '', '0', '0', '0', '0', '0', '0', '', '-1', '0', '-1', '95.6'),
(25, 24, '0', '', '0', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '100'),
(26, 25, '0', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '100'),
(27, 26, '0', '', '', '0', '', '', '', '0', '', '', '0', '-1', '0', '', '', '', '', '0', '', '0', '0', '', '', '0', '0', '0', '-1', '0', '', '-1', '0', '0', '97'),
(28, 27, '0', '', '', '0', '', '', '', '0', '', '', '0', '-1', '0', '', '', '', '', '0', '', '0', '0', '', '', '0', '0', '0', '0', '0', '', '-1', '0', '0', '98'),
(29, 28, '0', '', '0', '-0.4', '', '0', '', '', '', '', '', '0', '0', '', '', '', '', '-0.5', '', '0', '0', '0', '0', '', '0', '0', '', '0', '', '', '', '', '99.1'),
(30, 29, '0', '', '', '0', '', '', '', '0', '', '', '0', '0', '0', '', '', '', '', '0', '', '0', '0', '', '', '', '0', '0', '-0.5', '', '', '-1', '0', '0', '98.5'),
(31, 30, '0', '', '', '-0.2', '', '', '', '0', '', '', '0', '-1', '0', '', '', '', '', '0', '', '0', '0', '', '', '', '0', '0', '-0.5', '', '', '-1', '0', '0', '97.3'),
(32, 31, '0', '', '0', '-0.4', '', '', '', '', '', '', '', '0', '0', '', '', '', '', '0', '', '0', '', '0', '', '', '0', '0', '0', '', '', '', '', '', '99.6'),
(33, 32, '0', '', '', '0', '', '', '', '0', '', '', '0', '-1', '0', '', '', '', '', '0', '', '0', '0', '', '', '', '0', '0', '-0.5', '', '', '-1', '0', '0', '97.5'),
(34, 33, '0', '', '0', '-0.4', '', '0', '', '', '', '', '', '0', '0', '', '', '', '', '-0.5', '', '0', '0', '0', '0', '', '0', '', '0', '', '', '-1', '0', '0', '98.1'),
(35, 34, '0', '', '', '-0.2', '', '', '', '0', '', '', '0', '-1', '0', '', '', '', '', '0', '', '0', '0', '', '', '0', '0', '0', '-0.5', '0', '', '-1', '0', '0', '97.3'),
(36, 35, '0', '', '', '0', '', '', '', '0', '', '', '0', '-1', '0', '', '', '', '', '0', '', '0', '0', '', '', '', '0', '0', '-0.5', '0', '', '-1', '0', '0', '97.5'),
(37, 36, '0', '', '0', '-0.4', '', '0', '', '', '', '', '', '0', '0', '-1', '', '', '', '-1', '', '0', '0', '0', '0', '', '', '0', '-0.5', '0', '', '0', '-1', '0', '96.1'),
(38, 37, '0', '', '', '0', '', '', '', '0', '', '', '', '-1', '0', '', '', '', '', '0', '', '0', '0', '', '', '', '0', '0', '-1.5', '0', '', '', '', '', '97.5'),
(39, 38, '0', '', '', '0', '', '', '', '0', '', '', '0', '-1', '0', '', '', '', '', '-0.5', '', '0', '0', '', '', '', '0', '0', '0', '0', '', '', '', '', '98.5'),
(40, 39, '0', '', '0', '-0.4', '', '0', '', '', '', '', '', '-1', '0', '', '', '', '', '0', '', '', '', '0', '0', '', '0', '0', '0', '0', '', '0', '-1', '0', '97.6'),
(41, 40, '0', '', '0', '-0.4', '', '0', '', '', '', '', '', '0', '0', '', '', '', '', '', '', '0', '0', '0', '0', '', '0', '', '0', '0', '', '', '', '', '99.6'),
(42, 41, '0', '', '0', '-0.4', '', '0', '', '', '', '', '', '0', '0', '', '', '', '', '-1', '', '0', '0', '0', '0', '', '0', '0', '0', '0', '', '', '', '', '98.6'),
(43, 42, '0', '', '0', '', '', '0', '', '', '', '', '', '', '0', '', '', '', '', '', '', '0', '0', '', '', '', '0', '0', '', '0', '', '', '', '', '100'),
(44, 43, '0', '', '', '-0.4', '', '', '', '0', '', '', '0', '-1', '0', '', '', '', '', '0', '', '0', '', '', '', '', '0', '', '', '0', '', '-1', '0', '0', '97.6');

-- --------------------------------------------------------

--
-- Table structure for table `specs`
--

DROP TABLE IF EXISTS `specs`;
CREATE TABLE IF NOT EXISTS `specs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(11) NOT NULL DEFAULT '-1',
  `number` varchar(80) NOT NULL,
  `name` varchar(80) NOT NULL,
  `remark` varchar(300) NOT NULL,
  `start` datetime NOT NULL COMMENT 'valid from date',
  `end` datetime NOT NULL DEFAULT '3000-01-01 00:00:00' COMMENT 'valid until date',
  `1_matinMoistMin` varchar(6) NOT NULL,
  `1_matinMoistMax` varchar(6) NOT NULL,
  `1_matoutMoistMin` varchar(6) NOT NULL,
  `1_matoutMoistMax` varchar(6) NOT NULL,
  `1_matoutTempMin` varchar(6) NOT NULL,
  `1_matoutTempMax` varchar(6) NOT NULL,
  `2_matinMoistMin` varchar(6) NOT NULL,
  `2_matinMoistMax` varchar(6) NOT NULL,
  `2_matoutMoistMin` varchar(6) NOT NULL,
  `2_matoutMoistMax` varchar(6) NOT NULL,
  `2_matoutTempMin` varchar(6) NOT NULL,
  `2_matoutTempMax` varchar(6) NOT NULL,
  `storTimeMin` varchar(6) NOT NULL,
  `storTimeMax` varchar(6) NOT NULL,
  `cutWidthMin` varchar(6) NOT NULL,
  `cutWidthMax` varchar(6) NOT NULL,
  `cyl_matinMoistMin` varchar(6) NOT NULL,
  `cyl_matinMoistMax` varchar(6) NOT NULL,
  `cyl_matoutMoistMin` varchar(6) NOT NULL,
  `cyl_matoutMoistMax` varchar(6) NOT NULL,
  `cyl_matoutTempMin` varchar(6) NOT NULL,
  `cyl_matoutTempMax` varchar(6) NOT NULL,
  `dry_matoutMoistMin` varchar(6) NOT NULL,
  `dry_matoutMoistMax` varchar(6) NOT NULL,
  `dry_matoutTempMin` varchar(6) NOT NULL,
  `dry_matoutTempMax` varchar(6) NOT NULL,
  `blendstorMoistMin` varchar(6) NOT NULL,
  `blendstorMoistMax` varchar(6) NOT NULL,
  `flavor_matoutMoistMin` varchar(6) NOT NULL,
  `flavor_matoutMoistMax` varchar(6) NOT NULL,
  `1_accuracy` varchar(4) NOT NULL,
  `2_accuracy` varchar(4) NOT NULL,
  `blendcutAccuracy` varchar(4) NOT NULL,
  `blendexpAccuracy` varchar(4) NOT NULL,
  `blendflavorAccuracy` varchar(4) NOT NULL,
  `amountLongStems` varchar(6) NOT NULL,
  `amountShortStems` varchar(6) NOT NULL,
  `fillingPower` varchar(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=gbk AUTO_INCREMENT=125 ;

--
-- Dumping data for table `specs`
--

INSERT INTO `specs` (`id`, `pid`, `number`, `name`, `remark`, `start`, `end`, `1_matinMoistMin`, `1_matinMoistMax`, `1_matoutMoistMin`, `1_matoutMoistMax`, `1_matoutTempMin`, `1_matoutTempMax`, `2_matinMoistMin`, `2_matinMoistMax`, `2_matoutMoistMin`, `2_matoutMoistMax`, `2_matoutTempMin`, `2_matoutTempMax`, `storTimeMin`, `storTimeMax`, `cutWidthMin`, `cutWidthMax`, `cyl_matinMoistMin`, `cyl_matinMoistMax`, `cyl_matoutMoistMin`, `cyl_matoutMoistMax`, `cyl_matoutTempMin`, `cyl_matoutTempMax`, `dry_matoutMoistMin`, `dry_matoutMoistMax`, `dry_matoutTempMin`, `dry_matoutTempMax`, `blendstorMoistMin`, `blendstorMoistMax`, `flavor_matoutMoistMin`, `flavor_matoutMoistMax`, `1_accuracy`, `2_accuracy`, `blendcutAccuracy`, `blendexpAccuracy`, `blendflavorAccuracy`, `amountLongStems`, `amountShortStems`, `fillingPower`) VALUES
(36, 35, ' QJ/08.J.0CC4520A-2016002', '长城（醇雅奶香）', '', '2016-08-27 15:09:59', '2016-11-24 16:30:31', '', '', '29', '31', '50', '60', '', '', '25', '27', '45', '55', '1', '8', '0.75', '0.95', '', '', '26', '28', '50', '60', '13.5', '14.5', '45', '55', '', '', '13', '14', '', '', '', '', '', '70', '5.5', '4.8'),
(38, 37, ' QJ/08.J.0CC2030A-2016001', '狮牌（草莓）', '', '2016-08-27 15:09:40', '2016-11-24 16:25:10', '', '', '29', '31', '50', '60', '', '', '25', '27', '45', '55', '1', '8', '0.85', '1.05', '', '', '26', '28', '50', '60', '13.3', '14.3', '45', '55', '', '', '12.8', '13.8', '', '', '', '', '', '75', '4.5', '4.8'),
(40, 39, ' QJ/08.J.0CC4560A-2016001', '长城（风尚） ', '', '2016-08-27 15:09:04', '2016-11-24 17:00:24', '', '', '18', '20', '', '', '', '', '', '', '', '', '3', '5', '0.85', '1.05', '', '', '', '', '', '', '13.5', '14.5', '', '', '', '', '12.3', '13.3', '', '', '', '', '', '70', '4.5', '4.8'),
(42, 41, ' QJ/08.J.0CC2060A-2016001', '狮牌（特香）', '', '2016-08-27 15:09:22', '2016-11-24 15:58:45', '', '', '15.5', '18.5', '', '', '', '', '', '', '', '', '1', '4', '0.9', '1.1', '', '', '', '', '', '', '13', '14', '', '', '', '', '12.3', '13.3', '', '', '', '', '', '70', '4.5', '4.2'),
(44, 43, '', '长城（132醇味）川版', '', '2016-08-27 16:09:24', '3000-01-01 00:00:00', '', '', '15', '17', '', '', '', '', '', '', '', '', '1', '4', '0.95', '1.05', '', '', '', '', '', '', '12.8', '13.8', '', '', '', '', '12.3', '13.3', '', '', '', '', '', '75', '4.5', '4.2'),
(46, 45, ' QJ/08.J.0CC4680A-2016001', '长城（风雅）', '', '2016-08-27 16:09:43', '2016-11-24 16:52:33', '', '', '18', '20', '', '', '', '', '', '', '', '', '1', '8', '1.1', '1.3', '', '', '', '', '', '', '13', '14', '', '', '', '', '12.5', '13.5', '', '', '', '', '', '70', '5.5', '4.8'),
(50, 49, '', '长城（传奇)', '', '2016-08-27 16:09:05', '2016-11-24 13:07:36', '', '', '15', '17', '', '', '', '', '', '', '', '', '1', '4', '0.85', '1.05', '', '', '', '', '', '', '12.5', '13.5', '', '', '', '', '12.5', '12.9', '', '', '', '', '', '80', '2.5', '4.2'),
(52, 51, ' QJ/08.J.0CC4510A-2016004', '长城（醇雅薄荷）', '', '2016-08-27 16:09:47', '2016-11-24 16:38:20', '', '', '29', '31', '50', '60', '', '', '25', '27', '45', '55', '1', '8', '0.75', '0.95', '', '', '26', '28', '50', '60', '13.5', '14.5', '45', '55', '', '', '13', '14', '', '', '', '', '', '70', '5.5', '4.8'),
(54, 53, ' QJ/08.J.0CC4530A-2016002', '长城（醇雅COCO）', '', '2016-08-27 16:09:34', '2016-11-24 16:28:49', '', '', '29', '31', '', '', '', '', '', '', '', '', '1', '8', '0.75', '0.95', '', '', '', '', '', '', '12.5', '13.5', '', '', '', '', '12.3', '13.3', '', '', '', '', '', '70', '5.5', '4.2'),
(56, 55, '', '狮牌（微型）', '', '2016-08-27 16:09:19', '2016-11-24 15:53:36', '', '', '29', '31', '50', '60', '', '', '25', '27', '45', '55', '1', '8', '0.85', '1.05', '', '', '26', '28', '50', '60', '13.3', '14.3', '45', '55', '', '', '12.8', '13.8', '', '', '', '', '', '75', '4.5', '4.8'),
(60, 59, '', '长城（丝路）晒烟', '', '2016-08-27 16:09:15', '3000-01-01 00:00:00', '', '', '29', '31', '', '', '', '', '', '', '', '', '1', '8', '0.75', '0.95', '', '', '', '', '', '', '13.5', '14.5', '', '', '', '', '12.8', '13.8', '', '', '', '', '', '75', '4.5', '4.8'),
(62, 61, '  QJ/08.J.0CC2010A-2016001', ' 狮牌（大S)晾晒烟', '', '2016-08-27 16:09:44', '2016-11-24 16:14:18', '', '', '27', '29', '', '', '', '', '', '', '', '', '3', '5', '0.85', '1.05', '', '', '', '', '', '', '13.5', '14.5', '', '', '', '', '12.8', '13.8', '', '', '', '', '', '75', '4.5', '4.8'),
(64, 63, '', '长城（壹叁贰13号）', '', '2016-08-27 16:09:33', '3000-01-01 00:00:00', '', '', '18', '20', '', '', '', '', '', '', '', '', '1', '8', '1.1', '1.3', '', '', '', '', '', '', '12.8', '13.8', '', '', '', '', '12.3', '13.3', '', '', '', '', '', '75', '4.5', '4.8'),
(65, 65, '', '试验试生产', '', '2016-08-27 16:29:18', '3000-01-01 00:00:00', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(66, 66, '', '工字（1号）', '', '2016-08-27 16:31:22', '3000-01-01 00:00:00', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(68, 67, '', '狮牌（原香）', '', '2016-08-27 16:09:40', '3000-01-01 00:00:00', '', '', '15', '17', '', '', '', '', '', '', '', '', '1', '4', '0.85', '1.05', '', '', '', '', '', '', '12', '13', '', '', '', '', '12', '13', '', '', '', '', '', '80', '2.5', '4.2'),
(70, 69, '', '狮牌（原味）', '', '2016-08-27 16:09:06', '3000-01-01 00:00:00', '', '', '15.5', '18.5', '', '', '', '', '', '', '', '', '1', '4', '0.9', '1.1', '', '', '', '', '', '', '13', '14', '', '', '', '', '12.3', '13.3', '', '', '', '', '', '70', '4.5', '4.2'),
(71, 33, '', '狮牌（鸿运当头）', '', '2016-08-20 14:09:41', '2016-11-24 14:38:28', '', '', '15', '17', '', '', '', '', '', '', '', '', '2', '4', '0.85', '1.05', '', '', '', '', '', '', '12', '13', '', '', '', '', '12', '13', '', '', '', '', '', '80', '2.5', '4.2'),
(72, 47, ' QJ/08.J.0CC1000A-2016001', '工字（红）', '', '2016-08-30 11:09:34', '2016-11-24 17:03:02', '', '', '29', '31', '50', '60', '', '', '', '', '', '', '1', '12', '1.4', '1.6', '', '', '27', '29', '', '', '13', '14', '', '', '', '', '13', '14', '', '', '', '', '', '66', '5.5', '5.5'),
(73, 57, '', '长城（丝路）烤烟', '', '2016-07-30 11:09:17', '3000-01-01 00:00:00', '', '', '18', '20', '', '', '', '', '', '', '', '', '1', '8', '0.75', '0.95', '', '', '', '', '', '', '12.8', '13.8', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(76, 76, '   QJ/08.J.0CC4540A-2016001', '长城（132醇味）烤烟', '', '2016-11-24 12:51:46', '2016-11-24 12:54:23', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(77, 76, '   QJ/08.J.0CC4540A-2016001', '长城（132醇味）烤烟', '', '2016-11-24 12:11:23', '2016-11-24 12:58:46', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(78, 76, '   QJ/08.J.0CC4540A-2016001', '长城（132醇味）烤烟', '', '2016-11-24 12:11:46', '2016-11-24 12:59:12', '', '', '18.00', '20.00', '', '', '', '', '', '', '', '', '2', '4', '0.85', '1.05', '', '', '', '', '', '', '12.00', '13.00', '', '', '', '', '12.10', '13.50', '', '', '', '', '', '70', '4.5', '4.2'),
(79, 76, '   QJ/08.J.0CC4540A-2016001', '长城（132醇味）烤烟', '', '2016-11-24 12:11:12', '3000-01-01 00:00:00', '', '', '18.00', '20.00', '', '', '', '', '', '', '', '', '2', '4', '0.85', '1.05', '', '', '', '', '', '', '12.00', '13.00', '', '', '', '', '12.10', '13.50', '', '', '', '', '', '70', '4.5', '4.2'),
(80, 80, '    QJ/08.J.0CC4540A-2016001', '长城（132醇味）晒烟', '', '2016-11-24 12:59:39', '2016-11-24 13:03:19', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(81, 80, '    QJ/08.J.0CC4540A-2016001', '长城（132醇味）晒烟', '', '2016-11-24 13:11:19', '3000-01-01 00:00:00', '', '', '27.00', '29.00', '', '', '', '', '', '', '', '', '2', '4', '0.85', '1.05', '', '', '', '', '14.30', '15.30', '', '', '', '', '', '', '12.10', '13.50', '', '', '', '', '', '70', '4.5', '4.2'),
(82, 49, '', '长城（传奇)', '', '2016-11-24 13:11:36', '3000-01-01 00:00:00', '', '', '15.00', '17.00', '', '', '', '', '', '', '', '', '1', '4', '0.85', '1.05', '', '', '', '', '', '', '12.50', '13.50', '', '', '', '', '12.5', '12.9', '', '', '', '', '', '80', '2.5', '3.8'),
(83, 83, 'QJ/08.J.0CC2100A-2016002', '狮牌（原香）', '', '2016-11-24 13:09:02', '2016-11-24 13:34:54', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(84, 83, 'QJ/08.J.0CC2100A-2016002', '狮牌（原香）', '', '2016-11-24 13:11:54', '3000-01-01 00:00:00', '', '', '15.00', '17.00', '', '', '', '', '', '', '', '', '1', '4', '0.85', '1.05', '', '', '', '', '', '', '12.00', '13.00', '', '', '', '', '12.00', '13.00', '', '', '', '', '', '80', '2.5', '3.8'),
(85, 85, 'QJ/08.J.0CC2020A-2016002', ' 狮牌（完美时光）', '', '2016-11-24 13:37:51', '2016-11-24 14:32:54', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(86, 85, 'QJ/08.J.0CC2020A-2016002', ' 狮牌（完美时光）', '', '2016-11-24 14:11:54', '3000-01-01 00:00:00', '', '', '19.00', '21.00', '', '', '', '', '', '', '', '', '1', '8', '1.10', '1.30', '', '', '', '', '', '', '13.00', '14.00', '', '', '', '', '12.30', '13.30', '', '', '', '', '', '75', '4.5', '4.8'),
(87, 33, '', '狮牌（鸿运当头）', '', '2016-11-24 14:11:28', '2016-11-24 14:38:32', '', '', '15.00', '17.00', '', '', '', '', '', '', '', '', '2', '4', '0.85', '1.05', '', '', '', '', '', '', '12.00', '13.00', '', '', '', '', '12.00', '13.00', '', '', '', '', '', '80', '2.5', '4.2'),
(88, 33, '', '狮牌（鸿运当头）', '', '2016-11-24 14:11:32', '2016-11-24 14:38:39', '', '', '15.00', '17.00', '', '', '', '', '', '', '', '', '2', '4', '0.85', '1.05', '', '', '', '', '', '', '12.00', '13.00', '', '', '', '', '12.00', '13.00', '', '', '', '', '', '80', '2.5', '4.2'),
(89, 33, '', '狮牌（鸿运当头）', '', '2016-11-24 14:11:39', '3000-01-01 00:00:00', '', '', '15.00', '17.00', '', '', '', '', '', '', '', '', '2', '4', '0.85', '1.05', '', '', '', '', '', '', '12.00', '13.00', '', '', '', '', '12.00', '13.00', '', '', '', '', '', '80', '2.5', '4.2'),
(90, 55, '', '狮牌（微型）', '', '2016-11-24 15:11:36', '3000-01-01 00:00:00', '', '', '19', '21', '', '', '', '', '', '', '', '', '1', '8', '0.85', '1.05', '', '', '', '', '', '', '13.3', '14.3', '', '', '', '', '12.8', '13.8', '', '', '', '', '', '75', '4.5', '4.8'),
(91, 41, ' QJ/08.J.0CC2060A-2016001', '狮牌（特香）', '', '2016-11-24 15:11:45', '2016-11-24 16:09:06', '', '', '15.5', '18.5', '', '', '', '', '', '', '', '', '1', '4', '0.9', '1.1', '', '', '', '', '', '', '13', '14', '', '', '', '', '12.3', '13.3', '', '', '', '', '', '70', '4.5', '4.2'),
(92, 41, ' QJ/08.J.0CC2060A-2016001', '狮牌（特香）', '', '2016-11-24 16:11:06', '3000-01-01 00:00:00', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(93, 93, 'QJ/08.J.0CC2082A-2016001', '狮牌（鸿运当头）加甜版', '', '2016-11-24 16:10:58', '2016-11-24 16:13:19', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(94, 93, 'QJ/08.J.0CC2082A-2016001', '狮牌（鸿运当头）加甜版', '', '2016-11-24 16:11:19', '3000-01-01 00:00:00', '', '', '15.00', '17.00', '', '', '', '', '', '', '', '', '2', '4', '0.85', '1.05', '', '', '', '', '', '', '12.00', '13.00', '', '', '', '', '12.00', '13.00', '', '', '', '', '', '80', '2.5', '3.8'),
(95, 61, '  QJ/08.J.0CC2010A-2016001', ' 狮牌（大S)晾晒烟', '', '2016-11-24 16:11:18', '2016-11-24 16:18:31', '', '', '27', '29', '', '', '', '', '', '', '', '', '3', '5', '0.85', '1.05', '', '', '', '', '', '', '13.5', '14.5', '', '', '', '', '12.8', '13.8', '', '', '', '', '', '75', '4.5', '4.8'),
(96, 61, '  QJ/08.J.0CC2010A-2016001', ' 狮牌（大S)晾晒烟', '', '2016-11-24 16:11:31', '2016-11-24 16:19:11', '', '', '19.00', '21.00', '', '', '', '', '', '', '', '', '2', '4', '0.85', '1.05', '', '', '', '', '', '', '13.00', '14.00', '', '', '', '', '12.30', '13.30', '', '', '', '', '', '75', '4.5', '4.2'),
(97, 97, '  QJ/08.J.0CC2010A-2016001', '狮牌（大S）烤烟', '', '2016-11-24 16:18:55', '2016-11-24 16:19:22', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(98, 61, '  QJ/08.J.0CC2010A-2016001', ' 狮牌（大S)晾晒烟', '', '2016-11-24 16:11:11', '3000-01-01 00:00:00', '', '', '19.00', '21.00', '', '', '', '', '', '', '', '', '2', '4', '0.85', '1.05', '', '', '', '', '', '', '13.00', '14.00', '', '', '', '', '12.30', '13.30', '', '', '', '', '', '75', '4.5', '4.2'),
(99, 97, '  QJ/08.J.0CC2010A-2016001', '狮牌（大S）烤烟', '', '2016-11-24 16:11:22', '2016-11-24 16:20:56', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(100, 97, '  QJ/08.J.0CC2010A-2016001', '狮牌（大S）烤烟', '', '2016-11-24 16:11:56', '3000-01-01 00:00:00', '', '', '18.00', '20.00', '', '', '', '', '', '', '', '', '2', '4', '0.85', '1.05', '', '', '', '', '', '', '13.00', '14.00', '', '', '', '', '12.30', '13.30', '', '', '', '', '', '75', '4.5', '4.2'),
(101, 37, ' QJ/08.J.0CC2030A-2016001', '狮牌（草莓）', '', '2016-11-24 16:11:10', '2016-11-24 16:27:29', '', '', '29', '31', '50', '60', '', '', '25', '27', '45', '55', '1', '8', '0.85', '1.05', '', '', '26', '28', '50', '60', '13.3', '14.3', '45', '55', '', '', '12.8', '13.8', '', '', '', '', '', '75', '4.5', '4.8'),
(102, 37, ' QJ/08.J.0CC2030A-2016001', '狮牌（草莓）', '', '2016-11-24 16:11:29', '3000-01-01 00:00:00', '', '', '19.00', '21.00', '', '', '', '', '', '', '', '', '1', '8', '0.85', '1.05', '', '', '', '', '', '', '13.3', '14.3', '', '', '', '', '12.80', '13.80', '', '', '', '', '', '75', '4.5', '4.8'),
(103, 53, ' QJ/08.J.0CC4530A-2016002', '长城（醇雅COCO）', '', '2016-11-24 16:11:49', '2016-11-24 16:29:51', '', '', '29', '31', '', '', '', '', '', '', '', '', '1', '8', '0.75', '0.95', '', '', '', '', '', '', '12.5', '13.5', '', '', '', '', '12.3', '13.3', '', '', '', '', '', '70', '5.5', '4.2'),
(104, 53, ' QJ/08.J.0CC4530A-2016002', '长城（醇雅COCO）', '', '2016-11-24 16:11:51', '3000-01-01 00:00:00', '', '', '19.00', '21.00', '', '', '', '', '', '', '', '', '1', '8', '0.75', '0.95', '', '', '', '', '', '', '12.50', '13.50', '', '', '', '', '12.30', '13.30', '', '', '', '', '', '70', '5.5', '4.2'),
(105, 35, ' QJ/08.J.0CC4520A-2016002', '长城（醇雅奶香）', '', '2016-11-24 16:11:31', '2016-11-24 16:36:53', '', '', '29', '31', '50', '60', '', '', '25', '27', '45', '55', '1', '8', '0.75', '0.95', '', '', '26', '28', '50', '60', '13.5', '14.5', '45', '55', '', '', '13', '14', '', '', '', '', '', '70', '5.5', '4.8'),
(106, 35, ' QJ/08.J.0CC4520A-2016002', '长城（醇雅奶香）', '', '2016-11-24 16:11:53', '3000-01-01 00:00:00', '', '', '18.00', '20.00', '', '', '', '', '', '', '', '', '1', '8', '0.90', '1.10', '', '', '', '', '', '', '14.00', '15.00', '', '', '', '', '13.00', '14.00', '', '', '', '', '', '65', '6.5', '4.8'),
(107, 51, ' QJ/08.J.0CC4510A-2016004', '长城（醇雅薄荷）', '', '2016-11-24 16:11:20', '2016-11-24 16:40:23', '', '', '29', '31', '50', '60', '', '', '25', '27', '45', '55', '1', '8', '0.75', '0.95', '', '', '26', '28', '50', '60', '13.5', '14.5', '45', '55', '', '', '13', '14', '', '', '', '', '', '70', '5.5', '4.8'),
(108, 51, ' QJ/08.J.0CC4510A-2016004', '长城（醇雅薄荷）', '', '2016-11-24 16:11:23', '3000-01-01 00:00:00', '', '', '18.00', '20.00', '', '', '', '', '', '', '', '', '1', '8', '0.90', '1.10', '', '', '', '', '', '', '14.00', '14.50', '', '', '', '', '13.00', '14.00', '', '', '', '', '', '65', '6.5', '4.8'),
(109, 109, ' QJ/08.J.0CC2011A-2016001', '狮牌（大S）加甜版晾晒', '', '2016-11-24 16:42:56', '2016-11-24 16:44:43', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(110, 109, ' QJ/08.J.0CC2011A-2016001', '狮牌（大S）加甜版晾晒', '', '2016-11-24 16:11:43', '2016-11-24 16:45:25', '', '', '19.00', '21.00', '', '', '', '', '', '', '', '', '2', '4', '0.85', '1.05', '', '', '', '', '', '', '13.00', '14.00', '', '', '', '', '12.30', '13.30', '', '', '', '', '', '75.0', '4.5', '4.2'),
(111, 111, ' QJ/08.J.0CC2011A-2016001', '狮牌（大S）加甜版烤烟', '', '2016-11-24 16:45:11', '2016-11-24 16:45:33', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(112, 109, ' QJ/08.J.0CC2011A-2016001', '狮牌（大S）加甜版晾晒', '', '2016-11-24 16:11:25', '3000-01-01 00:00:00', '', '', '19.00', '21.00', '', '', '', '', '', '', '', '', '2', '4', '0.85', '1.05', '', '', '', '', '', '', '13.00', '14.00', '', '', '', '', '12.30', '13.30', '', '', '', '', '', '75.0', '4.5', '4.2'),
(113, 111, ' QJ/08.J.0CC2011A-2016001', '狮牌（大S）加甜版烤烟', '', '2016-11-24 16:11:33', '2016-11-24 16:45:36', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(114, 111, ' QJ/08.J.0CC2011A-2016001', '狮牌（大S）加甜版烤烟', '', '2016-11-24 16:11:36', '2016-11-24 16:46:59', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(115, 111, ' QJ/08.J.0CC2011A-2016001', '狮牌（大S）加甜版烤烟', '', '2016-11-24 16:11:59', '2016-11-24 16:47:02', '', '', '18.00', '20.00', '', '', '', '', '', '', '', '', '2', '4', '0.85', '1.05', '', '', '', '', '', '', '13.00', '14.00', '', '', '', '', '12.30', '13.30', '', '', '', '', '', '75.0', '4.5', '4.2'),
(116, 111, ' QJ/08.J.0CC2011A-2016001', '狮牌（大S）加甜版烤烟', '', '2016-11-24 16:11:02', '3000-01-01 00:00:00', '', '', '18.00', '20.00', '', '', '', '', '', '', '', '', '2', '4', '0.85', '1.05', '', '', '', '', '', '', '13.00', '14.00', '', '', '', '', '12.30', '13.30', '', '', '', '', '', '75.0', '4.5', '4.2'),
(117, 45, ' QJ/08.J.0CC4680A-2016001', '长城（风雅）', '', '2016-11-24 16:11:33', '3000-01-01 00:00:00', '', '', '28.00', '28.00', '', '', '', '', '', '', '', '', '4', '8', '0.85', '1.05', '', '', '', '', '', '', '15.00', '16.00', '', '', '', '', '13.00', '14.00', '', '', '', '', '', '65.0', '6.5', '4.8'),
(118, 39, ' QJ/08.J.0CC4560A-2016001', '长城（风尚） ', '', '2016-11-24 17:11:24', '2016-11-24 17:00:25', '', '', '18', '20', '', '', '', '', '', '', '', '', '3', '5', '0.85', '1.05', '', '', '', '', '', '', '13.5', '14.5', '', '', '', '', '12.3', '13.3', '', '', '', '', '', '70', '4.5', '4.8'),
(119, 39, ' QJ/08.J.0CC4560A-2016001', '长城（风尚） ', '', '2016-11-24 17:11:25', '2016-11-24 17:01:33', '', '', '18', '20', '', '', '', '', '', '', '', '', '3', '5', '0.85', '1.05', '', '', '', '', '', '', '13.5', '14.5', '', '', '', '', '12.3', '13.3', '', '', '', '', '', '70', '4.5', '4.8'),
(120, 39, ' QJ/08.J.0CC4560A-2016001', '长城（风尚） ', '', '2016-11-24 17:11:33', '3000-01-01 00:00:00', '', '', '18.00', '20.00', '', '', '', '', '', '', '', '', '4', '5', '0.85', '1.05', '', '', '', '', '', '', '13.50', '14.50', '', '', '', '', '12.30', '13.30', '', '', '', '', '', '70', '4.5', '4.8'),
(121, 47, ' QJ/08.J.0CC1000A-2016001', '工字（红）', '', '2016-11-24 17:11:02', '2016-11-24 17:04:31', '', '', '29', '31', '50', '60', '', '', '', '', '', '', '1', '12', '1.4', '1.6', '', '', '27', '29', '', '', '13', '14', '', '', '', '', '13', '14', '', '', '', '', '', '66', '5.5', '5.5'),
(122, 47, ' QJ/08.J.0CC1000A-2016001', '工字（红）', '', '2016-11-24 17:11:31', '2016-11-24 17:04:33', '', '', '29.00', '31.00', '', '', '', '', '', '', '', '', '1', '8', '1.30', '1.70', '', '', '', '', '', '', '14.00', '15.00', '', '', '', '', '13.00', '14.00', '', '', '', '', '', '66', '4.5', '4.8'),
(123, 47, ' QJ/08.J.0CC1000A-2016001', '工字（红）', '', '2016-11-24 17:11:33', '2016-12-19 15:04:58', '', '', '29.00', '31.00', '', '', '', '', '', '', '', '', '1', '8', '1.30', '1.70', '', '', '', '', '', '', '14.00', '15.00', '', '', '', '', '13.00', '14.00', '', '', '', '', '', '66', '4.5', '4.8'),
(124, 47, ' QJ/08.J.0CC1000A-2016001', '工字（红）', '', '2016-12-19 15:04:58', '3000-01-01 00:00:00', '', '', '29.00', '31.00', '', '', '', '', '', '', '', '', '1', '8', '1.30', '1.70', '', '', '', '', '', '', '14.00', '15.00', '', '', '', '', '13.00', '14.00', '', '', '', '', '', '66', '4.5', '4');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `identity` varchar(18) NOT NULL,
  `gebruik` int(11) NOT NULL DEFAULT '0',
  `login` varchar(10) CHARACTER SET gb2312 NOT NULL,
  `name` varchar(40) CHARACTER SET gb2312 NOT NULL,
  `specs` tinyint(1) NOT NULL DEFAULT '0',
  `formulas` tinyint(1) NOT NULL DEFAULT '0',
  `admin` tinyint(1) NOT NULL DEFAULT '0',
  `readonly` tinyint(1) NOT NULL DEFAULT '0',
  `names` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `date`, `identity`, `gebruik`, `login`, `name`, `specs`, `formulas`, `admin`, `readonly`, `names`) VALUES
(2, '2016-12-07 15:33:38', '10.164.115.146', 36, 'leyen', 'Arie', 0, 0, 1, 0, 0),
(3, '2016-12-07 18:06:55', '10.164.117.20', 10, '963852', 'alex', 1, 0, 0, 0, 1),
(4, '2016-11-21 11:22:50', '', 0, '132132', 'Gao San', 1, 1, 0, 0, 1),
(5, '2016-12-06 08:55:53', '10.164.115.147', 6, '131452', 'yekeyuan', 1, 1, 0, 0, 1),
(6, '2016-12-07 08:44:12', '10.164.115.162', 13, '123456', 'inspectors', 1, 0, 0, 0, 1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
