<template>
	<div class="box grid grid-cols-12 gap-5 intro-y lg:mx-20 lg:px-40 px-5 py-10 mt-3" v-if="ready">
		<span class="col-span-12 text-xl font-medium leading-none lg:-mx-6">{{$t('create_campaign.delivery_form.delivery_detail')}}</span>
		<hr class="col-span-12 -mx-6" />
	
		<!-- Delivery charge setting-->
		<div class="col-span-12 sm:col-start-1 flex flex-col gap-3"> 
			<div class="flex flex-col flex-wrap">
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

			<div class="flex flex-col flex-wrap">
				
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
		</div>

		<div class="flex flex-row flex-wrap justify-between col-span-12 col-start-1 mt-5 gap-3">
			<label for="regular-form-2" class="text-base font-bold form-label my-auto mr-5">{{$t('create_campaign.delivery_form.options')}}</label>
			<button 
				class="inline-block rounded-lg btn btn-primary ml-auto lg:w-48 h-[42px] sm:mt-auto" 
				@click="addDelivery()"
			>
				{{$t('create_campaign.delivery_form.add_more_delivery_option')}}
			</button>
		</div>

		<div class="flex flex-row items-center gap-2">
			<input  
				class="form-control form-check-input w-[1.5rem] h-[1.5rem]"
				type="checkbox" 
				v-model="props.campaign.meta_logistic.is_self_delivery_enabled"
			/>
			<label class="text-base whitespace-nowrap text-lg font-medium">{{$t('create_campaign.delivery_form.enabled_delivery_charge')}}</label>
		</div>

		<!-- delivery date -->
		<div class="flex flex-col flex-wrap justify-between col-span-12 col-start-1 gap-2">
			<div class="flex flex-row gap-2 items-center"> 
				<input type="checkbox" class="form-control form-check-input w-[1.5rem] h-[1.5rem]" v-model="props.campaign.meta_logistic.is_use_delivery_date_enabled"/>
				<label class="text-base whitespace-nowrap text-lg font-medium">{{$t('create_campaign.delivery_form.delivery_date')}}</label>
			</div>
			<div 
				v-if="props.campaign?.meta_logistic?.is_use_delivery_date_enabled" 
				class="flex flex-col flex-wrap gap-3 mt-5 sm:flex-row sm:mt-0 z-50">
				<div class="flex flex-col w-full justify-start gap-2"> 
					<p> {{$t('campaign.meta_logistic.delivery_date.daterange')}}</p>
					<Litepicker v-model="props.campaign.meta_logistic.delivery_date.daterange" :options="{
					autoApply: false,
					singleMode: false,
					numberOfColumns: 2,
					numberOfMonths: 2,
					showWeekNumbers: true,
					dropdowns: {
						minYear: 1990,
						maxYear: null,
						months: true,
						years: true,
					},
					}" class="block form-control border h-[42px] px-2 py-1 w-42 rounded focus:outline-none focus:border-indigo-300 " />
					<p v-if="props.campaign?.meta_logistic?.is_use_delivery_date_enabled && !props.campaign?.meta_logistic?.delivery_date?.daterange " 
						class="text-danger">
						{{$t('create_campaign.delivery_form.errors.Value_is_required')}}</p>
				</div>

				<v-date-picker class="" 
					v-model="deliverydatePicker" 
					:timezone="timezone" 
					:columns="$screens({ default: 1, sm: 2 })" 
					mode="date" is-range is-required is24hr
					:min-date='new Date()'
					v-show="false"
					>
					<template v-slot="{ inputValue, inputEvents }">
						<div class="flex items-center justify-center gap-1">
							<div class="flex flex-col relative">
								<p> From</p>
								<input :value="inputValue.start" v-on="inputEvents.start"
								class="form-control border h-[42px] px-2 py-1 w-42 rounded focus:outline-none focus:border-indigo-300" />
								<CalendarIcon class="hidden sm:block absolute right-2 bottom-2.5 text-slate-600"/>
							</div> 
							<ChevronsRightIcon class="w-8 h-8 mt-auto mb-1" />
							<div class="flex flex-col relative">
								<p> To</p>
								<input :value="inputValue.end" v-on="inputEvents.end" disabled
								class="form-control border h-[42px] px-2 py-1 w-42 rounded focus:outline-none focus:border-indigo-300" />
								<CalendarIcon class="hidden sm:block absolute right-2 bottom-2.5 text-slate-600"/> 
							</div>
						</div>
					</template>
				</v-date-picker>
				<div class="flex flex-col w-full justify-start"> 
					<p> {{$t('create_campaign.delivery_form.delivery_time_options')}}</p>
					<TomSelect
						v-model="props.campaign.meta_logistic.delivery_date.options"
						class="w-full"
						multiple
					>
					<option v-for=" option, index in optionsStore.deliveryTime" :key="index" :value="option.value"> {{ option.value }} </option> 
					</TomSelect>
					<p 
						v-if="props.campaign.meta_logistic.is_use_delivery_date_enabled 
						&& (props.campaign.meta_logistic.delivery_date.options?.length == 0 || props.campaign.meta_logistic.delivery_date.options == null) " 
						class="text-danger">
						{{$t('create_campaign.delivery_form.errors.Value_is_required')}}</p>
				</div>
			</div>
		</div>
		
		<!--default delivery -->
		<div class="flex flex-row gap-5 col-span-12 col-start-1">
			<div class="flex flex-col"> 
				<label class="w-fit text-base whitespace-nowrap">{{ $t('settings.delivery.title') }}</label>
				<input 
					class="w-32 form-control h-[35px] sm:h-[42px]"
					type="text" 
					v-model="props.campaign.meta_logistic.title"
				/>
			</div>
			<div class="flex flex-col">
				<label class="w-fit text-base whitespace-nowrap capitalize">{{ $t('settings.delivery.price') }}</label>
				<input 
					class="w-full form-control"
					type="number" 
					v-model.number="props.campaign.meta_logistic.delivery_charge"
					@blur="props.v.meta_logistic.delivery_charge.$touch()"
				/>
				<label class="text-danger text-[12px] " 
					v-for="error,index in props.v.meta_logistic.delivery_charge.$errors"
					:key="index"
					>
					{{ $t(`create_campaign.delivery_form.errors.${error.$validator}`) }}
				</label>
			</div>
		</div>
		
		<div class="col-span-12 flex flex-col flex-wrap gap-3">
			<div v-for="(option, index) in props.campaign.meta_logistic.additional_delivery_options" :key="index"
				class="flex flex-col flex-wrap gap-3 mt-5 sm:flex-row sm:mt-0" >
				<template v-for="(field, fkey, findex) in additional_delivery_option" :key="findex">
					<template v-if="fkey == 'region'">
						<div>
							<input  
								class="flex-1 w-full text-base form-control sm:w-fit"
								type="text" 
								placeholder="Region"
								v-model="option.region"
							/>
							<label class="text-danger text-[12px]  block" 
								v-for="error,index in props.v.meta_logistic.additional_delivery_options.$each.$response.$errors[index].region"
								:key="index"
								>
								{{ $t(`create_campaign.delivery_form.errors.${error.$message.replace(/\s/g, "_")}`) }}
							</label>
						</div>
					</template>
					<template v-if="fkey == 'title'">
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
					</template>
					<template v-if="fkey == 'type'">
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
					</template>
					<template v-if="fkey == 'price'">
						<div>
							<input  
								class="w-full form-control flex-2 sm:w-fit"
								type="text" 
								placeholder="delivery price"
								v-model="option.price"
							/>
							<label class="text-danger text-[12px]  block" 
								v-for="error,index in props.v.meta_logistic.additional_delivery_options.$each.$response.$errors[index].price"
								:key="index"
								>
								{{ $t(`create_campaign.delivery_form.errors.${error.$message.replace(/\s/g, "_")}`) }}
							</label>
						</div>
					</template>
					<template v-if="fkey == 'is_cvs'">
						<div class="flex flex-row items-center">
							<input  
								class="w-10 h-10 form-control w-[1.5rem] h-[1.5rem]"
								type="checkbox" 
								:placeholder="$t('settings.delivery_form.express_charge')"
								v-model="option.is_cvs"
							/>
							<label class="text-[16px] ml-2" 
								>{{ $t("settings.delivery.own_delivery.is_cvs") }}
							</label>                    
						</div>
						<div>
							<select 
								:disabled="option.is_cvs !== true"
								class="flex-1 w-full rounded-lg form-select sm:form-select-lg sm:w-fit"
								v-model="option.cvs_key"
							>   
								<option :value="undefined">{{ $t('settings.delivery.own_delivery.turn_on_cvs_map') }}</option>
								<template v-for="(cvs_option, option_index) in csvOptions" :key="option_index">
									<option :value="cvs_option.key">{{ $t('settings.delivery.own_delivery.cvs_map')+":"+cvs_option.name }}</option>
								</template>
							</select>
						</div>
					</template>
				</template>
				<button 
					class="btn btn-danger inline-block text-base w-full sm:w-24 ml-auto h-[42px]" 
					@click="deleteDelivery(index)"
				> {{$t('create_campaign.delivery_form.delete')}} </button>
			</div>
		</div>

		<!-- PickUp options-->
		<div class="flex justify-between col-span-12 col-start-1 mt-5"> 
			<label for="regular-form-2" class="text-base font-bold form-label my-auto">{{$t('create_campaign.delivery_form.store_collection')}}</label>
			<button 
				class="inline-block rounded-lg btn btn-primary sm:ml-auto lg:w-48 h-[42px] sm:mt-auto" 
				@click="addBranch()"
			>
				{{$t('create_campaign.delivery_form.add_more_pickup_option')}}
			</button>
		</div>
		<div class="flex flex-row items-center">
			<input  
				class="form-control form-check-input w-[1.5rem] h-[1.5rem] mr-1"
				type="checkbox" 
				v-model="props.campaign.meta_logistic.is_store_pickup_enabled"
			/>
			<label class="text-base whitespace-nowrap text-lg font-medium">{{$t('create_campaign.delivery_form.enabled_store_collection')}}</label>
		</div>
		<div class="grid grid-cols-12 col-span-12 text-base intro-y gap-4 sm:gap-2 2xl:gap-3 z-10">
            <div v-for="(option, index) in props.campaign.meta_logistic.pickup_options" class="col-span-12 my-5" :key="index">
				<div class="flex flex-col flex-wrap gap-3">
					<div class="flex flex-col sm:flex-row flex-wrap gap-3 w-full"> 
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
						<button 
							class="hidden sm:inline-block w-full rounded-lg btn btn-danger sm:ml-auto sm:w-24 h-[42px] mt-auto" 
							@click="deleteBranch(index)"
							>
							{{$t('create_campaign.delivery_form.delete')}}
						</button>
					</div>
					<!-- pickup date  -->
					<div class="flex flex-col xl:flex-row gap-3 w-full">
						<div id="pickup_options" class="flex flex-col flex-wrap flex-none max-w-[500px]">
							<label class="text-base text-lg font-medium whitespace-nowrap">{{$t('create_campaign.delivery_form.pickup_date')}}
								{{props.campaign.meta_logistic.pickup_options[index]?.start_at!==null?'( '+new Date(props.campaign.meta_logistic.pickup_options[index]?.start_at).toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"})
								+'~'+new Date(props.campaign.meta_logistic.pickup_options[index].end_at).toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"})+' )':''}}
							</label>
							<v-date-picker class="" 
								v-model="pickupdatePicker[index]"
								:columns="$screens({ default: 1, sm: 2 })" 
								mode="date" is-range is-required
								:min-date='new Date()'
								>
								<template v-slot="{ inputValue, inputEvents }">
									<div class="flex items-center justify-start gap-1 flex-0 ">
										<div class="flex flex-col relative">
											<input :value="inputValue.start" v-on="inputEvents.start"
											class="form-control border h-[42px] px-2 py-1 w-42 rounded-md focus:outline-none focus:border-indigo-300" />
											<CalendarIcon class="hidden sm:block absolute right-2 bottom-2.5 text-slate-600"/>
										</div> 
										<ChevronsRightIcon class="w-8 h-8" />
										<div class="flex flex-col relative">
											<input :value="inputValue.end" v-on="inputEvents.end" disabled
											class="form-control border h-[42px] px-2 py-1 w-42 rounded-md focus:outline-none focus:border-indigo-300" />
											<CalendarIcon class="hidden sm:block absolute right-2 bottom-2.5 text-slate-600"/> 
										</div>
									</div>
								</template>
							</v-date-picker>
						</div>
						<div class="flex flex-col w-full justify-start"> 
							<p> {{$t('create_campaign.delivery_form.pickup_time_options')}}</p>
							<TomSelect
								v-model="props.campaign.meta_logistic.pickup_options[index].options"
								class="w-full"
								multiple
							>
								<option v-for=" option, index in optionsStore.deliveryTime" :key="index" :value="option.value"> {{ option.value }} </option> 
							</TomSelect>
							<p v-if="
							props.campaign.meta_logistic.pickup_options[index].start_at && 
							(props.campaign.meta_logistic?.pickup_options[index]?.options?.length == 0 || props.campaign.meta_logistic.pickup_options[index].options == null)" 
							class="text-danger">
							{{$t('create_campaign.delivery_form.errors.Value_is_required')}}</p>
						</div>
						<button 
							class="inline-block sm:hidden w-full rounded-md btn btn-danger sm:ml-auto sm:w-24 h-[42px] mt-auto" 
							@click="deleteBranch(index)"
							>
							{{$t('create_campaign.delivery_form.delete')}}
						</button>
					</div>
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
import { useLSSOptionsStore } from '@/stores/lss-options';

import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { end } from '@popperjs/core';

const daterange = ref([])

const layoutStore = useLSSSellerLayoutStore();
const optionsStore = useLSSOptionsStore();
const branch_option = { name: null, address: null, start_at:null, end_at:null }
const ready = ref(false)
const get_props = ref(false)
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
const pickupdatePicker = ref([])
onMounted(()=>{
	ready.value=true
	update_deliverydatePicker()
	update_pickupdatePicker()
})
const props = defineProps({
    campaign: Object,
	v:Object
});

const additional_delivery_option = computed(()=>{
	var options = { region:null,title: null, type: null, price: null}
	if(layoutStore.userInfo.user_subscription.meta_country.activated_country.includes('TW')){
		Object.assign(options,{is_cvs:false})
	}
	return options
})

const csvOptions = ref([
    {"key": "FAMIC2C", "name": "全家店到店"},
    {"key": "UNIMARTC2C", "name": "7-11店到店"},
    {"key":"HILIFEC2C", "name":"萊爾富店到店"},
    {"key":"OKMARTC2C", "name":"OK店到店"}
])



const addDelivery = () =>{
    props.campaign.meta_logistic.additional_delivery_options.unshift(Object.assign({},additional_delivery_option.value))
}

const deleteDelivery = index=>{ 
    props.campaign.meta_logistic.additional_delivery_options.splice(index,1)
}

const addBranch = ()=>{
    props.campaign.meta_logistic.pickup_options.unshift(Object.assign({},branch_option))
	pickupdatePicker.value.unshift({start:null,end:null})
}
const deleteBranch = index=>{
    props.campaign.meta_logistic.pickup_options.splice(index,1)
	pickupdatePicker.value.splice(index,1)
}


// DELIVERY DATE/TIME
const useDeliveryDate = ref(false)
const deliverydatePicker = ref({
	start:'',
	end:''
})
const deliveryTimeOptions = ref([])

const useDeliveryDateComputed = computed({
	get:()=>{
		return useDeliveryDate.value
	},set:index=>{
		useDeliveryDate.value = index
		if(!index){
			deliverydatePicker.value.start = ''
			deliverydatePicker.value.end = ''
		}
	}
})

watch(computed(()=>deliverydatePicker.value),()=>{
	props.campaign.meta_logistic.delivery_date.start_at = deliverydatePicker.value.start
	props.campaign.meta_logistic.delivery_date.end_at = deliverydatePicker.value.end
},{deep:true})


const update_deliverydatePicker = ()=>{
	let delivery_date = props.campaign.meta_logistic.delivery_date

	deliverydatePicker.value.start = (delivery_date?.start_at||null)
	deliverydatePicker.value.end = (delivery_date?.end_at||null)

	if(deliverydatePicker.value.start !== null) useDeliveryDate.value = true
}


// PICKUP DATE/TIME
watch(computed(()=>props.campaign.meta_logistic.pickup_options),()=>{
	if (pickupdatePicker.value.length === 0){
		update_pickupdatePicker()
	}
},{deep:true})

watch(computed(()=>pickupdatePicker.value),()=>{
	// console.log(pickupdatePicker.value)
	if (get_props.value==true){
		for (let index = 0; index<props.campaign.meta_logistic.pickup_options.length;index++){
			props.campaign.meta_logistic.pickup_options[index].start_at = pickupdatePicker.value[index].start
			props.campaign.meta_logistic.pickup_options[index].end_at = pickupdatePicker.value[index].end
		}
	}
	
},{deep:true})

const update_pickupdatePicker = ()=>{
    for (let option = 0; option<props.campaign.meta_logistic.pickup_options.length;option++){
			pickupdatePicker.value.push({start:props.campaign.meta_logistic.pickup_options[option].start_at?props.campaign.meta_logistic.pickup_options[option].start_at:null,
				end:props.campaign.meta_logistic.pickup_options[option].end_at?props.campaign.meta_logistic.pickup_options[option].end_at:null})
	}
	console.log(pickupdatePicker.value)
	get_props.value = true
}
</script>