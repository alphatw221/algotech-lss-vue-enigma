<template>
    <CrudDataListLSS
        v-model="searchData"
        :title="title"
        :searchBarSettings="searchBarSettings"
        :dataListSettings="dataListSettings"
        :data="data"
        :actions="actions"
        :emptyDataMessage="emptyDataMessage"
        :tableClass="'h-[50vh]'"

    >
    </CrudDataListLSS>
</template>

<script setup>
import {ref, onMounted, watch, computed} from "vue"
import CrudDataListLSS from "../crud-data-list-lss/Main.vue"
import { useRoute, useRouter } from "vue-router";


import { search_auto_data_vehicles } from '../../api_carlet/auto_data.js'
const route = useRoute()
const router = useRouter()

const title = 'AutoData車輛資料庫'
const emptyDataMessage = ref('無車輛資料')

const searchData = ref({
    page:1,
    size:25,
    dataCount:0,
    id:'',
    make:'',
    model:'',
    sub_model:'',
    start_of_production_year:'',
    end_of_production_year:'',
    keyword:'',
    order_by:'id'

})


const searchBarSettings=[
    // {key:'category_id', name:'類別', type:'search_select', class:'w-[150px]', placeholder:'搜尋名稱', display_key:'category_name', search_function:searchProductCategory, option_name_keys:['name'], option_value_key:'id', router_param_key:'store_id', options:[{id:null, name:'無'}]},
    // {key:'category_id', name:'類別', type:'select', value_key:'id', name_key:'name', options:((globalStore?.user_data?.stores||[]).find(store=>store.id.toString()==route.params.store_id)?.product_categories||[])},
    // {key:'visibility', name:'狀態', type:'select',value_key:'value', name_key:'name', options:[{value:'visable',name:'公開'},{value:'invisable',name:'未公開'},{value:'schedule',name:'限時公開'}]},
    {key:'id', name:'ID', type:'input', placeholder:'輸入ID', action:'search'},
    {key:'make', name:'廠牌', type:'input', placeholder:'輸入廠牌', action:'search'},
    {key:'model', name:'車型', type:'input', placeholder:'(關鍵字使用,隔開)', action:'search'},
    {key:'sub_model', name:'子車型', type:'input', placeholder:'(關鍵字使用,隔開)', action:'search'},
    {key:'start_of_production_year', name:'起始製造年份', type:'input', placeholder:'輸入年份', action:'search'},
    {key:'end_of_production_year', name:'結束製造年份', type:'input', placeholder:'輸入年份', action:'search'},
    {key:'keyword', name:'關鍵字', type:'input', placeholder:'廠牌/車型/子車型', action:'search'},

     {key:'reset', name:'重設', type:'button', action:'reset' ,class:"ml-auto"},
    {key:'search', name:'搜索', type:'button', action:'search' ,class:"ml-2"},
    // {type:'slot', slot_name:'bulk_edit'},

    // {key:'create_campaign', name:'Create', type:'button', action:'route_to_create_campaign_page' ,class:"ml-auto"},
    // {key:'other', type:'dropdown', actions:[

    // ]},
]
const dataListSettings=[
    // {type:'checkbox', name:''},

    // {key:'social_platform_connections', type:'custom', custom_key:'platform', name:'Platform', headerClass:'text-center', },
    
    // {key:'uuid', type:'link', name:'Title'},
    // {key:'start_at', type:'datetime', name:'Start Date' , sortable:true},
    // {key:'end_at', type:'datetime', name:'End Date', sortable:true},

    // {key:'uuid', type:'custom', custom_key:'manage_order', name:'Manage Order', headerClass:'text-center'},
    // {key:'uuid', type:'custom', custom_key:'stop_checkout', name:'Stop Checkout', headerClass:'text-center', tippy:'Disable shopping cart immediately'},


    {key:'id', name:'ID', type:'text', dataType:'integer', sortable:true},
    {key:'make', name:'車廠', type:'text', dataType:'string', sortable:true},
    {key:'model', name:'車型', type:'text', dataType:'string', headerClass:'text-center', class:'text-center', sortable:true},
    {key:'sub_model', name:'子車型', type:'text', dataType:'string', headerClass:'text-center', class:'text-center', sortable:true},

    {key:'property_value', name:'變速', type:'text', dataType:'string', headerClass:'text-center', class:'text-center', sortable:true},
    {key:'start_of_production_year', name:'開始生產年份', type:'text', dataType:'integer', headerClass:'text-center', class:'text-center', sortable:true},
    {key:'end_of_production_year', name:'結束生產年份', type:'text', dataType:'integer', headerClass:'text-center', class:'text-center', sortable:true},

    // {key:'bundle', name:'個數', type:'text', dataType:'string', headerClass:'text-center', class:'text-center'},
    // // {key:'tags', name:'標籤', type:'text', dataType:'array', headerClass:'text-center'},
    // {key:'category_name', name:'類別', type:'text', dataType:'string', headerClass:'text-center', class:'text-center'},
    // {key:'tags', name:'標籤', type:'list', dataType:'string'},
    // {key:'priority', name:'優先', type:'text', dataType:'integer', headerClass:'text-center', class:'text-center'},
    // {key:'visibility', name:'狀態', type:'map_text',  headerClass:'text-center', class:'text-center', classes:{visable:'text-success',invisable:'text-danger'}, map:{'visable':'公開','invisable':'未公開','schedule':'排程公開'}},
    // {type:'custom', custom_key:'campaign_more_actions', name:''},
    // {key: null, name:'', type:'actions', headerClass:'text-center', actions:[
    //     {key:'product_detail', name:'編輯商品', class:'', action:'route_to_product_detail_page'},
    //     {key:'delete_product', name:'刪除商品', class:'text-danger', action:'delete_product'}
    // ]}
]

const data = ref([])


onMounted(()=>{
    getData()
})


const getData = ()=>{

    search_auto_data_vehicles(
        searchData.value
    ).then(res=>{
        console.log(res.data)
        searchData.value.dataCount = res.data.total
        data.value = res.data.items
    })
}

const search = ()=>{
    searchData.value.page = 1
    getData()
}

const deleteData = (product, index)=>{

}

const reset = ()=>{
    searchData.value = {...searchData.value,  
    id:'',
    make:'',
    model:'',
    sub_model:'',
    start_of_production_year:'',
    end_of_production_year:'',
    keyword:'',}
}

const actions = {
    'get':getData,
    'search':search,
    'delete_data':deleteData,
    'reset':reset

    
}


</script>