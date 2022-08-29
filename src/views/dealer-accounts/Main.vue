<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Tabulator</h2>
    <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
      <button class="btn btn-primary shadow-md mr-2">Add New Product</button>
      <Dropdown class="ml-auto sm:ml-0">
        <DropdownToggle class="btn px-2 box">
          <span class="w-5 h-5 flex items-center justify-center">
            <PlusIcon class="w-4 h-4" />
          </span>
        </DropdownToggle>
        <DropdownMenu class="w-40">
          <DropdownContent>
            <DropdownItem>
              <FilePlusIcon class="w-4 h-4 mr-2" /> New Category
            </DropdownItem>
            <DropdownItem>
              <UserPlusIcon class="w-4 h-4 mr-2" /> New Group
            </DropdownItem>
          </DropdownContent>
        </DropdownMenu>
      </Dropdown>
    </div>
  </div>
  <!-- BEGIN: HTML Table Data -->
  <div class="intro-y box p-5 mt-5">
    <div class="flex flex-col sm:flex-row sm:items-end xl:items-start">
      <form id="tabulator-html-filter-form" class="xl:flex sm:mr-auto">
        <div class="sm:flex items-center sm:mr-4">
          <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2"
            >Field</label
          >
          <select
            id="tabulator-html-filter-field"
            v-model="filter.field"
            class="form-select w-full sm:w-32 2xl:w-full mt-2 sm:mt-0 sm:w-auto"
          >
            <option value="name">Name</option>
            <option value="id">Category</option>
            <option value="status">Remaining Stock</option>
          </select>
        </div>
        <div class="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
          <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2"
            >Value</label
          >
          <input
            id="tabulator-html-filter-value"
            v-model="filter.value"
            type="text"
            class="form-control sm:w-40 2xl:w-full mt-2 sm:mt-0"
            placeholder="Search..."
          />
        </div>
        <div class="mt-2 xl:mt-0">
          <button
            id="tabulator-html-filter-go"
            type="button"
            class="btn btn-primary w-full sm:w-16"
            @click="onFilter"
          >
            Go
          </button>
          <button
            id="tabulator-html-filter-reset"
            type="button"
            class="btn btn-secondary w-full sm:w-16 mt-2 sm:mt-0 sm:ml-1"
            @click="onResetFilter"
          >
            Reset
          </button>
        </div>
      </form>
      <div class="flex mt-5 sm:mt-0">
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
    <div class="overflow-x-auto scrollbar-hidden">
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

const tableRef = ref();
const tabulator = ref();
const filter = reactive({
  field: "name",
  type: "like",
  value: "",
});

const sellerList = ref('')
onMounted(()=>{
  dealer_search_list_subscriber().then(
    res=>{
      sellerList.value = res.data.data
      console.log(sellerList.value)
      initTabulator();
      reInitOnResizeWindow();
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
    sorter:"array",
    headerSort:true,
    pagination:"local",
    paginationInitialPage:1,
    paginationSize: 10,
    paginationSizeSelector: [10, 20, 30, 40],
    layout: "fitColumns",
    responsiveLayout: "collapse",
    placeholder: "No matching records found",
    columns: [
      {
        formatter: "responsiveCollapse",
        width: 40,
        minWidth: 30,
        hozAlign: "center",
        resizable: false,
        headerSort: false,
      },

      // For HTML table
      {
        title: "Subscription ID",
        minWidth: 200,
        field: "id",
        vertAlign: "middle",
        hozAlign: "center",
        print: false,
        download: false,
        formatter(cell) { return`<div class="font-medium whitespace-nowrap">${cell.getData().id}</div>`; },
      },
      {
        title: "Name",
        minWidth: 200,
        field: "name",
        vertAlign: "middle",
        hozAlign: "center",
        print: false,
        download: false,
        formatter(cell) { return`<div class="font-medium whitespace-nowrap">${cell.getData().name}</div>`; },
      },
      {
        title: "langauge",
        minWidth: 200,
        field: "lang",
        vertAlign: "middle",
        hozAlign: "center",
        print: false,
        download: false,
        formatter(cell) { return`<div class="font-medium whitespace-nowrap">${cell.getData().lang}</div>`; },
      },
      {
        title: "Country",
        minWidth: 200,
        field: "region",
        vertAlign: "middle",
        hozAlign: "center",
        print: false,
        download: false,
        formatter(cell) { return`<div class="font-medium whitespace-nowrap">${cell.getData().region}</div>`; },
      },
      {
        title: "Facebook ID",
        minWidth: 200,
        field: "facebook_info.id",
        vertAlign: "middle",
        hozAlign: "center",
        print: false,
        download: false,
        formatter(cell) { return`<div class="font-medium whitespace-nowrap">${cell.getData().facebook_info.id}</div>`; },
      },
      {
        title: "Status",
        minWidth: 200,
        field: "status",
        vertAlign: "middle",
        hozAlign: "center",
        print: false,
        download: false,
        formatter(cell) { return`<div class="font-medium whitespace-nowrap">${cell.getData().status}</div>`; },
      },
      {
        title: "Timezone",
        minWidth: 200,
        field: "timezone",
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter(cell) { return`<div class="font-medium whitespace-nowrap">${cell.getData().timezone}</div>`; },
      },
      {
        title: "Person in Charge",
        minWidth: 200,
        field: "name",
        vertAlign: "middle",
        hozAlign: "center",
        print: false,
        download: false,
        formatter(cell) { return`<div class="font-medium whitespace-nowrap">${cell.getData().name}</div>`; },
      },
      {
        title: "Phone",
        minWidth: 200,
        field: "phone",
        vertAlign: "middle",
        hozAlign: "center",
        print: false,
        download: false,
        formatter(cell) { return`<div class="font-medium whitespace-nowrap">${cell.getData().phone}</div>`; },
      },
      {
        title: "E-mail",
        minWidth: 200,
        field: "email",
        vertAlign: "middle",
        hozAlign: "center",
        print: false,
        download: false,
        formatter(cell) { return`<div class="font-medium whitespace-nowrap">${cell.getData().email}</div>`; },
      },

      // For print format
      {
        title: "Subscription ID",
        field: "id",
        visible: false,
        print: true,
        download: true,
      },
      {
        title: "Name",
        field: "name",
        visible: false,
        print: true,
        download: true,
      },
      {
        title: "Langauge",
        field: "lang",
        visible: false,
        print: true,
        download: true,
      },
      {
        title: "Country",
        field: "region",
        visible: false,
        print: true,
        download: true,
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
