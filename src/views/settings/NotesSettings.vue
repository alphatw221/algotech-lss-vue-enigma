<template>
    <div class="py-5 sm:p-8 sm:py-5 px-2 lg:px-10 text-sm sm:text-lg ">


    <!-- SHOPPINGCART-->
    <div class="flex flex-col md:flex-row justify-between gap-10 my-5"> 
        <label class="whitespace-nowrap w-60 text-[18px]"> Shopping Cart settings</label>
        <div class="flex flex-col gap-5 w-full"> 
            <div class="flex form-label text-base font-medium">{{$t("settings.localization.currency_symbol")}}</div>
            <TomSelect v-model="generalInfo.currency" :options="{
                        placeholder: $t('settings.localization.choose_currency_symbol'),
                        }" class="w-full -mt-5">
                <option :value="option.value" v-for="(option,index) in currencySymbols" :key="index">{{option.text}}</option>
            </TomSelect>

            <div class="flex text-base font-medium">
                <div class="my-auto w-32"> {{$t("settings.localization.buyer_language")}}</div>
                <Tippy 
                    class="rounded-full w-30 whitespace-wrap" 
                    data-tippy-allowHTML="true" 
                    data-tippy-placement="right" 
                    :content="$t('tooltips.settings.local.buyer_lang')" 
                    theme='light'
                > 
                    <HelpCircleIcon class="h-5 ml-1 mt-0.5 tippy-icon" />
                </Tippy> 
            </div>

            <TomSelect v-model="generalInfo.buyer_lang" :options="{
                        placeholder: $t('settings.localization.choose_language'),
                        }" class="w-full -mt-5">
                <option :value="option.value" v-for="(option,index) in languages" :key="index">{{$t(`settings.localization.languages.${option.value}`)}}</option>
            </TomSelect>

            <div class="flex form-label text-base font-medium">
                <div class="my-auto w-32"> {{$t("settings.localization.price_unit")}}</div>
                <Tippy 
                    class="rounded-full whitespace-wrap" 
                    data-tippy-allowHTML="true" 
                    data-tippy-placement="right" 
                    :content="$t('tooltips.settings.local.price_unit')" 
                > 
                    <HelpCircleIcon class="h-5 ml-1 mt-0.5 tippy-icon" />
                </Tippy> 
            </div> 
            <TomSelect v-model="generalInfo.price_unit" :options="{placeholder: $t('settings.localization.choose_price_unit')}" class="w-full -mt-5">
                <option :value="option.value" v-for="(option,index) in priceUnitOptions" :key="index">{{$t(`settings.localization.priceOptions.${option.key}`)}}</option>
            </TomSelect>

            <div class="flex form-label text-base font-medium"> {{$t("settings.localization.decimal_places")}}</div>

            <TomSelect v-model="generalInfo.decimal_places" :options="{placeholder: $t('settings.localization.choose_decimal_places')}" class="w-full -mt-5">
                <option :value="option.value" v-for="(option,index) in decimalOptions" :key="index">{{option.text}}</option>
            </TomSelect>
        </div>
    </div>
    
    <div class="w-full border-t border-slate-300/60 dark:border-darkmode-400 my-10"></div>

    <!--POINTS-->
    <div class="flex flex-col md:flex-row justify-between gap-10 my-5">
        <label class="whitespace-nowrap w-60 text-[18px]"> Points Settings</label>
        <div class="flex flex-col gap-5 w-full">
            <div class="flex flex-row md:flex-col w-full justify-between md:gap-1"> 
                <label class="w-fit whitespace-nowrap form-label text-base font-medium my-auto"> Point Validity (Month)</label>
                <select 
                    class="rounded-lg form-select sm:form-select-lg w-32 md:w-60"
                    v-model="points.period"
                >
                    <option :value="0"> Unlimited</option>
                    <template v-for="index in 12" :key="index"> 
                        <option :value="index">{{index}}</option>
                    </template>
                </select>
            </div>
            
            <div class="flex flex-row justify-between"> 
                <label class="w-fit whitespace-nowrap form-label text-base font-medium my-auto"> Reward Point Table</label>
                <button class="btn btn-primary w-32 h-[35px]" @click="addPoints()"> Add</button>
            </div>
            
            <div class="flex flex-row flex-wrap gap-3 mt-5 sm:flex-row sm:mt-0" 
                v-for="(option, index) in points.additional_points_options" :key="index">
                <div class="w-full gap-2"> 
                    <label class="w-fit whitespace-nowrap form-label text-base my-auto text-[14px] md:text-[16px]"> SGD</label>
                    <input  
                    class="w-24 md:w-32 form-control flex-2 "
                    type="text" 
                    v-model="option.startFrom"
                    />
                    <label class="w-fit whitespace-nowrap form-label text-base my-auto text-[14px] md:text-[16px]"> ~ SGD</label>
                    <input  
                    class="w-24 form-control flex-2 "
                    type="text" 
                    v-model="option.endAt"
                    />
                </div>
                
                <ChevronsRightIcon class="my-auto"/>
                
                <input  
                    class="w-32 form-control flex-2 "
                    type="text" 
                    v-model="option.amount"
                />
                <select 
                    class="flex-1 w-32 rounded-lg form-select sm:form-select-lg "
                    v-model="option.type"
                >
                    <option value="percent">% of amount</option>
                    <option value="points">points</option>
                </select>
            
                
                <button 
                    class="inline-block w-full h-[42px] ml-auto text-base btn btn-danger sm:rounded-lg sm:w-24" 
                    @click="deleteDelivery(index)"
                >
                <!-- delete additional_delivery[index] -->
                    {{ $t('settings.delivery_form.delete') }}
                </button>
            </div>

            <label class="w-fit whitespace-nowrap form-label text-base font-medium mt-3"> Point Redemption Rate</label>

            <div class="flex flex-row gap-1 md:gap-3 -mt-3" >
                <!-- v-for="(option, index) in deliverySettings.additional_delivery_options" :key="index"> -->
                <div class="flex flex-1 flex-row gap-3 md:max-w-1/4"> 
                    <input  
                    class="w-14 md:w-32 form-control flex-1"
                    type="text" 
                    v-model="points.redeem_points"
                    />
                    <label class="w-fit flex-0 whitespace-nowrap form-label text-base my-auto text-[14px] md:text-[16px]"> point(s)</label>
                </div>
                
                <ChevronsRightIcon class="my-auto flex-0 w-8"/>
                
                <div class="flex flex-1 flex-row gap-3 md:max-w-1/4"> 
                    <label class="w-fit flex-0 whitespace-nowrap form-label text-base my-auto text-[14px] md:text-[16px]"> SGD</label>
                    <input  
                        class="w-14 md:w-32 form-control flex-1"
                        type="text" 
                        v-model="points.redeem_cash"
                    />
                </div>
            </div>

            <label class="w-fit whitespace-nowrap form-label text-base font-medium mt-3"> Points Desciption (顯示在買家點數紀錄頁)</label>

            <textarea 
                class="h-48 p-2 mr-5 form-control -mt-3" 
                placeholder="xxx"
                v-model=" points.note"
            >
            </textarea>
        </div> 

    </div>
        

        <div class="w-full border-t border-slate-300/60 dark:border-darkmode-400 my-10"></div>

    <!-- NOTES-->
    <div class="flex flex-col md:flex-row justify-between gap-10 my-5"> 
        <label class="w-60 whitespace-nowrap text-[18px]"> Custom Notes Settings</label>
        <AccordionGroup class="accordion-boxed w-full">
            <AccordionItem>
                <Accordion>
                    <div class="flex">
                        <div class="mr-auto"> 
                            <span class="form-label text-base font-medium"> {{$t('settings.notes.delivery_note')}}</span> <br> 
                            <span class="text-slate-400 break-all">
                                {{ generalInfo.delivery_note }}
                            </span>
                        </div>
                        <div>
                            <Tippy  :content="$t('settings.notes.modify')" :options="{ theme: 'light' }"> <SimpleIcon icon="edit" color="#334155"/> </Tippy>
                        </div>
                    </div>
                </Accordion>
                <AccordionPanel class="leading-relaxed text-slate-600 dark:text-slate-500">
                    <textarea 
                        class="h-48 p-2 mr-5 form-control"
                        :placeholder="$t('tooltips.settings.note.delivery_note')"
                        v-model="generalInfo.delivery_note"
                    >
                    </textarea>
                </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
                <Accordion>
                    <div class="flex">
                        <div class="mr-auto"> 
                            <span class="form-label text-base font-medium"> {{$t('settings.notes.special_note')}}</span> <br> 
                            <span class="whitespace-normal text-slate-400  break-all">
                                {{ generalInfo.special_note }}
                            </span>
                        </div>
                        <div>
                            <Tippy  :content="$t('settings.notes.modify')" :options="{ theme: 'light' }"> <SimpleIcon icon="edit" color="#334155"/> </Tippy>
                        </div>
                    </div>
                </Accordion>
                <AccordionPanel class="leading-relaxed text-slate-600 dark:text-slate-500">
                    <textarea 
                        class="h-48 p-2 mr-5 form-control" 
                        :placeholder="$t('tooltips.settings.note.special_note')"
                        v-model=" generalInfo.special_note"
                    >
                    </textarea>
                </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
                <Accordion>
                    <div class="flex">
                        <div class="mr-auto"> 
                            <span class="form-label text-base font-medium"> {{$t('settings.notes.confirmation_note')}}</span> <br> 
                            <span class="text-slate-400  break-all"> 
                                {{  generalInfo.confirmation_note }}
                            </span>
                        </div>
                        <div>
                            <Tippy  :content="$t('settings.notes.modify')" :options="{ theme: 'light' }"> <SimpleIcon icon="edit" color="#334155"/> </Tippy>
                        </div>
                    </div>
                </Accordion>
                <AccordionPanel class="leading-relaxed text-slate-600 dark:text-slate-500">
                    <textarea 
                        class="h-48 p-2 mr-5 form-control"
                        :placeholder="$t('tooltips.settings.note.confirm_note')"
                        v-model="generalInfo.confirmation_note"
                    >
                    </textarea>
                </AccordionPanel>
            </AccordionItem>
        </AccordionGroup>
    </div>
        
    <div class="mt-5 flex text-[14px] justify-end">
        <!-- <button class="w-32 btn dark:border-darkmode-400" @click="discard"> {{$t('settings.notes.discard')}}</button> -->
        <button class="w-32 ml-5 shadow-md btn btn-primary" @click="update"> {{$t('settings.notes.save')}} </button>
    </div>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { get_general_info, update_general_info } from '@/api_v2/user_subscription'
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import i18n from "@/locales/i18n"
import SimpleIcon from '../../global-components/lss-svg-icons/SimpleIcon.vue';


const layoutStore = useLSSSellerLayoutStore();

//之後這邊改成 綁layoutStore裡面的userInfo.user_subscription
const deliveryNote = ref('')
const specialNote = ref('')
const confirmationNote = ref('')


// shopping cart
const countries = ref({'PH':'Philippines','SG':'Singapore','ID':'Indonesia','IN':'India','TW':'Taiwan'})

const currencySymbols = ref([
    {value:'USD',text:'USD'},
    {value:'NTD',text:'NTD'},
    {value:'SGD',text:'SGD'},
    {value:'IDR',text:'IDR'},
    {value:'PHP',text:'PHP'},
    {value:'MYR',text:'MYR'},
    {value:'VND',text:'VND'},
    {value:'RMB',text:'RMB'},
    {value:'KHR',text:'KHR'},
    {value:'AUD',text:'AUD'},
    {value:'HKD',text:'HKD'}])

const priceUnitOptions = ref([
    {key:'1',value:'1'},
    {key:'1000',value:'1000'},
    {key:'1000000',value:'1000000'},
])

const languages = ref([
    {value:'en',text:'English'},
    {value:'zh_hans',text:'Chinese-simplify'},
    {value:'zh_hant',text:'Chinese-tranditional'},
    {value:'vi',text:'Vietnamese'},
    // {value:'id',text:'Indonesian'}
])

const decimalOptions = ref([
    {value:'2',text:'0.01'},
    {value:'0',text:'1'},
    ])

const generalInfo = ref({
    currency:'USD', 
    lang:'en', 
    buyer_lang:'en', 
    decimal_places:'0', 
    price_unit:'1',
    confirmation_note:'',
    delivery_note:'',
    confirmation_note:''})


//points

const points = reactive({
    period: '',
    note:'',
    additional_points_options:[{ startFrom: null, endAt: null, type: null, amount:null }],
    startFrom:'',
    endAt:'',
    type:'', 
    amount:'',
    redeem_points:'',
    redeem_cash:''
})

const additional_points_option = { startFrom: null, endAt: null, type: null, amount:null }

const deleteDelivery = index=>{ 
    points.additional_points_options.splice(index,1)
}

const addPoints = () =>{
    points.additional_points_options.unshift( Object.assign({},additional_points_option) )
}



onMounted(() => {
    get_general_info(layoutStore.alert).then(response => {

        generalInfo.value = response.data
        generalInfo.value.decimal_places = response.data.decimal_places.toString()  //temp   TomSelect only work with string value

        // console.log(generalInfo.value)
    })
    
})



const update = () => {
    update_general_info(generalInfo.value, layoutStore.alert).then(res => {
        layoutStore.userInfo = res.data
        layoutStore.notification.showMessageToast(i18n.global.t('settings.update_successfully'))
    })
}


</script>
