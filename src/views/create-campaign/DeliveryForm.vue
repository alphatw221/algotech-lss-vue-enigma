<template >
	<div class="py-5 sm:p-10  intro-y grid grid-cols-12 gap-1 sm:gap-5 -z-50 text-base" v-if="ready">
		<span class="text-lg font-medium leading-none mb-3 col-span-12">Delivery Details</span>
		
		<div class="col-start-1 col-span-12 flex flex-col"> 
			<label class="text-base whitespace-nowrap">Delivery Charge</label>
			<input 
				class="form-control w-full"
				type="text" 
				v-model="props.campaign.meta_logistic.delivery_charge"
			/>
		</div>
			
		<div class="sm:col-start-1 col-span-12 mt-2 flex flex-col flex-wrap">
			<label class="text-base">
				<input 
					class="form-control form-check-input w-[1.2rem] h-[1.2rem] mr-1" 
					type="checkbox" 
					v-model="props.campaign.meta_logistic.is_free_delivery_for_order_above_price"
				/>
				Free delivery for order above $
			</label>
			<input 
				class="form-control w-full" 
				type="text" 
				v-model="props.campaign.meta_logistic.free_delivery_for_order_above_price"
		/>
		</div> 

		<div class="sm:col-start-1 col-span-12 mt-2 flex flex-col flex-wrap">
			
			<label class="w-[19rem] text-base">
				<input 
					class="form-control form-check-input w-[1.2rem] h-[1.2rem] mr-1" 
					type="checkbox"
					v-model="props.campaign.meta_logistic.is_free_delivery_for_how_many_order_minimum"
					/>
				Free delivery for minimum order Qty
			</label>

			<input 
				class="form-control w-full "
				type="text"
				v-model="props.campaign.meta_logistic.free_delivery_for_how_many_order_minimum"
			/>       
		</div> 
		

		<label for="regular-form-2" class="form-label col-start-1 col-span-12 font-bold mt-5 text-base">Delivery Charge Option</label>
		<div v-for="(option, index) in props.campaign.meta_logistic.additional_delivery_options" class="col-span-12" :key="index">
			<div class="flex flex-col flex-wrap sm:flex-row gap-3 mt-5 sm:mt-0">
				<input  
					class="form-control text-base w-full flex-1 sm:w-fit"
					type="text" 
					placeholder="express service name"
					v-model="option.title"
				/>
				<select 
					class="form-select form-select-lg w-full flex-1 sm:w-fit"
					v-model="option.type"
				>
					<option value="+">On top of delivery charge</option>
					<option value="=">Replace delivery charge</option>
				</select>
				<input  
					class="form-control w-full flex-2 sm:w-fit"
					type="text" 
					placeholder="express charge"
					v-model="option.price"
				/>
				<button 
					class="btn btn-danger inline-block text-base w-full rounded-lg  sm:w-24 ml-auto h-[42px]" 
					@click="deleteDelivery(index)"
				> Delete </button>
			</div>
		</div>
		<a 
			class=" w-full inline-block text-base my-3 col-end-9 sm:col-end-11 whitespace-nowrap"
			@click="addDelivery"
		> <u> + Add more option  </u> 
		</a>

		<label class="form-label col-start-1 col-span-12 font-bold mt-2 text-base">Store Collection</label>
		<div class=" intro-y grid grid-cols-12 gap-1 sm:gap-5 -z-50 text-base col-span-12">
            <div v-for="(option, index) in props.campaign.meta_logistic.pickup_options" class="col-span-12 gap-3" :key="index">
				<div class="flex flex-col">
						<label class="text-base">Pickup Store</label>
					<input 
						class="form-control text-base w-full sm:w-[20rem]"
						type="text"
						v-model="option.name" 
					/>
				</div>
				<div class="flex flex-col flex-wrap mt-2">
					<label class="text-base w-[8rem]">Pickup Address</label>
					<div class="flex flex-wrap"> 
						<input 
						class="form-control text-base w-full sm:max-w-[32rem] sm:mt-0 sm:mr-5"
						type="text" 
						v-model="option.address"
					/>
					<button 
						class="btn btn-danger inline-block sm:ml-auto w-full rounded-lg sm:w-24 h-[42px] mt-2 sm:mt-0" 
						@click="deleteBranch(index)"
						>
						Delete
					</button>
					</div>
				</div>
            </div>
            <a 
                class="w-full inline-block text-base my-3 col-end-9 sm:col-end-11 whitespace-nowrap"
                @click="addBranch()"
            >
               <u> + Add more option  </u> 
            </a>
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
	console.log(props.campaign)
	ready.value=true
})
const props = defineProps({
    campaign: Object,
});

const addDelivery = () =>{
    props.campaign.meta_logistic.additional_delivery_options.push(Object.assign({},additional_delivery_option))
}

const deleteDelivery = index=>{ 
    props.campaign.meta_logistic.additional_delivery_options.splice(index,1)
}

const addBranch = ()=>{
    props.campaign.meta_logistic.pickup_options.push(Object.assign({},branch_option))
}
const deleteBranch = index=>{
    props.campaign.meta_logistic.pickup_options.splice(index,1)
}


</script>