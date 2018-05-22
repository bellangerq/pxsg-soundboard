export const isNotValidMessage = (message) => {
  return (message.author.bot || message.content[0] !== '!')
}

export const isNotSoundCommand = (command, sounds) => {
  return !sounds.some(sound => sound.name === command)
}

export const isHelperCommand = (command) => {
  return command == 'aide' || command == 'nouveau' || command == 'sons'
}

export const getCommand = message => {
  return message.content.substr(1)
}

export const getSoundPath = sound => {
  return `./sounds/${sound}.mp3`
}
