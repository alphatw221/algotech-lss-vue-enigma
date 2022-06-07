<template>
    <div class="grid grid-cols-12 box p-5 m-5">

    <span class="col-start-1 col-span-12 text-lg my-4"> <strong>Delivery Details</strong></span>
    <DeliveryForm class="col-span-12" />
    
    <span class="col-span-12 text-lg my-4"><strong>Payment Details</strong> </span>
    <PaymentForm class="col-span-12" />

    <div class="col-span-12 flex justify-end mt-5 text-[#060607]">
      <button class="btn bg-[#969696] mr-5" @click="this.$router.back()"> Privious</button>
      <button class="btn bg-[#ED2225]" @click="this.$router.push('/seller/campaign-list')"> Save</button>

    </div>
  </div>

</template>  

<script>
import PaymentForm from '@/components/createCampaign/PaymentForm.vue';
import DeliveryForm from '../../components/createCampaign/DeliveryForm.vue';
export default {
    components: {
    PaymentForm,
    DeliveryForm
    },
}

</script>

