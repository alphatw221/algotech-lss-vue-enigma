<template>
    <div>
        <Carousel 
            autoplay
            autoplay-speed="5000" 
            loop
            class="carousel h-screen"
        >
            <CarouselItem v-for="carousel in carousel_items" :key="carousel.src" class="carousel-item">
                <img :src="carousel.src" class="carousel-item" />
            </CarouselItem>
        </Carousel>
        
        <Card class="center">
            <Row><h3>Login</h3></Row>

            <div class="mt-10 flex flex-col items-center" v-if="!showReminder">
                <FacebookLoginButton block role='buyer'/>
                <GoogleLoginButton block role='buyer'/>
            </div>
            <Row v-if="showReminder"><p class="text-danger text-center mt-10 text-lg mr-4 ml-4">Oops! your browser is not supported, please open the Shopping Cart Link below on Safari or Chrome</p></Row>
            <div v-if="showReminder" class="text-center items-center shopping-cart-link-block mt-4" >
                <a class="inline-block shopping-cart-link-item" @click="copyLink()">{{currentUrl}}</a>
                <a class="text-black inline-block shopping-cart-link-item"  @click="copyLink()">
                    <div class="text-center items-center  ml-2">
                        <CopyIcon class="inline w-4 h-4"/>
                        <p class="text-xs">copy</p>
                    </div>
                </a>
            </div>
                     
                       


            <!-- <p>https://12341234.12341234/</p> -->

            <!-- <button> try window open</button> -->
            <!-- <a @click="test">https://12341234.12341234/ </a> -->
            <!-- <a href="chrome https://localhost:3000/seller">testtest</a> -->
            <!-- <button @click="test()">test</button> -->


            <!-- please press and hold the Shopping Cart Link below and open on Safari or Chrome -->

            <!-- please press/hold the Shopping Cart Link below and open on Safari or Chrome -->

        </Card>
    </div>
</template>

<script setup>

import FacebookLoginButton from '@/components/button/FacebookLoginButton.vue';
import GoogleLoginButton from '@/components/button/GoogleLoginButton.vue';
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
const showReminder = ref(true)

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
    z-index: 99;
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