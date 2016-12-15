/* 	database structure diagram with fieldnames and corresponding specnames
		dbs: specifications table
		db: remaining tables (data)
*/
var dbs = {
	id: 		{field: "id"},
	pid: 		{field: "pid"},
	number:	{field: "number"},
	naam:		{field: "name"},
	remark:	{field: "remark"},
	date:		{start: "start", end: "end"},
	regain1:	{
		matinmoist:		{min:"1_matinMoistMin",	max:"1_matinMoistMax"},
		matoutmoist:	{min:"1_matoutMoistMin", max:"1_matoutMoistMax"},
		matouttemp:		{min:"1_matoutTempMin",	max:"1_matoutTempMax"},
		accuracy:			{field: "1_accuracy"}
	},
	regain2:	{
		matinmoist:		{min:"2_matinMoistMin",	max:"2_matinMoistMax"},
		matoutmoist:	{min:"2_matoutMoistMin", max:"2_matoutMoistMax"},
		matouttemp:		{min:"2_matoutTempMin",	max:"2_matoutTempMax"},
		accuracy:			{field: "2_accuracy"}
	},
	storage:				{min:"storTimeMin", max:"storTimeMax"},
	cutwidth:				{min:"cutWidthMin", max:"cutWidthMax"},
	cylheat:	{
		matinmoist:		{min:"cyl_matinMoistMin",	max:"cyl_matinMoistMax"},
		matoutmoist:	{min:"cyl_matoutMoistMin",	max:"cyl_matoutMoistMax"},
		matouttemp:		{min:"cyl_matoutTempMin",	max:"cyl_matoutTempMax"}
	},
	drying:	{
		matoutmoist:	{min:"dry_matoutMoistMin",	max:"dry_matoutMoistMax"},
		matouttemp:		{min:"dry_matoutTempMin",	max:"dry_matoutTempMax"}
	},
	blending: 			{min:"blendstorMoistMin", max:"blendstorMoistMax"},
	blendcutacc:		{field: "blendcutAccuracy"},
	blendexpacc:		{field: "blendexpAccuracy"},
	blendflavacc:		{field: "blendflavorAccuracy"},
	flavoring:			{min:"flavor_matoutMoistMin", max:"flavor_matoutMoistMax"},
	stems:				{long:"amountLongStems", short:"amountShortStems"},
	filling:	{field: "fillingPower"}
}

var db = {
	id: 			{field: ["id"],spec: []},
	product: 	{field: ["product"],spec: []},
	penalties:	{field: ["penalties"],spec: []},
	specs:		{field: ["specs"],spec: []},
	number:		{field: ["number"],spec: []},
	inspector:	{field: ["inspector"],spec: []},
	date:			{field: ["date"],spec: []},
	result:		{field: ["result"],spec: []},
	pending:		{field: ["pendingReason"],spec: []},
	disposal:	{field: ["disposal"],spec: []},
	matnr:		{field: ["matNotNR"],spec: []},
	inspdis:		{field: ["inspectorDis"],spec: []},
	batch:		{field: ["batchNr"],spec: []},
	prodstat:	{field: ["prodStat"],spec: []},
	regain1:		{
		matok:			{field: ["1_moistOK"],spec: []},
		accuracy:		{field: ["1_accuracy"],spec: []},
		matinmoist:		{field: ["1_matinMoistA", "1_matinMoistB"], spec: dbs.regain1.matinmoist},
		matoutmoist:	{field: ["1_matoutMoistA", "1_matoutMoistB"], spec: dbs.regain1.matoutmoist},
		matouttemp:		{field: ["1_matoutTempA", "1_matoutTempB"], spec: dbs.regain1.matouttemp}
	},
	regain2:		{
		matok:			{field: ["2_moistOK"],spec: []},
		accuracy:		{field: ["2_accuracy"],spec: []},
		matinmoist:		{field: ["2_matinMoistA", "2_matinMoistB"], spec: dbs.regain2.matinmoist},
		matoutmoist:	{field: ["2_matoutMoistA", "2_matoutMoistB"], spec: dbs.regain2.matoutmoist},
		matouttemp:		{field: ["2_matoutTempA", "2_matoutTempB"], spec: dbs.regain2.matouttemp}
	},
	storage:		{
		time:			{field: ["storageTime"],spec: dbs.storage},
		matok:		{field: ["storageMatOK"],spec: []}
	},
	cutwidth:	{field: ["cutWidth"],spec: dbs.cutwidth},
	cylheat:		{
		matinmoist:		{field: ["cyl_matinMoistA", "cyl_matinMoistB"], spec: dbs.cylheat.matinmoist},
		matoutmoist:	{field: ["cyl_matoutMoistA", "cyl_matoutMoistB"], spec: dbs.cylheat.matoutmoist},
		matouttemp:		{field: ["cyl_matoutTempA", "cyl_matoutTempB"], spec: dbs.cylheat.matouttemp}
	},
	drying:		{
		matoutmoist:	{field: ["dry_matoutMoistA", "dry_matoutMoistB"], spec: dbs.drying.matoutmoist},
		matouttemp:		{field: ["dry_matoutTempA", "dry_matoutTempB"], spec: dbs.drying.matouttemp}
	},
	blend:		{
		matoutmoist:	{field: ["blendstorMoistA", "blendstorMoistB", "blendstorMoistC", "blendstorMoistD"], spec: dbs.blending},
		cut:	{
			matOK:			{field: ["blendcutMatOK"],spec: []},
			accuracy:		{field: ["blendcutAccuracy"],spec: []}
		},
		exp:	{
			matOK:			{field: ["blendexpMatOK"],spec: []},
			accuracy:		{field: ["blendexpAccuracy"],spec: []}
		},
		recycled:	{
			matOK:			{field: ["blendreOK"],spec: []},
			ID:				{field: ["blendreID"],spec: []}
		},
		storage:	{
			mix:				{field: ["blendstorMix"],spec: []},
		}
	},
	flavor:	{
		matOK:			{field: ["flavorOK"],spec: []},
		accuracy:		{field: ["flavorAccuracy"],spec: []},
		matoutmoist:	{field: ["flavor_matoutMoistA", "flavor_matoutMoistB", "flavor_matoutMoistC", "flavor_matoutMoistD"], spec: dbs.flavoring}	
	},
	stems: 	{
		long:	 	{field: "amountLongStems", spec: dbs.stems.long},
		long: 	{field: "amountShortStems", spec: dbs.stems.short},
		filling:	{field: "fillingPower", spec: dbs.filling}
	}
}

