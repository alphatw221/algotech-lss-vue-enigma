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
									>
									</SearchBar>	
									<DataTable>

									</DataTable>
									

								</div>
								<button type="button" @click="append_1">aaaaaaa</button>
							</TabPanel>
							<TabPanel class="leading-relaxed"> Delisted. </TabPanel>
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
			DataTable
	},
	data() {
		return {
			searchColumns:{
				keywords: [ 
					{text: "Name", value: "name"},
					{text: "Order Code", value: "order_code"},
					{text: "Category", value: "category"},
					{text: "Description", value: "description"}
				],
			},
			columns: [
				{name: 'Image', key: 'image'},
				{name: 'Product Name', key: 'name'},
				{name: 'Order Code', key: 'order_code'},
				{name: 'Type', key: 'type'},
				{name: 'Category', key: 'category'},
				{name: 'Description', key: 'description'},
				{name: 'Quantity', key: 'qty'},
				{name: 'Price', key: 'price'},
				// {name: 'Edit', key: 'edit'},
			],
		}
	},	
	mounted() {
		this.$cookies.set("access_token", 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUzNjE3NzYzLCJpYXQiOjE2NTMwMTI5NjMsImp0aSI6IjdmZDZkNTNiNmViNzQ5NmJhZDEyN2FhYzQ1NTk3YzMzIiwidXNlcl9pZCI6ODAsImRhdGEiOnsiYXV0aF91c2VyX2lkIjo4MCwic2VsbGVyX2lkIjoyNCwiY3VzdG9tZXJfaWQiOjk3LCJuYW1lIjoiRGVyZWsgSHdhbmciLCJlbWFpbCI6ImRlcmVraHdhbmczM0BnbWFpbC5jb20ifX0.v7Rsc5TcJBsviNrEp5nQy9tMOcewvfL-03iSHii4iKY')
		
		createAxiosWithBearer().get('/api/user-subscription/buyer/list?page=1&page_size=5&search_column=shipping_email&keyword=qq').then(response => {
			console.log(response);
		}).catch(function (error) {
			console.log(error);
		})
	},
	methods: {
		append_1() {
			console.log('popoo')
			
			this.results.push({
					id: 127,
					created_by: null,
					meta: {},
					meta_logistic: {},
					tag: [],
					qty: 110,
					name: "2366",
					category: null,
					excerpt: null,
					description: "",
					content: null,
					remark: null,
					price: 4.0,
					price_ori: 0.0,
					tax: 0.0,
					currency: null,
					currency_sign: "$",
					points: 0,
					model: null,
					sku: null,
					upc: null,
					image: "",
					sort_order: 0,
					order_code: "DB",
					max_order_amount: null,
					customer_removable: false,
					customer_editable: false,
					type: "product",
					status: "enabled",
					created_at: "2022-02-25T09:26:41.585000Z",
					updated_at: "2022-02-25T09:26:41.585000Z",
					user_subscription: 1
				})
		}
	},
}


</script>

<style scoped>
    .demo-breadcrumb-separator{
        color: #ff5500;
        padding: 0 5px;
    }
</style>