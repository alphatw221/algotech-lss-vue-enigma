<template>
    <div class="intro-y px-5">
        <form id="tabulator-html-filter-form" class="flex flex-col sm:flex-row">
            <div class="flex flex-row justify-start justify-items-stretch content-end -mt-3 sm:mt-0 mr-auto">
                <div class="flex-initial w-auto items-center sm:mr-4">
                    <label class="w-14 xl:w-auto mr-2">
                        Search by
                    </label>
                    <select id="tabulator-html-filter-field"
                        class="form-select w-auto mr-4 h-10 mt-2" v-model="searchField">
                        <option v-for="searchColumn in searchColumns" :key="searchColumn.value" @change="search"
                            :value="searchColumn.value">
                            {{ searchColumn.text }}
                        </option>
                    </select>
                </div>
                <div class="flex-initial w-auto items-center">
                    <input id="tabulator-html-filter-value" type="text"
                        class="form-control mt-2 w-auto h-10" placeholder="Search..."
                        v-model="keyword" @keydown.enter.prevent="search" />
                </div>
            </div>
            <div class="flex mt-2 self-end items-end sm:mt-0">
                <button id="tabulator-html-filter-go" type="button" class="flex-none btn btn-primary w-16 h-10 mr-3"
                    @click="search">
                    Go
                </button>
                <button id="tabulator-html-filter-reset" type="button"
                    class="flex-none btn btn-secondary w-16 h-10 sm:w-16 sm:mt-0 sm:ml-1" @click="reset">
                    Reset
                </button>
            </div>
        </form>        
    </div>
</template>

<script>

export default {
	props: {
		searchColumns: Object,
        eventBusName:String,
        campaignStatus:String
	},
	data() {
		return {
			page: 1,
			pageSize: 10,
			keyword: '',
            searchField: 'title',
		}
	},
	watch: {
		searchField() {
			this.search();
		},
	},
	methods: {
		search() {
			this.eventBus.emit(this.eventBusName, {searchColumn: this.searchField, keyword: this.keyword, pageSize: this.pageSize})
		},
		reset() {
			this.searchField = 'title';
			this.keyword = '';
            this.search()
		}
	}
}
</script>