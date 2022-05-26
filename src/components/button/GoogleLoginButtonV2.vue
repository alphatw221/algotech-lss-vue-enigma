<template>
    <div id="g_login_button" style="margin: 10px 0 0 0;"></div>
</template>

<script>
import loadScript from '@/libs/loadScript.js';
import { axiosInstance } from '@/libs/axiosClient';

export default {
    mounted() {
        loadScript("https://accounts.google.com/gsi/client",() =>{
            console.log("Google SDK loaded")
            const config = { 
                headers: { 
                    'Content-Type': 'application/json' 
                },
                mode: 'cors' 
            }
            
            window.google.accounts.id.initialize({
                client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
                callback: res => {
                    axiosInstance
                    .get(`/api/user/google_user_login_callback?token=${res.credential}`, config)
                    .then(response => {
                        console.log(response.data)
                        var set_cookie = new Promise((res) => {
                            this.$cookies.set("access_token", response.data.access)
                            this.$cookies.set("refresh_token", response.data.refresh)
                            res()
                        })
                        set_cookie.then(() => {
                            this.$router.push('/')
                        })
                    }).catch(error => {
                        error.json().then(json => {
                            alert(json.message);
                        })
                    }).catch(error =>{
                        alert('Oops! Encounter api server error. Please contact tech support.');
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