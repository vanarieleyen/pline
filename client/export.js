
var export_content = {
	contents: [
		m("#tabs13.mytabs13.container3",
			m("#datatabs13.subtabs13",
				m("ul#sheets")
			)
		)
	],
	controller: function (element, isInitialized) {
		if (isInitialized)
			return;

	},
	view: function () {
		return m("#export", this.contents);
	}
}

// functions used to build the preview

// returns the summary of a series of data
function calcSummary(row, aantal, lsl, usl, fields) {
	var serie = [];
	var result = {};
	var amount = 0;
	var outspec = 0;
	for (var i=0; i<aantal; i++) {
		fields.map(function (field) {
			var val = parseFloat(row[i][field]);
			if (!isNaN(val)) {
				serie.push(val);
				amount++;
				if (val < lsl || val > usl)
					outspec++;
			} 
		});
	}
	result.amount = amount;
	if (amount == 0) {
		result.cp = '--';
		result.cpk = '--';
		result.avg = '--';
		result.dev = '--';
		result.var = '--';
		result.out = '--';
	} else {
		result.cp = cp(lsl, usl, serie);
		result.cpk = cpk(lsl, usl, serie);
		result.avg = jStat.mean(serie).toFixed(2);
		result.dev = jStat.stdev(serie).toFixed(2);
		result.var = jStat.variance(serie).toFixed(2);
		result.out = outspec;
	}
	return result;
}		

function intval(mixedVar, base) {
	var tmp
	var type = typeof mixedVar

	if (type === 'boolean') {
		return +mixedVar
	} else if (type === 'string') {
		tmp = parseInt(mixedVar, base || 10)
		return (isNaN(tmp) || !isFinite(tmp)) ? 0 : tmp
	} else if (type === 'number' && isFinite(mixedVar)) {
		return mixedVar | 0
	} else {
		return 0
	}
}

function chr(codePt) {
	if (codePt > 0xFFFF) {
		codePt -= 0x10000
		return String.fromCharCode(0xD800 + (codePt >> 10), 0xDC00 + (codePt & 0x3FF))
	}
	return String.fromCharCode(codePt)
}

// generate excel column names (A,B,C..Z  AA,AB..)
function num2alpha(n) {
    for (r = ""; n >= 0; n = intval(n / 26) - 1)
        r = chr(n%26 + 0x41) + r;
    return r;
}

function createSheet() {
	var tabnr = 0;
	var ul = $('#export #datatabs13').find( "ul" );
	ul.empty();								// remove the tab
	$("#export #datatabs13 .tab").remove();	// remove the content

	$.getJSON('server/get_sheets.php', {
		start: 		$('#evaluate [name=start]').val(),
		end:			$('#evaluate [name=end]').val(),			
		prodstat:	$('#evaluate [name=prodStat]').val(),
		result:		$('#evaluate [name=result]').val(),
		disposal:	$('#evaluate [name=disposal').val(),
		product:	$('#evaluate [name=product] option:selected').text()
	},	function(data) {
		var sheet = new Object;
		for (var i=0; i<data.length; i++) {
			rec = data[i];
			if (typeof sheet['#tab_'+rec.product] == 'undefined') {		// start a new sheet
				sheet['#tab_'+rec.product] = Array(rec);
			} else {												// append contents to the sheet
				sheet['#tab_'+rec.product].push(rec);
			}
		}
		for (var rec in sheet) {
			var row = sheet[rec];
			
			// build and append the content
			var prodStat = ['', '正常生产', '试制产品'];
			var statOK = ['', '符合', '不符合'];
			var result = ['', '合格', '不合格', '待判'];
			var disposal = ["", "按工艺要求反掺使用", "质管室组织评审"];
			var html = "";
			var aantal = row.length;	// the number of products
			var rownr = 1;
			
			// the first row with only the column titles (A, B, C etc)
			html = sprintf("%s<table border='1'>", html);
			html = sprintf("%s<tr><th class='rowcol'>&nbsp;</th>", html);
			for (var i=0; i<aantal*2+5; i++)
				html = sprintf("%s<th class='rowcol'>%s</th>", html, num2alpha(i) );
			html = sprintf("%s</tr>", html);
			
			// header quality inspection
			html = sprintf("%s<tr><th class='rowcol'>%s</th><th colspan=5>制丝过程判定项目质量检验记录表</th>", html, rownr++);
			for (var i=0; i<aantal*2; i++)
				html = sprintf("%s<td style='width:4em'>&nbsp;</td>", html);
			html = sprintf("%s</tr>", html);
			
			// production date
			html = sprintf("%s<tr><th class='rowcol'>%s</th><th colspan=5>生产日期</th>", html, rownr++);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, row[i].date);
			html = sprintf("%s</tr>", html);

			// batch number
			html = sprintf("%s<tr><th class='rowcol'>%s</th><th colspan=5>生产批号</th>", html, rownr++);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, row[i].batchNr);
			html = sprintf("%s</tr>", html);
			
			// production status
			html = sprintf("%s<tr><th class='rowcol'>%s</th><th colspan=5>生产情况</th>", html, rownr++);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, prodStat[row[i].prodStat]);
			html = sprintf("%s</tr>", html);

			// items header
			html = sprintf("%s<tr><th class='rowcol'>%s</th><th>工序</th><th>判定项目</th><th colspan=3>指标要求</th>", html, rownr++);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>&nbsp;</th>", html);
			html = sprintf("%s</tr>", html);
			
			// feed intake
			html = sprintf("%s<tr><th class='rowcol'>%s</th><th>投料</th><th>物料识别</th><th colspan=3>原料标识符合配方</th>", html, rownr++);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, statOK[row[i].rawMatOK]);
			html = sprintf("%s</tr>", html);
			
			// first moisture regain
			html = sprintf("%s<tr><th class='rowcol'>%s</th><th rowspan=7>一次加料回潮</th>", html, rownr++);
			html = sprintf("%s<th>入口物料含水率（%%）</th><th>%s</th><th>-</th><th>%s</th>", html, row[0]['spec_1_matinMoistMin'], row[0]['spec_1_matinMoistMax']);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th>%s</th><th>%s</th>", html, row[i]['1_matinMoistA'], row[i]['1_matinMoistB']);
			html = sprintf("%s</tr>", html);

			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			html = sprintf("%s<th>料液识别</th><th colspan=3>料液标识符合生产牌号</th>", html);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, statOK[row[i]['1_moistOK']]);
			html = sprintf("%s</tr>", html);

			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			html = sprintf("%s<th rowspan=3>出口物料含水率（%%）</th><th rowspan=3>%s</th><th rowspan=3>-</th><th rowspan=3>%s</th>", html, row[0]['spec_1_matoutMoistMin'], row[0]['spec_1_matoutMoistMax']);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th>%s</th><th>%s</th>", html, row[i]['1_matoutMoistA'], row[i]['1_matoutMoistB']);
			html = sprintf("%s</tr>", html);
			
			var lsl = parseFloat(row[0]['spec_1_matoutMoistMin']);
			var usl = parseFloat(row[0]['spec_1_matoutMoistMax']);
			var res = calcSummary(row, aantal, lsl, usl, ['1_matoutMoistA','1_matoutMoistB']);
			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			["AMOUNT","CP","CPK","AVG","DEVIATION","VARIANCE","OUTSPEC"].map(function (label) {
				html = sprintf("%s<th colspan=2><label class='%s'></label></th>", html, label);
			})
			html = sprintf("%s</tr>", html);
			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			["amount","cp","cpk","avg","dev","var","out"].map(function (soort) {
				html = sprintf("%s<th colspan=2>%s</th>", html, res[soort]);
			})
			html = sprintf("%s</tr>", html);

			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			html = sprintf("%s<th>出口物料温度（℃）</th><th>%s</th><th>-</th><th>%s</th>", html, row[0]['spec_1_matoutTempMin'], row[0]['spec_1_matoutTempMax']);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th>%s</th><th>%s</th>", html, row[i]['1_matoutTempA'], row[i]['1_matoutTempB']);
			html = sprintf("%s</tr>", html);
			
			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			html = sprintf("%s<th>加料累计精度（%%）</th><th>累计精度</th><th>≤</th><th>1</th>", html);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, row[i]['1_accuracy'] );
			html = sprintf("%s</tr>", html);

			// second moisture regain
			html = sprintf("%s<tr><th class='rowcol'>%s</th><th rowspan=7>二次加料回潮 </th>", html, rownr++);
			html = sprintf("%s<th>入口物料含水率（%%）</th><th>%s</th><th>-</th><th>%s</th>", html, row[0]['spec_2_matinMoistMin'], row[0]['spec_2_matinMoistMax']);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th>%s</th><th>%s</th>", html, row[i]['2_matinMoistA'], row[i]['2_matinMoistB']);
			html = sprintf("%s</tr>", html);

			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			html = sprintf("%s<th>料液识别</th><th colspan=3>料液标识符合生产牌号</th>", html);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, statOK[row[i]['2_moistOK']]);
			html = sprintf("%s</tr>", html);

			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			html = sprintf("%s<th rowspan=3>出口物料含水率（%%）</th><th rowspan=3>%s</th><th rowspan=3>-</th><th rowspan=3>%s</th>", html, row[0]['spec_2_matoutMoistMin'], row[0]['spec_2_matoutMoistMax']);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th>%s</th><th>%s</th>", html, row[i]['2_matoutMoistA'], row[i]['2_matoutMoistB']);
			html = sprintf("%s</tr>", html);
			
			var lsl = parseFloat(row[0]['spec_2_matoutMoistMin']);
			var usl = parseFloat(row[0]['spec_2_matoutMoistMax']);
			var res = calcSummary(row, aantal, lsl, usl, ['2_matoutMoistA','2_matoutMoistB']);
			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			["AMOUNT","CP","CPK","AVG","DEVIATION","VARIANCE","OUTSPEC"].map(function (label) {
				html = sprintf("%s<th colspan=2><label class='%s'></label></th>", html, label);
			})
			html = sprintf("%s</tr>", html);
			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			["amount","cp","cpk","avg","dev","var","out"].map(function (soort) {
				html = sprintf("%s<th colspan=2>%s</th>", html, res[soort]);
			})
			html = sprintf("%s</tr>", html);

			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			html = sprintf("%s<th>出口物料温度（℃）</th><th>%s</th><th>-</th><th>%s</th>", html, row[0]['spec_2_matoutTempMin'], row[0]['spec_2_matoutTempMax']);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th>%s</th><th>%s</th>", html, row[i]['2_matoutTempA'], row[i]['2_matoutTempB']);
			html = sprintf("%s</tr>", html);
			
			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			html = sprintf("%s<th>加料累计精度（%%）</th><th>累计精度</th><th>≤</th><th>1</th>", html);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, row[i]['2_accuracy'] );
			html = sprintf("%s</tr>", html);
			
			// keep in storage
			html = sprintf("%s<tr><th class='rowcol'>%s</th><th rowspan=2>贮叶</th>", html, rownr++);
			html = sprintf("%s<th>贮存时间（h）</th><th>%s</th><th>-</th><th>%s</th>", html, row[0]['spec_storTimeMin'], row[0]['spec_storTimeMax']);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, row[i]['storageTime'] );
			html = sprintf("%s</tr>", html);

			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			html = sprintf("%s<th>物料识别</th><th colspan=3>批次物料不应混装</th>", html);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, statOK[row[i]['storageMatOK']]);
			html = sprintf("%s</tr>", html);
			
			// cut into strips
			html = sprintf("%s<tr><th class='rowcol'>%s</th><th>切丝</th><th>切丝宽度（mm）</th>", html, rownr++);
			html = sprintf("%s<th>%s</th><th>-</th><th>%s</th>", html, row[0]['spec_cutWidthMin'], row[0]['spec_cutWidthMax']);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, row[i]['cutWidth']);
			html = sprintf("%s</tr>", html);
			
			// humidifying and heating (cylinder)
			html = sprintf("%s<tr><th class='rowcol'>%s</th><th rowspan=5>叶丝增温增湿（滚筒）</th>", html, rownr++);
			html = sprintf("%s<th>入口物料含水率（%%）</th><th>%s</th><th>-</th><th>%s</th>", html, row[0]['spec_cyl_matinMoistMin'], row[0]['spec_cyl_matinMoistMax']);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th>%s</th><th>%s</th>", html, row[i]['cyl_matinMoistA'], row[i]['cyl_matinMoistB']);
			html = sprintf("%s</tr>", html);

			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			html = sprintf("%s<th rowspan=3>出口物料含水率（%%）</th><th rowspan=3>%s</th><th rowspan=3>-</th><th rowspan=3>%s</th>", html, row[0]['spec_cyl_matoutMoistMin'], row[0]['spec_cyl_matoutMoistMax']);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th>%s</th><th>%s</th>", html, row[i]['cyl_matoutMoistA'], row[i]['cyl_matoutMoistB']);
			html = sprintf("%s</tr>", html);
			
			var lsl = parseFloat(row[0]['spec_cyl_matoutMoistMin']);
			var usl = parseFloat(row[0]['spec_cyl_matoutMoistMax']);
			var res = calcSummary(row, aantal, lsl, usl, ['cyl_matoutMoistA','cyl_matoutMoistB']);
			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			["AMOUNT","CP","CPK","AVG","DEVIATION","VARIANCE","OUTSPEC"].map(function (label) {
				html = sprintf("%s<th colspan=2><label class='%s'></label></th>", html, label);
			})
			html = sprintf("%s</tr>", html);
			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			["amount","cp","cpk","avg","dev","var","out"].map(function (soort) {
				html = sprintf("%s<th colspan=2>%s</th>", html, res[soort]);
			})
			html = sprintf("%s</tr>", html);
			
			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			html = sprintf("%s<th>出口物料温度（℃）</th><th>%s</th><th>-</th><th>%s</th>", html, row[0]['spec_cyl_matoutTempMin'], row[0]['spec_cyl_matoutTempMax']);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th>%s</th><th>%s</th>", html, row[i]['cyl_matoutTempA'], row[i]['cyl_matoutTempB']);
			html = sprintf("%s</tr>", html);				

			// air drying
			html = sprintf("%s<tr><th class='rowcol'>%s</th><th rowspan=4>气流干燥</th>", html, rownr++);
			html = sprintf("%s<th rowspan=3>出口物料含水率（%%）</th><th rowspan=3>%s</th><th rowspan=3>-</th><th rowspan=3>%s</th>", html, row[0]['spec_dry_matoutMoistMin'], row[0]['spec_dry_matoutMoistMax']);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th>%s</th><th>%s</th>", html, row[i]['dry_matoutMoistA'], row[i]['dry_matoutMoistB']);
			html = sprintf("%s</tr>", html);
			
			var lsl = parseFloat(row[0]['spec_dry_matoutMoistMin']);
			var usl = parseFloat(row[0]['spec_dry_matoutMoistMax']);
			var res = calcSummary(row, aantal, lsl, usl, ['dry_matoutMoistA','dry_matoutMoistB']);
			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			["AMOUNT","CP","CPK","AVG","DEVIATION","VARIANCE","OUTSPEC"].map(function (label) {
				html = sprintf("%s<th colspan=2><label class='%s'></label></th>", html, label);
			})
			html = sprintf("%s</tr>", html);
			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			["amount","cp","cpk","avg","dev","var","out"].map(function (soort) {
				html = sprintf("%s<th colspan=2>%s</th>", html, res[soort]);
			})
			html = sprintf("%s</tr>", html);
			
			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			html = sprintf("%s<th>出口物料温度（℃）</th><th>%s</th><th>-</th><th>%s</th>", html, row[0]['spec_dry_matoutTempMin'], row[0]['spec_dry_matoutTempMax']);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th>%s</th><th>%s</th>", html, row[i]['dry_matoutTempA'], row[i]['dry_matoutTempB']);
			html = sprintf("%s</tr>", html);		

			// blending the cut stem 
			html = sprintf("%s<tr><th class='rowcol'>%s</th><th rowspan=2>梗丝掺配</th>", html, rownr++);
			html = sprintf("%s<th>物料识别</th><th colspan=3>掺配梗丝标识符合工艺要求</th>", html);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, statOK[row[i]['blendcutMatOK']]);
			html = sprintf("%s</tr>", html);
			
			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			html = sprintf("%s<th>掺配累计精度（%%）</th><th>累计精度</th><th>≤</th><th>1</th>", html);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, row[i]['blendcutAccuracy']);
			html = sprintf("%s</tr>", html);	
			
			// blending the expanded tobacco
			html = sprintf("%s<tr><th class='rowcol'>%s</th><th rowspan=2>膨胀丝掺配</th>", html, rownr++);
			html = sprintf("%s<th>物料识别</th><th colspan=3>掺配膨胀丝标识符合工艺要求</th>", html);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, statOK[row[i]['blendexpMatOK']]);
			html = sprintf("%s</tr>", html);
			
			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			html = sprintf("%s<th>掺配累计精度（%%）</th><th>累计精度</th><th>≤</th><th>1</th>", html);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, row[i]['blendexpAccuracy']);
			html = sprintf("%s</tr>", html);	
			
			// blending recycling tobacco
			html = sprintf("%s<tr><th class='rowcol'>%s</th><th rowspan=2>回收丝掺配</th>", html, rownr++);
			html = sprintf("%s<th rowspan=2>物料识别</th><th colspan=3>回收丝掺配通知号</th>", html);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, row[i]['blendreID']);
			html = sprintf("%s</tr>", html);
			
			html = sprintf("%s<th class='rowcol'>%s</th><th colspan=3>按工艺要求使用</th>", html, rownr++);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, statOK[row[i]['blendreOK']]);
			html = sprintf("%s</tr>", html);				
			
			//  Add spice & flavor
			html = sprintf("%s<tr><th class='rowcol'>%s</th><th rowspan=8>加香</th>", html, rownr++);
			html = sprintf("%s<th>物料识别</th><th colspan=3>料液标识符合生产牌号</th>", html);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, statOK[row[i]['flavorOK']]);
			html = sprintf("%s</tr>", html);
			
			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			html = sprintf("%s<th rowspan=3>加香累计精度（%%）</th><th rowspan=3>累计精度</th><th rowspan=3>≤</th><th rowspan=3>1</th>", html);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, row[i]['flavorAccuracy']);
			html = sprintf("%s</tr>", html);
			
			var res = calcSummary(row, aantal, 0, 1, ['flavorAccuracy']);
			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			["AMOUNT","CP","CPK","AVG","DEVIATION","VARIANCE","OUTSPEC"].map(function (label) {
				html = sprintf("%s<th colspan=2><label class='%s'></label></th>", html, label);
			})
			html = sprintf("%s</tr>", html);
			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			["amount","cp","cpk","avg","dev","var","out"].map(function (soort) {
				html = sprintf("%s<th colspan=2>%s</th>", html, res[soort]);
			})
			html = sprintf("%s</tr>", html);
			
			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			html = sprintf("%s<th rowspan=4>出口物料含水率（%%）</th><th rowspan=4>%s</th><th rowspan=4>-</th><th rowspan=4>%s</th>", html, row[0]['spec_flavor_matoutMoistMin'], row[0]['spec_flavor_matoutMoistMax']);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th>%s</th><th>%s</th>", html, row[i]['flavor_matoutMoistA'], row[i]['flavor_matoutMoistB']);
			html = sprintf("%s</tr>", html);	
			
			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th>%s</th><th>%s</th>", html, row[i]['flavor_matoutMoistC'], row[i]['flavor_matoutMoistD']);
			html = sprintf("%s</tr>", html);

			var lsl = parseFloat(row[0]['spec_flavor_matoutMoistMin']);
			var usl = parseFloat(row[0]['spec_flavor_matoutMoistMax']);
			var res = calcSummary(row, aantal, lsl, usl, ['flavor_matoutMoistA','flavor_matoutMoistB','flavor_matoutMoistC','flavor_matoutMoistD']);
			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			["AMOUNT","CP","CPK","AVG","DEVIATION","VARIANCE","OUTSPEC"].map(function (label) {
				html = sprintf("%s<th colspan=2><label class='%s'></label></th>", html, label);
			})
			html = sprintf("%s</tr>", html);
			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			["amount","cp","cpk","avg","dev","var","out"].map(function (soort) {
				html = sprintf("%s<th colspan=2>%s</th>", html, res[soort]);
			})
			html = sprintf("%s</tr>", html);
			
			// blend tobaccos storage
			html = sprintf("%s<tr><th class='rowcol'>%s</th><th rowspan=3>混丝贮存</th>", html, rownr++);
			html = sprintf("%s<th>物料识别</th><th colspan=3>物料不应出现混装</th>", html);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, statOK[row[i]['blendstorMix']]);
			html = sprintf("%s</tr>", html);
			
			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			html = sprintf("%s<th rowspan=2>贮丝含水率（%%）</th><th rowspan=2>%s</th><th rowspan=2>-</th><th rowspan=2>%s</th>", html, row[0]['spec_blendstorMoistMin'], row[0]['spec_blendstorMoistMax']);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th>%s</th><th>%s</th>", html, row[i]['blendstorMoistA'], row[i]['blendstorMoistA']);
			html = sprintf("%s</tr>", html);	
			
			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th>%s</th><th>%s</th>", html, row[i]['blendstorMoistC'], row[i]['blendstorMoistD']);
			html = sprintf("%s</tr>", html);
			
			// special link
			html = sprintf("%s<tr><th class='rowcol'>%s</th><th rowspan=3>特殊检验环节</th>", html, rownr++);
			html = sprintf("%s<th rowspan=2>成品烟丝结构（%%）</th><th>整丝率</th><th>≤</th><th>%s</th>", html, row[0]['spec_amountLongStems']);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, row[i]['amountLongStems']);
			html = sprintf("%s</tr>", html);

			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			html = sprintf("%s<th>碎丝率</th><th>≤</th><th>%s</th>", html, row[0]['spec_amountShortStems']);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, row[i]['amountShortStems']);
			html = sprintf("%s</tr>", html);
			
			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			html = sprintf("%s<th>成品烟丝填充值（cm3/g）</th><th>填充值</th><th>≥</th><th>%s</th>", html, row[0]['spec_fillingPower']);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, row[i]['fillingPower']);
			html = sprintf("%s</tr>", html);
			
			// empty rows (divider)
			html = sprintf("%s<tr><th class='rowcol'>%s</th><th colspan=5></th>", html, rownr++);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2></th>", html);
			html = sprintf("%s</tr>", html);
			
			html = sprintf("%s<tr><th class='rowcol'>%s</th><th colspan=5></th>", html, rownr++);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2></th>", html);
			html = sprintf("%s</tr>", html);
			
			
			// header
			html = sprintf("%s<tr><th class='rowcol'>%s</th><th colspan=5>制丝过程判定项目质量检验考核表</th>", html, rownr++);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2></th>", html);
			html = sprintf("%s</tr>", html);
			
			html = sprintf("%s<tr><th class='rowcol'>%s</th><th>工序</th><th>判定项目</th><th colspan=3>指标要求</th>", html, rownr++);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>扣分判定情况</th>", html);
			html = sprintf("%s</tr>", html);
			
			// feed intake
			html = sprintf("%s<tr><th class='rowcol'>%s</th><th>投料</th><th>物料识别</th><th colspan=3>原料标识符合配方</th>", html, rownr++);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, row[i]['pen_FeedMatID']);
			html = sprintf("%s</tr>", html);
			
			// first moisture regain
			html = sprintf("%s<tr><th class='rowcol'>%s</th><th rowspan=5>一次加料回潮</th>", html, rownr++);
			html = sprintf("%s<th>入口物料含水率（%%）</th><th>%s</th><th>-</th><th>%s</th>", html, row[0]['spec_1_matinMoistMin'], row[0]['spec_1_matinMoistMax']);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, row[i]['pen_1_matinMoist']);
			html = sprintf("%s</tr>", html);

			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			html = sprintf("%s<th>料液识别</th><th colspan=3>料液标识符合生产牌号</th>", html);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, row[i]['pen_1_matMoistID']);
			html = sprintf("%s</tr>", html);

			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			html = sprintf("%s<th>出口物料含水率（%%）</th><th>%s</th><th>-</th><th>%s</th>", html, row[0]['spec_1_matoutMoistMin'], row[0]['spec_1_matoutMoistMax']);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, row[i]['pen_1_matoutMoist']);
			html = sprintf("%s</tr>", html);

			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			html = sprintf("%s<th>出口物料温度（℃）</th><th>%s</th><th>-</th><th>%s</th>", html, row[0]['spec_1_matoutTempMin'], row[0]['spec_1_matoutTempMax']);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, row[i]['pen_1_matoutTemp']);
			html = sprintf("%s</tr>", html);
			
			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			html = sprintf("%s<th>加料累计精度（%%）</th><th>累计精度</th><th>≤</th><th>1</th>", html);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, row[i]['pen_1_accuracy'] );
			html = sprintf("%s</tr>", html);
			
			// second moisture regain
			html = sprintf("%s<tr><th class='rowcol'>%s</th><th rowspan=5>一次加料回潮</th>", html, rownr++);
			html = sprintf("%s<th>入口物料含水率（%%）</th><th>%s</th><th>-</th><th>%s</th>", html, row[0]['spec_2_matinMoistMin'], row[0]['spec_2_matinMoistMax']);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, row[i]['pen_2_matinMoist']);
			html = sprintf("%s</tr>", html);

			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			html = sprintf("%s<th>料液识别</th><th colspan=3>料液标识符合生产牌号</th>", html);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, row[i]['pen_2_matMoistID']);
			html = sprintf("%s</tr>", html);

			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			html = sprintf("%s<th>出口物料含水率（%%）</th><th>%s</th><th>-</th><th>%s</th>", html, row[0]['spec_2_matoutMoistMin'], row[0]['spec_2_matoutMoistMax']);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, row[i]['pen_2_matoutMoist']);
			html = sprintf("%s</tr>", html);

			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			html = sprintf("%s<th>出口物料温度（℃）</th><th>%s</th><th>-</th><th>%s</th>", html, row[0]['spec_2_matoutTempMin'], row[0]['spec_2_matoutTempMax']);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, row[i]['pen_2_matoutTemp']);
			html = sprintf("%s</tr>", html);
			
			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			html = sprintf("%s<th>加料累计精度（%%）</th><th>累计精度</th><th>≤</th><th>1</th>", html);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, row[i]['pen_2_accuracy'] );
			html = sprintf("%s</tr>", html);
			
			// keep in storage
			html = sprintf("%s<tr><th class='rowcol'>%s</th><th rowspan=2>贮叶</th>", html, rownr++);
			html = sprintf("%s<th>贮存时间（h）</th><th>%s</th><th>-</th><th>%s</th>", html, row[0]['spec_storTimeMin'], row[0]['spec_storTimeMax']);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, row[i]['pen_storTime'] );
			html = sprintf("%s</tr>", html);

			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			html = sprintf("%s<th>物料识别</th><th colspan=3>批次物料不应混装</th>", html);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, row[i]['pen_stormatOK']);
			html = sprintf("%s</tr>", html);
			
			// cut into strips
			html = sprintf("%s<tr><th class='rowcol'>%s</th><th>切丝</th><th>切丝宽度（mm）</th>", html, rownr++);
			html = sprintf("%s<th>%s</th><th>-</th><th>%s</th>", html, row[0]['spec_cutWidthMin'], row[0]['spec_cutWidthMax']);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, row[i]['pen_cutWidth']);
			html = sprintf("%s</tr>", html);
			
			// humidifying and heating (cylinder)
			html = sprintf("%s<tr><th class='rowcol'>%s</th><th rowspan=3>叶丝增温增湿（滚筒）</th>", html, rownr++);
			html = sprintf("%s<th>入口物料含水率（%%）</th><th>%s</th><th>-</th><th>%s</th>", html, row[0]['spec_cyl_matinMoistMin'], row[0]['spec_cyl_matinMoistMax']);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, row[i]['pen_cyl_matinMoist']);
			html = sprintf("%s</tr>", html);

			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			html = sprintf("%s<th>出口物料含水率（%%）</th><th>%s</th><th>-</th><th>%s</th>", html, row[0]['spec_cyl_matoutMoistMin'], row[0]['spec_cyl_matoutMoistMax']);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, row[i]['pen_cyl_matoutMoist']);
			html = sprintf("%s</tr>", html);
			
			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			html = sprintf("%s<th>出口物料温度（℃）</th><th>%s</th><th>-</th><th>%s</th>", html, row[0]['spec_cyl_matoutTempMin'], row[0]['spec_cyl_matoutTempMax']);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, row[i]['pen_cyl_matoutTemp']);
			html = sprintf("%s</tr>", html);	
			
			// air drying
			html = sprintf("%s<tr><th class='rowcol'>%s</th><th rowspan=2>气流干燥</th>", html, rownr++);
			html = sprintf("%s<th>出口物料含水率（%%）</th><th>%s</th><th>-</th><th>%s</th>", html, row[0]['spec_dry_matoutMoistMin'], row[0]['spec_dry_matoutMoistMax']);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, row[i]['pen_dry_matoutMoist']);
			html = sprintf("%s</tr>", html);
			
			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			html = sprintf("%s<th>出口物料温度（℃）</th><th>%s</th><th>-</th><th>%s</th>", html, row[0]['spec_dry_matoutTempMin'], row[0]['spec_dry_matoutTempMax']);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, row[i]['pen_dry_matoutTemp']);
			html = sprintf("%s</tr>", html);	
			
			// blending the cut stem 
			html = sprintf("%s<tr><th class='rowcol'>%s</th><th rowspan=2>梗丝掺配</th>", html, rownr++);
			html = sprintf("%s<th>物料识别</th><th colspan=3>掺配梗丝标识符合工艺要求</th>", html);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, row[i]['pen_blendcutStemID']);
			html = sprintf("%s</tr>", html);
			
			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			html = sprintf("%s<th>掺配累计精度（%%）</th><th>累计精度</th><th>≤</th><th>1</th>", html);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, row[i]['pen_blendcutAccuracy']);
			html = sprintf("%s</tr>", html);
			
			// blending the expanded tobacco
			html = sprintf("%s<tr><th class='rowcol'>%s</th><th rowspan=2>膨胀丝掺配</th>", html, rownr++);
			html = sprintf("%s<th>物料识别</th><th colspan=3>掺配膨胀丝标识符合工艺要求</th>", html);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, row[i]['pen_blendexpMatOK']);
			html = sprintf("%s</tr>", html);
			
			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			html = sprintf("%s<th>掺配累计精度（%%）</th><th>累计精度</th><th>≤</th><th>1</th>", html);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, row[i]['pen_blendexpAccuracy']);
			html = sprintf("%s</tr>", html);	
			
			// blending recycling tobacco
			html = sprintf("%s<tr><th class='rowcol'>%s</th><th>回收丝掺配</th>", html, rownr++);
			html = sprintf("%s<th>物料识别</th><th colspan=3>按工艺要求使用</th>", html);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, row[i]['pen_blendreMatOK']);
			html = sprintf("%s</tr>", html);
			
			//  Add spice & flavor
			html = sprintf("%s<tr><th class='rowcol'>%s</th><th rowspan=3>加香</th>", html, rownr++);
			html = sprintf("%s<th>物料识别</th><th colspan=3>料液标识符合生产牌号</th>", html);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, row[i]['pen_blendflavorMatOK']);
			html = sprintf("%s</tr>", html);
			
			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			html = sprintf("%s<th>加香累计精度（%%）</th><th>累计精度</th><th>≤</th><th>1</th>", html);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, row[i]['pen_blendflavorAccuracy']);
			html = sprintf("%s</tr>", html);
			
			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			html = sprintf("%s<th>出口物料含水率（%%）</th><th>%s</th><th>-</th><th>%s</th>", html, row[0]['spec_flavor_matoutMoistMin'], row[0]['spec_flavor_matoutMoistMax']);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, row[i]['pen_blendflavorMoist']);
			html = sprintf("%s</tr>", html);	
			
			// blend tobaccos storage
			html = sprintf("%s<tr><th class='rowcol'>%s</th><th rowspan=2>混丝贮存</th>", html, rownr++);
			html = sprintf("%s<th>物料识别</th><th colspan=3>物料不应出现混装</th>", html);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, row[i]['pen_blendstorMatOK']);
			html = sprintf("%s</tr>", html);
			
			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			html = sprintf("%s<th>贮丝含水率（%%）</th><th>%s</th><th>-</th><th>%s</th>", html, row[0]['spec_blendstorMoistMin'], row[0]['spec_blendstorMoistMax']);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, row[i]['pen_blendstorMoist']);
			html = sprintf("%s</tr>", html);	
			
			// special link
			html = sprintf("%s<tr><th class='rowcol'>%s</th><th rowspan=3>特殊检验环节</th>", html, rownr++);
			html = sprintf("%s<th rowspan=2>成品烟丝结构（%%）</th><th>整丝率</th><th>≤</th><th>%s</th>", html, row[0]['spec_amountLongStems']);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, row[i]['pen_amountLongStems']);
			html = sprintf("%s</tr>", html);

			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			html = sprintf("%s<th>碎丝率</th><th>≤</th><th>%s</th>", html, row[0]['spec_amountShortStems']);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, row[i]['pen_amountShortStems']);
			html = sprintf("%s</tr>", html);
			
			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			html = sprintf("%s<th>成品烟丝填充值（cm3/g）</th><th>填充值</th><th>≥</th><th>%s</th>", html, row[0]['spec_fillingPower']);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, row[i]['pen_fillingPower']);
			html = sprintf("%s</tr>", html);
			
			// summary
			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			html = sprintf("%s<th colspan=5>制丝综合质量得分</th>", html);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, row[i]['pen_score']);
			html = sprintf("%s</tr>", html);
			
			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			html = sprintf("%s<th colspan=5>判定结果</th>", html);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, result[row[i]['result']]);
			html = sprintf("%s</tr>", html);
			
			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			html = sprintf("%s<th colspan=5>待判或不合格原因</th>", html);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, row[i]['pendingReason']);
			html = sprintf("%s</tr>", html);
			
			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			html = sprintf("%s<th colspan=5>检验员</th>", html);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, row[i]['inspector']);
			html = sprintf("%s</tr>", html);
			
			// empty row (divider)
			html = sprintf("%s<tr><th class='rowcol'>%s</th><th colspan=5></th>", html, rownr++);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2></th>", html);
			html = sprintf("%s</tr>", html);
			
			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			html = sprintf("%s<th colspan=5>待判或不合格物料处理方式</th>", html);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, disposal[row[i]['disposal']]);
			html = sprintf("%s</tr>", html);
			
			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			html = sprintf("%s<th colspan=5>物料处理通知编号</th>", html);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, row[i]['matNotNR']);
			html = sprintf("%s</tr>", html);
			
			html = sprintf("%s<tr><th class='rowcol'>%s</th>", html, rownr++);
			html = sprintf("%s<th colspan=5>检验员</th>", html);
			for (var i=0; i<aantal; i++)
				html = sprintf("%s<th colspan=2>%s</th>", html, row[i]['inspectorDis']);
			html = sprintf("%s</tr>", html);
			
			html = sprintf("%s</table><br>", html);

			tabnr++;
			$("#export #datatabs13").append(sprintf("<div class='tab' id='tab_%s'>%s</div>", tabnr, html));
			ul.append(sprintf("<li id='%s'><a href='#tab_%s'>%s</a></li>", row[0].product, tabnr, row[0].product));
			fill_labels();
		}
		var sheets = $('#export #datatabs13').tabs();
		sheets.tabs("refresh");
		sheets.tabs("option", "active", 0 );		// select the first
		$("#export .subtabs13 .ui-widget-content").css("border", "1px !important");
		$("#export .subtabs13 .ui-tabs-nav").css({ 
    		'position': 'absolute', 
    		'bottom': '-1.7em',
    		'padding': '0em 0.2em 0.1em' 
		}); 
	});		
}


