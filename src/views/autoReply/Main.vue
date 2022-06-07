<template>
    <div class="intro-y chat grid grid-cols-12 gap-5 w-full box mt-5">
        <label class="text-lg col-start-1 col-span-4 m-5"> Setup Auto Reply</label>
        <button class="col-start-11 btn btn-warning btn-rounded w-24 h-10 mt-5 text-white"
            @click="createModal = true; createAutoReply">
            <span class="font-bold mr-1 text-lg">+</span> Create
        </button>
        <Alert :show="showAlert" class="col-start-1 col-span-12 alert-danger mb-2"> Change - Not Saved </Alert>
        <div class="col-start-1 col-span-12">
            <div class="overflow-x-auto">
                <AutoReplyTable class="overflow-x-auto" :requestUrl="'/api/auto_response/list'" :columns="tableColumns">
                </AutoReplyTable>
            </div>
        </div>
    </div>

    <!--Modal Create -->
    <Modal :show="createModal">
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
                    v-model="newReplyName" />
            </div>
            <div class="col-span-12">
                <label for="modal-form-1" class="form-label">Set Automated Response</label>
                <input id="modal-form-1" type="text" class="form-control rounded-full" placeholder=""
                    v-model="newReplyResponse" />
            </div>
            <div class="col-span-12">
                <label for="modal-form-1" class="form-label">Remark</label>
                <input id="modal-form-1" type="text" class="form-control rounded-full" placeholder=""
                    v-model="newReplyRemark" />
            </div>
            <div class="col-span-12">

            </div>
        </ModalBody>
        <ModalFooter class="w-full flex">
            <button type="button" @click="closeWithAlert()"
                class="btn btn-outline-secondary w-20 mr-auto">
                Cancel
            </button>
            <button type="button" @click="createAutoReply" class="btn btn-primary w-20">Save</button>
        </ModalFooter>
    </Modal>
</template>

<script setup>
import { ref, onMounted, provide } from 'vue'
import AutoReplyTable from "@/components/table/AutoReplyTable.vue";
import { create_auto_response, auto_response_list } from "@/api/auto_reply";

const createModal = ref(false)
const userPlatforms = ref('facebook')
const platformID = ref()
const showAlert = ref(false)

const tableColumns = ref([
    { name: "#", key: 'id' },
    { name: "Keywords to Detect", key: "input_msg" },
    { name: "Set Automated Response", key: "output_msg" },
    { name: "Remark", key: "description" },
    { name: "Following", key: "facebook_page" },
    { name: "Edit", key: "edit" },
    { name: "Delete", key: "delete" },
])

onMounted(() => {
    auto_response_list().then(res => {
        platformID.value = res.data[0].facebook_page.page_id
        console.log(platformID.value)
        console.log(res.data)
    }).catch(err => {
        alert(err)
    })
})

function createAutoReply() {
    create_auto_response('facebook', this.platformID).then(
        response => {
            createModal.value = false;
        }
    )
}

function closeWithAlert(){
    createModal.value = false; 
    showAlert.value = true;
    setTimeout( () => ( showAlert.value = false ), 3000);
}

</script>
