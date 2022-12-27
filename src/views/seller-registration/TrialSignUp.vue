<template>
    <div class="board bg-red-600/80"> 
        <LoadingIcon icon="three-dots" color="1a202c" class="absolute body-middle" v-if="ready== false" />
        <img src="/src/assets/images/login-page/login-bot.svg"  class="robot hidden xl:block" />    
        <div class="round hidden sm:block xl:-right-1/3 2xl:-right-1/4"></div>
        <div class="form_container w-full sm:w-[480px] sm:mr-[10%] sm:bg-transparent float-center sm:float-right"> 
            <div class="flex flex-col relative items-center p-10 text-center z-0 w-full h-[100vh] justify-start sm:justify-center bg-white sm:opacity-95 my-auto">
                <img src="/src/assets/images/lss-logo/LSS_logo_words.png" class="w-[200px] sm:w-[250px]" />

                <h3 class="text-[2rem] mx-auto my-6 font-medium" >{{$t('register.trial_register.trial_signup')}}</h3>

                <form class="w-full full flex-col flex gap-3 sm:gap-4 z-10 text-[16px]">

                    <div class="flex flex-row gap-5"> 
                        <div class="flex flex-col justify-start w-full"> 
                            <label class="form_label text-left"> {{ $t('register.trial_register.last_name') }}</label>
                            <input type="text" class="px-4 rounded-lg form-control form_input"
                            v-model.trim="v.lastName.$model" />

                            <template v-if="v.lastName.$error">
                                <p  
                                    v-for="(error, index) in v.lastName.$errors" :key="index"
                                    class="text-danger text-left pl-2"
                                    > {{ error.$message }} </p>
                            </template>
                        </div>
                        <div class="flex flex-col justify-start w-full"> 
                            <label class="form_label text-left"> {{ $t('register.trial_register.first_name') }}</label>
                            <input type="text" class="px-4 rounded-lg form-control form_input"
                                v-model.trim="v.firstName.$model" />

                            <template v-if="v.firstName.$error">
                                <p  
                                    v-for="(error, index) in v.firstName.$errors" :key="index"
                                    class="text-danger text-left pl-2"
                                    > {{ error.$message }} </p>
                            </template>
                        </div>
                    </div>

                    <div class="flex flex-row gap-5"> 
                        <div class="flex flex-col justify-start w-full"> 
                            <label class="form_label text-left"> {{ $t('register.trial_register.country_code') }}</label>
                            <select v-model.trim="v.countryCode.$model" class="px-4 rounded-lg form-select form_input"> 
                                <option v-for="code in countryCodeList" :key="code" :value="code.value"> 
                                    {{ $t('register.trial_register.code_options', {'country':code.value,"number":code.number}) }}</option>
                            </select>
                            <template v-if="v.countryCode.$error">
                                <p  
                                    v-for="(error, index) in v.countryCode.$errors" :key="index"
                                    class="text-danger text-left pl-2"
                                    > {{ error.$message }} </p>
                            </template>
                        </div>

                        <div class="flex flex-col justify-start w-full"> 
                            <label class="form_label text-left"> {{ $t('register.trial_register.phone') }}</label>
                            <input type="text" class="px-4 rounded-lg form-control form_input"
                                v-model.trim="v.contactNumber.$model" />
                                <template v-if="v.contactNumber.$error">
                                <p  
                                    v-for="(error, index) in v.contactNumber.$errors" :key="index"
                                    class="text-danger text-left pl-2"
                                    > {{ error.$message }} </p>
                            </template>
                        </div>
                    </div>

                    <div class="flex flex-col justify-start"> 
                        <label class="form_label text-left"> {{ $t('register.trial_register.email') }}</label>
                        <div class="relative"> 
                            <input type="email" class="pr-11 px-4 rounded-lg form-control form_input"
                                placeholder="example@gmail.com" 
                                v-model.trim="v.email.$model"  />
                            <MailIcon class="absolute w-6 h-6 top-2 right-3 z-10 text-slate-400"/>
                        </div>
                        <template v-if="v.email.$error">
                            <p  
                                v-for="(error, index) in v.email.$errors" :key="index"
                                class="text-danger text-left pl-2"
                                > {{ error.$message }} </p>
                        </template>
                    </div>

                    <div class="flex flex-col relative"> 
                        <label class="form_label text-left"> {{ $t('register.trial_register.password') }}</label>

                        <input class="px-4 rounded-lg form-control form_input"
                            :placeholder="$t('register.trial_register.password_placeholder')" 
                            v-model.trim="v.password.$model"
                            :type="showPassword ? 'text' : 'password'" />
                        <EyeOffIcon v-if="showPassword"
                            @click="showPassword = !showPassword" 
                            class="absolute w-6 h-6 top-8 right-3 z-10 text-slate-400" /> 
                        <EyeIcon v-else
                            @click="showPassword = !showPassword"
                            class="absolute w-6 h-6 top-8 right-3 z-10 text-slate-400"
                            />
                        <template v-if="v.password.$error">
                            <p  
                                v-for="(error, index) in v.password.$errors" :key="index"
                                class="text-danger text-left pl-2"
                                > {{ error.$message }} </p>
                        </template>
                    </div>
                    <div class="flex flex-col relative"> 
                        <label class="form_label text-left"> {{ $t('register.trial_register.confirm_password') }}</label>

                        <input class="px-4 rounded-lg form-control form_input"
                            v-model.trim="v.confirmPassword.$model"
                            :type="showPassword ? 'text' : 'password'" />
                        
                        <template v-if="v.confirmPassword.$error">
                            <p  
                                v-for="(error, index) in v.confirmPassword.$errors" :key="index"
                                class="text-danger text-left pl-2"
                                > {{ error.$message }} </p>
                        </template>
                    </div>

                    <button type="button" class="w-full text-lg text-white btn bg-red-500 mt-3" @click="register()" >{{ $t('register.trial_register.register') }}</button>
                </form>
    
                <a class="mx-auto item-center text-[16px] my-5 sm:pb-5 font-medium" @click="router.push({ name: 'login-page' })">{{ $t('register.trial_register.back_to_login') }}</a>
                
            </div>
        </div>
    </div>
    
    </template>
    
    <script setup>
    import {ref, onMounted, onBeforeMount, computed, getCurrentInstance } from 'vue'
    import { usePublicLayoutStore } from "@/stores/lss-public-layout"
    import {useRoute, useRouter} from 'vue-router'
    import { useVuelidate } from "@vuelidate/core";
    import { required,minLength,maxLength,sameAs,email,integer,helpers } from "@vuelidate/validators";
    import i18n from "@/locales/i18n"

    import { user_register_trial } from "@/api_v2/user"
    
    const internalInstance = getCurrentInstance()
    const layoutStore = usePublicLayoutStore();
    const eventBus = internalInstance.appContext.config.globalProperties.eventBus;
    const showModal = ref(false)
    const ready = ref(true)

    const countryCodeList = ref([
        {value:'TW',number:'886'},{value:'US',number:'1'},{value:'MY',number:'60'},
        {value:'AU',number:'61'},{value:'ID',number:'62'},{value:'PH',number:'63'},{value:'SG',number:'65'},
        {value:'TH',number:'66'},{value:'JP',number:'81'},{value:'KR',number:'82'},{value:'VN',number:'84'},
        {value:'CN',number:'86'}
    ])
    
    onMounted(()=>{
        
        if (navigator.userAgent.toLowerCase().indexOf('chrome') < 0 && navigator.userAgent.toLowerCase().indexOf('safari') < 0 ) {
            showReminder.value=true
        }
    })
    const router = useRouter()
    const app_i18n = getCurrentInstance().appContext.config.globalProperties.$i18n
    const currentUrl = ref(window.location.href)
    const showReminder = ref(false)
    const showPassword = ref(false)

    const registerData = ref({
        plan:'trial',
        period:'month',
        email:'',
        firstName:'',
        lastName:'',
        countryCode:'',
        contactNumber:'',
        password:'',
        confirmPassword:'',
    })
    
    const registerRules = computed(()=> {
        return {
            email: { 
                required: helpers.withMessage(i18n.global.t("vulidate.required"),required), 
                email: helpers.withMessage(i18n.global.t("vulidate.invalid_email"),email) },
            firstName:{ 
                required: helpers.withMessage(i18n.global.t("vulidate.required"),required), },
            lastName:{ 
                required: helpers.withMessage(i18n.global.t("vulidate.required"),required), },
            countryCode:{ 
                required: helpers.withMessage(i18n.global.t("vulidate.required"),required), },
                contactNumber:{ 
                required: helpers.withMessage(i18n.global.t("vulidate.required"),required),
                integer:helpers.withMessage(i18n.global.t("vulidate.invalid_cellphone"),integer) },
            password: { 
                required: helpers.withMessage(i18n.global.t("vulidate.required"),required),
                minLength: helpers.withMessage(i18n.global.t("vulidate.minimum_digits",{'number':8}),minLength(8)), 
                maxLength: helpers.withMessage(i18n.global.t("vulidate.maximum_digits",{'number':20}),maxLength(20)) },
            confirmPassword: { 
                sameAs: helpers.withMessage(i18n.global.t("vulidate.not_same_as", {'field':i18n.global.t('register.trial_register.password')}), sameAs(registerData.value.password)) }
        }
    })
    const v = useVuelidate(registerRules, registerData);


    const copyLink = ()=>{
        navigator.clipboard.writeText(currentUrl.value).then(()=>{
            alert('copied!')
        })
    }
    
    const register = ()=>{ 

        v.value.$touch();
        
        if(v.value.$invalid){
            layoutStore.alert.showMessageToast(i18n.global.t('profile.invalid_data'))
            return
        }
        ready.value= false
        user_register_trial(registerData.value.countryCode,registerData.value).then(res=>{
            ready.value= true
            console.log(res.data)
        }).catch(ready.value= true)
    }
    
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
        width: 180vh;
        background-color: rgb(255, 255, 255);
        position: absolute;
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
        width: 650px;
        top: 50%;
        left: -3%;
        transform: translate(50%, -50%);
        position: absolute;
    }
    .form_container{
        height: 100%;
        position: relative;
    }
    .form_label{
        font-size: 16px;
        margin-bottom: 0px;
        margin-left: 5px;
    }

    .form_input{
        height: 42px;
        border-color: theme('colors.slate.500');
    }

    .body-middle {
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 999;
        width: 100px;
        height: 100px;
    }
    </style>
    