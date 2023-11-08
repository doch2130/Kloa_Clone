import React from 'react'

// 슬라이드 버튼으로 사용하려 했는데 Swiper 사용하게 되서 사용하지 않게 됨

type SlideArrowSvgProps = {
  direction: 'left'|'right';
  width: number;
  height: number;
  color: string;
  onClickHandler?: Function;
}

export default function SlideArrowSvg(props:SlideArrowSvgProps) {
  return (
    <>
      {
        props.direction === 'left' ?
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
        stroke="currentColor" aria-hidden="true" className="swiper-button-prev w-2 h-2 !text-white drop-shadow-lg"
        width={props.width} height={props.height} color={props.color}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path></svg>
        :
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
          stroke="currentColor" aria-hidden="true" className="swiper-button-next w-2 h-2 !text-white drop-shadow-lg"
          width={props.width} height={props.height} color={props.color}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path>
        </svg>
      }
    </>
  )
}
