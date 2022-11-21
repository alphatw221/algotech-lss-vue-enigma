import { options } from "dropzone";
import { defineStore } from "pinia";
import { ref } from "vue"
export const useLSSRemindMetaStore = defineStore("remindMeta", {
  state: () => ({

	enable_auto_remind:{
		key:"enable_auto_remind",
		type:"input",
		input_type:"checkbox",
		datatype:"boolean",
		default:false,
	},

	auto_remind_time:{
		key:"auto_remind_time",
		type:"component",
		datatype:"object",
		default:{ type:null, data:{} },
		type_options:{
			"cart_idle":{key:"cart_idle", value:"cart_idle", fields:[{key:'hours', type:'input', datatype:'number', inputType:'number'}]},
			"campaign_end":{key:"campaign_end", value:"campaign_end", fields:[{key:'hours', type:'input', datatype:'number', inputType:'number'}]}
		},
	},

	auto_remind_html:{
		key:"remind_html",
		type:"editor",
		datatype:"string",
		default:"",
		placeholder:"..."
	},

	auto_remind_text:{
		key:"remind_text",
		type:"textarea",
		datatype:"string",
		default:"",
		placeholder:"..."
	},


	enable_auto_clear:{
		key:"enable_auto_clear",
		type:"input",
		input_type:"checkbox",
		datatype:"boolean",
		default:false,
	},

	auto_clear_time:{
		key:"auto_clear_time",
		type:"component",
		datatype:"object",
		default:{ type:null, data:{} },
		type_options:{
			"cart_idle":{key:"cart_idle", value:"cart_idle", fields:[{key:'hours', type:'input', datatype:'number', inputType:'number'}]},
			"campaign_end":{key:"campaign_end", value:"campaign_end", fields:[{key:'hours', type:'input', datatype:'number', inputType:'number'}]}
		},
	},


	enable_auto_delete:{
		key:"enable_auto_delete",
		type:"input",
		input_type:"checkbox",
		datatype:"boolean",
		default:false,
	},

	auto_clear_time:{
		key:"auto_delete_time",
		type:"component",
		datatype:"object",
		default:{ type:null, data:{} },
		type_options:{
			"cart_idle":{key:"cart_idle", value:"cart_idle", fields:[{key:'hours', type:'input', datatype:'number', inputType:'number'}]},
			"campaign_end":{key:"campaign_end", value:"campaign_end", fields:[{key:'hours', type:'input', datatype:'number', inputType:'number'}]}
		},
	},


  }),
});
