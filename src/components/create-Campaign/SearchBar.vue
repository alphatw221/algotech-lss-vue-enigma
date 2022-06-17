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
                    <option v-for="filter in filterColums" :key="filter">{{ filter }}</option>
                </select>
            </div>
        </form>
    </div>
</template>

<script>

export default {
    setup() {
    },
    props: {
        filterColums: Object
    },
    data() {
        return {
            page: 1,
            pageSize: 10,
            searchColumn: 'name',
            filterColumn: undefined
        }
    },
    watch: {
        searchField() {
            this.search();
        },
    },
    methods: {
        search() {
            this.eventBus.emit("assignTable", { searchColumn: 'name', pageSize: this.pageSize, filterColumn: this.filterColumn })
        },
    }
}
</script>