<template>
    <div class="p-2 sm:p-5 box intro-y">
        <div id="tabulator-html-filter-form" class="flex-col flex-wrap content-end justify-start justify-items-stretch">
            <label class="mr-2 w-14">
                Category
            </label>
            <select class="form-select mr-4 h-[42px] flex-1 sm:flex-none sm:w-40"
                v-model="filterColumn" @change="search">
                <option value=''> All </option>
                <option v-for="category in categorySelection" :key="category">{{ category }}</option>
            </select>
            <button 
                class="w-32 ml-5 shadow-md btn btn-primary" 
                v-show="route.name === 'edit-campaign-product'"
                @click="store.showAddProductFromStockModal = true"
            >
                Add Product
            </button>
        </div>

        <AddProductFromStockModal />
        
    </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue';
import { list_product_category } from '@/api_v2/product';
import { useRoute, useRouter } from "vue-router";
import AddProductFromStockModal from '@/components/campaign/modals/AddProductFromStockModal.vue';
import { useCampaignDetailStore } from "@/stores/lss-campaign-detail";


const route = useRoute();
const router = useRouter();
const store = useCampaignDetailStore()
const page = ref(1)
const pageSize = ref(10)
const searchColumn = ref('name')
const filterColumn = ref(undefined)
const categorySelection = ref([])
const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;

onMounted(() => {
   list_product_category().then(response => {
        categorySelection.value = response.data
    }) 
})

const search = () => {
    eventBus.emit("addProducts")
    eventBus.emit("assignTable", { filterColumn: filterColumn.value })
}


// export default {
//     data() {
//         return {
//             page: 1,
//             pageSize: 10,
//             searchColumn: 'name',
//             filterColumn: undefined,
//             categorySelection: []
//         }
//     },
//     mounted() {
        
//         list_product_category().then(response => {
//             this.categorySelection = response.data
//         })
//     },
//     methods: {
//         search() {
//             this.eventBus.emit("addProducts")
//             this.eventBus.emit("assignTable", { filterColumn: this.filterColumn })
//         },
       
//     }
// }
</script>