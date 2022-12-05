<template>
	<!-- BEGIN Container -->
	<div :class="{'p-4 box': templateInModal !=true}">
		<div class="flex flex-row items-center h-fit lg:mt-3 pb-4">
			<h2 class="text-xl sm:text-2xl mx-auto sm:mx-0 font-medium -mt-2">{{$t('assign_product.assign_product')}} from</h2>
			<select 
				class="form-select ml-2 h-[35px] sm:h-[42px] w-[150px]"
				v-model="selectedStockUserSubscriptionId"
				@change="getSubscriptionStock()"
			>
				<option :value="''">{{$t(`assign_product.stock_origin.own`)}}</option>
				<option v-for="subscriptoin,index in layoutStore.userInfo.user_subscription.meta_store?.support_stock_user_subscriptions" :key="index" :value="subscriptoin.user_subscription_id">{{ subscriptoin.name }}</option>
			</select>
			<!-- <FileUploadButton 
				class="ml-auto mx-1 text-sm sm:w-40 h-[35px] sm:h-[42px] text-white btn btn-rounded text-[#ff9505] bg-[#fefce8] font-medium shadow-lg btn color-[#f59e0b] border-[#fcd34d] hover:bg-[#fef6e8] border-[2px] border-slate-100 shadow-lg"
				button_id="import_campaign_product"
				accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
				:multiple="false"
				:uploadFunction = "importCampaignProduct"
			>
			<template class="hidden sm:block"><span class="mr-1 text-lg font-bold text-[#ff9505] inline-block align-middle"><ArrowDownIcon class="" /></span> {{$t('assign_product.import')}} </template>
			<template class="block sm:hidden"> <ArrowDownIcon class="w-8 h-8" /> </template>
			</FileUploadButton> -->
		</div>
		
		


		<!-- BEGIN SearchPage -->
		<div v-show="openTab=='select'">
			<!-- BEGIN SearchBar -->
			<div class="flex flex-wrap justify-start gap-3 w-[100%] text-[13px] sm:text-[16px]">
				<div class="flex-2 flex flex-wrap items-center" >
					<label class="w-fit mr-1 sm:mr-2 text-[13px] sm:text-[16px]">
						{{$t('assign_product.search_bar.category')}}
					</label>
					<select 
						class="form-select min-w-fit h-[35px] sm:h-[42px] lg:max-w-xl"
						v-model="selectedCategory"
						@change="filterProducts()"
					>
						<option :value="''">{{$t(`assign_product.search_bar.all`)}}</option>
						<option v-for="product_category,index in layoutStore.userInfo.user_subscription.product_categories" :key="index" :value="product_category.id">{{ product_category.name }}</option>
					</select>
				</div>
				<!-- <div class="flex-2 flex-wrap flex items-center flex-col w-fit" >
					<label class="mr-auto whitespace-wrap sm:whitespace-nowrap text-[13px] sm:text-[16px]">
						{{$t('assign_product.search_bar.search_by')}}
					</label>
					<select
						class="form-select w-fit mr-0 h-[35px] sm:h-[42px] lg:max-w-xl" v-model="searchField">
						<option v-for="searchColumn in searchColumns" :key="searchColumn.value"
							:value="searchColumn.value">
							{{$t(`assign_product.search_bar.search_options.${searchColumn.value}`)}}
						</option>
					</select>
				</div> -->
				<div class="flex-1 items-center input-group mr-auto min-w-[100px] mt-auto">
					<div class="relative"> 
						<input type="text"
							class="form-control input-group min-w-fit mr-0 h-[35px] sm:h-[42px] lg:max-w-xl mt-auto" :placeholder="$t('assign_product.search_bar.search_bar_place_holder')"
							v-model="searchKeyword" @keydown.enter.prevent="filterProducts()" 
						/>
						<SearchIcon class="absolute w-7 h-7 top-1 sm:top-2 right-4 z-10 text-slate-600" @click="filterProducts()"/>
					</div>
					<XIcon 
						v-if="searchKeyword"
						class="flex-none w-7 h-7 mt-2 text-slate-600" @click="resetSearchBar()"
					/>
					
					<!-- <button 
						type="button"
						class="flex-none w-16 h-[35px] sm:h-[42px] rounded-l-none btn btn-secondary mt-auto" @click="resetSearchBar()">
						{{$t('assign_product.search_bar.reset')}}
					</button> -->
				</div>
				<FileUploadButton 
					class="mt-auto mx-1 text-sm sm:w-40 h-[35px] sm:h-[42px] text-white btn btn-rounded text-[#ff9505] bg-[#fefce8] font-medium shadow-lg btn color-[#f59e0b] border-[#fcd34d] hover:bg-[#fef6e8] border-[2px] border-slate-100 shadow-lg"
					button_id="import_campaign_product"
					accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
					:multiple="false"
					:uploadFunction = "importCampaignProduct"
				>
				<template class="hidden sm:block"><span class="mr-1 text-lg font-bold text-[#ff9505] inline-block align-middle"><ArrowDownIcon class="" /></span> {{$t('assign_product.import')}} </template>
				<template class="block sm:hidden"> <ArrowDownIcon class="w-8 h-8" /> </template>
				</FileUploadButton>
			</div>   
			<!-- END SearchBar -->


			<!-- BEGIN ProductTable -->
			<div class="relative"> 
				<div class="sm:overflow-auto sm:h-[65vh] text-[14px] mt-5">
					<table class="table table-report -mt-3">
						<thead>
							<tr>
								<th class="w-10 text-center">
									<input class="form-control form-check-input w-[1.2rem] h-[1.2rem] sm:mr-1 my-auto" type="checkbox" v-model="selectAll" @change="selectAllStockProduct($event)"/>
								</th>
								<th 
									class="whitespace-normal truncate hover:text-clip text-center" 
									v-for="column in tableColumns" :key="column.key">

									{{$t(`assign_product.product_table.${column.key}`)}}
									<!-- <input v-if="column.key=='oversell'" class="form-control form-check-input w-[1.2rem] h-[1.2rem] sm:mr-1 my-auto" type="checkbox" v-model="allProductOversellEnable" @change="selectAllStockProduct($event)"/>
									<input v-else-if="column.key=='customer_editable'" class="form-control form-check-input w-[1.2rem] h-[1.2rem] sm:mr-1 my-auto" type="checkbox" v-model="allProductEditable" @change="selectAllStockProduct($event)"/>
									<input v-else-if="column.key=='customer_removable'" class="form-control form-check-input w-[1.2rem] h-[1.2rem] sm:mr-1 my-auto" type="checkbox" v-model="allProductRemovable" @change="selectAllStockProduct($event)"/> -->
								</th>
							</tr>
						</thead>
						<tbody>
							<tr
								v-for="(product, product_index) in stockProducts"
								:key="product_index"
								class="intro-x align-middle"
							>
								<td class="w-10">
									<input class="form-control form-check-input w-[1.2rem] h-[1.2rem] sm:mr-1 my-auto selectCheck" 
										type="checkbox" v-model="product.check" @click="clickStockProductCheckbox(product, $event)"/>
								</td>

								<template v-for="column in tableColumns" :key="column.key" class="text-[14px]">

									<td v-if="column.key === 'image'" >
										<div class="flex items-center justify-center imgtd">
											<div class="w-[90px] h-[90px] image-fit zoom-in md:w-14 md:h-14 place-items-center">
												<img class="rounded-lg cursor-auto" 
													:class="{'checked': product.check }" 
													:src="product.image ? product.image : `${staticDir}no_image.jpeg`" />
											</div>
										</div>
									</td>

									<td v-else-if="column.key === 'order_code'" class="orderCode text-right" 
										:data-content="$t(`assign_product.product_table.${column.key}`)"
										>
										<div class="place-content-end w-full md:w-24 lg:place-content-center" v-if="product.type=='product'">
											<input class="form-control w-[100%] text-right " type="text" v-model="product[column.key]" @input="selectStockProduct(product, $event)" />
										</div>
										<div v-else class="text-center dashInput">-</div>
									</td>

									<!-- <td v-else-if="column.key === 'category'" 
										class="category"
										:data-content="$t(`assign_product.product_table.${column.key}`)"
										>
										<div v-for="(tag,tag_index) in product['tag']" :key="tag_index"
										class="flex flex-col justify-center content-center"
										>{{ tag }}</div> 
									</td> -->
									<td v-else-if="column.key === 'categories'" class="category" :data-content="$t(`assign_product.product_table.${column.key}`)">
										<div v-for="(productCategoryID,productCategoryIndex) in product[column.key]" :key="productCategoryIndex">{{ (layoutStore.userInfo?.user_subscription?.product_categories?.find(productCategory=>productCategory.id.toString()==productCategoryID))?.name }}</div> 
									</td>

									<td v-else-if="column.key === 'qty'"
										class="qty"
										:data-content="$t(`assign_product.product_table.${column.key}`)">
										<div class="flex flex-col place-content-end w-full md:w-16 text-right">
											<label class=" w-full"   >{{product[column.key]}}</label>
										</div>
									</td>

									<td v-else-if="column.key === 'assign_qty'" class="assign_qty" 
										:data-content="$t(`assign_product.product_table.${column.key}`)">
										<div class="place-content-end relative w-full md:w-24 lg:place-content-center">

											
											<input class="form-control w-full text-right" min="1" type="number" v-model="product[column.key]" />
										</div>
									</td>

									<td v-else-if="column.key === 'max_order_amount'"
										class="maxqty"
										:data-content="$t(`assign_product.product_table.${column.key}`)">
										<div class="flex flex-col place-content-end w-full md:w-24 " v-if="product.type=='product'">
											<input class="form-control w-full text-right" min="1" type="number" v-model="product[column.key]"/>
										</div>
										<div v-else class="text-center dashInput">-</div>
									</td>

									<td v-else-if="column.key === 'type' && props.productType === 'lucky_draw'" class="luckyType" :data-content="$t(`assign_product.product_table.${column.key}`)">
										<span>{{$t(`assign_product.product_table.types.${product[column.key]}`)}}</span>
									</td>
									<td v-else-if="column.key === 'type'" class="type" :data-content="$t(`assign_product.product_table.${column.key}`)">
										<select
											class="form-select w-auto mt-0 "
											v-model="product[column.key]"
										>
											<option v-for="(type, index) in product_type" :key="index" :value="type.value">{{$t(`assign_product.product_table.types.${type.value}`)}}</option>
										</select> 
									</td> 

									<td v-else-if="column.key === 'oversell' " class="editable" :data-content="$t(`assign_product.product_table.${column.key}`)">
										<div class="md:min-w-[40px] sm:text-center">
											<input class="form-control form-check-input w-[1.2rem] h-[1.2rem] sm:mr-1 my-auto" type="checkbox" v-model="product[column.key]" v-if="product.type=='product'"/>
											<div v-else class="text-center dash">-</div>
										</div>
									</td>

									<td v-else-if="column.key === 'customer_editable' " class="editable" :data-content="$t(`assign_product.product_table.${column.key}`)">
										<div class="md:min-w-[40px] sm:text-center">
											<input class="form-control form-check-input w-[1.2rem] h-[1.2rem] sm:mr-1 my-auto" type="checkbox" v-model="product[column.key]" @click="stockProductEditable(product_index, $event)" v-if="product.type=='product'"/>
											<div v-else class="text-center dash">-</div>
										</div>
									</td>

									<td v-else-if=" column.key === 'customer_removable' " class="removable" :data-content="$t(`assign_product.product_table.${column.key}`)">
										<div class="md:min-w-[40px] sm:text-center"> 
											<input class="form-control form-check-input w-[1.2rem] h-[1.2rem] sm:mr-1 my-auto" type="checkbox" v-model="product[column.key]" @click="stockProductRemovable(product_index, $event)" v-if="product.type=='product'"/>
											<div v-else class="text-center dash">-</div>
										</div>
									</td>

									<td v-else-if="column.key === 'price'" class="price" :data-content="$t(`assign_product.product_table.${column.key}`)">
										<!-- <div class="w-full lg:w-fit lg:text-sm whitespace-nowrap"> ${{product[column.key]}} </div> -->
										<div class="flex place-content-end relative w-full p-0 md:w-32 lg:place-content-center">
											<span class="my-auto mr-1 text-[12px]" v-if="campaignDetailStore.campaign"> {{campaignDetailStore.campaign.currency}} </span> 
											<input class="form-control w-[100%] text-right p-0" min="1" type="number" v-model="product[column.key]" />
											<span class="my-auto mr-1 text-[12px]" v-if="campaignDetailStore.campaign"> {{campaignDetailStore.campaign.price_unit?$t(`global.price_unit.${campaignDetailStore.campaign.price_unit}`):''}} </span>
										</div>
									</td>

									<td v-else-if="column.key === 'name'" class="name text-[16px] w-full h-fit lg:w-24 lg:text-sm content-center items-center longMessage">
										{{product[column.key]}}
									</td>
									<!-- <td v-else class="noTd"> </td> -->
								</template>
							</tr>
						</tbody>
					</table> 
					
					
				</div>
				<div class="intro-y flex flex-row flex-wrap sm:flex-nowrap items-center justify-between">
					<Page 
						class="mx-auto my-3" 
						:total="dataCount"
						:page-size="pageSize"
						show-sizer :page-size-opts="[10,20,50,100]" 
						@on-change="changePage"
						@on-page-size-change="changePageSize"
					/>
					
				</div> 
				<div class="flex items-center justify-end my-5 mb-14">
					<button v-if="route.name == 'assign-product'" type="button" class="btn btn-secondary inline-flex w-20 md:w-32 shadow-md ml-auto mr-1 md:mr-5" @click="router.push({name: 'campaign-list'})">{{$t('assign_product.skip')}}</button>
					<button type="button" class="btn btn-primary inline-flex w-20 md:w-32 shadow-md mr-1 md:mr-5" @click="openTab='confirm'">{{$t('assign_product.add')}}</button>
				</div> 
			</div>
			<!-- END ProductTable -->
		</div>
		<!-- END SearchPage -->

	<!-- BEGIN ConfirmPage -->
		<div v-show="openTab=='confirm'">
			<div class="text-left text-[16px]"> 
				{{$t('assign_product.confirm_select_product')}}
			</div>
			<div class="relative"> 
				<div class="sm:overflow-auto sm:h-[72vh] text-[14px] mt-5">
					<table class="table table-report -mt-3">
						<thead>
							<tr>
								<th class="w-10"></th>
								<th 
									class="whitespace-normal truncate hover:text-clip text-center" 
									v-for="column in tableColumns" :key="column.key">
									{{$t(`assign_product.product_table.${column.key}`)}}
								</th>
							</tr>
						</thead>
						<tbody>
							<tr
								v-for="(product, product_index) in selectedProducts"
								:key="product_index"
								class="intro-x align-middle"
							>
								<td class="w-10">
									<input class="form-control form-check-input w-[1.2rem] h-[1.2rem] sm:mr-1 my-auto selectCheck" type="checkbox" checked @click="clickSelectedProductCheckbox(product, product_index, $event)"/>
								</td>
								<template v-for="column in tableColumns" :key="column.key" class="text-[14px]">

									<td v-if="column.key === 'image'">
										<div class="flex items-center justify-center">
											<div class="w-[90px] h-[90px] image-fit zoom-in md:w-14 md:h-14 place-items-center">
												<img class="rounded-lg cursor-auto"
													:src="product.image ? product.image : `${staticDir}no_image.jpeg`" />
											</div>
										</div>
									</td>

									<td v-else-if="column.key === 'order_code' " class="orderCode" :data-content="$t(`assign_product.product_table.${column.key}`)"
										:class="{' h-12' : errorMessages[product_index][column.key] }" >
										<div class="relative place-content-end w-full md:w-24 lg:place-content-center" v-if="product.type=='product'">
											<input class="form-control w-[100%] text-right" type="text" v-model="product[column.key]" />
											<div class="text-danger absolute z-10 -bottom-5 right-0 sm:right-auto sm:left-0 whitespace-nowrap z-10" v-if="errorMessages[product_index] && errorMessages[product_index][column.key]">{{  $t(`assign_product.product_table.errors.${errorMessages[product_index][column.key]}`)}}</div>
										</div>
										<div v-else class="text-center dashInput">-</div>
									</td>

									<td v-else-if="column.key === 'categories'" class="category" :data-content="$t(`assign_product.product_table.${column.key}`)">
										<div v-for="(productCategoryID,productCategoryIndex) in product[column.key]" :key="productCategoryIndex">{{ (layoutStore.userInfo?.user_subscription?.product_categories?.find(productCategory=>productCategory.id.toString()==productCategoryID))?.name }}</div> 
									</td>

									<td v-else-if="column.key === 'qty'" class="qty" :data-content="$t(`assign_product.product_table.${column.key}`)">
										<div class="place-content-end relative w-full md:w-14 lg:place-content-center text-right">
											<label class="w-full" >{{product[column.key]}}</label>
										</div>
									</td>

									<td v-else-if="column.key === 'assign_qty'" class="assign_qty" :data-content="$t(`assign_product.product_table.${column.key}`)"
										:class="{' h-12' : errorMessages[product_index][column.key] }">
										<div class="place-content-end relative w-full md:w-24 lg:place-content-center">

											<input class="form-control w-full text-right" min="1" type="number" v-model="product[column.key]" />
											<div class="text-danger absolute z-10 -bottom-5 right-0 sm:right-auto sm:left-0 whitespace-nowrap z-10" v-if="errorMessages[product_index]&& errorMessages[product_index][column.key]">{{  $t(`assign_product.product_table.errors.${errorMessages[product_index][column.key]}`)}}</div>
										</div>
									</td>

									<td v-else-if="column.key === 'max_order_amount'" class="maxqty" :data-content="$t(`assign_product.product_table.${column.key}`)"
										:class="{' h-12' : errorMessages[product_index][column.key] }">
										<div class="place-content-end relative w-full md:w-24 lg:place-content-center" v-if="product.type=='product'">
											<input class="form-control w-[100%] text-right" min="1" type="number" v-model="product[column.key]" />
											<div class="text-danger absolute z-10 -bottom-5 right-0 sm:right-auto sm:left-0 whitespace-nowrap z-10" v-if="errorMessages[product_index]&& errorMessages[product_index][column.key]">{{  $t(`assign_product.product_table.errors.${errorMessages[product_index][column.key]}`)}}</div>
										</div>
										<div v-else class="text-center dashInput">-</div>
										
									</td>

									<td v-else-if="column.key === 'type' && props.productType === 'lucky_draw'" class="luckyType" :data-content="$t(`assign_product.product_table.${column.key}`)">
										<span>{{$t(`assign_product.product_table.types.${product[column.key]}`)}}</span>
									</td>

									<td v-else-if="column.key === 'type'" class="type" :data-content="$t(`assign_product.product_table.${column.key}`)"
										:class="{' h-12' : errorMessages[product_index][column.key] }" >
										<div class="place-content-end relative w-full md:w-24 lg:place-content-center">
											<select
												class="form-select w-[100%]"
												v-model="product[column.key]"
											>
												<option v-for="(type, index) in product_type" :key="index" :value="type.value">{{$t(`assign_product.product_table.types.${type.value}`)}}</option>
											</select> 
											<div class="text-danger absolute z-10 -bottom-5 right-0 sm:right-auto sm:left-0 whitespace-nowrap z-10" v-if="errorMessages[product_index]&& errorMessages[product_index][column.key]">{{  $t(`assign_product.product_table.errors.${errorMessages[product_index][column.key]}`)}}</div>
										</div>
									</td> 
									<td v-else-if=" column.key === 'oversell'  " class="removable" :data-content="$t(`assign_product.product_table.${column.key}`)">
										<div class="md:min-w-[40px] sm:text-center"> 
											<input class="form-control form-check-input w-[1.2rem] h-[1.2rem] my-auto" type="checkbox" v-model="product[column.key]" v-if="product.type=='product' "/>
											<div v-else class="w-[1.2rem] h-[1.2rem] dash sm:mx-auto">-</div>
										</div>
									</td>
									
									<td v-else-if="column.key === 'customer_editable' " class="editable" :data-content="$t(`assign_product.product_table.${column.key}`)">
										<div class="md:min-w-[40px] sm:text-center"> 
											<input class="form-control form-check-input w-[1.2rem] h-[1.2rem] my-auto" type="checkbox" v-model="product[column.key]" @click="selectedProductEditable(product_index, $event)" v-if="product.type=='product'" />
											<div v-else class="w-[1.2rem] h-[1.2rem] dash mx-auto">-</div>
										</div>
									</td>

									<td v-else-if=" column.key === 'customer_removable'  " class="removable" :data-content="$t(`assign_product.product_table.${column.key}`)">
										<div class="md:min-w-[40px] sm:text-center"> 
											<input class="form-control form-check-input w-[1.2rem] h-[1.2rem] my-auto" type="checkbox" v-model="product[column.key]" @click="selectedProductRemovable(product_index, $event)" v-if="product.type=='product' "/>
											<div v-else class="w-[1.2rem] h-[1.2rem] dash sm:mx-auto">-</div>
										</div>
									</td>

									<td v-else-if="column.key === 'price'" class="price" :data-content="$t(`assign_product.product_table.${column.key}`)"
										:class="{' h-12' : errorMessages[product_index][column.key] }"  >
										<!-- <div class="w-full lg:w-fit lg:text-sm whitespace-nowrap"> ${{product[column.key]}} </div> -->
										<div class="flex place-content-end relative w-full md:w-32 lg:place-content-center">
											<span class="my-auto mr-1 text-[12px]" v-if="campaignDetailStore.campaign"> {{campaignDetailStore.campaign.currency}} </span> 
											<input class="form-control w-[100%] text-right p-0" min="1" type="number" v-model="product[column.key]" />
											<span class="my-auto mr-1 text-[12px]" v-if="campaignDetailStore.campaign"> {{campaignDetailStore.campaign.price_unit?$t(`global.price_unit.${campaignDetailStore.campaign.price_unit}`):''}} </span>
											<div class="text-danger absolute z-10 -bottom-5 right-0 sm:right-auto sm:left-0 whitespace-nowrap z-10" v-if="errorMessages[product_index]&& errorMessages[product_index][column.key]">{{  $t(`assign_product.product_table.errors.${errorMessages[product_index][column.key]}`)}}</div>
										</div>
									</td>

									<td v-else-if="column.key === 'name'" class="name">
										<div class="relative text-[16px] w-full lg:w-24 lg:text-sm  content-center items-center longMessage"> {{product[column.key]}} </div>
										<div class="text-danger text-danger absolute -bottom-5" v-if="errorMessages[product_index]&& errorMessages[product_index][column.key]">{{  $t(`assign_product.product_table.errors.${errorMessages[product_index][column.key]}`)}}</div>
									</td>
									<!-- <td v-else class="noTd"> </td> -->
								</template>
							</tr>
						</tbody>
					</table> 
				</div>
				<div class="flex flex-wrap items-center justify-between mt-5 mb-20">
					<button type="button" class="btn btn-primary inline-flex w-24 md:w-32 shadow-md ml-1 md:ml-5 whitespace-nowrap" @click="openTab='select'">{{$t(`assign_product.add_more`)}}</button>
					<button type="button" class="btn w-20 md:w-32 inline-flex dark:border-darkmode-400 ml-auto" @click="resetSelectedProduct()">{{$t(`assign_product.reset`)}}</button>
					<button type="button" class="btn btn-primary inline-flex w-20 md:w-32 shadow-md mx-1 md:mx-5" @click="submitData()">{{$t(`assign_product.confirm`)}}</button>
				</div> 
			</div>
		</div>
		<!-- END ConfirmPage -->
	</div>
	<!-- END Container -->

</template>

<script setup>
import { seller_bulk_create_campaign_products, seller_import_campaign_product } from "@/api_v2/campaign_product"
import { search_product } from '@/api_v2/product';
import { get_campaign_product_order_code_dict, retrieve_campaign } from '@/api_v2/campaign';

import { useRoute, useRouter } from "vue-router";
import { computed, onMounted, ref, watch, onUnmounted, getCurrentInstance, defineProps, reactive} from "vue";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import i18n from "@/locales/i18n"
import { useCampaignDetailStore } from "@/stores/lss-campaign-detail";
import FileUploadButton from "@/components/file-upload-button/Main.vue"

const campaignDetailStore = useCampaignDetailStore()


const props = defineProps({
    productType: String,
	templateInModal:Boolean,
})

const tableColumns = ref([
    { name: "Product", key: "image" },
    { name: "", key: "name" },
    { name: "Type", key: "type" },
    { name: "Order Code", key: "order_code" },
	{ name: "Stock QTY", key: "qty" },
	{ name: "QTY for Campaign", key: "assign_qty" },
	{ name: "Max QTY/Order", key: "max_order_amount" },
    { name: "Price", key: "price" },
	{ name: "Oversell", key: "oversell" },
	{ name: "Editable", key: "customer_editable" },
	{ name: "Deletable", key: "customer_removable" },
	{ name: "Category", key: "categories" },
	
])


const layoutStore = useLSSSellerLayoutStore();


const route = useRoute();
const router = useRouter();

const openTab = ref('select')
const currentPage = ref(1)
const pageSize = ref(50)
const totalPage = ref(1)
const dataCount = ref(0)

const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;

const staticDir = import.meta.env.VITE_GOOGLE_STORAGE_STATIC_DIR
const selectedStockUserSubscriptionId = ref('')
const selectedCategory = ref('')
const searchField = ref('name')
const searchKeyword = ref('')
const productCategories = ref([{value:'', name:'All'}])

const product_type = [{value:'product',name:'Product'},{value:'lucky_draw',name:'Lucky Draw'}]

const searchColumns = [
	{ text: "Name", value: "name" },
	// { text: "Order Code", value: "order_code" },
	{ text: "Description", value: "description" }
]

const stockProducts = ref([])
const selectedProducts = ref([])
const errorMessages = ref([])
const selectedProductDict = ref({})
const selectAll = ref(false)
const allProductRemovable = ref(false)
const allProductEditable = ref(false)
const allProductOversellEnable = ref(false)

const campaignProductOrderCodeDict = ref({})

let isSelectedProductsValid=false

onMounted(() => {
	if(props.templateInModal){
		eventBus.on('show_assign_product_view',()=>{getCampaignProductDict();search();})
		eventBus.on('hide_assign_product_view',()=>{clearAllData();})
		return
	}
	getCampaignProductDict()
	getCampaignDetail()
	search()
})

onUnmounted(()=>{
	eventBus.off('show_assign_product_view')
	eventBus.off('hide_assign_product_view')
})

const getCampaignProductDict=()=>{get_campaign_product_order_code_dict(route.params.campaign_id, layoutStore.alert).then(res=>{campaignProductOrderCodeDict.value = res.data})}

const updateStockProducts = ()=>{
    stockProducts.value.forEach((product,stockProductIndex) => {
        if(product.id.toString() in selectedProductDict.value){ 
            const index = selectedProductDict.value[product.id.toString()]
            stockProducts.value[stockProductIndex] = selectedProducts.value[index]
			product.check=true
        }else{
            product.check=false
        }
    });
}


const checkIfValid = ()=>{
    isSelectedProductsValid = true
	const orderCodeDict = JSON.parse(JSON.stringify(campaignProductOrderCodeDict.value))
    selectedProducts.value.forEach((selectedProduct,index) => {
        errorMessages.value[index]={}	
		// console.log(orderCodeDict)
		//type
		if(!(['product', 'lucky_draw'].includes(selectedProduct.type))){errorMessages.value[index]['type']='type_required';isSelectedProductsValid=false;}

		//order_code
		if(selectedProduct.type=='product' && ['',null,undefined,' '].includes(selectedProduct.order_code) ) {errorMessages.value[index]['order_code']='order_code_required';isSelectedProductsValid=false;}
        else if(selectedProduct.type=='product' && typeof selectedProduct.order_code =='string' && selectedProduct.order_code.toLowerCase() in orderCodeDict) {
			if(typeof orderCodeDict[selectedProduct.order_code.toLowerCase()] == 'number') {
				errorMessages.value[orderCodeDict[selectedProduct.order_code.toLowerCase()]]['order_code']='order_code_duplicate'
			}
			errorMessages.value[index]['order_code']='order_code_duplicate';
			isSelectedProductsValid=false;
		}
		//assign_qty
		if([null,undefined,''].includes(selectedProduct.assign_qty)){errorMessages.value[index]['assign_qty']='assign_qty_required';isSelectedProductsValid=false; }
		else if((typeof selectedProduct.assign_qty)!='number'){errorMessages.value[index]['assign_qty']='qty_invalid';isSelectedProductsValid=false; }
		else if(!(Number.isInteger(selectedProduct.assign_qty))){errorMessages.value[index]['assign_qty']='qty_invalid';isSelectedProductsValid=false; }
		else if(selectedProduct.assign_qty<=0) {errorMessages.value[index]['assign_qty']='qty_invalid';isSelectedProductsValid=false; }

		//max_order_amount	
		else if([null,undefined,''].includes(selectedProduct.max_order_amount)){ /*pass*/}	
		else if((typeof selectedProduct.max_order_amount) != 'number'){errorMessages.value[index]['max_order_amount']='qty_invalid';isSelectedProductsValid=false; }
		else if(!(Number.isInteger(selectedProduct.max_order_amount))){errorMessages.value[index]['max_order_amount']='qty_invalid';isSelectedProductsValid=false; }
		else if(selectedProduct.type=='product' && selectedProduct.max_order_amount<0) {errorMessages.value[index]['max_order_amount']='qty_invalid';isSelectedProductsValid=false; }
        else if(selectedProduct.type=='product' && selectedProduct.max_order_amount>selectedProduct.assign_qty) {errorMessages.value[index]['max_order_amount']='max_order_amount_grater_than_qty';isSelectedProductsValid=false;}
		
		//price
		if(isNaN(parseFloat(selectedProduct.price)) || selectedProduct.price<0){errorMessages.value[index]['price']='price_invalid';isSelectedProductsValid=false;}

		//update orderCodeDict
		if(typeof selectedProduct.order_code=='string' && selectedProduct.type=='product'){
			orderCodeDict[selectedProduct.order_code.toLowerCase()]=index
		}
        // console.log(orderCodeDict)
    });

}


watch(computed(()=>stockProducts.value),updateStockProducts)

watch(computed(()=>selectedProducts.value),checkIfValid,{deep:true})

const checkSelectAll = () => {
	let unchecked_list = stockProducts.value.filter(e=>e.check === false)
	if (unchecked_list.length) {
		selectAll.value = false;
	} else {
		selectAll.value = true;
	}
}

watch(computed(()=>stockProducts.value),checkSelectAll,{deep:true})



const stockProductRemovable = (product_index, event)=>{if(event.target.checked)stockProducts.value[product_index].customer_editable=true}
const stockProductEditable = (product_index, event)=>{if(!event.target.checked)stockProducts.value[product_index].customer_removable=false}

const selectedProductRemovable = (product_index, event)=>{if(event.target.checked)selectedProducts.value[product_index].customer_editable=true}
const selectedProductEditable = (product_index, event)=>{if(!event.target.checked)selectedProducts.value[product_index].customer_removable=false}

const updateSelectedProductDict = ()=>{
	
    selectedProductDict.value = {}
    selectedProducts.value.forEach((selectedProduct,index)=>{
		selectedProductDict.value[selectedProduct.id.toString()]=index
		})
	console.log('updateSelectedProductDict')
	console.log(selectedProductDict.value)
}

const selectStockProduct = (stockProduct) =>{
	console.log('selectStockProduct')
    if(!(stockProduct.id.toString() in selectedProductDict.value)){
		stockProduct.check = true
        errorMessages.value.push({})
        selectedProducts.value.push( stockProduct )
        selectedProductDict.value[stockProduct.id.toString()]=selectedProducts.value.length-1   //cache index
    }
}

const clickStockProductCheckbox = (stockProduct, event) =>{
	console.log('clickStockProductCheckbox')
	console.log(event.target.checked)
    if(event.target.checked && !(stockProduct.id.toString() in selectedProductDict.value)){
        errorMessages.value.push({})
        selectedProducts.value.push( stockProduct )
        selectedProductDict.value[stockProduct.id.toString()]=selectedProducts.value.length-1   //cache index
    }
	else if(!(event.target.checked) && stockProduct.id.toString() in selectedProductDict.value){
        const _index = selectedProductDict.value[stockProduct.id.toString()]
        selectedProducts.value.splice(_index,1)
        errorMessages.value.splice(_index,1)
        updateSelectedProductDict()
    }
}

const clickSelectedProductCheckbox = (selectedProduct ,selectedProductIndex, event) =>{
	event.target.checked=true
	selectedProducts.value.splice(selectedProductIndex,1)
	errorMessages.value.splice(selectedProductIndex,1)

    updateSelectedProductDict()
    updateStockProducts()
}

const resetSelectedProduct = ()=>{
	selectedProducts.value.forEach(product => {
		delete selectedProductDict.value[product.id.toString()]
	});
	selectedProducts.value = []
	errorMessages.value = []
    updateStockProducts()
    openTab.value='select'
}

const selectAllStockProduct = (event)=>{
	
	if (selectAll.value) {
		stockProducts.value.forEach(product => {
			if(!(product.id.toString() in selectedProductDict.value)) {
				product.check=true
				// product.customer_editable=true
				// product.customer_removable=true
				// product.oversell=true
				selectedProducts.value.push(product)
				selectedProductDict.value[product.id.toString()]=selectedProducts.value.length-1
				errorMessages.value.push({})
			}
		});
	} else {
		stockProducts.value.forEach(product => {
			if((product.id.toString() in selectedProductDict.value)) {
				product.check=false
				// product.customer_editable=false
				// product.customer_removable=false
				// product.oversell=false
				const _index = selectedProductDict.value[product.id.toString()]
				// console.log(_index)
				selectedProducts.value.splice(_index,1)
				errorMessages.value.splice(_index,1)
				updateSelectedProductDict()
			}
		});
	}
	
    openTab.value='select'
}

const filterProducts = ()=>{
	currentPage.value = 1
	search()
}

const search = () => {
	console.log('selectedProductDict')
	console.log(selectedProductDict.value)
	var _support_stock_user_subscription_id, _pageSize, _currentPage, _searchColumn, _keyword, _productStatus, _productType, _category, _exclude, _sortBy, _toastify;
	search_product(
		_support_stock_user_subscription_id=selectedStockUserSubscriptionId.value,
		_pageSize=pageSize.value,
		_currentPage=currentPage.value, 
		_searchColumn=searchField.value, 
		_keyword=searchKeyword.value, 
		_productStatus='enabled', 
		_productType=props.productType, 
		_category=selectedCategory.value, 
		_exclude='', 
		_sortBy='',
		_toastify=layoutStore.alert)
	.then(response => {
		// console.log('data_count')
		// console.log(response.data.count)
		dataCount.value = response.data.count;
		// if (response.data.count != undefined) {
        //   dataCount.value = response.data.count;
        //   const _totalPage = Math.ceil(response.data.count / pageSize.value);
        //   totalPage.value = _totalPage == 0 ? 1 : _totalPage;
		//   console.log('totalPage')
		// 	console.log(totalPage.value)
		// 	totalPage.value = 3
        // }
		stockProducts.value = response.data.results
		// console.log(stockProducts.value = response.data.results)
		// proudct default value
		stockProducts.value.forEach(product => {
			if (!(product.id.toString() in selectedProductDict.value)){
				product.type = ['', null, undefined].includes(product.type) ? 'product' : product.type
				product.oversell = false
				product.assign_qty = product.qty
				product.customer_editable = true
				product.customer_removable = false
			}
			
		});
	})
}

const resetSearchBar = ()=>{
	console.log(stockProducts.value)
	console.log(selectedProductDict.value)
    selectedCategory.value=''
    searchField.value='name'
    searchKeyword.value = ''
	currentPage.value = 1
    search()
}

const changePage = (page) => {
	currentPage.value = page
	search()
}


const changePageSize = (page_size)=>{
	pageSize.value = page_size;
	search();
}

const submitData = ()=>{
    if(!isSelectedProductsValid){
        layoutStore.alert.showMessageToast(i18n.global.t('assign_product.invalid'))
        return
    }
	console.log(selectedProducts.value)
	seller_bulk_create_campaign_products(route.params.campaign_id, selectedStockUserSubscriptionId.value, selectedProducts.value, layoutStore.alert).then(res=>{
		if(props.templateInModal){
			campaignDetailStore.campaignProducts = res.data
			
			campaignDetailStore.campaignProductDict = {}
			res.data.forEach(campaignProduct => {
				campaignDetailStore.campaignProductDict[campaignProduct.id.toString()]=campaignProduct
			});
			clearAllData()
		}else{
			router.push({name:"campaign-list",})
		}
	}).catch(err=>{
		errorMessages.value = []
        // console.log(err.response.data)
		if (err.response){

			errorMessages.value = err.response.data.errors
		}
	})
}
const getCampaignDetail = ()=>{
	retrieve_campaign(route.params.campaign_id, layoutStore.alert).then(res=>{
		campaignDetailStore.campaign = res.data
	}) 
}


const clearAllData = ()=>{
	selectAll.value = false
    selectedCategory.value=''
    selectedProducts.value=[]
    errorMessages.value=[]
    stockProducts.value=[]
    selectedProductDict.value = {}
    openTab.value = 'select'
    currentPage.value = 1
    pageSize.value=50
    dataCount.value =0
	totalPage.value = 1
	campaignProductOrderCodeDict.value = {}
	isSelectedProductsValid = false
	campaignDetailStore.showAddProductFromStockModal = false
}

const importCampaignProduct = file =>{
    let formData = new FormData()
	formData.append('file', file)
    seller_import_campaign_product(route.params.campaign_id, formData, layoutStore.alert).then(res=>{


		if(route.name=='assign-product'){
			router.push({name:"edit-campaign-product", params:{"campaign_id":route.params.campaign_id}})
		}else{
			router.go()
		}
		
    })
}

const getSubscriptionStock = () => {
	currentPage.value = 1
	search()
	console.log(selectedStockUserSubscriptionId.value)
}
</script>


<style scoped>
.click-icon:hover {
    cursor: pointer;
}

td {
  min-height: 50px;
  border-collapse: collapse;
  padding-right: 10px !important;
  padding-left: 10px !important;
}

thead th{ 
  position: sticky !important; 
  top: 0 !important;
  z-index: 50;
  background-color: theme("colors.secondary");
  padding-right: 10px !important;
  padding-left: 10px !important;
}

.longMessage {
    overflow-wrap: break-word;
}

.checkboxWord {
    display: none;
}
.form-check-input {
    border-color: rgb(128, 128, 128) !important;
}

@media only screen and (max-width: 760px),
(min-device-width: 769px) and (max-device-width: 769px) {

    table,
    thead,
    tbody,
    th,
    td,
    tr {
        display: block;
        font-size: 16px;
        padding: 0px !important;
    }

    .form-check-input{
        width: 1.2rem !important;
        height: 1.2rem !important;
		border: 2px solid theme("colors.primary") !important;
    }
	.checked{
        border: 3px solid theme('colors.primary');
        opacity: .8;
    }

    .checkboxWord {
        display: block;
    }

    thead tr {
        position: absolute;
        top: -9999px;
        left: -9999px;
    }

    tr {
		border-bottom: 2px solid #DDDDDD;
		margin-top: 25px;
        padding-bottom: 10px !important;
	}

    td {
        min-height: 40px !important;
        border: none;
        position: relative;
        padding-left: 50% !important;
        text-align: right !important;
        box-shadow: none !important;
        font-size: 14px;
        vertical-align: middle !important;
        place-content: right !important;
		margin-top: 5px;
    }

    td:before {
        position: absolute;
        min-height: 40px;
        left: 6px;
        width: 45%;
        white-space: nowrap;
        font-weight: bold;
        box-shadow: none !important;
        background-color: white !important;
        text-align: left !important;
    }

	.dashInput{
		position: absolute;
		right: 10%;
		top: 25%;
	}
	.dash{
		position: absolute;
		right: 10%;
	}

    td:nth-of-type(1):before {
		/* checkbox  */
        display: none;
    }
    td:nth-of-type(1){
        display: inline-block;
        position: absolute;
        z-index: 10;
        left: 20%;
        width: 40px !important;
        padding-left: 0 !important;
        min-height: 25px !important;
    }
    td:nth-of-type(2):before {
        display: none;
    }

    td:nth-of-type(2){
		/* image */
        display: inline-block;
        width: 100% !important;
        padding-left: 0 !important;
        height: 90px !important;
    }

    .name:before {
        display: none;
    }

    .name{
        display: inline-block;
        text-align: center !important;
        width: 100% !important;
        padding-left: 0% !important;
		font-weight: 500;
		color: theme("colors.primary");
        font-size: 16px !important;
        min-height: 25px !important;
    }

    .orderCode:before {
        content: attr(data-content);
        top:25% !important;
    }
    .orderCode input{
        text-align:right;
    }

    .qty:before {
        content: attr(data-content);
		min-height: 25px !important;
    }
	.qty {
		min-height: 20px !important;
		padding-right: 15px !important;
	}

	.assign_qty {
		min-height: 40px !important;
	}
    .assign_qty:before {
        content: attr(data-content);
		top:25%;
    }
    .maxqty:before {
        content: attr(data-content);
        top:25% !important;
    }
    .maxqty input{
        text-align:right;
    }

    .price:before {
        content: attr(data-content);
        top:25%;
    }
    .price input{
        text-align:right;
    }

    .editable:before {
        content: attr(data-content);
        margin-top: 0px !important;
    }
    .editable{
        min-height: 20px !important;
		padding-right: 10px !important;
    }
    .removable:before {
        content: attr(data-content);
        margin-top: 0px !important;
    }
    .removable{
        min-height: 25px !important;
		padding-right: 10px !important;
    }

    .category:before {
        content: attr(data-content);
    }
	.category {
        padding-right: 10px !important;
    }
    .luckyType:before{
        content: attr(data-content);
        min-height: 35px !important;
    }
    .luckyType{
        min-height: 35px !important;
    }
    .type:before {
        content: attr(data-content);
        top:25%;
    }
	.selectCheck{
		width: 1.5rem !important;
		height: 1.5rem !important;
	}

    /* .noTd:before{
        display:none; 
    }
    .noTd{
        display:none; 
        min-height: 0 !important;
    } */
    
}
</style>