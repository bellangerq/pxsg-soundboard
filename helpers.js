export const isNotValidMessage = (message) => {
  return (message.author.bot || message.content[0] !== '!')
}

export const isNotSoundCommand = (command, sounds) => {
  return !sounds.includes(command)
}

export const isHelperCommand = (command) => {
  return ['aide', 'nouveau', 'sons'].includes(command)
}

export const getCommand = message => {
  return message.content.substr(1)
}

export const getSoundPath = sound => {
  return `./sounds/${sound}.mp3`
}
