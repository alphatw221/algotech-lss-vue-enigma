<template>
    <div class="intro-y box p-5 -mt-5">
        <form id="tabulator-html-filter-form" class="grid grid-cols-12 grid-warp">
            <div class="col-span-12 2xl:col-span-8 xl:col-span-8">
                <div class="flex flex-wrap justify-start justify-items-stretch content-end -mt-3">
                    
                    <div class="flex-initial w-auto items-center sm:mr-4">
                        <label class="w-14 xl:w-auto mr-2">
                            Field
                        </label>
                        <select id="tabulator-html-filter-field"
                            class="form-select w-auto mr-4 h-10 mt-2 " v-model="searchField">
                            <option v-for="searchColumn in searchColumns" :key="searchColumn.value" @change="search"
                                :value="searchColumn.value">
                                {{ searchColumn.text }}
                            </option>
                        </select>
                    </div>
                    <div class="flex-initial w-auto items-center">
                        <label class="w-14 mt-2 flex-none 2xl:w-auto mr-2 2xl:mt-0">
                            Value
                        </label>
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
		}
	}
}
</script>