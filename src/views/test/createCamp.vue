<template class="body">
  <div class="flex items-center mt-8"></div>
  <TabGroup>
    <TabList class="nav-tabs">
      <Tab class="w-full py-2" tag="button">Example Tab 1</Tab>
      <Tab class="w-full py-2" tag="button">Example Tab 2</Tab>
    </TabList>
    <TabPanels class="border-l border-r border-b">
      <TabPanel class="leading-relaxed p-5">
        <div class="box p-10">
          <span class="text-2xl font-medium leading-none mb-3"
            >Create Campaign</span
          >
          <div class="intro-y grid grid-cols-12 gap-5 mt-5">
            <div class="col-start-1 col-span-6">
              <label for="regular-form-2" class="form-label -mb-3"
                >Campaign Title</label
              >
              <input
                id="regular-form-2"
                type="text"
                class="form-control form-control-rounded"
                placeholder="Rounded"
              />
            </div>
            <div class="col-span-3">
              <label for="regular-form-2" class="form-label -mb-3"
                >Period</label
              >
              <Litepicker
                id="post-form-2"
                v-model="salesReportFilter"
                :options="{
                  autoApply: false,
                  showWeekNumbers: true,
                  dropdowns: {
                    minYear: 1990,
                    maxYear: null,
                    months: true,
                    years: true,
                  },
                }"
                class="form-control form-control-rounded"
              />
            </div>
            <div class="col-span-3">
              <label for="regular-form-2" class="form-label -mb-3">　</label>
              <Litepicker
                id="post-form-2"
                v-model="salesReportFilter"
                :options="{
                  autoApply: false,
                  showWeekNumbers: true,
                  dropdowns: {
                    minYear: 1990,
                    maxYear: null,
                    months: true,
                    years: true,
                  },
                }"
                class="form-control form-control-rounded"
              />
            </div>
          </div>
        </div>
        <div class="box mt-5 p-10">
          <span class="text-2xl font-medium leading-none mb-3"
            >Assign Product</span
          >

          <div class="intro-y grid grid-cols-12 gap-5 mt-5">
            <button
              class="col-end-10 btn btn-rounded-primary py-2 w-48 text-lg"
              @click=""
            >
              Select Product
            </button>
          </div>
        </div>
      </TabPanel>
      <TabPanel class="leading-relaxed p-5">
        <span class="text-2xl font-medium leading-none m-10">Delivery</span>
          <div class="box p-10 mt-3 intro-y grid grid-cols-12 gap-5 my-10">
            <label
              for="regular-form-2"
              class="form-label col-start-1 col-span-3"
              >Delivery Charge</label
            >
            <input
              id="regular-form-2"
              type="text"
              class="form-control form-control-rounded col-span-6"
              value="USD $20"
            />
            <label
              for="regular-form-2"
              class="form-label col-start-1 col-span-3"
              >Free Delivery Charge Above</label
            >
            <input
              id="regular-form-2"
              type="text"
              class="form-control form-control-rounded col-span-6"
              placeholder=""
            />
            <label
              for="regular-form-2"
              class="form-label col-start-1 col-span-3"
              >Free Delivery for Minimum</label
            >
            <input
              id="regular-form-2"
              type="text"
              class="form-control form-control-rounded col-span-6"
              placeholder=""
            />
            <label
              for="regular-form-2"
              class="form-label col-start-1 col-span-3"
              >Delivery Charge Option</label
            >
            <div class="col-start-2 col-span-10">
              <div class="intro-y grid grid-cols-12 gap-5">
                <label
                  for="regular-form-2"
                  class="form-label deLable col-start-1 col-span-3 h-10"
                >
                  Express Delivery</label
                >
                <select
                  class="form-select form-select-lg col-span-4"
                  aria-label=".form-select-lg example"
                >
                  <option>On top of delivery charge</option>
                  <option>Replace delivery charge</option>
                </select>
                <input
                  id="regular-form-2"
                  type="text"
                  class="form-control form-control-rounded col-span-3 h-10"
                  placeholder=""
                />
                <button
                  class="btn btn-outline-danger w-24 inline-block mr-1 mb-2"
                >
                  Delete
                </button>
                <label
                  for="regular-form-2"
                  class="form-label deLable col-start-1 col-span-3 h-10"
                >
                  Overseas</label
                >
                <select
                  class="form-select form-select-lg col-span-4"
                  aria-label=".form-select-lg example"
                >
                  <option>On top of delivery charge</option>
                  <option>Replace delivery charge</option>
                </select>
                <input
                  id="regular-form-2"
                  type="text"
                  class="form-control form-control-rounded col-span-3"
                  placeholder=""
                />
                <button
                  class="btn btn-outline-danger w-24 inline-block mr-1 mb-2"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        <span class="text-2xl font-medium leading-none m-10">Collect In Store</span>
        <div class="box intro-y grid grid-cols-8 gap-5 mt-5 p-10 ">
            <label
              for="regular-form-2"
              class="form-label col-start-1 col-span-1"
              >Pickup Start Date</label
            >
            <Litepicker
                id="post-form-2"
                v-model="salesReportFilter"
                :options="{
                  autoApply: false,
                  showWeekNumbers: true,
                  dropdowns: {
                    minYear: 1990,
                    maxYear: null,
                    months: true,
                    years: true,
                  },
                }"
                class="form-control form-control-rounded col-span-3"
              />
            <label
              for="regular-form-2"
              class="form-label col-start-5 col-span-1"
              >Pickup End Date</label
            >
            <Litepicker
                id="post-form-2"
                v-model="salesReportFilter"
                :options="{
                  autoApply: false,
                  showWeekNumbers: true,
                  dropdowns: {
                    minYear: 1990,
                    maxYear: null,
                    months: true,
                    years: true,
                  },
                }"
                class="form-control form-control-rounded col-span-3"
              />

            <label
              for="regular-form-2"
              class="form-label col-start-1 w-48"
              >Pickup Store</label
            >
            <input
              id="regular-form-2"
              type="text"
              class="form-control form-control-rounded col-span-4"
              placeholder=""
            />
            <label
              for="regular-form-2"
              class="form-label col-start-1 w-48"
              >Pickup Address</label
            >
            <input
              id="regular-form-2"
              type="text"
              class="form-control form-control-rounded col-span-6 h-10"
              placeholder=""
            />
            <button
                  class="btn btn-outline-danger w-24 inline-block mr-1 mb-2"
                >
                  Delete
            </button>
        </div>
        <div class="box intro-y grid grid-cols-8 gap-5 mt-5 p-10 ">
            <label
              for="regular-form-2"
              class="form-label col-start-1 col-span-2 text-xl"
              >Delivery Note</label
            >
             <textarea
                      id="update-profile-form-5"
                      class="form-control col-start-1 col-span-7 "
                      placeholder="Adress"
                    >
                        10 Anson Road, International Plaza, #10-11, 079903 Singapore, Singapore</textarea
                    >

            
        </div>
      </TabPanel>
    </TabPanels>
  </TabGroup>
</template>

<style scoped>
.body {
  font-size: 18px;
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.deLable {
  height: 42px;
  border: 1px solid rgb(129, 129, 129);
  border-radius: 40px 40px;
  text-align: center;
  padding-top: 7px;
}
</style>
