<template>
<div class="board bg-white">
    <div class="flex flex-col sm:flex-row justify-between">
        <div class="redSide relative w-screen h-[30vh] sm:h-screen sm:w-[45vw]"> 
            <img src="/src/assets/images/login-page/forgot_robot.svg"  class="robot max-h-full sm:max-h-[480px]" />    
        </div>
        <div class="relative w-[100vw] sm:w-[400px] h-[70vh] sm:h-screen mx-auto loginContainer"> 
            <div class="flex flex-col items-center p-10 text-center center w-full sm:w-[375px] top-2 sm:top-[29%] translate-x-1/2">
                <img src="/src/assets/images/lss-logo/LSS_logo_words.png" class="w-[200px]" />


                <slot :name="'form'"></slot>

                
            </div>
        </div>
    </div> 
</div>
</template>

<script setup >


import {ref, onMounted, onBeforeMount } from 'vue'

onBeforeMount (()=>{document.querySelector('body').setAttribute('style', 'padding-left: 0; padding-right: 0; overflow: hidden; height:100vh;')} )
</script>

<style scoped>
.resend_btn {
    background-color:  rgba(255, 0, 0, 0.795); 
    color: white; 
    font-size: 16px;
    height: 45px;
}
.board{
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    position: relative;
    z-index: 0;
}

.center {
    position: relative;
    background:rgba(255, 255, 255, 0.95);
    right: 50%;
    height: 100%;
}

.redSide{
    background-color: rgba(255, 0, 0, 0.651);
    z-index: 5;
}
.robot{
    z-index: 0;
    top: 50%;
    right: 43%;
    transform: translate(50%, -50%);
    position: absolute;

}
.loginContainer{
    z-index: 1;
}
</style>