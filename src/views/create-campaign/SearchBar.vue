<template>
    <div class="intro-y p-5">
        <form id="tabulator-html-filter-form" class="flex flex-wrap justify-start justify-items-stretch content-end">
            <div class="flex-initial w-auto items-center">
                <label class="w-14 mr-2">
                    Category
                </label>
                <select id="tabulator-html-filter-field" class="form-select mr-4 h-10 w-auto"
                    v-model="filterColumn" @change="search">
                    <option value=''> All </option>
                    <option v-for="category in categorySelection" :key="category">{{ category }}</option>
                </select>
            </div>
        </form>
    </div>
</template>

<script>
import { list_product_category } from '@/api_v2/product';

export default {
    setup() {
    },
    data() {
        return {
            page: 1,
            pageSize: 10,
            searchColumn: 'name',
            filterColumn: undefined,
            categorySelection: []
        }
    },
    watch: {
        searchField() {
            this.search();
        },
    },
    mounted() {
        list_product_category().then(
            response => {
                console.log()
                this.categorySelection = response.data
            }
        )
    },
    methods: {
        search() {
            this.eventBus.emit("assignTable", { pageSize: this.pageSize, filterColumn: this.filterColumn })
        },
    }
}
</script>