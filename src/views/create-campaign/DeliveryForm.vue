<template class="grid grid-cols-12 gap-5 w-full">
	<div class="box px-5 lg:p-5 2xl:p-5 intro-y grid grid-cols-12 gap-1 lg:gap-5 2xl:gap-5 -z-50" v-if="ready">
		<span class="col-start-1 col-span-12 text-lg mt-10"> 
			<strong>Delivery Details</strong>
		</span>
		<label class="col-start-1 col-span-12 lg:col-sapn-3 2xl:col-span-3 mt-2 text-base">Delivery Charge</label>
		<input 
			class="form-control-rounded col-span-12 lg:col-span-4 2xl:col-span-4 text-base"
			type="text" 
			v-model="props.campaign.meta_logistic.delivery_charge"
		/>
			
		<div class="2xl:col-start-1 col-span-12 lg:col-sapn-3 2xl:col-span-3 mt-2">
			<input 
				class="form-check-input" 
				type="checkbox" 
				v-model="props.campaign.meta_logistic.is_free_delivery_for_order_above_price"
			/>
			<label class="col-span-2 ml-5 text-base">Free delivery for order above USD</label>
		</div> 
		<input 
			class="form-control-rounded col-span-12 lg:col-span-4 2xl:col-span-4" 
			type="text" 
			v-model="props.campaign.meta_logistic.free_delivery_for_order_above_price"
		/>
		<div class="2xl:col-start-1 col-span-12 lg:col-sapn-3 2xl:col-span-3 mt-2">
			<input 
				class="form-check-input text-base" 
				type="checkbox"
				v-model="props.campaign.meta_logistic.is_free_delivery_for_how_many_order_minimum"
			/>
			<label class="col-span-2 ml-5 text-base">Free delivery for minimum order Qty</label>
		</div> 
		<input 
			class="form-control-rounded col-span-12 lg:col-span-4 2xl:col-span-4"
			type="text"
			v-model="props.campaign.meta_logistic.free_delivery_for_how_many_order_minimum"
		/>       
		
		<label class="form-label col-start-1 col-span-12 font-bold mt-2 text-base">Delivery Charge Option</label>
		<div v-for="(option, index) in props.campaign.meta_logistic.additional_delivery_options" class="col-span-12" :key="index">
			<div class="grid grid-cols-12 gap-3 mt-3">
				<input  
					class="form-control-rounded col-start-1 col-span-12 lg:col-span-3 2xl:col-span-3 text-base"
					type="text" 
					placeholder="express service name"
					v-model="option.title"
				/>
				<select 
					class="form-select col-span-12 lg:col-span-3 2xl:col-span-3"
					v-model="option.type"
				>
					<option value="+">On top of delivery charge</option>
					<option value="=">Replace delivery charge</option>
				</select>
				<input  
					class="form-control-rounded col-span-12 lg:col-span-3 2xl:col-span-3 text-base"
					type="text" 
					placeholder="express charge"
					v-model="option.price"
				/>
				<button 
					class="btn btn-danger w-24 inline-block text-base ml-5" 
					@click="deleteDelivery(index)"
				> Delete </button>
			</div>
		</div>
		<button 
			class="btn btn-primary col-start-5 w-24 inline-block text-base mb-5 mt-3"
			@click="addDelivery"
		> Add </button>

		<label class="form-label col-start-1 col-span-12 font-bold mt-2 text-base">Collect In Store</label>
		<div v-for="(option, index) in props.campaign.meta_logistic.pickup_options" class="col-span-12" :key="index">
			<div class="grid grid-cols-12 gap-3">
				<label class="col-start-1 col-span-12 lg:col-span-3 2xl:col-span-3 2xl:col-start-1 mt-2 text-base">Pickup Store</label>
				<input 
					class="form-control-rounded col-span-12 lg:col-span-6 2xl:col-span-4 text-base"
					type="text"
					v-model="option.name" 
				/>
				<label class="col-start-1 col-span-12 lg:col-span-3 lg:col-start-1 2xl:col-span-3 2xl:col-start-1 mt-2 text-base">Pickup Address</label>
				<input 
					class="form-control-rounded col-span-12 lg:col-span-6 2xl:col-span-6 text-base"
					type="text" 
					v-model="option.address"
				/>
				<button 
					class="btn btn-danger w-24 inline-block text-base ml-5 " 
					@click="deleteBranch(index)"
				> Delete </button>
			</div>
		</div>
		<button 
			class="btn btn-primary col-start-5 w-24 inline-block text-base mt-3 mb-5"
			@click="addBranch()"
		> Add </button>
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
	console.log(props.campaign)
	ready.value=true
})
const props = defineProps({
    campaign: Object,
});

const addDelivery = () =>{
    props.campaign.meta_logistic.additional_delivery_options.push(additional_delivery_option)
}

const deleteDelivery = index=>{ 
    props.campaign.meta_logistic.additional_delivery_options.splice(index,1)
}

const addBranch = ()=>{
    props.campaign.meta_logistic.pickup_options.push(branch_option)
}
const deleteBranch = index=>{
    props.campaign.meta_logistic.pickup_options.splice(index,1)
}


</script>