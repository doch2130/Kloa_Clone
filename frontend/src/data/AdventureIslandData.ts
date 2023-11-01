import { StaticImageData } from 'next/image'
import ico_island_coinbox from '@/assets/Icon/Item/ico_island_coinbox.png'
import ico_island_coin1 from '@/assets/Icon/Item/ico_island_coin1.png'
import ico_island_coin2 from '@/assets/Icon/Item/ico_island_coin2.png'
import ico_island_silver from '@/assets/Icon/Item/ico_island_silver.png'
import ico_island_gold from '@/assets/Icon/Item/ico_island_gold.png'
import ico_island_heart from '@/assets/Icon/Item/ico_island_heart.png'
import ico_island_cardpack from '@/assets/Icon/Item/ico_island_cardpack.png'
import ico_island_exp from '@/assets/Icon/Item/ico_island_exp.png'
import ico_island_card from '@/assets/Icon/Item/ico_island_card.png'
import ico_island_gift from '@/assets/Icon/Item/ico_island_gift.png'
import ico_island_harmony1 from '@/assets/Icon/Item/ico_island_harmony1.png'
import ico_island_harmony2 from '@/assets/Icon/Item/ico_island_harmony2.png'
import ico_island_harmony3 from '@/assets/Icon/Item/ico_island_harmony3.png'
import ico_island_lushreeds from '@/assets/Icon/Item/ico_island_lushreeds.png'
import ico_island_map from '@/assets/Icon/Item/ico_island_map.png'
import ico_island_marionette from '@/assets/Icon/Item/ico_island_marionette.png'
import ico_island_mazebox from '@/assets/Icon/Item/ico_island_mazebox.png'
import ico_island_mbox from '@/assets/Icon/Item/ico_island_mbox.png'
import ico_island_mbutterfly from '@/assets/Icon/Item/ico_island_mbutterfly.png'
import ico_island_mdead from '@/assets/Icon/Item/ico_island_mdead.png'
import ico_island_medeia from '@/assets/Icon/Item/ico_island_medeia.png'
import ico_island_monte from '@/assets/Icon/Item/ico_island_monte.png'
import ico_island_pocket from '@/assets/Icon/Item/ico_island_pocket.png'
import ico_island_rabbit from '@/assets/Icon/Item/ico_island_rabbit.png'
import ico_island_rune1 from '@/assets/Icon/Item/ico_island_rune1.png'
import ico_island_rune2 from '@/assets/Icon/Item/ico_island_rune2.png'
import ico_island_rune3 from '@/assets/Icon/Item/ico_island_rune3.png'
import ico_island_simbol from '@/assets/Icon/Item/ico_island_simbol.png'
import ico_island_snowbox from '@/assets/Icon/Item/ico_island_snowbox.png'
import ico_island_song1 from '@/assets/Icon/Item/ico_island_song1.png'
import ico_island_song2 from '@/assets/Icon/Item/ico_island_song2.png'
import ico_island_suras from '@/assets/Icon/Item/ico_island_suras.png'
import ico_island_volare from '@/assets/Icon/Item/ico_island_volare.png'
import ico_island_wolf from '@/assets/Icon/Item/ico_island_wolf.png'
import ico_island_lylaibox from '@/assets/Icon/Item/ico_island_lylaibox.png'
import ico_island_lylaistatue1 from '@/assets/Icon/Item/ico_island_lylaistatue1.png'
import ico_island_lylaistatue2 from '@/assets/Icon/Item/ico_island_lylaistatue2.png'
import ico_island_lylaistatue3 from '@/assets/Icon/Item/ico_island_lylaistatue3.png'
import ico_island_lylaitoy1 from '@/assets/Icon/Item/ico_island_lylaitoy1.png'
import ico_island_lylaitoy2 from '@/assets/Icon/Item/ico_island_lylaitoy2.png'
import ico_island_lylaitoy3 from '@/assets/Icon/Item/ico_island_lylaitoy3.png'

type adventureIslandDataType = {
  [key: string]: StaticImageData;
};

const adventureIslandData:adventureIslandDataType = {
  '대양의 주화 상자': ico_island_coinbox,
  '해적 주화': ico_island_coin1,
  '실링': ico_island_silver,
  '골드': ico_island_gold,
  '인연의 돌': ico_island_heart,
  '전설 ~ 고급 카드 팩 III': ico_island_cardpack,
  '영혼의 잎사귀': ico_island_exp,
  '달콤살벌 마리오네트 변장도구': ico_island_marionette,
  '미로 정원 두근두근 상자': ico_island_mazebox,
  '비밀지도': ico_island_map,
  '모험물 : 의문의 상자': ico_island_mbox,
  '탈 것 : 길들인 붉은 야생 늑대': ico_island_wolf,
  '탈 것 : 붉은 갈기 늑대': ico_island_wolf,
  '볼라르의 비밀 상자': ico_island_volare,
  '선혈의 조각': ico_island_suras,
  '라일라이 아일랜드 축제 기념 상자': ico_island_lylaibox,
  '설치물 : 늠름한 신수상': ico_island_lylaistatue1,
  '설치물 : 우아한 신수상': ico_island_lylaistatue2,
  '설치물 : 위엄있는 신수상': ico_island_lylaistatue3,
  '변신 : 설탕색 아기 피냐타': ico_island_lylaitoy1,
  '변신 : 레몬색 아기 피냐타': ico_island_lylaitoy2,
  '변신 : 황금색 아기 피냐타': ico_island_lylaitoy3,
  '즐거운 눈싸움 기념 주머니': ico_island_snowbox,
  '황혼의 레퀴엠': ico_island_song2,
  '크림스네일의 동전': ico_island_coin2,
  '풍요': ico_island_rune1,
  '조사용 토끼발 망치': ico_island_rabbit,
  '강태공의 주머니': ico_island_pocket,
  '메데이아의 선물': ico_island_medeia,
  '몬테섬 참가상': ico_island_monte,
  '정령의 선물': ico_island_gift,
  '갈대 숲의 보물 상자': ico_island_lushreeds,
  '모험물 : 죽은자의 눈': ico_island_mdead,
  '수신 아포라스 카드': ico_island_card,
  '모험물 : 환영 나비': ico_island_mbutterfly,
  '아드린느 카드': ico_island_card,
  '투명한 소리의 상자': ico_island_harmony1,
  '향기로운 소리의 상자': ico_island_harmony2,
  '조화로운 소리의 상자': ico_island_harmony3,
  '천상의 하모니': ico_island_song1,
  // '수호': ico_island_rune2,
  // '수호': ico_island_rune3,
  // '섬의 마음': ico_island_simbol,
}

const protectRune = (islandName:string) => {
  if(islandName === '환영 나비 섬') {
    // '환영 나비 섬': ico_island_rune3
    return ico_island_rune3;
  } else {
    // '우거진 갈대의 섬': ico_island_rune2
    return ico_island_rune2;
  }
}

function itemFilter(item:string, islandName:string) {
  if(item === '수호') {
    return protectRune(islandName);
  } else if(item.includes('섬의 마음')) {
    return ico_island_simbol;
  } else {
    return adventureIslandData[item];
  }
}

export default itemFilter;
