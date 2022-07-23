<template>
    <div class="flex flex-col gap-3 p-2 sm:px-5 sm:h-[100%]">
        <!-- <div class="flex items-center px-20 pt-5 pb-4 intro-y">
			<h2 class="text-2xl font-medium">Create Campaign</h2>
		</div> -->
        <div class="flex-col flex gap-3 flex-wrap sm:flex-row justify-center sm:justify-between">
            <label class="text-xl sm:text-2xl font-medium mx-auto sm:mx-0 sm:mt-3"> {{ $t('auto_reply.title') }}</label>
            <button class="w-40 h-[35px] sm:h-[42px] text-white btn btn-warning btn-rounded mx-auto sm:mx-0"
                @click="createModal = true; saved=false">
                <span class="font-bold mr-1 text-[16px]">+</span> {{ $t('auto_reply.create') }}
            </button>
        </div>
        <div class="flex flex-col gap-5 p-3 overflow-x-hidden sm:overflow-x-auto sm:p-8 box">
            <AutoReplyTable :requestUrl="'/api/auto_response/list'" :columns="tableColumns" />
        </div>
    </div>
    <!--Modal Create -->
    <Modal :show="createModal" @hidden="closeWithAlert()">
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
                <template v-for="(data, key) in facebookPagesData" :key="key">
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
    </Modal>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, computed } from 'vue'
import AutoReplyTable from "./AutoReplyTable.vue";
import { create_auto_response } from "@/api_v2/auto_response";
import {get_user_subscription_facebook_pages} from "@/api/user_subscription"
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

const layoutStore = useLSSSellerLayoutStore();
const internalInstance = getCurrentInstance();
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;
const createModal = ref(false)
const userPlatforms = ref('facebook')
const saved = ref(false)
const createData = ref({
    input_msg: "",
    output_msg: "",
    description: "",
    chosenPage:[],
})

const rules = computed(()=>{
    return{
		input_msg:{required},
		output_msg: {required},
        chosenPage: {required},
    }
});
const validate = useVuelidate(rules, createData);


const tableColumns = ref([
    { name: "#", key: 'id' },
    { name: "keyword_detect", key: "input_msg" },
    { name: "set_auto_reply", key: "output_msg" },
    { name: "remark", key: "description" },
    { name: "assign_to", key: "facebook_page" },
    { name: "", key: "edit" },
])

let facebookPagesData = ref([])
onMounted(() => {
    get_user_subscription_facebook_pages().then(res=>{
        facebookPagesData.value = res.data
        console.log(facebookPagesData.value)
    })
})

function createAutoReply() {
    validate.value.$touch();
    console.log(createData.value)
    if (validate.value.$invalid) {
        layoutStore.alert.showMessageToast("Invalid Data Inputed")
        return
    }else{
        let data = createData.value
        create_auto_response('facebook', createData.value.chosenPage.id, data).then(
        response => {
            saved.value = true
            createModal.value = false
            emptyForm()
            layoutStore.notification.showMessageToast("Create Success")
            eventBus.emit('getReplyData')
        })
    }
}

function closeWithAlert(){
    if(saved.value===true){
        createModal.value = false;
        emptyForm()
    }else{
        createModal.value = false; 
        layoutStore.alert.showMessageToast("Change Not Saved")
        emptyForm()
    }
}

const emptyForm =()=>{
    createData.value.input_msg = ""
    createData.value.output_msg = ""
    createData.value.description = ""
    createData.value.chosenPage = []
}

</script>

