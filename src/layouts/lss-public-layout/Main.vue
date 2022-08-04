<template>
    <div >

        <div class="public-layout-content">
            <router-view></router-view >
        </div>
        
        <!-- BEGIN Footer -->
        <div>
            THIS IS FOOTER
        </div>
        <!-- END Footer -->

        <Notification refKey="registerMessageNotification" :options="{duration: 3000,}" class="flex text-green-600 sm:flex-row">
        <CheckCircleIcon class="w-6 h-6 mr-2" /> 
        <div id="message" class="font-medium">Message</div>
        </Notification>

        <Notification refKey="registerMessageAlert" :options="{duration: 3000,}" class="flex text-red-600 sm:flex-row">
        <AlertOctagonIcon class="w-6 h-6 mr-2" /> 
        <div id="message" class="font-medium">Message</div>
        </Notification>

    </div>
</template>


<script setup>
import { onBeforeMount, onMounted, ref, provide } from "vue";


import { usePublicLayoutStore } from "@/stores/lss-public-layout"

const publicLayout = usePublicLayoutStore()


provide("bind[registerMessageNotification]", (el) => {publicLayout.notification = el;});
provide("bind[registerMessageAlert]", (el) => {publicLayout.alert = el;});
</script>

<style scoped>

.public-layout-content{
  height: 100% !important;
}
</style>