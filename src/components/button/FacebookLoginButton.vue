<template>
    <div id="spinner">
        <div class="fb-login-button" 
            data-width="310px"
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

<script>
import loadScript from '@/libs/loadScript.js';
import { buyer_login_with_facebook, seller_login_with_facebook} from '@/api_v2/user'

export default {
    props:{
        role:String
    },
    mounted(){
        loadScript("https://connect.facebook.net/en_US/sdk.js",()=>{
            console.log("FB SDK loaded")
            window.fbAsyncInit = function() {
                FB.init({
                    appId: import.meta.env.VITE_APP_FB_APP_ID, 
                    cookie: true,
                    xfbml: true,
                    version: "v13.0",
                });
            }

            window.checkLoginState=() => {   //facebook SDK use eval() 
                window.FB.getLoginStatus(response => {
                    if (response.status === 'connected') {
                        const payload = {'accessToken': response.authResponse.accessToken}
                        this.eventBus.emit(this.busName, payload)

                        const loginRequest = this.role=='buyer' ? buyer_login_with_facebook : seller_login_with_facebook
                        loginRequest({facebook_token:response.authResponse.accessToken})
                        .then(response => {
                            var set_cookie = new Promise((res) => {
                                this.$cookies.set("access_token", response.data.access)
                                res()
                            })
                            set_cookie.then(() => {
                                console.log(this.$route.params)
                                if(this.$route.params.pre_order_id ){
                                    this.$router.push(`/buyer/cart/${this.$route.params.pre_order_id}`)
                                }else{
                                    this.$router.push(`/buyer/`)
                                }

                            })
                        })



                    } 
                });
            }
        });

        
    },
    unmounted(){
        window.checkLoginState = undefined
    }
}
</script>
