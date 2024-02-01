'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { slideImageList } from '/public/images'

export default function SlideImage() {
  // Swiper의 경우 create element 기능을 사용하기 때문에 use client를 설정해줘야 한다.
  type CustomCSSProperties = React.CSSProperties & {
    '--swiper-navigation-color'?: string;
    '--swiper-pagination-color'?: string;
  };

  const swiperStyle:CustomCSSProperties = {
    '--swiper-navigation-color': '#fff',
    '--swiper-pagination-color': '#fff'
  }

  return (
    <Swiper
    style={swiperStyle}
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      {slideImageList.map((el, index:number) => {
        return (
          <SwiperSlide key={index}>
            <Link href={el.url} target='_blank' as={el.url}>
              <Image src={el.img} alt={`main_image_${index}`} placeholder='blur' priority={true} />
            </Link>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}
