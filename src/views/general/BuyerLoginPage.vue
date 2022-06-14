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

            <div class="mt-10 flex flex-col items-center">
                <FacebookLoginButton block role='buyer'/>
                <GoogleLoginButton block role='buyer'/>
            </div>

        </Card>
    </div>
</template>

<script>

import FacebookLoginButton from '@/components/button/FacebookLoginButton.vue';
import GoogleLoginButton from '@/components/button/GoogleLoginButton.vue';
import img1 from '/src/assets/images/login-page/new-lss-carousel-1.jpeg'
import img2 from '/src/assets/images/login-page/new-lss-carousel-2.jpeg'

export default {
    setup() {
        
    },
    components:{
        FacebookLoginButton,
        GoogleLoginButton
    },
    data() {
        return {
            carousel_items: [
                { src: img1 },
                { src: img2 },
            ],
        }
    },
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



</style>