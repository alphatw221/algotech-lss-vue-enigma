<template>
        <!-- BEGIN: commit box -->
        <form class="flex flex-col">
            <div class="mt-6 flex">
                <div class="w-[50%] flex flex-col mr-5">
                    <label for="update-profile-form-2" class="form-label"> Prize</label>
                    <select class="w-full form-select-lg" v-model="currentSettings.prize">
                        <option v-for="(prize, key) in prizeList" :key="key" class="w-40"> 
                            {{ prize.name }}
                        </option>
                    </select>
                </div>
                <div class="w-[50%] flex flex-col ml-5">
                    <label for="update-profile-form-2" class="form-label "> Spin Time(sec)</label>
                    <select class="w-full form-select-lg" v-model="currentSettings.spinTime">
                        <option v-for="(spinTime, key) in spinTimes" :key="key" :value="spinTime.value">
                            {{ spinTime.name }}</option>
                    </select>
                </div>
            </div>
            <div class="mt-6 flex">
                <div class="w-[50%] flex flex-col mr-5">
                    <label for="update-profile-form-2" class="form-label"> No. of Winners</label>
                    <input id="form-2" type="text" class="form-control" v-model="currentSettings.winners" />
                </div>
                <div class="w-[50%] flex flex-col ml-5">
                    <div class="w-full flex">
                        <label for="update-profile-form-2" class="form-label mr-auto"> Animation Style</label>
                        <a class="text-[16px]" @click="showModal = true"> + Create New Animation </a>
                    </div>
                    <div class="flex flex-wrap items-center justify-around">
                        <template v-for="(animates, key) in animationStyle" :key="key">
                            <div class="w-20 h-20 image-fit relative ">
                                <input type="radio" class="rounded-full vertical-center absolute top-0 left-0 z-50"
                                    @click="chooseAnimation(animates.value)" />
                                <Tippy tag="img" class="rounded-full" :src="animates.image" :content="`animation`" />
                            </div>
                        </template>
                    </div>
                </div>
            </div>
            <div class="mt-3">
                <div class="flex"> <label for="update-profile-form-2" class="form-label "> Winner Repeat </label> 
                    <Tippy class="rounded-full w-30 whitespace-wrap" 
                        data-tippy-allowHTML="true" 
                        data-tippy-placement="right" 
                        content="this is the discription <br/> of Winner Repeat" 
                        theme='light'> 
                        <HelpCircleIcon class="w-8 ml-2" /></Tippy> </div>
                <div class="flex sm:flex-row mt-2">
                    <div class="form-check mr-5">
                        <input id="radio-switch-yes" class="form-check-input" type="radio"
                            v-model="currentSettings.repeat" :value="true" />
                        <label class="form-check-label" for="radio-switch-yes">Yes</label>
                    </div>
                    <div class="form-check mr-5 mt-2 sm:mt-0">
                        <input id="radio-switch-no" class="form-check-input" type="radio"
                            v-model="currentSettings.repeat" :value="false" />
                        <label class="form-check-label" for="radio-switch-no">No</label>
                    </div>
                </div>
            </div>
            <div class="mt-6 flex">
                <div class="w-[50%] flex flex-col mr-5">
                    <label for="update-profile-form-2" class="form-label"> Draw Type</label>
                    <select class="w-full form-select-lg" v-model="currentSettings.type">
                        <option v-for="(type, key) in drawTypes" :key="key" :value="type.value"> {{ type.name }}</option>
                    </select>
                </div>
                <div v-if="currentSettings.type === 'orderCode'" 
                    class="w-[50%] flex flex-col ml-5">
                    <label for="update-profile-form-2" class="form-label "> Order Code</label>
                    <select class="w-full form-select-lg" v-model="currentSettings.comment">
                        <option v-for="(code, key) in campaignList" :key="key" :value="code.value"> code</option>
                    </select>
                </div>
                <div v-else class="w-[50%] flex flex-col ml-5">
                    <label for="update-profile-form-2" class="form-label "> Comment</label>
                    <textarea class="w-full h-14 overflow-hidden whitespace-pre-line p-1 rounded-lg "
                        v-model="currentSettings.comment" placeholder="Enter your comment...">
                    </textarea>
                </div>
            </div>
        </form>
        <div class="flex justify-end my-8">
            <button class="btn btn-secondary mr-5" @click="router.back()"> Cancel</button>
            <button class="btn btn-primary" @click="save"> Save</button>
        </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, watch, onMounted } from 'vue';
import { list_campaign_product } from '@/api/campaign_product';
import { useLSSLuckyDrawStore } from "@/stores/lss-luckydraw"
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"

const route = useRoute();
const router = useRouter();
const layoutStore = useLSSSellerLayoutStore()
const store = useLSSLuckyDrawStore()

const showModal = ref(false)
const saved = ref(false)

const campaign = ref({
    campaign_title: store.campaign_title,
    campaign_id: store.campaign_id,
})
const prizeList = ref([])

const currentSettings = ref({
    prize: {
        name: '', 
        src: ''
    },
    spinTime: 5,
    winners: 0,
    repeat: false,
    type: 'like',
    comment: '',
})

const spinTimes = ref([
    { value: 5, name: '5 secs' },
    { value: 10, name: '10 secs' },
    { value: 20, name: '20 secs' },
    { value: 30, name: '30 secs' },
    { value: 60, name: '60 secs' },
]);

const drawTypes = ref([
    { value: 'like', name: 'Draw Like' },
    { value: 'purchased', name: 'Draw Purchased' },
    { value: 'orderCode', name: 'Draw Order Code' },
    { value: 'comments', name: 'Draw Comments' },
]);

const save = () => {

}

const chooseAnimation = () => {

}

onMounted(() => {
    list_campaign_product(campaign.value.campaign_id).then(res => {
        console.log(res.data)
        for (var i =0; i < res.data.length; i++){
            if(res.data[i].type === "lucky_draw"){
                prizeList[i] = res.data[i]
            }
        }
        console.log(prizeList)
    }).catch(error => {
        console.log(error);
    })
})

</script>

<style scoped>
</style> 