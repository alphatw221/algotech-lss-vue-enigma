<template>
    <form class="flex flex-warp justify-between gap-5 sm:flex-row">
        <div class="flex flex-wrap gap-2 justify-between w-full sm:flex-row">
            <div class="flex-initial w-fit items-center" v-if="showCategoryFilter">
                <label class="w-14 mr-2">
                    Category
                </label>
                <select 
                    id="tabulator-html-filter-field"
                    class="form-select h-10 w-auto"
                    v-model="selectedCategory"
                    @change="search"
                >
                    <option v-for="category in productCategories" :key="category.value" :value="category.value">{{ category.text }}</option>
                </select>
            </div>
            <div class="flex-initial w-fit items-center flex" >
                <label class="mr-2 shrink whitespace-wrap lg:whitespace-nowrap">
                    Search by
                </label>
                <select
                    class="form-select mr-0 sm:mr-2 h-10 shrink" v-model="searchField">
                    <option v-for="searchColumn in searchColumns" :key="searchColumn.value"
                        :value="searchColumn.value">
                        {{ searchColumn.text }}
                    </option>
                </select>
            </div>
            <div class="flex-initial w-fit items-center flex">
                <div class="input-group">
                    <input type="text"
                        class="form-control input-group shrink w-40 sm:40" placeholder="Search..."
                        v-model="keyword" @keydown.enter.prevent="search" />
                    <button 
                        type="button"
                        class="flex-none btn btn-secondary w-16 h-10 rounded-l-none" @click="reset">
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
		}
	}
}
</script>