<template>
<div class="flex flex-col sm:flex-row"> 
    <label class="mr-2 w-fit my-auto">
        {{$t('edit_campaign_product.search_bar.category')}}
    </label>
    <select class="form-select sm:mr-4 h-[35px] sm:h-[42px] flex-1 w-32 sm:w-40 my-auto"
        v-model="selectedCategory" @change="search()">
        <option value=''> {{$t('product_category.all')}} </option>
        <option v-for="product_category, index in productCategories" :key="index" :value="product_category.id">{{ product_category.name }}</option>
    </select>



    <!-- input search bar -->


    <div class="items-center w-auto flex mt-auto">
                <!-- <SearchIcon class="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3 text-slate-700 col-span-2" /> -->
        <div class="relative "> 
            <input type="text" class="shrink h-[35px] sm:h-[42px] w-40 lg:w-[260px] pr-10 rounded-lg"
                :placeholder="$t('product.name')+'/'+$t('product.order_code')+'...'"
                v-model="searchKeyword" @keydown.enter.prevent="search()"/>
            <SearchIcon class="absolute w-7 h-7 top-1 sm:top-2 right-3 z-10 text-slate-600" @click="search()"/>
        </div>
        <XIcon 
            v-if="searchKeyword"
            class="flex-none w-7 h-7 mt-2 ml-2 text-slate-600" @click="resetSearchKeyword()"/>
    </div>


</div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, defineProps, computed } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { useCampaignDetailStore } from "@/stores/lss-campaign-detail";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
const props = defineProps({
    eventBusName:String
})

const route = useRoute();
const router = useRouter();

const campaignDetailStore = useCampaignDetailStore()
const layoutStore = useLSSSellerLayoutStore()
const selectedCategory = ref('')
const searchKeyword = ref('')
// const categories = ref([])
const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;


const productCategories = computed(() => {
	if (campaignDetailStore.campaign.supplier) {
		return campaignDetailStore.campaign.supplier.product_categories
	} else {
		return layoutStore.userInfo.user_subscription.product_categories
	}
})

const search = () => {
    eventBus.emit(props.eventBusName,{'category':selectedCategory.value,'keyword':searchKeyword.value})
}

const resetSearchKeyword = ()=>{
    searchKeyword.value = ''
    search()
}


</script>