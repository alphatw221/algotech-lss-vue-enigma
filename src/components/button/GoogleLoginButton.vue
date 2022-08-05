<template>
    <div id="g_login_button" class="w-fit"> </div>
   
</template>

<script>
import loadScript from '@/libs/loadScript.js';
import { buyer_login_with_google, seller_login_with_google } from '@/api_v2/user'

export default {
    props:{
        role:String
    },
    mounted() {
        loadScript("https://accounts.google.com/gsi/client",() =>{
            console.log("Google SDK loaded")
            window.google.accounts.id.initialize({
                client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
                callback: res => {

                    const loginRequest = this.role=='buyer' ? buyer_login_with_google : seller_login_with_google

                    loginRequest({google_token:res.credential})
                    .then(response => {

                        var set_cookie = new Promise((res) => {
                            this.$cookies.set("access_token", response.data.access)
                            this.$cookies.set("refresh_token", response.data.refresh)
                            this.$cookies.set("login_with", "google")
                            res()
                        })
                        set_cookie.then(() => {
                            this.$router.go()
                        })
                    })
                }
            });
            window.google.accounts.id.renderButton(
                document.getElementById("g_login_button"),
                { theme: 'light', size: "large", width: "300" }  // customization attributes
            );
            // window.google.accounts.id.renderButton(
            //     document.getElementById("g_login_button").style.fontSzie = "16px !important"  // customization attributes 
            // );
            window.google.accounts.id.renderButton(
                document.getElementById("g_login_button").style.boxShadow = "0px 0px 0px 0.5px rgba(0, 0, 0, 0.5)"  // customization attributes 
            );
            window.google.accounts.id.renderButton(
                document.getElementById("g_login_button").style.borderRadius = "3% 3%"  // customization attributes 
            );
            // window.google.accounts.id.renderButton(
            //     document.getElementById("g_login_button").style.zIndex = "9999"  // customization attributes 
            // );
        });
    },
}
</script>
