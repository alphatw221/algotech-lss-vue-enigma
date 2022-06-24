<template>
    <div>
        <v-card  class="ma-5 pa-3" style="height: 250px">
            <div>
                <h4 class="ma-5">Youtube Fan Page</h4>
                <BindYoutubeChannelButton />
            </div>

            <div>
                <v-avatar class="ml-5" v-for="channel in youtubeChannels" v-bind:key="channel.id">
                    <img :src="channel.image" alt="">
                </v-avatar>
            </div>
        </v-card>
    </div>
</template>

<script>

import BindYoutubeChannelButton from '@/components/button/BindYoutubeChannelButton.vue'

import { get_user_subscription_youtube_channels, bind_user_youtube_channels } from '@/api/user_subscription'

export default {
    components:{
        BindYoutubeChannelButton
    },
    data(){
        return{
            youtubeChannels:[]
        }
    },
    mounted(){
        this.eventBus.on('addYoutubeChannels',payload=>{
            this.bind_youtube_channels(payload)
        })
        this.get_youtube_channels()
        
    },
    unmounted(){
        this.eventBus.off('addYoutubeChannels')
    },
    
    methods:{
        get_youtube_channels(){
            get_user_subscription_youtube_channels().then(response=>{
                console.log(response)
                this.youtubeChannels = response.data
            }).catch(error=>{
                console.log(error)
            })
        },
        bind_youtube_channels(payload){
            bind_user_youtube_channels(payload).then(response=>{
                console.log("--------")
                console.log(response.data)
                this.youtubeChannels = response.data
            }).catch(error=>{
                console.log(error)
            })
        }
    }
}
</script>

<style scoped>

</style>