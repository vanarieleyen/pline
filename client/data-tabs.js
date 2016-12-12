
var data_content = {
	subTabs: [
		m("#tabs1.subtabs1", [
			m("ul", [
				[
					{label:"label.ROLLING_PROCESS", href:"#rolling_sub_tab"},
					{label:"label.WRAPPING_PROCESS", href:"#wrapping_sub_tab"},
					{label:"label.MACHINE_CUTTING", href:"#cutting_sub_tab"},
					{label:"label.STORAGE_PROCESS", href:"#storage_sub_tab"},
					{label:"label.APPEARANCE", href:"#defects_sub_tab"}
				].map(function (a) {
					return m("li", 
									m("a", {href: a.href, tabindex:"-1", class: "last" }, [
										m(a.label)
									])
								)
				})
			]),
			[	// the tabs used by ui-tabs
				m("#rolling_sub_tab", m.component(rolling_content)),
				m("#wrapping_sub_tab", m.component(wrapping_content)),
				m("#cutting_sub_tab", m.component(cutting_content)),
				m("#storage_sub_tab", m.component(storage_content)),
				m("#defects_sub_tab", m.component(defects_content))
			]
		])
	],
	controller: function (element, isInitialized) {
		if (isInitialized)
			return;

		// default tab when page is first loaded
		var initialtab = $.jStorage.get("handmade_datatab");
		
		$( "#tabs1" ).tabs({
			active: initialtab,			
			activate: function( event, ui ) {
				keus = ui.newPanel[0].id;
				$.jStorage.set("handmade_lasttab", keus);

				switch (keus) {
					case "rolling_sub_tab":		$.jStorage.set("handmade_datatab", 0);	load_data("rolling"); 
												break;
					case "wrapping_sub_tab": 	$.jStorage.set("handmade_datatab", 1);	load_data("wrapping");
												break;
					case "cutting_sub_tab": 	$.jStorage.set("handmade_datatab", 2);	load_data("cutting");
												break;
					case "storage_sub_tab": 	$.jStorage.set("handmade_datatab", 3);	load_data("storage");
												break;
					case "defects_sub_tab": 	$.jStorage.set("handmade_datatab", 4);
												break;
				}
			},
			create: function( event, ui ) {
				switch (initialtab) {
					//case 0: load_data("rolling");  break;		// removed all: has to be called in functions
					//case 1: load_data("wrapping"); break;
					//case 2: load_data("cutting"); break;
					//case 3: load_data("storage"); break;
				}
			}
		});
		
	},
	view: function () {
		return m("div", this.subTabs);
	}
}


