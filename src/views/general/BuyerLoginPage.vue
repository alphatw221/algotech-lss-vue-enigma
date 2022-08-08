<template>
    <div class="board bg-white"> 
        <div class="round"> 
            <img src="/src/assets/images/login-page/bg.svg" class="whiteCircle" />
            <img src="/src/assets/images/login-page/robot.svg"  class="robot hidden sm:block" />    
        </div>
    </div>
    <div class="container w-[100%] sm:w-[480px] m-0 sm:mr-[10%] float-center sm:float-right"> 
        <div class="flex flex-col items-center py-5 sm:p-5 text-center center w-[375px]">
            <img src="/src/assets/images/lss-logo/LSS_logo_words.png" class="w-[200px]" />
            <h3 class="text-[1.8rem] mx-auto mt-10 font-medium" >Login</h3>
            <div class="w-full flex-col flex gap-5 z-10">
                <div class="flex flex-col items-center mt-10 gap-3" v-if="!showReminder">
                    <!-- <FacebookLoginButton block role='buyer'/> -->
                    <GoogleLoginButton block role='buyer'/>
                    <!-- <ContinueWithoutLoginButton block/> -->
                </div>
                <Row v-if="showReminder"><p class="mt-10 ml-4 mr-4 text-lg text-center text-danger">Oops! your browser is not supported, please open the Shopping Cart Link below on Safari or Chrome</p></Row>
                <div v-if="showReminder" class="items-center mt-4 text-center shopping-cart-link-block" >
                    <a class="inline-block shopping-cart-link-item" @click="copyLink()">{{currentUrl}}</a>
                    <a class="inline-block text-black shopping-cart-link-item"  @click="copyLink()">
                        <div class="items-center ml-2 text-center">
                            <CopyIcon class="inline w-4 h-4"/>
                            <p class="text-xs">copy</p>
                        </div>
                    </a>
                </div>
            </div>

        </div>
    </div>
</template>
<script setup>

import FacebookLoginButton from '@/components/button/FacebookLoginButton.vue';
import GoogleLoginButton from '@/components/button/GoogleLoginButton.vue';
import ContinueWithoutLoginButton from '@/components/button/ContinueWithoutLoginButton.vue';
import img1 from '/src/assets/images/login-page/new-lss-carousel-1.jpeg'
import img2 from '/src/assets/images/login-page/new-lss-carousel-2.jpeg'

import {ref, onMounted, onBeforeMount} from 'vue'
import {useRoute, useRouter} from 'vue-router'
onBeforeMount (()=>{document.querySelector('body').setAttribute('style', 'padding-left: 0;')} ) 
onMounted(()=>{
    // console.log(navigator.userAgent.toLowerCase())
    if (navigator.userAgent.toLowerCase().indexOf('chrome') < 0 && navigator.userAgent.toLowerCase().indexOf('safari') < 0 ) {
        showReminder.value=true
    }
})

const route = useRoute()
const router = useRouter()
const currentUrl = ref(window.location.href)
const showReminder = ref(false)

const carousel_items = ref([
                { src: img1 },
                { src: img2 },
            ])

const copyLink = ()=>{
    navigator.clipboard.writeText(currentUrl.value).then(()=>{
        alert('copied!')
    })
}
</script>

<style scoped>

.board{
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    position: absolute;
    z-index: 0;
}

.center {
    position: absolute;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
    background:rgba(255, 255, 255, 0.95);
}

.round{
    height: 150vh;
    width: 150vh;
    background-color: rgba(255, 0, 0, 0.651);
    position: absolute;
    right: 55%;
    bottom: -25%;
    z-index: -99;
    border-radius: 100vh;
}
.whiteCircle{
    z-index: 0;
    height: 100vh;
    width: 100vh;
    top: 58%;
    left: -3%;
    transform: translate(50%, -50%);
    position: absolute;
}
.robot{
    z-index: 0;
    width: 480px;
    top: 50%;
    left: 50%;
    transform: translate(50%, -50%);
    position: absolute;
}
.container{
    height: 100vh;
    position: relative;
}

</style>