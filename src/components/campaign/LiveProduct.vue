<template>
    <div
        class="box col-span-12 col-start-1 row-start-5 row-span-2 h-screen
            lg:col-start-6 lg:col-span-7 lg:row-start-4 lg:row-span-3 lg:h-[100%]
            2xl:row-start-1 2xl:row-span-6 2xl:col-span-4 2xl:col-start-5 
            ">
        <div class="h-full flex flex-col"> 
            <div class="flex w-full m-3">
                <h2 class="text-lg font-medium w-48 ml-5 mr-auto">Product</h2>
                <Dropdown class="inline-block">
                    <DropdownToggle class="btn btn-primary mr-6 w-40">
                        Add Product
                    </DropdownToggle>
                    <DropdownMenu class="w-48">
                        <DropdownContent>
                            <DropdownItem @click="store.showInstantlyAddProductModal = true">
                                Instantly Add Product
                            </DropdownItem>
                            <DropdownItem @click="store.showAddProductFromStockModal = true">
                                Add Product From Stock
                            </DropdownItem>
                        </DropdownContent>
                    </DropdownMenu>
                </Dropdown>
            </div>
            <div
                class="overflow-auto scrollbar-hidden box h-full mt-1">
                <table class="table">
                    <thead class="text-white">
                        <tr>
                            <th class="whitespace-nowrap truncate bg-dark hover:text-clip" v-for="column in product_columns" :key="column.key">
                                {{ column.name }}
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="data in product_results" :key="data.id">
                            <td><img data-action="zoom" :src="imagePath + data.image" class="w-10 zoom-in" /></td>
                            <td>{{ data.name }}</td>
                            <td>{{ data.order_code }}</td>
                            <td>
                                {{ data.qty_sold }}/{{ data.qty_for_sale - data.qty_sold }}
                            </td>
                            <td>{{ data.currency_sign }}{{ data.price }}</td>
                            <td>
                                <div v-if="data.status === true" class="
                                    form-check form-switch w-fit m-auto
                                ">
                                    <input
                                        @click="toggle; item_status_switch(data.id, data.campaign, { 'status': data.status === true ? false : true });"
                                        class="form-check-input" type="checkbox" checked />
                                </div>
                                <div class="
                                    form-check form-switch w-fit m-auto
                                    " v-else>
                                    <input
                                        @click="toggle; item_status_switch(data.id, data.campaign, { 'status': data.status === true ? false : true });"
                                        class="form-check-input" type="checkbox" />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Modals -->
    <InstantlyAddProduct /> 
    <AddProductFromStock :currentProductList="product_results" /> 

</template>
<script>
import { list_campaign_product, update_campaign_product } from '@/api/campaign_product';
import InstantlyAddProduct from './modals/InstantlyAddProductModal.vue';
import AddProductFromStock from './modals/AddProductFromStockModal.vue';
import { useLSSCampaignListStore } from "@/stores/lss-campaign-list";

export default {
    components:{
        InstantlyAddProduct,
        AddProductFromStock
    },
    props: {
        campaignId: Number,
    },

    data() {
        return {
            store: useLSSCampaignListStore(),
            imagePath: import.meta.env.VITE_APP_IMG_URL,
            product_columns: [
                { name: "", key: "image" },
                { name: "Name", key: "name" },
                { name: "Order Code", key: "order_code" },
                { name: "Sold/Left", key: "Sold_Left" },
                { name: "Price", key: "price" },
                { name: "Activate", key: "activate" },
            ],
            product_results: [],
            campaign_id: this.$route.params.campaign_id,
        };
    },
    mounted() {
        if (this.campaign_id) {
            list_campaign_product(this.campaign_id).then(res => {
                console.log(res.data)
                this.product_results = res.data
                this.eventBus.emit("startReceivingProductData");
                this.eventBus.emit("passCampaignProduct", res.data);
            }).catch(error => {
                console.log(error);
            })
        }
        this.eventBus.on("changeProductData", (payload) => {
            const index = this.product_results.findIndex(item => item.id === payload.id)
            this.product_results[index]["qty_sold"] = payload["qty_sold"]
        })
        this.eventBus.on("addInstantProduct", (payload) => {
            const index = this.product_results.push(payload)
        })
    },
    methods: {
        item_status_switch(id, campaign_id, data) {
            update_campaign_product(id, campaign_id, data).then(res => {
                if (!res.ok) throw res
                res.json().then(json => this.update_item(json))
            }).catch(error => {
                switch (error.status) {
                    case 500:
                        alert('Oops! Something went wrong when switch campaign product status. Please contact tech support. [info: campaign product switch]')
                        break
                    case 404:
                        error.json().then(e => alert(e.detail))
                        break
                    case 401:
                        alert('You have no permission to access this campaign product asset.')
                        break
                }
            })
        }
    }
}
</script>

<style scoped>

.form-check-input {
    border-color: black !important;
}

.table th {
    /*padding-left: 0 !important;*/
    padding: 5px !important;
    position: sticky !important; 
    top: 0 !important;
    z-index: 9;
}

.table td {
    /*padding-left: 0 !important;*/
    padding: 5px !important;
    border-collapse: collapse;
    overflow-wrap: break-word;
    max-width: 95px;
}

thead th{ 
  position: sticky !important; 
  top: 0 !important;
  z-index: 9;
}
</style>