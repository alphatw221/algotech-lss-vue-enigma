<template>
    <div >

        <div>
            <router-view></router-view>
            <div class="sticky z-30 bottom-2"> 
                <div class="flex justify-between font-medium flex-wrap mx-5 sm:mx-10 text-[12px] sm:text-[16px] sm:mb-4 bg-transparent"> 
                    <span>
                            © {{new Date().getFullYear()}} {{ companyName }} All rights reserved
                    </span>
                    <div class="flex flex-row gap-3 ml-auto"> 
                        <a :href="homeUrl">  {{$t("global.footer.home")}}  </a>

                        <a :href="termsUrl">  {{$t("global.footer.terms")}} </a>

                        <a :href="privacyPolicyUrl"> {{$t("global.footer.private_policy")}} </a>
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
import { onBeforeMount, onMounted, ref, provide } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePublicLayoutStore } from "@/stores/lss-public-layout";
import useI18n from "@/locales/i18n";

const route = useRoute();
const router = useRouter();
const publicLayout = usePublicLayoutStore()
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

const companyName = import.meta.env.VITE_COMPANY_NAME
const homeUrl = import.meta.env.VITE_HOME_URL
const termsUrl = import.meta.env.VITE_TERMS_OF_SERVICE_URL
const privacyPolicyUrl = import.meta.env.VITE_PRIVACY_POLICY_URL

const setLanguage = ()=>{
    console.log(window.navigator.language)
    
    browserLang.value = window.navigator.language.toLowerCase()
    if (route.query.language) {
        useI18n.global.locale.value = route.query.language
    } else {
        useI18n.global.locale.value = browserLangToVueLang.value[browserLang.value]
    }
    console.log(useI18n.global.locale.value)
}

provide("bind[registerMessageNotification]", (el) => {publicLayout.notification = el;});
provide("bind[registerMessageAlert]", (el) => {publicLayout.alert = el;});


</script>

<style scoped>

.public-layout-content{
  height: 100% !important;
}
</style>