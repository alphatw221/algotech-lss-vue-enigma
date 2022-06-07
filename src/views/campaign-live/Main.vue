<template>
    <!-- OUTTER BOX -->
    <div class="chat grid grid-cols-12 gap-3 h-full">
        <!-- BEGIN: Comments -->
        <LiveComments/>
        <!-- END: Comments -->

        <!-- BEGIN: Product -->
        <LiveProduct :campaignId="campaignId"/>
        <!-- END: Product -->

        <!-- BEGIN: Incoming Order -->
        <IncomingOrder :campaignId="campaignId"/>
        <!-- END: Incoming Order -->
    </div>
    
</template>

<script>

// import {campaign_comment_summarize} from '@/api/user';
import CampaignLiveTable from "@/components/table/CampaignLiveTable.vue";
import LiveComments from '@/components/campaign/LiveComments.vue';
import LiveProduct from '@/components/campaign/LiveProduct.vue';
import IncomingOrder from '@/components/campaign/IncomingOrder.vue';

export default {
    components: { 
		CampaignLiveTable,
        LiveComments,
        LiveProduct,
        IncomingOrder
	},
    data() {
        return {
            campaignId: this.$route.params.campaign_id
        }
    },
    mounted() {
        console.log("mounted")
        this.$cookies.set(
            "access_token",
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU1MTkwNTMzLCJpYXQiOjE2NTQ1ODU3MzMsImp0aSI6ImZiODA1MjMxY2I1YTRiYjg5ZTM3NzUzMzEwMGRlN2VmIiwidXNlcl9pZCI6NDEzLCJkYXRhIjp7ImF1dGhfdXNlcl9pZCI6NDEzLCJzZWxsZXJfaWQiOjQ1MiwiY3VzdG9tZXJfaWQiOiIiLCJuYW1lIjoiTmljayBMaWVuIiwiZW1haWwiOiJuaWNrbGllbkBhY2NvbGFkZWdsb2JhbC5uZXQifX0.13Flx-K9SWIW4znsvrxemt9EFTPc-XKC4StjetbbDkE"
        );
    }
};

</script>

<style scoped>
.demo-breadcrumb-separator {
    color: #ff5500;
    padding: 0 5px;
}

.form-check-input {
    border-color: black !important;
}

.table th {
    /*padding-left: 0 !important;*/
    padding-right: 0 !important;
}

.table td {
    /*padding-left: 0 !important;*/
    padding-right: 0 !important;
}
</style>
