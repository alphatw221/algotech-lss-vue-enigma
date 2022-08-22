import { createAxiosWithBearer } from '@/libs/axiosClient';
import tmi from 'tmi.js';


export const init_twitch_websocket = (username, password, channel, onMessageHandler, onConnectedHandler) => {
    const opts = {
        identity: {
            username: username,
            password: password
        },
        channels: [ channel ]
    };

    const client = new tmi.client(opts);

    // Register our event handlers (defined below)
    client.on('message', onMessageHandler);
    client.on('connected', onConnectedHandler);

    client.connect();
}

export const bulk_create_comment = (campaign_id, data) => {
    return createAxiosWithBearer().post(`/api/v2/twitch/${campaign_id}/bulk/create/comment/`, data)
}
