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
        
        <Card class="center flex flex-col items-center text-center">
            <h3>Login</h3>

            <Form  style="margin-top:50px;">
                <FormItem prop="email" class="login_form">
                    <Input type="text" v-model="loginData.email" placeholder="E-mail" class="formLabel">
                        <template #prepend>
                        <Icon type="ios-person-outline"></Icon>
                        </template>
                    </Input>
                </FormItem>
                <FormItem prop="password" class="login_form">
                    <Input type="password" v-model="loginData.password" placeholder="Password" class="formLabel">
                        <template #prepend>
                        <Icon type="ios-lock-outline"></Icon>
                        </template>
                    </Input>
                </FormItem>
                <FormItem class="login_form">
                    <button type="button" class="btn bg-emerald-600 text-lg w-full h-10 text-white" @click="signIn()" >Sign in</button>
                </FormItem>
            </Form>

            <a class="m-auto p-0 item-center text-[16px]" @click="this.$router.push({ path: '/password/forgot' })">forgot password ?</a>
            <div class="SeparatorRow">or</div>

            <div class="mt-5 flex flex-col items-center">
                    <FacebookLoginButton block role='seller'/>
                    <GoogleLoginButton block role='seller'/>
                    <div class="mt-5 mb-5 text-[16px]">No Account ? <a href="lss/#/registration/SG">Create one !</a></div>
            </div>
        </Card>
    </div>
</template>

<script setup>
import { seller_general_login } from '@/api_v2/user';
import FacebookLoginButton from '@/components/button/FacebookLoginButton.vue';
import GoogleLoginButton from '@/components/button/GoogleLoginButton.vue';

import img1 from '/src/assets/images/login-page/new-lss-carousel-1.jpeg'
import img2 from '/src/assets/images/login-page/new-lss-carousel-2.jpeg'

import {ref, onMounted} from 'vue'
import {useRoute, useRouter} from 'vue-router'

import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

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
const loginData = ref(
    {email:'',password:''})
// const ruleInline = ref( {
//                         email: [
//                             { required: true, message: 'Please fill in the email', trigger: 'blur' }
//                         ],
//                         password: [
//                             { required: true, message: 'Please fill in the password.', trigger: 'blur' },
//                             { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
//                         ]
//                     })

const carousel_items = ref([
                { src: img1 },
                { src: img2 },
            ])

const copyLink = ()=>{
    navigator.clipboard.writeText(currentUrl.value).then(()=>{
        alert('copied!')
    })
}

const signIn = ()=>{
    // console.log('signIn')
    seller_general_login(loginData.value).then(response=>{
        cookies.set("access_token", response.data.access)
        router.push(`/seller/campaigns`)
    }).catch(err=>{
        console.log(err)
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
    width:400px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background:rgba(255, 255, 255, 0.9);
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

/*  分隔線  */
.SeparatorRow{
    position: relative;
    text-align: center;
    overflow: hidden;
    font-size: 18px;
    font-style: oblique;
    color: rgb(59, 59, 59);
} .SeparatorRow::before,.SeparatorRow::after{
    content: '';
    display: inline-block;
    width: 100%;
    height: 1px;
    position: absolute;
    background: rgba(112, 112, 112, 0.664);
    top: 50%;
} .SeparatorRow::before{
    margin-left: -10px;
    transform: translateX(-100%);
} .SeparatorRow::after{
    margin-left: 10px; }
</style>