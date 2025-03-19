type Json =
	| Json[]
	| string
	| number
	| boolean
	| null
	| Date
	| { [key: string]: Json };

export default Json;
