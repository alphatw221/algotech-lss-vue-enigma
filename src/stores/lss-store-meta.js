import { defineStore } from "pinia";
import { ref } from "vue"
export const useLSSStoreMetaStore = defineStore("storeMeta", {
  state: () => ({
	enable:{
		key:"enable",
		type:"input",
		input_type:"checkbox",
		datatype:"boolean",
		default:false,
	},
	point_validity:{
		key:"point_validity",
		type:"component",
		input_type:"number",
		datatype:"number",
		default:0,
	},
	point_validity:{
		key:"default_point_redemption_rate",
		type:"component",
		datatype:"number",
		default:1,
	},
	point_validity:{
		key:"reward_table",
		type:"component",
		datatype:"object",
		default:[],
		template:{
			fields:[
				{key:"upper_bound", type:"input", dataType:"number", default:1},
				{key:"point_redemption_rate", type:"input", dataType:"number", default:1},
			]
		}
	},
	point_validity:{
		key:"redemption_rate_point",
		type:"component",
		datatype:"number",
		default:1,
	},
	point_validity:{
		key:"redemption_rate_cash",
		type:"component",
		datatype:"number",
		default:1,
	},
	point_validity:{
		key:"description",
		type:"textarea",
		datatype:"string",
		default:"",
		placeholder:"..."
	},
	


  }),
});
