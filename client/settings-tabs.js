
var settings_content = {
	subTabs: [
		m("#tabs2.subtabs1", [
			m("ul", [
				[
					{label:"label.PENALTY", href:"#formulas_sub_tab"},
					{label:"label.PRODUCTS", href:"#specs_sub_tab"},
					{label:"label.SETTINGS", href:"#users_sub_tab"},
					{label:"label.NAAM", href:"#names_sub_tab"}
				].map(function (a) {
					return m("li", 
									m("a", {href: a.href, tabindex:"-1", class: "last" }, [
										m(a.label)
									])
								)
				})
			]),
			[			// the tabs used by ui-tabs
				m("#formulas_sub_tab", m.component(formulas_content)),
				m("#specs_sub_tab", m.component(specs_content)),
				m("#users_sub_tab", m.component(users_content)),
				m("#names_sub_tab", m.component(names_content))
			]
		])
	],
	controller: function (element, isInitialized) {
		if (isInitialized)
			return;
		
		// default tab when page is first loaded
		var initialtab = $.jStorage.get("pline_settingstab");
		
		$( "#tabs2" ).tabs({
			active: initialtab,			// default tab when page is first loaded
			activate: function( event, ui ) {
				keus = ui.newPanel[0].id;
				switch (keus) {
					case "formulas_sub_tab":	$.jStorage.set("pline_settingstab", 0);		show_formulas();
												break;
					case "specs_sub_tab": 		$.jStorage.set("pline_settingstab", 1);		load_data("specs");
												break;
					case "users_sub_tab":		$.jStorage.set("pline_settingstab", 2);		load_data("users");
												break;
					case "names_sub_tab": 		$.jStorage.set("pline_settingstab", 3);		load_data("names");
												break;
				}
			},
			create: function( event, ui ) {
				switch (initialtab) {
					case 0: show_formulas(); break;
					case 1: load_data("specs"); break;
					case 2: load_data("users"); break;
					case 3: load_data("names"); break;
				}
			}
		});
	},
	view: function () {
		return m("div", this.subTabs);
	}
}


