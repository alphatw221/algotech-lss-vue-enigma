<template>
    <div class="flex flex-col sm:px-5 sm:h-fit">
        <div class="flex-col flex gap-3 flex-wrap sm:flex-row justify-center sm:justify-between">
            <div class="flex items-center mx-auto sm:mx-20 lg:pt-5 mt-3 lg:pb-4 intro-y lg:pt-5 mt-3">
                <h2 class="text-xl sm:text-2xl sm:mx-0 font-medium">{{ $t('auto_reply.title') }}</h2>
                <Tippy 
                    class="rounded-full w-fit whitespace-wrap ml-1 my-auto tippy-mobile" 
                    data-tippy-allowHTML="true" 
                    data-tippy-placement="right" 
                    :content="$t('tooltips.auto_reply.title')" 
                    > 
                    <HelpCircleIcon class="w-5 tippy-icon tippy-mobile" />
                </Tippy> 
            </div>
            <button class="w-40 h-[35px] sm:h-[42px] text-white btn btn-warning btn-rounded mx-auto sm:mx-0 lg:mx-20 lg:mt-5 sm:mt-0 lg:mb-0 mb-3 border-[2px] border-slate-100 shadow-lg"
                @click="createModal = true; saved=false">
                <span class="font-bold mr-1 text-[16px]">+</span> {{ $t('auto_reply.create') }}
            </button>
        </div>
        <div class="flex flex-col gap-3 p-2 sm:gap-5 box sm:p-10 sm:h-[80vh] lg:mx-20">
            <AutoReplyTable :requestUrl="'/api/auto_response/list'" :columns="tableColumns" />
        </div>
    </div>
    <!--Modal Create -->
    <Modal :show="createModal" @hidden="closeWithAlert()" >
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
            <div class="col-span-12 flex">
                <label for="modal-form-1" class="form-label">{{$t('auto_reply.table_column.assign_to')}}</label>
                <Tippy 
                    class="rounded-full w-fit whitespace-wrap ml-1 tippy-mobile" 
                    data-tippy-allowHTML="true" 
                    data-tippy-placement="right" 
                    :content="$t('tooltips.auto_reply.platform')" 
                    > 
                    <HelpCircleIcon class="w-5 tippy-icon tippy-mobile" />
                </Tippy> 
            </div>
            <div class="flex flex-wrap items-center justify-around col-span-12">
                <template v-for="(data, key) in PagesData" :key="key">
                    <div class="relative w-20 h-20 image-fit">
                        <input name="fb_page" type="radio" class="absolute top-0 left-0 z-50 rounded-lg vertical-center" :value="data" v-model="validate.chosenPage.$model" />
                        <img class="rounded-full" :src="data.image" />
                        <div class="absolute bottom-0 right-0 w-5 h-5 border-2 border-white rounded-full dark:border-darkmode-600">
                            <img v-if="data.page_id" class="rounded-full bg-[#3c599b]" :src="facebook_platform" >
                            <img v-else class="rounded-full bg-[#d63376]" :src="instagram_platform" >
                        </div>
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
import facebook_platform from "/src/assets/images/lss-img/facebook.png"
import instagram_platform from "/src/assets/images/lss-img/instagram.png"
import { create_auto_response } from "@/api_v2/auto_response";
import {get_user_subscription_facebook_pages, get_user_subscription_instagram_profiles} from "@/api/user_subscription"
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import i18n from "@/locales/i18n"

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
    { name: "assign_to", key: "page" },
    { name: "", key: "edit" },
])
let PagesData = ref([])
onMounted(() => {
    get_user_subscription_facebook_pages().then(res=>{
        PagesData.value = res.data
        return get_user_subscription_instagram_profiles()
    }).then(res=>{
        PagesData.value = PagesData.value.concat(res.data);
        console.log(PagesData.value)
    }).catch(err=> {
        console.log(err)
    })
})

function createAutoReply() {
    validate.value.$touch();
    console.log(createData.value)
    if (validate.value.$invalid) {
        layoutStore.alert.showMessageToast(i18n.global.t('auto_reply.invalid_data'))
        return
    }else{
        let data = createData.value
        let plaftfrom = createData.value.chosenPage.page_id? "facebook": "instagram"
        create_auto_response(plaftfrom, createData.value.chosenPage.id, data).then(
        response => {
            saved.value = true
            createModal.value = false
            emptyForm()
            layoutStore.notification.showMessageToast(i18n.global.t('auto_reply.create_success'))
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
        layoutStore.alert.showMessageToast(i18n.global.t('auto_reply.not_saved_message'))
        emptyForm()
    }
}

const emptyForm =()=>{
    createData.value.input_msg = ""
    createData.value.output_msg = ""
    createData.value.description = ""
    createData.value.chosenPage = []
}

// onMounted(() => {
//     if(document.querySelectorALL('tippy-13')){document.querySelectorALL('tippy-13').style.zIndex ="999999999"}
// })

</script>

<style scoped>

</style>

