<template>
    <!-- update Modal-->
	<Modal backdrop="static" :show="showModal" @hidden="hideModal()" >
		<ModalHeader>
			<h2 class="mr-auto text-base font-medium">{{ 'edit' }} #{{currentInfo.id}}</h2>
			<a @click="updateModal = false" class="absolute top-0 right-0 mt-3 mr-3" href="javascript:;">
				<XIcon class="w-8 h-8 text-slate-400" />
			</a>
		</ModalHeader>
		<ModalBody class="flex flex-col gap-4 gap-y-3">

			<div>
				<label for="modal-form-1" class="form-label">{{$t('auto_reply.table_column.keyword_detect')}}</label>
				<input id="modal-form-1" type="text" class="rounded-lg form-control longMessage" placeholder=""
					v-model="currentInfo.input_msg" />
			</div>
			<div>
				<label for="modal-form-1" class="form-label">{{$t('auto_reply.table_column.set_auto_reply')}}</label>
				<input id="modal-form-1" type="text" class="rounded-lg form-control longMessage" placeholder=""
					v-model="currentInfo.output_msg" />
			</div>
			<div>
				<label for="modal-form-1" class="form-label">{{$t('auto_reply.table_column.remark')}}</label>
				<input id="modal-form-1" type="text" class="rounded-lg form-control" placeholder=""
					v-model="currentInfo.description" />
			</div>

		</ModalBody>
		<ModalFooter>
			<button type="button" @click="updateModal = false" class="w-32 btn dark:border-darkmode-400">
				{{ 'cancel' }}
			</button>
			<button type="button" @click="updateAutoReply(currentInfo.replyId, currentInfo)" class="w-32 ml-5 shadow-md btn btn-primary">
				{{ 'save' }}
			</button>
		</ModalFooter>
	</Modal>
</template>


<script setup>
import { ref, onMounted, getCurrentInstance, onUnmounted } from "vue";

import { delete_discount_code, list_discount_code } from "@/api_v2/discount_code"
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout";
import i18n from "@/locales/i18n"

const showModal = ref(false)



const columns = [

    { name: "name", key: "name" , type:"text", dataType:"string"},
    { name: "code", key: "code" , type:"text", dataType:"string"},
    { name: "start_at", key: "start_at", type:"datetime", dataType:"string"},
    { name: "end_at", key: "end_at" , type:"datetime", dataType:"string"},
    { name: "type", key: "type" , type:"select_and_set", dataType:"string"},
	{ name: "limitations", key: "limitations" , type:"multiple_select_and_set"},
	{ name: "edit", key: "edit" , type:"action"},
]
const hideModal = ()=>{

}
</script>
