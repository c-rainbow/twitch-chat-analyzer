import TwitchClient, { HelixUser } from 'twitch';
import { ConfigManager } from './config';
import { ChatDownloader } from './downloader/chat';


let twitchClient : TwitchClient;

function getTwitchClient() : TwitchClient {
    if(twitchClient !== null) {
        return twitchClient;
    }

    // User not logged in
    const token = sessionStorage.getItem("twitch_chat_analyzer_access_token");
    if(!token) {
        return null;
    }

    const clientId = ConfigManager.getClientId();
    const client = TwitchClient.withCredentials(clientId, token);
    twitchClient = client;
    return client;
}


async function getStreamerInfo(username: string) : Promise<HelixUser> {
    const token = sessionStorage.getItem("twitch_chat_analyzer_access_token");
    if(!token) {
        return null;
    }

    const clientId = ConfigManager.getClientId();
    const client = TwitchClient.withCredentials(clientId, token);
    const user = await client.helix.users.getUserByName(username);
    
    return user;
}


function addFollowerDownloaderListeners() {
    const streamerNameInputElem = document.getElementById("streamer-username-input") as HTMLInputElement;
    const streamerSearchButtomElem = document.getElementById("streamer-search-button");
    const streamerInfoElem = document.getElementById("streamer-info");
    const downloadButtonElem = document.getElementById("follower-list-download-button");
    
    streamerSearchButtomElem.addEventListener("click", async () => {
        const name = streamerNameInputElem.value;
        const client = getTwitchClient();
        client.helix.users.getUserByName(name).then((helixUser) => {
            if(!helixUser) {
                streamerInfoElem.textContent = `스트리머를 찾을 수 없습니다: ${name}`;
                return;
            }
            streamerInfoElem.textContent = `스트리머: ${helixUser.displayName}`;
            // Show download button
        });
    });

    downloadButtonElem.addEventListener("click", async () => {
        // Display download status
        // download
        // When finished downloading, download the file to local disk
    });
}

function addChatDownloaderListeners() {
    const videoIdInputElem = document.getElementById("video-id-input") as HTMLInputElement;
    const videoSearchButtomElem = document.getElementById("video-search-button");
    const videoInfoElem = document.getElementById("video-info");
    const downloadButtonElem = document.getElementById("video-chat-download-button");

    videoSearchButtomElem.addEventListener("click", async () => {
        const videoId = videoIdInputElem.value;
        const client = getTwitchClient();
        client.helix.videos.getVideoById(videoId).then((video) => {
            // Populate video info elem
            videoInfoElem.textContent = video.title + ", " + video.description;
        });
    });

    const loopHandler = (turn: number, status: number, downloadCount: number) => {
        // Display download status in some <div>
    };

    downloadButtonElem.addEventListener("click", async () => {
        const videoId = videoIdInputElem.value;
        const downloader = new ChatDownloader();
        downloader.addLoopEventListener(loopHandler);
        const chats = await downloader.downloadChat(videoId);
        // Display download status
        // download
        // When finished downloading, download the file to local disk
    });
}

(function() {

addFollowerDownloaderListeners();
addChatDownloaderListeners();



})();



/*
function main() {

  //const input = "random filter name & Follow 1day | subscriber & aaaaa & (Bbbb)";
  //const input = "!(랜덤한 필터 이름) & 팔로우 1일 이하 | 비구독자 & 그냥 이것저것 & (아무거나 이것저것)";
  const input = "!(랜덤한 필터 이름) | 팔로우 1일 이하| (비구독자 |!그냥 이것저것) & 아무거나 이것저것";
  const f = getFilter(input);
  console.log("f: " + f);
  console.log("type f: " + Object.keys(f));
  console.log("toString: " + f.toString());

  return;

  const beforeFile = performance.now();
  const fileContent = fs.readFileSync(filePath, "utf8");
  const fileJson = JSON.parse(fileContent);
  const commentsData = fileJson["comments"] as Array<CommentData>;
  
  const repository = new CommentRepository(commentsData);
  console.log("User count: " + repository.userCount());
  console.log("Chat count: " + repository.commentCount());
  
  const group = new AndExpressionGroup();
  group.addRegex({type: "user", key: "username"}, "c");
  group.addRegex({type: "comment", key: "rawText"}, "heart");
  group.addGreaterThan({type: "comment", key: "relativeTime"}, 200);

  const beforeFilter = performance.now();
  console.log("Repository created in " + (beforeFilter - beforeFile) + " milliseconds");
  const filtered = repository.filter(group);
  //const filter = new RegexExpression({type: "comment", key: "rawText"}, "ㅋㅋㅋ");
  //const filter = new RegexExpression({type: "user", key: "username"}, "r");

  //const filtered = repository.filter(filter);
  
  const afterFilter = performance.now();
  console.log("Filtered complete in " + (afterFilter - beforeFilter) + " milliseconds");

  console.log(filtered.length);
  for(let i = 0; i < 10; i++) {
      console.log(filtered[i].toDisplayString());
  }
  for(let chat of filtered) {
      console.log(chat.toDisplayString());
  }
}


main();

*/