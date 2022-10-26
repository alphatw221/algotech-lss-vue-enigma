<template>
    <form>
        <div class="flex flex-wrap justify-start w-full gap-2 sm:flex-row">
            <div class="flex w-full sm:w-fit justify-between sm:justify-start" v-if="showCategoryFilter">
                <div class="flex"> 
                    <label class="mr-2 my-auto whitespace-nowrap">
                        {{ $t('stock.search_bar.category') }}
                    </label>
                    <select 
                        class="w-auto h-[35px] sm:h-[42px] rounded-lg form-select-sm sm:form-select"
                        v-model="selectedCategory"
                        @change="search"
                    >
                        <option :value="''">{{ $t('product_category.all') }}</option>
                        <option v-for="productCategory, index in layoutStore.userInfo.user_subscription?.product_categories" :key="index" :value="productCategory.id">{{ productCategory.name }}</option>
                    </select>
                </div>
                <button
                    v-if="!layoutStore.plugins"
                    type="button" 
                    class="btn btn-primary shadow-md w-32 h-[35px] sm:h-[42px] ml-3" 
                    @click="this.$router.push({name:'category-management'})">
                    {{ $t('stock.search_bar.category_manage') }}
                </button>
            </div> 
            <div class="flex"> 
                <div class="relative"> 
                    <input type="text" class=" mr-2 form-control w-40 lg:w-60 rounded-lg"
                    :placeholder="$t('stock.search_bar.search_holder')" v-model="keyword" @keydown.enter.prevent="search" />
                    <SearchIcon class="absolute w-7 h-7 top-1 sm:top-2 right-4 z-10 text-slate-600" @click="search()"/>
                </div>
                <XIcon 
                    v-if="keyword"
                    class="flex-none w-7 h-7 mt-2 text-slate-600" @click="reset()"/>
                <button
                    v-show="computedShowBulkEditButton"
                    type="button" 
                    class="btn btn-primary shadow-md w-32 h-[35px] lg:h-[42px] ml-4" 
                    @click="showBulkEditModal()"
                >
                    {{ $t('stock.search_bar.bulk_edit') }}
                </button>
            </div>
        </div>
    </form>        
</template>

<script setup>
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import { ref, onMounted, getCurrentInstance, defineProps, onUnmounted,computed } from 'vue'
import { useRoute, useRouter } from "vue-router"
import { useSellerStockStore } from "@/stores/lss-seller-stock"


const route = useRoute()
const router = useRouter()

const stockStore = useSellerStockStore();
const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;
const props = defineProps({
    showCategoryFilter: Boolean,
    searchEventBusName: String,
})

const keyword = ref('')
const searchField = ref('name')
const selectedCategory = ref('')
const layoutStore = useLSSSellerLayoutStore()

const computedShowBulkEditButton = computed(()=>{
    if(stockStore.selectedProductIDList.length>0)return true
    return false
})

const search = ()=> {
    eventBus.emit(props.searchEventBusName, {searchColumn: searchField.value, keyword: keyword.value, categoryID: selectedCategory.value})
}

const reset = () => {
    searchField.value = 'name';
    keyword.value = '';
    selectedCategory.value=''
    search();
}

const showBulkEditModal = ()=> {
    stockStore.showBulkEditModal = true
}


</script>