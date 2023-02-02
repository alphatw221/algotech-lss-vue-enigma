<template>

    <FacebookLoginButton2 :redirect_uri="redirect_uri"/>

</template>

<script setup> 
import FacebookLoginButton2 from '../../components/button/FacebookLoginButton2.vue';

const redirect_uri = import.meta.env.VITE_APP_WEB+'/buyer/test'
</script>