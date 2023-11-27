<template>
    <Tippy  :content="$t('campaign_list.campaign_list_table.more')" :options="{ theme: 'light' }">
        <Dropdown placement="bottom-start">
        <DropdownToggle role="button" class="block w-5 h-5" href="javascript:;">
            <MoreHorizontalIcon class="w-5 h-5 text-slate-700" />
        </DropdownToggle>
        <DropdownMenu class="max-w-60 pt-2">
            <DropdownContent class="w-44 text-center">
                <DropdownItem class="w-fit text-center whitespace-nowrap" 
                    @click="routeToEditCampaign()"> 
                    <SimpleIcon icon="edit" color="#2d8cf0" class="mr-1"/>
                    {{$t("campaign_list.campaign_list_table.edit_campaign")}} 
                </DropdownItem>
                <!-- <DropdownItem 
                    v-if="campaignStatus === 'scheduled' || campaignStatus === 'ongoing'"
                    class="w-fit text-center whitespace-nowrap" 
                    @click="editCampaignProduct(campaign)"> 
                    <SimpleIcon icon="edit" color="#2d8cf0" class="mr-1"/>
                    {{$t("campaign_list.campaign_list_table.edit_campaign_product")}}  
                </DropdownItem> -->
                <DropdownItem 
                    @click="copyExpressURL()" class="w-fit whitespace-nowrap"> 
                    <Tippy 
                    class="whitespace-nowrap w-full" 
                    data-tippy-allowHTML="true" 
                    data-tippy-placement="right" 
                    :content="$t('tooltips.campaign_list.instant_cart')" 
                    > 
                    <div class="whitespace-nowrap flex"> 
                        <SimpleIcon icon="express_cart" color="#2d8cf0" class="mr-1"/>
                        {{$t("campaign_list.campaign_list_table.blank_cart")}}  </div> 
                    </Tippy> 
                </DropdownItem>
                <!-- <DropdownItem 
                    v-if="campaign.tiktok_campaign?.username"
                    @click="copyURL('tiktok',campaign)" class="w-fit whitespace-nowrap"> 
                    <Tippy 
                    class="whitespace-nowrap w-full" 
                    data-tippy-allowHTML="true" 
                    data-tippy-placement="right" 
                    :content="$t('tooltips.campaign_list.instant_cart')" 
                    > 
                    <div class="whitespace-nowrap flex"> 
                        <SimpleIcon icon="tiktok_cart" color="#2d8cf0" class="mr-1"/>
                        {{$t("campaign_list.campaign_list_table.tiktok_cart")}}  </div> 
                    </Tippy> 
                </DropdownItem> -->
                <!-- <DropdownItem 
                    @click="goLuckyDraw(campaign)" class="w-fit whitespace-nowrap"> 
                    <SimpleIcon icon="lucky_draw" color="#2d8cf0" class="mr-1"/>
                    {{$t("campaign_list.campaign_list_table.lucky_draw")}}
                </DropdownItem>
                <DropdownItem 
                    @click="goQuizGame(campaign)" class="w-fit whitespace-nowrap"> 
                    <SimpleIcon icon="quiz" color="#2d8cf0"/>
                    <div class="ml-1"> {{$t("campaign_list.campaign_list_table.quiz_game")}} </div> 
                </DropdownItem> -->
                <DropdownItem 
                    v-if="campaignStatus === 'scheduled' || campaignStatus === 'ongoing'"
                    @click="deleteCampaign()" class="w-fit text-danger whitespace-nowrap">
                    <!-- <font-awesome-icon icon="fa-solid fa-trash-can" class="h-[20px] w-[20px] mr-1"/> -->
                    <SimpleIcon icon="delete" color="#b91c1c" class="mr-1"/>
                    {{$t("campaign_list.campaign_list_table.delete")}}
                </DropdownItem>
            </DropdownContent>
        </DropdownMenu>
        </Dropdown> 
    </Tippy> 

 </template>
 
<script setup>

import {ref, defineProps, defineEmits} from "vue"
import { useRoute, useRouter } from "vue-router";

const route = useRoute()
const router = useRouter()
const emits = defineEmits(['update:modelValue'])

const updateModelValue = ()=>{
    emits('update:modelValue', props.modelValue)
}


const cacheData = ref(JSON.parse(JSON.stringify(props.modelValue)))

const props = defineProps({
    modelValue:Object,
    data:{
        type:Object,
        default:{}
    },
    dataIndex:{
        type:Number,
        default:null
    }
})

const hideDropDown = ()=>{
  dom('.dropdown-menu').removeClass('show')
}

const routeToEditCampaign = ()=>{
    hideDropDown()
    router.push({name:'edit-campaign',params:{'campaign_uuid':props.modelValue?.uuid}})
}

const updateCampaign = ()=>{
    console.log(cacheData.value)
    props.modelValue.stop_checkout = JSON.parse(JSON.stringify(cacheData?.value?.stop_checkout||[]));
    console.log(props.modelValue)
    // console.log(props.modelValue.social_platform_connections)
    // updateModelValue()
    // showModal.value=false
    
}


const deleteCampaign = ()=>{
    hideDropDown()
}

const copyExpressURL = ()=>{
    hideDropDown()
}

</script>