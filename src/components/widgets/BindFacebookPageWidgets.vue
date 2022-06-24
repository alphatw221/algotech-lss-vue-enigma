<template>
    <div>
        <v-card class="ma-5 pa-3" style="height: 250px;">
            <div>
                <h4 class="ma-5">Facebook Fan Page</h4>
                <BindFacebookPageButton :busName="'addFacebookPages'"/>
            </div>

            <div class="ma-5">
                <v-avatar v-for="page in facebookPages" v-bind:key="page.id">
                    <img :src="page.image" alt="">
                </v-avatar>
            </div>
        </v-card>
    </div>
</template>

<script>

import BindFacebookPageButton from '@/components/button/BindFacebookPageButton.vue'
import { get_user_subscription_facebook_pages, bind_user_facebook_pages } from '@/api/user_subscription'

export default {
    props:{
        userSubscriptionID:String
    },
    components:{
        BindFacebookPageButton
    },
    mounted(){
        this.eventBus.on('addFacebookPages',payload=>{
            this.bind_facebook_pages(payload)
        })
        this.get_facebook_pages()
        
    },
    unmounted(){
        this.eventBus.off('addFacebookPages')
    },
    data(){
        return{
            facebookPages:[]
        }
    },
    methods:{
        get_facebook_pages(){
            const user_subscription_id = 1
            //const user_subscription_id = this.$store.get('user_subscription').id
            get_user_subscription_facebook_pages().then(response=>{
                console.log(response)
                this.facebookPages = response.data
            }).catch(error=>{
                console.log(error)
            })
        },
        bind_facebook_pages(payload){
            const user_subscription_id = 1
            //const user_subscription_id = this.$store.get('user_subscription').id
            bind_user_facebook_pages(payload).then(response=>{
                this.facebookPages = response.data
            }).catch(error=>{
                console.log(error)
            })
        }
    }
}
</script>

<style scoped>

</style>