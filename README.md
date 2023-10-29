# Kloa_Clone
클로아 사이트 만들어보기 연습

기간 : 2023-10-24 ~ 

기술스택 : Next.js, React, TypeScript

1일차: 저장소 생성, 언어 선택
2일차: header + nav 작업, 반응형 X
3일차: 공지사항 layout 완료, 모험 섬 layout 일부 완료
4일차: 모험 섬 layout 70% 완료, 이미지 캐러쉘 기능 완료(swiper)
5일차: 모험 섬 layout 90% 완료, 반응형 X, 달력 날짜 변경 기능 추가 완료, 날짜 변경에 따른 데이터 작업 필요
6일차: 모험 섬 layout 완료, 반응형 X, 날짜 변경에 따른 데이터 작업 및 데이터 연동 작업 필요

4일차 문제
svg 파일을 컴포넌트로 사용하려고 하기위하여, svgr 기능을 추가하여 사용하려고 하였지만, next.config.js에서 문제가 발생한다.
cra로 생성할 때 ts를 선택해서 생긴 오류인지 정확하지는 않지만, 다른 사람과 동일하게 해도 에러가 발생한다.
결국 svgr 기능은 사용하지 않는 것으로 적용하였지만, Left 또는 Right Arrow를 사용할 때 컴포넌트에서 출력할 수 있게 설정하는 방식은 적용하였다.
그러나 swiper 기능을 사용하면서 작업한 svg 컴포넌트도 사용하지 않게 되었다.

swiper 내부에서 create-element 기능을 사용해서 그런지 'use client'를 적용해야 반영된다.


5일차 문제
모험 섬 보상이 7개 이상인 경우 화살표로 구분해서 출력을 해줘야 한다.
기존 사이트는 데이터를 받아서 사용하는 것으로 보이며, UI 변경 시 해당 컴포넌트만 재렌더링 된다.
부모에서 데이터만 전달해주고 출력 및 화살표 기능은 자식 컴포넌트에서 진행하는 방식으로 해야 될 것 같다.
