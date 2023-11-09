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
7일차: 로스트아크 API 테스트 진행 중, Next 서버를 이용한 API 테스트 진행, 로스트아크 공지시항 API 테스트 완료, 데이터 저장 및 출력 완료 
8일차: 캘린더 API 연동 완료, 데이터 저장 완료, 카오스게이스 우선 작업 진행 중 (날짜에 따른 데이터 출력 방식 작업 중)
9일차: 필드보스, 카오스게이스 날짜 별 출력, 남은 시간 출력 설정 완료, 태초의 섬 날짜, 시간 출력 완료, 모험 섬 시간 출력 완료, 캘린더 API 수정 진행 (카오스게이트, 필드보스 삭제, 모험 섬 데이터 정리 작업 진행)
9-2일차: 모험 섬 데이터 정리 작업 완료, api로 던져주는 아이템 아이콘과 클로아에서 사용하는 아이콘 이미지 불일치 확인, 변경 필요하다고 판단, 모험섬 데이터 출력 작업 완료
9-3일차: 모험 섬 아이템 아이콘 별도 저장 완료, 모험 섬 아이템 출력 수정 완료, 모험 섬 보상 카테고리 css 수정 완료, 새벽시간대에 확인 결과 카오스게이트, 필드보스 등의 시간 출력이 이상하게 나오는 현상 확인 (수정 필요), 주말 모험 섬 데이터 정리 및 출력 작업 필요, 보상 아이템 일부 누락되는것처럼 보임(확인 필요)
10일차: 보상 아이템 일부 누락 수정 완료, 보상 아이템 hover 텍스트 출력 (다음 아이템의 경우 arrow와 묶여있다보니 텍스트 위치가 애매하게 출력되는 현상 확인, 임시 방편으로 조치 완료), 모험 섬(주말) 시간 별 정렬 함수 기능 추가 완료, 로그인 페이지 UI 작업 완료, 로그인 기능 완료(전역 상태 관리 X), 회원가입 페이지 UI 작업 완료
11일차: NodeMailer NPM을 이용하여 메일 인증 기능 추가 작업 진행, 메일 발송 테스트 완료, 인증번호 별도 관리 및 검증 테스트 작업 필요, 인증번호 만료 설정 기능 추가 필요
12일차: 휴식
13일차: 회원가입 기능 임시 완료(인증번호 체크 X), NextAuth 설치, NextAuth Naver 로그인 연동 작업, Header 로그인 여부에 따른 UI 출력, 주말 스케줄 섬 (오전, 오후) 구분 출력 완료, 기본 로그인 + NextAuth 연동 작업

14일차: 인증번호 별도 관리 및 검증 테스트 작업, 인증번호 만료 설정 기능 추가 완료, 인증번호 만료 삭제 기능 작업 (시간 만료, 페이지 이동, 인증 완료 시), 버튼, 게시글 UI 작업 완료, 페이지네이션 작업 완료, 게시글 생성 기능 추가 완료, Quill Editor 사용 (이미지 기능 아직 구현 X), 게시글 상세보기, 게시글 수정 & 삭제 작업 필요

15일차: 메인 페이지 공지사항 출력 변경, 공지사항 페이지 게시글 상세보기, 삭제 수정 작업 완료
조회수 갱신, 좋아요 체크 기능 작업 필요, 포트폴리오 일부 작업 진행

16일차: 캘린더 API 데이터 갱신 중 모험 섬 데이터에서 일부 데이터가 NULL로 들어오는 경우가 있어서 에러가 발생하였지만 해결 완료, 공지사항 조회수 증가 함수 추가 완료, Type 파일 별도 관리 및 any 타입 변경 작업 완료, Type 관리 하면서 스케줄 섬 필요없는 데이터 수정 작업 진행 완료
Notices, Auth 페이지의 파일 구성을 layout, page 방식으로 변경 작업 완료
스케줄 섹션 컴포넌트 분리 작업 완료 - 새벽 시간 출력 이산한거 수정 필요
스케줄 섹션 컴포넌트 내부 함수 분리 작업 완료

17일차: 공지사항 페이지 좋아요에서 추천으로 변경 및 기능 작업 완료, 기존 로그인 방식 변경(DB 통신 후 NextAuth 작업에서 바로 NextAuth 작업하면서 DB 통신 동시 진행)
로그인 유지 기능을 위한, JWT 기능 체크
배포 준비를 위한 FireBase 테스트 - 테스트 결과 섬 데이터는 FireBase를 사용하는게 맞는것 같지만, 다른 데이터는 DB를 사용하는게 베스트로 판단
=> prisma + mysql로 백엔드 임시 구성해서 사용하는 방식으로 진행
=> 섬 데이터는 FireBase OR 파일로 관리 예정
=> Next.js에 Prisma 연동 작업 진행, bcrypt 추가 작업(패스워드 암호화)
=> 백엔드, 프론트를 나눠서 하려고 하였는데, Next에서 prisma import 에러가 계속 발생하는 현상이 확인되어, backend 폴더를 삭제하고, 프론트에서 Next + prisma를 같이 사용하는 방식으로 설정
=> Next + prisma + mysql 셋팅 정상 확인
=> 회원가입 작동 정상 확인 (prisma, mysql 데이터 정상 확인)
=> 메일 인증 기능 Prisma로 변경 완료
=> 로그인 테스트 정상 확인

=> JWT 기능 작업 부터 시작
https://mycodings.fly.dev/blog/2023-06-03-nextauth-nextjs-tutorial-protected-route-and-jwt-token


*해결사항*
모험 섬 컴포넌트 분리 작업 => 완료
새벽시간대에 확인 결과 카오스게이트, 필드보스 등의 시간 출력이 이상하게 나오는 현상 확인 (수정 필요)
로그인 기능 완료(전역 상태 관리 기능 추가 필요) => Next Auth로 관리 완료

=========
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

7일차 문제
로스트아크 API를 테스트하고 있지만, 클라이언트 컴포넌트에서는 반응이 전혀 없다.
useEffect를 사용해도 반응이 없고 안써도 반응이 없고, 에러도 발생하지 않는 상황이라 난감하다.
아무래도 모르는 Next 기능으로 호출을 해야하는지 확인이 필요할 것 같다.
데이터 연동은 시간이 더 걸릴 것 같다.

프론트에서 Next 서버로 fetch 요청을 한 후에 Next 서버에서 fetch로 LostArk API를 이용하여 Notice List를 호출해서 데이터를 가져온다.
가져온 데이터는 db.json 파일에 저장하며, 상위 Top5 리스트만 페이지에 출력하는 방식으로 설정하였다.
=> 해당 방식으로 하면 브라우저의 네트워크 탭에서는 localhost:9999로의 통신 요청만 보이기 때문에, Next 서버에서 외부로 보내는 데이터는 비공개된다. api key 보안 향상을 기대할 수 있게 된다.

8일차 문제
캘린더 API까지는 문제 없이 완료되었지만, 선택한 날짜에 따라서 출력해야 하는 UI에서 막혀있는 상태이다. 데이터에 따라서 출력을 하면 되기는 하는데 처음 구조를 어떻게 시작하면 좋을지 고민 중 이다.

9일차 문제
컴포넌트를 아직 분리를 하지 않아서 모험 섬 쪽의 컴포넌트가 1초마다 전체 렌더링이 발생하고 있는 상황, 아직 지장은 없지만 이후에 분리가 필요할 것으로 판단되며, 같은 기능에 속하는 애들은 묶어서 사용하는 것이 효율적으로 보임,
우선은 보류 상태도 두고 이후에 추가 작업 진행

9-2일차 문제
로아API의 아이템과 클로아 아이템 이미지 다른 것으로 확인되었으며, 클로아 이미지로 변경하는 작업을 해야할 것으로 보임,
모험 섬 데이터 출력까지는 완료하였지만, 컴포넌트 분리가 제대로 반영되지 않아서 모험섬 섹션의 렌더링이 전체적으로 발생하고 있는 상황 발생, 컴포넌트 분리 작업이 필요하다고 판단

15일차 문제
게시글 삭제, 수정 후 fetch의 cache로 인해 데이터가 유지되는 현상이 발생하였으며, 확인결과 cache name으로 삭제를 진행해야한다고 한다. 그러나 cache name은 설정을 안하면 임의로 지정되기 떄문에 삭제가 불가능하며, fetch cache를 사용하는 곳은 cache name을 따로 설정하는 작업을 해야 정상 작동할 것으로 판단된다.

16일차 문제
매니저 페이지 API 데이터 갱신 작업 중 JSON-SERVER 데이터가 갱신이 되지 않고 서버 에러가 발생하는 현상 확인, 확인 결과 db.json에 "id" 값이 필수로 있어야 기존 데이터가 있어도 데이터가 추가되는 것으로 확인되었습니다. ID가 없으면 데이터를 비운 상태로 해야지만 정상적으로 들어가고 아니면 에러가 발생한다.
섬 데이터의 경우 ID로 구분해서 넣으면 배열이 따로 설정되는 현상이 발견되어 임시로 기존 데이터 불러와서 새로운 데이터와 합치는 작업을 먼저 진행,
이후에 db에 있는 데이터를 삭제 후 업데이트된 데이터를 넣는 작업 방식으로 사용

캐릭터 순위 정보를 API로 사용해보려고 했는데, 캐릭터 개인 순위 및 전체 순위는 아직 제공하지 않는다고 한다. 그래서 다른 사이트에서 크롤링해서 하는 방식으로 해야 될 것 같기는 한데, 좀 더 확인해봐야할 것 같다.
1번 방법: 다른 사이트에서 캐릭터 이름만 크롤링 해서 데이터 수집 후 API 이용하여 캐릭터 정보 업데이트
2번 방법: 크롤링으로 전체 데이터 수집
3번 방법: 탑 100,200 까지만 크롤링해서 데이터 수집 후 이후 캐릭터는 검색 시 api로 데이터 불러와서 갱신하는 방식