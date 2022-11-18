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
                enable:false,
				default:'',
			},
			{
				key:"updated",
				type:"textarea",
				datatype:"string",
                enable:false,
				default:'',
			},
			{
				key:"deleted",
				type:"textarea",
				datatype:"string",
                enable:false,
				default:'',
			},
			{
				key:"insufficient_inv",
				type:"textarea",
				datatype:"string",
                enable:false,
				default:'',
			},
            {
				key:"facebook_buttons",
				type:"component",
                datatype:"object",
                enable:false,
                default:[],
				field:[
                    {key:"type", type:"input", dataType:"string", default:''},
					{key:"title", type:"input", dataType:"string", default:''},
                    {key:"payload", type:"input", dataType:"string", default:''}
                ],
			},
		]
	},
  }),
});
