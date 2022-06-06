     <template>
    <div class="w-full h-full">
        <div class="text-2xl text-base text-center my-5"> Order Details </div>

        <div class="grid grid-cols-12 gap-4">

            <div class="col-span-6">
                <div class="w-full mx-2 ">
                    <div class="flex mb-2">
                        <h2 class="font-medium mr-5"> 
                            Order No. #15861 <span class="btn btn-rounded-pending h-8">Complete</span> 
                        </h2>
                    </div>
                    <div class="flex mb-2">
                        <span class="font-medium mr-5"> Order Date : 20 April. 2022 </span>
                    </div>
                </div>
                <div class="box p-5 my-4 border-2 border-secondary ">
                    <div class="flex">
                        <div class="mr-10">Name</div>
                        <div>Anna</div>
                    </div>
                    <div class="flex mt-4">
                        <div class="mr-10">Phone</div>
                        <div>091234568</div>
                    </div>
                    <div class="flex mt-4">
                        <div class="mr-10">Email</div>
                        <div>091234568@gmail.com</div>
                    </div>
                    <div class="flex mt-4">
                        <div class="mr-7">Remark</div>
                        <div>fhvugehvnohgoghihfecjkdjimgeioh ;g gfcwufgulncfiulfheuihahfghlgf</div>
                    </div>
                </div>
            </div>
            <div class="col-span-6">
                <div class="box p-6 m-3 border-2 border-secondary"> 
                    <div class="flex mb-4 dark:border-darkmode-400">
                        <span class="text-lg"> Order Information</span>   
                    </div>
                    <div class="grid grid-cols-6 gap-2">
                        <div class="col-start-1 col-span-2 py-2">Payment Method</div>
                        <div class="col-start-3 col-span-3 py-2">Direct Payment</div>

                        <div class="col-start-1 col-span-2 py-2">Delivery Information</div>
                        <div class="col-start-3 col-span-3 py-2">In-store pickup</div>

                        <div class="col-start-1 col-span-2 py-2">Pickup Store</div>
                        <div class="col-start-3 col-span-3 py-2">store1</div>

                        <div class="col-start-1 col-span-2 py-2">Pickup Address</div>
                        <div class="col-start-3 col-span-3 py-2">add1, city1, state1, country 45210</div>
                    </div>
                </div>
            </div>
        </div>   
        <div class="w-full">
            <table class="w-full text-center">
                <thead>
                    <tr>
                        <td> # </td>
                        <td> Product </td>
                        <td> Q’ty </td>
                        <td> Price </td>
                        <td> Subtotal </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td> 1 </td>
                        <td> B2 </td>
                        <td> B3 </td>
                        <td> B2 </td>
                        <td> B3 </td>
                    </tr>
                    <tr>
                        <td> 2 </td>
                        <td> A2 </td>
                        <td> A3 </td>
                        <td> B2 </td>
                        <td> B3 </td>
                    </tr>
                    <tr>
                        <td>  </td>
                        <td>  </td>
                        <td>  </td>
                        <td>  </td>
                        <td>  </td>
                    </tr>
                    <tr>
                        <td>  </td>
                        <td>  </td>
                        <td>  </td> 
                        <td> Total (2) </td>
                        <td> USD 130 </td>
                    </tr>
                    <tr>
                        <td>  </td>
                        <td>  </td>
                        <td>  </td> 
                        <td> Delivery Charge </td>
                        <td> USD 20 </td>
                    </tr>
                    <tr>
                        <td>  </td>
                        <td>  </td>
                        <td>  </td> 
                        <td> Discount(Name) </td>
                        <td> USD 10 </td>
                    </tr>
                    <tr>
                        <td>  </td>
                        <td>  </td>
                        <td>  </td> 
                        <td> Grand Total </td>
                        <td> USD 120 </td>
                    </tr>
                </tbody>
            </table>
        </div>      
    </div>
</template>

<style scoped>
    td{  
        width: 100px;
        height: 30px;
        border: 1px solid gray;
    }

</style>