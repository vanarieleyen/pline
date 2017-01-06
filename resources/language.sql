-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jan 06, 2017 at 10:36 AM
-- Server version: 5.5.52-MariaDB-1ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `gwc`
--

-- --------------------------------------------------------

--
-- Table structure for table `language`
--

DROP TABLE IF EXISTS `language`;
CREATE TABLE IF NOT EXISTS `language` (
  `index` int(11) NOT NULL,
  `chinese` varchar(120) CHARACTER SET gbk NOT NULL COMMENT 'mag absoluut geen newline inzitten!',
  `english` varchar(200) NOT NULL COMMENT 'mag absoluut geen newline inzitten!',
  UNIQUE KEY `id` (`index`),
  UNIQUE KEY `index` (`index`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 CHECKSUM=1;

--
-- Dumping data for table `language`
--

INSERT INTO `language` (`index`, `chinese`, `english`) VALUES
(0, '数据输入', 'Data Entry'),
(1, '历史数据', 'History'),
(2, '统计表', 'Charts'),
(3, 'SWWV', 'SWWV'),
(4, '机器号', 'Machine Nr'),
(5, '日期', 'Date'),
(6, '产品', 'Product'),
(7, '简述:', 'Description'),
(8, '备注', 'Remark'),
(9, '重量-双倍长(10)', 'Weight DL'),
(10, '长度-双倍长(10)', 'Length DL'),
(11, '直径', 'Diameter'),
(12, '左侧重量', 'Weight L'),
(13, '右侧重量', 'Weight R'),
(14, '左侧长度', 'Length L'),
(15, '右侧长度', 'Length R'),
(16, '左侧吸阻', 'Pressure Drop L'),
(17, '右侧吸阻', 'Pressure Drop R'),
(18, '平均左:', 'Average L'),
(19, '平均右:', 'Average R'),
(20, '规范', 'Specs'),
(21, '底限', 'Min'),
(22, '基准', 'Norm'),
(23, '上限', 'Max'),
(24, '<35%', '<35%'),
(25, '<20%', '<20%'),
(26, '>20%', '>20%'),
(27, '>35%', '>35%'),
(28, '重量左&右', 'Weight L&R'),
(29, '长度左&右', 'Length L&R'),
(30, '吸阻左&右', 'Pressure Drop L&R'),
(31, '机器', 'Machine'),
(32, '产品', 'Product'),
(33, '机器属', 'Type'),
(34, '时间', 'Time'),
(35, '开始日期', 'Start Date'),
(36, '结束日期', 'End Date'),
(37, '数据范围', 'Data Range'),
(38, '设定', 'Settings'),
(39, 'Cp', 'Cp'),
(40, 'Cpk', 'Cpk'),
(41, '检测数据录入', 'Data Entry'),
(42, '重量', 'Weight'),
(43, '平均', 'Average'),
(44, '水分%', 'Moisture %'),
(45, '打孔前吸阻', 'PD before puncture'),
(46, '打孔后吸阻', 'PD after puncture'),
(47, '吸阻差', 'False air'),
(48, '无茄衣 (只有烟胚)', 'No wrapper (only bunch)'),
(49, '茄衣有洞眼病斑污痕＞3.mm', 'Too many/too big holes > 3 mm'),
(50, '模具', 'Mould'),
(51, '茄身的茄芯不够:抽吸过程中塌陷', 'Body cigar not enough filler: collapses during smoking'),
(52, '漏卷（可见夹套宽度＞2.0mm)', 'Misrolled: binder visible'),
(53, '头部太硬: 不可抽吸', 'Head too hard: unsmokeable'),
(54, '头部太松: 不可抽吸', 'Head too loose: unsmokable'),
(55, '由于没有胶水，茄衣未卷好', 'Wrapper unroles due to no glue'),
(56, '头部破损', 'Head broken'),
(57, '烟支断残或明显压痕', 'Middle cigar broken'),
(58, '燃烧端破损，无法抽吸', 'Fire end broken unsmokable'),
(59, '由于茄芯梗而导致泄漏', 'Leakage due to stem filler'),
(60, '头部直径太小', 'Head diameter too small'),
(61, '太黑', 'Too dark'),
(62, '载体材料有压痕', 'Inprint carriermaterial'),
(63, '压力点', 'Pressure spots'),
(64, '白点', 'White spots'),
(65, '着色效果差', 'Bad painting'),
(66, '茄衣有洞眼病斑污痕＜3.mm但多于2点', 'Too many holes < 2 mm'),
(67, '茄身的茄芯不够: 但仍可抽吸', 'Body cigar not enough filler: but still smokeable'),
(68, '由于茄衣折叠而漏卷', 'Misrolled due to folded wrapper'),
(69, '可见残余物', 'Visible residue'),
(70, '茄衣表面皱纹', 'Rough overrolled wrapper'),
(71, '头部茄衣包裹不严', 'Loose flag'),
(72, '烟支空头（空陷面积＞2/3及空陷深度＞1.5mm）', 'Less filled head'),
(73, '包装过程导致烟支弯曲变形', 'Bad model; not correct shape'),
(74, '燃烧端破损', 'Fire end broken'),
(75, '茄衣开裂', 'Cracked wrapper'),
(76, '头部直径太大', 'Head diameter too big'),
(77, '剪切粗糙', 'Cutting rough'),
(78, '指环不佳', 'Bad ring'),
(79, '透明纸质量差', 'Bad cellophane'),
(80, '内衬质量差', 'Bad inlayer'),
(81, '包装质量差', 'Bad packing'),
(82, '外观检查 50支烟支(盒)', 'Visual check 50 cigars (boxes)'),
(83, '外观检查 240支烟支', 'Visual check 240 cigars'),
(84, '已检查数量：', 'Checked amount:'),
(85, 'A类缺陷', 'Defects A'),
(86, 'B类缺陷', 'Defects B'),
(87, 'A类缺陷比例合计', 'Total percentage A defects'),
(88, 'B类缺陷比例合计', 'Total percentage B defects'),
(89, '缺陷比例合计：', 'Total percentage defects:'),
(90, '盒内烟支排列：', 'Placement in box:'),
(91, '烟支外观A类缺陷', 'Visual sigar defects A'),
(92, '烟支外观B类缺陷', 'Visual sigar defects B'),
(93, '包装外观缺陷', 'Visual packing defects'),
(94, '数量', 'Amount'),
(95, '缺陷', 'Defects'),
(96, '缺陷比例合计', 'Total percentage defects'),
(97, 'A+B类缺陷比例合计', 'Total percentage A+B defects'),
(98, '烟支外观A+B类缺陷', 'Visual sigar defects A+B'),
(99, '总则: A- 不可点燃抽吸; B- 缺陷是不方便，但可以抽吸', 'General: A- is unsmokeable; B- inconvenient defect but smokeable'),
(100, '烟胚规范', 'Specs bunches'),
(101, '成品规范', 'Specs packed'),
(102, '长度', 'Length'),
(103, '头部直径', 'Head diameter'),
(104, '头部长度', 'Head length'),
(105, '分切后水分', 'Moisture after cutting'),
(106, '包装后成品水分', 'Moisture after packing'),
(107, '分切后吸阻', 'Pressuredrop after cutting'),
(108, '包装后成品吸阻', 'Pressuredrop after packing'),
(109, '包装后成品', 'Packed'),
(110, '你叫什么名字？', 'What is your name?'),
(111, '为什么要更改这？', 'Why change this?'),
(112, '新建', 'New'),
(113, '关闭', 'Close'),
(114, '旧值', 'Old value'),
(115, '新值', 'New value'),
(116, '新值有什么变化?', 'What?'),
(117, '名字', 'Name'),
(118, '左边', 'Left'),
(119, '右边', 'Right'),
(120, '动向', 'Trend'),
(121, '总次数', 'Amount'),
(122, '平均值', 'Average'),
(123, '日常行为', 'Activity'),
(124, '生产精品', 'Quality'),
(125, '总测量烟胚数', 'Measurements'),
(126, '生产阶段', 'Production Stage'),
(127, '结果', 'Conclusion'),
(128, '请停止机器，作出调整并再次测量', 'Stop the machine, make adjustments and measure again'),
(129, '首先请再测量', 'First make new measurements'),
(130, '请告知主管', 'Please inform the supervisor'),
(131, '请注意：以上仅为对烟胚质量的改进建议', 'Please note these are only suggestions for improvement'),
(132, '烟胚直径太小，请增大直径，检查头部', 'The diameter is too small, increase the diameter and check the head'),
(133, '烟胚直径太大，请缩小烟胚直径', 'The diameter is too large, decrease the diameter'),
(134, '烟胚太轻，请调整烟胚重量', 'The weight is too low, adjust the weight'),
(135, '烟胚超重，请调整重量', 'The weight is too high, adjust the weight'),
(136, '烟胚直径太小，请增大直径', 'The diameter is too small, increase the diameter.'),
(137, '烟胚直径太大，缩小直径，检查头部', 'The diameter is too large, decrease the diameter and check the head '),
(138, '烟胚的吸阻太高，检查头部，检查茄芯', 'The pressure drop is too high, check head and filler'),
(139, '烟胚的吸阻太低，检查头部，检查茄芯', 'The pressure drop is too low, check head and filler'),
(140, '复位', 'Reset'),
(141, '填充值', 'Filling power'),
(142, '1000毫升自然堆积体积', 'Filler density'),
(143, '吸阻计算的', 'Calculated PD'),
(144, '定标', 'Calibrate'),
(145, '计算', 'Calculate'),
(146, '参考吸阻', 'Pressure Drop Reference'),
(147, '形状', 'Shape'),
(148, '规定参考', 'Set Reference'),
(149, '头部', 'Head'),
(150, '燃烧端', 'Tip'),
(151, '固定', 'Fixed'),
(152, '样子', 'Model'),
(153, '可靠性', 'Reliability'),
(154, '趋势图', 'Trend'),
(155, '分布图', 'Spread'),
(156, '变差', 'Variation'),
(157, '质量', 'Quality'),
(158, '平均值', 'Average'),
(159, '打印', 'Print'),
(160, '总结', 'Summary'),
(161, '烟片规范', 'Specs filler'),
(162, '含梗及叶脉率', 'Stems'),
(163, '尺寸分布', 'Particle size'),
(164, '班', 'Shift'),
(165, '白班', 'Day Shift'),
(166, '晚班', 'Night Shift'),
(167, '白班和晚班', 'Both Shifts'),
(168, '统共', 'Total'),
(169, '时事', 'Current'),
(170, '水分', 'Moisture'),
(171, '操作工', 'Operator'),
(172, '去掉', 'Delete'),
(173, '茄芯批号', 'Filler nr'),
(174, '技术部', 'Quality dpt'),
(175, 'SW/WV', 'SW/WV'),
(176, 'MID-S', 'MID-S'),
(177, 'ACM', 'ACM'),
(178, 'REX/FL', 'REX/FL'),
(179, 'TP/RSC/ASB', 'TP/RSC/ASB'),
(180, 'FI', 'FI'),
(181, 'FL/YBT2000', 'FL/YBT2000'),
(182, 'PASSIM/logo85c', 'PASSIM/logo85c'),
(183, 'GDX2/3000', 'GDX2/3000'),
(184, '左侧开孔直径', 'Head diam L'),
(185, '右侧开孔直径', 'Head diam R'),
(186, '烟胚异味', 'Abnormal smell'),
(187, '烟胚空松', 'Empty or loose bunch'),
(188, '头部过硬', 'Head too hard'),
(189, '头部过松', 'Head too soft'),
(190, '开孔直径过小', 'Head diameter to small'),
(191, '烟胚刮破＞2.0mm', 'Bunch with holes >2mm'),
(192, '烟胚压痕过深', 'Too deep pressure spots'),
(193, '烟胚弯曲变形', 'Bunch out of shape'),
(194, '烟胚不均匀饱满或竹节烟', 'Unevenly filled bunch'),
(195, '烟胚刮破孔＜2.0mm但较多', 'Too many small holes<2mm'),
(196, '烟胚搭口面烫焦变色', 'Burned, dark colored overlap'),
(197, '搭口翘边明显隙缝', 'Overlap not properly glued (gaps)'),
(198, '烟胚成椭圆形', 'Oval bunch'),
(199, '开孔直径过大', 'Head diameter too large'),
(200, '端部切口斜面高低差＞1.0mm', 'Bunch not straightly cut'),
(201, '无胶水', 'Wrapper not glued'),
(202, '粘合处翘边', 'Open end (yawn)'),
(203, '香蕉形雪茄', 'Bend cigar'),
(204, '无茄衣', 'No wrapper'),
(205, '烟支破裂', 'Broken cigar'),
(206, '漏卷（可见夹套宽度＞2mm)', 'Misrolled (visual binder width >2mm)'),
(207, '茄衣表面出现明显胶斑', 'Wrapper with glue spots'),
(208, '茄衣有洞眼病斑污痕＞3mm', 'Wrapper with holes, spots and blots >3mm'),
(209, '尾部翘边', 'Flags on end'),
(210, '茄衣粗糙 ', 'Rough appearance'),
(211, '尾部小孔', 'Holes on the end'),
(212, '茄衣破裂', 'Torn wrapper'),
(213, '头部过小', 'Head small'),
(214, '头部过大', 'Head large'),
(215, '头部无茄衣', 'Head open'),
(216, '头部撕裂', 'No or little overlap'),
(217, '香蕉形雪茄', 'Bend cigar'),
(218, '压痕', 'Pressure mark on cigar'),
(219, '双倍长两头不一致', 'Both heads have different size'),
(220, '茄衣有洞眼病斑污痕＜3.mm但多于2点', 'Wrapper more than 2 holes, spots and blots <3mm'),
(221, '茄衣白斑', 'Wrapper with white spots'),
(222, '空头', 'Pointy head'),
(223, '- 卷制总成上 头尾部无胶<br>- 输送平台上茄衣错位<br>- 吸盘上有胶水<br>- 供胶器脏<br>- 喷雾器水量过多或过少', '- No glue on head-end of rolling device<br>- misplaced wrapper on DTA<br>- sucking plate contaminated with glue     <br>- glue bar dirty<br>- sprayers give to much/little water'),
(224, '- 平台上茄衣错位<br>- 平台上电子眼被遮挡<br>- 平台上茄衣太湿<br>- 纱布拉力太大<br>- 无搓接板<br>- 撞针弯曲', '- misplaced wrapper on DTA<br>- Eye dirty on DTA<br>- Too wet wrapper on DTA<br>- Bobin tension<br>  - No stretch plate<br>- Needle bent'),
(225, '- 茄衣本身粗糙<br>- 撞针/水分<br>- 搓接装置不干净', '- Wrapper rough<br>- Check needle/water<br>- Rolling device dirty'),
(226, '- 没有胶水<br>- 上胶器上的孔被堵塞<br>- 无搓接板<br>- 吸附盘错位或不上升<br>- 胶水或胶水管里有气泡', '- No glue<br>- Holes on gluebar dirty<br>- Stretchplate missing<br>- Sucking plate placed wrong or does n''t move up<br>  - Air bubbles in glue/tubes'),
(227, '- 撞针总成弹簧不干净<br>- 撞针未安装到位<br>- 撞针弯曲或损坏<br>- 机械手不干净<br>- 撞针总成不干净<br>  - 输送轨不干净<br>- 茄衣本身损坏', '- Dirty springs on CCD<br>- Needle misplaced in holder<br>- Damaged needle<br>- Grippers dirty<br>  - Plate and/or guide on CCD dirty<br>- Dirty transport chain<br>- Bad wrapper'),
(228, '- 搓接总成不干净<br>- 吸附盘不干净<br>- 输送轨不干净<br>- 撞针总成不干净<br>- 没有水', '- Rolling device dirty<br>- Sucking plate dirty<br>- Transport chain dirty<br>- Grippers/CCD/Guides or transport dirty<br>  - No water'),
(229, '- 喷雾器过脏或水量太小<br>- 胶水不足<br>- 纱布拉力<br>- 输送平台上茄衣错位<br>- 头部定型部件', '- Sprayers dirty or too little water<br>- Not enough glue<br>- Bobin tension<br>- Check wrapper placement on DTA<br>  - Check headshape device'),
(230, '- 机械手定位不准（未将烟胚放入卷制总成的正确位置）', '- Grippers don''t place bunch correctly in rolling device'),
(231, '- 机械手定位不准（未将烟胚放入卷制总成的正确位置）', '- Grippers don''t place bunch correctly in rolling device'),
(232, '- 纱布茄衣在输送平台上错位<br>- 铜板错位<br>- 水过多或过少', '- Position of wrapper on DTA<br>- Position of stretching plate<br>- Too much/little water'),
(233, '- 机械手定位不准（未将烟胚放入卷制总成的正确位置）', '- Grippers don''t place bunch correctly in rolling device'),
(234, '- 茄衣在输送平台上错位<br>- 茄衣太干<br>- 头部成型位置/时机<br>- 吸附盘错位<br>- 烟胚在卷制总成上的位置不对', '- Wrapper position on DTA<br>- Wrapper too dry<br>- Position/timing of rolling head<br>- Dirty sucking plate<br>  - bunch not placed correctly on rolling device'),
(235, '- 传送轨脏<br>- 烘干机下烟支卡住<br>- 烘干机温度过高', '- Transport chain dirty<br>- Cigars stacked in dryer<br>- Dryer temperature too high'),
(236, '- 吸盘导致的压痕（吸附孔的痕迹)<br>- 铜板压力过大<br>- 搓接总成太湿', '- Pressure marks of sucking plate (round marks)<br>- DTA presses too hard<br>- Rolling device too wet'),
(237, '- 撞针弯曲<br>- 电子眼脏<br>- 搓接总成脏<br>- 茄衣在输送平台上错位<br>- 挂叶胶片过高', '- Bend needle<br>- Eye on DTA dirty<br>- Rolling device dirty<br>- Wrapper misplaced on DTA<br>- Rubber wipe too high'),
(238, '- 机械手脏、损坏或定位不准<br>- 卷制总成卡住<br>- 传送轨卡住', '- Gripper dirty, broken or misplaced<br>- Rolling device stucked<br>- Transport chain damaged/stuck'),
(239, '- 卷制总成头部上胶过多<br>- 茄衣在纱布上卡住<br>- 供胶器上胶水过多<br>- 喷雾器漏水', '- Rolling device gives too much glue<br>- Wrapper stuck on bobin<br>- Too much glue on gluebar<br>  - sprayer is leaking of keeps on spraying'),
(240, '- 烟胚在卷制总成上错位', '- Bunches not placed correctly in rolling device'),
(241, '无茄衣', 'No wrapper'),
(242, '漏卷（可见夹套宽度＞2mm)', 'Misrolled (visual binder width >2mm)'),
(243, '茄衣表面出现明显胶斑', 'Wrapper with glue spots'),
(244, '茄衣有洞眼病斑污痕 >3mm', 'Wrapper with holes, spots and blots >3mm'),
(245, '茄衣表面皱纹', 'Wrinkled wrapper'),
(246, '头部茄衣包裹不严', 'Loose wrapper at head'),
(247, '茄衣有洞眼病斑污痕＜3.mm但多于2点', 'Wrapper more than 2 holes, spots and blots<3mm'),
(248, '端部切口斜面高低差＞1.0mm', 'Bunch not straightly cut'),
(249, '盒内出现倒装', 'Misloaded in box'),
(250, '错装', 'Tip loose'),
(251, '烟嘴脱落', 'Cigar broken'),
(252, '断残烟支', 'Wrong amount'),
(253, '缺支多支', 'Damaged by insects'),
(254, '虫蛀烟支', 'Mis-shaped box'),
(255, '小盒挤压变形、小盒划伤严重或污点', 'Scratched/spots Box'),
(256, '缺内衬或内衬破损', 'Missing or torn innerlayer'),
(257, '小盒折叠损伤＞3mm、或＜3mm但多于两处', 'Box has more than 2 folds >3mm'),
(258, '内衬或内抽折叠损伤＞5mm', 'Inner layer has folds >5mm'),
(259, '小盒擦花严重', 'Box is badly scratched'),
(260, '包装外观A缺陷', 'Visual packing defects A'),
(261, '包装外观B缺陷', 'Visual packing defects B'),
(262, '细节', 'Details'),
(263, '(左&右)', '(L&R)'),
(264, '燃烧端吸阻', 'PD Fire End'),
(265, '抽吸端带嘴吸阻', 'PD Tip'),
(266, '更新', 'News'),
(267, '标题', 'Subject'),
(268, '长度机械上嘴', 'Total length (+tip)'),
(269, '生产率', 'Efficiency'),
(270, '单位', 'Units'),
(271, '支', 'Pieces'),
(272, '公斤', 'Kg'),
(273, '总生产', 'Total production'),
(274, '废品', 'Waste product'),
(275, '侧吸阻', 'PD'),
(280, '烟嘴无胶导致脱嘴', 'No tips due to no glue'),
(281, '塑料嘴无滤芯', 'Plastic tip with no filter'),
(282, '烟支严重触皱弯曲变形', 'Bunch is curved'),
(283, '茄衣洞眼病斑污痕＞3mm', 'Wrapper with holes, spots and blots >3mm'),
(284, '指环倒置、脱落', 'Upside down or missing ring'),
(285, '玻纸松散脱落', 'Loose or missing cellophane'),
(286, '追踪', 'T&T'),
(287, '新建路程', 'New Route'),
(288, '浏览', 'Browse Route'),
(289, '标签号', 'Label Nr'),
(290, '端部切口斜面高低差＞1mm', 'Head slope’s height difference >1mm'),
(291, '头部茄衣包裹不严合松散', 'Loose wrapper at head'),
(292, '带嘴烟支嘴歪斜', 'Askew tip'),
(293, '嘴上吸附烟末（片）', 'Tip with tobacco dust (slice)'),
(294, '指环歪斜错牙＞1mm', 'Askew ring >1mm'),
(295, '指环错位＞2mm', 'Misplaced ring > 2mm'),
(296, '拉线位置>1mm', 'Wrinkled cellophane'),
(297, '热合温度过高导致玻纸扭曲变形', 'Cellophane is twisted due to overheat'),
(298, '玻纸拉线无切口或切口错位＞2mm', 'Tear strip with no cut or misplaced cut >2mm'),
(299, '玻线折叠或玻线褶皱明显', 'Tear strip is not obvious or useless'),
(300, '标签日期', 'Label Date'),
(301, '打印标签', 'Print Label'),
(302, '茄衣号', 'Wrapper Nr'),
(303, '左/右边', 'L/R Side'),
(304, '包装类型', 'Packing'),
(305, '口味', 'Flavor'),
(306, '茄芯输入', 'Filler Input'),
(307, '茄芯剩余', 'Filler Left'),
(308, '废茄芯', 'Filler Waste'),
(309, '套输入', 'Binder Input'),
(310, '套剩余', 'Binder Left'),
(311, 'MID-S水分', 'Moisture MID-S'),
(312, '吸阻', 'Pressuredrop'),
(313, '数量', 'amount'),
(314, '分布图', 'Distribution'),
(315, '在内部限制范围内', 'Within inner limits'),
(316, '在内外部限制范围内', 'Within outer limits'),
(317, '生产期', 'Production stage'),
(318, 'Cp/Cpk', 'Cp/Cpk'),
(319, '绩效表现', 'Performance'),
(320, '设备对比', 'Machine comparison'),
(321, '不可用', 'Not available'),
(322, 'A+B类缺陷', 'Defects A+B'),
(323, '包装外观A+B缺陷', 'Packing defects A+B'),
(324, '吸阻分布图', 'Pressuredrop distribution'),
(325, '平均吸阻', 'Average pressuredrop'),
(326, '吸阻Cp/Cpk', 'Cp/Cpk pressuredrop'),
(327, '检测概要', 'Summary measurements'),
(328, '设备绩效表现', 'Performance machine'),
(329, '左/右纱布', 'Bobin Side'),
(330, '产量', 'Produced'),
(331, '运行中的机器', 'Machines Running'),
(332, '在制品', 'Tracked'),
(333, '待测量 (多少)', 'Waiting for Measurement'),
(334, '待追踪 (多少)', 'Not yet Tracked'),
(335, '以下机器未定时检测<br>请及时对下列机器进行检测<br>机器号：<br>', 'Machines that need to be measured again:'),
(336, '考核表', 'Matrix'),
(337, '已检测机器', 'Tracked Machines'),
(338, '所有机器', 'All Machines'),
(339, '打开', 'Show'),
(340, '质量指数', 'Performance'),
(341, '指数精度', 'Accuracy'),
(342, 'ID', 'ID'),
(343, 'OK', 'OK'),
(344, '产品号', 'ProductNr'),
(345, '烟盘', 'Trays'),
(346, '烟胚规范号', 'Bunch Nr'),
(347, '最小值重量-双倍长(10)', 'WDL_Min'),
(348, '规格重量-双倍长(10)', 'WDL_Norm'),
(349, '极大值重量-双倍长(10)', 'WDL_Max'),
(350, '最小值长度-双倍长(10)', 'LDL_Min'),
(351, '规格长度-双倍长(10)', 'LDL_Norm'),
(352, '极大值长度-双倍长(10)', 'LDL_Max'),
(353, '最小值直径', 'Diam_Min'),
(354, '规格直径', 'Diam_norm'),
(355, '极大值直径', 'Diam_max'),
(356, '最小值重量左&右', 'WSL_Min'),
(357, '规格重量左&右', 'WSL_Norm'),
(358, '极大值重量左&右', 'WSL_Max'),
(359, '最小值长度左&右', 'LSL_Min'),
(360, '规格长度左&右', 'LSL_Norm'),
(361, '极大值长度左&右', 'LSL_Max'),
(362, '规格吸阻', 'PD_Norm'),
(363, '最小值头部直径', 'HD_Min'),
(364, '规格头部直径', 'HD_Norm'),
(365, '极大值头部直径', 'HD_Max'),
(366, '最小值头部长度', 'HL_Min'),
(367, '规格头部长度', 'HL_Norm'),
(368, '极大值头部长度', 'HL_Max'),
(369, '成品规范号', 'Pack_Nr'),
(370, '最小值分切后水分', 'MC_Min'),
(371, '规格分切后水分', 'MC_Norm'),
(372, '极大值分切后水分', 'MC_Max'),
(373, '最小值长度', 'L_Min'),
(374, '规格长度', 'L_Norm'),
(375, '极大值长度', 'L_Max'),
(376, '最小值长度', 'TL_Min'),
(377, '规格长度', 'TL_Norm'),
(378, '极大值长度', 'TL_Max'),
(379, '最小值重量', 'W_Min'),
(380, '规格重量', 'W_Norm'),
(381, '极大值重量', 'W_Max'),
(382, '最小值包装后成品水分', 'MP_Min'),
(383, '规格包装后成品水分', 'MP_Norm'),
(384, '极大值包装后成品水分', 'MP_Max'),
(385, '分切后吸阻', 'PD_Cut'),
(386, '包装后成品吸阻', 'PD_Packed'),
(387, '含梗及叶脉率', 'Stems'),
(388, '填充值', 'Filling Power'),
(389, '尺寸分布1', 'Particle Size-1'),
(390, '尺寸分布2', 'Particle Size-2'),
(391, '尺寸分布3', 'Particle Size-3'),
(392, '尺寸分布4', 'Particle Size-4'),
(393, '规范号', 'Specs Nr'),
(394, '新值有什么变化?', 'What?'),
(395, '旧值', 'OLD'),
(396, '新值', 'NEW'),
(397, '名字', 'NAME'),
(398, '帐单号', 'LabelNr'),
(399, '使用量', 'USAGE'),
(400, '日期', 'DATE'),
(402, '满期', 'EXPIRE'),
(403, '选择', 'CHOICE'),
(404, '手工上茄衣', 'Hand Roll'),
(405, '手工包装', 'Hand Pack'),
(406, '号', 'Nr'),
(407, '是太大', 'is too large'),
(408, '密码太短 (4 <)', 'Password is too short (4 <)'),
(409, '使用的密码，请选择另一个', 'Password is already used, choose another one'),
(410, '标题', 'Title'),
(411, '您的密码已过期<br> 请输入您的姓名和新密码', 'Your password is expired, <br>please choose a new one'),
(412, '你叫什么名字？', 'What is your name?'),
(413, '输密码', 'Enter a password'),
(414, '取消', 'Cancel'),
(415, '星期', 'Week'),
(416, '天', 'Sun'),
(417, '一', 'Mon'),
(418, '二', 'Tue'),
(419, '三', 'Wed'),
(420, '四', 'Thu'),
(421, '五', 'Fri'),
(422, '六', 'Sat'),
(423, '一月', 'Jan'),
(424, '二月', 'Feb'),
(425, '三月', 'Mar'),
(426, '四月', 'Apr'),
(427, '五月', 'May'),
(428, '六月', 'Jun'),
(429, '七月', 'Jul'),
(430, '八月', 'Aug'),
(431, '九月', 'Sep'),
(432, '十月', 'Oct'),
(433, '十一月', 'Nov'),
(434, '十二月', 'Dec'),
(435, '用户：', 'User: '),
(436, '考试', 'Exam'),
(437, '评分', 'Score'),
(438, '开始', 'Start'),
(439, '总分', 'Score'),
(440, '分', 'Points'),
(441, '问题', 'Question'),
(442, '烟叶', 'Tobacco'),
(443, '类型', 'Type'),
(444, '产地', 'Origin'),
(445, '年份', 'Year'),
(446, '名称', 'Name'),
(447, '等级', 'Grade'),
(448, '状态', 'Status'),
(449, '种类', 'Variety'),
(450, '烟叶物理性状', 'Physical Appearance'),
(451, '烟叶形态', 'Condition'),
(452, '烟叶颜色', 'Color'),
(453, '长度（cm)', 'Length (cm)'),
(454, '宽度（cm)', 'Width (cm)'),
(455, '烟叶常规化学成分', 'Chemical Contents'),
(456, '总糖（%)', 'Sugar (%)'),
(457, '还原糖（%）', 'Reducing Sugar (%)'),
(458, '总氮（%）', 'Nitrogen (%)'),
(459, '总碱（%）', 'Alkali (%)'),
(460, '钾（%）', 'Potasium (%)'),
(461, '氯（%）', 'Chlorine (%)'),
(462, '香气特性', 'Aroma Characteristics'),
(463, '香型', 'Type'),
(464, '香气质', 'Quality'),
(465, '香气量', 'Quantity'),
(466, '透发度', 'Intensity'),
(467, '杂气程度', 'Bad Smell Amount'),
(468, '杂气种类', 'Bad Smell Type'),
(469, '烟气特征', 'Smoke Characteristics'),
(470, '浓度', 'Density'),
(471, '劲头', 'Strength'),
(472, '细腻度', 'Elegance'),
(473, '成团性', 'Completeness'),
(474, '感官质量评价', 'Sensory Evaluation'),
(475, '口感特性', 'Smoking Experience'),
(476, '烟味浓度', 'Density'),
(477, '干燥度', 'Dryness'),
(478, '干净度', 'Cleaness'),
(479, '口腔刺激', 'Mouth Irritation'),
(480, '喉部刺激', 'Throat Irritation'),
(481, '鼻腔刺激', 'Nose Irritation'),
(482, '燃烧性', 'Combustion Performance'),
(483, '灰色', 'Ash Color'),
(484, '重要特征描述', 'Comment'),
(485, '结存量（公斤)', 'Amount (kg)'),
(486, '单价（元/公斤)', 'Price/kg'),
(487, '甜度', 'Sweetness'),
(488, '搜查', 'Search'),
(489, '最新', 'Latest'),
(490, '创始人', 'Creator'),
(491, '存档', 'Save'),
(492, '是否复制该页面数据？', 'Make a copy?'),
(493, '上传文件', 'Import'),
(494, '分析与考核', 'Export'),
(495, '撤销上传', 'Undo'),
(496, '暂无数据', 'n.a.'),
(497, '未找到该追溯号', 'Tracking number not found'),
(498, '被检项目', 'Supply Name'),
(499, '项目编号', 'Supply Number'),
(500, '项目来源', 'Supplier'),
(501, '检查项目', 'Check Supply'),
(502, '项目规格', 'Supply Specs'),
(503, '设置', 'Setup'),
(504, '编号', 'Number'),
(505, '电话号码', 'Telephone Nr'),
(506, '传真号码', 'Fax Nr'),
(507, '新增', 'Add'),
(508, '撤销', 'Remove'),
(509, '物理指标', 'Physical Data'),
(510, '外观质量', 'Appearance'),
(511, '质量得分', 'Penalty'),
(512, '卷烟机', 'Stick Making Machine'),
(513, '包装机', 'Packing Machine'),
(514, '烟丝批号', 'Batch Nr'),
(515, '圆周', 'Circumference'),
(516, '总通风率', 'Ventilation'),
(517, '标准偏差', 'Std Deviation'),
(518, '变异系数', 'Variance'),
(519, '超标次数', 'Out of Spec'),
(520, '硬度', 'Hardness'),
(521, '烟支外观质量', 'Appearance of stick'),
(522, '缺陷类型', 'Defect type'),
(523, '数量', 'Quantity'),
(524, '缺陷总数', 'Total defects'),
(525, 'A类质量缺陷', 'A quality defect'),
(526, 'B类质量缺陷', 'B quality defect'),
(527, 'C类质量缺陷', 'C quality defect'),
(528, '盒装外观质量', 'Appearance of pack'),
(529, '条裝外观质量', 'Appearance of sleeve'),
(530, '箱裝外观质量', 'Appearance of carton'),
(531, '综合测试台', 'Measure Station'),
(532, '成品检测室', 'Laboratory'),
(533, '过程检测（车间） ', 'Workfloor'),
(534, '原始数据', 'Raw Data'),
(535, '已检测', 'Visually Checked'),
(536, '生产', 'production'),
(537, '未生产', 'starting up'),
(538, '调机', 'adjust machine'),
(539, '试验', 'testing machine'),
(540, '换牌', 'change product'),
(541, '交验', 'new machine'),
(542, '生产情况', 'Production status'),
(543, '均值与标准中心值差', 'discrepancy avg/std'),
(544, '烟支组重（内）', 'weight inside'),
(545, '烟支组重（外）', 'weight outside'),
(546, '检验员', 'inspector'),
(547, '卷烟机操作人员', 'operator stick machine'),
(548, '包装机操作人员', 'operator packing machine'),
(549, '烟支重量标准偏差扣分', 'Penalty Weight Deviation'),
(550, '单支重量均值与标准中心值之差扣分', 'Penalty Avg Weight vs Standard'),
(551, '重量超标扣分', 'Penalty Weight out of Specs'),
(552, '烟支圆周标准偏差扣分', 'Penalty Circumference Deviation'),
(553, '圆周均值与标准中心值之差扣分', 'Penalty Avg Circumference  vs Standard'),
(554, '圆周超标支数扣分', 'Penalty Circumference out of Specs'),
(555, '烟支长度标准偏差扣分', 'Penalty Length Deviation'),
(556, '长度均值与标准中心值之差扣分', 'Penalty Avg Length vs Standard'),
(557, '长度超标支数扣分', 'Penalty Length out of Specs'),
(558, '内外排烟支组重之差', 'Penalty Weight Difference L/R'),
(559, 'A类质量缺陷格率（%）', 'stick A defects passed'),
(560, 'A类质量缺陷合扣分', 'Penalty Stick A defects'),
(561, 'B类质量缺陷格率（%）', 'stick B defects passed'),
(562, 'B类质量缺陷合扣分', 'Penalty Stick B defects'),
(563, 'C类质量缺陷格率（%）', 'stick C defects passed'),
(564, 'C类质量缺陷合扣分', 'Penalty Stick C defects'),
(565, 'A类质量缺陷格率（%）', 'pack A defects passed'),
(566, 'A类质量缺陷合扣分', 'Penalty Pack A defects'),
(567, 'B类质量缺陷格率（%）', 'pack B defects passed'),
(568, 'B类质量缺陷合扣分', 'Penalty Pack B defects'),
(569, 'C类质量缺陷格率（%）', 'pack C defects passed'),
(570, 'C类质量缺陷合扣分', 'Penalty Pack C defects'),
(571, 'A类质量缺陷格率（%）', 'sleeve A defects passed'),
(572, 'A类质量缺陷合扣分', 'Penalty Sleeve A defects'),
(573, 'B类质量缺陷格率（%）', 'sleeve B defects passed'),
(574, 'B类质量缺陷合扣分', 'Penalty Sleeve B defects'),
(575, 'C类质量缺陷格率（%）', 'sleeve C defects passed'),
(576, 'C类质量缺陷合扣分', 'Penalty Sleeve C defects'),
(577, 'A类质量缺陷格率（%）', 'carton A defects passed'),
(578, 'A类质量缺陷合扣分', 'Penalty Carton A defects'),
(579, 'B类质量缺陷格率（%）', 'carton B defects passed'),
(580, 'B类质量缺陷合扣分', 'Penalty Carton B defects'),
(581, 'C类质量缺陷格率（%）', 'carton C defects passed'),
(582, 'C类质量缺陷合扣分', 'Penalty Carton C defects'),
(583, '综合得分', 'Synthesis Score'),
(584, '最大值', 'Maximum'),
(585, '最小值', 'Minimum'),
(586, '抽检次数', 'Sampling Times'),
(587, '总数', 'Sum'),
(588, '占比', 'Proportion'),
(589, '考核', 'Evaluation'),
(590, '烟支内外排组重之差', 'Difference inner/outer'),
(591, '生产现场测试数据', 'Production Measurements'),
(592, '检验员检测数据', 'Inspector Measurements'),
(593, '编辑', 'edit'),
(594, '烟支', 'sticks'),
(595, '盒装', 'packs'),
(596, '条裝', 'sleeves'),
(597, '箱裝', 'cartons'),
(598, '完成', 'Finished'),
(599, '报表', 'Report'),
(600, '题目', 'Title'),
(601, '含水率', 'Moisture'),
(602, '含末率', 'Dust'),
(603, '端部落丝量', 'Tobacco Loss'),
(604, '烟支净丝重量', 'Filler weight'),
(605, '制丝综合质量得分', 'Process score'),
(606, '待判或不合格原因', 'Reason for unqualified or pending'),
(607, '判定结果', 'Inspection result'),
(608, '待判或不合格物料处理方式', 'Disposal'),
(609, '物料处理通知编号', 'Handling Nr'),
(610, '一次加料回潮', 'First moisture regain'),
(611, '二次加料回潮', 'Second moisture regain'),
(612, '入口物料含水率', 'Input Moisture'),
(613, '出口物料含水率', 'Output Moisture'),
(614, '出口物料温度', 'Output temperature'),
(615, '料液识别', 'Moisture Status'),
(616, '加料累计精度', 'Accuracy of charging'),
(617, '贮叶', 'Storage'),
(618, '贮存时间', 'Storage time'),
(619, '物料识别', 'Material'),
(620, '叶丝增温增湿（滚筒）', 'Moisturing/Heating'),
(621, '气流干燥', 'Air drying'),
(622, '加香', 'Flavoring'),
(623, '加香累计精度', 'Flavoring Accuracy'),
(624, '梗丝掺配', 'Blend cut tobacco'),
(625, '掺配累计精度', 'Blending accuracy'),
(626, '膨胀丝掺配', 'Blend expanded tobacco'),
(627, '回收丝掺配', 'Blend recycled tobacco'),
(628, '按工艺要求使用', 'Blend recycled OK'),
(629, '回收丝掺配通知号', 'Notification Nr'),
(630, '混丝贮存', 'Blend tobacco storage'),
(631, '贮丝含水率', 'Moisture content'),
(632, '投料', 'Input Material'),
(633, '特殊检验环节', 'Additional inspections'),
(634, '整丝率', 'Long stem amount'),
(635, '碎丝率', 'Short stem amount'),
(636, '成品烟丝填充值', 'Filling power'),
(637, '切丝', 'Cut into strips'),
(638, '切丝宽度', 'Tobacco cut width'),
(639, '原料标识符合配方', 'material according to the requirements'),
(640, '料液标识符合生产牌号', 'Moisture according to the product'),
(641, '批次物料不应混装', 'batch should not be mixed'),
(642, '掺配梗丝标识符合工艺要求', 'cut accord to the requirements'),
(643, '掺配膨胀丝标识符合工艺要求', 'expanded tobacco according to equirements '),
(644, '制丝综合质量得分', 'Quality score of the whole process'),
(645, '原料标识符合配方(投料)', 'Raw material OK '),
(646, '正常生产', 'Normal Production'),
(647, '试制产品', 'Trial Production'),
(648, '规范底限', 'Min Specs'),
(649, '规范上限', 'Max Specs'),
(650, '选用', 'Select'),
(651, '抽样点', 'Sampling point'),
(652, '巡检日期', 'Date'),
(653, '圆周/直径（mm）', 'Circumference'),
(654, '卷胚过程', 'Rolling Process'),
(655, '吸阻(mmWg)', 'Pressure Drop'),
(656, '表面（支）', 'Surface OutSpec'),
(657, '松紧度（支）', 'Tightness OutSpec'),
(658, '配方 精度%', 'Blend Accuracy'),
(659, '吸阻合格率%', 'PD Accuracy'),
(660, '批次 得分', 'Batch Score'),
(661, '批次 质量 判定', 'Batch Quality'),
(662, '上茄衣过程', 'Wrapping Process'),
(663, '烟支外观（支）', 'Cigar Appearance'),
(664, '茄衣光洁度（支）', 'Wrapping Finish'),
(665, '茄衣完整度（支）', 'Wrapper Integrity'),
(666, '茄衣颜色', 'Wrapper Color'),
(667, '头尾', 'Head & End'),
(668, '转数', 'Wrapped OK'),
(669, '切口', 'Incission'),
(670, '空头', 'Empty Head'),
(671, '松紧度', 'Tightness'),
(672, '脉纹', 'Vein Lines'),
(673, '折痕', 'Crease'),
(674, '病斑', 'Spots'),
(675, '污痕', 'Blots'),
(676, '缝口', 'Seams'),
(677, '洞眼', 'Holes'),
(678, '破皮', 'Cracks'),
(679, '拼接', 'Splices'),
(680, '机器切头过程', 'Machine Cutting'),
(681, '风晾养护过程', 'Storage Process'),
(682, '责任人', 'In Charge'),
(683, '批次质量判定', 'Batch Quality OK'),
(684, '养护日期', 'Processing Date'),
(685, '含水率标准', 'Moisture Limis'),
(686, '下限（%）', 'Lower limit'),
(687, '上限（%）', 'Upper limit'),
(688, '外观质量情况', 'Appearance'),
(689, '有无生霉/虫蛀)', 'Mildew/Worms'),
(690, '杂物（支）', 'Dopant'),
(691, '工号', 'Job Nr'),
(692, '烟支包装质量（支）', 'Stick Packing Quality'),
(693, '上指环', 'The Ring'),
(694, '缺陷类型', 'Defect Type'),
(695, '缺陷数量', 'Defect Amount'),
(696, '上玻纸/塑纸', 'Cellophane'),
(697, '上烟支套/管/木片', 'Cigar Set'),
(698, '缺陷代码', 'Defect Code'),
(699, '抽检次数', 'Sampling'),
(700, '包装标识', 'Packing Mark'),
(701, '判定', 'Determination'),
(702, '盒装质量（盒）', 'Pack Quality'),
(703, '条装质量（条）', 'Sleeve Quality'),
(704, '箱装质量（箱）', 'Box Quality'),
(705, '烟支包装过程得分', 'Stick packing score'),
(706, '盒装过程得分', 'Packing score'),
(707, '箱条装过程得分', 'Sleeve+Box packing score'),
(708, '箱条装过程', 'Sleeve+Box packing'),
(709, '长度偏小次数', 'Amount length out of lower limit'),
(710, '长度偏大次数', 'Amount length out of upper limit'),
(711, '长度合格次数', 'Amount length within limit'),
(712, '圆周偏小次数', 'Amount circumference out of lower limit'),
(713, '圆周偏大次数', 'Amount circumference out of upper limit'),
(714, '圆周合格次数', 'Amount circumference within specs'),
(715, '质量偏小次数', 'Amount weight out of lower limit'),
(716, '质量偏大次数', 'Amount weight out of upper limit'),
(717, '质量合格次数', 'Amount weight within specs'),
(718, '吸阻偏小次数', 'Amount PD out of lower limit'),
(719, '吸阻偏大次数', 'Amount PD out of upper limit'),
(720, '吸阻合格次数', 'Amount PD within specs'),
(721, '水分偏小次数', 'Amount moisture out of lower limit'),
(722, '水分偏大次数', 'Amount moisture out of upper limit'),
(723, '水分合格次数', 'Amount moisture within limit'),
(724, '水标±0.5%次数', 'Amount moisture ±0.5% specs'),
(725, '分析与考核', 'Evaluation'),
(726, '管制圖', 'Control Charts'),
(727, '样本大小', 'Samples');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
