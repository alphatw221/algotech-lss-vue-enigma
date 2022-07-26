<template>
	<div class="h-fit">
		<div class="flex items-center sm:px-20 lg:pt-5 mt-3 pb-4 intro-y " v-if="route.params.product_id">
			<h2 class="text-xl sm:text-2xl mx-auto sm:mx-0 font-medium">{{ $t('stock.add_product_page.edit_title') }}</h2>
		</div>
		<div class="flex items-center sm:px-20 lg:pt-5 mt-3 pb-4 intro-y" v-else>
			<h2 class="text-xl sm:text-2xl mx-auto sm:mx-0 font-medium">{{ $t('stock.add_product_page.add_title') }}</h2>
		</div>
		<div class="box grid grid-cols-12 gap-4 p-5 intro-y lg:mx-20 lg:px-40 px-10 py-10">
			<div class="col-span-12 lg:col-span-6 col-start-1 mt-2">
				<label for="crud-form-1" class="form-label text-base font-medium">{{ $t('stock.add_product_page.product_name') }}</label>
				<input
					id="crud-form-1"
					type="text"
					class="w-full form-control h-[40px]"
					placeholder=""
					v-model="validate.name.$model"
					:class="{ 'border-danger text-danger border-2': validate.name.$error }" 
				/>
				<template v-if="validate.name.$error">
					<label class="text-danger ml-2 text-[13px]" >
						{{ $t('stock.add_product_page.name_warning') }}
					</label>
				</template>
			</div>
			<div class="col-span-12 lg:col-span-6">
				<label for="crud-form-2" class="form-label text-base mt-2 font-medium">{{ $t('stock.add_product_page.category') }}</label>

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
				<!-- <template v-if="validate.tag.$error">
						<label class="text-danger ml-2 text-[13px] lg:text-[16px]" >
						Select at least one tag 
						</label>
				</template> -->
			</div>

			<div class="col-span-12 col-start-1 ">
				<label class="form-label text-base mt-2 font-medium">{{ $t('stock.add_product_page.upload_image') }}</label>
				<div class="relative">
					<!-- <XCircleIcon class="absolute top-1 right-1 w-4 h-4 ml-2 z-index-99" style="color:red" @click="clear"/> -->
					<Dropzone ref-key="dropzoneSingleRef" :options="{
							method: 'put',
							url: 'url',
							uploadMultiple: false,
							maxFilesize: 10,
							addRemoveLinks: true,
							autoProcessQueue: false,
							resizeQuality: 0.5,
							acceptedFiles: 'image/*',
						}" class="dropzone">
						<div v-if="!previewImage" > 
							<div class="text-lg font-medium">
							{{ $t('stock.add_product_page.drop_file_text') }}
							</div>
							<div class="text-gray-600">
								<br>{{ $t('stock.add_product_page.accept_file_text') }}
							</div>
							<div class="text-gray-600">{{ $t('stock.add_product_page.max_size_text') }} : 10MB</div>  
						</div>
						<img class="w-40 h-40 rounded-lg" v-else data-dz-thumbnail :src="previewImage" />
					</Dropzone>
				</div>
			</div> 

			<!-- <div class="col-span-12 col-start-1 mt-2">
				<label class="text-base font-medium">Type</label>
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
			</div> -->

			<!-- <div class="col-span-12 lg:col-span-6 col-start-1 mt-2">
				<label for="crud-form-1" class="form-label text-base font-medium">Order Code</label>
				<input
					id="crud-form-1"
					type="text"
					class="w-full form-control"
					placeholder=""
					v-model="validate.order_code.$model"
					:disabled="product.type === 'lucky_draw'"
				/>
				<template v-if="validate.order_code.$error">
					<label class="text-danger ml-2 text-[13px]" >
					Enter order code with no more than 10 digits
					</label>
				</template>
			</div> -->

			<div class="col-span-12 lg:col-span-6 col-start-1 mt-2">
				<label for="crud-form-1" class="form-label text-base font-medium">{{ $t('stock.add_product_page.quantity') }}</label>
				<input
					id="crud-form-1"
					type="text"
					class="w-full form-control"
					placeholder="Input Qty"
					v-model="validate.qty.$model"
					:class="{ 'border-danger text-danger border-2': validate.qty.$error }" 
				/>
				<template v-if="validate.qty.$error">
						<label class="text-danger ml-2 text-[13px]" >
						{{ $t('stock.add_product_page.qty_warning') }}
						</label>
				</template>
			</div>
			<div class="col-span-12 lg:col-span-6 mt-2">
				<label for="crud-form-1" class="form-label text-base font-medium">{{ $t('stock.add_product_page.price') }}</label>
				<input
					id="crud-form-1"
					type="text"
					class="w-full form-control"
					placeholder="Input Price"
					v-model="validate.price.$model"
					:class="{ 'border-danger text-danger border-2': validate.price.$error }" 
				/>
				<template v-if="validate.price.$error">
						<label class="text-danger ml-2 text-[13px]" >
						{{ $t('stock.add_product_page.price_warning') }}
						</label>
				</template>
			</div>

			<div class="col-span-12 col-start-1 mt-2">
				<label class="text-base font-medium">{{ $t('stock.add_product_page.status') }}</label>
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
							{{ $t(`stock.${status.text}`) }}
						</label>
					</div>
				</div>
			</div>

			<div class="col-span-12 mt-2">
				<label for="crud-form-1" class="form-label text-base font-medium">{{ $t('stock.add_product_page.description') }}</label>
				<textarea 
					:class="{ 'border-danger text-danger border-2': validate.description.$error }" 
					class="h-36 p-2 mr-5 form-control indent-4"
					:placeholder="$t('stock.add_product_page.product_description')"
					v-model="validate.description.$model"
				>
				</textarea>
				<template v-if="validate.description.$error">
						<label class="text-danger ml-2 text-[13px]" >
						{{ $t('stock.add_product_page.description_warning') }}
						</label>
				</template>
			</div>

			
			<div class="z-50 col-span-12 flex justify-end sm:mt-3">
				<button class="w-32 bg-white btn dark:border-darkmode-400" @click="cancelButton">
					{{ $t('stock.add_product_page.cancel') }}
				</button>
				<button class="w-32 ml-5 shadow-md btn btn-primary" @click="submit">
					{{ $t('stock.add_product_page.save') }}
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { createAxiosWithBearer } from '@/libs/axiosClient'
import { list_product_category, create_product, update_product, retrieve_product } from '@/api_v2/product';
import { ref, onMounted, computed, provide, getCurrentInstance } from 'vue'
import { useRoute, useRouter } from "vue-router";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import { useVuelidate } from "@vuelidate/core";
import { required, integer, maxLength, decimal, minValue} from "@vuelidate/validators";
import i18n from "@/locales/i18n"

const layoutStore = useLSSSellerLayoutStore();
const route = useRoute();
const router = useRouter();

const storageUrl = import.meta.env.VITE_GOOGLE_STORAGEL_URL
const product = ref({
	id: 0,
	name: '',
	category: [],
	image: '',
	type: null,
	order_code: null,
	description: '',
	qty: 0,
	price: 0,
	status: '',
	tag: [],
})

// const typeRadio = ref([
// 	{text: 'Product', id: 'product'},
// 	{text: 'Lucky Draw', id: 'lucky_draw'},
// ])

const statusRadio = ref([
	{text: 'for_sale', id: 'enabled'},
	{text: 'delisted', id: 'disabled'},
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
        layoutStore.alert.showMessageToast(i18n.global.t('stock.add_product_page.invalid_data'))
        return
    }else
	if (route.params.product_id) {
		if(previewImage.value === '' && (product.value.image === '' || dropzoneSingleRef.value.dropzone.getAcceptedFiles()[0] === undefined))
			formData.append('image', '._no_image')
		else
			formData.append('image', dropzoneSingleRef.value.dropzone.getAcceptedFiles()[0])
		
		formData.append('data', JSON.stringify(product.value))
		update_product(route.params.product_id, formData)
		.then(
			response => {
				// console.log('image upload response > ', response)
				// layoutStore.alert.showMessageToast("Invalid Quantity")
				router.push({name:'stock'})
				layoutStore.notification.showMessageToast(i18n.global.t('stock.add_product_page.update_message'))
			},
		)
	} else {
		formData.append('image', dropzoneSingleRef.value.dropzone.getAcceptedFiles()[0] || '')
		formData.append('data', JSON.stringify(product.value))
		// formData.append('image', )
		create_product(formData)
		.then(
			response => {
				layoutStore.notification.showMessageToast(i18n.global.t('stock.add_product_page.create_message')),
				router.push({name:'stock'})
			}
		)
	}
}

const cancelButton = () =>{
	router.push({name:'stock'});
	layoutStore.alert.showMessageToast(i18n.global.t('stock.add_product_page.not_save_message'));
}

// const clear = () =>{
// 	previewImage.value = ''
// 	dropzoneSingleRef.value.dropzone.previewsContainer = ''
// 	console.log(dropzoneSingleRef.value.dropzone.previewsContainer)
// }

const rules = computed(()=>{
    return{
		name:{required,maxLength:maxLength(40)},
		// order_code: {required, maxLength:maxLength(10)},
		description: {maxLength: maxLength(100)},
		qty: {integer, minValue:minValue(1)},
		price: {decimal},  
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