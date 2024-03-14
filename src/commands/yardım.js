const { Discord, EmbedBuilder, ChannelType, ButtonBuilder, ActionRowBuilder, ButtonStyle, ModalBuilder, TextInputStyle, TextInputBuilder, InteractionType, PermissionsBitField } = require ("discord.js")
const Emojis = require("../darkadia/emojis.json")
const Colors = require("../darkadia/colors.json")
const db = require("croxydb")

module.exports = {
  slash: true, 
  enable: true, 
  dbl: false, 
  name: ['yardım'],  
  description: 'DarkAdia yardım menüsünü gösterir.',
  
async execute(client, interaction) {
  
  await interaction.deferReply()
  
  const Duyurular = db.fetch(`Duyurular`)
  let Duyuru
  if(!Duyurular) {
    Duyuru = `${Emojis.Kırmızı} \`Aktif bir duyuru bulunmuyor.\``
  } else {
    Duyuru = `${db.fetch(`Duyurular`).map(D => `> ${Emojis.Sağ} \`${D}\``).join("\n") || `${Emojis.Kırmızı} \`Aktif bir duyuru bulunmuyor.\``}`
  }
  const Yardım = new EmbedBuilder()
    .setColor(Colors.Yellow)
    .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
    .addFields(
      {
        name: `${Emojis.Duyuru} Bot duyuruları`,
        value: `${Duyuru}`
      },
      {
        name: `${Emojis.Bot} Bot komutları`,
        value: `
> ** </yardım:0>  **
\`\`\DarkadiaUptime yardım menüsünü gösterir. \`\`\

> **</istatistik:0> **
\`\`\Botun istatistiklerini gösterir. \`\`\

> **</ping:0>**  
\`\`\Botun gecikme sürelerini gösterir. \`\`\

> ** </davet:0> **
\`\`\Botun bağlantılarını gösterir. \`\`\

> **</link ekle:0> ** 
\`\`\Sisteme link eklersiniz. \`\`\

> **</link sil:0>  **
\`\`\Sistemdeki linkinizi silersiniz. \`\`\

> **</link düzenle:0> **
\`\`\Sistemdeki linkinizi değiştirirsiniz. \`\`\

> **</link liste:0> **
\`\`\ Sisteme eklemiş olduğunuz linkleri gösterir. \`\`\

> **</link say:0> **
\`\`\Sistemdeki linklerin sayısını gösterir. \`\`\

> /** premium kontrol **
\`\`\Premium üyeliğinizi kontrol edersiniz. \`\`\

> **/promosyon kullan: **
 \`\`\Promosyon kodu kullanırsınız. \`\`\

`})
    .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
    .setImage(`https://media.discordapp.net/attachments/1201268374584430735/1202391075893805056/standard.gif?ex=65cd48f3&is=65bad3f3&hm=eed09e3c570edc7672f5c05c2d3e5ac6fdc362452cc5e35460fc2daf36b64174&=&width=526&height=67`)
  await interaction.followUp({embeds: [Yardım]})
  
  }
}
  