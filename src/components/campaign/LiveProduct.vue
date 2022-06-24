<template>
    <div
        class="box col-span-12 col-start-1 row-span-4 h-fit mt-0 lg:col-span-7 lg:row-start-3 lg:mt-2 2xl:col-span-4 2xl:row-start-1 2xl:mt-2">
        <div class="flex w-full mt-3 mx-3 p-2">
            <h2 class="text-lg font-medium w-48 mr-auto">Product</h2>
            <Dropdown class="inline-block">
                <DropdownToggle class="btn btn-primary mr-6 w-40">
                    Add Product
                </DropdownToggle>
                <DropdownMenu class="w-48 ">
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
            class="overflow-auto scrollbar-hidden box max-h-[42rem] lg:max-h-[18rem] 2xl:max-h-[42rem] mt-1">
            <table class="table table-sm">
                <thead class="table-dark">
                    <tr>
                        <th class="whitespace-nowrap table-dark" style="" v-for="column in product_columns" :key="column.key">
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
                            <div v-if="data.status === 1" class="
                                form-check form-switch
                                w-full
                                sm:w-auto sm:ml-auto
                                mt-3
                                sm:mt-0
                            ">
                                <input
                                    @click="toggle; item_status_switch(data.id, data.campaign, { 'status': data.status === 1 ? 0 : 1 });"
                                    class="form-check-input mr-0 ml-0" type="checkbox" checked />
                            </div>
                            <div class="
                                form-check form-switch
                                w-full
                                sm:w-auto sm:ml-auto
                                mt-3
                                sm:mt-0
                                " v-else>
                                <input
                                    @click="toggle; item_status_switch(data.id, data.campaign, { 'status': data.status === 1 ? 0 : 1 });"
                                    class="form-check-input mr-0 ml-0" type="checkbox" />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Modals -->
    <InstantlyAddProduct /> 
    <AddProductFromStock /> 

</template>
<script>
import { list_campaign_product, update_campaign_product } from '@/api/campaign_product';
import InstantlyAddProduct from './modals/InstantlyAddProductModal.vue';
import AddProductFromStock from './modals/AddProductFromStockModal.vue';
import { useLSSCampaignListStore } from "@/stores/lss-campaign-list";

export default {
    props: {
        campaignId: Number,
    },
    components:{
        InstantlyAddProduct,
        AddProductFromStock,
    },

    data() {
        return {
            store: useLSSCampaignListStore(),
            imagePath: import.meta.env.VITE_APP_IMG_URL,
            product_columns: [
                { name: "Image", key: "image" },
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
            }).catch(error => {
                console.log(error);
            })
        }
        this.eventBus.on("changeProductData", (payload) => {
            const index = this.product_results.findIndex(item => item.id === payload.id)
            this.product_results[index]["qty_sold"] = payload["qty_sold"]
        });

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
    z-index: 9999;
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
  z-index: 9999;
}
</style>