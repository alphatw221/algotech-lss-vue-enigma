<template>
    <div>
        <div class="container">
            <div class="h-screen flex justify-center rounded overflow-hidden shadow-lg">
                <div style="margin-top: 5rem;" v-if="ready === true && beforeDraw === true">
                    <img class="m-3 self-center" :src="storageUrl + luckyDrawData.prize.image" style="width: 300px; height: 300px;"/>
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
                            <label class="form-label text-lg text-slate-500">{{ $t('lucky_draw.draw_flow.winner') }}</label>
                        </div>
                        <div class="w-[50%] flex-col">
                            <label class="form-label float-right text-lg"> {{ luckyDrawData.num_of_winner }}</label>
                        </div>
                    </div>
                    <div class="mt-6 flex">
                        <div class="w-[50%] flex-col mr-5">
                            <label class="form-label text-lg text-slate-500">{{ $t('lucky_draw.draw_flow.repeatable') }}</label>
                        </div>
                        <div class="w-[50%] flex-col">
                            <label class="form-label float-right text-lg" v-if="luckyDrawData.repeatable == true">{{ $t('lucky_draw.draw_flow.yes') }}</label>
                            <label class="form-label float-right text-lg" v-else>{{ $t('lucky_draw.draw_flow.no') }}</label>
                        </div>
                    </div>
                    <div class="text-center mt-9 text-2xl">
                        <button class="btn btn-primary w-48 h-16 mt-auto" @click="goDraw(luckyDrawData.id)">
                            Draw Now
                        </button>
                    </div>
                </div>
                <div style="margin-top: 5rem;" v-else-if="ready === true && beforeDraw === false">
                    <div v-if="winnerList.length != 0" 
                        class="text-2xl text-center"> {{ $t('lucky_draw.draw_flow.congrates') }} !</div>
                    <img class="mx-auto my-8 self-center" :src="storageUrl + luckyDrawData.prize.image" style="width: 300px; height:300px;"/>
                    <div class="text-center text-2xl">{{ luckyDrawData.prize.name }}</div>
                    <div class="mt-9 flex flex-wrap justify-center mx-auto xl:w-420 w-300">
                        <div v-for="(winner, index) in winnerList" :key="index" class=" mb-3 mx-3">
                            <div class="w-full">
                                <div class="flex-0 xl:w-28 xl:h-28 w-20 h-20 zoom-in border-0">
                                    <Tippy v-if="winner.customer_image == '' || winner.customer_image == null" tag="img" class="rounded-full border-0 w-full" :src="`${storageUrl}fake_head.jpeg`"
                                        />
                                    <Tippy v-else tag="img" class="rounded-full border-0 w-full" :src="winner.customer_image"
                                        />
                                    <div class="w-5 h-5 absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600">
                                        <img v-if="winner.platform == 'facebook'" class="rounded-full bg-[#3c599b]" :src="facebook_platform" >
                                        <img v-if="winner.platform == 'instagram'" class="rounded-full bg-[#d63376]" :src="instagram_platform" >
                                        <img v-if="winner.platform == 'youtube'" class="rounded-full bg-[#f70000]" :src="youtube_platform" >
                                        <img v-if="winner.platform == null" class="rounded-full bg-[#9D9D9D]" :src="unbound" >
                                    </div>
                                </div>
                            </div>
                            <p class="text-center"> {{ winner.customer_name }} </p>
                        </div>
                    </div>
                    <div v-if="winnerList.length == 0" class="text-2xl text-center">  
                        {{ $t('lucky_draw.draw_flow.no_winner') }}
                        <img :src="noWinner">
                    </div>
                </div>
            </div>
        </div>
        <!-- BEGIN: Cover -->
        <div id="cover" v-if="showAnimation"></div>
        <!-- END: Cover -->
        <div v-if="hasWinner" class="winnerShowup" :class="{has_winner:hasWinner}">
            <img class="mx-auto" :src="winnerShowupPicture" />
        </div>
        <!-- BEGIN: Modal Content -->
        <div id="draw_animation" :class="{ show: showAnimation, hide: !showAnimation}">
            <template v-if="luckyDrawData.animation == ''"> 
                <img class="mx-auto" :src="`${storageUrl}static/lucky_draw1.svg`" />                        
            </template>
            <template v-else>
                <img class="mx-auto" :src="storageUrl + luckyDrawData.animation" />
            </template> 
        </div>
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
import noWinner from '/src/assets/images/lss-img/no winner.svg'
import winnerShowupPicture from '/src/assets/images/lss-img/winner_showup.svg'

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
const hasWinner = ref(false)


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
    })

    setTimeout(() => {
        showAnimation.value = false
        if (winnerList.value.length) {
            hasWinner.value = true
        }
    }, luckyDrawData.value.spin_time * 1000)

}

</script>
<style scoped>
#cover {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    z-index: 1;
}

@media (min-width: 350px){
    #draw_animation.hide {
        width: 75%;
        position: absolute;
        top: -100%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        z-index: 2;
        overflow: hidden;
        transition: all 1s;

    }
    #draw_animation.show {
        width: 75%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        z-index: 2;
        overflow: hidden;
        transition: all 1s;

    }
    .winnerShowup.has_winner img {
        width: 75%;
        height: inherit;
    }
}

@media (min-width: 768px){
    #draw_animation.hide {
        width: 40%;
        position: absolute;
        top: -100%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        z-index: 2;
        overflow: hidden;
        transition: all 1s;

    }
    #draw_animation.show {
        width: 40%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        z-index: 2;
        overflow: hidden;
        transition: all 1s;
    }
    .winnerShowup.has_winner img {
        width: 40%;
        height: inherit;
    }
}


.winnerShowup.has_winner {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    animation: winnersShowsUp 2.5s both 1;
}


@keyframes winnersShowsUp {
    
    80%{
        width: 100%;
        height: 100%;
        opacity: 1;
    }
    90%{
        width: 100%;
        height: 100%;
        opacity: 0;
    }
    100%{
        width: 0%;
        height: 0%;
        opacity: 0;
    }
}
</style>