<template>
<!-- BEGIN: Wizard Layout -->
<div class="intro-y box py-10 sm:py-20 mt-5">
    <TabGroup class="w-full">
        <TabList>
            <div class="relative w-full before:hidden before:lg:block before:absolute before:w-[100%] before:h-[3px] before:top-0 before:bottom-0 before:mt-4 before:bg-slate-100 before:dark:bg-darkmode-400 flex flex-col lg:flex-row justify-center px-5 sm:px-20">
                <Tab>
                    <div class="intro-x lg:text-center flex items-center lg:block flex-1 z-10">
                        <button class="w-10 h-10 rounded-full btn btn-primary">
                            1
                        </button>
                        <div class="lg:w-32 font-medium text-base lg:mt-3 ml-3 lg:mx-auto">
                            Shopping Cart
                        </div>
                    </div>
                </Tab>

                <Tab>
                    <div class="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
                        <button class="w-10 h-10 rounded-full btn text-slate-500 bg-slate-100 dark:bg-darkmode-400 dark:border-darkmode-400">
                            2
                        </button>
                        <div class="lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto text-slate-600 dark:text-slate-400">
                            Delivery
                        </div>
                    </div>
                </Tab>

                <Tab>
                    <div class="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
                        <button class="w-10 h-10 rounded-full btn text-slate-500 bg-slate-100 dark:bg-darkmode-400 dark:border-darkmode-400">
                            3
                        </button>
                        <div class="lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto text-slate-600 dark:text-slate-400">
                            Payment
                        </div>
                    </div>
                </Tab>
            </div>

        </TabList>

        <TabPanels>
            <TabPanel>1</TabPanel>
            <TabPanel class="leading-relaxed p-5">
                <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
                    <h2 class="text-xl font-medium mr-auto">Contact Information</h2>
                </div>
                <div class="intro-y grid grid-cols-12 gap-5">
                    <div class="intro-y col-span-12 lg:col-span-8">
                        <div class="box p-10 mt-3 intro-y grid grid-cols-12 gap-5 my-10">
                            <label for="regular-form-2" class="form-label col-span-2">First Name</label>
                            <input id="regular-form-2" type="text" class="form-control form-control-rounded col-span-4" placeholder="" />
                            <label for="regular-form-2" class="form-label col-span-2">Last Name</label>
                            <input id="regular-form-2" type="text" class="form-control form-control-rounded col-span-4" placeholder="" />
                            <label for="regular-form-2" class="form-label col-span-2">Email</label>
                            <input id="regular-form-2" type="text" class="form-control form-control-rounded col-span-4" placeholder="" />
                            <label for="regular-form-2" class="form-label col-span-2">Phone</label>
                            <input id="regular-form-2" type="text" class="form-control form-control-rounded col-span-4" placeholder="" />
                        </div>

                        <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
                            <h2 class="text-xl font-medium mr-auto mb-5">Shipping Information</h2>
                        </div>

                        <TabGroup>
                            <TabList class="nav-boxed-tabs">
                                <Tab class="sm:col-span-6 col-span-12 w-60 py-10 inline-flex border-[#131c34]" tag="button">
                                    <TruckIcon class="block mr-3" /><span class="text-lg">Delivery</span></Tab>
                                <Tab class="sm:col-span-6 col-span-12 w-60 py-10 inline-flex border-[#131c34]" tag="button">
                                    <HomeIcon class="block mr-3" /><span class="text-lg">Collect In Store</span></Tab>
                            </TabList>
                            <TabPanels class="mt-5">
                                <TabPanel class="leading-relaxed">
                                    <label class="text-md font-medium">Delivery Information</label>
                                    <div class="grid grid-cols-12">
                                        <div class="box p-10 mt-3 intro-y col-span-12 gap-5 my-10">
                                            <label for="regular-form-2" class="form-label col-span-12">Address</label>
                                            <input id="regular-form-2" type="text" class="form-control form-control-rounded col-span-12" placeholder="" />
                                            <label for="regular-form-2" class="form-label col-span-2">City</label>
                                            <input id="regular-form-2" type="text" class="form-control form-control-rounded col-span-4" placeholder="" />
                                            <label for="regular-form-2" class="form-label col-span-2">State</label>
                                            <input id="regular-form-2" type="text" class="form-control form-control-rounded col-span-4" placeholder="" />
                                            <label for="regular-form-2" class="form-label col-span-2">Postal Code</label>
                                            <input id="regular-form-2" type="text" class="form-control form-control-rounded col-span-4" placeholder="" />
                                        </div>

                                    </div>
                                    <label class="text-md font-medium">Delivery Option</label>
                                    <div class="grid grid-cols-12">
                                        <div class="col-span-6">
                                            <div class="form-check mt-2">
                                                <input id="radio-switch-1" class="form-check-input" type="radio" name="" value="" />
                                                <label class="form-check-label" for="radio-switch-1">Option 1</label>
                                            </div>
                                            <div class="form-check mt-2">
                                                <input id="radio-switch-2" class="form-check-input" type="radio" name="" value="" />
                                                <label class="form-check-label" for="radio-switch-2">Option 2</label>
                                            </div>
                                            <div class="form-check mt-2">
                                                <input id="radio-switch-3" class="form-check-input" type="radio" name="" value="" />
                                                <label class="form-check-label" for="radio-switch-3">Option 3</label>
                                            </div>
                                        </div>
                                        <div class="col-span-6">
                                            <div class="form-check mt-2">
                                                <label class="form-check-label">USD10</label>
                                            </div>
                                            <div class="form-check mt-2">
                                                <label class="form-check-label">USD10</label>
                                            </div>
                                            <div class="form-check mt-2">
                                                <label class="form-check-label">USD10</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="text-center mt-10 text-black underline">Load More</div>
                                </TabPanel>
                                <TabPanel class="leading-relaxed">
                                    <label class="text-md font-medium">Pickup Option</label>
                                    <div class="grid grid-cols-12">
                                        <div class="col-span-6">
                                            <div>Store</div>
                                            <div class="form-check mt-2">
                                                <input id="radio-switch-1" class="form-check-input" type="radio" name="" value="" />
                                                <label class="form-check-label" for="radio-switch-1">Store 1</label>
                                            </div>
                                            <div class="form-check mt-2">
                                                <input id="radio-switch-2" class="form-check-input" type="radio" name="" value="" />
                                                <label class="form-check-label" for="radio-switch-2">Store 2</label>
                                            </div>
                                            <div class="form-check mt-2">
                                                <input id="radio-switch-3" class="form-check-input" type="radio" name="" value="" />
                                                <label class="form-check-label" for="radio-switch-3">Store 3</label>
                                            </div>
                                        </div>
                                        <div class="col-span-6">
                                            <div>Address</div>
                                            <div class="form-check mt-2">
                                                <label class="form-check-label">Add 1, Stress 1, City 1 , State 1 10654</label>
                                            </div>
                                            <div class="form-check mt-2">
                                                <label class="form-check-label">Add 2, Stress 2, City 2 , State 2 20654</label>
                                            </div>
                                            <div class="form-check mt-2">
                                                <label class="form-check-label">Add 3, Stress 3, City 3 , State 3 30654</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="text-center mt-10 text-black underline">Load More</div>
                                </TabPanel>
                            </TabPanels>
                            <div class="col-span-12 mt-10">
                                <div class="text-md font-medium">Delivery and Collect Note</div>
                                <p id="" class="form-control col-start-1 col-span-12" placeholder="">
                                    Delivery will be shipped after Dragon Boat Festval sorry for the inconvenience we caused.</p>
                            </div>
                            <div class="col-span-12 mt-10">
                                <div class="text-md font-medium">Remark</div>
                                <textarea id="" class="form-control col-start-1 col-span-12" placeholder="">
                                  Remark remark remark remark</textarea>
                            </div>
                        </TabGroup>
                    </div>

                    <!-- BEGIN: Order Summary -->
                    <div class="col-span-12 lg:col-span-4">
                        <div class="intro-y pr-1">
                            <div class="box p-5 mt-3">
                                <div class="text-md font-semibold">Order Summary</div>
                                <div class="flex">
                                    <div class="mr-auto">Subtotal</div>
                                    <div class="font-medium">USD250</div>
                                </div>
                                <div class="flex mt-4">
                                    <div class="mr-auto">-USD20 OFF Discount</div>
                                    <div class="font-medium text-danger">-USD20</div>
                                </div>
                                <div class="flex mt-4">
                                    <div class="mr-auto">Shipping</div>
                                    <div class="font-medium">USD15</div>
                                </div>
                                <div class="flex mt-4 pt-4 border-t border-slate-200/60 dark:border-darkmode-400">
                                    <div class="mr-auto font-medium text-base">Total Charge</div>
                                    <div class="font-medium text-base">USD$300</div>
                                </div>
                            </div>
                        </div>
                        <div class="intro-y box col-span-12 lg:col-span-6 mt-5">
                            <div class="flex items-center px-5 py-5 sm:py-3 border-b border-slate-200/60 dark:border-darkmode-400">
                                <h2 class="font-medium text-base mr-auto">My Cart (4 Items)</h2>
                                <button class="border-none hidden sm:flex underline">
                                    Edit
                                </button>
                            </div>
                            <div class="p-5">
                                <div class="relative flex items-center">
                                    <div class="w-12 h-12 flex-none image-fit">
                                        <img alt="" class="rounded-md" :src="$f()[0].photos[0]" />
                                    </div>
                                    <div class="ml-4 mr-auto">
                                        <a href="" class="font-medium">Product 1</a>
                                        <div class="text-slate-500 mr-5 sm:mr-5">
                                            Description 123
                                        </div>
                                    </div>
                                    <div class="font-medium text-slate-600 dark:text-slate-500">
                                        USD25.99
                                    </div>
                                </div>
                                <div class="relative flex items-center mt-5">
                                    <div class="w-12 h-12 flex-none image-fit">
                                        <img alt="" class="rounded-md" :src="$f()[1].photos[0]" />
                                    </div>
                                    <div class="ml-4 mr-auto">
                                        <a href="" class="font-medium">Product 2</a>
                                        <div class="text-slate-500 mr-5 sm:mr-5">
                                            Description 123
                                        </div>
                                    </div>
                                    <div class="font-medium text-slate-600 dark:text-slate-500">
                                        USD25.99
                                    </div>
                                </div>
                                <div class="relative flex items-center mt-5">
                                    <div class="w-12 h-12 flex-none image-fit">
                                        <img alt="" class="rounded-md" :src="$f()[2].photos[0]" />
                                    </div>
                                    <div class="ml-4 mr-auto">
                                        <a href="" class="font-medium">Product 3</a>
                                        <div class="text-slate-500 mr-5 sm:mr-5">
                                            Product 3
                                        </div>
                                    </div>
                                    <div class="font-medium text-slate-600 dark:text-slate-500">
                                        USD21
                                    </div>
                                </div>
                                <div class="relative flex items-center mt-5">
                                    <div class="w-12 h-12 flex-none image-fit">
                                        <img alt="" class="rounded-md" :src="$f()[2].photos[0]" />
                                    </div>
                                    <div class="ml-4 mr-auto">
                                        <a href="" class="font-medium">Product 4</a>
                                        <div class="text-slate-500 mr-5 sm:mr-5">
                                            Product 3
                                        </div>
                                    </div>
                                    <div class="font-medium text-slate-600 dark:text-slate-500">
                                        USD21
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button class="btn btn-primary col-span-3 mr-1 my-5 col-end-13">Proceed to Payment</button>
                    <!-- END: Order Summary -->

                </div>

            </TabPanel>
            <TabPanel>3</TabPanel>
        </TabPanels>
    </TabGroup>

</div>
<!-- END: Wizard Layout -->
</template>
