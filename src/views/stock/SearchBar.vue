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
                        <option v-for="category in productCategories" :key="category.value" :value="category.value">{{ category.text }}</option>
                    </select>
                </div>
                <button
                    type="button" 
                    class="btn btn-primary shadow-md w-32 h-[35px] lg:h-[42px] ml-3" 
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
                    class="flex-none w-7 h-7 mt-2 text-slate-600" @click="reset"/>
                <button
                    v-if="isBulkEditShow"
                    type="button" 
                    class="btn btn-primary shadow-md w-32 h-[35px] lg:h-[42px] ml-3" 
                    @click="bulkEdit">
                    {{ $t('stock.search_bar.bulk_edit') }}
                </button>
            </div>
        </div>
    </form>        
</template>

<script>

export default {
	setup() {
	},
	props: {
		searchColumns: Array,
        productCategories: Array,
        showCategoryFilter: Boolean,
        eventBusName: String
	},
	data() {
		return {
			page: 1,
			pageSize: 10,
			keyword: '',
            searchField: 'name',
            selectedCategory:'',
            isBulkEditShow: false
		}
	},
    mounted() {
        this.eventBus.on('isBulkEditShow', (payload) => {
            if (payload.stockListLength > 0) this.isBulkEditShow = true 
            else this.isBulkEditShow = false
        })
    },
    unmounted() {
        this.eventBus.off('isBulkEditShow')
    },
	watch: {
		searchField() {
			this.search();
		},
	},
	methods: {
		search() {
			this.eventBus.emit(this.eventBusName, {searchColumn: this.searchField, keyword: this.keyword, pageSize: this.pageSize, filterColumn: this.selectedCategory})
		},
		reset() {
			this.searchField = 'name';
			this.keyword = '';
            this.selectedCategory=''
            this.search();
		},
        bulkEdit () {
            this.eventBus.emit('bulkEditStock')
        }
	}
}
</script>