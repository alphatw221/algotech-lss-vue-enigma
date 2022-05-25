<template>
    <div>
        <Carousel 
            autoplay
            autoplay-speed="5000" 
            loop
        >
            <CarouselItem v-for="carousel in carousel_items" :key="carousel.src">
                <img :src="carousel.src" class="carousel"/>
            </CarouselItem>
        </Carousel>

        <Card class="center">
            <Row><h3>Reset Password</h3></Row>

            <div class="mt-10">
                <input id="regular-form-1" type="text" class="form-control email_input" placeholder="Please Enter your E-mail" />
            </div>

            <Button class="resend_btn" long @click="sendResetLink">Send Password Reset Link</Button>
            
            <h6 style="text-align: center; font-size: 18px; margin-top: 20px;">
                <a style="margin: auto; color: darkslategray;"  @click=" this.$router.back();" >Back to Login Page</a>
            </h6>
        </Card>
    </div>
</template>

<script>
import { forgot_password } from '@/api/user'

export default {
    setup() {
        
    },
    data() {
        return {
            carousel_items: [
                { src: "/src/assets/images/login-page/new-lss-carousel-1.jpeg" },
                { src: "/src/assets/images/login-page/new-lss-carousel-2.jpeg" }
            ]
        }
    },
    methods: {
        // sendResetLink() {
        //     console.log(this.$ref.input1)
        // }
    },
}
</script>

<style scoped>
.carousel {
    width: 100%;
    max-height: 100%;
    background: no-repeat center center scroll;
}

h3 {
    font-size: 2rem;
    margin-left: auto;
    margin-right: auto;
    margin-top: 2rem;
}

.email_input {
    border-color: slategray;
    height: 50px;
}

.center {
    width:400px; 
    height: 350px; 
    opacity: .8;
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 99;
}

.resend_btn {
    background-color: darkslategray; 
    color: white; 
    height: 50px;
    margin-top: 30px;
    font-size: 18px;
}
</style>