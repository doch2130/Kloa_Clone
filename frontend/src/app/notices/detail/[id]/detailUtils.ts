import { NoticePost } from "@/type/notice";

// 상세 페이지 정보 가져오기, 현재, 다음, 이전 페이지
export async function getDetailPage(id:number, setPostDataHandler:Function):Promise<{ status: boolean; result: NoticePost | null }> {
  return fetch(`/api/notices?id=${id}&detail=true`, {
    method: 'GET',
  })
    .then(res => res.json())
    .then(res => {
      // console.log('res ', res);
      const result = res.result;

      if(res.status === 404) {
        return { status: true, result: null };
      }

      const writeTimeDateType = new Date(result.createdAt);
      const writeTimeFormat = `${writeTimeDateType.getFullYear()}-${String(writeTimeDateType.getMonth()+1).padStart(2, '0')}-${String(writeTimeDateType.getDate()).padStart(2, '0')}`;

      setPostDataHandler({
        id: result.id,
        category: result.category,
        title: result.title,
        content: result.content,
        createdAt: writeTimeFormat,
        viewCount: result.viewCount,
        recomendCount: result.recomendCount
      });

      return { status: true, result: result };
    })
    .catch(error => {
      // console.error('Error while fetching data:', error);
      return { status: false, result: null };
    });
}

// 조회수 증가 함수
export async function updateViewCount(id:number, setPostDataHandler:Function) {
  fetch('/api/notices', {
    method: 'PATCH',
    body: JSON.stringify({
      id: id
    })
  })
    .then((res) => res.json())
    .then(res => {
      // console.log('res ', res);
      if(res.status === 200) {
        setPostDataHandler((prev:NoticePost) => ({
          ...prev,
          viewCount: Number(res.viewCount),
        }));
      }
      return ;
    })
    .catch(error => {
      // console.error('Error while fetching data:', error);
      return ;
    });
}
