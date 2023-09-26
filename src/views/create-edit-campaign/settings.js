export const generalSettings = [

    

    {type:'slot', slot_name:'social_platform_connection_form'},


    {key:'title', name:'Title', type:'input' ,inputType:'text', class:'w-full', unit:'', placeholder:'Title'},

    // {key:'description', name:'Description', type:'textarea',},

    {type:'inline', inline_items:[    
        {key:'start_at', name:'Start At', type:'datetime', class:'w-ful'},
        {key:'end_at', name:'End At', type:'datetime', class:'ml-5 w-ful'},
    ]},

    {key:'currency', name:'Currency', type:'select', placeholder:'選擇電子發票服務', multiple:false, value_key:'value', name_key:'value', options:[
        {value:'TWD', name:'台幣'},
        {value:'SGD', name:'新加坡幣'},
        {value:'MYR', name:'馬來西亞令吉'},
        {value:'USD', name:'美金'},
        {value:'AUD', name:'澳幣'},
        {value:'JPY', name:'日圓'},
        {value:'EUR', name:'歐元'},
        {value:'RMB', name:'人民幣'},
        {value:'KRW', name:'韓元'},
        {value:'PHP', name:'菲律賓披索'},
        {value:'VND', name:'越南盾'},
        {value:'THB', name:'泰銖'},
        {value:'IDR', name:'台幣'},
    ]},

    {key:'currency_symbol', name:'Currency Symbol', type:'select', placeholder:'選擇電子發票服務', multiple:false, value_key:'name', name_key:'name', options:[
        {name:'$'},
        {name:'NT$'},
        {name:'€'},
        {name:'£'},
        {name:'¥'},
        {name:'₩'},
        {name:'RM'},
        {name:'₱'},
        {name:'₫'},
        {name:'฿'},
        {name:'Rp'},
        {name:'S$'},
    ]},
]

export const logisticSettings = []
export const paymentSettings = []
export const pointSettings = [
    {key:'allow_guest_checkout', name:'Enable', type:'toggle'},

    {key:'point_validity', name:'Point Validity', type:'select', placeholder:'選擇電子發票服務', multiple:false, value_key:'value', name_key:'name', options:[
                {value:0, name:'Unlimited'},
                {value:1, name:'1 Month'},
                {value:2, name:'2 Month'},
                {value:3, name:'3 Month'},
                {value:4, name:'4 Month'},
                {value:5, name:'5 Month'},
                {value:6, name:'6 Month'},
                {value:7, name:'7 Month'},
                {value:8, name:'8 Month'},
                {value:9, name:'9 Month'},
                {value:10, name:'10 Month'},
                {value:11, name:'11 Month'},
                {value:12, name:'12 Month'},
            ]},

 
    {type:'slot', slot_name:'reward_table'},
    {type:'slot', slot_name:'redemption_rate'},


    {key:'point_description', name:'Point Descriptions', type:'textarea',},

]
export const replySettings = [
    {key:'add', name:'Successfully Add Product', type:'accordion_textarea',placeholder:'', class:''},
    {key:'update', name:'Customer Change Quantity', type:'accordion_textarea',placeholder:'', class:'mt-5'},
    {key:'delete', name:'Product Delete From Shopping Cart', type:'accordion_textarea',placeholder:'', class:'mt-5'},
    {key:'oos', name:'Out Of Stock', type:'accordion_textarea', placeholder:'', class:'mt-5'},


]
export const noteSettings = [
    {key:'delivery_note', name:'Delivery Note', type:'accordion_textarea',placeholder:'', class:''},
    {key:'special_note', name:'Special Note', type:'accordion_textarea',placeholder:'', class:'mt-5'},
    {key:'confirmation_note', name:'Confirmation Note', type:'accordion_textarea',placeholder:'', class:'mt-5'},
]



export function getDefaultData(user){
    const defaultData = {
        title:'',
        description:'',
        start_at:'',
        end_at:'',
        currency:'USD',
        currency_symbol:'$',
        // logistic_settings:{},
        // payment_settings:{},
        // note_settings:{},
        // reply_settings:{},
        // point_settings:{},

        social_platform_connections:[],
        payment_services:user?.payment_services||[],
        logistic_services:user?.logistic_services||[],
        point_settings:user?.point_settings||{},
        reply_settings:user?.reply_settings||{},
        note_settings:user?.note_settings||{}
    }
    return defaultData
}


export function data2FormData (data){

    var formData = new FormData();

        
    
    return formData
}
