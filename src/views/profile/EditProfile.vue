<template>
    <div v-show="layout.editProfile"  class="grid grid-cols-12 px-5 justify-center justify-items-center">
        <div
            class="col-span-12 lg:col-span-3 2xl:col-span-3 w-32 h-32 flex-none image-fit relative m-8 lg:m-10 2xl:m-10">
            <img class="rounded-full" :src="userAvatar" />
            <div
                class="absolute mb-1 mr-1 flex items-center justify-center bottom-0 right-0 bg-primary rounded-full p-2">
                <CameraIcon class="w-4 h-4 text-white" />
                <input
                    type="file"
                    class="w-full h-full top-0 left-0 absolute opacity-0"
                  />
            </div>
        </div>
        <div class="col-span-12 lg:col-span-9 2xl:col-span-9 w-full mt-0 p-0 lg:px-10 2xl:px-10">
            <div>
                <label class="form-label">User Name</label>
                <input type="text" v-model="layout.userInfo.name" class="form-control" disabled />
            </div>
            <div class="mt-3">
                <label class="form-label">Email</label>
                <input type="text" v-model="layout.userInfo.email" class="form-control" />
            </div>
            <div class="mt-3">
                <label class="form-label">Old Password</label>
                <input type="password" class="form-control"
                :class="{ 'border-danger': validate.oldPassword.$error }" 
                    v-model.trim="validate.oldPassword.$model" />
                <template v-if="validate.oldPassword.$error">
                          <label
                            class="text-danger mt-2"
                          >
                            Please enter Password
                          </label>
                  </template>
            </div>
            <div class="mt-3">
                <label class="form-label">New Password</label>
                <input type="text" class="form-control"
                :class="{ 'border-danger': validate.NewPassword.$error }" 
                    v-model.trim="validate.NewPassword.$model"/>
                <div class="form-help"
                    :class="{ 'text-danger': validate.NewPassword.$error }" >
                    Password should be at least 8 characters
                </div>
            </div>
            <div class="mt-3">
                <label class="form-label">Phone</label>
                <input type="text" class="form-control" 
                :class="{ 'border-danger': validate.newPhone.$error }" 
                    v-model.trim="validate.newPhone.$model"/>
                <template v-if="validate.newPhone.$error">
                        <label
                        class="text-danger mt-2"
                        >
                        Please enter numbers 
                        </label>
                </template>
            </div>
            <div class="flex justify-center lg:justify-end 2xl:justify-end mt-5">
                <button class="btn btn-outline-primary mr-auto lg:mr-10 2xl:mr-10" @click="layout.editProfile = false">
                    Cancel</button>
                <button class="btn btn-outline-primary" @click="save">
                    Save</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue"
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import { reactive, toRefs } from "vue";
import {
  required,
  minLength,
  maxLength,
  email,
  integer,
} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import i18n from "@/locales/i18n"

const layout = useLSSSellerLayoutStore()

const userAvatar = computed(() => {
    if (layout.loginWith == 'facebook') {
        return layout.userInfo.facebook_info.picture
    } else if (layout.loginWith == 'google') {
        return layout.userInfo.google_info.picture
    }
    if (layout.userInfo.facebook_info.picture) {
        return layout.userInfo.facebook_info.picture
    }
    return layout.userInfo.google_info.picture
});


const newData = reactive({
  userEmail: "",
  oldPassword: "",
  newPassword: "",
  newPhone: "",
});

const rules = {
  userEmail: {
    required,
    email,
  },
  oldPassword: {
    required,
    minLength: minLength(8),
    maxLength: maxLength(20),
  },
  NewPassword: {
    required,
    integer,
    maxLength: maxLength(20),
    minLength: minLength(8),
  },
  newPhone: {
    integer,
  },
};

const validate = useVuelidate(rules, toRefs(newData));

const save = () => {
  validate.value.$touch();
  if (validate.value.$invalid) {
    layout.alert.showMessageToast(i18n.global.t('profile.input_err'));
  } else {
    layout.notification.showMessageToast(i18n.global.t('profile.update_successed'));
  }
};
</script>