-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 06, 2016 at 12:10 PM
-- Server version: 10.1.13-MariaDB-1~trusty
-- PHP Version: 5.5.9-1ubuntu4.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `gwc_handmade`
--

-- --------------------------------------------------------

--
-- Table structure for table `boxDefects`
--

DROP TABLE IF EXISTS `boxDefects`;
CREATE TABLE IF NOT EXISTS `boxDefects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `product` varchar(20) NOT NULL,
  `sample` varchar(5) NOT NULL,
  `score` varchar(4) NOT NULL,
  `inspector` varchar(4) NOT NULL,
  `remarks` varchar(200) NOT NULL,
  `bjob` varchar(4) NOT NULL,
  `judge` varchar(4) NOT NULL,
  `bremarks` varchar(200) NOT NULL,
  `bsd1` varchar(4) NOT NULL,
  `bsd2` varchar(4) NOT NULL,
  `bsd3` varchar(4) NOT NULL,
  `bsd1_nr` varchar(4) NOT NULL,
  `bsd2_nr` varchar(4) NOT NULL,
  `bsd3_nr` varchar(4) NOT NULL,
  `bb1` varchar(4) NOT NULL,
  `bb2` varchar(4) NOT NULL,
  `bb3` varchar(4) NOT NULL,
  `bb1_nr` varchar(4) NOT NULL,
  `bb2_nr` varchar(4) NOT NULL,
  `bb3_nr` varchar(4) NOT NULL,
  `bm1` varchar(4) NOT NULL,
  `bm2` varchar(4) NOT NULL,
  `bm3` varchar(4) NOT NULL,
  `bm1_nr` varchar(4) NOT NULL,
  `bm2_nr` varchar(4) NOT NULL,
  `bm3_nr` varchar(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=gbk AUTO_INCREMENT=2 ;

--
-- Dumping data for table `boxDefects`
--

INSERT INTO `boxDefects` (`id`, `date`, `product`, `sample`, `score`, `inspector`, `remarks`, `bjob`, `judge`, `bremarks`, `bsd1`, `bsd2`, `bsd3`, `bsd1_nr`, `bsd2_nr`, `bsd3_nr`, `bb1`, `bb2`, `bb3`, `bb1_nr`, `bb2_nr`, `bb3_nr`, `bm1`, `bm2`, `bm3`, `bm1_nr`, `bm2_nr`, `bm3_nr`) VALUES
(1, '2016-11-17 11:30:56', '长城（3号）', '2', '', '卿萍', '', '0015', '', '', 'B1', '0', '0', '3', '', '', '0', 'B1', '0', '', '1', '', '0', '0', '0', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `cutting`
--

DROP TABLE IF EXISTS `cutting`;
CREATE TABLE IF NOT EXISTS `cutting` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `product` varchar(20) NOT NULL,
  `name` varchar(10) NOT NULL,
  `headend` varchar(4) NOT NULL,
  `incision` varchar(4) NOT NULL,
  `empty` varchar(4) NOT NULL,
  `crease` varchar(4) NOT NULL,
  `blot` varchar(4) NOT NULL,
  `seam` varchar(4) NOT NULL,
  `crack` varchar(4) NOT NULL,
  `score` varchar(4) NOT NULL,
  `quality` varchar(4) NOT NULL,
  `inspector` varchar(4) NOT NULL,
  `remarks` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=gbk AUTO_INCREMENT=4 ;

--
-- Dumping data for table `cutting`
--

INSERT INTO `cutting` (`id`, `date`, `product`, `name`, `headend`, `incision`, `empty`, `crease`, `blot`, `seam`, `crack`, `score`, `quality`, `inspector`, `remarks`) VALUES
(1, '2016-11-16 16:58:10', '试验', '', '0', '1', '0', '3', '0', '0', '0', '98.9', '合格', '3', '4'),
(2, '2016-11-16 16:58:53', '试验', '', '1', '0', '1', '0', '0', '2', '0', '97.5', '合格', '', ''),
(3, '2016-11-17 09:23:16', '长城（3号）', '何民霞', '0', '2', '0', '0', '1', '0', '0', '98.5', '合格', '卿萍', '');

-- --------------------------------------------------------

--
-- Table structure for table `defectlabels`
--

DROP TABLE IF EXISTS `defectlabels`;
CREATE TABLE IF NOT EXISTS `defectlabels` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(5) CHARACTER SET gbk NOT NULL,
  `text` varchar(200) CHARACTER SET gbk NOT NULL,
  `type` varchar(20) CHARACTER SET gbk NOT NULL,
  PRIMARY KEY (`id`),
  KEY `type_idx` (`type`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=280 ;

--
-- Dumping data for table `defectlabels`
--

INSERT INTO `defectlabels` (`id`, `code`, `text`, `type`) VALUES
(1, 'A1', '包装体内烟支断残', 'stick cel a'),
(2, 'A2', '包装明显异味', 'stick cel a'),
(3, 'A3', '烟支明显异味', 'stick cel a'),
(4, 'A4', '烟支生霉', 'stick cel a'),
(5, 'A5', '烟支虫蛀', 'stick cel a'),
(6, 'B1', '包装体内烟支短支', 'stick cel b'),
(7, 'B2', '包装物严重变形', 'stick cel b'),
(8, 'B3', '包装物文字、图案不完整', 'stick cel b'),
(9, 'B4', '木片未能包裹烟支、木片散开', 'stick cel b'),
(10, 'B5', '烟支刮破＞3mm', 'stick cel b'),
(11, 'B6', '烟支套/管内无烟支包装物', 'stick cel b'),
(12, 'B7', '烟支套/管变形、凹凸不平', 'stick cel b'),
(13, 'B8', '烟支竹节', 'stick cel b'),
(14, 'C1', '包装体中烟支之间相互粘连', 'stick cel c'),
(15, 'C10', '烟支包装物密封不严', 'stick cel c'),
(16, 'C11', '烟支包装物明显折皱、翘边', 'stick cel c'),
(17, 'C12', '烟支包装物明显色差', 'stick cel c'),
(18, 'C13', '烟支包装物表面不洁', 'stick cel c'),
(19, 'C14', '烟支套折叠不规范', 'stick cel c'),
(20, 'C15', '烟支病斑≥2mm ', 'stick cel c'),
(21, 'C16', '烟支病斑＜2mm多于2处', 'stick cel c'),
(22, 'C17', '烟支空头', 'stick cel c'),
(23, 'C18', '烟支端面触头＞1/3圆周', 'stick cel c'),
(24, 'C19', '烟支竹节', 'stick cel c'),
(25, 'C2', '包装体内烟支切口差＞2mm', 'stick cel c'),
(26, 'C20', '烟支缝口不严合', 'stick cel c'),
(27, 'C21', '烟支表面不洁', 'stick cel c'),
(28, 'C22', '烟支表面明显不洁', 'stick cel c'),
(29, 'C23', '烟支表面明显皱纹', 'stick cel c'),
(30, 'C24', '烟支表面颜色不均匀', 'stick cel c'),
(31, 'C25', '胶水溢出，导致粘连', 'stick cel c'),
(32, 'C26', '茄衣缠绕转数不符', 'stick cel c'),
(33, 'C27', '青烟、黑褐、严重挂灰', 'stick cel c'),
(35, 'C3', '指环位置不符合标准要求', 'stick cel c'),
(36, 'C4', '指环掉落', 'stick cel c'),
(37, 'C5', '指环粘贴不牢固', 'stick cel c'),
(38, 'C6', '烟支＞5mm折痕', 'stick cel c'),
(39, 'C7', '烟支包装物不完整', 'stick cel c'),
(40, 'C8', '烟支包装物不易打开', 'stick cel c'),
(41, 'C9', '烟支包装物不牢固', 'stick cel c'),
(42, 'A1', '包装体内烟支断残', 'stick ring a'),
(43, 'A2', '包装明显异味', 'stick ring a'),
(44, 'A3', '烟支明显异味', 'stick ring a'),
(45, 'A4', '烟支生霉', 'stick ring a'),
(46, 'A5', '烟支虫蛀', 'stick ring a'),
(47, 'B1', '包装体内烟支短支', 'stick ring b'),
(48, 'B2', '包装物严重变形', 'stick ring b'),
(49, 'B3', '包装物文字、图案不完整', 'stick ring b'),
(50, 'B4', '木片未能包裹烟支、木片散开', 'stick ring b'),
(51, 'B5', '烟支刮破＞3mm', 'stick ring b'),
(52, 'B6', '烟支套/管内无烟支包装物', 'stick ring b'),
(53, 'B7', '烟支套/管变形、凹凸不平', 'stick ring b'),
(54, 'B8', '烟支竹节', 'stick ring b'),
(55, 'C1', '包装体中烟支之间相互粘连', 'stick ring c'),
(56, 'C2', '包装体内烟支切口差＞2mm', 'stick ring c'),
(57, 'C3', '指环位置不符合标准要求', 'stick ring c'),
(58, 'C4', '指环掉落', 'stick ring c'),
(59, 'C5', '指环粘贴不牢固', 'stick ring c'),
(60, 'C6', '烟支＞5mm折痕', 'stick ring c'),
(61, 'C7', '烟支包装物不完整', 'stick ring c'),
(62, 'C8', '烟支包装物不易打开', 'stick ring c'),
(63, 'C9', '烟支包装物不牢固', 'stick ring c'),
(64, 'C10', '烟支包装物密封不严', 'stick ring c'),
(65, 'C11', '烟支包装物明显折皱、翘边', 'stick ring c'),
(66, 'C12', '烟支包装物明显色差', 'stick ring c'),
(67, 'C13', '烟支包装物表面不洁', 'stick ring c'),
(68, 'C14', '烟支套折叠不规范', 'stick ring c'),
(69, 'C15', '烟支病斑≥2mm', 'stick ring c'),
(70, 'C16', '烟支病斑＜2mm多于2处', 'stick ring c'),
(71, 'C17', '烟支空头', 'stick ring c'),
(72, 'C18', '烟支端面触头＞1/3圆周', 'stick ring c'),
(73, 'C19', '烟支竹节', 'stick ring c'),
(74, 'C20', '烟支缝口不严合', 'stick ring c'),
(75, 'C21', '烟支表面不洁', 'stick ring c'),
(76, 'C22', '烟支表面明显不洁', 'stick ring c'),
(77, 'C23', '烟支表面明显皱纹', 'stick ring c'),
(78, 'C24', '烟支表面颜色不均匀', 'stick ring c'),
(79, 'C25', '胶水溢出，导致粘连', 'stick ring c'),
(80, 'C26', '茄衣缠绕转数不符', 'stick ring c'),
(81, 'C27', '青烟、黑褐、严重挂灰', 'stick ring c'),
(82, 'A1', '包装体内烟支断残', 'stick set a'),
(83, 'A2', '包装明显异味', 'stick set a'),
(84, 'A3', '烟支明显异味', 'stick set a'),
(85, 'A4', '烟支生霉', 'stick set a'),
(86, 'A5', '烟支虫蛀', 'stick set a'),
(87, 'B1', '包装体内烟支短支', 'stick set b'),
(88, 'B2', '包装物严重变形', 'stick set b'),
(89, 'B3', '包装物文字、图案不完整', 'stick set b'),
(90, 'B4', '木片未能包裹烟支、木片散开', 'stick set b'),
(91, 'B5', '烟支刮破＞3mm', 'stick set b'),
(92, 'B6', '烟支套/管内无烟支包装物', 'stick set b'),
(93, 'B7', '烟支套/管变形、凹凸不平', 'stick set b'),
(94, 'B8', '烟支竹节', 'stick set b'),
(95, 'C1', '包装体中烟支之间相互粘连', 'stick set c'),
(96, 'C2', '包装体内烟支切口差＞2mm', 'stick set c'),
(97, 'C3', '指环位置不符合标准要求', 'stick set c'),
(98, 'C4', '指环掉落', 'stick set c'),
(99, 'C5', '指环粘贴不牢固', 'stick set c'),
(100, 'C6', '烟支＞5mm折痕', 'stick set c'),
(101, 'C7', '烟支包装物不完整', 'stick set c'),
(102, 'C8', '烟支包装物不易打开', 'stick set c'),
(103, 'C9', '烟支包装物不牢固', 'stick set c'),
(104, 'C10', '烟支包装物密封不严', 'stick set c'),
(105, 'C11', '烟支包装物明显折皱、翘边', 'stick set c'),
(106, 'C12', '烟支包装物明显色差', 'stick set c'),
(107, 'C13', '烟支包装物表面不洁', 'stick set c'),
(108, 'C14', '烟支套折叠不规范', 'stick set c'),
(109, 'C15', '烟支病斑≥2mm', 'stick set c'),
(110, 'C16', '烟支病斑＜2mm多于2处', 'stick set c'),
(111, 'C17', '烟支空头', 'stick set c'),
(112, 'C18', '烟支端面触头＞1/3圆周', 'stick set c'),
(113, 'C19', '烟支竹节', 'stick set c'),
(114, 'C20', '烟支缝口不严合', 'stick set c'),
(115, 'C21', '烟支表面不洁', 'stick set c'),
(116, 'C22', '烟支表面明显不洁', 'stick set c'),
(117, 'C23', '烟支表面明显皱纹', 'stick set c'),
(118, 'C24', '烟支表面颜色不均匀', 'stick set c'),
(119, 'C25', '胶水溢出，导致粘连', 'stick set c'),
(120, 'C26', '茄衣缠绕转数不符', 'stick set c'),
(121, 'C27', '青烟、黑褐、严重挂灰', 'stick set c'),
(122, 'A1', '盒内出现倒装', 'pack pack a'),
(123, 'A2', '盒内出现多支', 'pack pack a'),
(124, 'A3', '盒内出现烟嘴脱落', 'pack pack a'),
(125, 'A4', '盒内出现缺支', 'pack pack a'),
(126, 'A5', '盒内出现错装', 'pack pack a'),
(127, 'A6', '盒内有短、断、残烟支', 'pack pack a'),
(128, 'A7', '盒内有虫蛀烟支', 'pack pack a'),
(129, 'A8', '盒装无透明纸', 'pack pack a'),
(130, 'A9', '盒装明显异味', 'pack pack a'),
(131, 'B1', '小盒包装不完整', 'pack pack b'),
(132, 'B2', '小盒揭不开', 'pack pack b'),
(133, 'B3', '小盒无可追溯性标识', 'pack pack b'),
(134, 'B4', '小盒明显压痕', 'pack pack b'),
(135, 'B5', '小盒表面＞2mm破损', 'pack pack b'),
(136, 'B6', '小盒表面因擦花掉色', 'pack pack b'),
(137, 'B7', '小盒被挤压变形', 'pack pack b'),
(138, 'B8', '盒装缺少应有的包装材料', 'pack pack b'),
(139, 'C1', '内衬压线边缘不整齐', 'pack pack c'),
(140, 'C2', '内衬撕不开或撕破', 'pack pack c'),
(141, 'C3', '内衬纸折叠≥5mm', 'pack pack c'),
(142, 'C4', '内衬纸折皱≥15mm', 'pack pack c'),
(143, 'C5', '盒内包装方式不符合', 'pack pack c'),
(144, 'C6', '盒内指环主图案未正对窗口', 'pack pack c'),
(145, 'C7', '盒内指环位置明显不齐', 'pack pack c'),
(146, 'C8', '盒内有杂物', 'pack pack c'),
(147, 'C9', '盒内烟支包装不完整良好', 'pack pack c'),
(148, 'C10', '盒内烟支变形', 'pack pack c'),
(149, 'C11', '盒内烟支外观颜色不一致', 'pack pack c'),
(150, 'C12', '盒装≤3.0mm的叠角损伤多于两处', 'pack pack c'),
(151, 'C13', '盒装≤3.0mm的污渍多于两处', 'pack pack c'),
(152, 'C14', '盒装＞3mm的损伤、折痕', 'pack pack c'),
(153, 'C15', '盒装内衬纸残缺', 'pack pack c'),
(154, 'C16', '盒装商标纸压痕', 'pack pack c'),
(155, 'C17', '盒装封口签歪斜≥2mm', 'pack pack c'),
(156, 'C18', '盒装封口签长短≥2mm', 'pack pack c'),
(157, 'C19', '盒装拉带位置不正确', 'pack pack c'),
(158, 'C20', '盒装拉带后散玻', 'pack pack c'),
(159, 'C21', '盒装拉带头反叠', 'pack pack c'),
(160, 'C22', '盒装拉带拉不开', 'pack pack c'),
(161, 'C23', '盒装拉带拉断', 'pack pack c'),
(162, 'C24', '盒装拉带接头错牙＞2.0mm', 'pack pack c'),
(163, 'C25', '盒装无内衬，或内衬纸残缺', 'pack pack c'),
(164, 'C26', '盒装明显擦花', 'pack pack c'),
(165, 'C27', '盒装有长度＞3mm的污渍', 'pack pack c'),
(166, 'C28', '盒装色差明显', 'pack pack c'),
(167, 'C29', '盒装表面＞2.0mm不洁', 'pack pack c'),
(168, 'C30', '盒装表面破损', 'pack pack c'),
(169, 'C31', '盒装透明纸＞20mm水雾', 'pack pack c'),
(170, 'C32', '盒装透明纸明显变色', 'pack pack c'),
(171, 'C33', '盒装透明纸松散', 'pack pack c'),
(172, 'C34', '盒装透明纸褶皱明显', 'pack pack c'),
(173, 'C35', '盒装透明纸过紧变形', 'pack pack c'),
(174, 'A1', 'A类缺陷代码', 'pack mark a'),
(175, 'A2', 'BA01', 'pack mark a'),
(176, 'A3', 'BA02', 'pack mark a'),
(177, 'A4', 'BA03', 'pack mark a'),
(178, 'A5', 'BA04', 'pack mark a'),
(179, 'A6', 'BA05', 'pack mark a'),
(180, 'A7', 'BA06', 'pack mark a'),
(181, 'A8', 'BA07', 'pack mark a'),
(182, 'A9', 'BA08', 'pack mark a'),
(183, 'A10', 'BA09', 'pack mark a'),
(184, 'A11', 'BA10', 'pack mark a'),
(185, 'A12', 'BA11', 'pack mark a'),
(186, 'A13', 'BA12', 'pack mark a'),
(187, 'B1', 'BB01', 'pack mark b'),
(188, 'B2', 'BB02', 'pack mark b'),
(189, 'B3', 'BB03', 'pack mark b'),
(190, 'B4', 'BB04', 'pack mark b'),
(191, 'B5', 'BB05', 'pack mark b'),
(192, 'B6', 'BB06', 'pack mark b'),
(193, 'B7', 'BB07', 'pack mark b'),
(194, 'B8', 'BB08', 'pack mark b'),
(195, 'B9', 'B类缺陷代码', 'pack mark b'),
(196, 'A1', '明显异味', 'sleeve a'),
(197, 'A2', '条包、条盒出现多装', 'sleeve a'),
(198, 'A3', '条包、条盒出现少装', 'sleeve a'),
(199, 'A4', '条包、条盒出现错装', 'sleeve a'),
(200, 'B1', '反包', 'sleeve b'),
(201, 'B2', '条内小盒倒装', 'sleeve b'),
(202, 'B3', '条内物资受损', 'sleeve b'),
(203, 'B4', '条盒拉带不完整', 'sleeve b'),
(204, 'B5', '条盒无可追溯性标识', 'sleeve b'),
(205, 'B6', '条盒无拉带', 'sleeve b'),
(206, 'B7', '条盒无胶', 'sleeve b'),
(207, 'B8', '条盒无透明纸', 'sleeve b'),
(208, 'B9', '条盒表面≥2mm擦花掉色', 'sleeve b'),
(209, 'B10', '条盒被挤压变形', 'sleeve b'),
(210, 'B11', '条盒透明纸破、漏底', 'sleeve b'),
(211, 'B12', '破损≥3mm', 'sleeve b'),
(212, 'B13', '破损＜3mm但多于两处', 'sleeve b'),
(213, 'C1', '加贴标签多张', 'sleeve c'),
(214, 'C2', '加贴标签粘贴不正', 'sleeve c'),
(215, 'C3', '加贴标签翘边三分之一', 'sleeve c'),
(216, 'C4', '条内有杂物', 'sleeve c'),
(217, 'C5', '条内物资因粘连而破损', 'sleeve c'),
(218, 'C6', '条盒包装歪斜', 'sleeve c'),
(219, 'C7', '条盒拉带位置不正确', 'sleeve c'),
(220, 'C8', '条盒拉带后散玻', 'sleeve c'),
(221, 'C9', '条盒拉带头反叠', 'sleeve c'),
(222, 'C10', '条盒拉带拉不开', 'sleeve c'),
(223, 'C11', '条盒拉带拉断', 'sleeve c'),
(224, 'C12', '条盒拉带接头错牙＞2mm', 'sleeve c'),
(225, 'C13', '条盒有不能展平的折痕', 'sleeve c'),
(226, 'C14', '条盒粘贴不牢，容易散开', 'sleeve c'),
(227, 'C15', '条盒透明纸明显折皱', 'sleeve c'),
(228, 'C16', '条装表面≥3 mm污点', 'sleeve c'),
(229, 'C17', '条装表面污点＜3 mm多于两点', 'sleeve c'),
(230, 'C18', '条透明纸松散', 'sleeve c'),
(231, 'C19', '条透明纸破损', 'sleeve c'),
(232, 'C20', '追溯性标识不完整', 'sleeve c'),
(233, 'C21', '透明纸＞20mm水雾', 'sleeve c'),
(234, 'A1', '箱内明显异味', 'box box a'),
(235, 'A2', '箱内烟条出现多装', 'box box a'),
(236, 'A3', '箱内烟条出现少装', 'box box a'),
(237, 'A4', '箱内烟条出现错装', 'box box a'),
(238, 'B1', '摇盖合拢错位超过15mm', 'box box b'),
(239, 'B2', '无产品质量合格标识', 'box box b'),
(240, 'B3', '箱体内有杂物', 'box box b'),
(241, 'B4', '箱体包装不完整', 'box box b'),
(242, 'B5', '箱体包装不牢固', 'box box b'),
(243, 'B6', '箱体无封箱胶带', 'box box b'),
(244, 'B7', '箱内物料粘连或破损', 'box box b'),
(245, 'B8', '箱装严重触皱', 'box box b'),
(246, 'B9', '箱装破损40㎜', 'box box b'),
(247, 'B10', '箱装破损使箱内物资受损', 'box box b'),
(248, 'B11', '箱装脏污（需更换）', 'box box b'),
(249, 'C1', '封箱胶带破损', 'box box c'),
(250, 'C2', '烟条排列方向不一致', 'box box c'),
(251, 'C3', '箱体摇盖翘边，封口不牢固', 'box box c'),
(252, 'C4', '箱体胶带两侧延长＞90mm', 'box box c'),
(253, 'C5', '箱装不洁', 'box box c'),
(254, 'C6', '胶带有接头', 'box box c'),
(255, 'C7', '胶带有断裂', 'box box c'),
(256, 'C8', '胶带粘贴不平整、居中', 'box box c'),
(257, 'C9', '胶带重贴', 'box box c'),
(258, 'A1', 'A类缺陷代码', 'box code a'),
(259, 'A2', 'BA01', 'box code a'),
(260, 'A3', 'BA02', 'box code a'),
(261, 'A4', 'BA03', 'box code a'),
(262, 'A5', 'BA04', 'box code a'),
(263, 'A6', 'BA05', 'box code a'),
(264, 'A7', 'BA06', 'box code a'),
(265, 'A8', 'BA07', 'box code a'),
(266, 'A9', 'BA08', 'box code a'),
(267, 'A10', 'BA09', 'box code a'),
(268, 'A11', 'BA10', 'box code a'),
(269, 'A12', 'BA11', 'box code a'),
(270, 'A13', 'BA12', 'box code a'),
(271, 'B1', 'BB01', 'box code b'),
(272, 'B2', 'BB02', 'box code b'),
(273, 'B3', 'BB03', 'box code b'),
(274, 'B4', 'BB04', 'box code b'),
(275, 'B5', 'BB05', 'box code b'),
(276, 'B6', 'BB06', 'box code b'),
(277, 'B7', 'BB07', 'box code b'),
(278, 'B8', 'BB08', 'box code b'),
(279, 'B9', 'B类缺陷代码', 'box code b');

-- --------------------------------------------------------

--
-- Table structure for table `formulas`
--

DROP TABLE IF EXISTS `formulas`;
CREATE TABLE IF NOT EXISTS `formulas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `l_outlow` varchar(500) CHARACTER SET gbk NOT NULL,
  `l_outhigh` varchar(500) CHARACTER SET gbk NOT NULL,
  `l_inspec` varchar(500) CHARACTER SET gbk NOT NULL,
  `c_outlow` varchar(500) CHARACTER SET gbk NOT NULL,
  `c_outhigh` varchar(500) CHARACTER SET gbk NOT NULL,
  `c_inspec` varchar(500) CHARACTER SET gbk NOT NULL,
  `w_outlow` varchar(500) CHARACTER SET gbk NOT NULL,
  `w_outhigh` varchar(500) CHARACTER SET gbk NOT NULL,
  `w_inspec` varchar(500) CHARACTER SET gbk NOT NULL,
  `p_outlow` varchar(500) CHARACTER SET gbk NOT NULL,
  `p_outhigh` varchar(500) CHARACTER SET gbk NOT NULL,
  `p_inspec` varchar(500) CHARACTER SET gbk NOT NULL,
  `m_outlow` varchar(500) CHARACTER SET gbk NOT NULL,
  `m_outhigh` varchar(500) CHARACTER SET gbk NOT NULL,
  `m_inspec` varchar(500) CHARACTER SET gbk NOT NULL,
  `m_2inspec` varchar(500) CHARACTER SET gbk NOT NULL,
  `r_batch_score` varchar(500) CHARACTER SET gbk NOT NULL,
  `r_batch_quality` varchar(500) CHARACTER SET gbk NOT NULL,
  `w_batch_score` varchar(500) CHARACTER SET gbk NOT NULL,
  `w_batch_quality` varchar(500) CHARACTER SET gbk NOT NULL,
  `c_batch_score` varchar(500) CHARACTER SET gbk NOT NULL,
  `c_batch_quality` varchar(500) CHARACTER SET gbk NOT NULL,
  `s_batch_score` varchar(500) CHARACTER SET gbk NOT NULL,
  `s_batch_quality` varchar(500) CHARACTER SET gbk NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `formulas`
--

INSERT INTO `formulas` (`id`, `l_outlow`, `l_outhigh`, `l_inspec`, `c_outlow`, `c_outhigh`, `c_inspec`, `w_outlow`, `w_outhigh`, `w_inspec`, `p_outlow`, `p_outhigh`, `p_inspec`, `m_outlow`, `m_outhigh`, `m_inspec`, `m_2inspec`, `r_batch_score`, `r_batch_quality`, `w_batch_score`, `w_batch_quality`, `c_batch_score`, `c_batch_quality`, `s_batch_score`, `s_batch_quality`) VALUES
(1, '=COUNTIF(B1:B10,"<"&S1)', '=COUNTIF(B1:B10,">"&S2)', '=COUNTIF(B1:B10,">="&S1) - COUNTIF(B1:B10,">"&S2)', '=COUNTIF(C1:C10,"<"&S3)', '=COUNTIF(C1:C10,">"&S4)', '=COUNTIF(C1:C10,">="&S3) - COUNTIF(C1:C10,">"&S4)', '=COUNTIF(D1:D10,"<"&S5)', '=COUNTIF(D1:D10,">"&S6)', '=COUNTIF(D1:D10,">="&S5) - COUNTIF(D1:D10,">"&S6)', '=COUNTIF(E1:E10,"<"&S7)', '=COUNTIF(E1:E10,">"&S8)', '=COUNTIF(E1:E10,">="&S7) - COUNTIF(E1:E10,">"&S8)', '=COUNTIF(F1:F8,"<"&S9)', '=COUNTIF(F1:F8,">"&S10)', '=COUNTIF(F1:F8,">="&S9) - COUNTIF(F1:F8,">"&S10)', '=COUNTIF(F1:F8,">="&(S9-0.5))-COUNTIF(F1:F8,">="&S9)+COUNTIF(F1:F8,">"&S10)-COUNTIF(F1:F8,">"&(S10+0.5))', '=100-(A1+A2)*0.5-(A4+A5)*0.4-(A7+A8)*0.3-A13*0.4-A16*0.5-(A10+A11)*1+(IF(A14="","",IF(A14<S11,-4,IF(A14>=((S11+S12)/2),IF(A14<S12,-1,0),-2))))+(IF(A15="","",IF(A15<S13,-5,IF(A15>=((S14-13)/2),IF(A15<S14,-2,0),-4))))', '=IF(OR(A17<85,(A1+A2)>6,(A4+A5)>6,(A7+A8)>6,A13>S16,(A1+A2+A4+A5+A7+A8+A13)>13,A16>S15,A14<(S11-10),A15<(S13-10)),"不合格","合格")', '=100-A18*0.2-A19*0.5-A20*0.2-A21*0.5-A22*1-A23*0.5-A24*0.2-A25*0.2-A26*0.2-A27*0.5-A28*0.5-A29*1-A30*1-A31*0.5', '=IF(OR(A32<96,(A18+A20+A24+A25+A26)>8,(A19+A21+A23+A27+A28+A31)>6,(A18+A19+A20+A21+A22+A23+A24+A25+A26+A27+A28+A29+A30+A31)>9),"不合格","合格")', '=100-A33*0.5-A34*0.5-A35*1-A36*0.2-A37*0.5-A38*0.5-A39*1', '=IF(OR(A40<90),"不合格","合格")', '=100-A41*0.2-A42*0.5-A43*1-A44*0.5-A45*1-A46*1-(A49+A48)*0.5+IF(OR(A47="生 霉",A47="虫 蛀"),-60,0)', '=IF(OR(A52<85,A50<4,AND(A50=4,A51<3)),"不合格","合格")');

-- --------------------------------------------------------

--
-- Table structure for table `names`
--

DROP TABLE IF EXISTS `names`;
CREATE TABLE IF NOT EXISTS `names` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `inspector` text CHARACTER SET gbk NOT NULL,
  `name` text CHARACTER SET gbk NOT NULL,
  `incharge` text CHARACTER SET gbk NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COMMENT='names of persons, each line one name' AUTO_INCREMENT=2 ;

--
-- Dumping data for table `names`
--

INSERT INTO `names` (`id`, `inspector`, `name`, `incharge`) VALUES
(1, '李静\n曾燕\n张科\n卿萍\n黄锦萱\n见备注', '1 刘浩\n2 刘长勇\n3 李秋月\n4 陈寒竹\n5 陈小霞\n6 陈艳\n7 刁萍\n8 何民霞\n9 何婷\n10 李静\n11 李俊\n12 李瑶\n13 廖婷婷\n14 刘万春\n15 吕琴\n16 潘大锐\n17 唐晓蓉\n18 王雪梅\n19 魏小丽\n20 徐春霞\n21 曾春阳\n22 李军\n23 宋杨\n24 邹泽兰\n25 陈欢\n26 李凤妮\n27 李佳\n28 李娟\n29 廖俊红\n30 王国威', '张科\n曾燕\n李静');

-- --------------------------------------------------------

--
-- Table structure for table `packDefects`
--

DROP TABLE IF EXISTS `packDefects`;
CREATE TABLE IF NOT EXISTS `packDefects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `product` varchar(20) NOT NULL,
  `sample` varchar(5) NOT NULL,
  `score` varchar(4) NOT NULL,
  `inspector` varchar(4) NOT NULL,
  `remarks` varchar(200) NOT NULL,
  `pjob` varchar(4) NOT NULL,
  `judge` varchar(4) NOT NULL,
  `premarks` varchar(200) NOT NULL,
  `ppd1` varchar(4) NOT NULL,
  `ppd2` varchar(4) NOT NULL,
  `ppd3` varchar(4) NOT NULL,
  `ppd1_nr` varchar(4) NOT NULL,
  `ppd2_nr` varchar(4) NOT NULL,
  `ppd3_nr` varchar(4) NOT NULL,
  `pm1` varchar(4) NOT NULL,
  `pm2` varchar(4) NOT NULL,
  `pm3` varchar(4) NOT NULL,
  `pm1_nr` varchar(4) NOT NULL,
  `pm2_nr` varchar(4) NOT NULL,
  `pm3_nr` varchar(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=gbk AUTO_INCREMENT=2 ;

--
-- Dumping data for table `packDefects`
--

INSERT INTO `packDefects` (`id`, `date`, `product`, `sample`, `score`, `inspector`, `remarks`, `pjob`, `judge`, `premarks`, `ppd1`, `ppd2`, `ppd3`, `ppd1_nr`, `ppd2_nr`, `ppd3_nr`, `pm1`, `pm2`, `pm3`, `pm1_nr`, `pm2_nr`, `pm3_nr`) VALUES
(1, '2016-11-17 11:30:56', '长城（3号）', '2', '', '卿萍', '', '0015', '', '', 'A1', '0', '0', '2', '', '', 'A2', 'A5', '0', '1', '1', '');

-- --------------------------------------------------------

--
-- Table structure for table `rolling`
--

DROP TABLE IF EXISTS `rolling`;
CREATE TABLE IF NOT EXISTS `rolling` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `product` varchar(20) NOT NULL,
  `name` varchar(10) NOT NULL,
  `l1` varchar(4) NOT NULL,
  `l2` varchar(4) NOT NULL,
  `l3` varchar(4) NOT NULL,
  `l4` varchar(4) NOT NULL,
  `l5` varchar(4) NOT NULL,
  `l6` varchar(4) NOT NULL,
  `l7` varchar(4) NOT NULL,
  `l8` varchar(4) NOT NULL,
  `l9` varchar(4) NOT NULL,
  `l10` varchar(4) NOT NULL,
  `c1` varchar(4) NOT NULL,
  `c2` varchar(4) NOT NULL,
  `c3` varchar(4) NOT NULL,
  `c4` varchar(4) NOT NULL,
  `c5` varchar(4) NOT NULL,
  `c6` varchar(4) NOT NULL,
  `c7` varchar(4) NOT NULL,
  `c8` varchar(4) NOT NULL,
  `c9` varchar(4) NOT NULL,
  `c10` varchar(4) NOT NULL,
  `w1` varchar(4) NOT NULL,
  `w2` varchar(4) NOT NULL,
  `w3` varchar(4) NOT NULL,
  `w4` varchar(4) NOT NULL,
  `w5` varchar(4) NOT NULL,
  `w6` varchar(4) NOT NULL,
  `w7` varchar(4) NOT NULL,
  `w8` varchar(4) NOT NULL,
  `w9` varchar(4) NOT NULL,
  `w10` varchar(4) NOT NULL,
  `p1` varchar(4) NOT NULL,
  `p2` varchar(4) NOT NULL,
  `p3` varchar(4) NOT NULL,
  `p4` varchar(4) NOT NULL,
  `p5` varchar(4) NOT NULL,
  `p6` varchar(4) NOT NULL,
  `p7` varchar(4) NOT NULL,
  `p8` varchar(4) NOT NULL,
  `p9` varchar(4) NOT NULL,
  `p10` varchar(4) NOT NULL,
  `surfout` varchar(4) NOT NULL,
  `tightout` varchar(4) NOT NULL,
  `blendacc` varchar(4) NOT NULL,
  `pdacc` varchar(4) NOT NULL,
  `score` varchar(5) NOT NULL,
  `quality` varchar(5) NOT NULL,
  `inspector` varchar(10) NOT NULL,
  `remarks` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=gbk AUTO_INCREMENT=9 ;

--
-- Dumping data for table `rolling`
--

INSERT INTO `rolling` (`id`, `date`, `product`, `name`, `l1`, `l2`, `l3`, `l4`, `l5`, `l6`, `l7`, `l8`, `l9`, `l10`, `c1`, `c2`, `c3`, `c4`, `c5`, `c6`, `c7`, `c8`, `c9`, `c10`, `w1`, `w2`, `w3`, `w4`, `w5`, `w6`, `w7`, `w8`, `w9`, `w10`, `p1`, `p2`, `p3`, `p4`, `p5`, `p6`, `p7`, `p8`, `p9`, `p10`, `surfout`, `tightout`, `blendacc`, `pdacc`, `score`, `quality`, `inspector`, `remarks`) VALUES
(4, '2016-12-02 15:00:00', '试验', '1 刘浩', '79', '79.5', '77', '82', '79', '80', '81', '79', '82', '80', '12.4', '13.1', '13.8', '13.2', '15', '14.2', '13.8', '14.9', '13.6', '14', '8.7', '7.9', '8.3', '8.4', '10.1', '7.7', '9.7', '8', '9.1', '10.3', '85', '89', '78', '91', '104', '92', '83', '89', '98', '101', '5', '2', '88', '89', '90.3', '不合格', '卿萍', '7'),
(5, '2016-12-02 15:00:00', '长城（生肖版）', '', '150', '149.', '150.', '149.', '150.', '150', '150.', '149.', '149.', '150.', '50', '49.7', '49.8', '49.8', '50', '50.2', '50.1', '50', '49.9', '49.8', '8', '8.5', '8.9', '9.2', '9.5', '9.4', '9', '9.1', '10', '9.3', '60', '65', '70', '68', '69', '85', '89', '79', '77', '84', '0', '3', '88', '100', '86.5', '不合格', '卿萍', ''),
(6, '2016-12-02 15:00:00', '试验', '1 刘浩', '80', '80.7', '79.1', '80.1', '80.3', '79', '80.1', '79.5', '79.8', '80', '15.3', '14.8', '13.8', '13', '14.8', '13.5', '13.9', '14.1', '15.4', '14', '10.1', '11', '8.4', '8.9', '9.2', '7.8', '8', '8.3', '9.1', '10', '105', '94', '101', '84', '99', '101', '78', '104', '84', '91', '2', '4', '79', '87', '91.3', '不合格', '曾燕', ''),
(7, '2016-12-02 15:00:00', '试验', '1 刘浩', '78.1', '77.3', '80.1', '81', '80.2', '81.1', '81', '80.5', '80', '80.3', '14.7', '13.5', '14', '14.5', '14.3', '13.8', '14.2', '15.1', '15.2', '14.5', '8.3', '8.5', '8.6', '9.1', '7.9', '8.1', '8.7', '9.2', '8.3', '8.4', '89', '88', '106', '99', '112', '92', '95', '87', '109', '101', '1', '5', '87', '92', '91.3', '不合格', '', ''),
(8, '2016-12-02 15:00:00', '长城（3号）', '1 刘浩', '81', '80', '79', '80.7', '80.3', '80', '80.2', '79.8', '79.9', '80.4', '12.5', '13', '12', '14.9', '13', '13.7', '15.1', '13.1', '13.3', '14', '8.3', '8.7', '8.1', '8.4', '9.4', '8.9', '9.4', '10.1', '9.4', '9.9', '114', '101', '113', '110', '78', '104', '119', '102', '115', '110', '4', '5', '83', '90', '76.4', '不合格', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `specs`
--

DROP TABLE IF EXISTS `specs`;
CREATE TABLE IF NOT EXISTS `specs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `pid` varchar(4) NOT NULL DEFAULT '-1',
  `start` datetime NOT NULL,
  `end` datetime NOT NULL DEFAULT '3000-01-01 00:00:00',
  `name` varchar(20) NOT NULL,
  `nr` varchar(30) NOT NULL,
  `rol_l_min` varchar(4) NOT NULL,
  `rol_l_max` varchar(4) NOT NULL,
  `rol_c_min` varchar(4) NOT NULL,
  `rol_c_max` varchar(4) NOT NULL,
  `rol_w_min` varchar(4) NOT NULL,
  `rol_w_max` varchar(4) NOT NULL,
  `rol_p_min` varchar(4) NOT NULL,
  `rol_p_max` varchar(4) NOT NULL,
  `rol_surfout` varchar(4) NOT NULL,
  `rol_tightout` varchar(4) NOT NULL,
  `rol_blendacc_min` varchar(4) NOT NULL,
  `rol_blendacc_max` varchar(4) NOT NULL,
  `rol_pdacc_min` varchar(4) NOT NULL,
  `rol_pdacc_max` varchar(4) NOT NULL,
  `moist_s_min` varchar(4) NOT NULL,
  `moist_s_max` varchar(4) NOT NULL,
  `weight_w_min` varchar(4) NOT NULL,
  `weight_w_max` varchar(4) NOT NULL,
  `moist_w_min` varchar(4) NOT NULL,
  `moist_w_max` varchar(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=gbk AUTO_INCREMENT=73 ;

--
-- Dumping data for table `specs`
--

INSERT INTO `specs` (`id`, `date`, `pid`, `start`, `end`, `name`, `nr`, `rol_l_min`, `rol_l_max`, `rol_c_min`, `rol_c_max`, `rol_w_min`, `rol_w_max`, `rol_p_min`, `rol_p_max`, `rol_surfout`, `rol_tightout`, `rol_blendacc_min`, `rol_blendacc_max`, `rol_pdacc_min`, `rol_pdacc_max`, `moist_s_min`, `moist_s_max`, `weight_w_min`, `weight_w_max`, `moist_w_min`, `moist_w_max`) VALUES
(33, '2016-11-27 13:54:33', '33', '2016-11-27 14:54:01', '3000-01-01 00:00:00', '长城（2号）', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(34, '2016-11-27 13:54:50', '34', '2016-11-27 14:54:01', '3000-01-01 00:00:00', '长城（3号）', 'check specs!!!', '149', '150', '49', '50', '8.5', '9.5', '60', '80', '6', '6', '80', '90', '85', '95', '13', '14', '', '', '', ''),
(35, '2016-11-27 13:55:03', '35', '2016-11-27 14:54:01', '3000-01-01 00:00:00', '长城（经典2号）', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(36, '2016-11-27 13:55:19', '36', '2016-11-27 14:54:01', '3000-01-01 00:00:00', '长城（经典3号）', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(38, '2016-11-27 13:55:45', '38', '2016-11-27 14:54:01', '3000-01-01 00:00:00', '长城（传奇3号）', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(39, '2016-11-27 13:56:00', '39', '2016-11-27 14:54:01', '3000-01-01 00:00:00', '长城（导师2号）', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(40, '2016-11-27 13:56:14', '40', '2016-11-27 14:54:01', '3000-01-01 00:00:00', '长城（导师3号）', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(41, '2016-11-27 13:56:28', '41', '2016-11-27 14:54:01', '3000-01-01 00:00:00', '长城（盛世3号）', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(42, '2016-11-27 13:56:40', '42', '2016-11-27 14:54:01', '3000-01-01 00:00:00', '长城（盛世5号）', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(43, '2016-11-27 13:56:52', '43', '2016-11-27 14:54:01', '3000-01-01 00:00:00', '长城（盛世6号）', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(44, '2016-11-27 13:57:05', '44', '2016-11-27 14:54:01', '3000-01-01 00:00:00', '长城（132秘制）', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(45, '2016-11-27 13:57:17', '45', '2016-11-27 14:54:01', '3000-01-01 00:00:00', '长城（传奇1号）', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(47, '2016-11-27 13:57:42', '47', '2016-11-27 14:54:01', '3000-01-01 00:00:00', '长城（传奇1918）', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(50, '2016-11-27 13:58:20', '50', '2016-11-27 14:54:01', '3000-01-01 00:00:00', '长城（大号铝管5支）', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(51, '2016-11-27 13:58:34', '51', '2016-11-27 14:54:01', '3000-01-01 00:00:00', '长城（揽胜2号精选）', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(52, '2016-11-27 13:58:46', '52', '2016-11-27 14:54:01', '3000-01-01 00:00:00', '长城（揽胜2号经典）', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(53, '2016-11-27 13:58:57', '53', '2016-11-27 14:54:01', '3000-01-01 00:00:00', '长城（汇通天下2号）', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(54, '2016-11-27 13:59:11', '54', '2016-11-27 14:54:01', '3000-01-01 00:00:00', '长城（10支汉邦1号）', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(55, '2016-11-27 13:59:26', '55', '2016-11-27 14:54:01', '3000-01-01 00:00:00', '长城（20支汉邦2号）', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(56, '2016-11-27 13:59:40', '56', '2016-11-27 14:54:01', '2016-12-01 16:50:53', '长城（红色132）', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(57, '2016-11-27 13:59:53', '57', '2016-11-27 14:54:01', '2016-12-01 16:46:17', '长城（生肖版）', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(58, '2016-11-27 14:00:18', '58', '2016-11-27 14:54:01', '2016-11-28 12:59:41', '试验', '', '', '', '', '', '', '', '', '', '6', '6', '80', '90', '85', '95', '', '', '', '', '', ''),
(59, '2016-11-28 12:59:42', '58', '2016-11-28 12:59:42', '2016-12-02 11:42:10', '试验', '', '78', '82', '12', '15', '8', '10', '80', '110', '6', '6', '80', '90', '85', '95', '12', '15', '', '', '', ''),
(60, '2016-12-01 16:46:17', '57', '2016-12-01 16:46:17', '2016-12-01 16:55:44', '长城（生肖版）', '2016003', '134', '136', '65', '67', '13.5', '15.5', '30', '90', '0', '0', '', '95', '', '90', '12.5', '14', '', '', '', ''),
(61, '2016-12-01 16:50:53', '56', '2016-12-01 16:50:53', '2016-12-01 16:52:59', '长城（红色132）', '2016003', '89', '91', '52.4', '54.4', '6.2', '7.2', '50', '110', '0', '0', '', '95', '', '90', '12.5', '14', '', '', '', ''),
(62, '2016-12-01 16:52:59', '56', '2016-12-01 16:52:59', '2016-12-02 11:41:35', '长城（红色132）', 'QJ/08J.0CC4660A-2016001', '89', '91', '52.4', '54.4', '6.2', '7.2', '50', '110', '0', '0', '', '95', '', '90', '12.5', '14', '', '', '', ''),
(63, '2016-12-01 16:55:44', '57', '2016-12-01 16:55:44', '2016-12-02 11:41:09', '长城（生肖版）', 'QJ/08J.0CC4180A-2016001', '134', '136', '65', '67', '13.5', '15.5', '30', '90', '0', '0', '', '95', '', '90', '12.5', '14', '', '', '', ''),
(65, '2016-12-02 11:41:09', '57', '2016-12-02 11:41:09', '2016-12-06 12:04:13', '长城（生肖版）', 'QJ/08J.0CC4180A-2016001', '134', '136', '65', '67', '13.5', '15.5', '30', '90', '6', '6', '85', '95', '80', '90', '12.5', '14', '', '', '', ''),
(66, '2016-12-02 11:41:35', '56', '2016-12-02 11:41:35', '2016-12-06 12:03:57', '长城（红色132）', 'QJ/08J.0CC4660A-2016001', '89', '91', '52.4', '54.4', '6.2', '7.2', '50', '110', '6', '6', '85', '95', '80', '90', '12.5', '14', '', '', '', ''),
(67, '2016-12-02 11:42:10', '58', '2016-12-02 11:42:10', '2016-12-06 12:02:26', '试验', '', '78', '82', '12', '15', '8', '10', '80', '110', '6', '6', '80', '90', '85', '95', '12', '15', '', '', '', ''),
(68, '2016-12-05 11:32:39', '68', '2016-12-05 11:32:39', '2016-12-06 12:03:34', '长城（胜利）', 'QJ/08J.0CC4850A-2016001', '151', '153', '65', '67', '16.4', '16.6', '15', '85', '', '', '', '', '', '', '12.5', '14', '', '', '', ''),
(69, '2016-12-06 12:02:26', '58', '2016-12-06 12:02:26', '3000-01-01 00:00:00', '试验', '', '78', '82', '12', '15', '8', '10', '80', '110', '6', '6', '80', '90', '85', '95', '12', '15', '8', '10', '12', '15'),
(70, '2016-12-06 12:03:34', '68', '2016-12-06 12:03:34', '3000-01-01 00:00:00', '长城（胜利）', 'QJ/08J.0CC4850A-2016001', '151', '153', '65', '67', '16.4', '16.6', '15', '85', '6', '6', '85', '95', '80', '90', '12.5', '14', '16.4', '16.6', '12.5', '14'),
(71, '2016-12-06 12:03:57', '56', '2016-12-06 12:03:57', '3000-01-01 00:00:00', '长城（红色132）', 'QJ/08J.0CC4660A-2016001', '89', '91', '52.4', '54.4', '6.2', '7.2', '50', '110', '6', '6', '85', '95', '80', '90', '12.5', '14', '6.2', '7.2', '12.5', '14'),
(72, '2016-12-06 12:04:14', '57', '2016-12-06 12:04:14', '3000-01-01 00:00:00', '长城（生肖版）', 'QJ/08J.0CC4180A-2016001', '134', '136', '65', '67', '13.5', '15.5', '30', '90', '6', '6', '85', '95', '80', '90', '12.5', '14', '13.5', '15.5', '12.5', '14');

-- --------------------------------------------------------

--
-- Table structure for table `stickDefects`
--

DROP TABLE IF EXISTS `stickDefects`;
CREATE TABLE IF NOT EXISTS `stickDefects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `product` varchar(20) NOT NULL,
  `sample` varchar(5) NOT NULL,
  `score` varchar(4) NOT NULL,
  `inspector` varchar(4) NOT NULL,
  `remarks` varchar(200) NOT NULL,
  `sjob` varchar(4) NOT NULL,
  `judge` varchar(4) NOT NULL,
  `sremarks` varchar(200) NOT NULL,
  `srd1` varchar(4) NOT NULL,
  `srd2` varchar(4) NOT NULL,
  `srd3` varchar(4) NOT NULL,
  `srd1_nr` varchar(4) NOT NULL,
  `srd2_nr` varchar(4) NOT NULL,
  `srd3_nr` varchar(4) NOT NULL,
  `scd1` varchar(4) NOT NULL,
  `scd2` varchar(4) NOT NULL,
  `scd3` varchar(4) NOT NULL,
  `scd1_nr` varchar(4) NOT NULL,
  `scd2_nr` varchar(4) NOT NULL,
  `scd3_nr` varchar(4) NOT NULL,
  `ssd1` varchar(4) NOT NULL,
  `ssd2` varchar(4) NOT NULL,
  `ssd3` varchar(4) NOT NULL,
  `ssd1_nr` varchar(4) NOT NULL,
  `ssd2_nr` varchar(4) NOT NULL,
  `ssd3_nr` varchar(4) NOT NULL,
  `spd1` varchar(4) NOT NULL,
  `spd2` varchar(4) NOT NULL,
  `spd3` varchar(4) NOT NULL,
  `spd1_nr` varchar(4) NOT NULL,
  `spd2_nr` varchar(4) NOT NULL,
  `spd3_nr` varchar(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=gbk AUTO_INCREMENT=2 ;

--
-- Dumping data for table `stickDefects`
--

INSERT INTO `stickDefects` (`id`, `date`, `product`, `sample`, `score`, `inspector`, `remarks`, `sjob`, `judge`, `sremarks`, `srd1`, `srd2`, `srd3`, `srd1_nr`, `srd2_nr`, `srd3_nr`, `scd1`, `scd2`, `scd3`, `scd1_nr`, `scd2_nr`, `scd3_nr`, `ssd1`, `ssd2`, `ssd3`, `ssd1_nr`, `ssd2_nr`, `ssd3_nr`, `spd1`, `spd2`, `spd3`, `spd1_nr`, `spd2_nr`, `spd3_nr`) VALUES
(1, '2016-11-17 11:30:56', '长城（3号）', '2', '', '卿萍', '', '0011', '', '', 'A5', '0', '0', '2', '', '', '0', '0', '0', '', '', '', 'B7', '0', '0', '1', '', '', '0', '0', '0', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `storage`
--

DROP TABLE IF EXISTS `storage`;
CREATE TABLE IF NOT EXISTS `storage` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `product` varchar(20) NOT NULL,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  `deworm` varchar(4) NOT NULL,
  `dopant` varchar(4) NOT NULL,
  `headend` varchar(4) NOT NULL,
  `empty` varchar(4) NOT NULL,
  `seam` varchar(4) NOT NULL,
  `hole` varchar(4) NOT NULL,
  `break` varchar(4) NOT NULL,
  `m1` varchar(4) NOT NULL,
  `m2` varchar(4) NOT NULL,
  `m3` varchar(4) NOT NULL,
  `m4` varchar(4) NOT NULL,
  `m5` varchar(4) NOT NULL,
  `m6` varchar(4) NOT NULL,
  `m7` varchar(4) NOT NULL,
  `m8` varchar(4) NOT NULL,
  `score` varchar(4) NOT NULL,
  `quality` varchar(5) NOT NULL,
  `inspector` varchar(10) NOT NULL,
  `incharge` varchar(10) NOT NULL,
  `remarks` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=gbk AUTO_INCREMENT=2 ;

--
-- Dumping data for table `storage`
--

INSERT INTO `storage` (`id`, `date`, `product`, `start`, `end`, `deworm`, `dopant`, `headend`, `empty`, `seam`, `hole`, `break`, `m1`, `m2`, `m3`, `m4`, `m5`, `m6`, `m7`, `m8`, `score`, `quality`, `inspector`, `incharge`, `remarks`) VALUES
(1, '2016-11-29 00:00:00', '长城（3号）', '2016-11-01 00:00:00', '2016-11-20 00:00:00', '2', '0', '0 ', '0', '1', '1', '0', '13', '13.5', '12.9', '14', '13.2', '13.3', '12.7', '13.1', '#VAL', '不合格', '---', '', '');

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
(2, '2016-12-06 12:05:39', '10.164.115.146', 19, 'leyen', 'Arie', 0, 0, 1, 0, 0),
(3, '2016-12-05 11:32:32', '10.164.117.20', 1, '963852', 'alex', 1, 1, 0, 0, 1),
(6, '2016-11-21 11:27:33', '', 0, '132132', 'Gao San', 1, 1, 0, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `wrapping`
--

DROP TABLE IF EXISTS `wrapping`;
CREATE TABLE IF NOT EXISTS `wrapping` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `product` varchar(20) NOT NULL,
  `name` varchar(10) NOT NULL,
  `w1` varchar(4) NOT NULL,
  `w2` varchar(4) NOT NULL,
  `w3` varchar(4) NOT NULL,
  `w4` varchar(4) NOT NULL,
  `w5` varchar(4) NOT NULL,
  `w6` varchar(4) NOT NULL,
  `w7` varchar(4) NOT NULL,
  `w8` varchar(4) NOT NULL,
  `w9` varchar(4) NOT NULL,
  `w10` varchar(4) NOT NULL,
  `m1` varchar(4) NOT NULL,
  `m2` varchar(4) NOT NULL,
  `m3` varchar(4) NOT NULL,
  `m4` varchar(4) NOT NULL,
  `m5` varchar(4) NOT NULL,
  `m6` varchar(4) NOT NULL,
  `m7` varchar(4) NOT NULL,
  `m8` varchar(4) NOT NULL,
  `m9` varchar(4) NOT NULL,
  `m10` varchar(4) NOT NULL,
  `color` varchar(4) NOT NULL,
  `headend` varchar(4) NOT NULL,
  `wrapok` varchar(4) NOT NULL,
  `incision` varchar(4) NOT NULL,
  `empty` varchar(4) NOT NULL,
  `tightness` varchar(4) NOT NULL,
  `veins` varchar(4) NOT NULL,
  `crease` varchar(4) NOT NULL,
  `spot` varchar(4) NOT NULL,
  `blot` varchar(4) NOT NULL,
  `seam` varchar(4) NOT NULL,
  `hole` varchar(4) NOT NULL,
  `crack` varchar(4) NOT NULL,
  `splice` varchar(4) NOT NULL,
  `score` varchar(4) NOT NULL,
  `quality` varchar(4) NOT NULL,
  `inspector` varchar(4) NOT NULL,
  `remarks` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=gbk AUTO_INCREMENT=4 ;

--
-- Dumping data for table `wrapping`
--

INSERT INTO `wrapping` (`id`, `date`, `product`, `name`, `w1`, `w2`, `w3`, `w4`, `w5`, `w6`, `w7`, `w8`, `w9`, `w10`, `m1`, `m2`, `m3`, `m4`, `m5`, `m6`, `m7`, `m8`, `m9`, `m10`, `color`, `headend`, `wrapok`, `incision`, `empty`, `tightness`, `veins`, `crease`, `spot`, `blot`, `seam`, `hole`, `crack`, `splice`, `score`, `quality`, `inspector`, `remarks`) VALUES
(1, '2016-12-06 13:00:00', '试验', 's', '8.5', '8.9', '8.3', '9.1', '9.3', '8.7', '9', '9.7', '9.1', '8.7', '11.6', '12.4', '12.9', '11.7', '13.1', '12.5', '13.6', '13.8', '13.1', '12.2', '0', '0', '2', '1', '2', '0', '0', '1', '0', '1', '0', '0', '0', '0', '96.4', '合格', '李静', ''),
(2, '2016-12-06 13:00:00', '试验', '', '9.3', '9.1', '9.4', '9.2', '9.8', '10.3', '9.4', '8.2', '9.7', '9', '14.6', '14.1', '14.5', '13.8', '14.1', '12.0', '13.8', '12.5', '13', '14.6', '0', '0', '0', '0', '2', '1', '1', '1', '2', '0', '0', '0', '0', '1', '96.2', '合格', '', ''),
(3, '2016-11-16 16:39:40', '长城（3号）', '3 李秋月', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '0', '1', '0', '1', '0', '0', '0', '0', '2', '0', '0', '3', '0', '0', '95.6', '不合格', '卿萍', '');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
