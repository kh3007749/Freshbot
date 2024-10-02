module.exports.config = {
  name: "videov2-720p",
  version: "9.7.5",
  hasPermssion: 0,
  credits: "John Lester",
  description: "Play video from youtube",
  commandCategory: "utility",
  usages: "[title]",
  cooldowns: 10,
  dependencies: {

  }
};

module.exports.run = async({api, event}) => {
  const axios = require("axios");
    const fs = require("fs-extra");
    const Innertube = require("youtubei.js");
    const request = require("request");
    let input = event.body;

    var text = input; 
  text = text.substring(11)
let data = input.split("");

if (data.length < 2) {               return api.sendMessage("Please put a name", event.threadID);
}


data.shift()


  const youtube = await new Innertube();

  const search = await youtube.search(text);
if (search.videos[0] === undefined){
api.sendMessage("Error: Invalid request.",event.threadID,event.messageID)
api.setMessageReaction("❎", event.messageID, (err) => {}, true)
}else{
api.sendMessage(`Searching for${text}\nNote: this command doesn't work for the big file video due to messenger limit instead you need to change resolution to work`,  event.threadID,event.messageID);
api.setMessageReaction("✅", event.messageID, (err) => {}, true)
var timeleft = 3;
var downloadTimer = setInterval(function(){
  if(timeleft <= 0){
    clearInterval(downloadTimer);

    }
  timeleft -= 1;
}, 1000);
  const stream = youtube.download(search.videos[0].id, {
    format: 'mp4',
    type: 'videoandaudio',
    audioBitrate: '320',
    loudnessDB: '20',
    quality: '720p'
  });

stream.pipe(fs.createWriteStream(__dirname + `/data/${search.videos[0].title}.mp4`))


  stream.on('start', () => {
    console.info('[DOWNLOADER]', 'Starting download now!');
  }); 
  stream.on('info', (info) => {
    console.info('[DOWNLOADER]',`Downloading ${info.video_details.title} by ${info.video_details.metadata.channel_name}`);
    console.log(info)
  });


  stream.on('end', () => {
  // process.stdout.clearLine();
  // process.stdout.cursorTo(0);
    console.info(`[DOWNLOADER] Downloaded`)


    var message = {
          body:(search.videos[0].title),
         attachment:[ 
fs.createReadStream(__dirname + `/data/${search.videos[0].title}.mp4`)]}
           api.sendMessage(message, event.threadID,event.messageID);
  }); 
stream.on('error', (err)=> console.error('[ERROR]',err))

         stream.on('end', async () => {  

           if (fs.existsSync(__dirname + `/data/${search.videos[0].title}.mp4`)) {
                                    fs.unlink(__dirname + `/data/${search.videos[0].title}.mp4`, function (err) {
                                  if (err) console.log(err);                                        
                                  console.log(__dirname + `/data/${search.videos[0].title}.mp4 is deleted!`);
                                                        });
                                                     }
             })
}
      } 