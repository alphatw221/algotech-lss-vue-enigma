<template>
    <div>
        <Carousel 
            autoplay
            autoplay-speed="5000" 
            loop
        >
            <!-- <CarouselItem >
                <img src="./src/assets/images/login-page/new-lss-carousel-1.jpeg" class="carousel"/>
            </CarouselItem>
            <CarouselItem >
                <img src="./src/assets/images/login-page/new-lss-carousel-2.jpeg" class="carousel"/>
            </CarouselItem> -->

            <CarouselItem v-for="carousel in carousel_items" :key="carousel.src">
                <img :src="carousel.src" class="carousel"/>
            </CarouselItem>

        </Carousel>
        
        <Card style="width:400px; height: 600px; opacity: .9;" class="center">
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

            <Row class="login_btn">
                <FacebookLoginButton block role='buyer'/>
            </Row>
            <Row class="login_btn">
                <GoogleLoginButton block role='buyer'/>
            </Row>
            <Row style="margin-top: 20px;">
                <div style="font-size:18px; margin-left: 80px;">No Account ? <a href="">Create one !</a></div>
            </Row>
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
                { src: img2 }
            ],
        }
    },
    methods:{
      
    }
}
</script>

<style scoped>

.carousel {
    width: 100%;
    max-height: 100%;
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

.ivu-input-group {
    font-size: 18px !important;
}

</style>