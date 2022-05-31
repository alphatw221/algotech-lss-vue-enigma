<template>
	<div>
		<div class="mt-10">
			
			<TabGroup class="grid grid-cols-2 gap-4">
				<div class="col-start-1 ml-5">
					<TabList class="nav-boxed-tabs">
						<Tab class="w-full py-2" tag="button">For Sale</Tab>
						<Tab class="w-full py-2" tag="button">Delisted</Tab>
						<Tab class="w-full py-2" tag="button">Sold out</Tab>
						<Tab class="w-full py-2" tag="button">Delete</Tab>
					</TabList>
				</div>
				<div class="p-5 col-span-12">
					<div class="overflow-x-auto">
						<TabPanels class="mt-5">
							<TabPanel class="leading-relaxed"> 
								<div class="intro-y col-span-12 overflow-auto lg:overflow-visible">
									<SearchBar
										:searchColumns="searchColumns"
										:isAddBtn="true"
										:routerPath="'add-product'"
										:routerParam="'create'"
										:page_type="'stock'"
									>
									</SearchBar>	
									<DataTable
										:requestUrl="'/api/v2/product/list'"
										:columns="tableColumns"
										:routerPath="'add-product'"
										:routerParam="'update'"
										:status="'enabled'"
									>
									</DataTable>
								</div>
							</TabPanel>
							<TabPanel class="leading-relaxed"> 
								<div class="intro-y col-span-12 overflow-auto lg:overflow-visible">
									<SearchBar
										:searchColumns="searchColumns"
										:isAddBtn="true"
										:routerPath="'add-product'"
										:routerParam="'create'"
									>
									</SearchBar>	
									<DataTable
										:requestUrl="'/api/v2/product/list'"
										:columns="tableColumns"
										:routerPath="'add-product'"
										:routerParam="'update'"
										:status="'disabled'"
									>
									</DataTable>
								</div>
							</TabPanel>
							<TabPanel class="leading-relaxed"> Sold. </TabPanel>
							<TabPanel class="leading-relaxed"> Delete. </TabPanel>
						</TabPanels>
					</div>
				</div>
				
			</TabGroup>
		</div>
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
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU0NTA2NDc0LCJpYXQiOjE2NTM5MDE2NzQsImp0aSI6IjMzZTJjNGQ2YzdhZjRhNzBiYjI1OTYxYTUxNTRmMmRlIiwidXNlcl9pZCI6NzcsImRhdGEiOnsiYXV0aF91c2VyX2lkIjo3Nywic2VsbGVyX2lkIjo5MCwiY3VzdG9tZXJfaWQiOjEwNCwibmFtZSI6IkplcmVteSBDaG91IiwiZW1haWwiOiJqZXJlbXljaG91QGFjY29sYWRlZ2xvYmFsLm5ldCJ9fQ.biiHaWAFjED1nEib9jeT5ncO5lGTBJNjVg9T5IH6vc4"
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
