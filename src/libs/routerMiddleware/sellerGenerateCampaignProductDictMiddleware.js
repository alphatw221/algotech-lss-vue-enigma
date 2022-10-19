import { useCampaignDetailStore } from '@/stores/lss-campaign-detail';
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import { seller_list_campaign_product } from '@/api_v2/campaign_product'
export default async (to, from) => {
    const layoutStore = useLSSSellerLayoutStore()
    const campaignDetailStore = useCampaignDetailStore();
    if(parseInt(to.params.campaign_id) != campaignDetailStore.campaign?.id){
        const res = await seller_list_campaign_product(to.params.campaign_id, 'all', layoutStore.alert)
        if (res.status==200) {
            campaignDetailStore.campaignProducts = JSON.parse(JSON.stringify(res.data))
            campaignDetailStore.campaignProductDict = {}
            res.data.forEach(campaignProduct => {
                campaignDetailStore.campaignProductDict[campaignProduct.id.toString()]=campaignProduct
            });
        }
    }

    return true
}