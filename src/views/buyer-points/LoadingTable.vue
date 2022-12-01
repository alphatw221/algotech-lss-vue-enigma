<template>
    <div class="tableWrapper mt-4 px-2 sm:px-10">
      <table class="table">
        <thead>
          <tr>
            <template v-for="index in props.column.length" :key="index"> 
              <th :class="{'hidden sm:table-cell': index == 3 ,'hidden md:table-cell': index== 4 ,'hidden xl:table-cell': index > 4}" >{{$t(props.tableName + '.table.'+ props.column[index-1]?.name)}}</th>
            </template>
          </tr>
        </thead>
        <tbody>
          <tr v-for="index in 8 " :key="index">
            <template v-for="index in props.column.length" :key="index"> 
              <td :class="{'hidden sm:table-cell': index == 3 ,'hidden md:table-cell': index== 4 ,'hidden xl:table-cell': index > 4}"
               :data-content="$t(props.tableName + '.table.'+ props.column[index-1]?.name)" class="loading"><div class="bar"></div></td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
    </template>
  
<script setup>

const props = defineProps({
  column: Array,
  tableName: String,
});


</script>

    
<style scoped>

@media only screen and (max-width: 760px),
  (min-device-width: 769px) and (max-device-width: 1024px) {
  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
    padding: 0px !important;
    font-size: 15px;
  }

  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  tr {
    border-bottom: 2px solid #dddddd;
    background: white;
    margin-bottom: 10px;
  }

  td {
    border: none;
    border-bottom: 0 !important;
    position: relative;
    width: auto;
    padding-left: 55% !important;
    text-align: left !important;
    box-shadow: none !important;
    min-height: 28px;
  }

  td:before {
    content: attr(data-content);
    position: absolute;
    left: 0px;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
    font-weight: bold;
    box-shadow: none !important;
  }
}
</style>