const { Client, Intents } = require('discord.js')

const {
  isNotValidMessage,
  isNotSoundCommand,
  isHelperCommand,
  buildSoundsList
} = require('./helpers.js')
const { helpCommands } = require('./commands.js')

require('dotenv').config()

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES
  ]
})
const token = process.env.DISCORD_TOKEN
client.login(token)

// Init bot
let sounds = []
client.once('ready', async () => {
  sounds = await buildSoundsList()
  console.log('Bot ready!')
})

// Listen for new messages
client.on('messageCreate', (message) => {
  console.log(message.content)

  // Ignore message
  if (!message.channel.isVoice() || isNotValidMessage(message)) return

  const command = message.content.substring(1)

  // Show help embed
  if (isHelperCommand(command)) {
    const embedHelpMessage = {
      title: 'Besoin d’aide ?',
      color: 0x950000,
      description:
        'Voici la liste des commandes disponibles pour utiliser le bot!',
      fields: helpCommands
    }

    return message.channel.send({ embeds: [embedHelpMessage] })
  }

  // Show invalid sound embed
  if (isNotSoundCommand(command, sounds)) {
    const embedInvalidSoundMessage = {
      title: 'Ce son n’existe pas',
      color: 0x950000,
      description:
        'La liste des sons est disponible ici : https://bit.ly/2LFH1b0'
    }

    return message.channel.send({ embeds: [embedInvalidSoundMessage] })
  }

  // Play sound
  console.log('Valid message: play sound!')
})
