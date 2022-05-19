<template>
  <!-- BEGIN: Boxed Tab -->
  <!-- <div
      class="
        flex flex-col
        sm:flex-row
        items-center
        p-5
        border-b border-slate-200/60
        dark:border-darkmode-400
      "
    >
      <h2 class="font-medium text-base mr-auto">Boxed Tab</h2>
      <div
        class="form-check form-switch w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0"
      >
      </div>
    </div> -->
  <div>
    <div class="p-5">
      <TabGroup class="grid grid-cols-12 gap-4">
        <div class="col-start-1">
          <TabList class="nav-boxed-tabs">
            <Tab class="w-full py-2" tag="button">Secheduled</Tab>
            <Tab class="w-full py-2" tag="button">History</Tab>
            <Tab class="w-full py-2" tag="button">Ongoing</Tab>
          </TabList>
          <!-- BEGIN: Basic Table -->
        </div>
        <div class="p-5 col-span-12">
          <div class="overflow-x-auto">
            <table class="table">
              <thead>
                <tr>
                  <th class="whitespace-nowrap">Title</th>
                  <th class="whitespace-nowrap">Time</th>
                  <th class="whitespace-nowrap">Manage Order</th>
                  <th class="whitespace-nowrap">Stop Checkout</th>
                  <th class="whitespace-nowrap"></th>
                  <th class="whitespace-nowrap"></th>
                </tr>
              </thead>
            </table>
            <TabPanels class="mt-5">
              <TabPanel class="leading-relaxed">
                <tbody>
                  <tr>
                    <td>adfa</td>
                    <td>ffff</td>
                    <td>asd</td>
                    <td>asd</td>
                    <td>asd</td>
                    <td>das</td>
                  </tr>
                </tbody>
              </TabPanel>
              <TabPanel class="leading-relaxed"> History. </TabPanel>
              <TabPanel class="leading-relaxed"> Ongoing. </TabPanel>
            </TabPanels>
          </div>
        </div>
        <!-- END: Basic Table -->
      </TabGroup>
    </div>
    <!-- END: Boxed Tab -->
  </div>
</template>