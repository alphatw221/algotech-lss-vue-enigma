import { defineStore } from "pinia";
import { ref } from "vue"
export const useLSSPaymentMetaStore = defineStore("paymentMeta", {
  state: () => ({
    directPayment:{
      multiple:true,
      tab: "Direct Payment",
      request_url: "api/user-subscription/direct_payment/",
      fields:[
        {key:"mode", name:"Mode", type:"text", r:0, c:0, w:4},
        {key:"name", name:"Account Name", type:"text", r:0, c:1, w:4},
        {key:"number", name:"Account Number", type:"text", r:0, c:2, w:4},
        {key:"note", name:"Note", type:"textarea", r:1, c:0, w:6},
        {key:"require_customer_return", name:"Require Customer Return", type:"checkbox", r:1, c:1, w:6},
        {key:"image", name:null, type:"file", r:2, c:0, w:11}
      ],
      handle:{
        type:'upload',
        url:"api/v2/payment/receipt/upload/",
        fields:[
          {key:"order_id", type:"hidden", r:0, c:1, w:4},
          {key:"receipt_image", name:"Receipt Image", type:"image", r:0, c:0, w:4},
          {key:"last_five_digits", name:"Account Number", type:"text", r:0, c:2, w:4},
        ]
      }
    },
    stripe:{
      multiple:false,
      tab:"Stripe",
      request_url: "api/user-subscription/stripe/",
      fields:[
        {key:"secret", type:"password", name: "Secret Key", r:0, c:0, w:6},
        {key:"currency", type:"select", name: "Currency", r:0, c:1, w:6, options:[
          'USD', 'AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM', 'BBD',
          'BDT', 'BGN', 'BIF', 'BMD', 'BND', 'BOB', 'BRL', 'BSD', 'BWP', 'BYN', 'BZD', 'CAD', 'CDF',
          'CHF', 'CLP', 'CNY', 'COP', 'CRC', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD', 'EGP', 'ETB',
          'EUR', 'FJD', 'FKP', 'GBP', 'GEL', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK',
          'HTG', 'HUF', 'IDR', 'ILS', 'INR', 'ISK', 'JMD', 'JPY', 'KES', 'KGS', 'KHR', 'KMF', 'KRW',
          'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'MAD', 'MDL', 'MGA', 'MKD', 'MMK', 'MNT',
          'MOP', 'MRO', 'MUR', 'MVR', 'MWK', 'MXN', 'MYR', 'MZN', 'NAD', 'NGN', 'NIO', 'NOK', 'NPR',
          'NZD', 'PAB', 'PEN', 'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF',
          'SAR', 'SBD', 'SCR', 'SEK', 'SGD', 'SHP', 'SLL', 'SOS', 'SRD', 'STD', 'SZL', 'THB', 'TJS',
          'TOP', 'TRY', 'TTD', 'TWD', 'TZS', 'UAH', 'UGX', 'UYU', 'UZS', 'VND', 'VUV', 'WST', 'XAF',
          'XCD', 'XOF', 'XPF', 'YER', 'ZAR', 'ZMW']
        },
      ],
      handle:{
        type:'gateway',
        url:"api/v2/payment/stripe/gateway/",
        fields:[
          {key:"order_id", type:"hidden", r:0, c:1, w:4},
        ]
      }
      
  },
    

    SG : ['direct_payment', 'stripe'],
    
    ID : ['direct_payment', 'stripe'],

    MY : ['direct_payment', 'stripe'],
    
    IN : ['direct_payment', 'stripe'],
    
    PH : ['direct_payment', 'stripe'],

    VN : ['direct_payment', 'stripe'],

    TW : ['direct_payment', 'stripe'],

    CN : ['direct_payment', 'stripe'],

    KH : ['direct_payment', 'stripe'],

    AU : ['direct_payment', 'stripe'],

    HK : ['direct_payment', 'stripe'],
    
  }),
});
