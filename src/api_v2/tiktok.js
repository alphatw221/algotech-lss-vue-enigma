import { io } from "socket.io-client";
import { createAxiosWithoutInterceptor } from '@/libs/axiosClient';

const backendUrl = "https://tiktok-chat-reader.zerody.one/"
class TikTokIOConnector {
    constructor(messageHandler, errorHandler) {
        this.socket = io(backendUrl);
        this.uniqueId = null;
        this.options = null;

        this.socket.on('connect', () => {
            console.info("Socket connected!");

            // Reconnect to streamer if uniqueId already set
            if (this.uniqueId) {
                this.setUniqueId();
            }
        })
        
        this.socket.on('chat', messageHandler)


        this.socket.on('disconnect', () => {
            console.warn("Socket disconnected!");
            console.log('disconnect')
            errorHandler()
        })

        this.socket.on('streamEnd', () => {
            console.warn("LIVE has ended!");
            this.uniqueId = null;
            console.log('streamEnd')
            errorHandler()
        })

        this.socket.on('tiktokDisconnected', (errMsg) => {
            console.warn(errMsg);
            if (errMsg && errMsg.includes('LIVE has ended')) {
                this.uniqueId = null;
            }
            console.log('tiktokDisconnected')
            errorHandler()
        });


    }

    connect(uniqueId, options) {
        this.uniqueId = uniqueId;
        this.options = options || {};

        this.setUniqueId();

        return new Promise((resolve, reject) => {
            this.socket.once('tiktokConnected', resolve);
            this.socket.once('tiktokDisconnected', reject);

            setTimeout(() => {
                reject('Connection Timeout');
            }, 15000)
        })
    }

    setUniqueId() {
        this.socket.emit('setUniqueId', this.uniqueId, this.options);
    }

    on(eventName, eventHandler) {
        this.socket.on(eventName, eventHandler);
    }

    disconnect(){
        this.socket.close()
    }
}




// const backendUrl = "https://tiktok-chat-reader.zerody.one/"



export const create_tiktok_connector = (username, messageHandler, errorHandler) => {
    let connector = new TikTokIOConnector(messageHandler, errorHandler);

    // New chat comment received
    // connector.on('chat', onMessageHandler)

    connector.connect(username, {
        enableExtendedGiftInfo: false
    }).catch(err=>{
        errorHandler()
    })
    return connector
}



export const upload_tiktok_comments = (campaign_id, data) => {
    return createAxiosWithoutInterceptor().post(`/api/v2/tiktok/comment/process/${campaign_id}/`, data)
}