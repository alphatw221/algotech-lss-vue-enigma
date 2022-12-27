<template>
    <div class="board bg-white"> 
        <div class="round hidden sm:block"> 
            <img src="/src/assets/images/login-page/bg.svg" class="whiteCircle" />
            <img src="/src/assets/images/login-page/robot.svg"  class="robot" />    
        </div>
        <div class="loginContainer w-[100%] sm:w-[480px] m-0 sm:mr-[10%] bg-red-500/25 sm:bg-transparent float-center sm:float-right"> 
            <img src="/src/assets/images/login-page/mobile_login_robot.svg" class="sm:hidden absolute right-1/2 translate-x-1/2 top-2" />
            <img src="/src/assets/images/login-page/mobile_login_robot_hand.svg"  class="sm:hidden absolute top-1/4 left-20 z-10 -translate-y-1/3 -rotate-3" />    
            <img src="/src/assets/images/login-page/mobile_login_robot_hand.svg"  class="sm:hidden absolute top-1/4 right-20 z-10 -translate-y-1/3 rotate-3" />    
            <div class="flex relative flex-col items-center p-10 text-center z-0 center w-full h-3/4 sm:h-fit sm:w-[375px] right-50 top-1/4 sm:top-[15%] sm:translate-y-1/3 abosolute bg-white sm:opacity-95">
                <img src="/src/assets/images/lss-logo/LSS_logo_words.png" class="w-[200px]" />
                <h3 class="text-[1.8rem] mx-auto mt-10 font-medium" >{{ $t('login.login') }}</h3>
                <div class="w-full flex-col flex gap-5 z-10">
                    <div class="flex flex-col items-center mt-10 gap-3" v-if="!showReminder">
                        <FacebookLoginButton block role='buyer'/>
                        <GoogleLoginButton block role='buyer'/>
                        <!-- <ContinueWithoutLoginButton block/> -->
                    </div>
                    <Row v-if="showReminder"><p class="mt-10 ml-4 mr-4 text-lg text-center text-danger">{{$t('shopping_cart.login.err_login')}}</p></Row>
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
    position: relative;
    z-index: 0;
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
.loginContainer{
    height: 100vh;
    position: relative;
}
</style>