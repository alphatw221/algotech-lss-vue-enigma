<template>
    <!-- OUTTER BOX -->
    <div class="intro-y chat grid grid-cols-12 gap-5">
        <!-- BEGIN: commit box -->
        <div class="col-span-12">
            <div class="box p-2 intro-y grid grid-cols-12 gap-5 mt-5 p-2">
                <div class="switch-toggle switch-3 switch-candy col-start-1 m-2">
                    <input id="on" name="state-d" type="radio" checked="checked" />
                    <label for="on" style="width: 160px">Default Notes</label>
                    <input id="na" name="state-d" type="radio" class="my-0" />
                    <label for="na" style="width: 160px">Defualt Payment</label>
                    <input id="off" name="state-d" type="radio" />
                    <label for="off" style="width: 160px">Default Delivery</label>
                </div>
            </div>

            <div class="box p-10">
                <AccordionGroup class="accordion-boxed">
                    <AccordionItem>
                        <Accordion>
                            <div class="flex">
                                <div class="mr-auto"> Delivery Note: <br> <span class="text-slate-400"> 13546fe8grglsafoiayg ijgdlkgdlgjkjdghdjsghldjhlakjhlgdjhljghdjghghghkjdghkdjfghkjfhgkfjhgkjfhg</span> </div>
                                <div> <Edit2Icon /> </div>
                            </div>
                        </Accordion>
                        <AccordionPanel class="text-slate-600 dark:text-slate-500 leading-relaxed">
                            <textarea id="update-profile-form-5" class="form-control h-48 m-5" placeholder="Address">
                                    10 Anson Road, International Plaza, #10-11, 079903 Singapore, Singapore</textarea>
                            <div class="flex justify-end"> 
                                <button class="btn btn-rounded-secondary mr-5"> Previous</button>
                                <button class="btn btn-rounded-primary"> Next</button>
                            </div>
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <Accordion>
                            <div class="flex">
                                <div class="mr-auto"> Special Note: <br> <span class="text-slate-400"> 13546fe8grglsafoiayg ijgdlkgdlgjkjdghdjsghldjhlakjhlgdjhljghdjghghghkjdghkdjfghkjfhgkfjhgkjfhg</span> </div>
                                <div> <Edit2Icon /> </div>
                            </div>
                        </Accordion>
                        <AccordionPanel class="text-slate-600 dark:text-slate-500 leading-relaxed">
                            <textarea id="update-profile-form-5" class="form-control h-48 m-5" placeholder="Address">
                                    10 Anson Road, International Plaza, #10-11, 079903 Singapore, Singapore</textarea>
                            <div class="flex justify-end"> 
                                <button class="btn btn-rounded-secondary mr-5"> Previous</button>
                                <button class="btn btn-rounded-primary"> Next</button>
                            </div>
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <Accordion>
                            <div class="flex">
                                <div class="mr-auto"> Confirmation Note: <br> <span class="text-slate-400"> 13546fe8grglsafoiayg ijgdlkgdlgjkjdghdjsghldjhlakjhlgdjhljghdjghghghkjdghkdjfghkjfhgkfjhgkjfhg</span> </div>
                                <div> <Edit2Icon /> </div>
                            </div>
                        </Accordion>
                        <AccordionPanel class="text-slate-600 dark:text-slate-500 leading-relaxed">
                            <textarea id="update-profile-form-5" class="form-control h-48 m-5" placeholder="Address">
                                    10 Anson Road, International Plaza, #10-11, 079903 Singapore, Singapore</textarea>
                            <div class="flex justify-end"> 
                                <button class="btn btn-rounded-secondary mr-5"> Previous</button>
                                <button class="btn btn-rounded-primary"> Next</button>
                            </div>
                        </AccordionPanel>
                    </AccordionItem>
                </AccordionGroup>
            </div>
        </div>
    </div>
</template>

<script>
export default {

    data() {
        return {
           
    }
    },
}
</script>

<style scoped>
.switch-toggle {
    overflow: visible;
    float: left;
    height: 42px;
    width: 480px;
    background: theme("colors.secondary");
    border-radius: 42px 42px;
    letter-spacing: 0.7px;
    box-shadow: inset -4px -4px 8px rgba(255, 255, 255, 0.185),
        inset 8px 8px 16px rgba(0, 0, 0, 0.1);
}

.dark .switch-toggle {
    box-shadow: inset -4px -4px 8px rgba(22, 22, 22, 0.596),
        inset 8px 8px 16px rgba(0, 0, 0, 0.1);
    --color-secondary: theme("colors.rgb.blueGray.800");
}

.switch-toggle input {
    position: absolute;
    opacity: 0;
}

.switch-toggle input+label {
    padding-top: 12px;
    padding-bottom: 12px;
    padding-left: 15px;
    padding-right: 15px;
    float: left;
    text-align: center;
    font-size: 16px;
    color: rgb(56, 56, 56);
    cursor: pointer;
}

.dark .switch-toggle input+label {
    color: rgb(255, 255, 255);
}

.switch-toggle input:checked+label {
    background: theme("colors.primary");
    height: 42px;
    width: 160px;
    border-radius: 42px 42px;
    font-weight: 500;
    color: aliceblue;
}
</style> 