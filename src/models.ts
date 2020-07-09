



export class User {
    user_id: number;
    username: string;
    display_name: string;
    created_time: Date;
    
}

export class Video {

}


export class Comment {
    comment_id: string;
    video_id: string;
    raw: object;
}