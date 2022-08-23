<template>
    <div v-if="ready">


        <div>{{campaign.title}}</div>
        <div>{{campaign.tiktok_campaign}}</div>
        <div>{{campaign.twitch_campaign}}</div>

        <TiktokCommentCapturer :campaign="campaign"/>
    </div>
</template>

<script setup>
import { computed, onMounted, ref, watch, onUnmounted, defineProps } from "vue";
import { useRoute, useRouter } from "vue-router";
import { retrieve_campaign } from '@/api_v2/campaign';

import TiktokCommentCapturer from "./TiktokCommentCapturer.vue"
const router = useRouter()
const route = useRoute()

const ready = ref(false)
const campaign = ref({})

onMounted(()=>{
    retrieve_campaign(route.params.campaign_id).then(res=>{
		campaign.value = res.data
        ready.value = true
	})
})

</script>
