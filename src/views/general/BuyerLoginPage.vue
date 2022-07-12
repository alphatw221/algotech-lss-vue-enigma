<template>
    <div>
        <Carousel 
            autoplay
            autoplay-speed="5000" 
            loop
            class="h-screen carousel"
        >
            <CarouselItem v-for="carousel in carousel_items" :key="carousel.src" class="carousel-item">
                <img :src="carousel.src" class="carousel-item" />
            </CarouselItem>
        </Carousel>
        
        <Card class="center">
            <Row><h3>Login</h3></Row>

            <div class="flex flex-col items-center mt-10" v-if="!showReminder">
                <FacebookLoginButton block role='buyer'/>
                <GoogleLoginButton block role='buyer'/>
                <ContinueWithoutLoginButton block/>
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

        </Card>
    </div>
</template>

<script setup>

import FacebookLoginButton from '@/components/button/FacebookLoginButton.vue';
import GoogleLoginButton from '@/components/button/GoogleLoginButton.vue';
import ContinueWithoutLoginButton from '@/components/button/ContinueWithoutLoginButton.vue';
import img1 from '/src/assets/images/login-page/new-lss-carousel-1.jpeg'
import img2 from '/src/assets/images/login-page/new-lss-carousel-2.jpeg'

import {ref, onMounted} from 'vue'
import {useRoute, useRouter} from 'vue-router'
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

.carousel {
    width: 100vw !important;
    background-size: cover !important;
    overflow: hidden;
}
.carousel-item {
    width: 100vw !important;
    height: 100vh !important;
    -webkit-background-size: cover !important;
    -moz-background-size: cover !important;
    -o-background-size: cover !important;
    background-size: cover !important;
    overflow: hidden;
}

.center {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 50;
    width:400px; 
    height: 300px;
    opacity: .9;
}

h3 {
    font-size: 2rem;
    margin-left: auto;
    margin-right: auto;
    margin-top: 2rem;
}

.shopping-cart-link-block{
    line-height: 10px;
}

.shopping-cart-link-item{
    vertical-align: middle;
}
</style>