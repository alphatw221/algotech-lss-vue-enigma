<template>
  <!-- BEGIN: HTML Table Data -->
  <div class="intro-y p-5 mt-5">
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
            <option value="category">Category</option>
            <option value="remaining_stock">Remaining Stock</option>
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
// import xlsx from "xlsx";
import { createIcons, icons } from "lucide";
import Tabulator from "tabulator-tables";
import dom from "@left4code/tw-starter/dist/js/dom";

const tableRef = ref();
const tabulator = ref();
const filter = reactive({
  field: "name",
  type: "like",
  value: "",
});

// const imageAssets = import.meta.globEager(
//   `/src/assets/images/*.{jpg,jpeg,png,svg}`
// );
const initTabulator = () => {
  tabulator.value = new Tabulator(tableRef.value, {
    ajaxURL: "http://127.0.0.1:8000/api/user-subscription/dealer_search_list/",
    ajaxConfig:{
        method:"GET",
        headers:{
            Accept : 'application/json, text/plain, */*',
            Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjYxOTE5NDc2LCJpYXQiOjE2NjEzMTQ2NzYsImp0aSI6ImU5ZTI5MDU0OGNkMzQ4ZjM4MWZlNTQ4Yzg1NTg3NjhlIiwidXNlcl9pZCI6MzI4LCJkYXRhIjp7ImF1dGhfdXNlcl9pZCI6MzI4LCJzZWxsZXJfaWQiOjM2MCwiY3VzdG9tZXJfaWQiOjM3MywibmFtZSI6IkNlY2lsaWEgVyIsImVtYWlsIjoibWJydzE5QGdtYWlsLmNvbSJ9fQ.sQU4pLNqbU3fSClGByFkbUwpHCQehnpyBtydoPXISl0',
        }
    },
    ajaxFiltering: true,
    ajaxSorting: true,
    printStyled: true,
    pagination: "remote",
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
        title: "NAME",
        minWidth: 200,
        responsive: 0,
        field: "name",
        vertAlign: "middle",
        hozAlign: "center",
        print: false,
        download: false,
        formatter(cell) {
          return `<div>
                <div class="font-medium whitespace-nowrap">${
                  cell.getData().name
                }</div>
                <div class="text-slate-500 text-xs whitespace-nowrap">${
                  cell.getData().id
                }</div>
              </div>`;
        },
      },
      {
        title: "LANGUAGE",
        minWidth: 150,
        field: "lang",
        vertAlign: "middle",
        hozAlign: "center",
        print: false,
        download: false,
        formatter(cell) { return`<div class="font-medium whitespace-nowrap">${cell.getData().lang}</div>`; },
      },
      {
        title: "COUNTRY",
        minWidth: 150,
        field: "region",
        vertAlign: "middle",
        hozAlign: "center",
        print: false,
        download: false,
        formatter(cell) { return`<div class="font-medium whitespace-nowrap">${cell.getData().region}</div>`; },
      },
      {
        title: "FACEBOOK ID",
        minWidth: 150,
        field: "facebook_info.id",
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter(cell) { return`<div class="font-medium whitespace-nowrap">${cell.getData().facebook_info.id}</div>`; },
      },
      {
        title: "TIMEZONE",
        minWidth: 150,
        field: "timezone",
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter(cell) { return`<div class="font-medium whitespace-nowrap">${cell.getData().timezone}</div>`; },
      },
      {
        title: "PHONE",
        minWidth: 150,
        field: "phone",
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
        download: false,
      },
      {
        title: "STATUS",
        minWidth: 150,
        field: "status",
        hozAlign: "center",
        vertAlign: "middle",
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
      // For print format
      {
        title: "NAME",
        field: "name",
        minWidth: 150,
        vertAlign: "middle",
        visible: false,
        print: true,
        download: true,
      },
      {
        title: "LANGUAGE",
        field: "lang",
        minWidth: 150,
        vertAlign: "middle",
        visible: false,
        print: true,
        download: true,
      },
      {
        title: "COUNTRY",
        field: "region",
        minWidth: 150,
        vertAlign: "middle",
        visible: false,
        print: true,
        download: true,
      },
      {
        title: "FACEBOOK ID",
        field: "facebook_info.id",
        vertAlign: "middle",
        visible: false,
        print: true,
        download: true,
      },
      {
        title: "TIMEZONE",
        field: "timezone",
        visible: false,
        vertAlign: "middle",
        print: true,
        download: true,
      },
      {
        title: "PHONE",
        field: "phone",
        visible: false,
        vertAlign: "middle",
        print: true,
        download: true,
      },
      {
        title: "STATUS",
        field: "status",
        visible: false,
        vertAlign: "middle",
        print: true,
        download: true,
      },
    ],
    renderComplete() {
      createIcons({
        icons,
        "stroke-width": 2,
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
      "stroke-width": 2,
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

const onExportJson = () => {
  tabulator.value.download("json", "data.json");
};

const onExportXlsx = () => {
  const win = window;
  // win.XLSX = xlsx;
  // tabulator.value.download("xlsx", "data.xlsx", {
  //   sheetName: "Products",
  // });
};

const onExportHtml = () => {
  tabulator.value.download("html", "data.html", {
    style: true,
  });
};

// Print
const onPrint = () => {
  tabulator.value.print();
};

onMounted(() => {
  initTabulator();
  reInitOnResizeWindow();
});
</script>
