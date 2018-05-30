// Imports & requires
import {
  isNotValidMessage,
  isNotSoundCommand,
  getCommand,
  isHelperCommand,
  getSoundPath
} from './helpers.js'

require('dotenv').config()
const discord = require('discord.js')
const fs = require('fs')
const path = require('path')

// Create sounds based on what's inside /sounds
const soundsPath = path.join(__dirname, 'sounds')
const sounds = []

// Scan directory to build sounds list
fs.readdir(soundsPath, (err, files) => {
  if (err) return console.log(`Unable to scan directory: ${err}`)

  files.forEach(file => {
    const fileName = file.split('.')[0]
    sounds.push(fileName)
  })
})

const helpCommands = [
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

const commands = [
  {
    name: 'sons',
    color: 0x950000,
    title: 'Sons disponibles',
    description: "La liste des sons est disponible ici : https://bit.ly/2LFH1b0"
  },
  {
    name: 'aide',
    color: 0x950000,
    title: "Besoin d'aide ?",
    description: "Voici la liste des commandes disponibles pour utiliser le bot!",
    fields: helpCommands
  },
  {
    name: 'nouveau',
    color: 0x950000,
    title: 'Soumettre un nouveau son',
    description: "Pour ajouter un son, envoyer le fichier `.mp3` avec le nom de la commande à entrer pour le jouer (exemple : `pxsg.mp3` qui sera jouer avec `!pxsg`)."
  },
  {
    name: 'erreur',
    color: 0x950000,
    title: `Commande inexistante`,
    description: "Entrer `!aide` pour afficher la liste des commandes disponibles."
  }
]

// Send bot text message
const sendMessage = (message, commandsList) => {
  const command = commandsList.find(command => {
    return command.name == getCommand(message)
  })
  message.channel.send({embed: {
    color: command.color,
    title: command.title,
    description: command.description,
    fields: command.fields || []
  }})
}

// Play sound file
const playSound = (message, command) => {
  const voiceChannel = message.member.voiceChannel
  return voiceChannel.join()
  .then(connection => {
    const dispatcher = connection.playFile(getSoundPath(command))
    dispatcher.on('end', end => {
      voiceChannel.leave()
    })
  }).catch(console.error)
}

const bot = new discord.Client()

bot.on('message', message => {
  // Do nothing
  if (isNotValidMessage(message)) return

  // Show bot message
  const command = getCommand(message)

  if (isHelperCommand(command)) {
    sendMessage(message, commands)
    return
  }

  // Show error message
  if (isNotSoundCommand(command, sounds)) {
    message.channel.send({embed: {
      color: 0x950000,
      title: `La commande '!${command}' n'existe pas`,
      description: "Entrer `!aide` pour afficher la liste des commandes disponibles."
    }})
    return
  }

  // Play sound
  playSound(message, command)
})

bot.login(process.env.DISCORD_TOKEN)
