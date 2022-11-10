<template>
    <div class="tableWrapper mt-4">
      <table class="table">
        <thead>
          <tr>
            <th>{{$t('order_points.table.date')}}</th>
            <th>{{$t('order_points.table.change_reason')}}</th>
            <th class="hidden sm:table-cell">{{$t('order_points.table.earned')}}</th>
            <th class="hidden md:table-cell">{{$t('order_points.table.used')}}</th>
            <th class="hidden lg:table-cell">{{$t('order_points.table.discount')}}</th>
            <th class="hidden lg:table-cell">{{$t('order_points.table.expire_at')}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="index in 8" :key="index">
            <td class="loading"><div class="bar"></div></td>
            <td class="loading"><div class="bar"></div></td>
            <td class="loading hidden sm:table-cell"><div class="bar"></div></td>
            <td class="loading hidden md:table-cell"><div class="bar"></div></td>
            <td class="loading hidden lg:table-cell"><div class="bar"></div></td>
            <td class="loading hidden lg:table-cell"><div class="bar"></div></td>
          </tr>
        </tbody>
      </table>
    </div>
    </template>
    
    
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
  }

  td {
    border: none;
    border-bottom: 0 !important;
    position: relative;
    width: auto;
    padding-left: 50% !important;
    text-align: left !important;
    box-shadow: none !important;
    min-height: 28px;
  }

  td:before {
    position: absolute;
    left: 6px;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
    font-weight: bold;
    box-shadow: none !important;
  }

  td:nth-of-type(1):before {
    content: attr(data-content);
  }
  td:nth-of-type(2):before {
    content: attr(data-content);
    height: 100px;
  }
  td:nth-of-type(3):before {
    content: attr(data-content);
  }
  td:nth-of-type(4):before {
    content: attr(data-content);
  }
  td:nth-of-type(5):before {
    content: attr(data-content);
  }
  td:nth-of-type(6):before {
    content: attr(data-content);
  }
  td:nth-of-type(6) {
    min-height: 35px !important;
  }
}
</style>