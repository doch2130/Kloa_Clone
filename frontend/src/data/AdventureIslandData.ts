import { StaticImageData } from 'next/image'
import { islandIconList } from '/public/images'

type adventureIslandDataType = {
  [key: string]: StaticImageData;
};

const adventureIslandData:adventureIslandDataType = {
  '대양의 주화 상자': islandIconList.IconIslandCoinbox,
  '해적 주화': islandIconList.IconIslandCoin1,
  '실링': islandIconList.IconIslandSilver,
  '골드': islandIconList.IconIslandGold,
  '인연의 돌': islandIconList.IconIslandHeart,
  '전설 ~ 고급 카드 팩 III': islandIconList.IconIslandCardpack,
  '영혼의 잎사귀': islandIconList.IconIslandExp,
  '달콤살벌 마리오네트 변장도구': islandIconList.IconIslandMarionette,
  '미로 정원 두근두근 상자': islandIconList.IconIslandMazebox,
  '비밀지도': islandIconList.IconIslandMap,
  '모험물 : 의문의 상자': islandIconList.IconIslandMbox,
  '탈 것 : 길들인 붉은 야생 늑대': islandIconList.IconIslandWolf,
  '탈 것 : 붉은 갈기 늑대': islandIconList.IconIslandWolf,
  '볼라르의 비밀 상자': islandIconList.IconIslandVolare,
  '선혈의 조각': islandIconList.IconIslandSuras,
  '라일라이 아일랜드 축제 기념 상자': islandIconList.IconIslandLylaibox,
  '설치물 : 늠름한 신수상': islandIconList.IconIslandLylaistatue1,
  '설치물 : 우아한 신수상': islandIconList.IconIslandLylaistatue2,
  '설치물 : 위엄있는 신수상': islandIconList.IconIslandLylaistatue3,
  '변신 : 설탕색 아기 피냐타': islandIconList.IconIslandLylaitoy1,
  '변신 : 레몬색 아기 피냐타': islandIconList.IconIslandLylaitoy2,
  '변신 : 황금색 아기 피냐타': islandIconList.IconIslandLylaitoy3,
  '즐거운 눈싸움 기념 주머니': islandIconList.IconIslandSnowbox,
  '황혼의 레퀴엠': islandIconList.IconIslandSong2,
  '크림스네일의 동전': islandIconList.IconIslandCoin2,
  '풍요': islandIconList.IconIslandRune1,
  '조사용 토끼발 망치': islandIconList.IconIslandRabbit,
  '강태공의 주머니': islandIconList.IconIslandPocket,
  '메데이아의 선물': islandIconList.IconIslandMedeia,
  '몬테섬 참가상': islandIconList.IconIslandMonte,
  '정령의 선물': islandIconList.IconIslandGift,
  '갈대 숲의 보물 상자': islandIconList.IconIslandLushreeds,
  '모험물 : 죽은자의 눈': islandIconList.IconIslandMdead,
  '수신 아포라스 카드': islandIconList.IconIslandCard,
  '모험물 : 환영 나비': islandIconList.IconIslandMbutterfly,
  '아드린느 카드': islandIconList.IconIslandCard,
  '투명한 소리의 상자': islandIconList.IconIslandHarmony1,
  '향기로운 소리의 상자': islandIconList.IconIslandHarmony2,
  '조화로운 소리의 상자': islandIconList.IconIslandHarmony3,
  '천상의 하모니': islandIconList.IconIslandSong1,
  // '수호': ico_island_rune2,
  // '수호': ico_island_rune3,
  // '섬의 마음': ico_island_simbol,
}

const protectRune = (islandName:string) => {
  if(islandName === '환영 나비 섬') {
    // '환영 나비 섬': ico_island_rune3
    return islandIconList.IconIslandRune3;
  } else {
    // '우거진 갈대의 섬': ico_island_rune2
    return islandIconList.IconIslandRune2;
  }
}

function itemFilter(item:string, islandName:string) {
  if(item === '수호') {
    return protectRune(islandName);
  } else if(item.includes('섬의 마음')) {
    return islandIconList.IconIslandSimbol;
  } else {
    return adventureIslandData[item];
  }
}

export default itemFilter;
