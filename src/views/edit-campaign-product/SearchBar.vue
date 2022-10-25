<template>
<div class="flex flex-col sm:flex-row"> 
    <label class="mr-2 w-fit my-auto">
        {{$t('edit_campaign_product.search_bar.category')}}
    </label>
    <select class="form-select sm:mr-4 h-[35px] sm:h-[42px] flex-1 w-32 sm:w-40 my-auto"
        v-model="selectedCategory" @change="search()">
        <option value=''> {{$t('edit_campaign_product.search_bar.all')}} </option>
        <option v-for="product_category, index in layoutStore.userInfo.user_subscription?.product_categories" :key="index" :value="product_category.id">{{ product_category.name }}</option>
    </select>
</div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, defineProps } from 'vue';
import { list_product_category } from '@/api_v2/product';
import { useRoute, useRouter } from "vue-router";
import { useCampaignDetailStore } from "@/stores/lss-campaign-detail";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
const props = defineProps({
    eventBusName:String
})

const route = useRoute();
const router = useRouter();

const store = useCampaignDetailStore()
const layoutStore = useLSSSellerLayoutStore()
const selectedCategory = ref('')
// const categories = ref([])
const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;

// onMounted(() => {
//    list_product_category(layoutStore.alert).then(response => {
//         categories.value = response.data
//     }) 
// })

const search = () => {
    eventBus.emit(props.eventBusName,{'category':selectedCategory.value})
}



</script>