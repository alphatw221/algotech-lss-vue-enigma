<template>
    <!-- OUTTER BOX -->
    <div class="chat grid grid-cols-12 gap-3 h-full">
        <!-- BEGIN: Comments -->
        <LiveComments/>
        <!-- END: Comments -->

        <!-- BEGIN: Product -->
        <LiveProduct/>
        <!-- END: Product -->

        <!-- BEGIN: Incoming Order -->
        <IncomingOrder/>
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
