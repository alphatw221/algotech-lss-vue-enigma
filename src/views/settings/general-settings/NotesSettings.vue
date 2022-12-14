<template>
    <div class="py-5 sm:p-8 sm:py-5 px-2 lg:px-10 text-sm sm:text-lg ">
    <template v-for="(category, index) in computedCategorys" :key="index"> 
        <!-- SHOPPINGCART-->
        <template v-if="category.name == 'shoppingCart'">
            <div class="flex flex-col md:flex-row justify-between gap-5 my-5"> 
                <label class="w-72 text-xl"> {{$t("settings.localization.title")}}</label>
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
        </template>
        <!-- Points-->
        <template v-if="category.name == 'points'">
        <div class="w-full border-t border-slate-300/60 dark:border-darkmode-400 my-10"></div>
            <PointsSettingsVue :meta_point="generalInfo.meta_point" :status="'settings'" />
        </template>
        <!-- Messages-->
        <template v-if="category.name == 'messages'">
        <div class="w-full border-t border-slate-300/60 dark:border-darkmode-400 my-10"></div>
            <MessageSettingsVue :meta_reply="generalInfo.meta_reply" :status="'settings'" />
        </template>
        <!-- NOTES-->
        <template v-if="category.name == 'notes'">
            <div class="w-full border-t border-slate-300/60 dark:border-darkmode-400 my-10"></div>
            <div class="flex flex-col md:flex-row justify-between gap-5 my-5"> 
                <label class="w-72 text-xl"> {{$t('settings.notes.title')}}</label>
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
        </template>
    </template>
        
    <div class="mt-5 flex text-[14px] justify-end">
        <!-- <button class="w-32 btn dark:border-darkmode-400" @click="discard"> {{$t('settings.notes.discard')}}</button> -->
        <button class="w-32 ml-5 shadow-md btn btn-primary" @click="update"> {{$t('settings.notes.save')}} </button>
    </div>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive, computed } from 'vue';
import { get_general_info, update_general_info } from '@/api_v2/user_subscription'
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import i18n from "@/locales/i18n"
import PointsSettingsVue from './PointsSettings.vue';
import MessageSettingsVue from './MessageSettings.vue';

const layoutStore = useLSSSellerLayoutStore();

const computedCategorys = computed(()=>{
    var categorys = [ {name:'shoppingCart'},{name:'points'},{name:'messages'},{name:'notes'} ]
    if(layoutStore.userInfo?.user_subscription?.type === 'kol')categorys = categorys.filter(category=>category.name!='points')
    return categorys
})

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
    special_note:'',
    meta_point:{},   //temp
    meta_reply:{}
}) 


onMounted(() => {
    get_general_info(layoutStore.alert).then(response => {

        generalInfo.value = response.data
        generalInfo.value.decimal_places = response.data.decimal_places.toString()  //temp   TomSelect only work with string value

        // console.log('GERNERAL',generalInfo.value)
    })
    
})

const update = () => {
    console.log(generalInfo.value)
    update_general_info(generalInfo.value, layoutStore.alert).then(res => {
        layoutStore.userInfo = res.data
        document.querySelector('#lss-content').scrollTo(0, -70)
        layoutStore.notification.showMessageToast(i18n.global.t('settings.update_successfully'))
        // console.log(layoutStore.userInfo)
    })

}
</script>
