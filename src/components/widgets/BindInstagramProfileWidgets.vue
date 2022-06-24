<template>
    <div>
        <v-card class="ma-5 pa-3" style="height: 250px;">
            <div>
                <h4 class="ma-5">Instagram Fan Page</h4>
                <BindInstagramProfileButton :busName="'addInstagramProfiles'"/>
            </div>

            <div class="ma-5">
                <v-avatar v-for="page in InstagramProfiles" v-bind:key="page.id">
                    <img :src="page.image" alt="" >
                </v-avatar>
            </div>
        </v-card>
    </div>
</template>

<script>

import BindInstagramProfileButton from '@/components/button/BindInstagramProfileButton.vue'
import { get_user_subscription_instagram_profiles, bind_user_instagram_profiles } from '@/api/user_subscription'

export default {
    props:{
        userSubscriptionID:String
    },
    components:{
        BindInstagramProfileButton
    },
    mounted(){
        this.eventBus.on('addInstagramProfiles',payload=>{
            this.bind_instagram_profiles(payload)
        })
        this.get_instagram_profiles()
        
    },
    unmounted(){
        this.eventBus.off('addInstagramProfiles')
    },
    data(){
        return{
            InstagramProfiles:[]
        }
    },
    methods:{
        get_instagram_profiles(){
            //const user_subscription_id = this.$store.get('user_subscription').id
            get_user_subscription_instagram_profiles(this.userSubscriptionID).then(response=>{
                console.log(response)
                this.InstagramProfiles = response.data
            }).catch(error=>{
                console.log(error)
            })
        },
        bind_instagram_profiles(payload){
            const user_subscription_id = 1
            //const user_subscription_id = this.$store.get('user_subscription').id
            bind_user_instagram_profiles(payload).then(response=>{
                this.InstagramProfiles = response.data
            }).catch(error=>{
                console.log(error)
            })
        }
    }
}
</script>

<style scoped>

</style>