/*
functies om de labels te setten
functies om de inputvelden van data uit de database te voorzien
*/

$.ajaxSetup({ scriptCharset: "utf-8" , contentType: "Content-Type: text/html; charset=utf-8"});
$.ajaxSetup({async:false});


var specmin, specmax;		// fieldnames of min and max

// walk through the (dbs) field tree and fill the array (t) with the fieldnames
function getFields(obj) {
	var result = [];
	zoek (obj, result);
	return result;

	function zoek(obj, t) {
		$.each(obj, function (i, k) {
			if (typeof obj[i] == "object" && obj[i] !== null)
				zoek(k, t);
			else
				t.push(k);
		})
	}
}

// change the :contains-selector to match on whole words
jQuery.expr[":"].contains = $.expr.createPseudo(function(arg) {
  return function( elem ) {
  	return ($(elem).text()==arg);
  };
});

// format a Date to string: format("yyyy-MM-dd h:mm:ss")
Date.prototype.format = function(format) {
	var o = {
			"M+" : this.getMonth()+1, //month
			"d+" : this.getDate(),    //day
			"h+" : this.getHours(),   //hour
			"m+" : this.getMinutes(), //minute
			"s+" : this.getSeconds(), //second
			"q+" : Math.floor((this.getMonth()+3)/3),  //quarter
			"S" : this.getMilliseconds() //millisecond
		}
	if (/(y+)/.test(format)) format=format.replace(RegExp.$1,
   		(this.getFullYear()+"").substr(4 - RegExp.$1.length));
	for (var k in o) 
		if (new RegExp("("+ k +")").test(format))
			format = format.replace(RegExp.$1,
				RegExp.$1.length==1 ? o[k] : 
				("00"+ o[k]).substr((""+ o[k]).length));
	return format;
}

// stel de text en hint van een label in
// een: de class van het element op de pagina
// twee/drie: index of extra toevoeging aan label
// drie: de index van de labels-array waar de text en hint staat opgeslagen
function show(een, twee, drie) {
	if (arguments.length == 2) { 
		var lbl = een;
		var i = twee;
		var add = '';
	} else {
		var lbl = een;
		var add = twee;
		var i = drie;
	}
	var hint = ($.jStorage.get("lang") == 0) ? 1 : 0;
	var text = ($.jStorage.get("lang") == 0) ? 0 : 1;
	var txt = LABELS[i][text] + add;
	$(lbl).html(txt);	// text
	$(lbl).attr('title', LABELS[i][hint]);	// hint
	
}

// set button text + hint
function setButton(lbl, idx) {
	var hint = ($.jStorage.get("lang") == 0) ? 1 : 0;
	var text = ($.jStorage.get("lang") == 0) ? 0 : 1;
	var txt = LABELS[idx][text];
	
	$(lbl).val("  "+txt+"  ");	// text
	$(lbl).attr('title', LABELS[idx][hint]);	// hint	
}

// vul alle labels met text en hints
function fill_labels() {
	show('.HISTORY', 1);
	show('.CHARTS', 2);
	show('.DATE', 5);
	show('.TIME', 34);
	show('.DESCRIPTION', 7);
	show('.REMARK', 8);
	show('.DIAMETER', 11);
	show('.SUMMARY', 160);
	show('.SPECS', 20);
	show('.MIN', 21);
	show('.NORM', 22);
	show('.MAX', 23);
	show('.MACHINE', 31);
	show('.PRODUCTS', 6);
	show('.START_DATE', 35);
	show('.END_DATE', 36);
	show('.SETTINGS', 38);
	show('.CP', 39);
	show('.CPK', 40);
	show('.PACKING50', 41);
	show('.WEIGHT', 42);
	show('.AVG', 43);
	show('.MOIST', 44);
	show('.CHECKED_AMOUNT', 84);
	show('.AMOUNT', 94);
	show('.DEFECTS', 95);
	show('.NOTICE', 99);
	show('.NAME', 6);
	show('.LENGTH', 102);
	show('.TYPE', 33);
	show('.PRODUCT', 32);
	show('.RANGE', 37);
	show('.PRODNR', 344);
	show('.YOURNAME', 110);
	show('.SHIFT', 164);
	show('.DAYSHIFT', 165);
	show('.NIGHTSHIFT', 166);
	show('.OPERATOR', 171);
	show('.NAAM', 117);
	show('.FIELD', 116);	
	show('.REASON', 111);
	show('.DELETE', 172);
	show('.NEW', 112);
	show('.SELECT', 650);
	
	setButton(".reset", 140);
	setButton(".new", 112);
	setButton(".close", 113);
	setButton(".cancel", 414);
	setButton(".print", 159);
	setButton(".delete", 172);
	setButton(".save", 491);
	setButton(".import", 493);
	setButton(".export", 494);
	setButton(".select", 650);
	setButton(".exportsum", 160);
	setButton(".undo", 495);
	setButton(".edit", 593);
	show('.SPECSNR', 393);
	show('.PHYSDATA',  509);
	show('.IMPORT', 493);
	show('.FIELD', 116);
	show('.MEASUREMENTS', 125);
	show('.PROD_STAGE', 126);
	show('.ADVICE', 127);
	show('.PD', 146);
	show('.CALC', 145);
	show('.TREND', 154);
	show('.SPREAD', 155);
	show('.VARIATION', 156);
	show('.QUALITY', 157);
	show('.AVERAGE', 158);
	show('.CHOICE', 403);
	show('.LABEL', 289);
	show('.WRAPPER', 302);
	show('.PACKING', 304);
	show('.FLAVOR', 305);
	show('.STAGE', 317);
	show('.CP_CPK', 318);
	show('.AB_DEFECTS', 322);
	show('.PRESSUREDROP', 312);
	show('.DISTRIBUTION', 314);
	show('.MOISTURE', 170);
	show('.SPEC_SUMMARY', 327);
	show('.PRODUCED', 332);
	show('.MEASUREMENTS', 125);
	show('.SHOW', 339);
	show('.ACCURACY', 341);
	show('.ENTERPASS', 413);
	show('.EXPIREDPASS', 411);
	show('.ENTERNAME', 412);
	show('.OK', 343);
	show('.SCORE', 437);
	show('.SEARCH', 488);
	show('.APPEARANCE',  510);
	show('.PENALTY',  511);
	show('.BATCHNR',  514);
	show('.CIRCUMFERENCE',  515);
	show('.VENTILATION',  516);
	show('.DEVIATION',  517);
	show('.VARIANCE',  518);
	show('.OUTSPEC',  519);
	show('.HARDNESS',  520);
	show('.STICKAPPEARANCE', 521);
	show('.DEFECT_TYPE', 522);
	show('.QUANTITY', 523);
	show('.DEFECTS_TOTAL', 524);
	show('.DEFECTS_A', 525);
	show('.DEFECTS_B', 526);
	show('.DEFECTS_C', 527);
	show('.PACKAPPEARANCE', 528);
	show('.SLEEVEAPPEARANCE', 529);
	show('.CARTONAPPEARANCE', 530);
	show('.STATION', 531);
	show('.CHECKED', 535);
	show('.PRODUCTIONSTATUS', 542);
	show('.DISCREPANCY', 543);
	show('.INSPECTOR', 546);
	show('.OPERATORSTICK', 547);
	show('.OPERATORPACK', 548);
	show('.PEN_WEIGHTDEV', 549);	// penalty weight deviation
	show('.PEN_WEIGHTSTD', 550);	// penalty weight vs standard
	show('.PEN_WEIGHTOUT', 551);	// penalty weight out of specs
	show('.PEN_CIRCDEV', 552);		// penalty circumference deviation
	show('.PEN_CIRCSTD', 553);		// penalty circumference vs standard
	show('.PEN_CIRCOUT', 554);		// penalty circumference out of specs
	show('.PEN_LENDEV', 555);		// penalty length deviation
	show('.PEN_LENSTD', 556);		// penalty length vs standard
	show('.PEN_LENOUT', 557);		// penalty length out of specs
	show('.PEN_WEIGHTLR', 558);	// penalty weight l/r difference
	show('.STICK_A_PASSED', 559);	// stick a defects passed
	show('.STICK_A_PEN', 560);		// penalty stick a
	show('.STICK_B_PASSED', 561);	// stick b defects passed
	show('.STICK_B_PEN', 562);		// penalty stick b
	show('.STICK_C_PASSED', 563);	// stick c defects passed
	show('.STICK_C_PEN', 564);		// penalty stick c
	show('.PACK_A_PASSED', 565);	// pack a defects passed
	show('.PACK_A_PEN', 566);		// penalty pack a
	show('.PACK_B_PASSED', 567);	// pack b defects passed
	show('.PACK_B_PEN', 568);		// penalty pack b
	show('.PACK_C_PASSED', 569);	// pack c defects passed
	show('.PACK_C_PEN', 570);		// penalty pack c
	show('.SLEEVE_A_PASSED', 571);	// sleeve a defects passed
	show('.SLEEVE_A_PEN', 572);		// penalty sleeve a
	show('.SLEEVE_B_PASSED', 573);	// sleeve b defects passed
	show('.SLEEVE_B_PEN', 574);		// penalty sleeve b
	show('.SLEEVE_C_PASSED', 575);	// sleeve c defects passed
	show('.SLEEVE_C_PEN', 576);		// penalty sleeve c
	show('.CARTON_A_PASSED', 577);	// carton a defects passed
	show('.CARTON_A_PEN', 578);		// penalty carton a
	show('.CARTON_B_PASSED', 579);	// carton b defects passed
	show('.CARTON_B_PEN', 580);		// penalty carton b
	show('.CARTON_C_PASSED', 581);	// carton c defects passed
	show('.CARTON_C_PEN', 582);		// penalty carton c
	show('.SYNT_SCORE', 583);			// synthesis score
	show('.MAXIMUM', 584);
	show('.MINIMUM', 585);
	show('.SAMPLES', 586);
	show('.SUM', 587);
	show('.PROPORTION', 588);	
	show('.EVALUATE', 589);
	show('.STICKS', 594);
	show('.PACKS', 595);
	show('.SLEEVES', 596);
	show('.CARTONS', 597);
	show('.FINISHED', 598);
	show('.REPORT', 599);
	show('.PRINT', 159);
	show('.TITLE', 600);
	show('.MOIST', 601);
	show('.DUST', 602);
	show('.LOSS', 603);
	show('.FWEIGHT', 604);
	show('.PSCORE', 605);
	show('.PREMARK', 606);
	show('.IRESULT', 607);
	show('.DISPOSAL', 608);
	show('.HANDLINGNR', 609);
	show('.REGAIN_1', 610);
	show('.REGAIN_2', 611);
	show('.CUT_STRIPS', 637);
	show('.CUT_WIDTH', 638);
	show('.INPUTMOIST', 612);
	show('.OUTPUTMOIST', 613);
	show('.OUTPUTTEMP', 614);
	show('.MOISTSTAT', 615);
	show('.CHARGE_ACCUR', 616);
	show('.STORAGE', 617);
	show('.STORAGETIME', 618);
	show('.MATERIAL', 619);
	show('.MOIST_HEAT', 620);
	show('.AIR_DRYING', 621);
	show('.MATREQUIREMENTS', 639);
	show('.BATCHNOTMIXED', 641);
	show('.EXPREQUIREMENTS', 643);
	show('.CUTREQUIREMENTS', 642);
	show('.FLAVORING', 622);
	show('.FLAVORING_ACCURACY', 623);
	show('.BLEND_CUT', 624);
	show('.BLEND_ACCUR', 625);
	show('.BLEND_EXP', 626);
	show('.BLEND_RECYCLED', 627);
	show('.BLEND_RECYCLED_OK', 628);
	show('.BLEND_RECYCLED_NR', 629);
	show('.BLEND_STORAGE', 630);
	show('.LONG_STEMS', 634);
	show('.SHORT_STEMS', 635);
	show('.FILLING_POWER', 636);
	show('.MOIST_CONTENT', 631);
	show('.MAT_INPUT', 632);
	show('.ADDITIONAL_INSPECTIONS', 633);
	show('.MOISTOK', 640);
	show('.QUALITYSCORE', 644);
	show('.RAWMATOK', 645);
	show('.MINSPECS', 648);
	show('.MAXSPECS', 649);
	show('.EXPORT', 494);
	show('.SAMPLINGPOINT', 651);
	show('.HANDMADE_DATE', 652);
	show('.HANDMADE_CIRCUMFERENCE', 653);
	show('.ROLLING_PROCESS', 654);
	show('.HANDMADE_PD', 655);
	show('.SURFACE_OUT', 656);
	show('.TIGHTNESS_OUT', 657);
	show('.BLEND_ACC', 658);
	show('.PD_ACC', 659);
	show('.BATCH_SCORE', 660);
	show('.BATCH_QUALITY', 661);
	show('.WRAPPING_PROCESS', 662);
	show('.CIGAR_APPEARANCE', 663);
	show('.WRAPPING_FINISH', 664);
	show('.WRAPPER_INTEGRITY', 665);
	show('.WRAPPER_COLOR', 666);
	show('.HEADEND', 667);
	show('.WRAPPED_OK', 668);
	show('.INCISSION', 669);
	show('.HEAD_EMPTY', 670);
	show('.TIGHTNESS', 671);
	show('.VEIN_LINES', 672);
	show('.CREASE', 673);
	show('.SPOTS', 674);
	show('.BLOTS', 675);
	show('.SEAMS', 676);
	show('.HOLES', 677);
	show('.CRACKS', 678);
	show('.SPLICES', 679);
	show('.MACHINE_CUTTING', 680);
	show('.STORAGE_PROCESS', 681);
	show('.IN_CHARGE', 682);
	show('.BATCH_QUALITY_OK', 683);
	show('.PROCESSING_DATE', 684);
	show('.MOISTURE_LIMITS', 685);
	show('.LOWER_LIMIT', 686);
	show('.UPPER_LIMIT', 687);
	show('.APPEARANCE_QUALITY', 688);
	show('.MILDEW_WORMS', 689);
	show('.DOPANT', 690);
	show('.JOBNR', 691);
	show('.STICK_PACK_QUALITY', 692);
	show('.RING', 693);
	show('.DEFECT_TYPE', 694);
	show('.DEFECT_NR', 695);
	show('.CELLOPHANE', 696);
	show('.CIGAR_SET', 697);
	show('.DEFECT_CODE', 698);
	show('.SAMPLING_FREQ', 699);
	show('.PACKING_MARK', 700);
	show('.DETERMINATION', 701);
	show('.PACK_QUALITY', 702);
	show('.SLEEVE_QUALITY', 703);
	show('.BOX_QUALITY', 704);
	show('.STICK_PACKING_SCORE', 705);
	show('.PACKING_SCORE', 706);
	show('.SLEEVEBOX_SCORE', 707);
	show('.SLEEVEBOX', 708);
	show('.L_OUTLOW', 709);
	show('.L_OUTHIGH', 710);
	show('.L_INSPEC', 711);
	show('.C_OUTLOW', 712);
	show('.C_OUTHIGH', 713);
	show('.C_INSPEC', 714);
	show('.W_OUTLOW', 715);
	show('.W_OUTHIGH', 716);
	show('.W_INSPEC', 717);
	show('.P_OUTLOW', 718);
	show('.P_OUTHIGH', 719);
	show('.P_INSPEC', 720);
	show('.M_OUTLOW', 721);
	show('.M_OUTHIGH', 722);
	show('.M_INSPEC', 723);
	show('.M_2INSPEC', 724);
}

// prevent tabbing away from the last input field
$(document).on("keydown", ".last", function(e) {
	var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
	
	if (key == 9)
		e.preventDefault();
});

// read all specifications and store these in localstorage
(function () {
	$.getJSON('server/get_record.php', { 
		query: 'SELECT * FROM gwc_handmade.specs'
	}, function(data) {
		$.jStorage.set("handmade.specs", data.row);
	});
})();

// return specification limits (min35,min20,norm,max20,max35 and delta)
function specLimits(lower, upper) { 
	var spec = {};
	spec.min35 = parseFloat(lower);
	spec.max35 = parseFloat(upper);
	spec.norm = (spec.min35 + spec.max35)/2;
	spec.delta = Math.max(spec.norm-spec.min35, spec.max35-spec.norm);
	spec.min20 = spec.norm - (spec.delta/35*20);
	spec.max20 = spec.norm + (spec.delta/35*20);
	return spec;
}

// return the specifications for a product on a certain date
function getSpec(product, date) {
	var specs = $.jStorage.get("handmade.specs");

	for (i=0; specs[i]; i++) {
		row = specs[i];
		if (row.name == product) {
			if ( (date < row.end) && (date >= row.start)) {
				return row;
			}
		}
	}
	return null;
}

// beperk alle inputs van het soort 'number' op getallen 
$(document).on("keyup", "input.number", function() {
	var element = $(this);
	var val = element.val(); 

	if (isNaN(val)) {
		val = val.replace(/[^0-9\.?]/g,'');
		if (val.split('.').length>2) val=val.replace(/\.+$/,"");
	} else {
		if (parseFloat(val) > 999) {	// set maximum size to 999
			alert(val+' '+LABELS[407][ $.jStorage.get("lang") ]+"!");	
			val = val.slice(0, -1);
		}	
	}
	$(this).val(val); 
});

// sets the current record pointer
function get_current() {
	if ($.jStorage.get("pline.current") == null) {	// for first-time start-ups 
		$.getJSON('server/get_record.php', { 
			query: 'SELECT max(id) AS id FROM '+table
		}, function(data) {
			$.jStorage.set("pline.current", data.id);	// NULL when none found
		});
	} else {
		$.getJSON('server/get_record.php', { 
			query: 'SELECT id FROM gwc_pline.inspection WHERE id='+$.jStorage.get("pline.current")
		},	function(data) {
			if (data.id == null) {
				$.getJSON('server/get_record.php', { 
					query: 'SELECT max(id) AS id FROM gwc_pline.inspection'
				}, function(data) {
					$.jStorage.set("pline.current", data.id);	// NULL when none found
				});
			} else {
				$.jStorage.set("pline.current", data.id);
			}
		});
	}
}

// go to the next record
function next_rec(table) {
	var name = table.split('.')[1];
	
	this.current = $.jStorage.get("pline.current");
	$.getJSON('server/get_record.php', { 
		query: 'SELECT * FROM '+table+' WHERE id = ' + this.current + ' LIMIT 1'
	}, function(data) {
		if (data.rowcount != 0) {
			$.getJSON('server/get_record.php', { 
				query: 'SELECT * FROM '+table+' WHERE id > "' + data.id + '" ORDER BY id ASC LIMIT 1'
			}, function(data) {
				if (data.rowcount != 0) {	// als er nog records worden gevonden...
					$.jStorage.set("pline.current", data.id);
				}	
			});
		} else {
			$.getJSON('server/get_record.php', { 
				query: 'SELECT max(id) AS id FROM '+table
			},	function(data) {
				$.jStorage.set("pline.current", data.id);	// NULL when none found
			});
		}		
	});
	show_data(name);
}	

// go to the previous record
function prev_rec(table) {
	var name = table.split('.')[1];
	
	this.current = $.jStorage.get("pline.current");
	$.getJSON('server/get_record.php', { 
		query: 'SELECT * FROM '+table+' WHERE id = ' + this.current + ' LIMIT 1'
	}, function(data) {
		if (data.rowcount != 0) {
			$.getJSON('server/get_record.php', { 
				query: 'SELECT * FROM '+table+' WHERE id < "' + data.id + '" ORDER BY id DESC LIMIT 1'
			}, function(data) {
				if (data.rowcount != 0) {	// als er nog records worden gevonden...
					$.jStorage.set("pline.current", data.id);
				}	
			});		
		} else {
			$.getJSON('server/get_record.php', { 
				query: 'SELECT min(id) AS id FROM '+table
			},	function(data) {
				$.jStorage.set("pline.current", data.id);	// NULL when none found
			});
		}		
	});
	show_data(name);
}

// make a new record
function new_rec(table) {
	var name = table.split('.')[1];
	
	$.getJSON('server/new.php', {	
			table: table
	}, function(data) {
		if (data.id != null) {
			$.jStorage.set("pline.current."+name, data.id);
			$("input").not("[type=button]").removeAttr("disabled");
			$("textarea").removeAttr("disabled");
			$("select").removeAttr("disabled");
			$("checkbox").attr("disabled", "disabled");
		}
	});
}

// create an array (0..25) of gradients from green to red and store it in gradient
if ($.jStorage.get("handmade.gradient") == null) {
	(function () {
		var kleuren = Array();
		for (percent=100; percent>=0; percent-=4) {
	 		r = percent<50 ? 255 : Math.floor(255-(percent*2-100)*255/100);
	    g = percent>50 ? 255 : Math.floor((percent*2)*255/100);
	    kleuren.push('rgb('+r+','+g+',0)');
		}
		$.jStorage.set("handmade.gradient", kleuren);
	})();
}

function setColor(element, soort, spec) {		// set the color of a single field (spec = specifications or value)
	var kleuren = $.jStorage.get("handmade.gradient");
	var pct = 0;
	
	switch (soort) {
		case "surfout":
			specmin = null;	specmax = "rol_surfout";
			break;
		case "tightout":
			specmin = null;	specmax = "rol_tightout";
			break;
		case "surfacc":
		case "pdacc":
			specmin = "rol_"+soort+"_min";
			specmax = null;
			break;
	}
	
	el = $(element+" [name="+soort+"]");
	
	if (spec == null) {
		el.css("background-color", "white");
		return 0;	
	}
	waarde = parseFloat(el.val());
	if (isNaN(waarde)) {
		el.css("background-color", kleuren[0] );
	} else {
		if (typeof spec == "object") {
			valmin = (specmin==null) ? -spec[specmax] : spec[specmin];
			valmax = (specmax==null) ? 200-spec["rol_"+soort+"_max"] : spec[specmax];
			sp = specLimits(valmin, valmax);
		} else {
			sp = specLimits(-spec, spec);
		}
		if (isNaN(sp.norm)) {
			el.css("background-color", "white" );	
		} else {
			step = sp.delta/100;
			pct = Math.abs((waarde - sp.norm)/step);
			pct = Math.min(Math.max(pct, 0.0), 100.0);
			el.css("background-color", kleuren[Math.round(pct/4)] );
		}
	}
	return pct;
}

function colorSeries(element, soort, spec) {		// set the color of a row of fields (l1,l2... m1,m2...)
	var totaal = 0.0;
	var aantal = 0;

	specmin = db[element][soort].spec.min;
	specmax = db[element][soort].spec.max;
	
	db[element][soort].field.map(function (field) {
		totaal += setColor("#"+element, field, spec);
		aantal++;
	});
	return Math.max(1, Math.min(100-totaal/aantal, 99)); // 1..99
}

// load the data for the page
function load_data(table) {
	$.jStorage.set("pline_table", table);
	show_data(table); 
}

// shows the data from a table
function show_data(table) {
 
	get_current();	// get the current record pointer
	
	var id = $.jStorage.get("pline.current");
	var sql = sprintf('SELECT * FROM gwc_pline.%s WHERE id=%s', table, id);

	if (id != null)	{
		$.getJSON('server/get_record.php', { 
			query: sql
		}, function(data) {
			switch (table) {
				case "inspection":
					var lang = $.jStorage.get("lang");

					// no records found - disable all input fields
					if ($.jStorage.get("pline.current") == null) {
						$("input").not("[type=button]").attr("disabled", "disabled");
						$("textarea").attr("disabled", "disabled");
					}
					
					// fill the selectbox options
					$.get('server/get_inspector.php', function(data) {
						$('#data [name=inspector]').empty().append(data);	
						$('#data [name=inspectorDis]').empty().append(data);
					});
					$.get('server/get_productionstatus.php?lang='+lang, function(data) {$('#data [name=prodStat]').empty().append(data);	});
					$.get('server/get_inspectionresult.php?lang='+lang, function(data) {$('#data [name=result]').empty().append(data);	});
					$.get('server/get_disposal.php?lang='+lang, function(data) {$('#data [name=disposal]').empty().append(data);	});
					$.get('server/get_specs.php?lang='+lang, function(data) {$('#data [name=number]').empty().append(data);	});
					$.get('server/get_products.php?lang='+lang, function(data) {$('#data [name=product]').empty().append(data);	});	
					$.get('server/get_status.php?lang='+lang, function(data) {
						$('#physdata [name=1_moistOK]').empty().append(data);	
						$('#physdata [name=2_moistOK]').empty().append(data);
						$('#physdata [name=rawMatOK]').empty().append(data);
						$('#physdata [name=storageMatOK]').empty().append(data);
						$('#physdata [name=flavorOK]').empty().append(data);			
						$('#physdata [name=blendcutMatOK]').empty().append(data);
						$('#physdata [name=blendexpMatOK]').empty().append(data);
						$('#physdata [name=blendreOK]').empty().append(data);
						$('#physdata [name=blendstorMix]').empty().append(data);
					});	
				
					// add option when it is not in the select
					["inspector", "product", "inspectorDis", "number"].map(function (label) {
						if (!$('#data [name='+label+']').find("option:contains('" + data[label]  + "')").length) {
							$("<option/>", {value: data[label], text:data[label]}).appendTo($('#data [name='+label+']'));
						}
					});

					["date","batchNr","product","number","prodStat","inspector","result","pendingReason","disposal","matNotNR","inspectorDis"].map(function (label) {
						$("#data [name="+label+"]").val(data[label]);
					});
					["score"].map(function (label) {	$("#data ."+label).html(data[label]);	});

					["rawMatOK","1_matinMoistA","1_matinMoistB","1_moistOK","1_matoutMoistA","1_matoutMoistB","1_matoutTempA","1_matoutTempB","1_accuracy",
					"2_matinMoistA","2_matinMoistB","2_moistOK","2_matoutMoistA","2_matoutMoistB","2_matoutTempA","2_matoutTempB","2_accuracy",
					"storageTime","storageMatOK","cutWidth","cyl_matinMoistA","cyl_matinMoistB","cyl_matoutMoistA","cyl_matoutMoistB",
					"cyl_matoutTempA","cyl_matoutTempB","dry_matoutMoistA","dry_matoutMoistB","dry_matoutTempA","dry_matoutTempB",
					"flavorOK","flavorAccuracy","flavor_matoutMoistA","flavor_matoutMoistB","flavor_matoutMoistC","flavor_matoutMoistD",
					"blendcutMatOK","blendcutAccuracy","blendexpMatOK","blendexpAccuracy","blendreID","blendreOK","blendstorMix",
					"blendstorMoistA","blendstorMoistB","blendstorMoistC","blendstorMoistD",
					"amountLongStems","amountShortStems","fillingPower"].map(function (label) {
						$("#physdata [name="+label+"]").val(data[label]);
					});
					
					var sql = sprintf("SELECT * FROM gwc_pline.penalties WHERE id=%s",  data.penalties);
					$.getJSON('server/get_record.php', {
						query: sql
					},	function(pen) {
						["FeedMatID","1_matinMoist","1_matMoistID","1_matoutMoist","1_matoutTemp","1_accuracy","2_matinMoist","2_matMoistID",
						"2_matoutMoist","2_matoutTemp","2_accuracy","storTime","stormatOK","cutWidth","cyl_matinMoist","cyl_matoutMoist","cyl_matoutTemp",
						"dry_matoutMoist","dry_matoutTemp","blendflavorMatOK","blendflavorAccuracy","blendflavorMoist","blendcutStemID","blendcutAccuracy",
						"blendexpMatOK","blendexpAccuracy","blendreMatOK","blendstorMatOK","blendstorMoist","amountLongStems","amountShortStems",
						"fillingPower"].map(function (label) {
							$("#penalties ."+label).html(pen[label]);
						})
					});
					break;
				case "specs":
					// no records found - disable all input fields
					if ($.jStorage.get("handmade.current.specs") == null) {
						$("#specs input").not("[type=button]").attr("disabled", "disabled");
						$("#specs textarea").attr("disabled", "disabled");
					}
					show_specs();
					break;
				case "users":
					// no records found - disable all input fields
					if ($.jStorage.get("pline.current.users") == null) {
						$("#users input").not("[type=button]").attr("disabled", "disabled");
						$("#users checkbox").attr("disabled", "disabled");
						$("#users .save").attr("disabled", "disabled");
					}
					show_users();
					break;
				case "names":
					show_names();
					break;
			}		
		});
	}
}
	
function show_formulas() {	
	$.getJSON('server/get_range.php', {	// get the data 
		query: "SELECT * FROM gwc_pline.formulas"
	},	function(data) {
		for (i = 0; i < data.count; i++) {
			$("#formulas [number="+data[i].row.id+"]").val(data[i].row.formula);
			$("#formulas [number="+data[i].row.id+"]").attr("modified", false);
		}
	});	
}
	
function show_history() {
	fill_labels();
	var options = $.jStorage.get("pline.historylist");
	
	$.getJSON("server/list_history.php", options, function(data) {
		$.jStorage.set("pline.historylist", options);
		$('#history #lijst tbody').empty();
		$.each(data.records, function (key, regel) {
			$('#history #lijst tbody').append(regel);
		});
	})
	
}

// fill the users list
function show_users() {
	var element = $('#users #userlist tbody');
	
	$.getJSON("server/list_users.php",	function(data) {
		element.empty();
		$.each(data.records, function (key, regel) {
			element.append(regel);
		});		
	})	

	$("#users #userlist tr:eq(0)").addClass('row_selected');	// select the first row
	show_user_details(element.find("td:first center").html());
}

// display all the details of the selected user
function show_user_details(id) {
	var sql = sprintf('SELECT * FROM gwc_pline.users WHERE id=%s', id);

	if (id != null)	{
		$.getJSON('server/get_record.php', { 
			query: sql
		}, function(data) {
			$("#users [name=name]").val(data.name);
			$("#users [name=login]").val(data.login);
			$('#users [name=specs]').prop('checked', (data.specs=='1'));
			$('#users [name=formulas]').prop('checked', (data.formulas=='1'));
			$('#users [name=admin]').prop("checked", (data.admin=='1'));
			$('#users [name=names]').prop("checked", (data.names=='1'));
			$('#users [name=readonly]').prop("checked", (data.readonly=='1'));
			$("#users [name=date]").html(data.date);
			$("#users [name=identity]").html(data.identity);
			$("#users [name=gebruik]").html(data.gebruik);
		});	
	}
	$.jStorage.set("pline.current.users", id);
}

// fill the specs list
function show_specs() {
	var element = $('#specs #products tbody');
	
	$.getJSON("server/list_specs.php",	function(data) {
		element.empty();
		$.each(data.records, function (key, regel) {
			element.append(regel);
		});		
	})	

	$("#specs #products tr:eq(0)").addClass('row_selected');	// select the first row

	// fill the spec history in the second list
	show_spec_history(element.find("td:first center").html());
}

// fill the spec-history list
function show_spec_history(id) {
	var element = $('#specs #history tbody');
	
	$.getJSON("server/list_spec_history.php", {
		id: id
	}, function(data) {
		element.empty();
		$.each(data.records, function (key, regel) {
			element.append(regel);
		});		
	})
	
	$("#specs #history tr:eq(0)").addClass('row_selected');	// select the first row		
	
	show_spec_details(id);
}

// display all the details of the selected specification
function show_spec_details(id) {
	var sql = sprintf('SELECT * FROM gwc_pline.specs WHERE id=%s', id);
	var fields = [];

	$.jStorage.set("pline.current.specs", id);

	if (id != null)	{
		$.getJSON('server/get_record.php', { 
			query: sql
		}, function(data) {
			fields = getFields(dbs);		// get all the field names from dbs
			fields.map(function(fieldname){
				$("#specs [name="+fieldname+"]").val(data[fieldname]);
			});
		});	
	}
}


function show_names() {
	$.getJSON('server/get_record.php', { 
		query: "SELECT * FROM gwc_pline.names WHERE id=1"
	}, function(data) {
		$("#names [name=inspector]").val(data.inspector);
	});	
}

function show_evaluation() {
	var start_date = $("#evaluate [name=start]").val();
	var end_date = $("#evaluate [name=end]").val();

	// fill the selectbox options
	$.getJSON('server/get_evalselect.php', {
		start: start_date,
		end: end_date,
		product: 0,
		prodStat: 0,
		result: 0,
		disposal: 0,
		lang: $.jStorage.get("lang")
	},function(data) {	
		$('#evaluate [name=prodStat]').empty().append(data.prodStat);	
		$('#evaluate [name=product]').empty().append(data.product);
		$('#evaluate [name=result]').empty().append(data.result);
		$('#evaluate [name=disposal]').empty().append(data.disposal);		
	});

	// set the onchange events for start/end date
	setTimeout(function() {
		$("#evaluate .datum").each(function () {
			var zd = $(this).data('Zebra_DatePicker');
			zd.update({
			  onSelect: function () { 
					var start_date = $("#evaluate [name=start]").val();
					var end_date = $("#evaluate [name=end]").val();

					// fill the selectbox options
					$.getJSON('server/get_evalselect.php', {
						start: start_date,
						end: end_date,
						product: 0,
						prodStat: 0,
						result: 0,
						disposal: 0,
						lang: $.jStorage.get("lang")
					},function(data) {	
						$('#evaluate [name=prodStat]').empty().append(data.prodStat);	
						$('#evaluate [name=product]').empty().append(data.product);
						$('#evaluate [name=result]').empty().append(data.result);
						$('#evaluate [name=disposal]').empty().append(data.disposal);		

						if ($.jStorage.get("pline_evaluationtab") == 1)						
							createSheet();
					});
			  }
			});
		})
	}, 100);
}


// calculate Cp (process capability)
function cp(LSL, USL, VAL) {
	var cp, sigma;
	
	sigma = jStat.stdev(VAL, true);
	if (sigma==0) sigma=0.001;
	cp = (USL-LSL)/(6*sigma);
	return cp.toFixed(2);
}

// calculate Cpk (process capability index)
function cpk(LSL, USL, VAL) {
	var avg, sigma, cpl, cpu, cpk;
	
	sigma = jStat.stdev(VAL, true);
	if (sigma==0) sigma=0.001;
	avg = jStat.mean(VAL);
	cpl = (avg-LSL)/(3*sigma);
 	cpu = (USL-avg)/(3*sigma);
 	cpk = Math.min(cpl, cpu);
 	return isNaN(cpk) ? "--" : cpk.toFixed(2);	
}
	
