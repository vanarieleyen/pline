/* 	database structure diagram with fieldnames and corresponding specnames
		dbs: specifications table
		db: remaining tables (data)
*/

var dbs = {
	id:				{field: "id"},
	pid:			{field: "pid"},
	date:			{
		start: "start", 
		end: "end", 
		creation: "date"
	},
	product:	{field: "name"},
	number:		{field: "nr"},
	rolling:	{
		lengte:		{min:"rol_l_min",	max:"rol_l_max"},
		omtrek:		{min:"rol_c_min", max:"rol_c_max"},
		gewicht:	{min:"rol_w_min", max:"rol_w_max"},
		pd:				{min:"rol_p_min", max:"rol_p_max"},
		surfout:	{norm:"rol_surfout"},
		tightout:	{norm:"rol_tightout"},
		blendacc:	{min:"rol_blendacc_min", max:"rol_blendacc_max"},
		pdacc:		{min:"rol_pdacc_min", max:"rol_pdacc_max"}
	},
	wrapping:	{
		gewicht:	{min:"weight_w_min", max:"weight_w_max"},
		moisture:	{min:"moist_w_min", max:"moist_w_max"}
	},
	storage:	{
		moisture:	{min:"moist_s_min", max:"moist_s_max"}
	}
}

var db = {
	rolling: {
		id:						{field: ["id"],spec: []},
		date:					{field: ["date"],spec: []},
		product:			{field: ["product"],spec: []},
		sampling:			{field: ["name"],spec: []},
		lengte:				{field: ["l1","l2","l3","l4","l5","l6","l7","l8","l9","l10"], spec: dbs.rolling.lengte},
		omtrek:				{field: ["c1","c2","c3","c4","c5","c6","c7","c8","c9","c10"], spec: dbs.rolling.omtrek},
		gewicht: 			{field: ["w1","w2","w3","w4","w5","w6","w7","w8","w9","w10"], spec: dbs.rolling.gewicht},
		pd:						{field: ["p1","p2","p3","p4","p5","p6","p7","p8","p9","p10"], spec: dbs.rolling.pd},
		surfout:			{field: ["surfout"], spec: [dbs.rolling.surfout.norm]},
		tightout:			{field: ["tightout"], spec: [dbs.rolling.tightout.norm]},
		blendacc:			{field: ["blendacc"], spec: [dbs.rolling.blendacc.min, dbs.rolling.blendacc.max]}, 
		pdacc:				{field: ["pdacc"], spec: [dbs.rolling.pdacc.min, dbs.rolling.pdacc.max]}, 
		score:				{field: ["score"],spec: []},
		quality:			{field: ["quality"],spec: []},
		inspector:		{field: ["inspector"],spec: []},
		remarks:			{field: ["remarks"],spec: []}
	},
	wrapping: {
		id:						{field: ["id"],spec: []},
		date:					{field: ["date"],spec: []},
		product:			{field: ["product"],spec: []},
		sampling:			{field: ["name"],spec: []},
		gewicht: 			{field: ["w1","w2","w3","w4","w5","w6","w7","w8","w9","w10"], spec: dbs.wrapping.gewicht},
		moisture:			{field: ["m1","m2","m3","m4","m5","m6","m7","m8","m9","m10"], spec: dbs.wrapping.moisture},
		headend:			{field: ["headend"],spec: []},
		wrapok:				{field: ["wrapok"],spec: []},
		incision:			{field: ["incision"],spec: []},
		leeg:					{field: ["empty"],spec: []},
		tightness:		{field: ["tightness"],spec: []},
		veins:				{field: ["veins"],spec: []},
		crease:				{field: ["crease"],spec: []},
		spot:					{field: ["spot"],spec: []},
		blot:					{field: ["blot"],spec: []},
		seam:					{field: ["seam"],spec: []},
		hole:					{field: ["hole"],spec: []},
		crack:				{field: ["crack"],spec: []},
		splices:			{field: ["splice"],spec: []},
		score:				{field: ["score"],spec: []},
		quality:			{field: ["quality"],spec: []},
		inspector:		{field: ["inspector"],spec: []},
		remarks:			{field: ["remarks"],spec: []}
	},
	cutting: {
		id:						{field: ["id"],spec: []},
		date:					{field: ["date"],spec: []},
		product:			{field: ["product"],spec: []},
		sampling:			{field: ["name"],spec: []},
		headend:			{field: ["headend"],spec: []},
		incision:			{field: ["incision"],spec: []},
		leeg:					{field: ["empty"],spec: []},
		crease:				{field: ["crease"],spec: []},
		blot:					{field: ["blot"],spec: []},
		seam:					{field: ["seam"],spec: []},
		crack:				{field: ["crack"],spec: []},
		score:				{field: ["score"],spec: []},
		quality:			{field: ["quality"],spec: []},
		inspector:		{field: ["inspector"],spec: []},
		remarks:			{field: ["remarks"],spec: []}
	},
	storage: {
		id:						{field: ["id"],spec: []},
		date:					{field: ["date"],spec: []},
		product:			{field: ["product"],spec: []},
		start:				{field: ["start"],spec: []},
		end:					{field: ["end"],spec: []},
		moisture: 		{field: ["m1","m2","m3","m4","m5","m6","m7","m8"], spec: dbs.storage.moisture},
		deworm:				{field: ["deworm"],spec: []},
		dopant:				{field: ["dopant"],spec: []},
		headend:			{field: ["headend"],spec: []},
		leeg:					{field: ["empty"],spec: []},
		seam:					{field: ["seam"],spec: []},
		hole:					{field: ["hole"],spec: []},
		crack:				{field: ["break"],spec: []},
		score:				{field: ["score"],spec: []},
		quality:			{field: ["quality"],spec: []},
		inspector:		{field: ["inspector"],spec: []},
		incharge:			{field: ["incharge"],spec: []},
		remarks:			{field: ["remarks"],spec: []}
	},
	stickDefects: {
		id:						{field: ["id"],spec: []},
		date:					{field: ["date"],spec: []},
		product:			{field: ["product"],spec: []},
		sample:				{field: ["sample"],spec: []},
		score:				{field: ["score"],spec: []},
		inspector:		{field: ["inspector"],spec: []},
		remarks:			{field: ["remarks"],spec: []},
		sjob:					{field: ["sjob"],spec: []},
		judge:				{field: ["judge"],spec: []},
		sremarks:			{field: ["sremarks"],spec: []},
		ring:					{field: ["srd1","srd2","srd3"], spec: []},
		ringAmount:		{field: ["srd1_nr","srd2_nr","srd3_nr"], spec: []},
		cell:					{field: ["scd1","scd2","scd3"], spec: []},
		cellAmount:		{field: ["scd1_nr","scd2_nr","scd3_nr"], spec: []},
		set:					{field: ["ssd1","ssd2","ssd3"], spec: []},
		setAmount:		{field: ["ssd1_nr","ssd2_nr","ssd3_nr"], spec: []},
		pack:					{field: ["spd1","spd2","spd3"], spec: []},
		packAmount:		{field: ["spd1_nr","spd2_nr","spd3_nr"], spec: []}
	},
	packDefects: {
		id:						{field: ["id"],spec: []},
		date:					{field: ["date"],spec: []},
		product:			{field: ["product"],spec: []},
		sample:				{field: ["sample"],spec: []},
		score:				{field: ["score"],spec: []},
		inspector:		{field: ["inspector"],spec: []},
		remarks:			{field: ["remarks"],spec: []},
		pjob:					{field: ["pjob"],spec: []},
		judge:				{field: ["judge"],spec: []},
		premarks:			{field: ["premarks"],spec: []},
		quality:			{field: ["ppd1","ppd2","ppd3"], spec: []},
		qualityAmount:{field: ["ppd1_nr","ppd2_nr","ppd3_nr"], spec: []},
		pack:					{field: ["pm1","pm2","pm3"], spec: []},
		packAmount:		{field: ["pm1_nr","pm2_nr","pm3_nr"], spec: []}
	},
	boxDefects: {
		id:						{field: ["id"],spec: []},
		date:					{field: ["date"],spec: []},
		product:			{field: ["product"],spec: []},
		sample:				{field: ["sample"],spec: []},
		score:				{field: ["score"],spec: []},
		inspector:		{field: ["inspector"],spec: []},
		remarks:			{field: ["remarks"],spec: []},
		bjob:					{field: ["bjob"],spec: []},
		judge:				{field: ["judge"],spec: []},
		bremarks:			{field: ["bremarks"],spec: []},
		sleeve:				{field: ["bsd1","bsd2","bsd3"], spec: []},
		sleeveAmount:	{field: ["bsd1_nr","bsd2_nr","bsd3_nr"], spec: []},
		box:					{field: ["bb1","bb2","bb3"], spec: []},
		boxAmount:		{field: ["bb1_nr","bb2_nr","bb3_nr"], spec: []},
		pack:					{field: ["bm1","bm2","bm3"], spec: []},
		packAmount:		{field: ["bm1_nr","bm2_nr","bm3_nr"], spec: []}
	},
	defectlabels: {
		id:						{field: ["id"],spec: []},
		cell:					{field: ["code"],spec: []},
		text:					{field: ["text"],spec: []},
		soort:				{field: ["type"],spec: []}
	},
	formulas: {
		id:	{field: ["id"],spec: []},
		rolling: {
			lengte:	{
				low: "l_outlow",	
				high: "l_outhigh",
				inspecs: "l_inspec"
			},
			omtrek:	{
				low: "c_outlow",	
				high: "c_outhigh",
				inspecs: "c_inspec"
			},
			gewicht:	{
				low: "w_outlow",	
				high: "w_outhigh",
				inspecs: "w_inspec"
			},
			pd:	{
				low: "p_outlow",	
				high: "p_outhigh",
				inspecs: "p_inspec"
			},
			batch:	{
				score: "r_batch_score",	
				quality: "r_batch_quality"
			}
		},
		wrapping: {
			batch:	{
				score: "w_batch_score",	
				quality: "w_batch_quality"
			}
		},
		cutting: {
			batch:	{
				score: "c_batch_score",	
				quality: "c_batch_quality"
			}
		},
		storage: {
			moisture:	{
				low: "m_outlow",	
				high: "m_outhigh",
				inspecs: "m_inspec",
				inspecss: "m_2inspec"
			},
			batch:	{
				score: "s_batch_score",	
				quality: "s_batch_quality"
			}
		}
	},
	names: {
		id:					{field: ["id"],spec: []},
		inspector:	{field: ["inspector"],spec: []},
		sampling:		{field: ["name"],spec: []},
		incharge:		{field: ["incharge"],spec: []}
	},
	users: {
		id:					{field: ["id"],spec: []},
		date:				{field: ["date"],spec: []},					// the last login date
		ip:					{field: ["identity"],spec: []},			// where the last login came from
		gebruik:		{field: ["gebruik"],spec: []},			// how much the login is used
		name:				{field: ["name"],spec: []},
		password:		{field: ["login"],spec: []},
		specs:			{field: ["specs"],spec: []},				// enable specs edit
		formulas:		{field: ["formulas"],spec: []},			// enable formula edit
		admin:			{field: ["admin"],spec: []},				// admin user (all editable)
		readonly:		{field: ["readonly"],spec: []},			// make everything readonly
		names:			{field: ["names"],spec: []}					// enable names edit
	}
}

