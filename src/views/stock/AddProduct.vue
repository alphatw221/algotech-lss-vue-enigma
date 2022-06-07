<template>
	<div>
		<div class="intro-y flex items-center mt-8">
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
					v-model="productInfo.name"
				/>
			</div>
			<div class="col-span-6">
				<label for="crud-form-2" class="form-label">Category</label>
				<TomSelect
					id="crud-form-2"
					v-model="productInfo.categories"
					class="w-full"
					multiple
					v-if="formType=='create'"
				>
					<option v-for="category in categorySelection" :key="category">{{ category }}</option>
				</TomSelect>
				<TomSelect
					id="crud-form-2"
					v-model="productInfo.categories"
					class="w-full"
					multiple
					v-else-if="formType=='update'"
				>
					<option v-for="category in categorySelection" :key="category">{{ category }}</option>
				</TomSelect>
			</div>

			<div class="mt-3 col-span-12 col-start-1">
				<label class="form-label">Upload Image</label>
				<div class="border-2 border-dashed dark:border-darkmode-400 rounded-md pt-4">
					<div class="flex flex-wrap px-4">
						<img :src="previewImage" class="uploading-image" />
					</div>
					<div class="px-4 pb-4 flex items-center cursor-pointer relative">
						<ImageIcon class="w-4 h-4 mr-2" />
						<span class="text-primary mr-1">Upload a file</span> or
						drag and drop
						<input
							type="file"
							class="w-full h-full top-0 left-0 absolute opacity-0"
							accept="image/jpeg" 
							@change="uploadImage"
						/>
					</div>
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
							v-model="productInfo.type"
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
					placeholder="Input text"
					v-model="productInfo.order_code"
				/>
			</div>
			<div class=" mt-3 col-span-6">
				<label for="crud-form-1" class="form-label">Description</label>
				<input
					id="crud-form-1"
					type="text"
					class="form-control w-full"
					placeholder="Input text"
					v-model="productInfo.description"
				/>
			</div>

			<div class="mt-3 col-span-6 col-start-1">
				<label for="crud-form-1" class="form-label">Quantity</label>
				<input
					id="crud-form-1"
					type="text"
					class="form-control w-full"
					placeholder="Input text"
					v-model="productInfo.quantity"
				/>
			</div>
			<div class=" mt-3 col-span-6">
				<label for="crud-form-1" class="form-label">Price</label>
				<input
					id="crud-form-1"
					type="text"
					class="form-control w-full"
					placeholder="Input text"
					v-model="productInfo.price"
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
							v-model="productInfo.status"
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
					<button class="btn w-32 dark:border-darkmode-400 " @click="this.$router.push('/stock')">
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

<script>
import { createAxiosWithBearer } from '@/libs/axiosClient'
import { list_category, create, update } from '@/api_v2/stock';

export default {
	setup() {
	},
	data() {
		return {
			formType: '',
			updateId: 0,
			productInfo: {
				id: 0,
				name: '',
				categories: [],
				image: '',
				type: '',
				order_code: '',
				description: '',
				quantity: '',
				price: '',
				status: '',
				tag: []
			},
			typeRadio: [
				{text: 'Product', id: 'product'},
				{text: 'Lucky Draw', id: 'lucky_draw'},
			],
			statusRadio: [
				{text: 'For Sale', id: 'enabled'},
				{text: 'Delisted', id: 'disabled'},
			],
			previewImage: null,
			formData: new FormData(),
			categorySelection: []
		}
	},
	mounted() {
		this.formType = this.$route.query.type
		this.updateId = this.$route.query.id

		list_category().then(
			response => { this.categorySelection = response.data }
		)

		if (this.formType == 'update') {
			createAxiosWithBearer()
			.get(`/api/product/${this.updateId}/retrieve_product/`)
			.then(
				response => {
					this.productInfo = {
						id: response.data.id,
						name: response.data.name,
						order_code: response.data.order_code,
						description: response.data.description,
						quantity: response.data.qty,
						type: response.data.type,
						price: response.data.price,
						status: response.data.status,
						categories: response.data.tag,
					}
					this.previewImage = import.meta.env.VITE_APP_IMG_URL + response.data.image
				}
			)
		}
	},
	methods: {
		submit() {
			if (this.formType == 'create') {
				this.formData.append('text', JSON.stringify(this.productInfo))
				create(this.formData)
				.then(
					response => {
						console.log('image upload response > ', response)
						this.$router.push('/stock')
					}
				)
			} else if (this.formType == 'update') {
				this.formData.append('text', JSON.stringify(this.productInfo))
				update(this.productInfo.id, this.formData)
				.then(
					response => {
						console.log('image upload response > ', response)
						this.$router.push('/stock')
					}
				)
			}
			
		},
		uploadImage(e){
			const image = e.target.files[0];
			this.formData.append('image', image)

			const reader = new FileReader();
			reader.readAsDataURL(image);
			reader.onload = e =>{
				this.previewImage = e.target.result;
			};
		}
	},
}
</script>
