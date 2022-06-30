<template>
	<div class="h-[100%] overflow-auto">
		<div class="intro-y flex items-center mt-3" v-if="route.params.product_id">
			<h2 class="text-lg font-medium">Update Product</h2>
		</div>
		<div class="intro-y flex items-center mt-3" v-else>
			<h2 class="text-lg font-medium">Add New Product</h2>
		</div>
		<div class="intro-y grid grid-cols-12 gap-4 box p-5 mt-5">
			<div class="col-span-6 col-start-1">
				<label for="crud-form-1" class="form-label">Product Name</label>
				<input
					id="crud-form-1"
					type="text"
					class="form-control w-full"
					placeholder="Input text"
					v-model="validate.name.$model"
					:class="{ 'border-danger text-danger border-2': validate.name.$error }" 
				/>
				<template v-if="validate.name.$error">
						<label class="text-danger ml-2" >
						Enter product name with no more than 50 digits
						</label>
				</template>
			</div>
			<div class="col-span-6">
				<label for="crud-form-2" class="form-label">Category</label>

				<TomSelect
					id="crud-form-2"
					v-model="validate.tag.$model"
					class="w-full"
					multiple
					:class="{ 'border-danger text-danger border-2': validate.tag.$error }" 
					v-if="route.params.product_id"
				>
					<option v-for="category in categorySelection" :key="category">{{ category }}</option>
				</TomSelect>

				<TomSelect
					id="crud-form-2"
					v-model="validate.tag.$model"
					class="w-full"
					multiple
					:class="{ 'border-danger text-danger border-2': validate.tag.$error }" 
					v-else
				>
					<option v-for="category in categorySelection" :key="category">{{ category }}</option>
				</TomSelect>
				<template v-if="validate.tag.$error">
						<label class="text-danger ml-2" >
						Select at least one tag 
						</label>
				</template>
			</div>

			<div class="mt-3 col-span-12 col-start-1">
				<label class="form-label">Upload Image</label>
				<div class="border-2 border-dashed dark:border-darkmode-400 rounded-lg mt-5 relative">
					<div class="px-4 items-center justify-center flex">
						<img :src="previewImage" class="uploading-image h-48 object-cover" />
					</div>
					<div class="px-4 pb-4 text-[16px] absolute top-16 text-center w-full flex flex-col items-center justify-center"
                		v-if="previewImage === null">
						<div class="flex"> <ImageIcon class="w-8 h-8 mr-2 -mt-2 text-slate-600" /> <strong class="text-slate-600">Upload a file or drag and drop</strong> </div>
						<div class="mt-2 text-slate-500">accepted File types: jpeg, png, jpg</div>
						<div class="text-slate-500">Max file size : 2MB</div>  
					</div>
					<input
							type="file"
							class="w-full h-full top-0 left-0 absolute opacity-0 border-6 cursor-pointer"
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
					v-model="validate.order_code.$model"
				/>
				<template v-if="validate.order_code.$error">
						<label class="text-danger ml-2" >
						Enter order code with no more than 10 digits
						</label>
				</template>
			</div>
			<div class="mt-3 col-span-6">
				<label for="crud-form-1" class="form-label">Description</label>
				<input
					id="crud-form-1"
					type="text"
					class="form-control w-full"
					placeholder="Input Description"
					v-model="validate.description.$model"
					:class="{ 'border-danger text-danger border-2': validate.description.$error }" 
				/>
				<template v-if="validate.description.$error">
						<label class="text-danger ml-2" >
						discription cannot be more than 100 digits
						</label>
				</template>
				
			</div>

			<div class="mt-3 col-span-6 col-start-1">
				<label for="crud-form-1" class="form-label">Quantity</label>
				<input
					id="crud-form-1"
					type="text"
					class="form-control w-full"
					placeholder="Input Quantity"
					v-model="validate.qty.$model"
					:class="{ 'border-danger text-danger border-2': validate.qty.$error }" 
				/>
				<template v-if="validate.qty.$error">
						<label class="text-danger ml-2" >
						Quantity has to be numbers 
						</label>
				</template>
			</div>
			<div class=" mt-3 col-span-6">
				<label for="crud-form-1" class="form-label">Price</label>
				<input
					id="crud-form-1"
					type="text"
					class="form-control w-full"
					placeholder="Input Price"
					v-model="validate.price.$model"
					:class="{ 'border-danger text-danger border-2': validate.price.$error }" 
				/>
				<template v-if="validate.price.$error">
						<label class="text-danger ml-2" >
						Price has to be numbers 
						</label>
				</template>
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
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from "vue-router";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import { useVuelidate } from "@vuelidate/core";
import { required,minValue, integer, minLength, maxLength, decimal } from "@vuelidate/validators";

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
	qty: 0,
	price: 0,
	status: '',
	tag: [],
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
	validate.value.$touch();
	console.log(product.value)
    if (validate.value.$invalid) {
        layoutStore.alert.showMessageToast("Invalid Data Inputed")
        return
    }else
	if (route.params.product_id) {
		formData.append('data', JSON.stringify(product.value))
		update_product(route.params.product_id, formData)
		.then(
			response => {
				// console.log('image upload response > ', response)
				// layoutStore.alert.showMessageToast("Invalid Quantity")
				layoutStore.notification.showMessageToast("Update Success")
				router.push({name:'stock'})
			},
		)
	} else {
		formData.append('data', JSON.stringify(product.value))
		// formData.append('image', )
		create_product(formData)
		.then(
			response => {
				layoutStore.notification.showMessageToast("Create Success"),
				router.push({name:'stock'})
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
	router.push({name:'stock'});
	layoutStore.alert.showMessageToast("Change Not Saved");
}

const rules = computed(()=>{
    return{
		name:{required,maxLength:maxLength(40)},
		order_code: {required, maxLength:maxLength(10),minLength:minLength(3)},
		description: {maxLength: maxLength(100)},
		qty: {integer},
		price: {decimal},
		tag: {required},  
    }
});

const validate = useVuelidate(rules, product);

</script>

<!-- test product name with maximum length to -->