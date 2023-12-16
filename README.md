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

18일차: 공지사항 페이지 fetch prisma 수정 작업 완료
=> (전체 리스트 가져오기, 추천하기, 조회수 증가, 상세 게시글 가져오기, 게시글 삭제)
=> 메인 페이지 공지사항 가져오기 api 수정 완료
=> 상세글에서 다음, 이전 페이지를 가져올 때 id+1 값으로 가져오다보니 중간에 게시글 삭제 시 id 값이 비어있는 경우가 발생 => 해결완료

=> JWT 참고 사이트
https://mycodings.fly.dev/blog/2023-06-03-nextauth-nextjs-tutorial-protected-route-and-jwt-token
=> JWT 작업 시작, 로그인 시 AccessToken 생성 정상 확인, session type 수정, 게시글 작성 시 token 검사 기능 추가 완료
=> JWT 혹은 OAuth에 대한 토큰을 사용한다. (RFC 6750) 라는 Bearer 적는 이유는 Type 설정이라고 함

Next middle
=> 설치 시 버전 조심
=> npm i next@13.5.6-canary.8
app 폴더랑 같은 위치에 middleware.ts 파일 설치 => 테스트 결과 정상 확인
로그인, 비로그인 페이지 구분해서 작업 필요 판단
비인가 사용자 보안 페이지 접근 시 login 페이지로 리다이렉트 적용 완료 [nextauth] 폴더에서 page 부분을 추가하면 됨

=> Next Middle 사용 시 canary를 설치할 필요는 없음, 기존 버전으로 사용 가능
=> 미들웨어 터미널 에러
JWT verification error: The edge runtime does not support Node.js 'crypto' module.
Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime
=> 복호화가 안되는 에러로 보임
=> jsonwebtoken에서 jose로 변경하면 된다고 함, 임시 생성, 검증 코드 작성, 테스트 진행 예정

19일차: jsonwebtoken에서 jose로 함수 변경 완료, 미들웨어 적용 정상 확인, token 불일치 시 쿠키 삭제, 소셜 로그인 시 accessToken 항목이 저장이 안되서 로그인 시 callback 함수에서 별도로 추가하는 로직 추가
Token 검증 함수 분리(Token 전체 검증, accessToken만 검증)
로스트아크 API 공지사항 가져오기 함수 수정 (Json-Server => Prisma + MySQL)
홈페이지 로스트아크 공지사항 출력 기능 수정

20일차: 로스트아크 API 스케줄 데이터 가져오기 기능 변경 작업 (기존 db.json 방식에서 assets 폴더에 날짜 별로 파일 분리 작업)
=> 모험 섬 데이터는 JSON 파일로 저장한 데이터 불러서 사용하는 방식으로 변경 완료

21일차: 메인 공지사항 상세 페이지 에러 수정 완료 (이전, 다음 글 데이터 없는 경우 에러 발생)
메인 공지사항 수정 페이지 JSON-SERVER에서 prisma로 변경 작업 완료, 데이터 정상 확인
=> 특수문자 replace 처리 작업 필요

=> JSON-SERVER 사용 X (일단 보류)
DB 사용자 정보에서 role 항목 추가 (관리자 true, 일반 false);
=> 그에 따라 prisma 파일, 관리자 뷰 조건 컴포넌트 수정 완료

tailwind 다크모드 테스트 (header 부분부터 테스트 진행)
=> 현재 작업 페이지 다크모드 적용 완료 (로컬 스토리지 이용한 다크모드 적용 방식)

22일차: 로스트아크 API Return 값 통일 수정, 메인 페이지 API Call 함수 방식 변경
build 테스트 중 에러 발생
=> eslintrc.json 파일을 못찾는 에러 => 파일 내용 수정, eslint-plugin-prettier 설치 후 파일 정상(parsing 에러 없음)
=> 텍스트에디터 에러 발생 => 동적 로딩 방식으로 수정 후 해결 완료
=> document undefined 에러 발생 => 동적 로딩 방식으로 수정 후 해결 완료

Error: Page "/notices/update/[id]" is missing "generateStaticParams()" so it cannot be used with "output: export" config.
=> next.config.js => output: 'export', 추가 이후에도 에러 발생
=> 해당 페이지의 useEffect() 함수를 밑으로 이동 => 에러 동일 증상 => try catch 누락되어 재작성 => 에러 동일 증상
=> Next13 버전 에러라고 한다. => 임시로 나눠서 페이지를 분리해서 해결하면 된다고 함 => 분리안하고 props.params.id로 해결 완료

23일차 : Next.js 배포
네이버 무료 서버
- 기본 Next.js도 실행 안됨
- npm install 견디지 못하고 뻗음
- 설치가 되더라도 dev, build가 에러가 뜨면서 안됨
AWS EC2
- 기본 Next.js 정상 작동
- npm install 정상 설치
=> node 16 버전 말고 업데이트 하라고 메시지 출력되서, nvm 이용해서 설치는 했지만 사용하는 거는 16 버전 그대로임
=> 16버전도 크게 문제는 없는 듯
=> npm run build => 엄청 엄청 엄청 오래 걸림 서버 사양 문제인듯

AWS EC2 새로 설치
우분투 22버전으로 변경 됨
mysql 설치
nvm 설치
node 설치 v20
npm install 할 때마다 멈추는 현상 발생 - 메모리 부족으로 판단
npm 1개씩 설치 진행
npm run dev 까지는 실행 성공
page 접속 진행중 메모리 부족으로 컴파일 무한 로딩
=> swap 메모리 설정으로 임시 해결
=> 되기는 하지만 로딩이 엄청 길어짐...(이걸로라도 임시 처리)
[메모리 설정 사이트] https://sundries-in-myidea.tistory.com/102
=> 페이지 접속 정상 확인 (로딩 길어지는 현상은 어쩔 수 없음)
=> 로그인 정상, 로그아웃 시 callback url이 로컬호스트로 이동 됨
=> npm run dev로 실행해서 env.local의 NEXTAUTH_URL이 callback url로 설정되어 로컬호스트로 이동되는 현상 확인
=> 수정 후 정상 이동

=> local, dev, production 설정이 제대로 반영 안됨
=> 해당 사이트 참고해서 설정 작업 해야 할 듯
=> https://funveloper.tistory.com/163
=> 해당 방법은 약간 이상한 듯한 느낌, 다른 방법 찾는 중

스크립트 실행시 .env.local, .env.production 설정 및 api 호출 조건 재 설정
로컬
"prod:build": "env-cmd -f .env.local next build",
build 에러 안뜸, start 데이터 없음

"prod:build": "env-cmd -f .env.production next build",
1. AWS 서버 켜져 있는 경우 / build 에러 안뜸, start 데이터 있음
2. AWS 서버 꺼진 경우 / build 에러 발생, start 에러 발생

AWS 배포 서버
"prod:build": "env-cmd -f .env.local next build",
build 에러 안뜸, start 데이터 없음

"prod:build": "env-cmd -f .env.production next build",
build 에러 발생, start 데이터 있음

=> 결론 => 배포 서버에서는 build 에러 발생, start 데이터 있음 방식으로 사용하면 됨

Uncaught Error: Minified React error #423; visit https://reactjs.org/docs/error-decoder.html?invariant=423 for the full message or use the non-minified dev environment for full errors and additional helpful warnings.
=> 서버에서 build 할 때와 실제로 start 했을 때 데이터가 달라서 생기는 에러라고 한다.
=> 실제 문제는 없지만 F12를 누르면 빨간색으로 체크 되어 있는게 거슬린다...
=> 다른 사이트도 확인해보니 new Date()의 시간차이 떄문으로 확인되었다.
=> AWS 서버 시간이랑, 브랑우저 시간이랑 다르게 측정이 되서 그런걸로 확인이 됬다.
[참고사이트] https://velog.io/@pds0309/nextjs-Minified-React-error-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B8%B0
=> 해당 부분의 컴포넌트를 dynamic 방식으로 변경해서 불러오니 해결되었다.

nohup 실행 방식에서 pm2 설치 후 실행 방식으로 변경 => 정상 확인

다른 경고 발생
was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.
[참고사이트]https://stackoverflow.com/questions/73386743/nextjs-image-was-preloaded-using-link-preload-but-not-used-within-a-few-seconds
=> 나중에 확인 예정
------
=> SlideImage.tsx as='image' priority={true} 추가 작업 후 재배포 => 해결안됨


24일차:
Header 검색 창 UI 작업

25일차:
휴식

26일차:
스케줄섬 시간 정렬 필요 확인 => 작업 완료
스케줄 다크모드 hover 설정
Header 검색 창 기능 작업 진행 (검색 클릭 시 popOpen, 글자 입력 or 다른 곳 클릭 popClose)
검색 내역 로컬 스토리지 저장 (최근 검색 내역)
=> CSS, 삭제 기능 추가 완료

27일차:
Header Search Input 최근검색, 즐겨찾기 기능 작업 완료
=> 즐겨찾기 추가 기능은 전투정보실 페이지 작업 이후 진행
Footer 내용 수정
Rest (Forget Password) Page UI 작업 시작

28일차:
전체 Layout에서 Footer 제거 후 일부에만 사용하도록 변경 작업 완료
Rest (Forget Password) Page UI, Function 작업 완료
API Return 값 JSON 방식으로 변경 작업 완료

29일차:
공지사항 작성 시 에러 발생 => fetch 요청 시 Token 앞에 bearer 누락 확인 => 수정 후 정상 확인
공지사항 추천 함수 일부 수정 작업
스케줄 파일 업데이트 시 시간 정렬 안되는 현상 확인
=> Key 값으로 날짜 정렬은 되었는데 내부 데이터가 정렬이 안되었음 => 수정 완료

30일차:
로스트아크 전투정보실 API 테스트

31일차:
로스트아크 API 자동 갱신 작업을 위한 백엔드 작업
=> 공지사항 게시판 자동 갱신 작업 임시 완료
=> 모험섬 데이터 자동 갱신 작업 임시 완료
=> env 같은 보안을 위해 바로 배포하지 않고 build 작업 후에 올릴 예정 (정보 찾는 중)

32일차:
공지사항 자동 갱신 에러 발생
=> mysql 계정 접속 관련 문제로 인한 업데이트 누락
=> env 파일의 127.0.0.1은 접속이 안되는 현상 발견 (로그는 패스워드 불일치로 나옴) => localhost로 변경 후 정상 확인
=> 시퀄라이즈 코드 일부 에러 발견 => 수정 완료

33일차:
모험 섬 자동 저장 API 함수 수정 => fs 모듈 함수 잘못 적용 => 수정 완료

==
다른 업무 진행으로 중지
==

34일차:
전투정보실 페이지 작업 진행
=> 서버 데이터 미연동
=> 목업 데이터를 이용하여 레이아웃 작업 진행
=> Navigator의 값에 따른 데이터 출력으로 인해 컴포넌트 레이아웃 변경, 상태관리 기능 체크 필요

35일차:
발견된 에러 수정 작업
1. 공지사항 content type varchar(191)로 인한 데이터 초과 에러 => mediumText 타입으로 변경
2. 메일 인증 기능 반복 수행 => isLoading 기능 추가작업으로 반복 실행 제어
3. 비밀번호 찾기 메일 인증 기능 에러 => 이메일 찾기 기능 에러 => 전용 API 추가하여 해결 완료
4. 회원가입 시 약관 동의(링크 페이지) 클릭 시 현재 페이지가 이동되어 데이터 소멸 => 링크 새창으로 열기로 변경 완료
5. 로그인 페이지 Enter 이벤트 추가 완료
6. 배너 Link 태그 /image url로 이동하는 현상 확인 => as='image'로 인한 현상 => as='url'로 변경 후 해결 완료

*추가로 필요한 작업*
1. api NextResponse 코드 수정 필요 => 완료
2. 네이버 로그인 대신 디스코드로 변경할 필요 있어보임
3. 반응형 작업 필요
4. 마이페이지??? 확인 필요

XSS 공격 방어 설정
=> next.config.js 1차 방어 => 경고 메시지로 없는 옵션이라고 출력되어 삭제
=> replace를 통한 2차 방어
=> notice detail page, dangerouslySetInnerHTML로 방어
=> 각 입력 값 검증 패턴 추가 예정 => React-Hook-Form으로 설정 예정

36일차:
React-Hook-Form으로 변경 작업
=> input에 ref를 설정하면 라이브러리가 제대로 작동이 안됨(onChange Mode 설정이 안됨)
=> 회원가입, 비밀번호 찾기 페이지 적용 완료
Notice 작성, 수정 제목 input에 pattern 추가 완료

37일차:
OAuth 변경, Naver => Discord 로 변경
=> 로컬에서는 정상이였으나, 배포이후 안되는 현상 발견(Redirect url이 로컬로 잡힘)
=> redirect_uri => redirect_url로 변경
=> npm start script 변경 (기존 start 에서 .env.production 설정 후 start로 변경)

38일차:
전투 정보실 페이지 캐릭터 Select 작업
=> headlessUI Npm 사용
=> 서버, 직업, 각인 데이터 파일 생성
=> select 박스 출력 작업 완료
데이터에 따른 리스트 출력 방식 체크 필요 => React-Query 사용 할 지 고민 중

39일차:
전투 정보실 레벨 옵션 설정 UI, 값 설정 임시 컴포넌트로 작업 완료
MouseTest.tsx
CharacterNavigatorCopy.module.css
=> 이후 본 컴포넌트랑 합칠 예정

*해결사항*
새벽시간대에 확인 결과 카오스게이트, 필드보스 등의 시간 출력이 이상하게 나오는 현상 확인 (수정 필요)

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


23일차 문제
Warning: For production Image Optimization with Next.js, the optional 'sharp' package is strongly recommended. Run 'npm i sharp', and Next.js will use it automatically for Image Optimization.
Read more: https://nextjs.org/docs/messages/sharp-missing-in-production
배포시 Image 대신 sharp 사용하라는 권고 메시지
=> 나중에 확인 예정
=> Image 태그는 그대로 사용하되 배포 시에 sharp를 설치하고 배포를 해야한다고 함
=> vercel은 자동 설치라서 괜찮다고 함

28일차 문제
auth 폴더 구조
auth/
	layout.tsx
	login/
	singup/
	rest/

layout.tsx 파일만 존재한 상태에서 배포를 하면 콘솔 창에 다음과 같이 출력이 되었다.
The resource http://52.78.154.125:12000/_next/static/css/09e1cca9fc5c6311.css was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.

비슷한 구조인 Notice는 출력이 안되는 것으로 볼 때 page.tsx를 안쓰고 사용해서 탐지되는 경고 메시지로 추측된다.
=> page.tsx는 상관없이 페이지와 연결되어 있는 링크에 한해서 연결된 페이지의 css 파일이 로딩이 되는 현상으로 판단된다.

=> Link 태그 대신 a 태그를 사용하면 메시지가 출력이 되지는 않는다.
=> 그런데 다른 Link 태그는 출력이 안되는 것으로 봐서는 target도 영향이 있지 않을까???
=> target은 영향이 없다.
=> Link로 연결된 컴포넌트에서 스타일 불러오는 방식에 의해 발생하는 것으로 확인되었다.
=> import styled from './login.module.css' 에서 => import './login.css' 변경해도 해결이 안된다.
=> as 추가 하였으나 해결 안된다.