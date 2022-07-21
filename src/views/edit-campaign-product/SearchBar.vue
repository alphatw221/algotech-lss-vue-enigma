<template>
    <label class="mr-2 w-14 my-auto">
        {{$t('edit_campaign_product.search_bar.category')}}
    </label>
    <select class="form-select sm:mr-4 h-[42px] flex-1 sm:flex-none sm:w-40 my-auto"
        v-model="selectedCategory" @change="search()">
        <option value=''> {{$t('edit_campaign_product.search_bar.all')}} </option>
        <option v-for="category, index in categories" :key="index">{{ category }}</option>
    </select>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, defineProps } from 'vue';
import { list_product_category } from '@/api_v2/product';
import { useRoute, useRouter } from "vue-router";
import { useCampaignDetailStore } from "@/stores/lss-campaign-detail";

const props = defineProps({
    eventBusName:String
})

const route = useRoute();
const router = useRouter();

const store = useCampaignDetailStore()

const selectedCategory = ref('')
const categories = ref([])
const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;

onMounted(() => {
   list_product_category().then(response => {
        categories.value = response.data
    }) 
})

const search = () => {
    eventBus.emit(props.eventBusName,{'category':selectedCategory.value})
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