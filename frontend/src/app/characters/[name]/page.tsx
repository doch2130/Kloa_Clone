'use client'
import React, { useEffect } from 'react'
import { useParams } from 'next/navigation';
import { localStorageSaveHandler } from '../../../components/Header/HeaderSearchUtil'

export default function CharacterDetail() {
  const params = useParams();
  // const name = params.name;
  const name = Array.isArray(params.name) ? params.name.join(',') : params.name;

  // 여기서는 데이터 호출하지 않고 페이지만 넘겨준다.
  // 페이지를 넘겨준 후 API를 호출해서 데이터가 있으면 로컬스토리지 저장도 같이 한다.
  // 여기서 1번하면 페이지 이동 후 또 해야하는 현상이 생기기 때문에 여기서는 하지 않는다.

  const dataLoadHandler = async (name:string) => {
    const characterName = decodeURIComponent(name.trim());
    try {
      const resposneCharacter = await fetch(`/api/lostark/characters?characterName=${characterName}`, {
        method: 'get'
      });
  
      if(resposneCharacter.ok) {
        const result = await resposneCharacter.json();
  
        if(result.status === 200) {
          // 최근 검색 로컬 스토리지 저장
          // localStorageSaveHandler('recently', searchValueRef.current.value, setRecentlyData);
          console.log('result ', result);
        } else if(result.status === 404) {
          console.log('not found character');
        } else {
          alert('캐릭터 검색 중 에러가 발생하였습니다. 잠시 후 다시 시도 해주세요.');
        }
        return ;
  
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      alert('캐릭터 검색 중 에러가 발생하였습니다. 잠시 후 다시 시도 해주세요.');
      return ;
    }
  }

  useEffect(() => {
    // dataLoadHandler(name);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='w-full min-h-full bg-lightGrey dark:bg-[#2b2d31] text-head dark:text-[#eaf0ec] min-[1260px]:flex min-[1260px]:justify-center relative'>
      <div className='shrink-0 w-[1200px] flex justify-between relative'>
        asd
      </div>
    </div>
  )
}
