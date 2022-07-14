<template>
    <div>
        <Carousel 
            autoplay
            autoplay-speed="5000" 
            loop
            class="carousel"
        >
            <CarouselItem v-for="carousel in carousel_items" :key="carousel.src" class="carousel-item">
                <img :src="carousel.src" class="carousel-item" />
            </CarouselItem>
        </Carousel>

        <div class="center flex flex-col rounded-lg p-10">
            <h3>Reset Password</h3>

            <div class="mt-10">
                <input id="regular-form-1" type="text" class="form-control email_input" v-model="email" placeholder="Please Enter your E-mail" />
            </div>
            
            <Button class="resend_btn" long @click="sendResetLink">Send Password Reset Link</Button>
            
            <h6 class="align-center text-center text-[18px] mt-5">
                <a style="margin: auto; color: darkslategray;"  @click=" this.$router.push({name:'LoginPage'});" >Back to Login Page</a>
            </h6>
        </div>
    </div>
</template>

<script>
import { forgot_password } from '@/api/user'
import img1 from '/src/assets/images/login-page/new-lss-carousel-1.jpeg'
import img2 from '/src/assets/images/login-page/new-lss-carousel-2.jpeg'

export default {
    setup() {
        
    },
    data() {
        return {
            carousel_items: [
                { src: img1 },
                { src: img2 }
            ],
            email: ''
        }
    },
    methods: {
        sendResetLink() {
            forgot_password({email: this.email})
            .then(res=>{
                alert(res.data.message)
            })
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
    background-color: rgba(255, 255, 255, 0.815);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    
}

.resend_btn {
    background-color: darkslategray; 
    color: white; 
    height: 50px;
    margin-top: 30px;
    font-size: 18px;
}
</style>