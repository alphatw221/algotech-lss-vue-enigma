import { defineStore } from "pinia";
import { ref } from "vue"
export const useLSSReplyMetaStore = defineStore("replyMeta", {
  state: () => ({
	"default":{
		name:"lss",
		fields:[
			{
				key:"added",
				type:"textarea",
				datatype:"string",
                enable:true,
				default:'',
			},
			{
				key:"updated",
				type:"textarea",
				datatype:"string",
                enable:true,
				default:'',
			},
			{
				key:"deleted",
				type:"textarea",
				datatype:"string",
                enable:true,
				default:'',
			},
			{
				key:"insufficient_inv",
				type:"textarea",
				datatype:"string",
                enable:true,
				default:'',
			},
            {
				key:"facebook_buttons",
				type:"component",
                datatype:"object",
                enable:true,
                default:[],
				fields:[
                    {key:"type", type:"input", dataType:"string", default:''},
					{key:"title", type:"input", dataType:"string", default:''},
                    {key:"payload", type:"input", dataType:"string", default:''}
                ],
			},
		]
	},
  }),
});
