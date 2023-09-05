<template>
<div class="bg-white h-[100vh] w-[100vw] relative"> 
    <!-- <div class="round hidden sm:block"> 
        <img src="/src/assets/images/login-page/bg.svg" class="whiteCircle" />
        <img src="/src/assets/images/login-page/robot.svg"  class="robot" />    
    </div> -->
    <!-- <div class="loginContainer w-full sm:w-[480px] m-0 sm:mr-[10%] bg-red-500/25 sm:bg-transparent float-center sm:float-right"> 
        <img src="/src/assets/images/login-page/mobile_login_robot.svg" class="sm:hidden absolute right-1/2 translate-x-1/2 top-2" />
        <img src="/src/assets/images/login-page/mobile_login_robot_hand.svg"  class="sm:hidden absolute top-1/4 left-20 z-10 -translate-y-1/3 -rotate-3" />    
        <img src="/src/assets/images/login-page/mobile_login_robot_hand.svg"  class="sm:hidden absolute top-1/4 right-20 z-10 -translate-y-1/3 rotate-3" />    
    <div class="flex flex-col
            w-full p-10
            abosolute z-0 top-1/4 right-50  
            items-center  text-center  center  
            sm:h-fit sm:w-[375px] 
            bg-white 
            sm:opacity-95  sm:translate-y-1/3 sm:top-0 
            ">

        <img src="/src/assets/images/lss-logo/LSS_logo_words.png" class="w-[200px]" />

        <slot :name="'form'"></slot>

        

    </div>
    </div> -->
    

    <!-- <div class=" form-container 
            flex flex-col
            w-full p-10
            absolute z-0 top-1/4 right-50  
            items-center  text-center  
            bg-white 
            sm:opacity-95  sm:translate-y-1/3 sm:top-0 sm:h-fit sm:w-[375px] 
            "> -->
    <div class=" form-container 
           
            ">

        <img src="/src/assets/images/lss-logo/LSS_logo_words.png" class="w-[200px]" />

        <slot :name="'form'"></slot>

    </div>


</div>
    
</template>

<script setup>


</script>

<style scoped>

.board{
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    position: relative;
    z-index: 0;
}
.round{
    height: 150vh;
    width: 150vh;
    background-color: rgba(255, 0, 0, 0.651);
    position: absolute;
    right: 55%;
    bottom: -25%;
    z-index: -99;
    border-radius: 100vh;
}
.whiteCircle{
    z-index: 0;
    height: 100vh;
    width: 100vh;
    top: 58%;
    left: -3%;
    transform: translate(50%, -50%);
    position: absolute;
}
.robot{
    z-index: 0;
    width: 480px;
    top: 50%;
    left: 50%;
    transform: translate(50%, -50%);
    position: absolute;
}
.loginContainer{
    height: 100vh;
    position: relative;
}
.form-container{
    position: absolute;
    top:15%;
    left:10%;
}
</style>
