<template>
	<div class="box grid grid-cols-12 gap-4 intro-y lg:mx-20 lg:px-40 px-5 py-10 mt-3" v-if="ready">
		<span class="col-span-12 text-xl font-medium leading-none lg:-mx-6">{{$t('create_campaign.delivery_form.delivery_detail')}}</span>
		<hr class="col-span-12 mb-3 -mx-6" />



		<div class="flex flex-col flex-wrap col-span-12 mt-2 sm:col-start-1 ">
			<label class="text-base whitespace-nowrap text-lg font-medium">{{$t('create_campaign.delivery_form.delivery_charge')}}</label>
			<input 
				class="w-full form-control"
				type="text" 
				v-model="props.campaign.meta_logistic.delivery_charge"
				@blur="props.v.meta_logistic.delivery_charge.$touch()"
			/>
			<label class="text-danger text-[12px] " 
				v-for="error,index in props.v.meta_logistic.delivery_charge.$errors"
				:key="index"
				>
				{{ $t(`create_campaign.delivery_form.errors.${error.$validator}`) }}
			</label>
		</div>
		

		<div class="flex flex-col flex-wrap col-span-12 mt-2 sm:col-start-1 ">
			<label class="form-label text-base text-lg font-medium">
				<input 
					class="form-control form-check-input w-[1.2rem] h-[1.2rem] mr-1" 
					type="checkbox" 
					v-model="props.campaign.meta_logistic.is_free_delivery_for_order_above_price"
				/>
				{{$t('create_campaign.delivery_form.free_delivery_for_order_above')}}
			</label>
			<input 
				class="w-full form-control" 
				type="text" 
				v-model="props.campaign.meta_logistic.free_delivery_for_order_above_price"
				@blur="props.v.meta_logistic.free_delivery_for_order_above_price.$touch()"
			/>
			<label class="text-danger text-[12px] " 
				v-for="error,index in props.v.meta_logistic.free_delivery_for_order_above_price.$errors"
				:key="index"
				>
				{{ $t(`create_campaign.delivery_form.errors.${error.$validator}`) }}
			</label>

		</div> 

		<div class="flex flex-col flex-wrap col-span-12 mt-2 sm:col-start-1 ">
			
			<label class="form-label text-base my-auto w-[19rem] text-lg font-medium">
				<input 
					class="form-control form-check-input w-[1.2rem] h-[1.2rem] mr-1" 
					type="checkbox"
					v-model="props.campaign.meta_logistic.is_free_delivery_for_how_many_order_minimum"
					/>
				{{$t('create_campaign.delivery_form.free_delivery_for_minimum_order')}}
			</label>

			<input 
				class="w-full form-control mt-2"
				type="text"
				v-model="props.campaign.meta_logistic.free_delivery_for_how_many_order_minimum"
				@blur="props.v.meta_logistic.free_delivery_for_how_many_order_minimum.$touch()"
			/> 
			<label class="text-danger text-[12px] " 
				v-for="error,index in props.v.meta_logistic.free_delivery_for_how_many_order_minimum.$errors"
				:key="index"
				>
				{{ $t(`create_campaign.delivery_form.errors.${error.$validator}`) }}
			</label>      
		</div> 
		
		<div class="flex flex-wrap justify-between col-span-12 col-start-1 mt-5 "> 
			<label for="regular-form-2" class="text-base font-bold form-label my-auto">{{$t('create_campaign.delivery_form.options')}}</label>
			<button 
				class="inline-block rounded-lg btn btn-primary ml-auto lg:w-48 h-[42px] sm:mt-auto" 
				@click="addDelivery()"
			>
				{{$t('create_campaign.delivery_form.add_more_delivery_option')}}
			</button>
			<!-- <a 
				class="whitespace-nowrap font-medium"
				@click="addDelivery"
			> <u> + {{$t('create_campaign.delivery_form.add_more_delivery_option')}} </u> 
			</a> -->
		</div>
		<div v-for="(option, index) in props.campaign.meta_logistic.additional_delivery_options" class="col-span-12" :key="index">
			<div class="flex flex-col flex-wrap gap-3 mt-5 sm:flex-row sm:mt-0 ">

				<div>
					<input  
						class="flex-1 w-full text-base form-control sm:w-fit"
						type="text" 
						placeholder="eg : Delivery Service"
						v-model="option.title"
					/>
					<label class="text-danger text-[12px]  block" 
						v-for="error,index in props.v.meta_logistic.additional_delivery_options.$each.$response.$errors[index].title"
						:key="index"
						>
						{{ $t(`create_campaign.delivery_form.errors.${error.$message.replace(/\s/g, "_")}`) }}
					</label>
				</div>

				<div>
					<select 
						class="flex-1 w-full form-select-md sm:form-select-lg rounded-lg sm:w-fit"
						v-model="option.type"
					>
						<option value="+">{{$t('create_campaign.delivery_form.on_top_of_delivery_charge')}}</option>
						<option value="=">{{$t('create_campaign.delivery_form.replace_delivery_charge')}}</option>
					</select>
					<label class="text-danger text-[12px] block" 
						v-for="error,index in props.v.meta_logistic.additional_delivery_options.$each.$response.$errors[index].type"
						:key="index"
						>
						{{ $t(`create_campaign.delivery_form.errors.${error.$message.replace(/\s/g, "_")}`) }}
					</label>
				</div>
				

				<div>
					<input  
						class="w-full form-control flex-2 sm:w-fit"
						type="text" 
						placeholder="eg : 10"
						v-model="option.price"
					/>
					<label class="text-danger text-[12px]  block" 
						v-for="error,index in props.v.meta_logistic.additional_delivery_options.$each.$response.$errors[index].price"
						:key="index"
						>
						{{ $t(`create_campaign.delivery_form.errors.${error.$message.replace(/\s/g, "_")}`) }}
					</label>
				</div>
				

				<button 
					class="btn btn-danger inline-block text-base w-full sm:w-24 ml-auto h-[42px]" 
					@click="deleteDelivery(index)"
				> {{$t('create_campaign.delivery_form.delete')}} </button>
			</div>
		</div>
		
		<!-- delivery date -->
		<div class="flex flex-wrap justify-between col-span-12 col-start-1 mt-5 ">
			<label for="regular-form-2" class="text-base font-bold form-label my-auto">{{$t('create_campaign.delivery_form.delivery_date')}}</label>
		</div>
		<div class="col-span-12">
			<div class="flex flex-col flex-wrap gap-3 mt-5 sm:flex-row sm:mt-0 ">
				<v-date-picker class="z-49" 
					v-model="deliverydatePicker" 
					:timezone="timezone" 
					:columns="$screens({ default: 1, sm: 2 })" 
					mode="datetime" is-range is-required is24hr
					:min-date='new Date()'
					>
					<template v-slot="{ inputValue, inputEvents }">
						<div class="flex items-center justify-center">
						<input :value="inputValue.start" v-on="inputEvents.start"
							class="form-control border h-[42px] px-2 py-1 w-42 rounded focus:outline-none focus:border-indigo-300" />
						<ChevronsRightIcon class="w-8 h-8 m-1" />
						<input :value="inputValue.end" v-on="inputEvents.end" disabled
							class="form-control border h-[42px] px-2 py-1 w-42 rounded focus:outline-none focus:border-indigo-300" />
						</div>
					</template>
				</v-date-picker>
			</div>
		</div>
		
		<div class="flex justify-between col-span-12 col-start-1 mt-5"> 
			<label for="regular-form-2" class="text-base font-bold form-label my-auto">{{$t('create_campaign.delivery_form.store_collection')}}</label>
			<button 
				class="inline-block rounded-lg btn btn-primary sm:ml-auto lg:w-48 h-[42px] sm:mt-auto" 
				@click="addBranch()"
			>
				{{$t('create_campaign.delivery_form.add_more_pickup_option')}}
			</button>
			<!-- <a 
				class="whitespace-nowrap font-medium"
				@click="addBranch()"
			> <u> + {{$t('create_campaign.delivery_form.add_more_pickup_option')}}  </u> 
			</a> -->
		</div>
		<div class="grid grid-cols-12 col-span-12 gap-1 text-base intro-y sm:gap-5 -z-50">
            <div v-for="(option, index) in props.campaign.meta_logistic.pickup_options" class="col-span-12 gap-3" :key="index">
				<div class="flex flex-col flex-wrap gap-3 mt-5 sm:flex-row sm:mt-0 ">
                    <div class="flex flex-col flex-1">
						<label class="text-base text-lg font-medium whitespace-nowrap">{{$t('create_campaign.delivery_form.pickup_store')}}</label>
                        <input 
                            class="w-full text-base form-control sm:mt-0"
                            type="text"
                            v-model="option.name" 
                        />

						<label class="text-danger text-[12px] " 
							v-for="error,index in props.v.meta_logistic.pickup_options.$each.$response.$errors[index].name"
							:key="index"
							>
							{{ $t(`create_campaign.delivery_form.errors.${error.$message.replace(/\s/g, "_")}`) }}
						</label>

                    </div>
                    <div class="flex flex-col flex-wrap  flex-grow-2">
                        <label class="text-base text-lg font-medium whitespace-nowrap">{{$t('create_campaign.delivery_form.pickup_address')}}</label>
                        <input 
                            class="w-full mr-5 text-base form-control sm:mt-0"
                            type="text" 
                            v-model="option.address"
                        />
						<label class="text-danger text-[12px] " 
							v-for="error,index in props.v.meta_logistic.pickup_options.$each.$response.$errors[index].address"
							:key="index"
							>
							{{ $t(`create_campaign.delivery_form.errors.${error.$message.replace(/\s/g, "_")}`) }}
						</label>
						
                    </div>
					<!-- pickup date  -->
					<div class="flex flex-col flex-wrap  flex-grow-2">
						<label class="text-base text-lg font-medium whitespace-nowrap">{{$t('create_campaign.delivery_form.pickup_date')}}</label>
                        <v-date-picker class="z-49" 
							v-model="pickupdatePicker[index]"
							:timezone="timezone" 
							:columns="$screens({ default: 1, sm: 2 })" 
							mode="datetime" is-range is-required is24hr
							:min-date='new Date()'
							>
							<template v-slot="{ inputValue, inputEvents }">
								<div class="flex items-center justify-center">
								<input :value="inputValue.start" v-on="inputEvents.start"
									class="form-control border h-[42px] px-2 py-1 w-42 rounded focus:outline-none focus:border-indigo-300" />
								<ChevronsRightIcon class="w-8 h-8 m-1" />
								<input :value="inputValue.end" v-on="inputEvents.end" disabled
									class="form-control border h-[42px] px-2 py-1 w-42 rounded focus:outline-none focus:border-indigo-300" />
								</div>
							</template>
						</v-date-picker>
                    </div>
                    <button 
                        class="inline-block w-full rounded-lg btn btn-danger sm:ml-auto sm:w-24 h-[42px] mt-auto lg:mt-6" 
                        @click="deleteBranch(index)"
                        >
                        {{$t('create_campaign.delivery_form.delete')}}
                    </button>
                </div>
            </div>
        </div>
		<!-- <template v-if="props.campaign.country=='TW'">
		<div class="col-span-12 flex mt-5 lg:mb-5 lg:mt-0">
			<input 
				class="form-check-input ml-3 w-[1.5rem] h-[1.5rem]" 
				type="checkbox"
				v-model="props.campaign.meta_logistic.ecpay_delivery_enable"
			/>
			<label class="ml-3 form-label">啟用綠界物流</label>
		</div>
		<div class="col-span-12 my-5 lg:my-0 p-5 rounded-md border-2 border-slate">
			<div 
			class="flex-col flex gap-2 my-2 intro-y w-full" 
			>
			<label class="mt-5 lg:mt-0">商店代號</label>
				<input 
					class="col-span-12 -mt-3 form-control lg:mt-0 lg:w-5/6" 
					type="text"
					v-model="props.campaign.meta_logistic.ecpay_merchant_id"
				/>
			<label class="mt-5 lg:mt-0">物流 Hash Key</label>
				<input 
					class="col-span-12 -mt-3 form-control lg:mt-0 lg:w-5/6" 
					type="text"
					v-model="props.campaign.meta_logistic.ecpay_delivery_hash_key"
				/>
			<label class="mt-5 lg:mt-0">物流 Hash IV</label>
				<input 
					class="col-span-12 -mt-3 form-control lg:mt-0 lg:w-5/6" 
					type="text"
					v-model="props.campaign.meta_logistic.ecpay_delivery_hash_iv"
				/>
			</div>
		</div>
		</template> -->
	</div>
</template>

<script setup>
import { ref, reactive, onMounted, watch, computed, watchEffect, defineProps } from 'vue';

import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';

import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";


const additional_delivery_option = { title: null, type: null, price: null }
const branch_option = { name: null, address: null, start_at:null, end_at:null }
const ready = ref(false)
const get_props = ref(false)
const deliverydatePicker = ref({
	start:new Date(),
	end:new Date()
})
const pickupdatePicker = ref([])
onMounted(()=>{
	ready.value=true
	update_pickupdatePicker()
})
const props = defineProps({
    campaign: Object,
	v:Object
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

watch(computed(()=>props.campaign.meta_logistic.pickup_options),()=>{
	if (get_props.value==false){
		update_pickupdatePicker()
	}
},{deep:true})

watch(computed(()=>deliverydatePicker.value),()=>{
	props.campaign.meta_logistic.delivery_date.start_at = deliverydatePicker.value.start
	props.campaign.meta_logistic.delivery_date.end_at = deliverydatePicker.value.end
},{deep:true})

watch(computed(()=>pickupdatePicker.value),()=>{
	console.log(pickupdatePicker.value)
	if (get_props.value==true){
		for (let index = 0; index<props.campaign.meta_logistic.pickup_options.length;index++){
			props.campaign.meta_logistic.pickup_options[index].start_at = pickupdatePicker.value[index].start
			props.campaign.meta_logistic.pickup_options[index].end_at = pickupdatePicker.value[index].end
		}
	}
	
},{deep:true})


const update_pickupdatePicker = ()=>{
    for (let option = 0; option<props.campaign.meta_logistic.pickup_options.length;option++){
		pickupdatePicker.value.push({start:props.campaign.meta_logistic.pickup_options[option].start_at,end:props.campaign.meta_logistic.pickup_options[option].end_at})
	}
	get_props.value = true
}
</script>