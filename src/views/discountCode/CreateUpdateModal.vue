<template>
    <!-- update Modal-->
	<Modal :show="showModal" @hidden="hideModal()" >
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

	<!--Modal Create -->
    <!-- <Modal :show="createModal" @hidden="closeWithAlert()">
        <ModalHeader>
            <h2 class="mr-auto text-base font-medium text-[16px]">{{$t('auto_reply.modal_title')}}</h2>
            <a @click="createModal=false" class="absolute top-0 right-0 mt-3 mr-3">
                <XIcon class="w-8 h-8 text-slate-400" />
            </a>
        </ModalHeader>
        <ModalBody class="grid grid-cols-12 gap-4 gap-y-3">
            <div class="col-span-12">
                <label for="modal-form-1 text-base font-medium" >{{$t('auto_reply.table_column.keyword_detect')}}</label>
                <input id="modal-form-1" type="text" class="rounded-lg form-control" placeholder=""
                    v-model="validate.input_msg.$model" 
                    :class="{ 'border-danger text-danger border-2': validate.input_msg.$error }" 
				/>
				<template v-if="validate.input_msg.$error">
					<label class="text-danger ml-2 text-[13px]" >
						{{ $t('auto_reply.modal_field_require') }}
					</label>
				</template>
            </div>
            <div class="col-span-12">
                <label for="modal-form-1">{{$t('auto_reply.table_column.set_auto_reply')}}</label>
                <input id="modal-form-1" type="text" class="rounded-lg form-control" placeholder="" 
                    v-model="validate.output_msg.$model" 
                    :class="{ 'border-danger text-danger border-2': validate.output_msg.$error }" 
				/>
				<template v-if="validate.output_msg.$error">
					<label class="text-danger ml-2 text-[13px]" >
						{{ $t('auto_reply.modal_field_require') }}
					</label>
				</template>
            </div>
            <div class="col-span-12">
                <label for="modal-form-1">{{$t('auto_reply.table_column.remark')}}</label>
                <input id="modal-form-1" type="text" class="rounded-lg form-control" placeholder=""
                    v-model="createData.description" 
				/>
            </div>
            <div class="col-span-12">
                <label for="modal-form-1" class="form-label">{{$t('auto_reply.table_column.assign_to')}}</label>
            </div>
            <div class="flex flex-wrap items-center justify-around col-span-12">
                <template v-for="(data, key) in PagesData" :key="key">
                    <div class="relative w-20 h-20 image-fit">
                        <input name="fb_page" type="radio" class="absolute top-0 left-0 z-50 rounded-lg vertical-center" :value="data" v-model="validate.chosenPage.$model" />
                        <img class="rounded-full" :src="data.image" />
                    </div>
                </template>
            </div>
            <template v-if="validate.chosenPage.$error">
                <label class="text-danger ml-2 text-[13px] col-span-12" >
                   {{ $t('auto_reply.modal_select_page') }} 
                </label>
            </template>
            
        </ModalBody>
        <ModalFooter>
            <button type="button" @click="createModal=false"
                class="w-32 bg-white btn dark:border-darkmode-400">
                {{ $t('auto_reply.modal_cancel') }}
            </button>
            <button type="button" @click="createAutoReply()" class="w-32 ml-5 shadow-md btn btn-primary">{{ $t('auto_reply.modal_save') }}</button>
        </ModalFooter>
    </Modal> -->
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

// function createAutoReply() {
//     validate.value.$touch();
//     console.log(createData.value)
//     if (validate.value.$invalid) {
//         layoutStore.alert.showMessageToast(i18n.global.t('auto_reply.invalid_data'))
//         return
//     }else{
//         let data = createData.value
//         let plaftfrom = createData.value.chosenPage.page_id? "facebook": "instagram"
//         create_auto_response(plaftfrom, createData.value.chosenPage.id, data).then(
//         response => {
//             saved.value = true
//             createModal.value = false
//             emptyForm()
//             layoutStore.notification.showMessageToast(i18n.global.t('auto_reply.create_success'))
//             eventBus.emit('getReplyData')
//         })
//     }
// }

// function closeWithAlert(){
//     if(saved.value===true){
//         createModal.value = false;
//         emptyForm()
//     }else{
//         createModal.value = false; 
//         layoutStore.alert.showMessageToast(i18n.global.t('auto_reply.not_saved_message'))
//         emptyForm()
//     }
// }

// const emptyForm =()=>{
//     createData.value.input_msg = ""
//     createData.value.output_msg = ""
//     createData.value.description = ""
//     createData.value.chosenPage = []
// }

</script>
