#!/usr/bin/env node
// //const Tone = require('tone')

const Speaker = require('speaker')
const { Select } = require('enquirer')
const Enquirer = require('enquirer')
const AudioContext = require('web-audio-engine').StreamAudioContext
const context = new AudioContext()

const osc = context.createOscillator()
const amp = context.createGain()

let selectKey = 0

const keyList = ['C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4',
  'C5', 'C#5', 'D5', 'D#5', 'E5', 'F5', 'F#5', 'G5', 'G#5', 'A5', 'A#5', 'B5'
]

function questionKey () {
  const prompt = new Select( {
    message: 'キーを選択してください',
    choices: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
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
      case 'C#':
        selectKey = 1
        break
      case 'D':
        selectKey = 2
        break
      case 'D#':
        selectKey = 3
        break
      case 'E':
        selectKey = 4
        break
      case 'F':
        selectKey = 5
        break
      case 'F#':
        selectKey = 6
        break
      case 'G':
        selectKey = 7
        break
      case 'G#':
        selectKey = 8
        break
      case 'A':
        selectKey = 9
        break
      case 'A#':
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
    const scaleGetRidOfInterval = []
    changedKeyScale.forEach(e => scaleGetRidOfInterval.push(e.slice(0, -1)))
    console.log(scaleGetRidOfInterval.join(','))
    console.log(changedKeyScale)
  } catch (e) {
    console.error(e)
  }
}
choiceScale()

const toneList2 = [{'C4': 261.626}, {'C#4': 277.183}, {'D4': 293.665}, {'D#4': 311.127},
  {'E4': 329.628}, {'F4': 349.228}, {'F#4': 369.994}, {'G4': 391.995}, {'G#4': 415.305},
  {'A4': 440}, {'A#4': 466.164}, {'B4': 493.883}, {'C5': 523.251}, {'C#5': 554.365},
  {'D5': 587.33}, {'D#5': 622.254}, {'E5': 659.255}, {'F5': 698.456}, {'F#5': 739.989},
  {'G5': 783.991}, {'G#5': 830.609}, {'A5': 880}, {'A#5': 932.328}, {'B5': 987.767
}]

// switch(prompt) {
//   case 0:
//     let scale =
//     [keyList[selectKey + 0], keyList[selectKey + 2], keyList[selectKey + 4],
//      keyList[selectKey + 5], keyList[selectKey + 7], keyList[selectKey + 9], keyList[selectKey + 11]
//     ]
//     scaleName = 'majorScale'
//     break
// }


// console.log(scaleName)
// console.log(Object.keys(toneList2[selectKey]))
// console.log(Object.values(toneList2[selectKey]))

// osc.type = 'square'
// osc.frequency.setValueAtTime(Object.values(toneList2[selectKey]), 0)


// osc.start(0)
// osc.stop(2)
// osc.connect(amp)
// osc.onended = () => {
//   context.close().then(() => {
//     process.exit(0)
//   })
// }

// amp.gain.setValueAtTime(0.25, 0)
// amp.gain.linearRampToValueAtTime(0, 2)
// amp.connect(context.destination)

// context.pipe(new Speaker())
// context.resume()


// const toneList = {'C4': 261.626, 'C#4': 277.183, 'D4': 293.665, 'D#4': 311.127,
//   'E4': 329.628, 'F4': 349.228, 'F#4': 369.994, 'G4': 391.995, 'G#4': 415.305,
//   'A4': 440, 'A#4': 466.164, 'B4': 493.883, 'C5': 523.251, 'C#5': 554.365,
//   'D5': 587.33, 'D#5': 622.254, 'E5': 659.255, 'F5': 698.456, 'F#5': 739.989,
//   'G5': 783.991, 'G#5': 830.609, 'A5': 880, 'A#5': 932.328, 'B5': 987.767
// }
