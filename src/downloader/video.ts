import { ConfigManager } from "../config";

/*
{
  "_id": "v106400740",
  "broadcast_id": 1,
  "broadcast_type": "upload",
  "channel": {
     "_id": "44322889",
     "name": "dallas",
     "display_name": "dallas"
  },
  "created_at": "2016-12-10T00:46:44Z",
  "description": "Protect your chat with AutoMod! ",
  "description_html": "Protect your chat with AutoMod!<br>",
  "fps": {
    "1080p": 23.9767661758746,
    "144p": 23.9767661758746,
    "240p": 23.9767661758746,
    "360p": 23.9767661758746,
    "480p": 23.9767661758746,
    "720p": 23.9767661758746
  },
  "game": "",
  "language": "en",
  "length": 29,
  "muted_segments": [
    {
      "duration": 180,
      "offset": 0
    },
    {
      "duration": 360,
      "offset": 2340
    },
    {
      "duration": 360,
      "offset": 5220
    },
    {
      "duration": 360,
      "offset": 7020
    }
  ],
  "preview": {
    "large": "https://static-cdn.jtvnw.net/s3_vods/twitch/106400740/f2979575-fa80-4ad9-9665-a074d510a03a/thumb/index-0000000000-640x360.jpg",
    "medium": "https://static-cdn.jtvnw.net/s3_vods/twitch/106400740/f2979575-fa80-4ad9-9665-a074d510a03a/thumb/index-0000000000-320x180.jpg",
    "small": "https://static-cdn.jtvnw.net/s3_vods/twitch/106400740/f2979575-fa80-4ad9-9665-a074d510a03a/thumb/index-0000000000-80x45.jpg",
    "template": "https://static-cdn.jtvnw.net/s3_vods/twitch/106400740/f2979575-fa80-4ad9-9665-a074d510a03a/thumb/index-0000000000-{width}x{height}.jpg"
  },
  "published_at": "2016-12-12T18:19:18Z",
  "resolutions": {
    "1080p": "1920x1080",
    "144p": "256x144",
    "240p": "426x240",
    "360p": "640x360",
    "480p": "852x480",
    "720p": "1280x720"
  },
  "status": "recorded",
  "tag_list": "",
  "thumbnails": {
    "large": [{
      "type": "generated",
      "url": "https://static-cdn.jtvnw.net/s3_vods/twitch/106400740/f2979575-fa80-4ad9-9665-a074d510a03a/thumb/index-0000000000-640x360.jpg"
    }],
    "medium": [{
      "type": "generated",
      "url": "https://static-cdn.jtvnw.net/s3_vods/twitch/106400740/f2979575-fa80-4ad9-9665-a074d510a03a/thumb/index-0000000000-320x180.jpg"
    }],
    "small": [{
      "type": "generated",
      "url": "https://static-cdn.jtvnw.net/s3_vods/twitch/106400740/f2979575-fa80-4ad9-9665-a074d510a03a/thumb/index-0000000000-80x45.jpg"
    }],
    "template": [{
      "type": "generated",
      "url": "https://static-cdn.jtvnw.net/s3_vods/twitch/106400740/f2979575-fa80-4ad9-9665-a074d510a03a/thumb/index-0000000000-{width}x{height}.jpg"
    }]
  },
  "title": "Introducing AutoMod",
  "url": "https://www.twitch.tv/twitch/v/106400740",
  "viewable": "public",
  "viewable_at": null,
  "views": 7638
}

*/
interface SegmentData {
    duration: number;
    offset: number;
}

interface ChannelData {
    _id: number;
    name: string;
    display_name: string;
}

interface PreviewData {
    small: string;
    medium: string;
    large: string;
}

export interface VideoData {
    _id: string;
    title: string;
    language: string;
    created_at: string;
    game: string;
    length: number;
    muted_segments: SegmentData[];
    channel: ChannelData;
    preview: PreviewData;
}


export interface FetchResponse {
    status: number;
    jsonContent?: VideoData;
    text?: string;
}


export async function getVideo(videoId: string) : Promise<FetchResponse> {
    const url = `https://api.twitch.tv/v5/videos/${videoId}`;
    const headers = ConfigManager.getDefaultKrakenHeaders();
    const response = await fetch(url, {headers: headers});
    if(!response.ok) {
        return {status: response.status, jsonContent: null};
    }
    let content = null;
    content = await response.text();
    if(content) {
        try {
            const jsonContent = JSON.parse(content) as VideoData;
            return {status: response.status, jsonContent};
        }
        catch(err) {
            console.error(`Error when parsing JSON response: ${content}`);
        }
    }
    return {status: response.status, text: content};
}
