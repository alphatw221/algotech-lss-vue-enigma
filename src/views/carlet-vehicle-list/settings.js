export const formSettings = [

    {key:'make_id', name:'車廠', type:'select', class:'w-[200px] intro-y',placeholder:'廠牌', multiple:false, value_key:'value', name_key:'name', options:[
        {value:1, name:'Aston Martin'},   
        {value:2, name:'Audi'},
        {value:3, name:'Bentley'},   
        {value:4, name:'BMW'},
        {value:5, name:'Bugatti'},   
        {value:6, name:'Citroen'},
        {value:7, name:'Daihatsu'},   
        {value:8, name:'Ferrari'},
        {value:9, name:'Ford'},   
        {value:10, name:'Honda'},
        {value:11, name:'Hyndai'},   
        {value:12, name:'Infiniti'},
        {value:13, name:'Jaguar'},   
        {value:14, name:'Kia'},
        {value:15, name:'Lamborghini'},   
        {value:16, name:'Land Rover'},
        {value:17, name:'Lexus'},   
        {value:18, name:'Lotus'},
        {value:19, name:'Luxgen'},   
        {value:20, name:'Maserati'},
        {value:21, name:'Mazda'},   
        {value:22, name:'McLaren'},
        {value:23, name:'Mercedes-Benz'},   
        {value:24, name:'MG'},
        {value:25, name:'Mini'},   
        {value:26, name:'Mitsubishi'},
        {value:27, name:'Nissan'},   
        {value:28, name:'Opel'},
        {value:29, name:'Peugeot'},   
        {value:30, name:'Porsche'},
        {value:31, name:'Rolls Royce'},   
        {value:32, name:'Saab'},
        {value:33, name:'Saangyong'},
        {value:34, name:'Skoda'},
        {value:35, name:'Smart'},
        {value:36, name:'Subaru'},
        {value:37, name:'Suzuki'},
        {value:38, name:'Tesla'},
        {value:39, name:'Toyota'},
        {value:40, name:'Volkswagen'},
        {value:41, name:'Volvo'},
        {value:42, name:'Alfa Romeo'},
        {value:44, name:'Buick'},
        {value:45, name:'Cadillac'},
        {value:46, name:'Chrysler'},
        {value:47, name:'Fiat'},
        {value:48, name:'Hyundai'},
        {value:49, name:'Jeep'},
        {value:78, name:'Renault'},
        {value:79, name:'SSangyong'},
    ]},
    {key:'year', name:'年份', type:'input' ,inputType:'number', class:'w-[200px] intro-y', unit:'', placeholder:'年份'},
    {key:'name', name:'車型', type:'input' ,inputType:'text', class:'w-[200px]', unit:'', placeholder:'車款'},
    {key:'name_variant', name:'子車型', type:'input' ,inputType:'text', class:'w-[400px]', unit:'', placeholder:'車型'},
    {key:'trim_level', name:'trim level', type:'input' ,inputType:'text', class:'w-[200px]', unit:'', placeholder:'子車型'},

    {key:'displacement', name:'排氣量', type:'input' ,inputType:'number', class:'w-[200px] ', unit:'cc', placeholder:'排氣量'},

    {key:'fuel', name:'燃料', type:'select', class:'w-[200px] intro-y',placeholder:'廠牌', multiple:false, value_key:'value', name_key:'value', options:[
        {value:'柴油', name:'柴油'},   
        {value:'汽油', name:'汽油'},
        {value:'純電', name:'純電'},   
    ]},

    {key:'transmission', name:'變速箱', type:'select', class:'w-[200px] intro-y',placeholder:'廠牌', multiple:false, value_key:'value', name_key:'value', options:[
        {value:'手排', name:'手排'},   
        {value:'自排', name:'自排'},  
    ]},
    
    {key:'size', name:'大小', type:'select', class:'w-[200px] intro-y',placeholder:'大小', multiple:false, value_key:'value', name_key:'value', options:[
        {value:'轎車-小', name:'轎車-小'},   
        {value:'轎車-中', name:'轎車-中'},  
        {value:'SUV-小', name:'SUV-小'},  
        {value:'SUV-中', name:'SUV-中'},  
        {value:'SUV-大', name:'SUV-大'},  
        {value:'旅行車-小', name:'旅行車-小'},  
        {value:'旅行車-大', name:'旅行車-大'},  
        {value:'特殊車', name:'特殊車'},  
    ]},


    {key:'engine', name:'引擎', type:'input' ,inputType:'text', class:'w-[200px]', unit:'', placeholder:'引擎'},
    {key:'chassis', name:'底盤', type:'input' ,inputType:'text', class:'w-[200px]', unit:'', placeholder:'底盤'},
    {key:'hp', name:'馬力', type:'input' ,inputType:'text', class:'w-[200px]', unit:'', placeholder:'馬力'},

    {key:'supported', name:'支援', type:'select', class:'w-[200px] intro-y',placeholder:'支援', multiple:false, value_key:'value', name_key:'name', options:[
        {value:0, name:'不支援'},   
        {value:1, name:'支援'},   
    ]},

    {key:'is_show', name:'顯示', type:'select', class:'w-[200px] intro-y',placeholder:'顯示', multiple:false, value_key:'value', name_key:'name', options:[
        {value:0, name:'不顯示'},   
        {value:1, name:'顯示'},   
    ]},

]

export const defaultVehicleData = {

    make_id: 1,
    chassis:"",
    displacement: 0,
    engine: "",
    fuel: "汽油",
    hp: "",
    name: "",
    name_variant: "",
    size: "轎車-小",
    transmission: "自排",
    trim_level: "",

    auto_data_id: null,
    tire_rack_id: null,
    yahoo_id: null,

    supported: 0,
    is_show: 1,
}