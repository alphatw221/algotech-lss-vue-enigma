<template>
    <div class="intro-y box p-5 -mt-5">
        <div class="flex flex-col sm:flex-row sm:items-end xl:items-start">
            <form id="tabulator-html-filter-form" class="xl:flex sm:mr-auto">
                <div class="sm:flex items-center sm:mr-4">
                    <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2">
                        Category
                    </label>
                    <select
                        id="tabulator-html-filter-field"
                        class="form-select w-full sm:w-32 2xl:w-full mt-2 sm:mt-0 sm:w-auto"
                    >
                        <option value="category">Accesories</option>
                        <option value="remaining_stock">Shorts</option>
                    </select>
                </div>
                <div class="sm:flex items-center sm:mr-4">
                    <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2">
                        Field
                    </label>
                    <select
                        id="tabulator-html-filter-field"
                        class="form-select w-full sm:w-32 2xl:w-full mt-2 sm:mt-0 sm:w-auto"
                        v-model="searchColumn"
                    >
                        <option 
                            v-for="searchColumn in searchColumns.keywords"
                            :key="searchColumn.value" 
                            :value="searchColumn.value"
                        >
                            {{ searchColumn.text }}
                        </option>
                    </select>
                </div>
                <div class="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
                    <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2"
                        >Value</label
                    >
                    <input
                        id="tabulator-html-filter-value"
                        type="text"
                        class="form-control sm:w-40 2xl:w-full mt-2 sm:mt-0"
                        placeholder="Search..."
                        v-model="keyword"
                        @keydown.enter.prevent="search"
                    />
                </div>
                <div class="mt-2 xl:mt-0">
                    <button
                        id="tabulator-html-filter-go"
                        type="button"
                        class="btn btn-primary w-full sm:w-16"
                        @click="search"
                    >
                        Go
                    </button>
                    <button
                        id="tabulator-html-filter-reset"
                        type="button"
                        class="btn btn-secondary w-full sm:w-16 mt-2 sm:mt-0 sm:ml-1"
                        @click="reset"
                    >
                        Reset
                    </button>
                </div>
            </form>
            <button class="btn btn-primary shadow-md mr-2" @click="this.$router.push('add_product')">Add New Product</button>
        </div>
    </div>
</template>

<script>

export default {
	setup() {
		
	},
	props: {
		searchColumns: Object
	},
	data() {
		return {
			page: 1,
			pageSize: 10,
			searchColumn: 'name',
			keyword: undefined,
		}
	},
	watch: {
		searchColumn() {
			this.search();
		},
	},
	methods: {
		search() {
			this.eventBus.emit("searchTable", {searchColumn: this.searchColumn, keyword: this.keyword, pageSize: this.pageSize})
		},
		reset() {
			this.searchColumn = ''
			this.keyword = ''
		}
	}
}
</script>