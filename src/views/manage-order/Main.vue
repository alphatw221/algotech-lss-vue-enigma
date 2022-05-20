<template>
    <!-- OUTTER BOX -->
    <div class="intro-y chat grid grid-cols-12 gap-5" style="height: 725px">
        <!-- BEGIN: campaign Info -->
        <div class="col-span-12">
            <!-- BEGIN: campaign Status -->
            <div class="grid grid-cols-12 gap-6 mt-5">
                <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                    <div class="report-box zoom-in">
                        <div class="box p-5">
                            <div class="flex">
                                <ShoppingCartIcon class="report-box__icon text-primary" />
                                <div class="ml-auto">
                                    <Tippy tag="div" class="report-box__indicator bg-success cursor-pointer"
                                        content="33% Higher than last month">
                                        33%
                                        <ChevronUpIcon class="w-4 h-4 ml-0.5" />
                                    </Tippy>
                                </div>
                            </div>
                            <div class="text-3xl font-medium leading-8 mt-6">98.05%</div>
                            <div class="text-base text-slate-500 mt-1">Colsed Rate</div>
                        </div>
                    </div>
                </div>
                <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                    <div class="report-box zoom-in">
                        <div class="box p-5">
                            <div class="flex">
                                <CreditCardIcon class="report-box__icon text-pending" />
                                <div class="ml-auto">
                                    <Tippy tag="div" class="report-box__indicator bg-danger cursor-pointer"
                                        content="2% Lower than last month">
                                        2%
                                        <ChevronDownIcon class="w-4 h-4 ml-0.5" />
                                    </Tippy>
                                </div>
                            </div> 
                            <div class="text-3xl font-medium leading-8 mt-6">$ 1352,000</div>
                            <div class="text-base text-slate-500 mt-1">Sales</div>
                        </div>
                    </div>
                </div>
                <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                    <div class="report-box zoom-in">
                        <div class="box p-5">
                            <div class="flex">
                                <MonitorIcon class="report-box__icon text-warning" />
                                <div class="ml-auto">
                                    <Tippy tag="div" class="report-box__indicator bg-success cursor-pointer"
                                        content="12% Higher than last month">
                                        12%
                                        <ChevronUpIcon class="w-4 h-4 ml-0.5" />
                                    </Tippy>
                                </div>
                            </div>
                            <div class="text-3xl font-medium leading-8 mt-6">11.95%</div>
                            <div class="text-base text-slate-500 mt-1">Uncheckout Rate</div>
                        </div>
                    </div>
                </div>
                <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                    <div class="report-box zoom-in">
                        <div class="box p-5">
                            <div class="flex">
                                <UserIcon class="report-box__icon text-success" />
                                <div class="ml-auto">
                                    <Tippy tag="div" class="report-box__indicator bg-success cursor-pointer"
                                        content="22% Higher than last month">
                                        22%
                                        <ChevronUpIcon class="w-4 h-4 ml-0.5" />
                                    </Tippy>
                                </div>
                            </div>
                            <div class="text-3xl font-medium leading-8 mt-6">152,040</div>
                            <div class="text-base text-slate-500 mt-1">Comments</div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- END: campaign Status -->

            <div class="box col-span-12 mt-6">
                <div class="w-full sm:w-auto relative mr-auto mt-3 sm:mt-0">
          <SearchIcon
            class="w-4 h-4 absolute my-auto inset-y-0 ml-3 left-0 z-10 text-slate-500"
          />
          <input
            type="text"
            class="form-control w-full sm:w-64 box px-10"
            placeholder="Search files"
          />
          <Dropdown
            class="inbox-filter absolute inset-y-0 mr-3 right-0 flex items-center"
            placement="bottom-start"
          >
            <DropdownToggle
              tag="a"
              role="button"
              class="w-4 h-4 block"
              href="javascript:;"
            >
              <ChevronDownIcon class="w-4 h-4 cursor-pointer text-slate-500" />
            </DropdownToggle>
            <DropdownMenu class="inbox-filter__dropdown-menu pt-2">
              <DropdownContent tag="div">
                <div class="grid grid-cols-12 gap-4 gap-y-3 p-3">
                  <div class="col-span-6">
                    <label for="input-filter-1" class="form-label text-xs"
                      >File Name</label
                    >
                    <input
                      id="input-filter-1"
                      type="text"
                      class="form-control flex-1"
                      placeholder="Type the file name"
                    />
                  </div>
                  <div class="col-span-6">
                    <label for="input-filter-2" class="form-label text-xs"
                      >Shared With</label
                    >
                    <input
                      id="input-filter-2"
                      type="text"
                      class="form-control flex-1"
                      placeholder="example@gmail.com"
                    />
                  </div>
                  <div class="col-span-6">
                    <label for="input-filter-3" class="form-label text-xs"
                      >Created At</label
                    >
                    <input
                      id="input-filter-3"
                      type="text"
                      class="form-control flex-1"
                      placeholder="Important Meeting"
                    />
                  </div>
                  <div class="col-span-6">
                    <label for="input-filter-4" class="form-label text-xs"
                      >Size</label
                    >
                    <select id="input-filter-4" class="form-select flex-1">
                      <option>10</option>
                      <option>25</option>
                      <option>35</option>
                      <option>50</option>
                    </select>
                  </div>
                  <div class="col-span-12 flex items-center mt-3">
                    <button class="btn btn-secondary w-32 ml-auto">
                      Create Filter
                    </button>
                    <button class="btn btn-primary w-32 ml-2">Search</button>
                  </div>
                </div>
              </DropdownContent>
            </DropdownMenu>
          </Dropdown>
        </div>

            </div>


            <div class="box overflow-x-auto mt-10">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th class="whitespace-nowrap">#</th>
                            <th class="whitespace-nowrap">First Name</th>
                            <th class="whitespace-nowrap">Last Name</th>
                            <th class="whitespace-nowrap">Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Angelina</td>
                            <td>Jolie</td>
                            <td>@angelinajolie</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Brad</td>
                            <td>Pitt</td>
                            <td>@bradpitt</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Charlie</td>
                            <td>Hunnam</td>
                            <td>@charliehunnam</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
// import {campaign_comment_summarize} from '@/api/user';
import { ref, provide } from "vue";

// Basic sticky notification
const basicStickyNotification = ref();
provide("bind[basicStickyNotification]", (el) => {
    // Binding
    basicStickyNotification.value = el;
});
const basicStickyNotificationToggle = () => {
    // Show notification
    basicStickyNotification.value.showToast();
};

// Basic sticky notification
const videoStickyNotification = ref();
provide("bind[videoStickyNotification]", (el) => {
    // Binding
    videoStickyNotification.value = el;
});
const videoStickyNotificationToggle = () => {
    // Show notification
    videoStickyNotification.value.showToast();
};
</script>

<style scoped>
.switch-toggle {
    float: left;
    height: 42px;
    width: 300px;
    background: #363636ce;
    border-radius: 42px 42px;
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
    font-weight: 500;
    font-size: 16px;
    color: #fff;
    cursor: pointer;
}

.switch-toggle input:checked+label {
    background: #064e3b;
    height: 42px;
    width: 100px;
    border-radius: 42px 42px;
}
</style>
