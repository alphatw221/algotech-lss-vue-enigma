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
                <FacebookLoginButton role='seller' block/>
            </Row>
            <Row class="login_btn">
                <GoogleLoginButton block role='seller'/>
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
                    store.$patch((state) => {
                        state.accessToken = response.data.access;
                    })
                    res()
                })
                set_cookie.then(()=>{
                    this.$router.push('/')
                })
            })
        }
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