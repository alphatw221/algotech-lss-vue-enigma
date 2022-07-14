<template>
    <form class="text-[13px] sm:text-[16px] flex justify-between gap-2 sm:gap-5 flex-warp sm:flex-row">
        <div class="flex flex-wrap justify-between w-full gap-2 sm:flex-row">
            <div class="flex items-center flex-initial w-fit" v-if="showCategoryFilter">
                <label class="mr-2 w-fit">
                    Category
                </label>
                <select 
                    class="w-auto h-[35px] sm:h-[42px] rounded-lg form-select-sm sm:form-select"
                    v-model="selectedCategory"
                    @change="search"
                >
                    <option v-for="category in productCategories" :key="category.value" :value="category.value">{{ category.text }}</option>
                </select>
            </div>
            <div class="flex items-center flex-initial w-fit" >
                <label class="mr-2 shrink whitespace-nowrap">
                    Search by
                </label>
                <select
                    class="h-[35px] sm:h-[42px] mr-0 form-select sm:mr-2 shrink rounded-lg form-select-sm sm:form-select" v-model="searchField">
                    <option v-for="searchColumn in searchColumns" :key="searchColumn.value"
                        :value="searchColumn.value">
                        {{ searchColumn.text }}
                    </option>
                </select>
            </div>
            <div class="flex items-center flex-initial w-fit">
                <div class="input-group">
                    <input type="text"
                        class="w-40 form-control input-group shrink sm:40" placeholder="Search..."
                        v-model="keyword" @keydown.enter.prevent="search" />
                    <button 
                        type="button"
                        class="flex-none btn btn-secondary w-16 h-[35px] sm:h-[42px] rounded-l-none" @click="reset">
                        Reset
                    </button>
                </div>
            </div>
            <button id="tabulator-html-filter-go" 
                type="button" 
                class="btn btn-primary shadow-md w-48 h-auto lg:h-[42px] self-end flex-none items-end flex ml-auto" 
                @click="this.$router.push({name:'category-management'})">
                Category Management
            </button>
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
            selectedCategory:''
		}
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
		}
	}
}
</script>