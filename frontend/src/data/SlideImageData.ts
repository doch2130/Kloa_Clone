import { StaticImageData } from 'next/image'

import { ImgMainImage1, ImgMainImage2, ImgMainImage3, ImgMainImage4 } from '/public/images'

type slideImageListType = {
  id: number;
  src: StaticImageData;
  url: string;
  alt: string;
}

const slideImageList:slideImageListType[] = [
  {
    id: 1,
    src: ImgMainImage1,
    url: 'https://lostark.game.onstove.com/Promotion/Update/230913',
    alt: 'main_image_1',
  },
  {
    id: 2,
    src: ImgMainImage2,
    url: 'https://lostark.game.onstove.com/Promotion/Reservation/230705',
    alt: 'main_image_2',
  },
  {
    id: 3,
    src: ImgMainImage3,
    url: 'https://lostark.game.onstove.com/Promotion/Update/230222/Ivorytower',
    alt: 'main_image_3',
  },
  {
    id: 4,
    src: ImgMainImage4,
    url: 'https://lostark.game.onstove.com/Promotion/Update/230222/Gargadis',
    alt: 'main_image_4',
  },
]

export default slideImageList;