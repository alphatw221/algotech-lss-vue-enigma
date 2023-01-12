<template>
    <div class="tableWrapper mt-4">
      <table class="table">
        <thead  :style="{ backgroundColor: props.theadColor}" >
          <tr>
            <template v-for="index in props.column.length" :key="index"> 
              <th :class="{'hidden sm:table-cell': index == 3 ,'hidden md:table-cell': index== 4 ,'hidden xl:table-cell': index > 4}" >{{$t(props.tableName + '.table_column.'+ props.column[index-1]?.name)}}</th>
            </template>
          </tr>
        </thead>
        <tbody>
          <tr v-for="index in 8 " :key="index">
            <template v-for="column in props.column" :key="column"> 
              <td :class="{'hidden sm:table-cell': index == 3 ,'hidden md:table-cell': index== 4 ,'hidden xl:table-cell': index > 4}"
               :data-content="$t(props.tableName + '.table_column.'+ column.name)" class="loading"><div class="bar"></div></td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
    </template>
  
<script setup>
import { computed } from "@vue/runtime-core";


const props = defineProps({
  column: Array,
  tableName: String,
  theadColor:{
    type: String,
    default: "#fff"
  },
});

</script>