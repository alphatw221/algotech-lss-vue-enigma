<template>
    <div>
        <div class="container">
            <div class="h-screen flex justify-center rounded overflow-hidden shadow-lg">
                <div style="margin-top: 5rem;" v-if="ready === true && beforeDraw === true">
                    <img class="m-3 self-center" :src="storageUrl + luckyDrawData.prize.image" style="width: 300px;"/>
                    <div class="text-center mt-7 text-2xl">{{ luckyDrawData.prize.name }}</div>
                    <div class="mt-9 flex">
                        <div class="w-[50%] flex-col mr-5">
                            <label class="form-label text-lg text-slate-500">{{ drawTitleMap[luckyDrawData.type] }}</label>
                        </div>
                        <div class="w-[50%] flex-col">
                            <label 
                                class="form-label float-right text-lg" 
                                v-if="luckyDrawData.type == 'keyword'"
                            >
                                {{ luckyDrawData.comment }}
                            </label>
                            <label 
                                class="form-label float-right text-lg" 
                                v-else-if="luckyDrawData.type == 'product'"
                            >
                                {{ luckyDrawData.campaign_product.name }}
                            </label>
                        </div>
                    </div>
                    <div class="mt-6 flex">
                        <div class="w-[50%] flex-col mr-5">
                            <label class="form-label text-lg text-slate-500">Winners</label>
                        </div>
                        <div class="w-[50%] flex-col">
                            <label class="form-label float-right text-lg"> {{ luckyDrawData.num_of_winner }}</label>
                        </div>
                    </div>
                    <div class="mt-6 flex">
                        <div class="w-[50%] flex-col mr-5">
                            <label class="form-label text-lg text-slate-500">Repeatable</label>
                        </div>
                        <div class="w-[50%] flex-col">
                            <label class="form-label float-right text-lg" v-if="luckyDrawData.repeatable == true">Yes</label>
                            <label class="form-label float-right text-lg" v-else>No</label>
                        </div>
                    </div>
                    <div class="text-center mt-9 text-2xl">
                        <button class="btn btn-primary w-48 h-16 mt-auto" @click="goDraw(luckyDrawData.id)">
                            Draw Now
                        </button>
                    </div>
                </div>
                <div style="margin-top: 5rem;" v-else-if="ready === true && beforeDraw === false">
                    <div v-if="winner.length != 0" 
                        class="text-2xl text-center"> Congratulations!</div>
                    <img class="mx-auto my-8 self-center" :src="storageUrl + luckyDrawData.prize.image" style="width: 300px;"/>
                    <div class="text-center text-2xl">{{ luckyDrawData.prize.name }}</div>
                    <div class="mt-9 flex flex-wrap" style="width: 350px;">
                        <div v-for="(winner, index) in winnerList" :key="index" class="ml-5 mb-3">
                            <div class="flex w-full justify-around">
                                <div class="flex-0 w-14 h-14  zoom-in border-0">
                                    <Tippy v-if="winner.customer_image == '' || winner.customer_image == null" tag="img" class="rounded-full border-0" :src="`${storageUrl}fake_head.jpeg`"
                                        />
                                    <Tippy v-else tag="img" class="rounded-full border-0" :src="winner.customer_image"
                                        />
                                    <div class="w-5 h-5 absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600">
                                        <img v-if="winner.platform == 'facebook'" class="rounded-full bg-[#3c599b]" :src="facebook_platform" >
                                        <img v-if="winner.platform == 'instagram'" class="rounded-full bg-[#d63376]" :src="instagram_platform" >
                                        <img v-if="winner.platform == 'youtube'" class="rounded-full bg-[#f70000]" :src="youtube_platform" >
                                        <img v-if="winner.platform == null" class="rounded-full bg-[#9D9D9D]" :src="unbound" >
                                    </div>
                                </div>
                            </div>
                            <label> {{ winner.customer_name }} </label>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        
        <!-- BEGIN: Modal Content -->
        <Modal :show="showAnimation">
            <ModalBody class="p-10 text-center">
                <img class="m-3 self-center" :src="storageUrl + luckyDrawData.animation" />
            </ModalBody>
        </Modal>
        <!-- END: Modal Content -->

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { retrieve_campaign_lucky_draw, draw_campaign_lucky_draw } from '@/api_v2/campaign_lucky_draw';
import youtube_platform from '/src/assets/images/lss-img/youtube.png';
import facebook_platform from '/src/assets/images/lss-img/facebook.png';
import instagram_platform from '/src/assets/images/lss-img/instagram.png';
import unbound from '/src/assets/images/lss-img/noname.png';

const props = defineProps({
    luckydrawList: Object
})
const storageUrl = import.meta.env.VITE_GOOGLE_STORAGEL_URL
const route = useRoute();
const router = useRouter();
const luckyDrawData = ref({})
const drawTitleMap = ref({
    like: "Draw Like",
    purchase: "Draw Purchased",
    product: "Draw Product",
    keyword: "Draw Keyword" 
})
const ready = ref(false)
const showAnimation = ref(false)
const beforeDraw = ref(true)
const winnerList = ref([])


onMounted(() => {
    retrieve_campaign_lucky_draw(route.params.lucky_draw_id).then(res => {
        luckyDrawData.value = res.data
        console.log(luckyDrawData.value)
        ready.value = true
    }).catch(err => {
        console.log(err)
    })
})

const goDraw = (lucky_draw_id) => {
    showAnimation.value = true
    draw_campaign_lucky_draw(lucky_draw_id).then(res => {
        winnerList.value = res.data
        beforeDraw.value = false
        console.log(res.data)
    })

    setTimeout(() => {
        showAnimation.value = false
    }, luckyDrawData.value.spin_time * 1000)

}

</script>