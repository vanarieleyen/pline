updates:

add fields to specs table:
	1_accuracy
	2_accuracy
	blendcutAccuracy
	blendexpAccuracy
	blendflavorAccuracy
	(varchar 4)

change specs table:
	pid: default -1
	end: default: 3000-01-01 00:00:00
	
	todo:
	evaluation - include production status, inspection results and status in the select data (functions.js and evaluate.js)
	evaluation - also use the rawdata for the export functions
