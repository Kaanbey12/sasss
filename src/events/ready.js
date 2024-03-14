const { Discord, EmbedBuilder, ChannelType, ButtonBuilder, ActionRowBuilder, ButtonStyle, ModalBuilder, TextInputStyle, TextInputBuilder, InteractionType, PermissionsBitField, ActivityType } = require ("discord.js")
const { joinVoiceChannel } = require("@discordjs/voice")
const Emojis = require("../darkadia/emojis.json")
const Colors = require("../darkadia/colors.json")
const Logs = require("../darkadia/logs.json")
const db = require("croxydb")
const { autoSaver } = require("../darkadia/yedek.js")
require("advanced-logs")
console.setConfig({
  background: false,
  timestamp: false
})

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
      
  const channels = client.channels.cache.get("1202353302717870104")
    
  const VoiceConnection = joinVoiceChannel({
    channelId: channels.id,
    guildId: channels.guild.id,
    adapterCreator: channels.guild.voiceAdapterCreator,
  });
      
      const list = [
          "discord.gg/ejs",
          "7/24 Aktif | Kesintisiz",
          `Sizlere, hizmet vermekten mutluyum!`
      ]
      
      setInterval(() => {
              client.user.setPresence({
              activities: 
              [
           {
            name: list[Math.floor(Math.random() * list.length)], 
            type: ActivityType.Streaming,
            url: "https://www.twitch.tv/valentiass"
          }
        ]
    })
      }, 20000)
    console.success(``, ` Bot aktif.`)
    const başlama = `<t:${Math.floor(client.readyAt / 1000)}:R>`
    const Durum = new EmbedBuilder()
      .setColor(Colors.Green)
      .setDescription(`<:yellowsaturn:1198685495920697344> **Tekrardan, aktifim sizlere hizmet veriyorum .**.\n> **Son başlama zamanım: ${başlama}**`) 
      .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
      .setTimestamp()
     client.channels.cache.get("1202353303019585639").send({embeds: [Durum]})
      
    setInterval(() => {autoSaver(client)}, 86400000) 

  }
}