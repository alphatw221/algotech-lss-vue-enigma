<template>
    <div class="intro-y chat grid grid-cols-12 gap-5 w-full box mt-5">
        <label class="text-lg col-start-1 col-span-4 m-5"> Setup Auto Reply</label>
        <button class="col-start-11 btn btn-warning btn-rounded w-24 h-10 mt-5 text-white" @click="createModal = true; createAutoReply">
            <span class="font-bold mr-1 text-lg">+</span> Create
        </button>
        <div class="col-start-1 col-span-12">
            <div class="overflow-x-auto">
                <AutoReplyTable class="overflow-x-auto" 
                    :requestUrl="'/api/auto_response/list'" 
                    :columns="tableColumns">
                </AutoReplyTable>
            </div>
        </div>
    </div>

    <!--Modal Create -->
    <Modal :show="createModal" @hidden="createModal = false">
        <ModalHeader>
            <h2 class="font-medium text-base mr-auto">Create New Response</h2>
            <a @click="createModal = false" class="absolute right-0 top-0 mt-3 mr-3">
                <XIcon class="w-8 h-8 text-slate-400" />
            </a>
        </ModalHeader>
        <ModalBody class="grid grid-cols-12 gap-4 gap-y-3">
            <div class="col-span-12">
                <label for="modal-form-1" class="form-label">Keywords to Detect</label>
                <input id="modal-form-1" type="text" class="form-control rounded-full" placeholder="" v-model="newReplyName" />
            </div>
            <div class="col-span-12">
                <label for="modal-form-1" class="form-label">Set Automated Response</label>
                <input id="modal-form-1" type="text" class="form-control rounded-full" placeholder="" v-model="newReplyResponse" />
            </div>
            <div class="col-span-12">
                <label for="modal-form-1" class="form-label">Remark</label>
                <input id="modal-form-1" type="text" class="form-control rounded-full" placeholder="" v-model="newReplyRemark" />
            </div>
        </ModalBody>
        <ModalFooter>
            <button type="button" @click="createModal = false" class="btn btn-outline-secondary w-20 mr-1">
                Cancel
            </button>
            <button type="button" @click="createAutoReply" class="btn btn-primary w-20">Save</button>
        </ModalFooter>
    </Modal>
</template>

<script>
import AutoReplyTable from "@/components/table/AutoReplyTable.vue";
import { create_auto_response,auto_response_list } from "@/api/auto_reply";

export default {
    components: {
        AutoReplyTable 
    },
    data() {
        return {
            createModal: false, 
            userPlatforms:'facebook',
            platformID:'', 
            
            tableColumns: [
                { name: "#", key: 'id' },
                { name: "Keywords to Detect", key: "input_msg" },
                { name: "Set Automated Response", key: "output_msg" },
                { name: "Remark", key: "description" },
                { name: "Following", key: "facebook_page" },
                { name: "Edit", key: "edit" },
                { name: "Delete", key: "delete" },
            ],
        };
    },
    mounted() {
		this.$cookies.set("access_token", 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU0Njc3MDkyLCJpYXQiOjE2NTQwNzIyOTIsImp0aSI6ImMyODZlZjM5MmVjMjQzMzRhYTI3MzczNDcwOTJlNGQxIiwidXNlcl9pZCI6MzI4LCJkYXRhIjp7ImF1dGhfdXNlcl9pZCI6MzI4LCJzZWxsZXJfaWQiOjM2MCwiY3VzdG9tZXJfaWQiOjM3MywibmFtZSI6IkNlY2lsaWEgVyIsImVtYWlsIjoibWJydzE5QGdtYWlsLmNvbSJ9fQ.Kw0LEwlg3QrYG3I5sJTDawtsrGQWq28kz5CHiKHEgDI')
        this.eventBus.on("updateModal" ,() =>{
            this.updateModal = true
        })
        auto_response_list().then(res=>{
            this.platformID = res.data[0].facebook_page.page_id
            console.log(this.platformID)
            console.log(res.data)
        }).catch(err=>{
            alert(err)
        })
    },
    unmounted() {
        this.eventBus.off("updateModal")
    },
    methods: {
        createAutoReply() {
            create_auto_response('facebook',this.platformID).then(
                response => {
                    this.createModal = false;
                }
            )},
    },
};
</script>
