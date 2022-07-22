<template>
    <form>
        <div class="flex flex-wrap content-end justify-start gap-3 mr-auto -mt-3 justify-items-stretch sm:mt-0">
            <div class="items-center flex-initial w-auto sm:mr-4">
                <!-- <label class="mr-2 w-14 xl:w-auto"> -->
                <label class="mr-2 shrink whitespace-nowrap">
                    {{$t('campaign_list.search_bar.search')}}
                </label>
                <select id="tabulator-html-filter-field"
                    class="w-auto h-[35px] sm:h-[42px] mr-4 form-select" v-model="searchField">
                    <option v-for="searchColumn in searchColumns" :key="searchColumn.value" @change="search"
                        :value="searchColumn.value">
                        {{ $t(`campaign_list.search_bar.`+searchColumn.text) }}
                    </option>
                </select>
            </div>
            <div class="items-center w-auto flex">
                <!-- <SearchIcon class="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3 text-slate-700 col-span-2" /> -->
                <div class="relative "> 
                    <input type="text" class=" h-[35px] sm:h-[42px] w-40 lg:w-60 pr-10 rounded-lg"
                        :placeholder="$t('campaign_list.search_bar.search')+'...'"
                        v-model="keyword" @keydown.enter.prevent="search()"/>
                    <SearchIcon class="absolute w-7 h-7 top-1 sm:top-2 right-3 z-10 text-slate-600" @click="search()"/>
                </div>
                <XIcon 
                    v-if="keyword"
                    class="flex-none w-7 h-7 mt-2 ml-2 text-slate-600" @click="reset()"/>
            </div>
        </div>
    </form>       
</template>

<!-- <template>
    <form class="flex justify-between gap-5 flex-warp sm:flex-row">
        <div class="flex flex-wrap justify-between w-full gap-2 sm:flex-row">
            <div class="items-center flex-initial w-fit" v-if="showCategoryFilter">
                <label class="mr-2 w-14">
                    Category
                </label>
                <select 
                    id="tabulator-html-filter-field"
                    class="w-auto h-10 form-select"
                    v-model="selectedCategory"
                    @change="search"
                >
                    <option v-for="category in productCategories" :key="category.value" :value="category.value">{{ category.text }}</option>
                </select>
            </div>
            <div class="flex items-center flex-initial w-fit" >
                <label class="mr-2 shrink whitespace-wrap lg:whitespace-nowrap">
                    Search by
                </label>
                <select
                    class="h-10 mr-0 form-select sm:mr-2 shrink" v-model="searchField">
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
                        class="flex-none w-16 h-10 rounded-l-none btn btn-secondary" @click="reset">
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
</template> -->

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
			pageSize: 100,
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