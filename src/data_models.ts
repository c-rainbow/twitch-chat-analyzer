


/*
JSON representation of a comment, from Twitch API
{
    "_id": "262b64a5-1db5-46b1-8761-b0acbfc5c864",
    "channel_id": "403883450",
    "commenter": {
        "_id": "403883450",
        "bio": null,
        "created_at": "2018-12-23T20:36:26.679939Z",
        "display_name": "c_rainbow",
        "logo": "https://static-cdn.jtvnw.net/jtv_user_pictures/4c9a889a-06d9-4f29-9abc-fa569406e8d5-profile_image-300x300.png",
        "name": "c_rainbow",
        "type": "user",
        "updated_at": "2020-07-07T17:18:17.714018Z"
    },
    "content_id": "673529771",
    "content_offset_seconds": 15157.106,
    "content_type": "video",
    "created_at": "2020-07-08T17:43:41.806Z",
    "message": {
        "body": "Thanks for watching everyone. Hope you enjoy the day",
        "fragments": [
            {
                "text": "Thanks for watching everyone. Hope you enjoy the day"
            }
        ],
        "is_action": false,
        "user_badges": [
            {
                "_id": "broadcaster",
                "version": "1"
            },
            {
                "_id": "subscriber",
                "version": "0"
            },
            {
                "_id": "sub-gifter",
                "version": "1"
            }
        ],
        "user_notice_params": {}
    },
    "source": "chat",
    "state": "published",
    "updated_at": "2020-07-08T17:43:41.806Z"
},
*/
export interface CommentData {
    _id: string;
    channel_id: string;
    commenter: CommenterData;
    content_id: string;
    content_offset_seconds: number; // floating point number in seconds
    content_type: string;
    created_at: string;  // Date representation
    message: MessageData;
    source: string;
    state: string;
    updated_at: string;
}

/*
JSON representation of a chat message
{
    
    "body": "\uc9dd\uc9dd\uc9dd\uc9dd\uc9dd FBCatch FBCatch FBCatch FBCatch",
    "emoticons": [
        {
            "_id": "1441281",
            "begin": 6,
            "end": 12
        },
        {
            "_id": "1441281",
            "begin": 14,
            "end": 20
        },
        {
            "_id": "1441281",
            "begin": 22,
            "end": 28
        },
        {
            "_id": "1441281",
            "begin": 30,
            "end": 36
        }
    ],
    "fragments": [
        {
            "text": "\uc9dd\uc9dd\uc9dd\uc9dd\uc9dd "
        },
        {
            "emoticon": {
                "emoticon_id": "1441281",
                "emoticon_set_id": ""
            },
            "text": "FBCatch"
        },
        {
            "text": " "
        },
        {
            "emoticon": {
                "emoticon_id": "1441281",
                "emoticon_set_id": ""
            },
            "text": "FBCatch"
        },
        {
            "text": " "
        },
        {
            "emoticon": {
                "emoticon_id": "1441281",
                "emoticon_set_id": ""
            },
            "text": "FBCatch"
        },
        {
            "text": " "
        },
        {
            "emoticon": {
                "emoticon_id": "1441281",
                "emoticon_set_id": ""
            },
            "text": "FBCatch"
        }
    ],
    "is_action": false,
    "user_badges": [
        {
            "_id": "broadcaster",
            "version": "1"
        },
        {
            "_id": "subscriber",
            "version": "0"
        },
        {
            "_id": "sub-gifter",
            "version": "1"
        }
    ],
    "user_color": "#FF0000",
    "user_notice_params": {
        "msg-id": "resub",
        "msg-param-cumulative-months": "6",
        "msg-param-months": "0",
        "msg-param-should-share-streak": "0",
        "msg-param-sub-plan": "1000",
        "msg-param-sub-plan-name": "Channel Subscription (gongparipa)"
    }
}
*/
export interface MessageData {
    bits_spent?: number;
    body: string;
    emoticons?: Array<EmoteRangeData>;
    fragments: Array<FragmentData>;
    is_action: boolean;
    user_badges?: Array<UserBadgeData>;
    user_color?: string;
    // This field is ikely populated in case of subscription notice, etc
    user_notice_params: object;  
}

/*
JSON representation of emote info in chat
{
    "_id": "1441281",
    "begin": 6,
    "end": 12
},
*/
export interface EmoteRangeData {
    _id: string;
    begin: number;  // beginning index in chat, inclusive
    end: number;  // end index in chat, inclusive
}


/*
JSON representation of fragment data. "emoticon" is optional
{
    "emoticon": {
        "emoticon_id": "1441281",
        "emoticon_set_id": ""
    },
    "text": "FBCatch"
}

*/
export interface FragmentData {
    emoticon?: {emoticon_id: string, emoticon_set_id: string};
    text: string;
}

/*
JSON representation of a commenter
{
    "_id": "403883450",
    "bio": null,
    "created_at": "2018-12-23T20:36:26.679939Z",
    "display_name": "c_rainbow",
    "logo": "https://static-cdn.jtvnw.net/jtv_user_pictures/4c9a889a-06d9-4f29-9abc-fa569406e8d5-profile_image-300x300.png",
    "name": "c_rainbow",
    "type": "user",
    "updated_at": "2020-07-07T17:18:17.714018Z"
},
*/
export interface CommenterData {
    _id: string;
    bio: string;
    created_at: string;
    display_name: string;
    logo: string;
    name: string;
    type: string;
    updated_at: string;
}

/*
JSON representation of user badge
{
    "_id": "broadcaster",
    "version": "1"
},
*/
export interface UserBadgeData {
    _id: string;
    version: string;
}

/*
"user_notice_params": {
    "msg-id": "resub",
    "msg-param-cumulative-months": "6",
    "msg-param-months": "0",
    "msg-param-should-share-streak": "0",
    "msg-param-sub-plan": "1000",
    "msg-param-sub-plan-name": "Channel Subscription (gongparipa)"
}
*/
export interface UserNoticeParamData {
    // 'communitypayforward', 'extendsub', 'giftpaidupgrade', 'primepaidupgrade',
    // 'resub', 'rewardgift', 'standardpayforward', 'sub', 'subgift', 'submysterygift'
    // submysterygift creates N subgift messages
    "msg-id"?: string; 
    "msg-param-cumulative-months"?: string;
}