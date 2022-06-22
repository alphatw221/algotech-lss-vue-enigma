<template>
    <div class="box col-span-12 col-start-1 row-span-5 lg:row-span-2 h-fit mt-0 lg:col-span-7 lg:row-start-1 lg:mt-2 2xl:col-span-4 2xl:row-start-1 2xl:mt-2" >
        <div class="box p-2 intro-y grid grid-cols-12 gap-5 mt-5 p-5">
            <div class="col-start-1 col-span-5 -mt-3 p-2">
                <h2 class="text-lg font-medium">Incoming Order</h2>
            </div>
        </div>
        <div class="overflow-x-auto overflow-y-auto scrollbar-hidden box max-h-[42rem] lg:max-h-[18rem] 2xl:max-h-[42rem]">
            <div class="sticky top-0 z-50">
                <table class="table table-sm">
                    <thead class="table-dark">
                        <tr>
                            <th class="whitespace-nowrap" style="" v-for="column in incoming_order_columns"
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
                                <EyeIcon class="click-icon" @click="this.$router.push(`/seller/order/${data.id}`);seller_order_detail"/>
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
    padding-right: 0 !important;
}

.table td {
    /*padding-left: 0 !important;*/
    padding-right: 0 !important;
}
.click-icon:hover {
	cursor: pointer;
}
</style>