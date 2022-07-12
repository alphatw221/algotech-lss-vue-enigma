<template>
	<div class="h-[100%] overflow-auto box">
		<!-- {{ $t('test1') }} -->
		<div class="flex items-center p-5 intro-y" v-if="route.params.product_id">
			<h2 class="text-lg font-medium mx-">Edit Product</h2>
		</div>
		<div class="flex items-center p-5 intro-y" v-else>
			<h2 class="text-lg font-medium">Add New Product</h2>
		</div>
		<div class="grid grid-cols-12 gap-4 p-5 mt-5 intro-y">
			<div class="col-span-6 col-start-1">
				<label for="crud-form-1" class="form-label">Product Name</label>
				<input
					id="crud-form-1"
					type="text"
					class="w-full form-control"
					placeholder="Input text"
					v-model="validate.name.$model"
					:class="{ 'border-danger text-danger border-2': validate.name.$error }" 
				/>
				<template v-if="validate.name.$error">
					<label class="text-danger ml-2 text-[13px] lg:text-[16px]" >
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
						<label class="text-danger ml-2 text-[13px] lg:text-[16px]" >
						Select at least one tag 
						</label>
				</template>
			</div>

			<div class="col-span-12 col-start-1 mt-3">
				<label class="form-label">Upload Image</label>
				<!-- <div class="relative mt-5 border-2 border-dashed rounded-lg dark:border-darkmode-400">
					<div class="flex items-center justify-center px-4">
						<img :src="previewImage" class="object-cover h-48 uploading-image" />
					</div>
					<div class="px-4 pb-4 text-[16px] absolute top-16 text-center w-full flex flex-col items-center justify-center"
                		v-if="previewImage === ''">
						<div class="flex"> <ImageIcon class="w-8 h-8 mr-2 -mt-2 text-slate-600" /> <strong class="text-slate-600">Upload a file or drag and drop</strong> </div>
						<div class="mt-2 text-slate-500">accepted File types: jpeg, png, jpg</div>
						<div class="text-slate-500">Max file size : 2MB</div>  
					</div>
					<input
						type="file"
						class="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer border-6"
						accept="image/jpeg" 
						@change="uploadImage"
					/>
				</div> -->
				<Dropzone ref-key="dropzoneSingleRef" :options="{
						method: 'put',
						url: 'url',
						uploadMultiple: false,
						maxFilesize: 1,
						addRemoveLinks: true,
						autoProcessQueue: false,
						resizeQuality: 0.5,
						acceptedFiles: 'image/*',
					}" class="dropzone">
					<div v-if="!previewImage" > 
						<div class="text-lg font-medium">
						Drop files here or click to upload.
						</div>
						<div class="text-gray-600">
							<br>accepted File types: jpeg, png, jpg
						</div>
						<div class="text-gray-600">Max file size : 2MB</div>  
					</div>
					<img class="w-40 h-40 rounded-lg" v-else data-dz-thumbnail :src="previewImage" />
				</Dropzone>
			</div> 

			<div class="col-span-12 col-start-1 mt-3">
				<label>Type</label>
				<div class="flex flex-col mt-2 sm:flex-row" v-for="type in typeRadio" :key="type.id">
					<div class="mt-2 ml-2 mr-2 form-check sm:mt-0">
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

			<div class="col-span-6 col-start-1 mt-3">
				<label for="crud-form-1" class="form-label">Order Code</label>
				<input
					id="crud-form-1"
					type="text"
					class="w-full form-control"
					placeholder="Input Order Code"
					v-model="validate.order_code.$model"
				/>
				<template v-if="validate.order_code.$error">
						<label class="text-danger ml-2 text-[13px] lg:text-[16px]" >
						Enter order code with no more than 10 digits
						</label>
				</template>
			</div>
			<div class="col-span-6 mt-3">
				<label for="crud-form-1" class="form-label">Description</label>
				<input
					id="crud-form-1"
					type="text"
					class="w-full form-control"
					placeholder="Input Description"
					v-model="validate.description.$model"
					:class="{ 'border-danger text-danger border-2': validate.description.$error }" 
				/>
				<template v-if="validate.description.$error">
						<label class="text-danger ml-2 text-[13px] lg:text-[16px]" >
						discription cannot be more than 100 digits
						</label>
				</template>
				
			</div>

			<div class="col-span-6 col-start-1 mt-3">
				<label for="crud-form-1" class="form-label">Quantity</label>
				<input
					id="crud-form-1"
					type="text"
					class="w-full form-control"
					placeholder="Input Quantity"
					v-model="validate.qty.$model"
					:class="{ 'border-danger text-danger border-2': validate.qty.$error }" 
				/>
				<template v-if="validate.qty.$error">
						<label class="text-danger ml-2 text-[13px] lg:text-[16px]" >
						Qty has to be a number
						</label>
				</template>
			</div>
			<div class="col-span-6 mt-3 ">
				<label for="crud-form-1" class="form-label">Price</label>
				<input
					id="crud-form-1"
					type="text"
					class="w-full form-control"
					placeholder="Input Price"
					v-model="validate.price.$model"
					:class="{ 'border-danger text-danger border-2': validate.price.$error }" 
				/>
				<template v-if="validate.price.$error">
						<label class="text-danger ml-2 text-[13px] lg:text-[16px]" >
						Price has to be a number 
						</label>
				</template>
			</div>

			<div class="col-span-12 col-start-1 mt-3">
				<label>Status</label>
				<div class="flex flex-col mt-2 sm:flex-row" v-for="status in statusRadio" :key="status.id">
					<div class="mt-2 ml-2 mr-2 form-check sm:mt-0">
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
				</div>
			</div>

			<div class="col-span-12 mt-3 ">
				<div class="flex float-right mt-5">
					<button class="w-32 btn dark:border-darkmode-400 " @click="cancelButton">
						Cancel
					</button>
					<button class="w-32 ml-5 shadow-md btn btn-primary" @click="submit">
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
import { ref, onMounted, computed, provide } from 'vue'
import { useRoute, useRouter } from "vue-router";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import { useVuelidate } from "@vuelidate/core";
import { required, integer, maxLength, decimal} from "@vuelidate/validators";

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

const previewImage =ref('')
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
const dropzoneSingleRef = ref(null);
provide("bind[dropzoneSingleRef]", (el) => {
    dropzoneSingleRef.value = el;
    //a way to restrict user only upload one file at a time
    el.dropzone.on('addedfile', file => {
        const files = el.dropzone.getAcceptedFiles()
        if (files.length > 0) el.dropzone.removeFile(files[0])
    })
});

const submit = ()=>{
	validate.value.$touch();
    if (validate.value.$invalid) {
        layoutStore.alert.showMessageToast("Invalid Data Inputed")
        return
    }else
	if (route.params.product_id) {
		formData.append('image', dropzoneSingleRef.value.dropzone.getAcceptedFiles()[0] || '')
		formData.append('data', JSON.stringify(product.value))
		update_product(route.params.product_id, formData)
		.then(
			response => {
				// console.log('image upload response > ', response)
				// layoutStore.alert.showMessageToast("Invalid Quantity")
				router.push({name:'stock'})
				layoutStore.notification.showMessageToast("Update Successfully")
			},
		)
	} else {
		formData.append('image', dropzoneSingleRef.value.dropzone.getAcceptedFiles()[0] || '')
		formData.append('data', JSON.stringify(product.value))
		// formData.append('image', )
		create_product(formData)
		.then(
			response => {
				layoutStore.notification.showMessageToast("Create Successfully"),
				router.push({name:'stock'})
			}
		)
	}
}

// const uploadImage = e =>{
// 	const image = e.target.files[0];
// 	formData.append('image', image)

// 	const reader = new FileReader();
// 	reader.readAsDataURL(image);
// 	reader.onload = e =>{
// 		previewImage.value = e.target.result;
// 	};
// }

const cancelButton = () =>{
	router.push({name:'stock'});
	layoutStore.alert.showMessageToast("Change Not Saved");
}

const rules = computed(()=>{
    return{
		name:{required,maxLength:maxLength(40)},
		order_code: {required, maxLength:maxLength(10)},
		description: {maxLength: maxLength(100)},
		qty: {integer},
		price: {decimal},
		tag: {required},  
    }
});

const validate = useVuelidate(rules, product);

</script>

<!-- test product name with maximum length to -->

<style scoped>

.dz-preview{
	position:absolute;
	left: 50%;
	height: 100% !important;
	width: 100% !important; 
}
.dz-image {
	width: 100% !important; 
}
.dz-progress {
	display:none !important; 
}

</style>