require('dotenv').config()

const discord = require('discord.js')
const bot = new discord.Client()
const sounds = [
  {
    name: 'philippe',
  },
  {
    name: 'nanananana',
  },
  {
    name: 'tagueule'
  }
]
const formatedSounds = sounds.map(sound => {
  return {
    name: `> ${sound.name}`,
    value: `- - -`
  }
})

const commandsList = [
  {
    name: '!nomduson',
    value: 'Joue le son sélectionné. Par exemple : `!philippe`.'
  },
  {
    name: '!sons',
    value: 'Affiche la liste des sons jouables par le bot.'
  },
  {
    name: '!aide',
    value: 'Affiche la liste des commandes disponibles.'
  }
]

bot.on('message', message => {

  /*
  ** !LIST COMMAND
  */

  if (message.content === '!sons') {
    message.channel.send({embed: {
      color: 0x950000,
      title: 'Sons disponibles',
      description: "Voici la liste des sons disponibles. Pour les jouer, il suffit de tapper `!nomduson`.",
      fields: formatedSounds
    }})
  }

  if (message.content === '!aide') {
    message.channel.send({embed: {
      color: 0x950000,
      title: "Besoin d'aide ?",
      description: "Voici la liste des commandes disponibles pour utiliser le bot!",
      fields: commandsList
    }})
  }

  /*
  ** !SOUNDNAME COMMAND
  */

  if (!isSound(message.content)) {
    console.log(`'${message.content}' command doesnt exist.`)
    return
  }

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

bot.login(process.env.DISCORD_TOKEN)
