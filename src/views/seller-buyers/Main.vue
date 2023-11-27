<template>
    <CrudDataListLSS
        v-model="searchData"
        :title="title"
        :searchBarSettings="searchBarSettings"
        :dataListSettings="dataListSettings"
        :data="data"
        :actions="actions"
        :emptyDataMessage="emptyDataMessage"
        :customColumns="customColumns"
    >
    </CrudDataListLSS>
</template>

<script setup>
import {ref, onMounted, watch, computed} from "vue"
import CrudDataListLSS from "../crud-data-list-lss/Main.vue"
// import CrudWidgeKingPork from "../crud-form-king-pork/CrudWidgeKingPork.vue";

import { useRoute, useRouter } from "vue-router";
import {search_customers} from '../../api_v3/customer.js'
// import { search_product, delete_product, bulk_update_product } from "../../api/product.js"
// import { useGlobalStore } from "../../stores/global"
// import { search_product_category } from "../../api/product_category"

// const globalStore = useGlobalStore()
// import {get_campaigns} from '../../api_v3/campaign.js'

// import SocialPlatformColumn from './custom-column-cells/SocialPlatformColumn.vue'
// import TitleColumn from './custom-column-cells/TitleColumn.vue'
// import ManageOrderColumn from './custom-column-cells/ManageOrderColumn.vue'
// import StopCheckoutColumn from './custom-column-cells/StopCheckoutColumn.vue'
// import ActionsColumn from './custom-column-cells/ActionsColumn.vue'

const customColumns = {
    // 'social_platform_connections':SocialPlatformColumn,
    // 'title':TitleColumn,
    // 'manage_order':ManageOrderColumn,
    // 'stop_checkout':StopCheckoutColumn,
    // 'campaign_more_actions':ActionsColumn
}   


const route = useRoute()
const router = useRouter()

const title = 'Customers'
const emptyDataMessage = ref('Do not Have any Customers.')





// const searchProductCategory = (searchText, routeParam)=>{
//     var _store_id, _keyword, _order_by, _page, _page_size
//     return search_product_category(_store_id=routeParam, _keyword=searchText, _order_by=null, _page=1, _page_size=20)
// }





const searchData = ref({
    page:1,
    page_size:25,
    dataCount:0,
    keyword:'',
    order_by:'-id'

})
const type  = ref('ongoing')

const searchBarSettings=[
    // {key:'category_id', name:'類別', type:'search_select', class:'w-[150px]', placeholder:'搜尋名稱', display_key:'category_name', search_function:searchProductCategory, option_name_keys:['name'], option_value_key:'id', router_param_key:'store_id', options:[{id:null, name:'無'}]},
    // {key:'category_id', name:'類別', type:'select', value_key:'id', name_key:'name', options:((globalStore?.user_data?.stores||[]).find(store=>store.id.toString()==route.params.store_id)?.product_categories||[])},
    // {key:'visibility', name:'狀態', type:'select',value_key:'value', name_key:'name', options:[{value:'visable',name:'公開'},{value:'invisable',name:'未公開'},{value:'schedule',name:'限時公開'}]},
    {key:'keyword', name:'Keyword:', type:'input', placeholder:'Order ID/Customer Name', action:'search', class:'w-[200px]'},

    // {type:'slot', slot_name:'bulk_edit'},

    // {key:'create_campaign', name:'Create', type:'button', action:'route_to_create_campaign_page' ,class:"ml-auto"},
    // {key:'other', type:'dropdown', actions:[

    // ]},
]
const dataListSettings=[
    // {type:'checkbox', name:''},

    // {key:'social_platform_connections', type:'custom', custom_key:'platform', name:'Platform', headerClass:'text-center', class:'text-center'},
    
    // {key:'title', type:'custom', name:'Title'},

    {key:'id', name:'ID', type:'text', dataType:'string'},
    {key:'created_at', type:'datetime', name:'Created At' , sortable:true},
    // {key:'end_at', type:'datetime', name:'End Date', sortable:true},

    // {key:'manage_order', type:'custom', name:'Manage Order', headerClass:'text-center'},
    // {key:'stop_checkout', type:'custom', name:'Stop Checkout', headerClass:'text-center', tippy:'Disable shopping cart immediately'},


    // {key:'images', name:'圖片', type:'images', dataType:'array'},
    // {key:'name', name:'名稱', type:'text', dataType:'string'},
    // {key:'short_name', name:'簡稱', type:'text', dataType:'string', headerClass:'text-center', class:'text-center'},
    // {key:'price', name:'價格', type:'text', dataType:'string', headerClass:'text-center', class:'text-center'},
    // {key:'bundle', name:'個數', type:'text', dataType:'string', headerClass:'text-center', class:'text-center'},
    // // {key:'tags', name:'標籤', type:'text', dataType:'array', headerClass:'text-center'},
    // {key:'category_name', name:'類別', type:'text', dataType:'string', headerClass:'text-center', class:'text-center'},
    // {key:'tags', name:'標籤', type:'list', dataType:'string'},
    // {key:'priority', name:'優先', type:'text', dataType:'integer', headerClass:'text-center', class:'text-center'},
    // {key:'visibility', name:'狀態', type:'map_text',  headerClass:'text-center', class:'text-center', classes:{visable:'text-success',invisable:'text-danger'}, map:{'visable':'公開','invisable':'未公開','schedule':'排程公開'}},


    // {key:'campaign_more_actions', type:'custom', name:'Actions'},


    // {key: null, name:'', type:'actions', headerClass:'text-center', actions:[
    //     {key:'product_detail', name:'編輯商品', class:'', action:'route_to_product_detail_page'},
    //     {key:'delete_product', name:'刪除商品', class:'text-danger', action:'delete_product'}
    // ]}

]
const data = ref([])


// const bulkEditSettings = [
//     {key:'category', name:'類別', type:'search_select', class:'w-[150px]', placeholder:'搜尋名稱', display_key:'category_name', search_function:searchProductCategory, option_name_keys:['name'], option_value_key:'id', router_param_key:'store_id', options:[{id:null, name:'無動作'},{id:'null', name:'無'}]},

//     {key:'visibility', name:'公開商品', type:'select', class:'w-ful', placeholder:'選擇是否公開商品', multiple:false, value_key:'value', name_key:'name', options:[{value:null, name:'無動作'},{value:'visable', name:'公開'},{value:'invisable', name:'不公開'},{value:'schedule', name:'排程公開'}]},
//     {type:'inline', inline_items:[
//         {key:'visable_start_date', name:'商品公開起始日', type:'date', class:'w-ful'},
//         {key:'visable_end_date', name:'商品公開結束日', type:'date', class:'ml-5 w-ful'},
//     ]},
// ]

// const bulkEditBodalShow = ref(false)
// const bulkEditData = ref({
//     category:null,
//     visibility:null
// })

// const bulkUpdate=()=>{
//     const ids=[]
//     data.value.forEach(element => {
//         if(element.check==true) ids.push(element.id)
//     });
//     var _store_id, _ids, _data
//     bulk_update_product(_store_id=route.params.store_id, _ids=ids.join(','), _data=bulkEditData.value).then(res=>{
//         getData()
//         bulkEditBodalShow.value = false
//     })
// }


onMounted(()=>{
    getData()
})



const getData = ()=>{

    search_customers(
      searchData.value
    ).then(res=>{
        console.log(res.data)
        searchData.value.dataCount = res.data.count
        data.value = res.data.results
    })
}

const search = ()=>{
    searchData.value.page = 1
    getData()
}

// const selectAll = (event)=>{
//     data.value.forEach(d => {
//         d.check = event.target.checked
//     });
// }

// const routeToCreatePage = ()=>{
//     router.push({name:'create-campaign',params:route.params})
// }

// const routeToEditPage = (data, index)=>{
//     router.push({name:'edit-campaign',params:{...route.params, 'campaign_uuid':data.uuid}})
// }

// const deleteData = (product, index)=>{
//     // delete_product(route.params.store_id, product.id).then(res=>{
//     //     data.value.splice(index,1)
//     // })
// }

const actions = {
    'get':getData,
    'search':search,
    // 'route_to_create_page':routeToCreatePage, 
    // 'route_to_detail_page':routeToEditPage, 
    // 'delete_data':deleteData,
    // 'select_all':selectAll
    
}


</script>