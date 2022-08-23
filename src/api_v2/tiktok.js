// https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.4.1/socket.io.min.js

import { io } from "socket.io-client";

class TikTokIOConnector {
    constructor(backendUrl) {
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

        this.socket.on('disconnect', () => {
            console.warn("Socket disconnected!");
        })

        this.socket.on('streamEnd', () => {
            console.warn("LIVE has ended!");
            this.uniqueId = null;
        })

        this.socket.on('tiktokDisconnected', (errMsg) => {
            console.warn(errMsg);
            if (errMsg && errMsg.includes('LIVE has ended')) {
                this.uniqueId = null;
            }
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
}




const backendUrl = "https://tiktok-chat-reader.zerody.one/"
// let connector = new TikTokIOConnector(backendUrl);


// // New chat comment received
// connector.on('chat', (msg) => {
//     console.log(msg)
// })

// const connect=()=> {
    


    // connector.connect("@asdfasdfasdf", {
    //     enableExtendedGiftInfo: false
    // }).then(state => {
    //     console.log(state)
    // }).catch(errorMessage => {
    //     console.log(errorMessage)
    //     setTimeout(() => {
    //         connect("@asdfasdfasdf");
    //     }, 30000);


    // })

   
// }


export const create_tiktok_connection = (username, onMessageHandler) => {
    let connector = new TikTokIOConnector(backendUrl);

    // New chat comment received
    connector.on('chat', onMessageHandler)

    connector.connect(username, {
        enableExtendedGiftInfo: false
    })
    return connector
}

// export const bulk_create_comment = (campaign_id, data) => {
//     return createAxiosWithBearer().post(`/api/v2/twitch/${campaign_id}/bulk/create/comment/`, data)
// }


// viewer stats
// connection.on('roomUser', (msg) => {
//     if (typeof msg.viewerCount === 'number') {
//         viewerCount = msg.viewerCount;
//         updateRoomStats();
//     }
// })

// like stats
// connection.on('like', (msg) => {
//     if (typeof msg.totalLikeCount === 'number') {
//         likeCount = msg.totalLikeCount;
//         updateRoomStats();
//     }

//     if (window.settings.showLikes === "0") return;

//     if (typeof msg.likeCount === 'number') {
//         addChatItem('#447dd4', msg, msg.label.replace('{0:user}', '').replace('likes', `${msg.likeCount} likes`))
//     }
// })

// Member join
// let joinMsgDelay = 0;
// connection.on('member', (msg) => {
//     if (window.settings.showJoins === "0") return;

//     let addDelay = 250;
//     if (joinMsgDelay > 500) addDelay = 100;
//     if (joinMsgDelay > 1000) addDelay = 0;

//     joinMsgDelay += addDelay;

//     setTimeout(() => {
//         joinMsgDelay -= addDelay;
//         addChatItem('#21b2c2', msg, 'joined', true);
//     }, joinMsgDelay);
// })


// New gift received
// connection.on('gift', (data) => {
//     if (!isPendingStreak(data) && data.diamondCount > 0) {
//         diamondsCount += (data.diamondCount * data.repeatCount);
//         updateRoomStats();
//     }

//     if (window.settings.showGifts === "0") return;

//     addGiftItem(data);
// })

// // share, follow
// connection.on('social', (data) => {
//     if (window.settings.showFollows === "0") return;

//     let color = data.displayType.includes('follow') ? '#ff005e' : '#2fb816';
//     addChatItem(color, data, data.label.replace('{0:user}', ''));
// })

// connection.on('streamEnd', () => {
//     $('#stateText').text('Stream ended.');

//     // schedule next try if obs username set
//     if (window.settings.username) {
//         setTimeout(() => {
//             connect(window.settings.username);
//         }, 30000);
//     }
// })


