<template>
    <div class="flex flex-col gap-5 p-3 box sm:p-5">
        <div class="flex justify-between">
            <label class="mt-5 text-xl"> Setup Auto Reply</label>
            <button class="w-24 h-10 mt-5 text-white btn btn-warning btn-rounded "
                @click="createModal = true; saved=false">
                <span class="font-bold mr-1 text-[16px]">+</span> Create
            </button>
        </div>
        <div class="overflow-x-auto">
            <AutoReplyTable :requestUrl="'/api/auto_response/list'" :columns="tableColumns" />
        </div>
    </div>

    <!--Modal Create -->
    <Modal :show="createModal" @hidden="closeWithAlert()">
        <ModalHeader>
            <h2 class="mr-auto text-base font-medium">Create New Response</h2>
            <a @click="createModal=false" class="absolute top-0 right-0 mt-3 mr-3">
                <XIcon class="w-8 h-8 text-slate-400" />
            </a>
        </ModalHeader>
        <ModalBody class="grid grid-cols-12 gap-4 gap-y-3">
            <div class="col-span-12">
                <label for="modal-form-1" class="form-label">Keywords to Detect</label>
                <input id="modal-form-1" type="text" class="rounded-full form-control" placeholder=""
                    v-model="createData.input_msg" />
            </div>
            <div class="col-span-12">
                <label for="modal-form-1" class="form-label">Set Automated Response</label>
                <input id="modal-form-1" type="text" class="rounded-full form-control" placeholder="" 
                    v-model="createData.output_msg" />
            </div>
            <div class="col-span-12">
                <label for="modal-form-1" class="form-label">Remark</label>
                <input id="modal-form-1" type="text" class="rounded-full form-control" placeholder=""
                    v-model="createData.description" />
            </div>
            <div class="col-span-12">
                <label for="modal-form-1" class="form-label">Following</label>
            </div>
            <row class="flex flex-wrap items-center justify-around col-span-12">
                <template v-for="(data, key) in facebookPagesData" :key="key">
                    <div class="relative w-20 h-20 image-fit ">
                        <input name="fb_page" type="radio" class="absolute top-0 left-0 z-50 rounded-full vertical-center" @click="choosePage(data)" />
                        <Tippy tag="img" class="rounded-full" :src="data.image"
										:content="`facebook`" />
                    </div>
                </template>
            </row>
            
        </ModalBody>
        <ModalFooter class="flex w-full">
            <button type="button" @click="createModal=false"
                class="w-32 btn dark:border-darkmode-400">
                Cancel
            </button>
            <button type="button" @click="createAutoReply()" class="w-32 ml-5 shadow-md btn btn-primary">Save</button>
        </ModalFooter>
    </Modal>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
import AutoReplyTable from "./AutoReplyTable.vue";
import { create_auto_response } from "@/api_v2/auto_response";
import {get_user_subscription_facebook_pages} from "@/api/user_subscription"
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"

const layoutStore = useLSSSellerLayoutStore();
const internalInstance = getCurrentInstance();
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;
const createModal = ref(false)
const userPlatforms = ref('facebook')
const saved = ref(false)
let createData = ref({
    "input_msg": "",
    "output_msg": "",
    "description": ""
})
let chosenPage = ref()

const tableColumns = ref([
    { name: "#", key: 'id' },
    { name: "Keywords to Detect", key: "input_msg" },
    { name: "Set Automated Response", key: "output_msg" },
    { name: "Remark", key: "description" },
    { name: "Following", key: "facebook_page" },
    { name: "Edit", key: "edit" },
    { name: "Delete", key: "delete" },
])

let facebookPagesData = ref([])
onMounted(() => {
    get_user_subscription_facebook_pages().then(res=>{
        facebookPagesData.value = res.data
        console.log(facebookPagesData.value)
    })
})

function createAutoReply() {
    let data = createData.value
    create_auto_response('facebook', chosenPage.value.id, data).then(
        response => {
            saved.value = true
            createModal.value = false
            createData.value = []
            layoutStore.notification.showMessageToast("Create Success")
            eventBus.emit('getReplyData')
        }
    )
}


function choosePage(data) {
    chosenPage.value = data
}

function closeWithAlert(){
    if(saved.value===true){
        createModal.value = false; 
    }else{
        createModal.value = false; 
        layoutStore.alert.showMessageToast("Change Not Saved")
    }
    saved.value=false
}
</script>

