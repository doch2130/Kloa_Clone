export const characterJobList:string[] = [
  '전체 클래스',
  '디스트로이어',
  '워로드',
  '버서커',
  '홀리나이트',
  '슬레이어',
  '스트라이커',
  '배틀마스터',
  '인파이터',
  '기공사',
  '창술사',
  '데빌헌터',
  '블래스터',
  '호크아이',
  '스카우터',
  '건슬링어',
  '바드',
  '서머너',
  '아르카나',
  '소서리스',
  '블레이드',
  '데모닉',
  '리퍼',
  '소울이터',
  '도화가',
  '기상술사'
]

type characterJobSkillType = {
  [key: string]: string[];
}

export const characterJobSkillList:characterJobSkillType = {
  '전체 클래스': [],
  '워로드': ['전체', '고독한 기사', '전투 태세'],
  '디스트로이어': ['전체', '분노의 망치', '중력 수련'],
  '버서커': ['전체', '광기', '광전사의 비기'],
  '홀리나이트': ['전체', '심판자', '축복의 오라'],
  '슬레이어': ['전체', '처단자', '포식자'],
  '스트라이커': ['전체', '오의난무', '일격필살'],
  '브레이커': ['전체', '권왕파천무', '수라의 길'],
  '배틀마스터': ['전체', '오의 강화', '초심'],
  '인파이터': ['전체', '극의: 체술', '충격 단련'],
  '기공사': ['전체', '세멕타통', '역전지체'],
  '창술사': ['전체', '절정', '절제'],
  '데빌헌터': ['전체', '강화 무기', '핸드거너'],
  '블래스터': ['전체', '포격 강화', '화력 강화'],
  '호크아이': ['전체', '두 번째 동료', '죽음의 습격'],
  '스카우터': ['전체', '아르데타인의 기술', '진화의 유산'],
  '건슬링어': ['전체', '사냥의 시간', '피스메이커'],
  '바드': ['전체', '절실한 구원', '진실된 용맹'],
  '서머너': ['전체', '넘치는 교감', '상급 소환사'],
  '아르카나': ['전체', '황제의 칙령', '황후의 은총'],
  '소서리스': ['전체', '점화', '환류'],
  '블레이드': ['전체', '버스트', '잔재된 기운'],
  '데모닉': ['전체', '멈출 수 없는 충동', '완벽한 억제'],
  '리퍼': ['전체', '갈증', '달의 소리'],
  '소울이터': ['전체', '만월의 집행자', '그믐의 경계'],
  '도화가': ['전체', '만개', '회귀'],
  '기상술사': ['전체', '질풍노도', '이슬비']
}


type characterJobStatusType = {
  [key: string]: string
}

export const characterJobStatus:characterJobStatusType = {
  '워로드': '힘',
  '디스트로이어': '힘',
  '버서커': '힘',
  '홀리나이트': '힘',
  '슬레이어': '힘',
  '스트라이커': '힘',
  '브레이커': '힘',
  '배틀마스터': '힘',
  '인파이터': '힘',
  '기공사': '힘',
  '창술사': '힘',
  '데빌헌터': '민첩',
  '블래스터': '민첩',
  '호크아이': '민첩',
  '스카우터': '민첩',
  '건슬링어': '민첩',
  '바드': '지능',
  '서머너': '지능',
  '아르카나': '지능',
  '소서리스': '지능',
  '블레이드': '민첩',
  '데모닉': '민첩',
  '리퍼': '민첩',
  '소울이터': '민첩',
  '도화가': '지능',
  '기상술사': '지능'
}