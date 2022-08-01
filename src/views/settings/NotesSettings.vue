<template>
    <div class="py-5 sm:p-8 sm:py-5 px-2 lg:px-10 text-sm sm:text-lg ">

        <div class="flex my-3 mt-5 form-label text-base font-medium">
            <div> {{$t("settings.localization.currency_symbol")}} </div>
        </div>
        <div class="flex my-1 ">
            <TomSelect v-model="generalInfo.currency" :options="{
                        placeholder: $t('settings.localization.choose_currency_symbol'),
                        }" class="w-full">
                <option :value="option.value" v-for="(option,index) in currencySymbols" :key="index">{{option.text}}</option>
            </TomSelect>
        </div>
        <div class="flex my-3 mt-5 form-label text-base font-medium">
            <div class="mr-5"> {{$t("settings.localization.buyer_language")}}</div>
        </div>
        <div class="flex my-1">
            <TomSelect v-model="generalInfo.buyer_lang" :options="{
                        placeholder: $t('settings.localization.choose_language'),
                        }" class="w-full">
                <option :value="option.value" v-for="(option,index) in languages" :key="index">{{$t(`settings.localization.languages.${option.value}`)}}</option>
            </TomSelect>
        </div>

        <div class="flex my-3 mt-5 form-label text-base font-medium">
            <div class="mr-5"> {{$t("settings.localization.price_unit")}}</div>
        </div>

        <div class="flex my-1">
            <TomSelect v-model="generalInfo.price_unit" :options="{placeholder: $t('settings.localization.choose_price_unit')}" class="w-full">
                <option :value="option.value" v-for="(option,index) in priceUnitOptions" :key="index">{{$t(`settings.localization.priceOptions.${option.key}`)}}</option>
            </TomSelect>
        </div>

        <div class="flex my-3 mt-5 form-label text-base font-medium">
            <div class="mr-5"> {{$t("settings.localization.decimal_places")}}</div>
        </div>
        <div class="flex my-1">
            <TomSelect v-model="generalInfo.decimal_places" :options="{placeholder: $t('settings.localization.choose_decimal_places')}" class="w-full">
                <option :value="option.value" v-for="(option,index) in decimalOptions" :key="index">{{option.text}}</option>
            </TomSelect>
        </div>


        <AccordionGroup class="accordion-boxed mt-10">
            <AccordionItem>
                <Accordion>
                    <div class="flex">
                        <div class="mr-auto"> 
                            <span class="form-label text-base font-medium"> {{$t('settings.notes.delivery_note')}}: </span> <br> 
                            <span class="text-slate-400 break-all">
                                {{ generalInfo.delivery_note }}
                            </span>
                        </div>
                        <div>
                            <EditIcon class="h-6" />
                        </div>
                    </div>
                </Accordion>
                <AccordionPanel class="leading-relaxed text-slate-600 dark:text-slate-500">
                    <textarea 
                        class="h-48 p-2 mr-5 form-control indent-4"
                        :placeholder="`${$t('settings.notes.delivery_note')}...`"
                        v-model="generalInfo.delivery_note"
                    >
                    </textarea>
                </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
                <Accordion>
                    <div class="flex">
                        <div class="mr-auto"> 
                            <span class="form-label text-base font-medium"> {{$t('settings.notes.special_note')}}:</span> <br> 
                            <span class="whitespace-normal text-slate-400  break-all">
                                {{ generalInfo.special_note }}
                            </span>
                        </div>
                        <div>
                            <EditIcon class="h-6" />
                        </div>
                    </div>
                </Accordion>
                <AccordionPanel class="leading-relaxed text-slate-600 dark:text-slate-500">
                    <textarea 
                        class="h-48 p-2 mr-5 form-control indent-4" 
                        :placeholder="`${$t('settings.notes.special_note')}...`"
                        v-model=" generalInfo.special_note"
                    >
                    </textarea>
                </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
                <Accordion>
                    <div class="flex">
                        <div class="mr-auto"> 
                            <span class="form-label text-base font-medium"> {{$t('settings.notes.confirmation_note')}}:</span> <br> 
                            <span class="text-slate-400  break-all"> 
                                {{  generalInfo.confirmation_note }}
                            </span>
                        </div>
                        <div>
                            <EditIcon class="h-6" />
                        </div>
                    </div>
                </Accordion>
                <AccordionPanel class="leading-relaxed text-slate-600 dark:text-slate-500">
                    <textarea 
                        class="h-48 p-2 mr-5 form-control indent-4"
                        :placeholder="`${$t('settings.notes.confirmation_note')}...`"
                        v-model="generalInfo.confirmation_note"
                    >
                    </textarea>
                </AccordionPanel>
            </AccordionItem>
        </AccordionGroup>
        
        <div class="mt-5 flex text-[14px] justify-end">
            <!-- <button class="w-32 btn dark:border-darkmode-400" @click="discard"> {{$t('settings.notes.discard')}}</button> -->
            <button class="w-32 ml-5 shadow-md btn btn-primary" @click="update"> {{$t('settings.notes.save')}} </button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { get_general_info, update_general_info } from '@/api_v2/user_subscription'
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import i18n from "@/locales/i18n"


const layoutStore = useLSSSellerLayoutStore();

//之後這邊改成 綁layoutStore裡面的userInfo.user_subscription
const deliveryNote = ref('')
const specialNote = ref('')
const confirmationNote = ref('')





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
    // {value:'zh_hans',text:'Chinese-simplify'},
    {value:'zh_hant',text:'Chinese-tranditional'},
    // {value:'id',text:'Indonesian'}
])

const decimalOptions = ref([
    {value:'2',text:'0.01'},
    // {value:'1',text:'0.1'},
    {value:'0',text:'1'},
    // {value:'-1',text:'10'},
    // {value:'-2',text:'100'},
    // {value:'-3',text:'1000'}
    ])

const generalInfo = ref({currency:'USD', lang:'en', buyer_lang:'en', decimal_places:2, price_unit:'1',confirmation_note:'',delivery_note:'',confirmation_note:''})


onMounted(() => {
    get_general_info().then(response => {
        console.log(response.data)
        generalInfo.value = response.data
    })
})



const update = () => {

    update_general_info(generalInfo.value).then(res => {
        layoutStore.userInfo = res.data
        layoutStore.notification.showMessageToast(i18n.global.t('settings.update_successfully'))
    })
    .catch(error =>
        layoutStore.alert.showMessageToast(i18n.global.t('settings.update_failed'))
    )
}


</script>
