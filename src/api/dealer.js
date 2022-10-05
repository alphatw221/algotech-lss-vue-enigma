import { createAxios } from "@/libs/axiosClient";

export const dealer_dashboard = (toastify=null) => {
    return createAxios(toastify).get('/api/dashboard/dealer_cards/');
};

export const dealer_retrieve_subscriber = (toastify=null) => {
    return createAxios(toastify).get('/api/user-subscription/dealer_retrieve/');
};

export const dealer_search_list_subscriber = (toastify=null) => {
    return createAxios(toastify).get('/api/user-subscription/dealer_search_list/');
};
