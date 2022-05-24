<template>
  <div class="mt-8">
    <TabGroup class="grid grid-cols-2 gap-4 -mt-2">
      <div class="col-start-1 ml-5">
        <TabList class="nav-boxed-tabs">
          <Tab class="w-full py-2" tag="button">For Sale</Tab>
          <Tab class="w-full py-2" tag="button">Delisted</Tab>
          <Tab class="w-full py-2" tag="button">Sold out</Tab>
          <Tab class="w-full py-2" tag="button">Delete</Tab>
        </TabList>
      </div>
      <div class="p-5 col-span-12">
          <TabPanels class="mt-5">
            <TabPanel class="leading-relaxed">
              <div
                class="intro-y grid grid-cols-12"
              >
                <div class="intro-y col-start-1 col-span-12">
                  <SearchBar :searchColumns="searchColumns" />
                </div>
                <div class="intro-y col-start-1 col-span-12 overflow-auto lg:overflow-visible xl:overflow-y-auto">
                  <DataTable
                    :requestUrl="'/api/v2/product/list_product/'"
                    :columns="tableColumns"
                  >
                  </DataTable>
                </div>
              </div>
			  
            </TabPanel>
            <TabPanel class="leading-relaxed"> Delisted. </TabPanel>
            <TabPanel class="leading-relaxed"> Sold. </TabPanel>
            <TabPanel class="leading-relaxed"> Delete. </TabPanel>
          </TabPanels>
      </div>
    </TabGroup>
  </div>
</template>

<script>
import { createAxiosWithBearer } from "@/libs/axiosClient";
import SearchBar from "@/components/bar/SearchBar.vue";
import DataTable from "@/components/table/DataTable.vue";

export default {
  components: {
    SearchBar,
    DataTable,
  },
  data() {
    return {
      searchColumns: {
        keywords: [
          { text: "Name", value: "name" },
          { text: "Order Code", value: "order_code" },
          { text: "Category", value: "category" },
          { text: "Description", value: "description" },
        ],
      },
      tableColumns: [
        { name: "Image", key: "image" },
        { name: "Product Name", key: "name" },
        { name: "Order Code", key: "order_code" },
        { name: "Type", key: "type" },
        { name: "Category", key: "category" },
        { name: "Description", key: "description" },
        { name: "Quantity", key: "qty" },
        { name: "Price", key: "price" },
        // {name: 'Edit', key: 'edit'},
      ],
    };
  },
  mounted() {
    this.$cookies.set(
      "access_token",
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUzODc1MzU0LCJpYXQiOjE2NTMyNzA1NTQsImp0aSI6IjZmYWFjZTY2NDIwZTQ5NTg4ZWJhM2E5ZjFjNmJmNThlIiwidXNlcl9pZCI6ODAsImRhdGEiOnsiYXV0aF91c2VyX2lkIjo4MCwic2VsbGVyX2lkIjoyNCwiY3VzdG9tZXJfaWQiOjk3LCJuYW1lIjoiRGVyZWsgSHdhbmciLCJlbWFpbCI6ImRlcmVraHdhbmczM0BnbWFpbC5jb20ifX0.JeRVYZMKkkJSywtrqvw1hb1oEYgtLqSaDx56WFJ-HKk"
    );

    // createAxiosWithBearer().get('/api/user-subscription/buyer/list?page=1&page_size=5&search_column=shipping_email&keyword=qq').then(response => {
    // 	console.log(response);
    // }).catch(function (error) {
    // 	console.log(error);
    // })
  },
  methods: {},
};
</script>

<style scoped></style>
