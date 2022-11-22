<template>
    <div id="spinner">
        <div class="fb-login-button" 
            data-width="300px"
            data-size="large" 
            data-button-type="login_with" 
            data-layout="default" 
            data-auto-logout-link="false" 
            data-use-continue-as="true" 
            scope="public_profile,email" 
            onlogin="checkLoginState()">
        </div>
    </div>
</template>

<script setup>
import loadScript from '@/libs/loadScript.js';
import { buyer_login_with_facebook, seller_login_with_facebook} from '@/api_v2/user'
import { ref, reactive, onMounted, getCurrentInstance, onUnmounted, watch, computed } from "vue";
import { useCookies } from "vue3-cookies"
import { useRoute, useRouter } from "vue-router";


const { cookies } = useCookies();
const route = useRoute();
const router = useRouter();
const role = route.path.split('/')[1]
onMounted(()=>{
    //facebook SDK use eval() at backend
    loadScript("https://connect.facebook.net/en_US/sdk.js",()=>{
        console.log("FB SDK loaded")
        window.fbAsyncInit = function() {
            window.FB.init({
                appId: import.meta.env.VITE_APP_FB_APP_ID, 
                cookie: true,
                xfbml: true,
                version: "v13.0",
            });
        }
    });
    window.checkLoginState = () => {
        window.FB.getLoginStatus(response => {
            if (response.status === 'connected') {
                const loginRequest = role == 'buyer' ? buyer_login_with_facebook : seller_login_with_facebook

                loginRequest({facebook_token: response.authResponse.accessToken})
                .then(response => {
                    cookies.set('access_token', response.data.access)
                    cookies.set('login_with', 'facebook')
                }).then(()=> {
                    router.go()
                })
            } 
        });
    }
})
onUnmounted(()=>{
    window.checkLoginState = undefined
})
</script>
