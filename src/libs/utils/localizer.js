import i18n from "@/locales/i18n";

export function localize_price(price, currency, decimal_places, price_unit){
    return (currency)+(Math.floor(parseFloat(price) * (10 ** decimal_places)) / 10 ** decimal_places).toLocaleString('en-GB')+(price_unit?i18n.global.t(`global.price_unit.${price_unit}`):'')
}

