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
			<div class="col-span-12 lg:col-span-6 tom">
				<label for="crud-form-2" class="form-label text-base mt-2 font-medium">{{ $t('stock.add_product_page.category') }}</label>

				<TomSelect
					id="crud-form-2"
					v-model="product.categories"
					class="w-full"
					:options="{create:false}"
					multiple
					v-if="route.params.product_id"
				>
					<option v-for="productCategory, index in layoutStore.userInfo?.user_subscription?.product_categories" :key="index" :value="productCategory.id">{{ productCategory.name }}</option>
				</TomSelect>

				<TomSelect
					id="crud-form-2"
					v-model="product.categories"
					:options="{create:false}"
					class="w-full"
					multiple
					v-else
				>
					<!-- <option v-for="category in categorySelection" :key="category">{{ category }}</option> -->
					<option v-for="productCategory, index in layoutStore.userInfo?.user_subscription?.product_categories" :key="index" :value="productCategory.id">{{ productCategory.name }}</option>
				</TomSelect>
				<!-- <template v-if="validate.tag.$error">
						<label class="text-danger ml-2 text-[13px] lg:text-[16px]" >
						Select at least one tag 
						</label>
				</template> -->
			</div>

			<div class="col-span-12 col-start-1 drop">
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
							<div class="text-gray-600">{{ $t('stock.add_product_page.max_size_text') }}</div>  
						</div>
						<img class="w-40 h-40 rounded-lg" v-else data-dz-thumbnail :src="previewImage" />
					</Dropzone>
					<Tippy v-show="previewImage" tag="a" href="javascript:;" class="absolute right-0 top-0 tooltip" :content="$t('create_campaign.payment_form.remove_image')"  :options="{theme: 'light',}">
						<XCircleIcon class="absolute right-0 top-0 z-10 click-icon text-danger" @click="removeImage()"/>
					</Tippy>
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

			<div class="col-span-12 lg:col-span-12 col-start-1 mt-2">
				<label for="crud-form-1" class="form-label text-base font-medium">{{ $t('stock.add_product_page.quantity') }}</label>
				<input
					id="crud-form-1"
					type="number"
					class="w-full form-control"
					placeholder="Input Qty"
					v-model.number="validate.qty.$model"
					:class="{ 'border-danger text-danger border-2': validate.qty.$error }" 
				/>
				<template v-if="validate.qty.$error">
						<label class="text-danger ml-2 text-[13px]" >
						{{ $t('stock.add_product_page.qty_warning') }}
						</label>
				</template>
			</div>
			<div class="col-start-1 col-span-12 lg:col-span-6 mt-2">
				<label for="crud-form-1" class="form-label text-base font-medium">{{ $t('stock.add_product_page.price_ori') }}</label>
				<input
					id="crud-form-1"
					type="number"
					class="w-full form-control"
					:placeholder="$t('stock.add_product_page.price_ori_input')"
					v-model.number="product.price_ori"
				/>
			</div>
			<div class="col-span-12 lg:col-span-6 mt-2">
				<label for="crud-form-1" class="form-label text-base font-medium">{{ $t('stock.add_product_page.price') }}</label>
				<input
					id="crud-form-1"
					type="number"
					class="w-full form-control"
					:placeholder="$t('stock.add_product_page.price_input')"
					v-model.number="validate.price.$model"
					:class="{ 'border-danger text-danger border-2': validate.price.$error }" 
				/>
				<template v-if="validate.price.$error">
						<label class="text-danger ml-2 text-[13px]" >
						{{ $t('stock.add_product_page.price_warning') }}
						</label>
				</template>
			</div>
			<div class="col-span-12 lg:col-span-6 col-start-1 mt-2">
				<label for="crud-form-1" class="form-label text-base font-medium">{{ $t('stock.add_product_page.sku') }}</label>
				<input
					id="crud-form-1"
					type="text"
					class="w-full form-control"
					:placeholder="$t('stock.add_product_page.sku_input')"
					v-model="product.sku"
				/>
			</div>
			<div class="col-span-12 lg:col-span-6 col-start-1 mt-2">
				<label for="crud-form-1" class="form-label text-base font-medium">{{ $t('stock.add_product_page.order_code') }}</label>
				<input
					id="crud-form-1"
					type="text"
					class="w-full form-control"
					:placeholder="$t('stock.add_product_page.order_code_input')"
					v-model="validate.order_code.$model"
					:disabled="product.type === 'lucky_draw'"
					:class="{ 'border-danger text-danger border-2': validate.order_code.$error }" 
				/>
				<template v-if="validate.order_code.$error">
					<label class="text-danger ml-2 text-[13px]" >
						{{ $t('stock.add_product_page.order_code_warning') }}
					</label>
				</template>
			</div>

			<div class="col-span-6 col-start-1 mt-2">
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
			<div class="col-span-6 mt-2">
				<div class="flex flex-row gap-3"> 
				<input 
					class="form-control form-check-input w-[1.2rem] h-[1.2rem] my-auto" 
					type="checkbox" 
					v-model="product.pinned"
				/>
				<label class="text-base font-medium">{{ $t('stock.add_product_page.pinned') }}</label>
				</div>
			</div>

			<!-- DESCRIPTION -->
			<div class="col-span-12 mt-2">
				<div class="flex justify-between"> 
					<label for="crud-form-1" class="form-label text-base font-medium">{{ $t('stock.add_product_page.description') }}</label>
					<button class="btn btn-secondary mb-2 h-[35px]" @click="previewHTML()">{{ $t('stock.add_product_page.preview') }}</button>
				</div>
				<ClassicEditor 
					:class="{ 'border-danger text-danger border-2': validate.description.$error }"
					v-model="validate.description.$model"
					:config="editorConfig"/>
				<template v-if="validate.description.$error">
						<label class="text-danger ml-2 text-[13px]" >
						{{ $t('stock.add_product_page.description_warning') }}
						</label>
				</template>
			</div>

			<!-- REMARK -->
			<div class="col-span-12 mt-2">
				<label for="crud-form-1" class="form-label text-base font-medium">{{ $t('stock.add_product_page.remark') }}</label>
				<textarea
					:class="{ 'border-danger text-danger border-2': validate.remark.$error }" 
					class="h-36 p-2 mr-5 form-control indent-4"
					:placeholder="$t('stock.add_product_page.placeholder_remark')"
					v-model="validate.remark.$model"
				>
				</textarea>
				<template v-if="validate.remark.$error">
						<label class="text-danger ml-2 text-[13px]" >
						{{ $t('stock.add_product_page.remark_warning') }}
						</label>
				</template>
			</div>

			<!-- CANCEL/SUBMIT -->
			<div class="z-50 col-span-12 flex justify-end sm:mt-3">
				<button class="w-32 bg-white btn dark:border-darkmode-400" @click="cancelButton()">
					{{ $t('stock.add_product_page.cancel') }}
				</button>
				<button class="w-32 ml-5 shadow-md btn btn-primary" @click="submit()">
					{{ $t('stock.add_product_page.save') }}
				</button>
			</div>
		</div>
		<ItemDescriptionModal :status="'PREVIEW'"/>
	</div>
</template>

<script setup>

import { create_product, update_product, retrieve_product } from '@/api_v2/product';
import { ref, onMounted, computed, provide, getCurrentInstance } from 'vue'
import { useRoute, useRouter } from "vue-router";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import { useVuelidate } from "@vuelidate/core";
import { required, integer, maxLength, decimal, minValue, helpers} from "@vuelidate/validators";
import i18n from "@/locales/i18n"
import ItemDescriptionModal from '../shoppingcart/modals/ItemDescriptionModal.vue'
import ConversationModalVue from '../../components/campaign/modals/ConversationModal.vue';

const layoutStore = useLSSSellerLayoutStore();
const route = useRoute();
const router = useRouter();
const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;

const product = ref({
	id: 0,
	name: '',
	image: '',
	type: null,
	order_code: null,
	description: '',
	qty: 0,
	price: 0,
	price_ori:0,
	status: 'enabled',
	remark:'',
	categories:[],
	sku:'',
	pinned:false,
})

const notContains = (param) => (value) => !value.includes(param)
  
const rules = computed(()=>{
    return{
		name:{required,maxLength: maxLength(255)},
		order_code: {required, maxLength:maxLength(10)},
		description: {notContains:notContains('<head>')},
		qty: {required,integer, minValue:minValue(1)},
		price: {required,decimal, minValue:minValue(0)},  
		remark:{maxLength: maxLength(100)}
    }
});

const editorConfig = {
  toolbar: {
	items: [
		'heading', '|',
		'bold', 'italic', 'strikethrough', 'underline','link', '|',
		'blockQuote', 'insertTable', '|',
		'specialCharacters', 'horizontalLine', 'pageBreak', '|',
		'-',
		'undo', 'redo',
	],
  },
};

const statusRadio = ref([
	{text: 'for_sale', id: 'enabled'},
	{text: 'delisted', id: 'disabled'},
])

const previewImage =ref('')
const categorySelection = ref([])
const formData = new FormData()

const validate = useVuelidate(rules, product);

onMounted(()=>{
	if (route.params.product_id) {
		retrieve_product(route.params.product_id, layoutStore.alert)
		.then(
			res => {
				product.value = res.data
				console.log(product.value)
				product.value.description = product.value?.description ||""
				previewImage.value = res.data.image?res.data.image:null
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
const removeImage = () =>{
	const files = dropzoneSingleRef.value.dropzone.getAcceptedFiles()
	if (files.length > 0) dropzoneSingleRef.value.dropzone.removeFile(files[0])
    previewImage.value = ''

}
const submit = ()=>{
	if(typeof product.value.price_ori !== 'number') product.value.price_ori == null
	validate.value.$touch();
    if (validate.value.$invalid) {
        layoutStore.alert.showMessageToast(i18n.global.t('stock.add_product_page.invalid_data'))
        return
	}
    if (route.params.product_id) {
		if(previewImage.value === '' && (product.value.image === '' || dropzoneSingleRef.value.dropzone.getAcceptedFiles()[0] === undefined)) {
			formData.append('image', '._no_image')
		} else {
			formData.append('image', dropzoneSingleRef.value.dropzone.getAcceptedFiles()[0])
		}
			
		
		formData.append('data', JSON.stringify(product.value))
		update_product(route.params.product_id, formData, layoutStore.alert)
		.then(
			response => {
				// console.log('image upload response > ', response)
				// layoutStore.alert.showMessageToast("Invalid Quantity")
				router.push({name:'stock'})
				layoutStore.notification.showMessageToast(i18n.global.t('stock.add_product_page.update_message'))
			},
		)
	} else {
		formData.append('image', dropzoneSingleRef.value.dropzone.getAcceptedFiles()[0] || '._no_image')
		formData.append('data', JSON.stringify(product.value))
		// formData.append('image', )
		create_product(formData, layoutStore.alert)
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

const previewHTML = () => {
	if(dropzoneSingleRef.value.dropzone.getAcceptedFiles()[0]?.dataURL) product.value.image = dropzoneSingleRef.value.dropzone.getAcceptedFiles()[0].dataURL
	eventBus.emit('showDescriptionModal',product.value)
}


// const clear = () =>{
// 	previewImage.value = ''
// 	dropzoneSingleRef.value.dropzone.previewsContainer = ''
// 	console.log(dropzoneSingleRef.value.dropzone.previewsContainer)
// }

</script>

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

.tom{
	z-index: 50;
}

.drop{
	z-index: 49;
}
</style>