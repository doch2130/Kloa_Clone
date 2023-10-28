import { StaticImageData } from 'next/image'
import SlideImage1 from '@/assets/SlideImage/main_image_1.webp'
import SlideImage2 from '@/assets/SlideImage/main_image_2.webp'
import SlideImage3 from '@/assets/SlideImage/main_image_3.webp'
import SlideImage4 from '@/assets/SlideImage/main_image_4.webp'

type slideImageListType = {
  id: number;
  src: StaticImageData;
  url: string;
  alt: string;
}

const slideImageList:slideImageListType[] = [
  {
    id: 1,
    src: SlideImage1,
    url: 'https://lostark.game.onstove.com/Promotion/Update/230913',
    alt: 'main_image_1',
  },
  {
    id: 2,
    src: SlideImage2,
    url: 'https://lostark.game.onstove.com/Promotion/Reservation/230705',
    alt: 'main_image_2',
  },
  {
    id: 3,
    src: SlideImage3,
    url: 'https://lostark.game.onstove.com/Promotion/Update/230222/Ivorytower',
    alt: 'main_image_3',
  },
  {
    id: 4,
    src: SlideImage4,
    url: 'https://lostark.game.onstove.com/Promotion/Update/230222/Gargadis',
    alt: 'main_image_4',
  },
]

export default slideImageList;