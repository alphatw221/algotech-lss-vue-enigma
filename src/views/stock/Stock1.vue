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
											<button class="btn btn-primary shadow-md mr-2" @click="this.$router.push('add_product')">Add New Product</button>
										</div>
									</div>
									
								</div>
								<div 
										id="example-table"
										ref="tableRef"
										class="mt-5 table-report table-report--tabulator"
								></div>
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

<script setup>
import { ref, reactive, onMounted } from "vue";
import Tabulator from "tabulator-tables";


const tabulator = ref();

function append_1() {
	console.log('popoo')
	
	tabledata.push({id:16, name:'Margret Marmajuke', age:'16', col:'yellow', dob:'31/01/1999'})
	tabulator.value.redraw(true);
	console.log(tabledata)
}

//define some sample data
var tabledata = [
 	{id:1, name:"Oli Bob", age:"12", col:"red", dob:""},
 	{id:2, name:"Mary May", age:"1", col:"blue", dob:"14/05/1982"},
 	{id:3, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
 	{id:4, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
 	{id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
	{id:6, name:"Oli Bob", age:"12", col:"red", dob:""},
 	{id:7, name:"Mary May", age:"1", col:"blue", dob:"14/05/1982"},
 	{id:8, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
 	{id:9, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
 	{id:10, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
	{id:11, name:"Oli Bob", age:"12", col:"red", dob:""},
 	{id:12, name:"Mary May", age:"1", col:"blue", dob:"14/05/1982"},
 	{id:13, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
 	{id:14, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
 	{id:15, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
 ];

//create Tabulator on DOM element with id "example-table"

const initTabulator = () => {
  tabulator.value = new Tabulator("#example-table", {
		data: tabledata, 
		layout: "fitColumns", 
		responsiveLayout: "collapse",
		pagination: "local",
    paginationSize: 10,
    paginationSizeSelector: [5, 10, 15, 20],
    movableColumns:true,
    paginationCounter:"rows",
		columns: [ 
			{title:"Name", field:"name", width:150},
			{title:"Age", field:"age", align:"left", formatter:"progress"},
			{title:"Favourite Color", field:"col"},
			{title:"Date Of Birth", field:"dob", sorter:"date", align:"center"},
		],
		rowClick:function(e, row){ //trigger an alert message when the row is clicked
			alert("Row " + row.getData().id + " Clicked!!!!");
		},
	});
}

onMounted(() => {
  initTabulator();
});


</script>