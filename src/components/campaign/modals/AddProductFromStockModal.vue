<template>
        <Modal size="modal-xl" class="text-center" :slideOver="true" :show="store.showAddProductFromStockModal"
        @hidden="store.showAddProductFromStockModal = false">
        <a @click="store.showAddProductFromStockModal = !store.showAddProductFromStockModal" class="absolute right-0 top-0 mt-3 mr-3">
            <XIcon class="w-8 h-8 text-slate-400" />
        </a>
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
<!-- 
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
                            <th class="text-center whitespace-nowrap">Edit</th>
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
                                            <Tippy tag="img" class="rounded-lg" :src="product.image"
                                                :content="`product`" />
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
                </table> -->
            </div>
        </ModalBody>
    </Modal>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { useLSSCampaignListStore } from "@/stores/lss-campaign-list";


const store = useLSSCampaignListStore(); 
const props = defineProps({
    currentProductList: Object, 
});

</script>
