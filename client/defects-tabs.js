
var defects_content = {
	subTabs: [
		m("#tabs3.subtabs1", [
			m("ul", [
				[
					{label:"label.STICK_PACK_QUALITY", href:"#stick_sub_tab"},
					{label:"label.PACKAPPEARANCE", href:"#pack_sub_tab"},
					{label:"label.SLEEVEBOX", href:"#sleeve_sub_tab"}
				].map(function (a) {
					return m("li", 
									m("a", {href: a.href, tabindex:"-1", class: "last" }, [
										m(a.label)
									])
								)
				})
			]),
			[			// the tabs used by ui-tabs
				m("#stick_sub_tab", m.component(stickdefects_content)),
				m("#pack_sub_tab", m.component(packdefects_content)),
				m("#sleeve_sub_tab", m.component(sleevedefects_content))
			]
		])
	],
	controller: function (element, isInitialized) {
		if (isInitialized)
			return;

		// default tab when page is first loaded
		var initialtab = $.jStorage.get("handmade_defectstab");
		
		$( "#tabs3" ).tabs({
			active: initialtab,
			activate: function( event, ui ) {
				keus = ui.newPanel[0].id;
				switch (keus) {
					case "stick_sub_tab":		$.jStorage.set("handmade_defectstab", 0);	load_data("stickDefects"); 
												break;	
					case "pack_sub_tab": 		$.jStorage.set("handmade_defectstab", 1);	load_data("packDefects"); 
												break;	
					case "sleeve_sub_tab": 	$.jStorage.set("handmade_defectstab", 2);	load_data("boxDefects"); 
												break;
				}
			},
			create: function( event, ui ) {
				switch (initialtab) {
					case 0: load_data("stickDefects"); break;
					case 1: load_data("packDefects"); break;
					case 2: load_data("boxDefects"); break;
				}
			}
		});
	},
	view: function () {
		return m("div", this.subTabs);
	}
}


