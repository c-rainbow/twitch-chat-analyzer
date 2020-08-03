import { CommentRepository, UserWithCount, EmoteWithCount } from './repository';
import  { Chart }  from "chart.js";
import { CommentData } from './data_models';
import { getFilter } from './parser/common/FilterParser';
import { KoreanLeafParser } from './parser/ko/KoreanLeafParser';


var originalRepository: CommentRepository;
var repository: CommentRepository;
var topChatterChart : Chart;
var topEmoteChart : Chart;

// Update affected contents in DOM
function updateDom() {
  const userCount = repository.getUserCount(); 
  updateChatterCountElem(userCount);

  const commentCount = repository.getCommentCount();
  updateCommentCountElem(commentCount);

  const topChatters = repository.getTopChatters(20);
  createTopChattersChart(topChatters);

  const topEmotes = repository.getTopEmotes(20);
  createTopEmotesChart(topEmotes);
}

function updateChatterCountElem(chatterCount: number) {
  const chatterCountElem = document.getElementsByClassName("chatter-count-content")?.[0];
  if(chatterCountElem) {
      chatterCountElem.textContent = chatterCount + "명";
  }
}

function updateCommentCountElem(commentCount: number) {
  const commentCountElem = document.getElementsByClassName("comment-count-content")?.[0];
  if(commentCountElem) {
      commentCountElem.textContent = commentCount + "개";
  }
}

function createTopChattersChart(topChatters: UserWithCount[]) {

  const displayStrings = topChatters.map((uc) => uc.user.getDisplayString());
  const counts = topChatters.map((uc) => uc.count);
  const maxCount = counts.reduce((prev, curr) => Math.max(prev, curr));

  var canvasElem = document.getElementById("top-chatter-chart-canvas") as HTMLCanvasElement;
  topChatterChart?.destroy();
  topChatterChart = new Chart(canvasElem, {
      type: 'bar',
      data: {
          labels: displayStrings,
          datasets: [{
              label: "",
              backgroundColor: "#4e73df",
              hoverBackgroundColor: "#2e59d9",
              borderColor: "#4e73df",
              data: counts,
          }],
      },
      options: {
          maintainAspectRatio: false,
          layout: {
              padding: {
                  left: 10,
                  right: 25,
                  top: 25,
                  bottom: 0
              }
          },
          scales: {
              xAxes: [{
                  gridLines: {
                      display: false,
                      drawBorder: false
                  },
                  ticks: {
                      maxTicksLimit: 6,
                      autoSkip: false,
                  },
              }],
              yAxes: [{
                  ticks: {
                      min: 0,
                      max: maxCount,
                      maxTicksLimit: 5,
                      padding: 10,
                      // Include a dollar sign in the ticks
                      callback: function(value, index, values) {
                          return value + "개";
                      }
                  },
                  gridLines: {
                      color: "rgb(234, 236, 244)",
                      zeroLineColor: "rgb(234, 236, 244)",
                      drawBorder: false,
                      borderDash: [2],
                      zeroLineBorderDash: [2]
                  }
              }],
          },
          legend: {
              display: false
          },
          tooltips: {
              titleMarginBottom: 10,
              titleFontColor: '#6e707e',
              titleFontSize: 14,
              backgroundColor: "rgb(255,255,255)",
              bodyFontColor: "#858796",
              borderColor: '#dddfeb',
              borderWidth: 1,
              xPadding: 15,
              yPadding: 15,
              displayColors: false,
              caretPadding: 10,
              callbacks: {
                  label: function(tooltipItem, chart) {
                      // var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                      return tooltipItem.yLabel + "개";
                  }
              }
          },
      }
  });
}


function createTopEmotesChart(topEmotes: EmoteWithCount[]) {
  const names = topEmotes.map((ec) => ec.emote.name);
  const counts = topEmotes.map((ec) => ec.count);
  const maxCount = counts.reduce((prev, curr) => Math.max(prev, curr));

  var canvasElem = document.getElementById("top-emote-chart-canvas") as HTMLCanvasElement;
  topEmoteChart?.destroy();
  topEmoteChart = new Chart(canvasElem, {
      type: 'bar',
      /*plugins: [{
        beforeDraw: chart => {
          const ctx = chart.ctx;
          //chart//
          const scales = chart.options.scales;
          const xAxis = scales.xAxes;//chart.options.scales['x-axis-0'];
          const yAxis = scales.yAxes;//['y-axis-0'];
          console.log("xAxis len: " + xAxis.length);
          console.log("yAxis len: " + yAxis.length);
          for(let value of xAxis) {
            const xCoord = value.getPixelForTick(index);
            const image = new Image();
            image.src = "https://i.stack.imgur.com/2RAv2.png";
            ctx.drawImage(image, xCoord - 12, yAxis.bottom + 10);
          }
          xAxis.ticks.forEach((value, index) =>  {
            const xCoord = xAxis.getPixelForTick(index);
            const image = new Image();
            image.src = "https://i.stack.imgur.com/2RAv2.png";
            ctx.drawImage(image, xCoord - 12, yAxis.bottom + 10);
          });
        }
      }],*/
      data: {
          labels: names,
          datasets: [{
              label: "",
              backgroundColor: "#4e73df",
              hoverBackgroundColor: "#2e59d9",
              borderColor: "#4e73df",
              data: counts,
          }],
      },
      options: {
          maintainAspectRatio: false,
          layout: {
              padding: {
                  left: 10,
                  right: 25,
                  top: 25,
                  bottom: 0
              }
          },
          scales: {
              xAxes: [{
                  gridLines: {
                      display: false,
                      drawBorder: false
                  },
                  ticks: {
                      maxTicksLimit: 6,
                      autoSkip: false,
                  },
              }],
              yAxes: [{
                  ticks: {
                      min: 0,
                      max: maxCount,
                      maxTicksLimit: 5,
                      padding: 10,
                      callback: function(value, index, values) {
                          return value + "개";
                      }
                  },
                  gridLines: {
                      color: "rgb(234, 236, 244)",
                      zeroLineColor: "rgb(234, 236, 244)",
                      drawBorder: false,
                      borderDash: [2],
                      zeroLineBorderDash: [2]
                  }
              }],
          },
          legend: {
              display: false
          },
          tooltips: {
              titleMarginBottom: 10,
              titleFontColor: '#6e707e',
              titleFontSize: 14,
              backgroundColor: "rgb(255,255,255)",
              bodyFontColor: "#858796",
              borderColor: '#dddfeb',
              borderWidth: 1,
              xPadding: 15,
              yPadding: 15,
              displayColors: false,
              caretPadding: 10,
              callbacks: {
                  label: function(tooltipItem, chart) {
                      // var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                      return tooltipItem.yLabel + "개";
                  }
              }
          },
      }
  });
}


(function() {

const inputFileElem = document.getElementById('inputfile') as HTMLInputElement;

document.getElementById('inputfile').addEventListener('change', function() { 
  const fr=new FileReader(); 
  fr.onload = function(){ 
    const content = fr.result.toString();
    const jsonContent = JSON.parse(content);
    originalRepository = CommentRepository.fromCommentsData(jsonContent["comments"] as CommentData[]);
    repository = originalRepository;
    
    updateDom();
  }    
  fr.readAsText(inputFileElem.files[0]); 
}) 


document.getElementById("filter-button").addEventListener("click", function() {
  const filterElem = document.getElementById("filter-text-input") as HTMLInputElement;
  const filterText = (filterElem.value ?? "").trim();
  if(filterText) {
    const leafParser = new KoreanLeafParser();
    const filter = getFilter(filterText, leafParser);
    const filteredComments = originalRepository.filter(filter);
    repository = new CommentRepository(filteredComments);
  }
  else {
    repository = originalRepository;
  }

  updateDom();
});


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