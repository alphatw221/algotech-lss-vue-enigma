  <template>
    <div class="box p-2 my-5 lg:p-5 lg:m-5 2xl:p-10 2xl:m-5 grid grid-cols-12 gap-4">
        <span class="col-start-1 col-span-12 text-lg"> <strong>Delivery Details</strong></span>
        <div class="col-start-1 text-sm col-span-12 lg:text-lg 2xl:text-lg">
            <div class="relative">
                <u class="text-lg"> Delivery</u>
                <a href="" class="absolute top-0 right-0 text-[15px]"> Edit</a>
                <div class="flex mt-2">
                    <span class="w-48"> Delivery Charge</span>
                    <span> USD $20</span>
                </div>
                <div class="flex">
                    <span class="w-48"> Free Delivery Charge Above</span>
                    <span> USD $200</span>
                </div>
                <div class="flex">
                    <span class="w-48"> Free Delivery for Minimum</span>
                    <span> 10 Items</span>
                </div>
                <div class="flex">
                    <span class="w-48">Delivery Charge Option</span>
                    <div class="grid grid-cols-2">
                        <span class="col-start-1 mr-3">Express Delivery </span>
                        <span class="col-start-2"> ---------- USD $35</span>

                        <span class="col-start-1 mr-3">Overseas </span>
                        <span class="col-start-2"> ---------- USD $35</span>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-8 gap-1 relative">
                <u class="col-start-1 col-span-8 text-lg mt-5 mb-2"> Collect In Store</u>
                <a href="" class="absolute top-0 right-0 text-[15px]"> Edit</a>
                <span class="col-start-1 col-span-8 lg:col-span-2 2xl:col-span-2"> Pickup Store/Pickup Address</span>
                <span class="col-start-1 col-span-1 lg:col-start-3 2xl:col-start-3">Store 1</span>
                <span class="col-start-1 col-span-8 lg:col-start-4 lg:col-span-5 2xl:col-start-4 2xl:col-span-5">2401
                    Utah Avenue South Seattle, Washington, U.S.</span>
                <span class="col-start-1 col-span-1 lg:col-start-3 2xl:col-start-3">Store 2</span>
                <span class="col-start-1 col-span-8 lg:col-start-4 lg:col-span-5 2xl:col-start-4 2xl:col-span-5">2401
                    Utah Avenue South Seattle, Washington, U.S.</span>
                <span class="col-start-1 col-span-1 lg:col-start-3 2xl:col-start-3">Store 3</span>
                <span class="col-start-1 col-span-8 lg:col-start-4 lg:col-span-5 2xl:col-start-4 2xl:col-span-5">2401
                    Utah Avenue South Seattle, Washington, U.S.</span>
            </div>
            <label for="regular-form-2" class="form-label col-start-1 col-span-1 mt-5"> Choose pickup start & end date
            </label>
            <v-date-picker class="mb-5" v-model="range" :timezone="timezone" mode="dateTime"
                :model-config="modelConfig" is-range is-required>
                <template v-slot="{ inputValue, inputEvents }">
                    <div class="flex justify-start ml-10 items-center">
                        <input :value="inputValue.start" v-on="inputEvents.start"
                            class="form-control border h-10 px-2 py-1 rounded focus:outline-none focus:border-indigo-300" />
                        <ChevronsRightIcon class="w-8 h-8 m-1" />
                        <input :value="inputValue.end" disabled
                            class="form-control border h-10 px-2 py-1 rounded focus:outline-none focus:border-indigo-300" />
                    </div>
                </template>
            </v-date-picker>
            <div class="relative">
                <u class="text-lg mt-5"> Delivery Note</u>
            <a class="absolute top-0 right-0 text-[15px]" @click="someValue = false"> Edit</a>
            <textarea class="form-control flex w-[90%] h-48 m-5 " :readonly="someValue ? true : null">
                Delivery NoteDelivery NoteDelivery NoteDelivery NoteDelivery NoteDelivery Note
                Delivery NoteDelivery NoteDelivery NoteDelivery NoteDelivery NoteDelivery Note
            </textarea>
            <button v-show="!someValue" class="btn btn-rounded absolute bottom-0 right-2" @click="someValue = true">
                Submit </button>
            </div>
        </div>
        <span class="col-span-12 text-lg"><strong>Payment Details</strong> </span>
        <div id="paymentDetails" class="col-span-12">
            <AccordionGroup class="accordion-boxed">
                <AccordionItem>
                    <Accordion class="bg-primary rounded-t-lg ">
                        <div class="text-white mx-3"> Direct Payment </div>
                    </Accordion>
                    <AccordionPanel
                        class="text-slate-600 dark:text-slate-500 leading-relaxed border-2 border-secondary">
                        <Dropzone ref-key="dropzoneValidationRef" :options="{
                            url: 'https://httpbin.org/post',
                            thumbnailWidth: 150,
                            maxFilesize: 0.5,
                            acceptedFiles: 'image/jpeg|image/png|image/jpg',
                            headers: { 'My-Awesome-Header': 'header value' },
                        }" class="dropzone">
                            <div class="text-lg font-medium">
                                Drop files here or click to upload.
                            </div>
                            <div class="text-gray-600">
                                This is just a demo dropzone. Selected files are
                                <span class="font-medium">not</span> actually uploaded.
                                <br>accepted File types: jpeg, png, jpg
                            </div>
                        </Dropzone>
                        <div class="m-3">
                            <label for="regular-form-2" class="form-label">Last Five Digits</label>
                            <input id="regular-form-2" type="text" class="form-control form-control" />
                        </div>
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <Accordion class="bg-primary rounded-t-lg">
                        <div class="text-white mx-3"> HitPay </div>
                    </Accordion>
                    <AccordionPanel
                        class="text-slate-600 dark:text-slate-500 leading-relaxed border-2 border-secondary p-5">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the industry's
                        standard dummy text ever since the 1500s, when an unknown
                        printer took a galley of type and scrambled it to make a
                        type specimen book. It has survived not only five centuries,
                        but also the leap into electronic typesetting, remaining
                        essentially unchanged.
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <Accordion class="bg-primary rounded-t-lg ">
                        <div class="text-white mx-3"> First Data IPG </div>
                    </Accordion>
                    <AccordionPanel
                        class="text-slate-600 dark:text-slate-500 leading-relaxed border-2 border-secondary p-5">
                        When you place an order, you will be taken to PayPal to complete your service.
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <Accordion class="bg-primary rounded-t-lg ">
                        <div class="text-white mx-3"> PayPal </div>
                    </Accordion>
                    <AccordionPanel
                        class="text-slate-600 dark:text-slate-500 leading-relaxed border-2 border-secondary p-5">
                        When you place an order, you will be taken to PayPal to complete your service.
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <Accordion class="bg-primary rounded-t-lg ">
                        <div class="text-white mx-3"> Stripe </div>
                    </Accordion>
                    <AccordionPanel
                        class="text-slate-600 dark:text-slate-500 leading-relaxed border-2 border-secondary p-5">
                        When you place an order, you will be taken to PayPal to complete your service.
                    </AccordionPanel>
                </AccordionItem>
            </AccordionGroup>

        </div>
        <div class="col-span-12 flex justify-end">
            <button class="btn btn-outline-primary mr-5" 
            @click="this.$router.back()"> Privious</button>
            <button class="btn btn-outline-primary" 
            @click="this.$router.push('/seller/campaign-list')" > Save</button>

        </div>
    </div>
</template>

  <script>
export default {
    data() {
        return {
            someValue: true,
            selectProduct: true,
            comfirmProduct: false,
            range: {
                start: new Date(),
                end: new Date(),
            },
            modelConfig: {
                start: {
                    timeAdjust: '',
                },
                end: {
                    timeAdjust: '',
                },
            },
        }
    }
}

</script>