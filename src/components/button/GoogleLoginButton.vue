<template>
    <div class="google-login-btn">
        <a 
        style="margin: auto"
        v-bind:href="googleLoginHyperReference" role="button" >
            <img width="24"
            alt="Google sign-in" 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" 
            />
            Log in with Google
    </a>
    </div>
    

</template>

<script>
import loadScript from '@/libs/loadScript.js';

export default {
    props: {
        pathDir: String,
    },
    data(){
        return {
            scopes:[
                "https://www.googleapis.com/auth/youtube"+"%20",
                "https://www.googleapis.com/auth/userinfo.email"+"%20",
                "https://www.googleapis.com/auth/userinfo.profile"
            ],
            // redirect_uri:"gipassl.algotech.app/api/user/google_user_login_callback",
            callback_uri:"http://localhost:8000/api/user/google_user_login_callback",
            redirect_uri:"https://localhost:8080/"+ this.pathDir,
            redirect_route:"test_page1",
            response_type:"code",
            client_id:"536277208137-okgj3vg6tskek5eg6r62jis5didrhfc3.apps.googleusercontent.com",
            access_type:"offline",
        }
    },
    mounted() {
        loadScript("https://accounts.google.com/gsi/client",()=>{
            console.log("Google SDK loaded")
        });
    },
    computed:{
        googleLoginHyperReference(){
            let href=`https://accounts.google.com/o/oauth2/v2/auth?`
            href+=`redirect_uri=${this.callback_uri}&`
            href+=`response_type=${this.response_type}&`
            href+=`client_id=${this.client_id}&`
            href+=`access_type=${this.access_type}&`
            // href+=`state=${this.redirect_uri},${this.callback_uri}&`
            href+=`state=${JSON.stringify({
                redirect_uri:this.redirect_uri,
                redirect_route:this.redirect_route,
                callback_uri:this.callback_uri
                })}&`

            href+=`scope=`
            this.scopes.forEach(value=>{
                href+=value
            })
            // for (const scope in this.scopes) href+=scope
            return href
        }
    },
}

</script>

<style scoped>
.google-login-btn {
    background-color: white;
    width:310px;
    height:45px;
    padding: 10px 8px;
    margin-top:2px;
    font-weight: 700; 
    font-size: 16px;
    border: 1.5px solid rgb(112, 112, 112);
    border-radius: 5px;
    text-align: center;
}

img{
    float:left;
    margin-bottom: 1px;
}
</style>


