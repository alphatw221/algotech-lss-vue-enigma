<template>
	<div>
		<div class="mt-10">
			
			<TabGroup class="grid grid-cols-12 gap-4">
				<div class="col-start-1 ml-5">
					<TabList class="nav-boxed-tabs flex w-full">
						<Tab class="w-full py-2 flex-1 w-24" tag="button">For Sale</Tab>
						<Tab class="w-full py-2 flex-1 w-24" tag="button">Delisted</Tab>
						<Tab class="w-full py-2 flex-1 w-24" tag="button">Sold out</Tab>
						<Tab class="w-full py-2 flex-1 w-24" tag="button">Delete</Tab>
					</TabList>
				</div>
				<div class="col-start-1 w-full lg:col-start-10 lg:ml-5 2xl:col-start-10 2xl:ml-5">
					<button id="tabulator-html-filter-go" 
						type="button" 
						class="btn btn-primary shadow-md w-48 lg:w-36 2xl:w-48" 
						@click="this.$router.push('/seller/category/manager')">
						Category Manager
					</button>
				</div>
				<div class="p-1 col-span-12 lg:p-5 2xl:p-5">
					<div>
						<TabPanels class="mt-0 lg:mt-5 2xl:mt-5">
							<TabPanel class="leading-relaxed"> 
								<div class="intro-y col-span-12 overflow-auto lg:overflow-visible">
									<SearchBar
										:searchColumns="searchColumns"
										:isAddBtn="true"
										:routerPath="'add-product'"
										:routerParam="'create'"
										:page_type="'stock'"
										:filterColums="categorySelection"
									>
									</SearchBar>	
									<DataTable
										class="overflow-x-auto"
										:requestUrl="'/api/v2/product/search'"
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
import SearchBar from "@/components/bar/SearchBar.vue";
import DataTable from "@/components/table/DataTable.vue";
import { list_category } from '@/api/stock';


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
	  categorySelection: []
    };
  },
  mounted() {
    this.$cookies.set(
      "access_token",
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU1MDkzMzAxLCJpYXQiOjE2NTQ0ODg1MDEsImp0aSI6IjI0YjNlNjQ5YWJiNjRjMzNhYzc3NjAyNDUxOTI1ZGMwIiwidXNlcl9pZCI6ODAsImRhdGEiOnsiYXV0aF91c2VyX2lkIjo4MCwic2VsbGVyX2lkIjoyNCwiY3VzdG9tZXJfaWQiOjk3LCJuYW1lIjoiRGVyZWsgSHdhbmciLCJlbWFpbCI6ImRlcmVraHdhbmczM0BnbWFpbC5jb20ifX0.6Vk1vwq5fNOipuUUBl0HE3Vmz0BD4Vs3X6Yebvl_S0c"
    );

	list_category().then(
		response => { 
			this.categorySelection = response.data 
		}
	)
  },
  methods: {},
};
</script>

<style scoped></style>
