import { createAxiosWithBearer } from "@/libs/axiosClient";

export const dealer_dashboard = () => {
    return createAxiosWithBearer().get('/api/dashboard/dealer_cards/');
};

export const dealer_retrieve_subscriber = () => {
    return createAxiosWithBearer().get('/api/user-subscription/dealer_retrieve/');
};

export const dealer_search_list_subscriber = () => {
    return createAxiosWithBearer().get('/api/user-subscription/dealer_search_list/');
};