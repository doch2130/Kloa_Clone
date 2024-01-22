import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { IconScrollTopButton } from '/public/svgs'

export default function ScrollTopButton() {
  const [showButton, setShowButton] = useState(false);

  const topScrollHandler = () => {
    // window.scrollTo({ top: 0, behavior: 'smooth' });
    window.scrollTo({ top: 0 });
    return ;
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 100) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <button className='fixed right-[40px] bottom-[40px] w-[56px] h-[56px] z-[30] transition-opacity duration-300 ease-out'
        style={{ opacity: showButton ? 1 : 0 }} onClick={topScrollHandler}
      >
        <Image src={IconScrollTopButton} alt='IconScrollTopButton' width={56} height={56} />
      </button>
    </>
  )
}
