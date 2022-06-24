<template>
<div class="flex flex-col h-full box text-lg overflow-y-auto p-10">
    <h1 class="text-center"> Lucky Draw</h1>
    <div class="mt-3 flex">
        <label for="update-profile-form-2" class="form-label mr-10">Campaign Title</label>
        <h2> {{currentCampaign.campaignTitle}}</h2>
    </div>
    <div v-if="drawlist='null'"> 
    <DrawCreate />
    </div>

    <div v-else>
        <DrawList /> 
    </div>

</div>



</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, watch, onMounted } from 'vue';
import { useLSSLuckyDrawStore } from "@/stores/lss-luckydraw"
import DrawCreate from "./DrawCreate.vue";
import DrawList from "./DrawList.vue";

const route = useRoute()
const router = useRouter()
const store = useLSSLuckyDrawStore()

const drawlist = ref('null')
const campaignList = ref([])
const currentCampaign = ref({
    campaignTitle: store.campaign_title,
    campaignId: store.campaign_id
})

const save = () => {

}
</script>

<style scoped>
</style> 