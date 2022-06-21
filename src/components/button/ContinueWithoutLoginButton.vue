<template>
    <button @click="continueWithoutLogin">Continue Without Login</button>
</template>

<script setup>
import { buyer_login_with_google, seller_login_with_google } from '@/api_v2/user'
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

const continueWithoutLogin = ()=>{
    var set_cookie = new Promise((res) => {
                            cookies.set("login_with", "anonymousUser")
                            res()
                        })
                        set_cookie.then(() => {
                            this.$router.go()
                        })
}
</script>