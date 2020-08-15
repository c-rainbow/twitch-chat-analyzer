import { ConfigManager } from "../config";

/*
{
  "_id": "44322889",
  "bio": "Just a gamer playing games and chatting. :)",
  "created_at": "2013-06-03T19:12:02.580593Z",
  "display_name": "dallas",
  "logo": "https://static-cdn.jtvnw.net/jtv_user_pictures/dallas-profile_image-1a2c906ee2c35f12-300x300.png",
  "name": "dallas",
  "type": "staff",
  "updated_at": "2016-12-13T16:31:55.958584Z"
}
*/
export interface UserData {
    _id: string;
    name: string;
    display_name: string;
    bio: string;
    created_at: string;
    logo: string;
}

interface ResponseData {
    _total: number;
    users: UserData[];
}


export interface FetchResponse {
    status: number;
    jsonContent?: UserData;
    text?: string;
}


export async function getUserByName(username: string) : Promise<FetchResponse> {
    const url = `https://api.twitch.tv/v5/users?login=${username}`;
    const headers = ConfigManager.getDefaultKrakenHeaders();
    const response = await fetch(url, {headers: headers});
    if(!response.ok) {
        return {status: response.status, jsonContent: null};
    }
    const content = await response.text();
    if(content) {
        try {
            const jsonResponse = JSON.parse(content) as ResponseData;
            const jsonContent = jsonResponse.users?.[0];
            return {status: response.status, jsonContent};
        }
        catch(err) {
            console.error(`Error when parsing JSON response: ${content}`);
        }
    }
    return {status: response.status, text: content};
}
