<template>
    <div class="intro-y chat grid grid-cols-12 gap-5 w-full box mt-5">
        <label class="text-lg col-start-1 col-span-4 m-5"> Setup Auto Reply</label>
        <button class="col-start-11 btn btn-warning btn-rounded w-24 h-10 mt-5 text-white"
            @click="createModal = true; saved=false">
            <span class="font-bold mr-1 text-lg">+</span> Create
        </button>
        <Alert :show="showAlert" class="col-start-1 col-span-12 alert-danger -mb-2"> Change - Not Saved </Alert>
        <Alert :show="successAlert" class="col-start-1 col-span-12 alert-warning -mb-2"> Success Created! </Alert>
        <div class="col-start-1 col-span-12">
            <div class="overflow-x-auto">
                <AutoReplyTable class="overflow-x-auto" :requestUrl="'/api/auto_response/list'" :columns="tableColumns" />
            </div>
        </div>
    </div>

    <!--Modal Create -->
    <Modal :show="createModal" @hidden="closeWithAlert()">
        <ModalHeader>
            <h2 class="font-medium text-base mr-auto">Create New Response</h2>
            <a @click="closeWithAlert()" class="absolute right-0 top-0 mt-3 mr-3">
                <XIcon class="w-8 h-8 text-slate-400" />
            </a>
        </ModalHeader>
        <ModalBody class="grid grid-cols-12 gap-4 gap-y-3">
            <div class="col-span-12">
                <label for="modal-form-1" class="form-label">Keywords to Detect</label>
                <input id="modal-form-1" type="text" class="form-control rounded-full" placeholder=""
                    v-model="createData.input_msg" />
            </div>
            <div class="col-span-12">
                <label for="modal-form-1" class="form-label">Set Automated Response</label>
                <input id="modal-form-1" type="text" class="form-control rounded-full" placeholder=""
                    v-model="createData.output_msg" />
            </div>
            <div class="col-span-12">
                <label for="modal-form-1" class="form-label">Remark</label>
                <input id="modal-form-1" type="text" class="form-control rounded-full" placeholder=""
                    v-model="createData.description" />
            </div>
            <div class="col-span-12">
                <label for="modal-form-1" class="form-label">Following</label>
            </div>
            <row class="col-span-12">
                <template v-for="(data, key) in facebookPagesData" :key="key" class="relative">
                    <input name="fb_page" type="radio" class="rounded-full vertical-center top-0 right-0 z-50" @click="choosePage(data)">
                    <div class="w-20 h-20 image-fit zoom-in lg:w-20 lg:h-20 2xl:w-20 lg:h-12">
                        <Tippy 
                            tag="img"
                            class="rounded-full w-fit h-wit"
                            :src="data.image"
                            :content="`facebook`"
                        />
                    </div>
                </template>
            </row>
            
        </ModalBody>
        <ModalFooter class="w-full flex">
            <button type="button" @click="closeWithAlert()"
                class="btn btn-outline-secondary w-20 mr-auto">
                Cancel
            </button>
            <button type="button" @click="createAutoReply()" class="btn btn-primary w-20">Save</button>
        </ModalFooter>
    </Modal>
</template>

<script setup>
import { ref, onMounted, provide, getCurrentInstance } from 'vue'
import AutoReplyTable from "@/components/table/AutoReplyTable.vue";
import { create_auto_response, auto_response_list } from "@/api/auto_reply";
import {get_user_subscription_facebook_pages} from "@/api/user_subscription"

const internalInstance = getCurrentInstance();
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;
const createModal = ref(false)
const userPlatforms = ref('facebook')
const showAlert = ref(false)
const successAlert = ref(false)
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
            successAlert.value = true
            setTimeout( () => ( successAlert.value = false ), 3000)
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
        showAlert.value = true;
        setTimeout( () => ( showAlert.value = false ), 3000);
    }
    saved.value=false
}
</script>
