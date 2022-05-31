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
				<div class="col-start-7 ml-5">
					<button id="tabulator-html-filter-go" 
						type="button" 
						class="btn btn-primary shadow-md mt-3 col-start-1 col-span-12 xl:w-36 xl:mt-0 sm:col-start-10 2xl:w-48 2xl:col-start-11 2xl:mt-0" 
						@click="this.$router.push('/category/manager')">
						Category Manager
					</button>
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
										:filterColums="categorySelection"
									>
									</SearchBar>	
									<DataTable
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
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU0NTA2NDc0LCJpYXQiOjE2NTM5MDE2NzQsImp0aSI6IjMzZTJjNGQ2YzdhZjRhNzBiYjI1OTYxYTUxNTRmMmRlIiwidXNlcl9pZCI6NzcsImRhdGEiOnsiYXV0aF91c2VyX2lkIjo3Nywic2VsbGVyX2lkIjo5MCwiY3VzdG9tZXJfaWQiOjEwNCwibmFtZSI6IkplcmVteSBDaG91IiwiZW1haWwiOiJqZXJlbXljaG91QGFjY29sYWRlZ2xvYmFsLm5ldCJ9fQ.biiHaWAFjED1nEib9jeT5ncO5lGTBJNjVg9T5IH6vc4"
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
