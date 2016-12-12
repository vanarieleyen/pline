window.$ = require("jquery");
window.m = require('mithril');
jQuery = window.$;

require('jquery-ui');


function requireAll(r) { 		// load all files from a folder
	r.keys().map(r); 
}

// load all css files from styles-directory
requireAll(require.context('../styles/', false, /\.css$/));

// load all .js files that don't need the <script> encapsulation
requireAll(require.context('./js/', false, /\.js$/));

// load all .js files that need the <script> encapsulation (are loaded by the script-loader)
requireAll(require.context('./js/script/', false, /\.js$/));


var debug=false;

// wrapper for require script (shows which file is processed)
function include(filename) {
	if (debug)
		console.log("processing: "+filename);	
	require('script!./'+filename);
}

// the login box
var loginBox = [
	m("#loginpop.scale", {style:"display:none"},
		m("table", [
			m("tr", [
				m("td.ENTERPASS.scale"),			
				m("td", m("input#login.scale", {type:"password"}) )
			]),
			m("tr", {align:"center"},	m("td", {colspan:"2", style:"height:1em"})),
			m("tr", {align:"center"}, 
				m("td", {colspan:"2"}, m("input.close.login.scale", {type:"button"}))
			)			
		])
	)
]

// the language box
var flagBox = [ 
	m("span.flagbox", [
		m("img", {src: require("../assets/CN.jpg"), onclick: function(){$.jStorage.set("lang", 0); fill_labels();} }),
		m("img", {src: require("../assets/GB.jpg"), onclick: function(){$.jStorage.set("lang" , 1); fill_labels();} })
	])
]

// read and evaluate the tab-scripts 
// childs first, then the parents
// where initially evaluated: eval(require('script!./rolling.js'));	but doesn't seem to be necessary

include('stick-defects.js');
include('pack-defects.js');
include('sleeve-defects.js');

include("rolling.js");
include('wrapping.js');
include('cutting.js');
include('storage.js');
include('defects-tabs.js');
include('data-tabs.js');			// parent

include('history.js');

include('evaluate.js');

include('specs.js');					// children of settings-tab
include('formulas.js');	
include('users.js');	
include('names.js');	
include('settings-tabs.js');	// parent

// the tabs used by ui-tabs
var tabContents = [
	m("#data_tab", m.component(data_content)),
	m("#history_tab", m.component(history_content)),
	m("#evaluate_tab", m.component(evaluate_content)),
	m("#settings_tab", m.component(settings_content))
]

var uiTabs = [
	m("#tabs.pagecontainer", [
		m("ul", [
			[
				{label:"label.PACKING50", href:"#data_tab"},
				{label:"label.HISTORY", href:"#history_tab"},
				{label:"label.EVALUATE", href:"#evaluate_tab"},
				{label:"label.SETTINGS", href:"#settings_tab"}
			].map(function (a) {
				return m("li", 
								m("a", {href: a.href, tabindex:"-1", class: "last" }, [
									m(a.label)
								])
							)
			})
		]),
		tabContents
	])
]

// the complete handmade component
var handmade = {
	view: function () {
		return [loginBox, flagBox,	uiTabs,	tabContents];
	}
}

$(document).ready(function() {
	m.mount(document.body, handmade );

	$.getJSON('server/get_server.php', function (data) {
		if (data != "127.0.0.1")	// dont show login on development server
			$("#loginpop").popup();
	});
	
	$("#loginpop").on('keydown', function(e) {
		if (e.which == 13) 
			$("#loginpop .login").click();
	});
	
	// check login and set permissions
	$("#loginpop .close").click(function() {
		$.getJSON("server/check_pass.php",{
			pass: $("#loginpop #login").val()
		}, function(data) {
			if (data.admin == 1) {
				$("#delete").show();
			} else {
				$("[aria-controls=users_sub_tab]").hide();
				if (data.specs == 0) 			$("#specs input").attr("disabled","disabled");
				if (data.formulas == 0) 	$("[aria-controls=formulas_sub_tab]").hide();
				if (data.names == 0) {
					$("#names textarea").attr("disabled","disabled");
					$("#names input").attr("disabled","disabled");
				}
			}
		})	
		$("#loginpop").popdown();
	})	
	
	create_gauges();

	if ($.jStorage.get("lang") == null)
		$.jStorage.set("lang", 0);
	if ($.jStorage.get("handmade_maintab") == null)
		$.jStorage.set("handmade_maintab", 0);
	if ($.jStorage.get("handmade_datatab") == null)
		$.jStorage.set("handmade_datatab", 0);
	if ($.jStorage.get("handmade_defectsstab") == null)
		$.jStorage.set("handmade_defectsstab", 0);
	if ($.jStorage.get("handmade_settingstab") == null)
		$.jStorage.set("handmade_settingstab", 0);

	fill_labels();

	// default tab when page is first loaded
	var initialtab = $.jStorage.get("handmade_maintab");
		
	$( "#tabs" ).tabs({
		active: initialtab,
		activate: function( event, ui ) {
			keus = ui.newPanel[0].id;
			switch (keus) {
				case "data_tab":			
					show_datatab();
					$.jStorage.set("handmade_maintab", 0);
					break;
				case "history_tab": 	
					show_history(); 												// update the history
					$.jStorage.set("handmade_maintab", 1);
					break;
				case "evaluate_tab": 
					show_evaluation();		
					$.jStorage.set("handmade_maintab", 2);
					break;
				case "settings_tab": 	
					show_specs();
					$.jStorage.set("handmade_maintab", 3);
					break;
			}
		},
		create: function( event, ui ) {
			switch (initialtab) {
				case 0: show_datatab(); break;
				case 1: show_history(); break;
				case 2: show_evaluation(); break;
			}
		}
	});

	$('.datum').Zebra_DatePicker();		// set all .datum inputs to datepicker
	
	/*
	// set the events for start/end date
	var start_date = $('#evaluate [name=start]').data('Zebra_DatePicker');
	var end_date = $('#evaluate [name=end]').data('Zebra_DatePicker');
	start_date.update({
	  onSelect: function () { alert() }
	});
	end_date.update({
	  onSelect: function () { alert() }
	});
	*/
});

