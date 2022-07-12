<template>
    <div class="p-5 intro-y">
        <form id="tabulator-html-filter-form" class="flex-col flex-wrap content-end justify-start justify-items-stretch">
            <label class="mr-2 w-14">
                Category
            </label>
            <select class="form-select mr-4 h-[42px] flex-1 sm:flex-none sm:w-40"
                v-model="filterColumn" @change="search">
                <option value=''> All </option>
                <option v-for="category in categorySelection" :key="category">{{ category }}</option>
            </select>
        </form>
    </div>
</template>

<script>
import { list_product_category } from '@/api_v2/product';

export default {
    data() {
        return {
            page: 1,
            pageSize: 10,
            searchColumn: 'name',
            filterColumn: undefined,
            categorySelection: []
        }
    },
    mounted() {
        list_product_category().then(response => {
            this.categorySelection = response.data
        })
    },
    methods: {
        search() {
            this.eventBus.emit("addProducts")
            this.eventBus.emit("assignTable", { filterColumn: this.filterColumn })
        },
    }
}
</script>