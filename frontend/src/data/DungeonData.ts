type dungeonGoldListType = {
  [key:string]: number;
}

export const dungeonGoldList:dungeonGoldListType = {
  '아르고스': 1000,
  '발탄 노말': 1200,
  '비아키스 노말': 1600,
  '발탄 하드': 1800,
  '비아키스 하드': 2400,
  '쿠크세이튼 노말': 3000,
  '아브렐슈드 노말 1~2': 3000,
  '아브렐슈드 노말 3': 1500,
  '아브렐슈드 노말 1~3': 4500,
  '아브렐슈드 노말 4': 2500,
  '아브렐슈드 하드 1~2': 4000,
  '아브렐슈드 하드 3': 2000,
  '아브렐슈드 하드 1~3': 6000,
  '아브렐슈드 하드 4': 3000,
  '카양겔 노말': 4500,
  '카양겔 하드': 6500,
  '일리아칸 노말': 7500,
  '일리아칸 하드': 10000,
  '혼돈의 상아탑 노말': 9000,
  '카멘 노말 1~3': 13000,
  '혼돈의 상아탑 하드': 14500,
  '에키드나 노말 1~2': 14500,
  '에키드나 하드 1~2': 18500,
  '카멘 하드 1~3': 20000,
  '카멘 하드 4': 21000,
}

export const dungeonLevelList = (itemLevel:number) => {
  let result = [];

  if(itemLevel >= 1630) {
    result.push('카멘 하드 1~3');
    result.push('카멘 하드 4');
    result.push('에키드나 하드 1~2');
  }
  if(itemLevel >= 1620) {
    result.push('혼돈의 상아탑 하드');
    result.push('에키드나 노말 1~2');
  }
  if(itemLevel >= 1610 && !result.includes('카멘 하드 1~3')) {
    result.push('카멘 노말 1~3');
  }
  if(itemLevel >= 1600 && !result.includes('혼돈의 상아탑 하드')) {
    result.push('혼돈의 상아탑 노말');
  }
  if(itemLevel >= 1600) {
    result.push('일리아칸 하드');
  }
  if(itemLevel >= 1580 && !result.includes('일리아칸 하드')) {
    result.push('일리아칸 노말');
  }
  if(itemLevel >= 1580) {
    result.push('카양겔 하드');
  }
  if(itemLevel >= 1560) {
    result.push('아브렐슈드 하드 4');
  }
  if(itemLevel >= 1550) {
    result.push('아브렐슈드 하드 1~3');
    result.push('아브렐슈드 하드 3');
  }
  if(itemLevel >= 1540) {
    result.push('아브렐슈드 하드 1~2');
  }

  if(result.includes('아브렐슈드 하드 1~2') && result.includes('아브렐슈드 하드 3')) {
    result = result.filter((el) => el !== '아브렐슈드 하드 1~2' && el !== '아브렐슈드 하드 3');
  } else {
    result = result.filter((el) => el !== '아브렐슈드 하드 1~3');
  }

  if(itemLevel >= 1540 && !result.includes('카양겔 하드')) {
    result.push('카양겔 노말');
  }

  if(itemLevel >= 1520 && !result.includes('아브렐슈드 하드 4')) {
    result.push('아브렐슈드 노말 4');
  }
  if(itemLevel >= 1500 && !result.includes('아브렐슈드 하드 1~3') && !result.includes('아브렐슈드 하드 3')) {
    result.push('아브렐슈드 노말 1~3');
    result.push('아브렐슈드 노말 3');
  }
  if(itemLevel >= 1490 && !result.includes('아브렐슈드 하드 1~2') && !result.includes('아브렐슈드 하드 1~3')) {
    result.push('아브렐슈드 노말 1~2');
  }

  if(result.includes('아브렐슈드 노말 1~2') && result.includes('아브렐슈드 노말 3')) {
    result = result.filter((el) => el !== '아브렐슈드 노말 1~2' && el !== '아브렐슈드 노말 3');
  } else {
    result = result.filter((el) => el !== '아브렐슈드 노말 1~3');
  }

  if(itemLevel >= 1475) {
    result.push('쿠크세이튼 노말');
  }
  if(itemLevel >= 1460) {
    result.push('비아키스 하드');
  }
  if(itemLevel >= 1445) {
    result.push('발탄 하드');
  }
  if(itemLevel >= 1430 && !result.includes('비아키스 하드')) {
    result.push('비아키스 노말');
  }
  if(itemLevel >= 1415 && !result.includes('발탄 하드')) {
    result.push('발탄 노말');
  }
  if(itemLevel >= 1385 && itemLevel < 1475) {
    result.push('아르고스');
  }

  return result;
}

