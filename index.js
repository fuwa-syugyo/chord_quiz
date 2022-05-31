#!/usr/bin/env node

const { Select } = require('enquirer')
const player = require('node-wav-player')
const path = require('path').join
const filePath = path(__dirname, './sounds/')

let selectKey = 0

const keyList =
  ['C4', 'C♯4', 'D4', 'D♯4', 'E4', 'F4', 'F♯4', 'G4',
    'G♯4', 'A4', 'A♯4', 'B4', 'C5', 'C♯5', 'D5', 'D♯5',
    'E5', 'F5', 'F♯5', 'G5', 'G♯5', 'A5', 'A♯5', 'B5'
  ]

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
  const wavList = []

  for (let i = 0; i < changedKeyScale.length; i++) {
    wavList.push(filePath + changedKeyScale[i] + '.wav')
    console.log(filePath + changedKeyScale[i] + '.wav')
    await player.play({
      path: wavList[i],
      sync: true
    }).then(() => {
    }).catch((error) => {
      console.error(error)
    })
  }
}
soundPlay()
