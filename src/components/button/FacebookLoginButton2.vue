<template>
    <a class="loginBtn loginBtn--facebook" 
    :href="`https://www.facebook.com/v15.0/dialog/oauth?client_id=967598017063136&scope=public_profile,email&response_type=code&redirect_uri=${redirect_uri}&state=${computedState}`">Login with Facebook</a>

</template>

<script setup>
import loadScript from '@/libs/loadScript.js';
import { buyer_login_with_facebook, seller_login_with_facebook} from '@/api_v2/user'
import { ref, reactive, onMounted, getCurrentInstance, onUnmounted, watch, computed, defineProps, onBeforeMount } from "vue";
import { useCookies } from "vue3-cookies"
import { useRoute, useRouter } from "vue-router";

const props = defineProps({
  role:String
});


const { cookies } = useCookies();
const route = useRoute();
const router = useRouter();

// const redirect_uri = 'https://70bc-58-115-115-75.jp.ngrok.io/oauth/redirect/'
const redirect_uri = import.meta.env.VITE_APP_ROOT_API+'/oauth/redirect/'
const computedState = computed(()=>{
    const state = {
        redirect_to:window.location.href,
        redirect_uri:redirect_uri,
        platform:'facebook'
    }
    return JSON.stringify(state)
})
// const redirect_uri = import.meta.env.VITE_APP_ROOT_API+'/oauth/redirect'

// const key = "access_token"
// onBeforeMount(()=>{
//     const hash = window.location.hash
//     if(!hash)return
//     const access_token = hash.substring(hash.indexOf(key)+key.length+1,hash.indexOf("&"))
//     if(!access_token)return
//     if(cookies.get('access_token'))return 

//     const loginRequest = props.role == 'buyer' ? buyer_login_with_facebook : seller_login_with_facebook
//     loginRequest({facebook_token: access_token})
//     .then(response => {
//         cookies.set('access_token', response.data.access)
//         cookies.set('login_with', 'facebook')
//     }).then(()=> {
//         router.go()
//     })
    

// })

</script>

<style scope>

/* Shared */
.loginBtn {
  box-sizing: border-box;
  position: relative;
  width: 16em;  
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


/* Facebook */
.loginBtn--facebook {
  background-color: #4C69BA;
  background-image: linear-gradient(#4C69BA, #3B55A0);
  /*font-family: "Helvetica neue", Helvetica Neue, Helvetica, Arial, sans-serif;*/
  text-shadow: 0 -1px 0 #354C8C;
}
.loginBtn--facebook:before {
  border-right: #364e92 1px solid;
  background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_facebook.png') 6px 6px no-repeat;
}
.loginBtn--facebook:hover,
.loginBtn--facebook:focus {
  background-color: #5B7BD5;
  background-image: linear-gradient(#5B7BD5, #4864B1);
}
</style>