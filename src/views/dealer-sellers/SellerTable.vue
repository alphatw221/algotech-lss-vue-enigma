<template>
  <div class="intro-y p-5">
    <div class="flex flex-col sm:flex-row sm:items-end xl:items-start gap-3">
      <div id="tabulator-html-filter-form" class="flex flex-wrap gap-3 sm:mr-auto">
        <div class="flex items-center sm:mr-4 grow">
          <label class="w-fit flex-none xl:w-auto xl:flex-initial mr-2 whitespace-nowrap"
            >Search by:</label
          >
          <select
            id="tabulator-html-filter-field"
            v-model="filter.field"
            class="grow form-select h-[35px] sm:h-[42px] w-full sm:w-32 2xl:w-full sm:w-auto"
          >
            <option value="name">Name</option>
            <option value="type">Plan</option>
            <option value="status">Status</option>
          </select>
        </div>
        <div class="relative ml-auto"> 
            <input type="text" class="form-control w-full sm:w-60 rounded-lg"
                :placeholder="$t('stock.search_bar.search_holder')" 
                id="tabulator-html-filter-value" 
                v-model="filter.value" 
                @keydown.enter.prevent="onFilter" 
            />
            <SearchIcon class="absolute w-7 h-7 top-1 sm:top-2 right-4 z-10 text-slate-600" @click="onFilter"/>
        </div>
        <XIcon 
            v-if="filter.value"
            id="tabulator-html-filter-reset"
            class="flex-none w-7 h-7 mt-2 text-slate-600" @click="onResetFilter"/>
      </div>
      <div class="flex">
        <button
          id="tabulator-print"
          class="btn btn-outline-secondary w-1/2 sm:w-auto mr-2"
          @click="onPrint"
        >
          <PrinterIcon class="w-4 h-4 mr-2" /> Print
        </button>
        <Dropdown class="w-1/2 sm:w-auto">
          <DropdownToggle class="btn btn-outline-secondary w-full sm:w-auto">
            <FileTextIcon class="w-4 h-4 mr-2" /> Export
            <ChevronDownIcon class="w-4 h-4 ml-auto sm:ml-2" />
          </DropdownToggle>
          <DropdownMenu class="w-40">
            <DropdownContent>
              <DropdownItem @click="onExportCsv">
                <FileTextIcon class="w-4 h-4 mr-2" /> Export CSV
              </DropdownItem>
            </DropdownContent>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
    <div v-if="!showTable"> 
        <LoadingTable />
    </div>
    <div :show="showTable == true" class="overflow-x-hidden scrollbar-hidden">
      <div
        id="tabulator"
        ref="tableRef"
        class="mt-5 table-report table-report--tabulator"
      ></div>
    </div>
  </div>
  <!-- END: HTML Table Data -->
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { createIcons, icons } from "lucide";
import Tabulator from "tabulator-tables";
import { dealer_search_list_subscriber, dealer_retrieve_subscriber } from '@/api/dealer';
import dom from "@left4code/tw-starter/dist/js/dom";
import LoadingTable from "./LoadingTable.vue";

const tableRef = ref();
const tabulator = ref();
const showTable = ref(false)
const filter = reactive({
  field: "name",
  type: "like",
  value: "",
});

const sellerList = ref('')

onMounted(()=>{
  dealer_search_list_subscriber().then(
    res=>{
      sellerList.value = res.data
      initTabulator();
      reInitOnResizeWindow();
      showTable.value = true
    }
  )
})

const imageAssets = import.meta.globEager(
  `/src/assets/images/*.{jpg,jpeg,png,svg}`
);

const initTabulator = () => {
  tabulator.value = new Tabulator(tableRef.value, {
    data: sellerList.value,
    printAsHtml: true,
    printStyled: true,
    height:"auto",
    sorter:"array",
    headerSort:true,
    pagination:"local",
    paginationInitialPage:1,
    paginationSize: 10,
    paginationSizeSelector: [10, 20, 30, 40],
    layout: "fitColumns",
    responsiveLayout: "collapse",
    placeholder: "No matching records found",
    responsiveLayoutCollapseStartOpen:false,
    columns: [
      {
        formatter: "responsiveCollapse",
        width: 40,
        minWidth: 30,
        hozAlign: "center",
        resizable: false,
        headerSort: false,
        print: false,
        download: false,
      },

      // For HTML table
      {
        title: "Name",
        minWidth: 150,
        field: "name",
        vertAlign: "middle",
        hozAlign: "center",
        print: false,
        download: false,
        formatter(cell) { return`<div class="font-medium whitespace-nowrap">${cell.getData().name}</div>`; },
      },
      {
        title: "Subscription ID",
        minWidth: 150,
        field: "id",
        vertAlign: "middle",
        hozAlign: "center",
        print: false,
        download: false,
        formatter(cell) { return`<div class="font-medium whitespace-nowrap">${cell.getData().id}</div>`; },
      },
      {
        title: "Plan",
        minWidth: 150,
        field: "type",
        vertAlign: "middle",
        hozAlign: "center",
        print: false,
        download: false,
        formatter(cell) { return`<div class="font-medium whitespace-nowrap">${cell.getData().type}</div>`; },
      },
      {
        title: "End Date",
        minWidth: 150,
        field: "expired_at",
        vertAlign: "middle",
        hozAlign: "center",
        print: false,
        download: false,
        formatter(cell) { return`<div class="font-medium whitespace-nowrap">${new Date(cell.getData().expired_at).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric",hourCycle: 'h24',hour:"2-digit",minute: "2-digit"})}</div>`; },
      },
      {
        title: "Status",
        minWidth: 150,
        field: "status",
        vertAlign: "middle",
        hozAlign: "center",
        print: false,
        download: false,
        formatter(cell) {
          return `<div class="flex items-center lg:justify-center ${
            cell.getData().status ? "text-success" : "text-danger"
          }">
                <i data-lucide="check-square" class="w-4 h-4 mr-2"></i> ${
                  cell.getData().status ? "Active" : "Inactive"
                }
              </div>`;
        },
      },
      {
        title: "E-mail",
        minWidth: 150,
        field: "email",
        vertAlign: "middle",
        hozAlign: "center",
        print: false,
        download: false,
        formatter(cell) { return`<div class="font-medium whitespace-nowrap">${cell.getData().email}</div>`; },
      },
      {
        title: "Phone",
        minWidth: 150,
        field: "phone",
        vertAlign: "middle",
        hozAlign: "center",
        print: false,
        download: false,
        formatter(cell) { return`<div class="font-medium whitespace-nowrap">${cell.getData().phone}</div>`; },
      },
      {
        title: "Timezone",
        minWidth: 150,
        field: "timezone",
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter(cell) { return`<div class="font-medium whitespace-nowrap">${cell.getData().timezone}</div>`; },
      },
      {
        title: "Description",
        minWidth: 150,
        field: "description",
        vertAlign: "middle",
        hozAlign: "center",
        print: false,
        download: false,
        formatter(cell) { return`<div class="font-medium whitespace-nowrap">${cell.getData().description}</div>`; },
      },

      // For print format
      {
        title: "Name",
        field: "name",
        visible: false,
        print: true,
        download: true,
        formatter(cell) { return`<div class="font-medium whitespace-nowrap w-fit">${cell.getData().name}</div>`; },
      },
      {
        title: "Subscription ID",
        field: "id",
        visible: false,
        print: true,
        download: true,
        vertAlign: "middle",
        formatter(cell) { return`<div class="flex items-center lg:justify-center font-medium">${cell.getData().id}</div>`; },
      },
      {
        title: "Plan",
        field: "type",
        visible: false,
        print: true,
        download: true,
        formatter(cell) { return`<div class="font-medium whitespace-nowrap w-fit">${cell.getData().type}</div>`; },
      },
      {
        title: "End Date",
        field: "expired_at",
        visible: false,
        print: true,
        download: true,
        formatter(cell) { return`<div class="font-medium whitespace-nowrap">${new Date(cell.getData().expired_at).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric",hourCycle: 'h24',hour:"2-digit",minute: "2-digit"})}</div>`; },
      },
      {
        title: "Status",
        field: "status",
        visible: false,
        print: true,
        download: true,
        formatter(cell) {
          return `<div class="flex items-center lg:justify-center ${
            cell.getData().status ? "text-success" : "text-danger"
          }">
                <i data-lucide="check-square" class="w-4 h-4 mr-2"></i> ${
                  cell.getData().status ? "Active" : "Inactive"
                }
              </div>`;
        },
      },
      {
        title: "Email",
        field: "email",
        visible: false,
        print: true,
        download: true,
        formatter(cell) { return`<div class="font-medium whitespace-nowrap w-fit">${cell.getData().email}</div>`; },
      },
      {
        title: "Description",
        field: "description",
        visible: false,
        print: true,
        download: true,
        formatter(cell) { return`<div class="font-medium whitespace-nowrap w-fit">${cell.getData().description}</div>`; },
      },
    ],
    renderComplete() {
      createIcons({
        icons,
        "stroke-width": 1.5,
        nameAttr: "data-lucide",
      });
    },
  });
};

// Redraw table onresize
const reInitOnResizeWindow = () => {
  window.addEventListener("resize", () => {
    tabulator.value.redraw();
    createIcons({
      icons,
      "stroke-width": 1.5,
      nameAttr: "data-lucide",
    });
  });
};

// Filter function
const onFilter = () => {
  tabulator.value.setFilter(filter.field, filter.type, filter.value);
};

// On reset filter
const onResetFilter = () => {
  filter.field = "name";
  filter.type = "like";
  filter.value = "";
  onFilter();
};

// Export
const onExportCsv = () => {
  tabulator.value.download("csv", "data.csv");
};

const onPrint = () => {
  tabulator.value.print();
};

</script>
