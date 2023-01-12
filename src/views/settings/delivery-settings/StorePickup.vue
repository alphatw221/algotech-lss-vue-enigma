<template>
    <div class="py-5 sm:p-10 sm:p-5">
        <div class="flex flex-row justify-start my-5 lg:mt-0 items-center gap-3">
            <input 
                class="form-check-input w-[1.5rem] h-[1.5rem]" 
                type="checkbox" 
                v-model="pickupSettings.is_store_pickup_enabled"
            />
            <label class="text-[16px]">{{ $t('settings.delivery_form.enabled') }}</label>
        </div>

        <span class="mb-3 text-lg sm:text-xl font-medium leading-none">{{ $t('settings.delivery.store.collection') }}</span>

        <div class="flex flex-wrap justify-between my-5"> 
            <button 
                class="inline-block rounded-lg btn btn-primary sm:mr-auto w-fit text-sm sm:text-[16px]" 
                @click="addBranch()"
            >
                {{ $t('settings.delivery_form.add_more_pickup_option') }}
            </button>
        </div>

        <div class="text-sm sm:text-[16px] flex flex-col gap-3 sm:gap-5 my-5">
            <template v-for="(option, index) in pickupSettings.pickup_options" :key="index">
                <div class="flex flex-col flex-wrap gap-3 sm:flex-row my-3">
                    <div class="flex flex-col flex-1">
                        <label class="text-base whitespace-nowrap">{{ $t('settings.delivery.store.pickup_store') }}</label> 
                        <input 
                            class="w-full h-[42px] text-base form-control"
                            type="text"
                            v-model="option.name" 
                        />
                        <label class="block text-danger text-[12px]" 
                            v-for="error, index in v.pickup_options.$each.$response.$errors[index].name"
                            :key="index"
                            >{{ $t(`settings.delivery.errors.${error.$message.replace(/\s/g, "_")}`) }}</label>
                    </div>
                    <div class="flex flex-col flex-wrap  flex-grow-1">
                        <label class="text-base text-lg font-medium whitespace-nowrap">{{$t('create_campaign.delivery_form.pickup_date')}}
                            {{option.start_at!==null?'( '+new Date(option.start_at).toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"})
                            +'~'+new Date(option.end_at).toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"})+' )':''}}
                        </label>
                        <v-date-picker class="" 
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

                    <div class="flex flex-col flex-wrap flex-grow-2">
                        <label class="text-base">{{ $t('settings.delivery.store.pickup_address') }}</label>
                        <div class="flex flex-row"> 
                            <input 
                            class="w-full h-[42px] sm:mr-5 text-base form-control"
                            type="text" 
                            v-model="option.address"
                            />
                            <button 
                                class="hidden sm:inline-block w-full btn btn-danger sm:ml-auto sm:rounded-lg sm:w-24 h-[42px]" 
                                @click="deleteBranch(index)"
                                >
                                {{ $t('settings.delivery_form.delete') }}
                            </button>
                        </div>
                        <label class="text-danger text-[12px]" 
                            v-for="error, index in v.pickup_options.$each.$response.$errors[index].address"
                            :key="index"
                            >{{ $t(`settings.delivery.errors.${error.$message.replace(/\s/g, "_")}`) }}</label>
                        <button 
                            class="inline-block sm:hidden w-full btn btn-danger sm:ml-auto sm:rounded-lg sm:w-24 h-[42px] mt-3" 
                            @click="deleteBranch(index)"
                            >
                            {{ $t('settings.delivery_form.delete') }}
                        </button>
                    </div>
                    
                </div>
            </template>
        </div>

        <div class="flex mt-5 float-right text-[14px]">
            <!-- <button 
                class="w-32 btn dark:border-darkmode-400 float-right"
                @click="discardDelivery"
            >
                {{ $t('settings.notes.discard') }}
            </button> -->
            <button 
                class="w-36 ml-5 shadow-md btn btn-primary float-right"
                @click="updatePickup()"
            >
                {{ $t('settings.delivery_form.delivery_method_settings_update') }}
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch, computed } from 'vue';
import { seller_update_delivery } from '@/api_v2/user_subscription'
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import i18n from '@/locales/i18n';

import { helpers, required} from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'

const layoutStore = useLSSSellerLayoutStore();

const pickupSettings = reactive({
    pickup_options: [],
    is_store_pickup_enabled:false
})
const pickupdatePicker = ref([])

const props = defineProps({
    logistic: Object,
});

const pickupSettingsRules = {
      pickup_options: {
        $each: helpers.forEach({
            name:{required},
            address: {required},
        })
      },
    }

const v = useVuelidate(pickupSettingsRules, pickupSettings)

const branch_option = { name: null, address: null ,start_at:null,end_at:null}

onMounted(() => {
    if(!layoutStore.userInfo.user_subscription)return

    Object.entries(pickupSettings).forEach(([key])=>{
        pickupSettings[key] = layoutStore.userInfo.user_subscription.meta_logistic[key]
    })
    // Object.assign(pickupSettings,JSON.parse(JSON.stringify(layoutStore.userInfo.user_subscription.meta_logistic)))
    // pickupSettings = JSON.parse(JSON.stringify(layoutStore.userInfo.user_subscription.meta_logistic))
    props.logistic.fields.forEach(field => {
        if(typeof pickupSettings[field.key]!=field.dataType) pickupSettings[field.key]=field.default
    });

    update_pickupdatePicker()

    // console.log(layoutStore.userInfo.user_subscription.meta_logistic)
    
})

const addBranch = ()=>{
    pickupSettings.pickup_options.unshift( Object.assign({},branch_option) )
    pickupdatePicker.value.unshift({start:null,end:null})
}
const deleteBranch = index=>{
    pickupSettings.pickup_options.splice(index,1)
    pickupdatePicker.value.splice(index,1)
}

const updatePickup = () => {
    console.log('PICKUP')
    v.value.$touch()
    // return
    if(v.value.$invalid){
        layoutStore.alert.showMessageToast("Invalid data")
        return
    }
    console.log(pickupSettings)
    seller_update_delivery(pickupSettings, layoutStore.alert).then(res=>{
        layoutStore.userInfo.user_subscription.meta_logistic = res.data.user_subscription.meta_logistic
        layoutStore.notification.showMessageToast(i18n.global.t('settings.update_successfully'))
    })
}


watch(computed(()=>layoutStore.userInfo.user_subscription.meta_logistic.pickup_options),()=>{
	if (pickupdatePicker.value.length === 0){
		update_pickupdatePicker()
	}
},{deep:true})

watch(computed(()=>pickupdatePicker.value),()=>{
	// console.log(pickupdatePicker.value)
	for (let index = 0; index<pickupSettings.pickup_options.length;index++){
            pickupSettings.pickup_options[index].start_at = pickupdatePicker.value[index].start
            pickupSettings.pickup_options[index].end_at = pickupdatePicker.value[index].end
		}
	
},{deep:true})

const update_pickupdatePicker = ()=>{
    let pickup_options = layoutStore.userInfo.user_subscription.meta_logistic?.pickup_options ? layoutStore.userInfo.user_subscription.meta_logistic?.pickup_options : {}
    for (let option = 0; option<pickup_options.length;option++){
			pickupdatePicker.value.push({start:layoutStore.userInfo.user_subscription.meta_logistic.pickup_options[option].start_at?layoutStore.userInfo.user_subscription.meta_logistic.pickup_options[option].start_at:null,
				end:layoutStore.userInfo.user_subscription.meta_logistic.pickup_options[option].end_at?layoutStore.userInfo.user_subscription.meta_logistic.pickup_options[option].end_at:null})
	}
	console.log(pickupdatePicker.value)
}
</script>