<template>
    <a class="loginBtn loginBtn--google" 
    :href="`https://accounts.google.com/o/oauth2/auth?client_id=536277208137-okgj3vg6tskek5eg6r62jis5didrhfc3.apps.googleusercontent.com&scope=email+profile&response_type=code&redirect_uri=${redirect_uri}&state=${computedState}`">Login with Google </a>


</template>

<script setup>

import { buyer_login_with_google, seller_login_with_google } from '@/api_v2/user'
import { useCookies } from "vue3-cookies"
import { useRoute, useRouter } from "vue-router";
import { ref, reactive, onMounted, getCurrentInstance, onUnmounted, watch, computed, defineProps, onBeforeMount } from "vue";

const props = defineProps({
  role:String
});

const { cookies } = useCookies();
const route = useRoute();
const router = useRouter();

// const redirect_uri = 'https://70bc-58-115-115-75.jp.ngrok.io/oauth/redirect/'

// const redirect_uri = import.meta.env.VITE_APP_ROOT_API+'/oauth/redirect/'
const redirect_uri = 'https://'+window.location.host+'/oauth/redirect/'
const computedState = computed(()=>{
    const state = {
        redirect_to:window.location.href,
        redirect_uri:redirect_uri,
        platform:'google'
    }
    return JSON.stringify(state)
})


// const key = "access_token"
// onBeforeMount(()=>{

//     // const hash = window.location.hash
//     // if(!hash)return
//     // const access_token = hash.substring(hash.indexOf(key)+key.length+1,hash.indexOf("&"))
//     // if(!access_token)return
//     // if(cookies.get('access_token'))return 

//     // const loginRequest = this.role=='buyer' ? buyer_login_with_google : seller_login_with_google

//     // loginRequest({google_token:res.credential})
//     // .then(response => {
//     //     cookies.set('access_token', response.data.access)
//     //     cookies.set("refresh_token", response.data.refresh)
//     //     cookies.set('login_with', 'facebook')
//     // }).then(()=> {
//     //     router.go()
//     // })

// })

// </script>

<style scope>


/* Shared */
.loginBtn {
  box-sizing: border-box;
  position: relative;
  width: 13em;  
  margin: 0.2em;
  padding: 0 15px 0 46px;
  border: none;
  text-align: left;
  line-height: 34px;
  white-space: nowrap;
  border-radius: 0.2em;
  font-size: 16px;
  color: #FFF;
}
.loginBtn:before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 34px;
  height: 100%;
}
.loginBtn:focus {
  outline: none;
}
.loginBtn:active {
  box-shadow: inset 0 0 0 32px rgba(0,0,0,0.1);
}


/* Google */
.loginBtn--google {
  /*font-family: "Roboto", Roboto, arial, sans-serif;*/
  background: #DD4B39;
}
.loginBtn--google:before {
  border-right: #BB3F30 1px solid;
  background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_google.png') 6px 6px no-repeat;
}
.loginBtn--google:hover,
.loginBtn--google:focus {
  background: #E74B37;
}
</style>