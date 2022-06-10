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
        
        <Card style="width:400px; height: 300px; opacity: .9;" class="center">
            <Row><h3>Login</h3></Row>

            <!-- <Form ref="loginForm" :model="loginForm" :rules="ruleInline" style="margin-top:50px;">
                <FormItem prop="email" class="login_form">
                    <Input type="text" v-model="loginForm.email" placeholder="E-mail">
                        <template #prepend>
                        <Icon type="ios-person-outline"></Icon>
                        </template>
                    </Input>
                </FormItem>
                <FormItem prop="password" class="login_form">
                    <Input type="password" v-model="loginForm.password" placeholder="Password">
                        <template #prepend>
                        <Icon type="ios-lock-outline"></Icon>
                        </template>
                    </Input>
                </FormItem>
                <FormItem class="login_form">
                    <Button type="primary" @click="_general_login" :size="'large'">Sign in</Button>
                </FormItem>
            </Form>

            <Row><a style="margin:auto;" @click="this.$router.push({ path: '/password/forgot' })">forgot password ?</a></Row>
            <Divider plain :size="small">or</Divider> -->
            <div class="mt-10">
                <Row class="login_btn">
                    <FacebookLoginButton block role='buyer'/>
                </Row>
                <Row class="login_btn">
                    <GoogleLoginButton block role='buyer'/>
                </Row>
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
            // carousel_items: [
            //     { src: "/src/assets/images/login-page/new-lss-carousel-1.jpeg" },
            //     { src: "/src/assets/images/login-page/new-lss-carousel-2.jpeg" }
            // ],
            carousel_items: [
                { src: img1 },
                { src: img2 },
                { src: img1 },
                { src: img2 },
                { src: img1 },{ src: img2 },
                { src: img1 },{ src: img2 },
                { src: img1 },
            ],
        }
    },
    methods:{
      
    }
}
</script>

<style scoped>

.carousel {
    width: 100vw !important;
    height: 100vh !important;
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
}

.login_form {
    width: 80%;
    text-align: center;
    margin-left: auto;
    margin-right: auto;

}

h3 {
    font-size: 2rem;
    margin-left: auto;
    margin-right: auto;
    margin-top: 2rem;
}

.login_btn {
    margin: 20px 0 0 30px;
}


</style>