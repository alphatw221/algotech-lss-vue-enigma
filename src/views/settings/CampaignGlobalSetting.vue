<template>
    <!-- OUTTER BOX -->
    <div class="w-full h-full">
        <!-- BEGIN: commit box -->
        <div class="box p-2 intro-y grid grid-cols-12 gap-5 p-2">
            <span class="text-lg col-start-1 col-span-12"> Default Settings</span>
            <div class="switch-toggle switch-3 switch-candy col-start-1 m-2 align-middle">
                <div @click="toggleTabs(1)">
                    <input id="on" name="state-d" type="radio" checked="checked" />
                    <label for="on" style="width: 100px; font-size:14px;" class="align-middle">Notes</label>
                </div>
                <input id="na" name="state-d" type="radio" class="my-0" @click="toggleTabs(2)" />
                <label for="na" style="width: 100px; font-size:14px;" class="align-middle">Payment</label>
                <input id="off" name="state-d" type="radio" @click="toggleTabs(3)" />
                <label for="off" style="width: 100px; font-size:14px;" class="align-middle">Delivery</label>
            </div>
        </div>
        <div id="notes" :class="{ hidden: openTab !== 1, block: openTab === 1 }">
            <div class="box p-10">
                <AccordionGroup class="accordion-boxed">
                    <AccordionItem>
                        <Accordion>
                            <div class="flex">
                                <div class="mr-auto"> Delivery Note: <br> <span class="text-slate-400">
                                        13546fe8grglsafoiayg
                                        ijgdlkgdl gjkjdghdjs ghldjhlakjhlgdjhl jghdjghghghk jdghkdjfghk
                                        jfhgkfjhgkjfhg</span>
                                </div>
                                <div>
                                    <Edit2Icon />
                                </div>
                            </div>
                        </Accordion>
                        <AccordionPanel class="text-slate-600 dark:text-slate-500 leading-relaxed">
                            <textarea class="form-control h-48 mr-5 indent-4"
                                placeholder="Address">10 Anson Road, International Plaza, #10-11, 079903 Singapore, Singapore</textarea>
                            <div class="flex justify-end">
                                <button class="btn btn-rounded-secondary mr-5"> Previous</button>
                                <button class="btn btn-rounded-primary"> Next</button>
                            </div>
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <Accordion>
                            <div class="flex">
                                <div class="mr-auto"> Special Note: <br> <span class="text-slate-400 whitespace-normal">
                                        13546fe8grglsafoiayg
                                        ijgdlkgdl gjkjdghd jsghldjhlakjhlgdjhl jghdjghghghkj dghkdjfghkj
                                        fhgkfjhgkjfhg</span>
                                </div>
                                <div>
                                    <Edit2Icon />
                                </div>
                            </div>
                        </Accordion>
                        <AccordionPanel class="text-slate-600 dark:text-slate-500 leading-relaxed">
                            <textarea class="form-control h-48 mr-5 indent-4" placeholder="Address">
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
                                <div class="mr-auto"> Confirmation Note: <br> <span class="text-slate-400">
                                        13546fe8grglsafoiayg
                                        ijgdlkgdlgjkjdghdj sghldjhlakjhlgdjh ljghdjghghghkjdghkd jfghkjfhgkf
                                        jhgkjfhg</span>
                                </div>
                                <div>
                                    <Edit2Icon />
                                </div>
                            </div>
                        </Accordion>
                        <AccordionPanel class="text-slate-600 dark:text-slate-500 leading-relaxed">
                            <textarea class="form-control h-48 mr-5 indent-4"
                                placeholder="Address">10 Anson Road, International Plaza, #10-11, 079903 Singapore, Singapore</textarea>
                            <div class="flex justify-end">
                                <button class="btn btn-rounded-secondary mr-5"> Previous</button>
                                <button class="btn btn-rounded-primary"> Next</button>
                            </div>
                        </AccordionPanel>
                    </AccordionItem>
                </AccordionGroup>
            </div>
        </div>
        <div id="payment" :class="{ hidden: openTab !== 2, block: openTab === 2 }">
            <div class="box p-2 2xl:p-10">
                <TabGroup>
                    <TabList
                        class="nav-boxed-tabs flex flex-wrap content-around justify-around items-stretch self-auto ">
                        <Tab class="grow py-3 max-w-64 xl:py-10 2xl:py-10 inline-flex border-[#131c34] m-1"
                            tag="button">
                            <CreditCardIcon class="block mr-1" /><span
                                class="text-sm w-24 lg:text-lg 2xl:text-lg lg:w-32 2xl:w-32">Direct Payment</span>
                        </Tab>
                        <Tab class="grow py-3 max-w-64 xl:py-10 2xl:py-10 inline-flex border-[#131c34] m-1"
                            tag="button">
                            <TruckIcon class="block mr-1" /><span
                                class="text-sm w-24 lg:text-lg 2xl:text-lg lg:w-32 2xl:w-32">PayPal</span>
                        </Tab>
                        <Tab class="grow py-3 max-w-64 xl:py-10 2xl:py-10 inline-flex border-[#131c34] m-1"
                            tag="button">
                            <TruckIcon class="block mr-1" /><span
                                class="text-sm w-24 lg:text-lg 2xl:text-lg lg:w-32 2xl:w-32">HitPay</span>
                        </Tab>
                        <Tab class="grow  py-3 max-w-64 xl:py-10 2xl:py-10 inline-flex border-[#131c34] m-1"
                            tag="button">
                            <TruckIcon class="block mr-1" /><span
                                class="text-sm w-24 lg:text-lg 2xl:text-lg lg:w-32 2xl:w-32">Stripe</span>
                        </Tab>
                        <Tab class="grow py-3 max-w-64 xl:py-10 2xl:py-10 inline-flex border-[#131c34] m-1"
                            tag="button">
                            <TruckIcon class="block mr-1" /><span
                                class="text-sm w-24 lg:text-lg 2xl:text-lg lg:w-32 2xl:w-32">First Data IPG</span>
                        </Tab>
                    </TabList>
                    <TabPanels class="mt-0 lg:mt-5 2xl:mt-5 px-2 lg:px-10 2xl:px-10">
                        <TabPanel id="directPayment" class="leading-relaxed">
                            <div
                                class="mt-3 intro-y grid grid-cols-12 gap-2 my-0 lg:my-10 lg:gap-5 2xl:my-10 2xl:gap-5">
                                <label for="regular-form-2"
                                    class="form-label col-start-1 col-span-12 lg:col-span-2 2xl:col-span-2">Name of
                                    Bank</label>
                                <input id="regular-form-2" type="text"
                                    class="form-control form-control-rounded col-span-9 " />
                                <label for="regular-form-2"
                                    class="form-label col-start-1 col-span-12 lg:col-span-2 2xl:col-span-2">Account
                                    Name</label>
                                <input id="regular-form-2" type="text"
                                    class="form-control form-control-rounded col-span-9" />
                                <label for="regular-form-2"
                                    class="form-label col-start-1 col-span-12 lg:col-span-2 2xl:col-span-2">Account
                                    No.</label>
                                <input id="regular-form-2" type="text"
                                    class="form-control form-control-rounded col-span-9" />
                            </div>
                        </TabPanel>
                        <TabPanel id="payPal" class="leading-relaxed">
                            <div
                                class="mt-3 intro-y grid grid-cols-12 gap-2 my-0 lg:my-10 lg:gap-5 2xl:my-10 2xl:gap-5">
                                <input @click="toggle" class="form-check-input mr-5 col-start-1" type="checkbox" />
                                <label for="regular-form-2" class="form-label col-start-2 col-span-10">Set As Default
                                    Active</label>
                                <label for="regular-form-2"
                                    class="form-label col-start-1 col-span-12 lg:col-span-2 2xl:col-span-2">Name of
                                    Bank</label>
                                <input id="regular-form-2" type="text"
                                    class="form-control form-control-rounded col-span-9 " />
                                <label for="regular-form-2"
                                    class="form-label col-start-1 col-span-12 lg:col-span-2 2xl:col-span-2">Account
                                    Name</label>
                                <input id="regular-form-2" type="text"
                                    class="form-control form-control-rounded col-span-9" />
                                <label for="regular-form-2"
                                    class="form-label col-start-1 col-span-12 lg:col-span-2 2xl:col-span-2">Account
                                    No.</label>
                                <input id="regular-form-2" type="text"
                                    class="form-control form-control-rounded col-span-9" />
                            </div>
                        </TabPanel>
                        <TabPanel id="hitPay" class="leading-relaxed">
                            <div
                                class="mt-3 intro-y grid grid-cols-12 gap-2 my-0 lg:my-10 lg:gap-5 2xl:my-10 2xl:gap-5">
                                <input @click="toggle" class="form-check-input mr-5 col-start-1" type="checkbox" />
                                <label for="regular-form-2" class="form-label col-start-2 col-span-10">Set As Default
                                    Active</label>
                                <label for="regular-form-2"
                                    class="form-label col-start-1 col-span-12 lg:col-span-2 2xl:col-span-2">Payment
                                    Button Title</label>
                                <input id="regular-form-2" type="text"
                                    class="form-control form-control-rounded col-span-9 " />
                                <label for="regular-form-2"
                                    class="form-label col-start-1 col-span-12 lg:col-span-2 2xl:col-span-2">Account
                                    Name</label>
                                <input id="regular-form-2" type="text"
                                    class="form-control form-control-rounded col-span-9" />
                                <label for="regular-form-2"
                                    class="form-label col-start-1 col-span-12 lg:col-span-2 2xl:col-span-2">Account
                                    No.</label>
                                <input id="regular-form-2" type="text"
                                    class="form-control form-control-rounded col-span-9" />
                            </div>
                        </TabPanel>
                        <TabPanel id="stripe" class="leading-relaxed">
                            <div
                                class="mt-3 intro-y grid grid-cols-12 gap-2 my-0 lg:my-10 lg:gap-5 2xl:my-10 2xl:gap-5">
                                <input @click="toggle" class="form-check-input mr-5 col-start-1" type="checkbox" />
                                <label for="regular-form-2" class="form-label col-start-2 col-span-10">Set As Default
                                    Active</label>
                                <label for="regular-form-2"
                                    class="form-label col-start-1 col-span-12 lg:col-span-2 2xl:col-span-2">Secret
                                    Key</label>
                                <input id="regular-form-2" type="text"
                                    class="form-control form-control-rounded col-span-9 " />
                                <label for="regular-form-2"
                                    class="form-label col-start-1 col-span-12 lg:col-span-2 2xl:col-span-2">Currency
                                    Code</label>
                                <input id="regular-form-2" type="text"
                                    class="form-control form-control-rounded col-span-9" />
                            </div>
                        </TabPanel>
                        <TabPanel id="dataIPG" class="leading-relaxed">
                            <div
                                class="mt-3 intro-y grid grid-cols-12 gap-2 my-0 lg:my-10 lg:gap-5 2xl:my-10 2xl:gap-5">
                                <input @click="toggle" class="form-check-input mr-5 col-start-1" type="checkbox" />
                                <label for="regular-form-2" class="form-label col-start-2 col-span-10">Set As Default
                                    Active</label>
                                <label for="regular-form-2"
                                    class="form-label col-start-1 col-span-12 lg:col-span-2 2xl:col-span-2">Store
                                    ID</label>
                                <input id="regular-form-2" type="text"
                                    class="form-control form-control-rounded col-span-9 " />
                                <label for="regular-form-2"
                                    class="form-label col-start-1 col-span-12 lg:col-span-2 2xl:col-span-2">Share
                                    Secret</label>
                                <input id="regular-form-2" type="text"
                                    class="form-control form-control-rounded col-span-9" />
                                <label for="regular-form-2"
                                    class="form-label col-start-1 col-span-12 lg:col-span-2 2xl:col-span-2">Currency
                                    Code</label>
                                <input id="regular-form-2" type="text"
                                    class="form-control form-control-rounded col-span-9" />
                                <label for="regular-form-2"
                                    class="form-label col-start-1 col-span-12 lg:col-span-2 2xl:col-span-2">Time
                                    Zone</label>
                                <input id="regular-form-2" type="text"
                                    class="form-control form-control-rounded col-span-9" />
                            </div>
                        </TabPanel>
                    </TabPanels>
                    <div class="col-span-12 m-10 p-5">
                        <div class="text-md font-medium m-2">
                            Delivery and Collect Note
                        </div>
                        <p id="" class="form-control p-5" placeholder="">
                            Delivery will be shipped after Dragon Boat Festval sorry
                            for the inconvenience we caused.
                        </p>
                    </div>
                    <div class="col-span-12 m-10 p-5">
                        <div class="text-md font-medium m-2">Remark</div>
                        <textarea id="" class="form-control indent-4"
                            placeholder="">Remark remark remark remark</textarea>
                    </div>
                </TabGroup>
            </div>
        </div>
        <div id="delivery" class="box py-5 lg:p-10 2xl:p-10" :class="{ hidden: openTab !== 3, block: openTab === 3 }">
            <span class="text-2xl font-medium leading-none m-10">Delivery</span>
            <div class="box px-5 lg:p-10 2xl:p-10 mt-3 intro-y grid grid-cols-12 gap-1 lg:gap-5 2xl:gap-5 -z-50">
                <label for="regular-form-2"
                    class="form-label col-start-1 col-span-12 lg:col-span-2 2xl:col-span-2">Delivery Charge</label>
                <input id="regular-form-2" type="text" class="form-control form-control-rounded col-span-9"
                    value="USD $20" />
                <label for="regular-form-2" class="form-label col-start-1 col-span-12 lg:col-span-2 2xl:col-span-2">Free
                    Delivery Charge
                    Above</label>
                <input id="regular-form-2" type="text" class="form-control form-control-rounded col-span-9"
                    placeholder="" />
                <label for="regular-form-2" class="form-label col-start-1 col-span-12 lg:col-span-2 2xl:col-span-2">Free
                    Delivery for
                    Minimum</label>
                <input id="regular-form-2" type="text" class="form-control form-control-rounded col-span-9"
                    placeholder="" />

                <label for="regular-form-2" class="form-label col-start-1 col-span-12 font-bold mt-5">Delivery Charge
                    Option</label>
                <label for="regular-form-2"
                    class="form-label deLable col-start-1 col-span-12 lg:col-span-2 2xl:col-span-2">
                    Express Delivery</label>
                <Dropdown class="col-span-8 sm:col-span-6 lg:col-span-4 2xl:col-span-4">
                    <DropdownToggle class="btn btn-rounded-secondary relative justify-center w-full">
                        On top of delivery charge
                        <span
                            class="w-8 h-8 absolute flex justify-center items-center right-0 top-0 bottom-0 my-auto ml-auto mr-1">
                            <ChevronDownIcon class="w-4 h-4" />
                        </span>
                    </DropdownToggle>
                    <DropdownMenu class="w-full text-sm lg:text-lg 2xl:text-lg">
                        <DropdownContent>
                            <DropdownItem>
                                <FileTextIcon class="w-4 h-4 mr-2" />
                                On top of delivery charge
                            </DropdownItem>
                            <DropdownItem>
                                <FileTextIcon class="w-4 h-4 mr-2" />
                                Replace delivery charge
                            </DropdownItem>
                        </DropdownContent>
                    </DropdownMenu>
                </Dropdown>
                <input id="regular-form-2" type="text"
                    class="form-control form-control-rounded h-10 col-span-8 sm:col-span-6 lg:col-span-4 2xl:col-span-4"
                    placeholder="" />
                <div class="h-10 mr-1 mb-2 col-span-4 sm:col-span-12 relative 2xl:col-span-1">
                    <button class="btn btn-outline-danger w-24 absolute right-0">
                        Delete
                    </button>
                </div>
                <label for="regular-form-2"
                    class="form-label deLable col-start-1 col-span-12 lg:col-span-2 2xl:col-span-2">
                    Overseas</label>
                <Dropdown class="col-span-8 sm:col-span-6 lg:col-span-4 2xl:col-span-4">
                    <DropdownToggle class="btn btn-rounded-secondary relative justify-center w-full">
                        On top of delivery charge
                        <span
                            class="w-8 h-8 absolute flex justify-center items-center right-0 top-0 bottom-0 my-auto ml-auto mr-1">
                            <ChevronDownIcon class="w-4 h-4" />
                        </span>
                    </DropdownToggle>
                    <DropdownMenu class="w-full text-sm lg:text-lg 2xl:text-lg">
                        <DropdownContent>
                            <DropdownItem>
                                <FileTextIcon class="w-4 h-4 mr-2" />
                                On top of delivery charge
                            </DropdownItem>
                            <DropdownItem>
                                <FileTextIcon class="w-4 h-4 mr-2" />
                                Replace delivery charge
                            </DropdownItem>
                        </DropdownContent>
                    </DropdownMenu>
                </Dropdown>
                <input id="regular-form-2" type="text"
                    class="form-control form-control-rounded h-10 col-span-8 sm:col-span-6 lg:col-span-4 2xl:col-span-4"
                    placeholder="" />
                <div class="h-10 mr-1 mb-2 col-span-4 sm:col-span-12 relative 2xl:col-span-1">
                    <button class="btn btn-outline-danger w-24 absolute right-0">
                        Delete
                    </button>
                </div>
            </div>
            <span class="text-2xl font-medium leading-none m-10">Collect In Store</span>
            <div class="box intro-y grid grid-cols-8 gap-5 p-5 lg:p-10 2xl:p-10 z-50">
                <div class="col-span-8">
                    <label for="regular-form-2" class="form-label col-start-1 col-span-1">Choose pickup start &
                        end date</label>
                    <v-date-picker v-model="range" :timezone="timezone" mode="dateTime" :model-config="modelConfig"
                        is-range is-required>
                        <template v-slot="{ inputValue, inputEvents }">
                            <div class="flex justify-center items-center">
                                <input :value="inputValue.start" v-on="inputEvents.start"
                                    class="form-control border h-10 px-2 py-1 w-42 rounded focus:outline-none focus:border-indigo-300" />
                                <ChevronsRightIcon class="w-8 h-8 m-1" />
                                <input :value="inputValue.end" disabled
                                    class="form-control border h-10 px-2 py-1 w-42 rounded focus:outline-none focus:border-indigo-300" />
                            </div>
                        </template>
                    </v-date-picker>
                </div>
                <div v-for="n in range" class="col-span-8">
                    <div class="grid grid-cols-8 gap-1">
                        <label for="regular-form-2" class="form-label col-start-1 w-24 mt-2">Pickup Store</label>
                        <input id="regular-form-2" type="text" class="form-control form-control-rounded col-start-1 col-span-12 
                            sm:col-start-3 sm:col-span-8 lx:col-start-3 2xl:col-start-3 lx:col-start-3 2xl:col-start-3 mb-3"
                            placeholder="" />
                        <label for="regular-form-2" class="form-label col-start-1 w-36 mt-2">Pickup Address</label>
                        <input id="regular-form-2" type="text" class="form-control form-control-rounded col-start-1 col-span-12 
                            sm:col-start-3 sm:col-span-8 lx:col-start-3 2xl:col-start-3 lx:col-start-3 2xl:col-start-3"
                            placeholder="" />
                        <div class="">
                            <button class="btn btn-outline-danger w-24 inline-block mr-1 mb-2" @click="range--">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
                <a class="col-start-8" @click="range++"> + Add </a>

                <label for="regular-form-2" class="form-label col-start-1 col-span-12 text-xl">Delivery
                    Note</label>
                <textarea id="update-profile-form-5" class="form-control col-start-1 col-span-10 h-32 mx-10"
                    placeholder="Address">10 Anson Road, International Plaza, #10-11, 079903 Singapore, Singapore</textarea>
            </div>
        </div>
    </div>
</template>

<script>
export default {

    data() {
        return {
            openTab: 1,
            range: 1,
        }
    },
    methods: {
        toggleTabs: function (tabNumber) {
            this.openTab = tabNumber;
        },
    },
}
</script>

<style scoped>
.switch-toggle {
    overflow: visible;
    float: left;
    height: 42px;
    width: 300px;
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
    color: rgb(56, 56, 56);
    cursor: pointer;
}

.dark .switch-toggle input+label {
    color: rgb(255, 255, 255);
}

.switch-toggle input:checked+label {
    background: theme("colors.primary");
    height: 42px;
    width: 100px;
    border-radius: 42px 42px;
    font-weight: 500;
    color: aliceblue;
}
</style> 