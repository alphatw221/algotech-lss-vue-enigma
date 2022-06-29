<template>
	<div>
		<div class="intro-y flex items-center mt-8" v-if="route.params.product_id">
			<h2 class="text-lg font-medium mr-auto">Update Product</h2>
		</div>
		<div class="intro-y flex items-center mt-8" v-else>
			<h2 class="text-lg font-medium mr-auto">Add New Product</h2>
		</div>
		
		<div class="intro-y grid grid-cols-12 gap-4 box p-5 mt-5">
			<div class="col-span-6 col-start-1">
				<label for="crud-form-1" class="form-label">Product Name</label>
				<input
					id="crud-form-1"
					type="text"
					class="form-control w-full"
					placeholder="Input text"
					v-model="product.name"
				/>
			</div>
			<div class="col-span-6">
				<label for="crud-form-2" class="form-label">Category</label>

				<TomSelect
					id="crud-form-2"
					v-model="product.tag"
					class="w-full"
					multiple
					v-if="route.params.product_id"
				>
					<option v-for="category in categorySelection" :key="category">{{ category }}</option>
				</TomSelect>

				<TomSelect
					id="crud-form-2"
					v-model="product.tag"
					class="w-full"
					multiple
					v-else
				>
					<option v-for="category in categorySelection" :key="category">{{ category }}</option>
				</TomSelect>
				
			</div>

			<div class="mt-3 col-span-12 col-start-1">
				<label class="form-label">Upload Image</label>
				<div class="border-2 border-dashed dark:border-darkmode-400 rounded-md pt-4 relative align-baseline cursor-pointer">
					<div class="flex flex-wrap px-4">
						<img :src="previewImage" class="uploading-image h-48 lg:h-64 2xl:h-96 object-cover" />
					</div>
					<div class="px-4 pb-4 flex text-end text-[16px] align-baseline">
						<ImageIcon class="w-8 h-8 mr-2 " />
						<span class="text-primary mr-1">Upload a file</span> or
						drag and drop
					</div>
					<input
							type="file"
							class="w-full h-full top-0 left-0 absolute opacity-0 border-6 bg-primary cursor-pointer"
							accept="image/jpeg" 
							@change="uploadImage"
						/>
				</div>
			</div>

			<div class="mt-3 col-span-12 col-start-1">
				<label>Type</label>
				<div class="flex flex-col sm:flex-row mt-2" v-for="type in typeRadio" :key="type.id">
					<div class="form-check mr-2 mt-2 ml-2 sm:mt-0">
						<input 
							class="form-check-input" 
							type="radio" 
							name="horizontal_radio_button" 
							:value="type.id"
							v-model="product.type"
						/>
						<label 
							class="form-check-label" 
							:for="type.id"
						>
							{{ type.text }}
						</label>
					</div>
				</div>
			</div>

			<div class="mt-3 col-span-6 col-start-1">
				<label for="crud-form-1" class="form-label">Order Code</label>
				<input
					id="crud-form-1"
					type="text"
					class="form-control w-full"
					placeholder="Input Order Code"
					v-model="product.order_code"
				/>
			</div>
			<div class=" mt-3 col-span-6">
				<label for="crud-form-1" class="form-label">Description</label>
				<input
					id="crud-form-1"
					type="text"
					class="form-control w-full"
					placeholder="Input Description"
					v-model="product.description"
				/>
			</div>

			<div class="mt-3 col-span-6 col-start-1">
				<label for="crud-form-1" class="form-label">Quantity</label>
				<input
					id="crud-form-1"
					type="text"
					class="form-control w-full"
					placeholder="Input Quantity"
					v-model="product.qty"
				/>
			</div>
			<div class=" mt-3 col-span-6">
				<label for="crud-form-1" class="form-label">Price</label>
				<input
					id="crud-form-1"
					type="text"
					class="form-control w-full"
					placeholder="Input Price"
					v-model="product.price"
				/>
			</div>

			<div class="mt-3 col-span-12 col-start-1">
				<label>Status</label>
				<div class="flex flex-col sm:flex-row mt-2" v-for="status in statusRadio" :key="status.id">
					<div class="form-check mr-2 mt-2 ml-2 sm:mt-0">
						<input 
							class="form-check-input" 
							type="radio" 
							name="horizontal_radio_button1" 
							:value="status.id"
							v-model="product.status"
						/>
						<label 
							class="form-check-label" 
							:for="status.id"
						>
							{{ status.text }}
						</label>
					</div>
					<!-- <div class="form-check mr-2">
						<input id="radio-switch-4" class="form-check-input" type="radio" name="horizontal_radio_button" value="horizontal-radio-chris-evans" />
						<label class="form-check-label" for="radio-switch-4">For Sale</label>
					</div>
					<div class="form-check mr-2 mt-2 ml-2 sm:mt-0">
						<input id="radio-switch-5" class="form-check-input" type="radio" name="horizontal_radio_button" value="horizontal-radio-liam-neeson" />
						<label class="form-check-label" for="radio-switch-5">Delisted</label>
					</div> -->
				</div>
			</div>

			<div class="mt-3 col-span-12 ">
				<div class="flex mt-5 float-right">
					<button class="btn w-32 dark:border-darkmode-400 " @click="cancelButton">
						Cancel
					</button>
					<button class="btn btn-primary w-32 shadow-md ml-5" @click="submit">
						Save
					</button>
				</div>
			</div>

		</div>
	</div>
</template>

<script setup>
import { createAxiosWithBearer } from '@/libs/axiosClient'
import { list_product_category, create_product, update_product, retrieve_product } from '@/api_v2/product';
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from "vue-router";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"

const layoutStore = useLSSSellerLayoutStore();
const route = useRoute();
const router = useRouter();

const storageUrl = import.meta.env.VITE_GOOGLE_STORAGEL_URL
const product = ref({
	id: 0,
	name: '',
	category: [],
	image: '',
	type: '',
	order_code: '',
	description: '',
	qty: '',
	price: '',
	status: '',
	tag: []
})

const typeRadio = ref([
	{text: 'Product', id: 'product'},
	{text: 'Lucky Draw', id: 'lucky_draw'},
])

const statusRadio = ref([
	{text: 'For Sale', id: 'enabled'},
	{text: 'Delisted', id: 'disabled'},
])

const previewImage =ref(null)

const categorySelection = ref([])
const formData = new FormData()

onMounted(()=>{
	list_product_category().then(
		res => { categorySelection.value = res.data }
	)
	if (route.params.product_id) {
		retrieve_product(route.params.product_id)
		.then(
			res => {
				product.value = res.data
				previewImage.value = res.data.image?storageUrl + res.data.image:null
			}
		)
	}
})


const submit = ()=>{
	if (route.params.product_id) {
		formData.append('data', JSON.stringify(product.value))
		update_product(route.params.product_id, formData)
		.then(
			response => {
				// console.log('image upload response > ', response)
				// layoutStore.alert.showMessageToast("Invalid Quantity")
				router.push('/seller/stock')
			},
			layoutStore.notification.showMessageToast("Update Success")
		)
	} else {
		formData.append('data', JSON.stringify(product.value))
		// formData.append('image', )
		create_product(formData)
		.then(
			response => {
				layoutStore.notification.showMessageToast("Create Success"),
				router.push('/seller/stock')
			}
		)
	}
}

const uploadImage = e =>{
	const image = e.target.files[0];
	formData.append('image', image)

	const reader = new FileReader();
	reader.readAsDataURL(image);
	reader.onload = e =>{
		previewImage.value = e.target.result;
	};
}

const cancelButton = () =>{
	layoutStore.alert.showMessageToast("Change Not Saved");
	router.push('/seller/stock');
}
</script>
