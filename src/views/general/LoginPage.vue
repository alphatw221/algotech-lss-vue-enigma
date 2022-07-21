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
        
        <div class="flex flex-col items-center p-10 text-center center">
            <h3 class="text-[2rem] mx-auto mb-8" >Login</h3>
            <Form class="w-full">
                <FormItem prop="email" class="login_form">
                    <Input type="text" v-model="loginData.email" placeholder="E-mail" class="formLabel"
                        @keydown.enter.prevent="signIn()">
                        <template #prepend>
                        <Icon type="ios-person-outline"></Icon>
                        </template>
                    </Input>
                </FormItem>
                <FormItem prop="password" class="login_form">
                    <Input type="password" v-model="loginData.password" placeholder="Password" class="formLabel" 
                        @keydown.enter.prevent="signIn()">
                        <template #prepend>
                        <Icon type="ios-lock-outline"></Icon>
                        </template>
                    </Input>
                </FormItem>
                <FormItem class="login_form">
                    <button type="button" class="w-full h-10 text-lg text-white btn bg-emerald-600" @click="signIn()" >Sign in</button>
                </FormItem>
            </Form>

            <a class="mx-auto item-center text-[16px]" @click="router.push({ name: 'PasswordForgot' })">forgot password ?</a>

            <div class="flex flex-col items-center mt-5">
                <div class="text-[16px]">No Account ? <a href="/lss/#/registration/SG">Create one !</a></div>
            </div>
            <!-- <div class="flex flex-col items-center my-5">
                <FacebookLoginButton />
                <GoogleLoginButton /> 
            </div> -->
        </div>
    </div>
</template>

<script setup>
import { seller_general_login } from '@/api_v2/user';
import FacebookLoginButton from '@/components/button/FacebookLoginButton.vue';
import GoogleLoginButton from '@/components/button/GoogleLoginButton.vue';

import img1 from '/src/assets/images/login-page/new-lss-carousel-1.jpeg'
import img2 from '/src/assets/images/login-page/new-lss-carousel-2.jpeg'

import {ref, onMounted, onBeforeMount } from 'vue'
import {useRoute, useRouter} from 'vue-router'

import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

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
    // console.log('signIn')  response.data.access
    seller_general_login(loginData.value).then(response=>{
        cookies.set("access_token", response.data.access)
        router.push({name:'campaign-list'})
    }).catch(err=>{
        console.log(err)
    })
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
    width:375px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background:rgba(255, 255, 255, 0.9);
    
}

.login_form {
    width: 100%;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
}


.login_btn {
    margin: 20px 0 0 30px;
}

.ivu-input-group {
    font-size: 18px !important;
}

</style>