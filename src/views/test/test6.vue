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
import { list_category } from '@/api_v2/stock';

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
        list_category().then(
            response => {
                this.categorySelection = response.data
            }
        )
    },
};
</script>
