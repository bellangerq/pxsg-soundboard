require('dotenv').config()

const discord = require('discord.js')
const bot = new discord.Client()
const sounds = [
  {
    name: 'philippe',
    file: 'philippe'
  },
  {
    name: 'nanananana',
    file: 'nanananana'
  }
]

bot.login(process.env.DISCORD_TOKEN)

bot.on('message', message => {

  // If sound doesnt exist, quit
  if (!isSound(message.content)) {
    console.log(`'${message.content}' command doesnt exist.`)
    return
  }

  // If sound exists, play it
  const voiceChannel = message.member.voiceChannel
  voiceChannel.join()
  .then(connection => {
    const dispatcher = connection.playFile(getSoundPath(message.content))
    dispatcher.on('end', end => {
      voiceChannel.leave()
    })
  })
})

// Check if the sound exists
const isSound = name => {
  return sounds.some(sound => `!${sound.name}` === name)
}

// Return the sound mp3 path
const getSoundPath = sound => {
  return `./sounds/${sound.substr(1)}.mp3`
}
