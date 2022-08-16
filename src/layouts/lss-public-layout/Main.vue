<template>
    <div >

        <div>
            <router-view></router-view>
            <div class="sticky z-30 bottom-2"> 
            <div class="flex justify-between font-medium flex-wrap mx-5 sm:mx-10 text-[12px] sm:text-[16px] sm:mb-4 bg-transparent"> 
                <span>
                        © 2021 Algotech Pte Ltd. All rights reserved
                </span>
                <div class="flex flex-row gap-3 ml-auto"> 
                    <a href="https://liveshowseller.com/">  {{$t("global.footer.home")}}  </a>

                    <a href="https://liveshowseller.com/terms-of-service/">  {{$t("global.footer.terms")}} </a>

                    <a href="https://liveshowseller.com/privacy-policy/"> {{$t("global.footer.private_policy")}} </a>
                </div> 
            </div> 
        </div>
        </div>
        
        <!-- BEGIN Footer -->
        
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
import { onBeforeMount, onMounted, ref, provide, getCurrentInstance } from "vue";
import { usePublicLayoutStore } from "@/stores/lss-public-layout"

const publicLayout = usePublicLayoutStore()
const app_i18n = getCurrentInstance().appContext.config.globalProperties.$i18n
const browserLang = ref("")
const browserLangToVueLang = ref({
    "en": "en",
    "zh-cn": "zh_hans",
    "zh-hk": "zh_hans",
    "zh-tw": "zh_hant",
    "vi": "vi"
})

onMounted(() => {
  setLanguage();
})

const setLanguage = ()=>{
    console.log(window.navigator.language)
    browserLang.value = window.navigator.language.toLowerCase()
    app_i18n.locale=browserLangToVueLang.value[browserLang.value]
    console.log(app_i18n.locale)
}

provide("bind[registerMessageNotification]", (el) => {publicLayout.notification = el;});
provide("bind[registerMessageAlert]", (el) => {publicLayout.alert = el;});


</script>

<style scoped>

.public-layout-content{
  height: 100% !important;
}
</style>