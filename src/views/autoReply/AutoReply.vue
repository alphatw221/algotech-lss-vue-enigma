<template>
    <!-- OUTTER BOX -->
    <div class="intro-y chat grid grid-cols-12 gap-5">
        <!-- BEGIN: commit box -->
        <button 
          class="col-start-1 btn btn-warning btn-rounded w-24 h-10 text-white
            lg:col-start-11 lg:m-2 
              2xl:col-start-11 2xl:m-2"
                @click="createReply =true" > 
          <span class="font-bold mr-1 text-lg">+</span> Create</button>
        <div class="box">
            <div class="overflow-x-auto">
                <!-- <AutoReplyTable :requestUrl="'/api/v2/campaign/list_campaign/'" :columns="tableColumns"
                    :routerParam="campaign_status" :page_type="'campaign_list'">
                </AutoReplyTable> -->
            </div>
        </div>
    </div>
    <!--Modal Enter Post ID -->
    <Modal size="modal-lg" :show="createReply" @hidden="createReply = false">
        <ModalHeader>
            <h2 class="font-medium text-base mr-auto">Create</h2>
            <a @click="createReply = false" class="absolute right-0 top-0 mt-3 mr-3" href="javascript:;">
                <XIcon class="w-8 h-8 text-slate-400" />
            </a>
        </ModalHeader>
        <ModalBody class="grid grid-cols-12 gap-4 gap-y-3">

        </ModalBody>
        <ModalFooter>
            <button type="button" class="btn btn-outline-secondary w-20 mr-1" @click="cancelClean()">
                Cancel
            </button>
            <button type="button" class="btn btn-primary w-20" @click="closeJump">
                Save
            </button>
        </ModalFooter>
    </Modal>
</template>

<script>
import AutoReplyTable from "@/components/table/AutoReplyTable.vue";

export default {
    components: {
        AutoReplyTable
    },
    data() {
        return {
            createReply: false,

            searchColumns: {
                keywords: [
                    { text: "Title", value: "title" },
                ],
            },
            tableColumns: [
                { name: "Fan Page", key: "page" },
                { name: "Platform", key: "platform" },
                { name: "Title", key: "title" },
                { name: "Time", key: "start_at" },
                { name: "Manage Order", key: "manager_order" },
                { name: "Stop Checkout", key: "stop" },
                { name: " ", key: "entry" },
                { name: " ", key: "edit" },
            ],
        };
    },
};
</script>
