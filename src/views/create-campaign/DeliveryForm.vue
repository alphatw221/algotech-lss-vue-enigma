<template>
	<div class="box grid grid-cols-12 gap-4 p-5 intro-y lg:mx-20 lg:px-40 px-10 py-10 mt-3" v-if="ready">
		<span class="col-span-12 text-xl font-medium leading-none">Delivery Details</span>
		<hr class="col-span-12 mb-3" />
		<div class="flex flex-col col-span-12 col-start-1 px-6"> 
			<label class="text-base whitespace-nowrap text-lg font-medium">Delivery Charge</label>
			<input 
				class="w-full form-control"
				type="text" 
				v-model="props.campaign.meta_logistic.delivery_charge"
			/>
		</div>
			
		<div class="flex flex-col flex-wrap col-span-12 mt-2 sm:col-start-1 px-6">
			<label class="form-label text-base text-lg font-medium">
				<input 
					class="form-control form-check-input w-[1.2rem] h-[1.2rem] mr-1" 
					type="checkbox" 
					v-model="props.campaign.meta_logistic.is_free_delivery_for_order_above_price"
				/>
				Free delivery for order above $
			</label>
			<input 
				class="w-full form-control" 
				type="text" 
				v-model="props.campaign.meta_logistic.free_delivery_for_order_above_price"
		/>
		</div> 

		<div class="flex flex-col flex-wrap col-span-12 mt-2 sm:col-start-1 px-6">
			
			<label class="form-label text-base my-auto w-[19rem] text-lg font-medium">
				<input 
					class="form-control form-check-input w-[1.2rem] h-[1.2rem] mr-1" 
					type="checkbox"
					v-model="props.campaign.meta_logistic.is_free_delivery_for_how_many_order_minimum"
					/>
				Free delivery for minimum order Qty
			</label>

			<input 
				class="w-full form-control "
				type="text"
				v-model="props.campaign.meta_logistic.free_delivery_for_how_many_order_minimum"
			/>       
		</div> 
		
		<div class="flex justify-between col-span-12 col-start-1 mt-5 px-6"> 
			<label for="regular-form-2" class="text-base font-bold form-label">Delivery Option(s)</label>
			<a 
				class="whitespace-nowrap font-medium"
				@click="addDelivery"
			> <u> + Add More Option  </u> 
			</a>
		</div>
		<div v-for="(option, index) in props.campaign.meta_logistic.additional_delivery_options" class="col-span-12" :key="index">
			<div class="flex flex-col flex-wrap gap-3 mt-5 sm:flex-row sm:mt-0 px-6">
				<input  
					class="flex-1 w-full text-base form-control sm:w-fit"
					type="text" 
					placeholder="eg : Express Service"
					v-model="option.title"
				/>
				<select 
					class="flex-1 w-full form-select form-select-md sm:w-fit"
					v-model="option.type"
				>
					<option value="+">On top of delivery charge</option>
					<option value="=">Replace delivery charge</option>
				</select>
				<input  
					class="w-full form-control flex-2 sm:w-fit"
					type="text" 
					placeholder="eg : Express Charge"
					v-model="option.price"
				/>
				<button 
					class="btn btn-danger inline-block text-base w-full sm:w-24 ml-auto h-[42px]" 
					@click="deleteDelivery(index)"
				> Delete </button>
			</div>
		</div>
		
		<div class="flex justify-between col-span-12 col-start-1 mt-5 px-6"> 
			<label for="regular-form-2" class="text-base font-bold form-label">Store Collection</label>
			<a 
				class="whitespace-nowrap font-medium"
				@click="addBranch()"
			> <u> + Add More Option  </u> 
			</a>
		</div>
		<div class="grid grid-cols-12 col-span-12 gap-1 text-base intro-y sm:gap-5 -z-50">
            <div v-for="(option, index) in props.campaign.meta_logistic.pickup_options" class="col-span-12 gap-3" :key="index">
				<div class="flex flex-col flex-wrap gap-3 mt-5 sm:flex-row sm:mt-0 px-6">
                    <div class="flex flex-col flex-1">
                         <label class="text-base text-lg font-medium whitespace-nowrap">Pickup Store</label>
                        <input 
                            class="w-full h-[42px] text-base form-control sm:mt-0"
                            type="text"
                            v-model="option.name" 
                        />
                    </div>
                    <div class="flex flex-col flex-wrap  flex-grow-2">
                        <label class="text-base text-lg font-medium whitespace-nowrap">Pickup Address</label>
                        <input 
                            class="w-full h-[42px] mr-5 text-base form-control sm:mt-0"
                            type="text" 
                            v-model="option.address"
                        />
                    </div>
                    <button 
                        class="inline-block w-full rounded-lg btn btn-danger sm:ml-auto sm:w-24 h-[42px] sm:mt-auto" 
                        @click="deleteBranch(index)"
                        >
                        Delete
                    </button>
                </div>
            </div>
        </div> 

	</div>
</template>

<script setup>
import { ref, reactive, onMounted, watch, computed, watchEffect, defineProps } from 'vue';

import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';

import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";


const additional_delivery_option = { title: null, type: null, price: null }
const branch_option = { name: null, address: null }
const ready = ref(false)
onMounted(()=>{
	ready.value=true
})
const props = defineProps({
    campaign: Object,
});

const addDelivery = () =>{
    props.campaign.meta_logistic.additional_delivery_options.unshift(Object.assign({},additional_delivery_option))
}

const deleteDelivery = index=>{ 
    props.campaign.meta_logistic.additional_delivery_options.splice(index,1)
}

const addBranch = ()=>{
    props.campaign.meta_logistic.pickup_options.unshift(Object.assign({},branch_option))
}
const deleteBranch = index=>{
    props.campaign.meta_logistic.pickup_options.splice(index,1)
}


</script>