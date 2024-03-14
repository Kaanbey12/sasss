const { Discord, EmbedBuilder, ChannelType, ButtonBuilder, ActionRowBuilder, ButtonStyle, ModalBuilder, TextInputStyle, TextInputBuilder, InteractionType, PermissionsBitField } = require ("discord.js")
const Emojis = require("../darkadia/emojis.json")
const Colors = require("../darkadia/colors.json")
const db = require("croxydb")
module.exports = {
    slash: true, 
  enable: true, 
  dbl: false, 
  name: ['ban'],  
  description: 'Darkadia Uptime bakım sistemi.',
  options: [
    { 
      name: "user",
      description: "Yasaklanıcak Kullanıcıyı Seçin.", 
      type: 6,
      required: true,
      options: [
        { 
          name: "reason",
          description: "Hangi Sebepten dolayı yasaklanıcak?", 
          type: 3,
          required: true
        },
      ],
       }
  ],
async execute(client, interaction) {

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return interaction.reply({content: "Üyeleri Yasakla Yetkin Yok!", ephemeral: true})
    const user = interaction.options.getMember('user')
    const sebep = interaction.options.getString('reason')
    if(user.permissions.has(PermissionsBitField.Flags.BanMembers)) return interaction.reply({content:"Bu Kullanıcının Ban Yetkisi Olduğu İçin Onu Yasaklayamadım.   ",ephemeral:true})
    user.ban({reason: sebep});
    interaction.reply({content: "Başarıyla Üyeyi Yasakladım!"})
}

};