import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { IconScrollTopButton } from '/public/svgs'

export default function ScrollTopButton() {
  const [showButton, setShowButton] = useState(false);

  const topScrollHandler = () => {
    window.scrollTo({left:0, top:0});
    return ;
  }

  const handleScroll = () => {
    const scrollY = window.scrollY;

    // 스크롤 위치가 일정 값 이상이면 버튼을 표시하고 그렇지 않으면 숨깁니다.
    if (scrollY > 100) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <button className='fixed right-[40px] bottom-[40px] w-[56px] h-[56px] z-[30] transition-opacity duration-300 ease-out' style={showButton ? { opacity: 1} : { opacity: 0}} onClick={topScrollHandler} >
        <Image src={IconScrollTopButton} alt='IconScrollTopButton' width={56} height={56} />
      </button>
    </>
  )
}
