<template>
    <div class="intro-y box p-5 -mt-5">
        <form id="tabulator-html-filter-form" class="grid grid-cols-12 grid-warp">
            <div class="col-span-12 2xl:col-span-6 xl:col-span-6">
                <div class="flex flex-wrap justify-start justify-items-stretch content-end mt-2 lg:-mt-3">
                    <div class="flex-initial w-auto mr-4 items-center sm:mr-4" v-if="showCategoryFilter">
                        <label class="w-14 mr-2">
                            Category
                        </label>
                        <select 
                            id="tabulator-html-filter-field"
                            class="form-select mr-4 h-10 w-auto mt-2"
                            v-model="selectedCategory"
                            @change="search"
                        >
                            <option v-for="category in productCategories" :key="category.value" :value="category.value">{{ category.text }}</option>
                        </select>
                    </div>
                    <div class="flex-initial w-auto items-center sm:mr-4">
                        <label class="w-14 xl:w-auto mr-2">
                            Field
                        </label>
                        <select id="tabulator-html-filter-field"
                            class="form-select w-auto mr-4 h-10 mt-2" v-model="searchField">
                            <option v-for="searchColumn in searchColumns" :key="searchColumn.value"
                                :value="searchColumn.value">
                                {{ searchColumn.text }}
                            </option>
                        </select>
                    </div>
                    <div class="flex-initial w-auto items-center">
                        <label class="w-14 mt-3 flex-none 2xl:w-auto mr-2">
                            Value
                        </label>
                        <input id="tabulator-html-filter-value" type="text"
                            class="form-control mt-3 w-auto lg:mt-2 2xl:mt-2" placeholder="Search..."
                            v-model="keyword" @keydown.enter.prevent="search" />
                    </div>
                </div>
            </div>
            <div class="col-start-1 2xl:col-start-7 xl:col-start-7">
                <div class="flex mt-3 self-end items-end 2xl:mt-0 xl:mt-0">
                    <button 
                        type="button" 
                        class="flex-none btn btn-primary w-16 mr-3"
                        @click="search">
                        Go
                    </button>
                    <button 
                        type="button"
                        class="flex-none btn btn-secondary w-16 sm:w-16 sm:mt-0 sm:ml-1" @click="reset">
                        Reset
                    </button>
                </div>
            </div>

            
            <button 
                v-if="showAddProductBtn"
                type="button"
                class="btn btn-primary col-start-1 col-span-12 xl:w-36 lg:col-start-11 xl:col-start-11 2xl:col-start-11" 
                @click="this.$router.push({name: 'add-product'})"
            >
                Add Product
            </button>
        </form>        
    </div>
</template>

<script>

export default {
	setup() {
	},
	props: {
		searchColumns: Array,
        productCategories: Array,
        showAddProductBtn: Boolean,
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