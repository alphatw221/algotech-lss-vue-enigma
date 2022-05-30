<template>
<AccordionGroup class="accordion-boxed">
    <AccordionItem>
        <Accordion class="bg-primary rounded-t-lg ">
            <div class="text-white mx-3"> Direct Payment </div>
        </Accordion>
        <AccordionPanel class="text-slate-600 dark:text-slate-500 leading-relaxed border-2 border-secondary">
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
                <input id="regular-form-2" type="text" class="form-control form-control"/>
            </div>
        </AccordionPanel>
    </AccordionItem>
    <AccordionItem>
        <Accordion class="bg-primary rounded-t-lg">
            <div class="text-white mx-3"> HitPay </div>
        </Accordion>
        <AccordionPanel class="text-slate-600 dark:text-slate-500 leading-relaxed border-2 border-secondary p-5">
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
        <AccordionPanel class="text-slate-600 dark:text-slate-500 leading-relaxed border-2 border-secondary p-5">
            When you place an order, you will be taken to PayPal to complete your service. 
        </AccordionPanel>
    </AccordionItem>
    <AccordionItem>
        <Accordion class="bg-primary rounded-t-lg ">
            <div class="text-white mx-3"> PayPal </div>
        </Accordion>
        <AccordionPanel class="text-slate-600 dark:text-slate-500 leading-relaxed border-2 border-secondary p-5">
            When you place an order, you will be taken to PayPal to complete your service.
        </AccordionPanel>
    </AccordionItem>
    <AccordionItem>
        <Accordion class="bg-primary rounded-t-lg ">
            <div class="text-white mx-3"> Stripe </div>
        </Accordion>
        <AccordionPanel class="text-slate-600 dark:text-slate-500 leading-relaxed border-2 border-secondary p-5">
            When you place an order, you will be taken to PayPal to complete your service.
        </AccordionPanel>
    </AccordionItem>
</AccordionGroup>
</template>
