import { FragmentData } from "./data_models";




export class User {
    _id: number;
    username: string;
    display_name: string;
    created_time: number;  // epoch time milliseconds
    type: string;
}

export class Video {

}


export class Comment {
    _id: string;
    video_id: string;
    channel_id: number;
    relative_time_millis: number;  // Relative time in milliseconds from video start
    text: string;
    fragments: Array<FragmentData>
    

    

    // Below fields are from User class, copied for ease of filter and search.
    user_id: number;
    user_username: string;
    user_display_name: string;
    user_created_time: number;
    user_type: string;
}