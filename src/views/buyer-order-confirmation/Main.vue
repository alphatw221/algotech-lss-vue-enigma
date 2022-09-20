<template>
    <div class="lg:h-[90%] h-[80%]">
        <div class="pt-20" v-if="showAnimate">
            <lottie-player class="mx-auto" src="https://assets1.lottiefiles.com/packages/lf20_zk5i149v.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"   autoplay></lottie-player>
        </div>
        <div class="text-center text-slate-500" v-if="store.order.campaign">
            <h1 style="white-space:pre;line-height:normal;">{{ store.order.campaign.meta_payment.confirmation_note||'Order Payment Successful !'}}</h1>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import loadScript from '@/libs/loadScript.js';
import { useLSSBuyerOrderStore } from "@/stores/lss-buyer-order";
const store = useLSSBuyerOrderStore(); 
const route = useRoute();
const router = useRouter();

const showAnimate=ref(false)
onMounted(()=>{
    loadScript('https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js',()=>{
        showAnimate.value=true
        setTimeout(()=>{
            router.push(`/buyer/order/${route.params.order_oid}`)
        }, 5000);
    })
})
</script>


