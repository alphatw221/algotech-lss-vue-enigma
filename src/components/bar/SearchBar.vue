<template>
    <div class="intro-y box p-5 -mt-5">
        <form id="tabulator-html-filter-form" class="grid grid-cols-12 grid-warp">
            <div class="col-span-12 2xl:col-span-8 xl:col-span-8">
                <div class="flex flex-wrap justify-start justify-items-stretch content-end -mt-3">
                    <div class="flex-initial w-auto mr-4 items-center sm:mr-4" v-if="page_type === 'stock'">
                        <label class="w-14 mr-2">
                            Category
                        </label>
                        <select 
                            id="tabulator-html-filter-field"
                            class="form-select mr-4 h-10 w-auto mt-2" 
                            v-model="filterColumn"
                            @change="search"
                        >
                            <option v-for="filter in filterColums" :key="filter">{{ filter }}</option>
                        </select>
                    </div>
                    <div class="flex-initial w-auto items-center sm:mr-4">
                        <label class="w-14 xl:w-auto mr-2">
                            Search by
                        </label>
                        <select id="tabulator-html-filter-field"
                            class="form-select w-auto mr-4 h-10 mt-2 " v-model="searchField">
                            <option v-for="searchColumn in searchColumns" :key="searchColumn" @change="search"
                                :value="searchColumn">
                                {{ searchColumn.text }}
                            </option>
                        </select>
                    </div>
                    <div class="flex-initial w-auto items-center">
                        <input id="tabulator-html-filter-value" type="text"
                            class="form-control mt-2 w-auto" placeholder="Search..."
                            v-model="keyword" @keydown.enter.prevent="search" />
                    </div>
                </div>
            </div>
            <div class="col-start-1 2xl:col-start-9 xl:col-start-9">
                <div class="flex mt-2 self-end items-end">
                    <button id="tabulator-html-filter-go" type="button" class="flex-none btn btn-primary w-16 mr-3"
                        @click="search">
                        Go
                    </button>
                    <button id="tabulator-html-filter-reset" type="button"
                        class="flex-none btn btn-secondary w-16 sm:w-16 sm:mt-0 sm:ml-1" @click="reset">
                        Reset
                    </button>
                </div>
            </div>

            
            <button 
                v-if="isAddBtn"
                type="button"
                class="btn btn-primary shadow-md mt-3 col-start-1 col-span-12 xl:w-36 xl:mt-0 lg:col-start-11 xl:col-start-11 2xl:w-48 2xl:col-start-11 2xl:mt-0" 
                @click="this.$router.push({ path: routerPath, query: { type: routerParam }})"
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
		searchColumns: Object,
        isAddBtn: Boolean,
        routerPath: String,
        routerParam: String,
        page_type: String,
        filterColums: Object
	},
	data() {
		return {
			page: 1,
			pageSize: 10,
			searchColumn: {campaign_list:'title', stock:'name', manage_order:'title'},
			keyword: undefined,
            searchField: undefined,
            filterColumn: undefined
		}
	},
    created(){
        this.$nextTick(() => {
            this.searchField = this.searchColumn[this.page_type];
        })
    },
	watch: {
		searchField() {
			this.search();
		},
	},
	methods: {
		search() {
			this.eventBus.emit("searchTable", {searchColumn: this.searchField, keyword: this.keyword, pageSize: this.pageSize, filterColumn: this.filterColumn})
		},
		reset() {
			this.searchField = this.searchColumn[this.page_type];
			this.keyword = '';
            this.search();
		}
	}
}
</script>