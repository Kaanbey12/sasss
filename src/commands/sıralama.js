const { Discord, EmbedBuilder, ChannelType, ButtonBuilder, ActionRowBuilder, ButtonStyle, ModalBuilder, TextInputStyle, TextInputBuilder, InteractionType, PermissionsBitField } = require ("discord.js")
const Emojis = require("../darkadia/emojis.json")
const Colors = require("../darkadia/colors.json")
const db = require("croxydb")

module.exports = {
  slash: true, 
  enable: true, 
  dbl: false, 
  name: ['sıralama'],  
  description: 'DA zenginlerinin sıralamasını gösterir.',
  
async execute(client, interaction) {
  
  await interaction.deferReply()
  
  let sayı = 1
  
  let filtre = client.users.cache.filter(x => (db.fetch(`Bakiye_${x.id}`)) || 0)
    .sort((x,y) => (db.fetch(`Bakiye_${y.id}`)|| 0) - (db.fetch(`Bakiye_${x.id}`)) || 0)
    .map((x) => {
      return `**${sayı++}.** ${x.username} - ${db.fetch(`Bakiye_${x.id}`) || 0} DA`
    })
  
  const Sıralama = new EmbedBuilder()
    .setColor(Colors.Yellow)
    .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
    .setDescription(`> DarkAdia (DA) zenginlerinin sıralaması`)
    .addFields(
      {
        name: `${Emojis.Tag} En zengin 10 kullanıcı`,
        value: `${filtre.slice(0, 10).join("\n") || `Sıralamada hiç kullanıcı bulunmuyor.`}`
      })
    .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
  await interaction.followUp({embeds: [Sıralama]})
  
  }
}