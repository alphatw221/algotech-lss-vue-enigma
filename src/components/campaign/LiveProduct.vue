<template>
    <div class="box col-span-12 col-start-1 row-span-4 h-fit mt-0 lg:col-span-7 lg:row-start-3 lg:-mt-2 2xl:col-span-4 2xl:row-start-1" >
        <div class="box p-2 intro-y grid grid-cols-12 gap-5 mt-5 p-6 lg:mt-3">
            <row class="col-span-12" style="margin: -13px 0 -13px 0px;">
                <h2 class="text-lg font-medium w-48">Product</h2>
                <a href="javascript:;" @click="this.addProductFromStock = !this.addProductFromStock"
                    class="btn btn-primary right-0">Add Product From Stock</a>
            </row>
        </div>
        <div class="overflow-x-auto overflow-y-auto scrollbar-hidden box max-h-[42rem] lg:max-h-[18rem] 2xl:max-h-[42rem] mt-1">
            <div class="sticky top-0 z-50"> 
                <table class="table table-sm">
                    <thead class="table-dark">
                        <tr>
                            <th class="whitespace-nowrap" style="" v-for="column in product_columns" :key="column.key">
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
                                    <input @click="toggle;item_status_switch(data.id, data.campaign, {'status':data.status === 1 ? 0 : 1});" class="form-check-input mr-0 ml-0" type="checkbox" checked />
                                </div>
                                <div class="
                                    form-check form-switch
                                    w-full
                                    sm:w-auto sm:ml-auto
                                    mt-3
                                    sm:mt-0
                                    " v-else
                                >
                                    <input @click="toggle;item_status_switch(data.id, data.campaign, {'status':data.status === 1 ? 0 : 1});" class="form-check-input mr-0 ml-0" type="checkbox" />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>      

    <!-- BEGIN: Add Product From Stock -->
    <Modal size="modal-xl" class="text-center" :slideOver="true" :show="addProductFromStock"
        @hidden="addProductFromStock = false">
        <ModalHeader class="text-center p-5">
            <h2 class="font-medium text-base text-center">
                Add Product From Stock
            </h2>
        </ModalHeader>
        <ModalBody>
            <div class="intro-y col-span-12 overflow-auto lg:overflow-visible">
                <div class="flex flex-col sm:flex-row sm:items-end xl:items-start">
                    <form id="tabulator-html-filter-form" class="xl:flex sm:mr-auto sm:flex items-center">
                        <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2">Category</label>
                        <select id="tabulator-html-filter-field" class="
                            form-select
                            w-full
                            sm:w-32
                            2xl:w-full
                            mt-2
                            sm:mt-0 sm:w-auto
                            ">
                            <option value="name">Name</option>
                            <option value="category">Category</option>
                            <option value="remaining_stock">Remaining Stock</option>
                        </select>
                    </form>
                </div>

                <table class="table table-report mt-3">
                    <thead>
                        <tr>
                            <th class="whitespace-nowrap" v-for="column in add_product_columns" :key="column.key">
                                <template v-if="column.key == 'select'">
                                    <div class="form-check mt-2">
                                        <input id="checkbox-switch-1" class="form-check-input" type="checkbox"
                                            value="" />
                                    </div>
                                </template>
                                <template v-if="
                                    column.key === 'qty_for_campaign' ||
                                    column.key === 'max_qty'
                                " style="width: 80px">
                                    {{ column.name }}
                                </template>
                                <template v-else>
                                    {{ column.name }}
                                </template>
                            </th>
                            <!--<th class="text-center whitespace-nowrap">Edit</th> -->
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(product, key) in add_product_results" :key="key" class="intro-x">
                            <td v-for="column in add_product_columns" :key="column.key">
                                <template v-if="
                                    column.key === 'select' ||
                                    column.key == 'editable' ||
                                    column.key == 'deletable'
                                ">
                                    <div class="form-check mt-2">
                                        <input id="checkbox-switch-1" class="form-check-input" type="checkbox"
                                            value="" />
                                    </div>
                                </template>
                                <template v-if="column.key === 'image'" class="w-40">
                                    <div class="flex">
                                        <div class="w-10 h-10 image-fit zoom-in">
                                            <Tippy tag="img" class="rounded-full" :src="product.image"
                                                :content="`Uploaded at`" />
                                        </div>
                                    </div>
                                </template>
                                <template v-else-if="
                                    column.key === 'qty_for_campaign' ||
                                    column.key === 'max_qty'
                                ">
                                    <input id="regular-form-1" type="text" class="form-control" placeholder=""
                                        style="width: 100px" />
                                </template>
                                <template v-else class="w-30">
                                    {{ product[column.key] }}
                                </template>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </ModalBody>
    </Modal>
    <!-- END: Add Product From Stock --> 
</template>
<script>
import {list_campaign_product, update_campaign_product} from '@/api/campaign_product';
export default {
    props: {
        campaignId: Number
    },
    
    data() {
        return {
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
            }).catch(error => {
                console.log(error);
            })
        }
        
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