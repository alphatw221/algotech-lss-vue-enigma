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
									
									<div class="intro-y box p-5 -mt-5">
										<div class="flex flex-col sm:flex-row sm:items-end xl:items-start">
											<form id="tabulator-html-filter-form" class="xl:flex sm:mr-auto">
												<div class="sm:flex items-center sm:mr-4">
													<label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2"
														>Field</label
													>
													<select
														id="tabulator-html-filter-field"
														class="form-select w-full sm:w-32 2xl:w-full mt-2 sm:mt-0 sm:w-auto"
													>
														<option value="name">Name</option>
														<option value="category">Category</option>
														<option value="remaining_stock">Remaining Stock</option>
													</select>
												</div>
												<div class="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
													<label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2"
														>Value</label
													>
													<input
														id="tabulator-html-filter-value"
														type="text"
														class="form-control sm:w-40 2xl:w-full mt-2 sm:mt-0"
														placeholder="Search..."
													/>
												</div>
												<div class="mt-2 xl:mt-0">
													<button
														id="tabulator-html-filter-go"
														type="button"
														class="btn btn-primary w-full sm:w-16"
													>
														Go
													</button>
													<button
														id="tabulator-html-filter-reset"
														type="button"
														class="btn btn-secondary w-full sm:w-16 mt-2 sm:mt-0 sm:ml-1"
													>
														Reset
													</button>
												</div>
											</form>
											<button class="btn btn-primary shadow-md mr-2">Add New Product</button>
										</div>
									</div>

									<table class="table table-report mt-5">
										<thead>
											<tr >
												<th class="whitespace-nowrap" v-for="column in columns" :key="column.key">
													{{ column.name }}
												</th>
											</tr>
										</thead>
										<tbody>
											<tr
												v-for="(product, key) in results"
												:key="key"
												class="intro-x"
											>	
												<td v-for="column in columns" :key="column.key">
													<template v-if="column.key === 'image'" class="w-40">
														<div class="flex">
															<div class="w-10 h-10 image-fit zoom-in">
																<Tippy
																	tag="img"
																	class="rounded-full"
																	:src="product.image"
																	:content="`Uploaded at`"
																/>
															</div>
														</div>
													</template>
													<template v-else>
														{{ product[column.key] }}
													</template>
												</td>
												<td class="table-report__action w-30">
													<div class="flex justify-center items-center">
														<a class="flex items-center mr-3" href="javascript:;">
															<CheckSquareIcon class="w-4 h-4 mr-1" /> Edit
														</a>
													</div>
												</td>
											</tr>
										</tbody>
									</table>
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
export default {
	data() {
		return {
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
			results: [
				{
					id: 123,
					created_by: null,
					meta: {},
					meta_logistic: {},
					tag: [],
					qty: 15,
					name: "2362",
					category: null,
					excerpt: null,
					description: "",
					content: null,
					remark: null,
					price: 12.0,
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
					order_code: "A2S",
					max_order_amount: null,
					customer_removable: false,
					customer_editable: false,
					type: "product",
					status: "enabled",
					created_at: "2022-02-25T09:24:09.840000Z",
					updated_at: "2022-02-25T09:24:09.840000Z",
					user_subscription: 1
				},
				{
					id: 124,
					created_by: null,
					meta: {},
					meta_logistic: {},
					tag: [],
					qty: 24,
					name: "2363",
					category: null,
					excerpt: null,
					description: "",
					content: null,
					remark: null,
					price: 8.0,
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
					order_code: "A2M",
					max_order_amount: null,
					customer_removable: false,
					customer_editable: false,
					type: "product",
					status: "enabled",
					created_at: "2022-02-25T09:24:54.512000Z",
					updated_at: "2022-02-25T09:24:54.512000Z",
					user_subscription: 1
				},
				{
					id: 125,
					created_by: null,
					meta: {},
					meta_logistic: {},
					tag: [],
					qty: 25,
					name: "2364",
					category: null,
					excerpt: null,
					description: "",
					content: null,
					remark: null,
					price: 7.0,
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
					order_code: "A2L",
					max_order_amount: null,
					customer_removable: false,
					customer_editable: false,
					type: "product",
					status: "enabled",
					created_at: "2022-02-25T09:25:39.884000Z",
					updated_at: "2022-02-25T09:25:39.884000Z",
					user_subscription: 1
				},
				{
					id: 126,
					created_by: null,
					meta: {},
					meta_logistic: {},
					tag: [],
					qty: 68,
					name: "2365",
					category: null,
					excerpt: null,
					description: "",
					content: null,
					remark: null,
					price: 35.0,
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
					order_code: "A3",
					max_order_amount: null,
					customer_removable: false,
					customer_editable: false,
					type: "product",
					status: "enabled",
					created_at: "2022-02-25T09:26:12.655000Z",
					updated_at: "2022-02-25T09:26:12.655000Z",
					user_subscription: 1
				},
				{
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
				}
			]
		}
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
			console.log(results)
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