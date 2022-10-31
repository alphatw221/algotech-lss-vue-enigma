import { useCampaignDetailStore } from '@/stores/lss-campaign-detail';
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import { retrieve_campaign } from '@/api_v2/campaign'
export default async (to, from) => {
    const layoutStore = useLSSSellerLayoutStore()
    const campaignDetailStore = useCampaignDetailStore();
    if(parseInt(to.params.campaign_id) != campaignDetailStore.campaign?.id){
        const res = await retrieve_campaign(to.params.campaign_id, layoutStore.alert)
        if (res.status==200) {
            campaignDetailStore.campaign = res.data
        }
    }

    return true
}