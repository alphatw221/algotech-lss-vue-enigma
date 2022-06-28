<template>
    <!-- OUTTER BOX -->
    <div class="grid grid-cols-12 grid-rows-6 gap-3 h-full">
        <!-- BEGIN: Comments -->
        <LiveComments :campaignId="campaignId"/>
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
        IncomingOrder,
	},
    data() {
        return {
            campaignId: this.$route.params.campaign_id,
            accessToken: this.$cookies.get('access_token'),
            startReceivingCommentData: false,
            startReceivingOrderData: false,
            startReceivingProductData: false,
        }
    },
    mounted() {
        console.log("mounted")
        this.websocketConnect()
        this.eventBus.on("startReceivingCommentData", (payload) => {
            this.startReceivingCommentData = true
        });
        this.eventBus.on("startReceivingProductData", (payload) => {
            this.startReceivingProductData = true
        });
        this.eventBus.on("startReceivingOrderData", (payload) => {
            this.startReceivingOrderData = true
        });
        
    },
    methods: {
        websocketConnect: function() {
            const chatSocket = new WebSocket(
                `wss://gipassl.algotech.app/ws/campaign/${this.campaignId}/?token=${this.accessToken}`
            );
            this.webSocket = chatSocket
            chatSocket.onmessage = e => {
                const data = JSON.parse(e.data);
                // console.log(data)
                this.receiveCommentData(data)
                this.receiveOrderData(data)
                this.receiveProductData(data)
                
            };
            chatSocket.onopen = e => {
                console.log('connected')
            };
            chatSocket.onclose = e => {
                console.error('Chat socket closed unexpectedly');
                this.websocketConnect()
            };
            chatSocket.onerror = function(err) {
                console.error('Socket encountered error: ', err.message, 'Closing socket');
                chatSocket.close();
            };
        },
        receiveCommentData(data) {
            if (!this.startReceivingCommentData) {
                return
            }
            if (data.type != "comment_data") {
                return
            }
            this.eventBus.emit("changeCommentData", data.data);
            
        },
        receiveOrderData(data) {
            if (!this.startReceivingOrderData) {
                return
            }
            if (data.type != "order_data") {
                return
            }
            this.eventBus.emit("changeOrderData", data.data);
        },
        receiveProductData(data) {
            if (!this.startReceivingProductData) {
                return
            }
            if (data.type != "product_data") {
                return
            }
            this.eventBus.emit("changeProductData", data.data);
        },
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
