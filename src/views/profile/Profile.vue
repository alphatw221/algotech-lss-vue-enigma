<template>
    <TabGroup>
        <TabList class="nav-link-tabs w-96 intro-y flex items-center mt-8">
            <Tab class="w-36 lg:w-48 2xl:w-48 py-2 text-lg font-medium m-0" tag="button">Profile</Tab>
            <Tab class="w-36 lg:w-48 2xl:w-48 py-2 text-lg font-medium" tag="button">Subscription</Tab>
        </TabList>
        <TabPanels>
            <TabPanel class="leading-relaxed">
                <div class="intro-y box p-5 mt-5">
                    <div v-show="!editModal"
                        class="flex flex-col lg:flex-row w-fit border-b border-slate-200/60 dark:border-darkmode-400 pb-5 -mx-5">
                        <div class="flex flex-wrap flex-1 px-5 items-center justify-center">
                            <div class="w-32 h-32 flex-none image-fit relative m-8 lg:m-10 2xl:m-10">
                                <img alt="Midone Tailwind HTML Admin Template" class="rounded-full"
                                    :src="$f()[0].photos[0]" />
                                <div
                                    class="absolute mb-1 mr-1 flex items-center justify-center bottom-0 right-0 bg-primary rounded-full p-2">
                                    <CameraIcon class="w-4 h-4 text-white" />
                                </div>
                            </div>
                            <button class="btn btn-outlined m-3 lg:m-5 2xl:m-5" @click="editModal=true"> Edit Profile </button>
                        </div>
                        <div
                            class="mt-6 lg:mt-0 flex-1 px-5 border-l border-r border-slate-200/60 dark:border-darkmode-400 border-t lg:border-t-0 pt-5 lg:pt-0 ">
                            <div class="flex flex-col justify-center items-center lg:items-start mt-0 lg:mt-4 2xl:mt-4">
                                <div class="w-fit sm:w-40 truncate sm:whitespace-normal font-medium text-lg mb-5">
                                    {{ $f()[0].users[0].name }}
                                </div>
                                <div class="truncate sm:whitespace-normal flex items-center">
                                    <MailIcon class="w-4 h-4 mr-2" />
                                    {{ $f()[0].users[0].email }}
                                </div>
                                <div class="truncate sm:whitespace-normal flex items-center mt-3">
                                    Password:
                                    12345678  <EyeOffIcon class="w-4 h-4 ml-2"/> 
                                </div>
                                <div class="truncate sm:whitespace-normal flex items-center mt-3">
                                    <PhoneIcon class="w-4 h-4 mr-2" />
                                    925-4754256
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-show="editModal">
                        <div class="grid grid-cols-12 px-5 justify-center justify-items-center">
                            <div class="col-span-12 lg:col-span-3 2xl:col-span-3 w-32 h-32 flex-none image-fit relative m-8 lg:m-10 2xl:m-10">
                                <img alt="Midone Tailwind HTML Admin Template" class="rounded-full"
                                    :src="$f()[0].photos[0]" />
                                <div
                                    class="absolute mb-1 mr-1 flex items-center justify-center bottom-0 right-0 bg-primary rounded-full p-2">
                                    <CameraIcon class="w-4 h-4 text-white" />
                                </div>
                            </div>
                            <div
                            class="col-span-12 lg:col-span-9 2xl:col-span-9 w-full mt-0 p-0 lg:px-10 2xl:px-10">
                                <div>
                                    <div>
                                        <label class="form-label">First Name</label>
                                        <input type="text" class="form-control" disabled />
                                    </div>
                                    <div class="mt-3">
                                        <label class="form-label">Last Name</label>
                                        <input type="text" class="form-control" disabled />
                                    </div>
                                </div>
                                <div class="mt-3">
                                    <label class="form-label">Email</label>
                                    <input type="text" class="form-control"/>
                                </div>
                                <div class="mt-3">
                                    <label class="form-label">Old Password</label>
                                    <input type="password" class="form-control" />
                                </div>
                                <div class="mt-3">
                                    <label class="form-label">New Password</label>
                                    <input type="text" class="form-control"/>
                                    <div class="form-help">
                                        Password should be at least 8 characters
                                    </div>
                                </div>
                                <div class="mt-3">
                                    <label class="form-label">Phone</label>
                                    <input type="text" class="form-control"/>
                                </div>
                                <div class="flex justify-center lg:justify-end 2xl:justify-end mt-5">
                                    <button class="btn btn-outline-primary mr-auto lg:mr-10 2xl:mr-10" @click="editModal = false">
                                    Cancel</button>
                                    <button class="btn btn-outline-primary">
                                    Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </TabPanel>
            <TabPanel class="box leading-relaxed">
                <div  class="intro-y box p-10 m-5 text-sm lg:text-xl 2xl:text-xl" >
                    <div class="grid grid-cols-12 gap-5">
                        <div class="col-span-12 lg:col-span-8 2xl:col-span-8">
                            <table class="pa-5 w-full">
                                <thead>
                                    <tr class="p-4">
                                        <th class="flex">
                                            <span class="current_plan mr-2"> Primeum </span>
                                            <AwardIcon />
                                        </th>
                                        <th> Joined: <span style="text-align:right;">
                                                xxxx </span></th>
                                    </tr>
                                </thead>
                                <tbody class="mt-10">
                                    <tr class="p-4"> 
                                        <td class="p-4">Subscription ID </td>
                                        <td class="p-4"> xxxx </td>
                                    </tr>
                                    <tr class="p-4">
                                        <td class="p-4">Vaild till</td>
                                        <td class="p-4"> xxxx</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="col-span-12 lg:col-span-4 2xl:col-span-4 pa-10 mt-5 justify-self-center">
                            <button class="btn btn-elevated-success capitalize text-white" @click="this.$router.push('/changeplan/payment')">
                                Change Plan</button>
                        </div>
                    </div>
                </div>
            </TabPanel>
        </TabPanels>
    </TabGroup>


</template>

<script setup>
import { computed, onMounted, provide, ref, watch } from "vue";
import { useLSSBuyerLayoutStore } from "@/stores/lss-buyer-layout";
import dom from "@left4code/tw-starter/dist/js/dom";

const buyerLayoutStore = useLSSBuyerLayoutStore();
const editModal = ref(false);
onMounted(() => {
    console.log(buyerLayoutStore.userInfo.name)
});

const userAvatar = computed(() => {
    if (buyerLayoutStore.loginWith == 'facebook') {
        return buyerLayoutStore.userInfo.facebook_info.picture
    } else if (buyerLayoutStore.loginWith == 'google') {
        return buyerLayoutStore.userInfo.google_info.picture
    }
    if (buyerLayoutStore.userInfo.facebook_info.picture) {
        return buyerLayoutStore.userInfo.facebook_info.picture
    }
    return buyerLayoutStore.userInfo.google_info.picture
});

</script>


<style scoped>

.current_plan{
    --height:30px;
    cursor:default;
    outline: none;
    border: 1px solid gray;
    background-color: #4f6d75;
    padding: 0.3em 1.2em;
    border-radius: var(--height);
    font-size: 1.2rem;
    color: #fff;
    background-size: 100% 100%;
} 
.dark .current_plan{
    border: 1px solid rgb(18, 48, 39);
}

td{
  border-bottom: 2px solid #b3Dee5;
}
</style>