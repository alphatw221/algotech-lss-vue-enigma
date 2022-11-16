<template>
    <div class="btn text-base" @click="buttonOnClick()">
        <input type="file" :id="props.button_id" @change="uploadFile($event)" :accept="props.accept" :multiple="props.multiple" hidden/>
            <slot>

            </slot>
    </div>
</template>


<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    button_id:String,
    accept:String,
    multiple:Boolean,
    uploadFunction:Function

})

const buttonOnClick = ()=>{
    console.log('click')
    document.getElementById(props.button_id).click()
}
const uploadFile = (e) => {
    // if(!e.target.files)return
    if(props.multiple){
        props.uploadFunction(e.target.files)
    }else{
        props.uploadFunction(e.target.files[0])
    }

}
</script>