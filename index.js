#!/usr/bin/env node

const Speaker = require('speaker')
const { Select } = require('enquirer')
const AudioContext = require('web-audio-engine').StreamAudioContext
const context = new AudioContext()

const osc = context.createOscillator()
const amp = context.createGain()

let selectKey = 0

const toneInformation = [
  { name: 'C4', frequency: 261.626 }, { name: 'C♯4', frequency: 277.183 },
  { name: 'D4', frequency: 293.665 }, { name: 'D♯4', frequency: 311.127 },
  { name: 'E4', frequency: 329.628 }, { name: 'F4', frequency: 349.228 },
  { name: 'F♯4', frequency: 369.994 }, { name: 'G4', frequency: 391.995 },
  { name: 'G♯4', frequency: 415.305 }, { name: 'A4', frequency: 440 },
  { name: 'A♯4', frequency: 466.164 }, { name: 'B4', frequency: 493.883 },
  { name: 'C5', frequency: 523.251 }, { name: 'C♯5', frequency: 554.365 },
  { name: 'D5', frequency: 587.33 }, { name: 'D♯5', frequency: 622.254 },
  { name: 'E5', frequency: 659.255 }, { name: 'F5', frequency: 698.456 },
  { name: 'F♯5', frequency: 739.989 }, { name: 'G5', frequency: 783.991 },
  { name: 'G♯5', frequency: 830.609 }, { name: 'A5', frequency: 880 },
  { name: 'A♯5', frequency: 932.328 }, { name: 'B5', frequency: 987.767 }]

const keyList = toneInformation.map(item => item.name)

function questionKey () {
  const prompt = new Select({
    message: 'キーを選択してください',
    choices: ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B']
  })
  return prompt
}

function changeKey (selectKey) {
  const changedKeyMajorScale = [keyList[selectKey], keyList[selectKey + 2], keyList[selectKey + 4],
    keyList[selectKey + 5], keyList[selectKey + 7], keyList[selectKey + 9], keyList[selectKey + 11]
  ]
  return changedKeyMajorScale
}

async function choiceKey () {
  try {
    const answer = await questionKey().run()
    switch (answer) {
      case 'C♯':
        selectKey = 1
        break
      case 'D':
        selectKey = 2
        break
      case 'D♯':
        selectKey = 3
        break
      case 'E':
        selectKey = 4
        break
      case 'F':
        selectKey = 5
        break
      case 'F♯':
        selectKey = 6
        break
      case 'G':
        selectKey = 7
        break
      case 'G♯':
        selectKey = 8
        break
      case 'A':
        selectKey = 9
        break
      case 'A♯':
        selectKey = 10
        break
      case 'B':
        selectKey = 11
        break
      default:
        break
    }
    changeKey(selectKey)
  } catch (e) {
    console.error(e)
  }
}

function questionScale () {
  const prompt = new Select({
    message: 'スケールを選択してください',
    choices: ['メジャースケール', 'マイナースケール', 'ハーモニックマイナースケール', 'メロディックマイナースケール', 'ドリアンスケール', 'フリジアンスケール', 'リディアンスケール', 'ミクソリディアンスケール', 'ロクロリアンスケール']
  })
  return prompt
}

async function choiceScale () {
  try {
    await choiceKey()
    const answer = await questionScale().run()
    const changedKeyScale = changeKey(selectKey)
    switch (answer) {
      case 'メジャースケール':
        break
      case 'マイナースケール':
        changedKeyScale[2] = keyList[selectKey + 3]
        changedKeyScale[5] = keyList[selectKey + 8]
        changedKeyScale[6] = keyList[selectKey + 10]
        break
      case 'ハーモニックマイナースケール':
        changedKeyScale[2] = keyList[selectKey + 3]
        changedKeyScale[5] = keyList[selectKey + 8]
        break
      case 'メロディックマイナースケール':
        changedKeyScale[2] = keyList[selectKey + 3]
        break
      case 'ドリアンスケール':
        changedKeyScale[2] = keyList[selectKey + 3]
        changedKeyScale[6] = keyList[selectKey + 10]
        break
      case 'フリジアンスケール':
        changedKeyScale[1] = keyList[selectKey + 1]
        changedKeyScale[2] = keyList[selectKey + 3]
        changedKeyScale[5] = keyList[selectKey + 8]
        changedKeyScale[6] = keyList[selectKey + 10]
        break
      case 'リディアンスケール':
        changedKeyScale[3] = keyList[selectKey + 6]
        break
      case 'ミクソリディアンスケール':
        changedKeyScale[6] = keyList[selectKey + 10]
        break
      case 'ロクロリアンスケール':
        changedKeyScale[1] = keyList[selectKey + 1]
        changedKeyScale[2] = keyList[selectKey + 3]
        changedKeyScale[4] = keyList[selectKey + 6]
        changedKeyScale[5] = keyList[selectKey + 8]
        changedKeyScale[6] = keyList[selectKey + 10]
        break
      default:
        break
    }
    return changedKeyScale
  } catch (e) {
    console.error(e)
  }
}
choiceScale()

async function soundPlay () {
  const changedKeyScale = await choiceScale()
  const scaleGetRidOfInterval = []
  changedKeyScale.forEach(e => scaleGetRidOfInterval.push(e.slice(0, -1)))
  console.log(scaleGetRidOfInterval.join(','))
  osc.type = 'square'
  for (let i = 0; i < changedKeyScale.length; i++) {
    osc.frequency.setValueAtTime(toneInformation.find((item) => item.name === changedKeyScale[i]).frequency, i * 0.5)
  }
  osc.start(0)
  osc.stop(4)
  osc.connect(amp)
  osc.onended = () => {
    context.close().then(() => {
      process.exit(0)
    })
  }

  amp.gain.setValueAtTime(0.01, 0)
  amp.connect(context.destination)

  context.pipe(new Speaker())
  context.resume()
}
soundPlay()
