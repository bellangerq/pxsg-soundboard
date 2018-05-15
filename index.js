require('dotenv').config()
const discord = require('discord.js')
const path = require('path')
const fs = require('fs')

const bot = new discord.Client()
const soundsPath = path.join(__dirname, 'sounds')
const soundsList = []

// Fill soundsList depending on whats inside /sounds
fs.readdir(soundsPath, (err, files) => {
  if (err) return console.log(`Unable to scan directory: ${err}`)

  files.forEach(file => {
    const fileName = file.split('.')[0]
    soundsList.push({
      name: fileName,
      value: '- - -'
    })
  })
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
    name: '!nouveau',
    value: 'Indique les indications pour soumettre un nouveau son.'
  },
  {
    name: '!aide',
    value: 'Affiche la liste des commandes disponibles.'
  }
]

bot.on('message', message => {
  const typedCommand = message.content.substr(1)

  if (!isValidCommand(typedCommand)) {
    console.log(`'!${typedCommand}' command doesnt exist.`)
    return
  }

  /*
  ** Handle `!sons` command
  */

  if (typedCommand === 'sons') {
    message.channel.send({embed: {
      color: 0x950000,
      title: 'Sons disponibles',
      description: "Voici la liste des sons disponibles. Pour les jouer, il suffit de tapper `!nomduson`.",
      fields: soundsList
    }})
    return
  }

  /*
  ** Handle `!nouveau` command
  */

  if (typedCommand === 'nouveau') {
    message.channel.send({embed: {
      color: 0x950000,
      title: 'Soumettre un nouveau son',
      description: "Pour ajouter un son, envoyer le fichier `.mp3` avec le nom de la commande à entrer pour le jouer (exemple : `pxsg.mp3` qui sera jouer avec `!pxsg`)."
    }})
    return
  }

  /*
  ** Handle `!aide` command
  */

  if (typedCommand === 'aide') {
    message.channel.send({embed: {
      color: 0x950000,
      title: "Besoin d'aide ?",
      description: "Voici la liste des commandes disponibles pour utiliser le bot!",
      fields: commandsList
    }})
    return
  }

  /*
  ** Play `!nomduson` command
  */

  const voiceChannel = message.member.voiceChannel
  voiceChannel.join()
  .then(connection => {
    const dispatcher = connection.playFile(getSoundPath(typedCommand))
    dispatcher.on('end', end => {
      voiceChannel.leave()
    })
  }).catch(console.error)
})

// Check if command is valid
const isValidCommand = command => {
  return soundsList.some(sound => sound.name === command)
  || command == 'aide'
  || command == 'sons'
  || command == 'nouveau'
}

// Return the sound path
const getSoundPath = sound => {
  return `./sounds/${sound}.mp3`
}

bot.login(process.env.DISCORD_TOKEN)
