<template>
    <div class="mt-3 intro-y grid grid-cols-12 gap-2 my-0 lg:my-10 lg:gap-5 2xl:my-10 2xl:gap-5">
        <label for="regular-form-2" class="form-label col-start-1 col-span-12 lg:col-span-2 2xl:col-span-2">Name of Bank</label>
        <input id="regular-form-2" type="text" class="form-control form-control-rounded col-span-9 " />
        <label for="regular-form-2" class="form-label col-start-1 col-span-12 lg:col-span-2 2xl:col-span-2">Account Name</label>
        <input id="regular-form-2" type="text" class="form-control form-control-rounded col-span-9" />
        <label for="regular-form-2" class="form-label col-start-1 col-span-12 lg:col-span-2 2xl:col-span-2">Account No.</label>
        <input id="regular-form-2" type="text" class="form-control form-control-rounded col-span-9" />
    </div>
</template>



<script>
export default {
    props: {
        paymentObject: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            
        }
    },
    mounted() {
        console.log(this.paymentObject)
    },
}

// import { onMounted, ref } from 'vue';

// const props = defineProps({
//     paymentObject: {
//         type: Object,
//         default: {}
//     }
// })

// console.log(props.paymentObject)

// onMounted(() => {
//     console.log(props.paymentObject)
// })
    
</script>