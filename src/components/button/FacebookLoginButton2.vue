<template>

    <button type="button" @click="loginWithFacebook()"> login with facebook</button>
    <!-- <fb:login-button scope="public_profile,email" onlogin="checkLoginState();">
    </fb:login-button> -->


    <!-- <div id="spinner">
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
    </div> -->
    <div id="debug1"></div>
    <div id="debug2"></div>
    <div id="debug3"></div>
    <div id="debug4"></div>
    <div id="debug5"></div>
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

    var div = document.createElement( "div" )
    div.id='fb-root'

    var script = document.createElement( "script" )
    script.id='fb-sdk-script'
    script.async=true
    script.defer=true
    script.crossOrigin="anonymous"
    script.src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v15.0&appId=967598017063136&autoLogAppEvents=1"
    script.nonce="sdNz3djI"

    var body = document.getElementsByTagName( "body" )[0]
    body.insertBefore(script, body.firstChild)
    body.insertBefore(div, body.firstChild)




    //facebook SDK use eval() at backend
    // loadScript("https://connect.facebook.net/en_US/sdk.js",()=>{
    //     console.log("FB SDK loaded")
    //     window.fbAsyncInit = function() {
    //         window.FB.init({
    //             appId: import.meta.env.VITE_APP_FB_APP_ID, 
    //             cookie: true,
    //             xfbml: true,
    //             version: "v13.0",
    //         });
    //     }
    // });
    // window.checkLoginState = () => {
    //     window.FB.getLoginStatus(response => {
    //         if (response.status === 'connected') {
    //             const loginRequest = role == 'buyer' ? buyer_login_with_facebook : seller_login_with_facebook

    //             loginRequest({facebook_token: response.authResponse.accessToken})
    //             .then(response => {
    //                 cookies.set('access_token', response.data.access)
    //                 cookies.set('login_with', 'facebook')
    //             }).then(()=> {
    //                 router.go()
    //             })
    //         } 
    //     });
    // }
})


const loginWithFacebook = ()=>{


    console.log(FB)
    console.log(window.FB)
    document.getElementById('debug1').innerText=FB
    document.getElementById('debug2').innerText=window.FB
    
    FB.login(res=>{
        console.log(res.status)
        document.getElementById('debug3').innerText=res.status

        if (res.status === 'connected') {
            buyer_login_with_facebook({facebook_token: res.authResponse.accessToken})
            .then(response => {
                cookies.set('access_token', response.data.access)
                cookies.set('login_with', 'facebook')
            }).then(()=> {
                router.go()
            })
        } 


    }
    ,{scope:'public_profile,email'})
}

    

onUnmounted(()=>{
    document.getElementById('fb-root').remove()
    document.getElementById('fb-sdk-script').remove()
})
</script>
