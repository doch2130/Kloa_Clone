type itemGradeStyleBackgroundType = {
  [key:string]: { background: string }
}

type itemGradeStyleColorType = {
  [key:string]: { color: string }
}

export const itemGradeStyleBackground:itemGradeStyleBackgroundType = {
  '에스더': {
    background: `linear-gradient(135deg, #0c2e2c, #2faba8)`
  },
  '고대': {
    background: `linear-gradient(135deg, #3d3325, #dcc999)`
  },
  '유물': {
    background: `linear-gradient(135deg, #341a09, #a24006)`
  },
  '전설': {
    background: `linear-gradient(135deg, #362003, #9e5f04)`
  },
  '영웅': {
    background: `linear-gradient(135deg, #261331, #480d5d)`
  },
  '희귀': {
    background: `linear-gradient(135deg, #111f2c, #113d5d)`
  },
  '일반': {
    background: `linear-gradient(135deg, #323232, #6d6d6d)`
  }
}

export const itemGradeStyleColor:itemGradeStyleColorType = {
  '에스더': {
    color: '#1AB9B6'
  },
  '고대': {
    color: '#D9AB48'
  },
  '유물': {
    color: '#FA5D00'
  },
  '전설': {
    color: '#F9AE00'
  },
  '영웅': {
    color: '#8045DD'
  },
  '희귀': {
    color: '#2AB1F6'
  },
  '일반': {
    color: '#d7d7d7'
  }
}