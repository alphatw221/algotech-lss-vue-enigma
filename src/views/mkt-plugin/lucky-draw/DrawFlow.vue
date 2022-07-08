<template>
    <div>
        <div class="container">
            <div class="h-screen flex justify-center rounded overflow-hidden shadow-lg">
                <div style="margin-top: 5rem;" v-if="ready === true && beforeDraw === true">
                    <img class="m-3 self-center" :src="storageUrl + luckyDrawData.prize.image" style="width: 300px;"/>
                    <div class="text-center mt-7" style="font-size: 1.5rem;">{{ luckyDrawData.prize.name }}</div>
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
                    <div class="text-center mt-9" style="font-size: 1.5rem;">
                        <button class="btn btn-primary w-48 h-16 mt-auto" @click="goDraw(luckyDrawData.id)">
                            Draw Now
                        </button>
                    </div>
                </div>
                <div style="margin-top: 5rem;" v-else-if="ready === true && beforeDraw === false">
                    <img class="m-3 self-center" :src="storageUrl + luckyDrawData.prize.image" style="width: 300px;"/>
                    <div class="text-center mt-7" style="font-size: 1.5rem;">{{ luckyDrawData.prize.name }}</div>
                    <div class="mt-9 flex" style="width: 350px;">
                        <!-- <img class="m-3 self-center" :src="winnerList[0]['customer_image']" style="width: 300px;"/> -->
                        {{ winnerList }}
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