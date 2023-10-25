import Image from 'next/image';
import MainImage1 from '/public/Main/main_image_1.webp'
import MainImage2 from '/public/Main/main_image_2.webp'
import MainImage3 from '/public/Main/main_image_3.webp'
import MainImage4 from '/public/Main/main_image_4.webp'
import styled from './Home.module.css';

export default function Home() {
  return (
    <div>
      <div className={styled.bodyImage}>
        <Image src={MainImage1} alt='KLOA ICON' placeholder='blur' />
      </div>
      <div>
        text area
      </div>
    </div>
  )
}
