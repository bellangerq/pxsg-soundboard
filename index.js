require('dotenv').config()

const discord = require('discord.js')
const bot = new discord.Client()
let isReady = true

/*
const sounds = [
  {
    command: 'philippe',
    file: 'philippe.mp3'
  },
  {
    command: 'nanananana',
    file: 'nanananana.mp3'
  },
  ...
]
*/

bot.login(process.env.DISCORD_TOKEN)

bot.on('message', message => {
  if (message.content === '!philippe' && isReady) {
    isReady = false
    const voiceChannel = message.member.voiceChannel
    voiceChannel.join()
    .then(connection => {
      const dispatcher = connection.playFile('./sounds/philippe.mp3')
      dispatcher.on('end', end => {
        voiceChannel.leave()
      })
    })
    isReady = true
  }
})

bot.on('message', message => {
  if (message.content === '!nanananana' && isReady) {
    isReady = false
    const voiceChannel = message.member.voiceChannel
    voiceChannel.join()
    .then(connection => {
      const dispatcher = connection.playFile('./sounds/nanananana.mp3')
      dispatcher.on('end', end => {
        voiceChannel.leave()
      })
    })
    isReady = true
  }
})
