module.exports.config = {
  name: "bol",
  version: "1.1.1",
  hasPermssion: 2,
  credits: "𝐏𝐫𝐢𝐧𝐜𝐞 𝐃𝐢𝐥𝐬𝐡𝐚𝐝",
  description: "Bot Saying",
  commandCategory: "ai",
  usages: "[text/message/chat]",
  cooldowns: 5
};

module.exports.run = async ({ api, event,args }) => {
var say = args.join(" ")
  if (!say) api.sendMessage("Please enter a message", event.threadID, event.messageID)
  else api.sendMessage(`${say}`, event.threadID, event.messageID);
}
