<template>
    <div class="intro-y chat grid grid-cols-12 gap-5 w-full box mt-5">
        <label class="text-lg col-start-1 col-span-4 m-5"> Setup Auto Reply</label>
        <button class="col-start-11 btn btn-warning btn-rounded w-24 h-10 mt-5 text-white" @click="createReply = true">
            <span class="font-bold mr-1 text-lg">+</span> Create
        </button>
        <div class="col-start-1 col-span-12">
            <div class="overflow-x-auto">
                <AutoReplyTable class="overflow-x-auto" :requestUrl="'/api/auto_response/list'" :columns="tableColumns">
                </AutoReplyTable>
            </div>
        </div>
    </div>

    <!--Modal create, update, delete -->
    <Modal :show="createReply" @hidden="createReply = false">
        <ModalHeader>
            <h2 class="font-medium text-base mr-auto">Create New Response</h2>
            <a @click="createReply = false" class="absolute right-0 top-0 mt-3 mr-3" href="javascript:;">
                <XIcon class="w-8 h-8 text-slate-400" />
            </a>
        </ModalHeader>
        <ModalBody class="grid grid-cols-12 gap-4 gap-y-3">
            <div class="col-span-12">
                <label for="modal-form-1" class="form-label">Keywords to Detect</label>
                <input id="modal-form-1" type="text" class="form-control rounded-full" placeholder="" />
            </div>
            <div class="col-span-12">
                <label for="modal-form-1" class="form-label">Set Automated Response</label>
                <input id="modal-form-1" type="text" class="form-control rounded-full" placeholder="" />
            </div>
            <div class="col-span-12">
                <label for="modal-form-1" class="form-label">Remark</label>
                <input id="modal-form-1" type="text" class="form-control rounded-full" placeholder="" />
            </div>
        </ModalBody>
        <ModalFooter>
            <button type="button" @click="createReply = false" class="btn btn-outline-secondary w-20 mr-1">
                Cancel
            </button>
            <button type="button" class="btn btn-primary w-20">Save</button>
        </ModalFooter>
    </Modal>
    <Modal :show="updateReply" @hidden="updateReply = false">
        <ModalHeader>
            <h2 class="font-medium text-base mr-auto">Update Auto Response</h2>
            <a @click="updateReply = false" class="absolute right-0 top-0 mt-3 mr-3" href="javascript:;">
                <XIcon class="w-8 h-8 text-slate-400" />
            </a>
        </ModalHeader>
        <ModalBody class="grid grid-cols-12 gap-4 gap-y-3">
            <div class="col-span-12">
                <label for="modal-form-1" class="form-label">Keywords to Detect</label>
                <input id="modal-form-1" type="text" class="form-control rounded-full" placeholder="" />
            </div>
            <div class="col-span-12">
                <label for="modal-form-1" class="form-label">Set Automated Response</label>
                <input id="modal-form-1" type="text" class="form-control rounded-full" placeholder="" />
            </div>
            <div class="col-span-12">
                <label for="modal-form-1" class="form-label">Remark</label>
                <input id="modal-form-1" type="text" class="form-control rounded-full" placeholder="" />
            </div>
        </ModalBody>
        <ModalFooter>
            <button type="button" @click="updateReply = false" class="btn btn-outline-secondary w-20 mr-1">
                Cancel
            </button>
            <button type="button" class="btn btn-primary w-20">Save</button>
        </ModalFooter>
    </Modal>
</template>

<script>
import AutoReplyTable from "@/components/table/AutoReplyTable.vue";
import { create_auto_response, update_auto_response} from "@/api/auto_reply";

export default {
    components: {
        AutoReplyTable 
    },
    data() {
        return {
            createReply: false,
            updateReply: false,
            deleteReply: false,
            tableColumns: [
                { name: "#", key: "id" },
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
	},
    methods: {
        updateAutoReply() {
            let data = { 'category_name': this.categoryName }
                update_auto_response(this.oldCategory, data).then(
                    response => {
                        this.showModal = false;
                        this.list();
                    }
                )
            },
        createAutoReply() {
            let data = { 'category_name': this.categoryName }
            create_auto_response(data).then(
                response => {
                    this.showModal = false;
                    this.list();
                }
            )},
    },
    mounted(){
        this.eventBus.on("updateReply" ,() =>{
            this.updateReply = true
        })
    },
    unmounted() {
        this.eventBus.off("updateReply")
    },
};
</script>
