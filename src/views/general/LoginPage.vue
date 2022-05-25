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
        
        <Card style="width:400px; height: 600px; opacity: .9;" class="center">
            <Row><h3>Login</h3></Row>

            <Form ref="loginForm" :model="loginForm" :rules="ruleInline" style="margin-top:50px;">
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
            <Divider plain :size="small">or</Divider>

            <Row class="login_btn">
                <FacebookLoginButton :busName="'sellerFacebookLogin'" block/>
            </Row>
            <Row class="login_btn">
                <!-- <div id="g_id_onload"
                    data-client_id="536277208137-okgj3vg6tskek5eg6r62jis5didrhfc3.apps.googleusercontent.com"
                    data-context="signin"
                    data-ux_mode="popup"
                    data-login_uri="http://localhost:8000/api/user/google_user_login_callback"
                    data-auto_prompt="false">
                </div>

                <div class="g_id_signin"
                    data-type="standard"
                    data-shape="rectangular"
                    data-theme="outline"
                    data-text="signin_with"
                    data-size="large"
                    data-logo_alignment="left">
                </div> -->
                <div id="g_id_onload"
                    data-client_id="647555482564-u2s769q2ve0b270gnmr5bpqdfmc9tphl.apps.googleusercontent.com"
                    data-callback="handleCredentialResponse">
                </div>

                <!-- <GoogleLoginButton block /> -->
            </Row>
            <Row style="margin-top: 20px;">
                <div style="font-size:18px; margin-left: 80px;">No Account ? <a href="">Create one !</a></div>
            </Row>
        </Card>
    </div>
</template>

<script>
import { seller_login, general_login } from '@/api/user';
import FacebookLoginButton from '@/components/button/FacebookLoginButton.vue';
import GoogleLoginButton from '@/components/button/GoogleLoginButton.vue';
import loadScript from '@/libs/loadScript.js';
import { axiosInstance } from '@/libs/axiosClient'


export default {
    setup() {
        
    },
    components:{
        FacebookLoginButton,
        GoogleLoginButton
    },
    mounted() {
        loadScript("https://apis.google.com/js/platform.js",()=>{
            console.log("Google SDK loaded")
        });
        loadScript("https://accounts.google.com/gsi/client",()=>{
            console.log("Google SDK loaded")
        });

        this.eventBus.on('sellerFacebookLogin', payload=>{
            seller_login(payload).then(response=>{
                var set_cookie = new Promise((res)=>{
                    this.$cookies.set("access_token", response.data.access)
                    res()
                })
                set_cookie.then(()=>{
                    this.$router.push('/')
                })
            }).catch(error=>{
                alert(error)
            })
        })
    },
    unmounted(){
        this.eventBus.off('sellerFacebookLogin')
    },
    data() {
        return {
            carousel_items: [
                { src: "/src/assets/images/login-page/new-lss-carousel-1.jpeg" },
                { src: "/src/assets/images/login-page/new-lss-carousel-2.jpeg" }
            ],
            loginForm: {
                email: '',
                password: ''
            },
            ruleInline: {
                email: [
                    { required: true, message: 'Please fill in the email', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                    { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        _general_login() {
            general_login(this.loginForm).then(response=>{
                var set_cookie = new Promise((res) => {
                    this.$cookies.set("access_token", response.data.access)
                    res()
                })
                set_cookie.then(()=>{
                    this.$router.push('/')
                })
            })
        },
        // handleCredentialResponse(response) {
        //     axiosInstance()
        //     .get(`/api/user/google_user_login_callback?token=${response.credential}`)
        //     .then(res => {
        //         res.json().then(result => {
        //             this.$cookies.set("access_token", result.access)
        //             if (result.refresh) GS.set_refresh_token(result.refresh)
        //             $('div.login-spinner').addClass('d-none');
        //             this.$router.push('/')
        //         })
        //     }).catch(error => {
        //         error.json().then(json => {
        //             alert(json.message);
        //         })
        //     }).catch(error =>{
        //         alert('Oops! Encounter api server error. Please contact tech support.');
        //     })
        // },
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