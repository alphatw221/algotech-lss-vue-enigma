<template>
    <div class="box col-span-12 col-start-1 row-start-3 row-span-2 h-screen mt-0
        lg:row-start-1 lg:row-span-3 lg:col-start-6 lg:col-span-7  lg:h-[100%]
        2xl:row-start-1 2xl:row-span-6 2xl:col-span-4 2xl:col-start-9 
        ">
        <div class="h-full flex flex-col">
            <h2 class="text-lg font-medium m-3 ml-5">Incoming Order</h2>
            <div class="overflow-auto scrollbar-hidden">
                <table class="table table-sm">
                    <thead class="table-dark">
                        <tr>
                            <th class="whitespace-nowrap bg-dark" v-for="column in incoming_order_columns"
                                :key="column.key">
                                {{ column.name }}
                            </th>
                        </tr>
                    </thead>
                
                    <tbody>
                        <tr v-for="data in incoming_order_results" :key="data.id">
                            <td>#{{ data.id }}</td>
                            <td>
                                <div v-if="data.platform === 'facebook'" class="w-10 h-10 image-fit">
                                    <div class="w-10 h-10 image-fit">
                                        <img src="/src/assets/images/lss-img/facebook.png" />
                                    </div>
                                </div>
                                <div v-else-if="data.platform === 'instagram'" class="w-10 h-10 image-fit">
                                    <div class="w-10 h-10 image-fit">
                                        <img src="/src/assets/images/lss-img/instagram.png" />
                                    </div>
                                </div>
                                <div v-else-if="data.platform === 'youtube'" class="w-10 h-10 image-fit">
                                    <div class="w-10 h-10 image-fit">
                                        <img src="/src/assets/images/lss-img/youtube.png" />
                                    </div>
                                </div>
                            </td>
                            <td>{{ data.customer_name }}</td>
                            <td>{{ data.currency_sign }}{{ parseFloat(data.subtotal).toFixed(2) }}</td> 
                            <td>
                                <EyeIcon class="click-icon" @click="this.$router.push({name:'sellerOrder',params:{'order_id':data.id}});seller_order_detail"/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>        
</template>

<script>
import {list_campaign_pre_order} from '@/api/campaign_pre_order';
import { useShoppingCartStore } from "@/stores/lss-shopping-cart";
import { useRoute, useRouter } from "vue-router";
export default {
    setup(){
        const store = useShoppingCartStore();
    },
    props: {
        campaignId: Number
    },
    data() {
        return {
            imagePath: import.meta.env.VITE_APP_IMG_URL,
            incoming_order_columns: [
                { name: "Order No", key: "order_no" },
                { name: "Platform", key: "platform" },
                { name: "Name", key: "name" },
                { name: "Amount", key: "amount" },
                { name: "Detail", key: "detail" },
            ],
            incoming_order_results: [],
            campaign_id: this.$route.params.campaign_id,
        };
    },
    mounted() {
        if (this.campaign_id) {
            list_campaign_pre_order(this.campaign_id).then(res => {
                this.incoming_order_results = res.data
                this.eventBus.emit("startReceivingOrderData");
            }).catch(error => {
                console.log(error);
            })
        }
        this.eventBus.on("changeOrderData", (payload) => {
            this.incoming_order_results.unshift(payload)
        });
    },
    methods: {
        seller_order_detail(){
            store.order_type = 'pre_order'
        }
    },
}
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
    padding: 5px !important;
    position: sticky !important; 
    top: 0 !important;
    z-index: 9999;
}

.table td {
    /*padding-left: 0 !important;*/
    padding: 5px !important;
    border-collapse: collapse;
    overflow-wrap: break-word;
    max-width: 95px;
    height: 42px;
}
.click-icon:hover {
	cursor: pointer;
}
</style>