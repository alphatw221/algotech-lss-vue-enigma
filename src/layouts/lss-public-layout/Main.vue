<template>
    <div >

        <div>
            <router-view></router-view>
        </div>
        
        <!-- BEGIN Footer -->
        <div class="flex justify-between flex-wrap mx-5 sm:mx-10 text-[12px] sm:text-[16px] sm:mb-5"> 
            <span>
                    © 2021 Algotech Pte Ltd. All rights reserved
            </span>
            <div class="flex flex-row gap-3 ml-auto"> 
                <a href="https://liveshowseller.com/">  {{$t("global.footer.home")}}  </a>

                <a href="https://liveshowseller.com/terms-of-service/">  {{$t("global.footer.terms")}} </a>

                <a href="https://liveshowseller.com/privacy-policy/"> {{$t("global.footer.private_policy")}} </a>
            </div> 
        </div> 
        <!-- END Footer -->

        <Notification refKey="registerMessageNotification" :options="{duration: 5000,}" class="flex text-green-600 sm:flex-row">
        <CheckCircleIcon class="w-6 h-6 mr-2" /> 
        <div id="message" class="font-medium max-w-xs">Message</div>
        </Notification>

        <Notification refKey="registerMessageAlert" :options="{duration: 3000,}" class="flex text-red-600 sm:flex-row">
        <AlertOctagonIcon class="w-6 h-6 mr-2" /> 
        <div id="message" class="font-medium max-w-xs">Message</div>
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