import { defineStore } from "pinia";

export const useLSSOptionsStore = defineStore("options", {
  state: () => ({
    "deliveryTime": [
      { "value": "7:00 - 8:00"},
      { "value": "8:00 - 9:00"},
      { "value": "9:00 - 10:00"},
      { "value": "10:00 - 11:00"},
      { "value": "11:00 - 12:00"},
      { "value": "12:00 - 13:00"},
      { "value": "13:00 - 14:00"},
      { "value": "14:00 - 15:00"},
      { "value": "15:00 - 16:00"},
      { "value": "16:00 - 17:00"},
      { "value": "17:00 - 18:00"},
      { "value": "18:00 - 19:00"},
      { "value": "19:00 - 20:00"},
      { "value": "20:00 - 21:00"}
    ]
  }),
});
