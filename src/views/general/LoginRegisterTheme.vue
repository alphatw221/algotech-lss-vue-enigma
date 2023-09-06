<template>
<div class="bg-white h-[100vh] w-[100vw] relative"> 
    <!-- <div class="round hidden sm:block">  -->

    <div class="round z-[1] 
        right-[30%] hidden
        sm:right-[35%] sm:block
        md:right-[40%]
        lg:right-[55%]

         
    "></div> 
    <img src="/src/assets/images/login-page/bg.svg" class="whiteCircle z-[2]
        hidden 
        sm:block

    " />
    <img src="/src/assets/images/login-page/robot.svg"  class="robot z-[3]
        left-[10%] hidden 
        sm:left-[15%] sm:block
        md:left-[20%]
        lg:left-[25%]
    " />   


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
    <div class="absolute top-[0]  h-[100vh] flex flex-col justify-center content-center items-center
        right-[0%] w-[100vw] bg-red-500/25
        sm:right-[10%] sm:w-[50vw] sm:bg-transparent

    
    ">
        <div class="relative w-full sm:w-[375px]">
            
            <img src="/src/assets/images/login-page/mobile_login_robot.svg" class="sm:hidden absolute right-1/2 translate-x-1/2 bottom-[95%]" />
            <img src="/src/assets/images/login-page/mobile_login_robot_hand.svg"  class="sm:hidden absolute left-20 z-10  -rotate-3 top-[-5%]" />    
            <img src="/src/assets/images/login-page/mobile_login_robot_hand.svg"  class="sm:hidden absolute right-20 z-10  rotate-3 top-[-5%]" />  

            <div class="  
                relative
                bg-white p-10 z-[4] 
                w-full opacity-100
                sm:w-[375px] sm:opacity-95
            ">

              

                <div class="flex flex-row justify-center">
                    <img src="/src/assets/images/lss-logo/LSS_logo_words.png" class="w-[200px] " />
                </div>

                <slot :name="'form'"></slot>

            </div>
        </div>
       
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
    /* right: 55%; */
    /* left:-30%; */
    bottom: -25%;
    border-radius: 100vh;
}
.whiteCircle{

    height: 100vh;
    width: 100vh;
    top: 15%;
    left: -5%;
    /* right:60%; */
    position: absolute;
}
.robot{

    width: 480px;
    top: 15%;
    /* left: 25%; */
    /* right:50%; */
    position: absolute;
}
.loginContainer{
    height: 100vh;
    position: relative;
}
.form-container{
    position: absolute;
    top:20%;
    right:25%;

}
</style>
