<template>
    <div id="g_login_button" style="margin: 10px 0 0 0;"></div>
</template>

<script>
import loadScript from '@/libs/loadScript.js';
import { buyer_login_with_google, seller_login_with_google } from '@/api_v2/user'
import { useLSSBuyerLayoutStore } from '@/stores/lss-buyer-layout';
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';

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
                    const store = this.role == 'buyer' ? useLSSBuyerLayoutStore() : useLSSSellerLayoutStore()

                    loginRequest({google_token:res.credential})
                    .then(response => {

                        var set_cookie = new Promise((res) => {
                            this.$cookies.set("access_token", response.data.access)
                            this.$cookies.set("refresh_token", response.data.refresh)
                            res()
                        })
                        set_cookie.then(() => {
                            store.loginWith='google'
                            if (this.role == 'buyer') {
                                if (this.$route.params.pre_order_id ){
                                    this.$router.push(`/buyer/cart/${this.$route.params.pre_order_id}`)
                                } else {
                                    this.$router.push(`/buyer/`)
                                }
                            } else if (this.role == 'seller') {
                                this.$router.push(`/seller/campaign-list`)
                            }
                        })
                    })
                }
            });
            window.google.accounts.id.renderButton(
                document.getElementById("g_login_button"),
                { theme: "white", size: "large", width: "310", locale: "en" }  // customization attributes
            );
            window.google.accounts.id.renderButton(
                document.getElementById("g_login_button").style.font = "bold arial,serif"  // customization attributes 
            );
            window.google.accounts.id.renderButton(
                document.getElementById("g_login_button").style.boxShadow = "0px 0px 2px 0.5px rgba(0, 0, 0, 1)"  // customization attributes 
            );
            window.google.accounts.id.renderButton(
                document.getElementById("g_login_button").style.borderRadius = "2% 2%"  // customization attributes 
            );
        });
    },
}
</script>