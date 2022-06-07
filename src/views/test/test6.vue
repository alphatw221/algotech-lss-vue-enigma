<template>
    <div>
        <div class="mt-10">
            <div class="p-1 col-span-12 lg:p-5 2xl:p-5">
                    <div class="intro-y col-span-12 overflow-auto lg:overflow-visible">
                        <SearchBar :searchColumns="searchColumns" :filterColums="categorySelection">
                        </SearchBar>
                        <DataTable class="overflow-x-auto" 
                            :requestUrl="'/api/v2/product/search'"
                            :columns="tableColumns">
                        </DataTable>
                    </div>
            </div>
        </div>
    </div>
</template>

<script>
import SearchBar from "@/components/create-Campaign/SearchBar.vue";
import DataTable from "@/components/create-Campaign/AssignTable.vue";
import { list_category } from '@/api/stock';

export default {
    components: {
        SearchBar,
        DataTable,
    },
    data() {
        return {
            tableColumns: [
                { name: "Selected", key: "checkbox" },
                { name: "Image", key: "image" },
                { name: "Product Name", key: "name" },
                { name: "Order Code", key: "order_code" },
                { name: "OTY for Campaign", key: "qty_camp" },
                { name: "Max OTY/Order", key: "qty_order" },
                { name: "Quantity", key: "qty" },
                { name: "Price", key: "price" }, 
                { name: "Editable", key: "edit" },
                { name: "Deletable", key: "delete" },
                { name: "Type", key: "type" },
            ],
            categorySelection: []
        };
    },
    mounted() {
        this.$cookies.set("access_token", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU1MDkzMzAxLCJpYXQiOjE2NTQ0ODg1MDEsImp0aSI6IjI0YjNlNjQ5YWJiNjRjMzNhYzc3NjAyNDUxOTI1ZGMwIiwidXNlcl9pZCI6ODAsImRhdGEiOnsiYXV0aF91c2VyX2lkIjo4MCwic2VsbGVyX2lkIjoyNCwiY3VzdG9tZXJfaWQiOjk3LCJuYW1lIjoiRGVyZWsgSHdhbmciLCJlbWFpbCI6ImRlcmVraHdhbmczM0BnbWFpbC5jb20ifX0.6Vk1vwq5fNOipuUUBl0HE3Vmz0BD4Vs3X6Yebvl_S0c" );
        list_category().then(
            response => {
                this.categorySelection = response.data
            }
        )
    },
};
</script>
