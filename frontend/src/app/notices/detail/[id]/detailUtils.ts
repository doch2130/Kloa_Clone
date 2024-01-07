import { xssPreventionReplace } from "@/app/api/utill/xssPrevention";
import { NoticePost } from "@/types/notice";

// 상세 페이지 정보 가져오기, 현재, 다음, 이전 페이지
export async function getDetailPage(id:number, setPostDataHandler:Function, 
  setPrevPostDataHandler:Function, setNextPostDataHandler:Function):Promise<{ status: boolean; result: NoticePost | null }> {
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

      result.forEach((post:any, index:number) => {
        // console.log('post[0] ', post[0]);
        if(post[0] !== undefined) {
          const writeTimeDateType = new Date(post[0].createdAt);
          const writeTimeFormat = `${writeTimeDateType.getFullYear()}-${String(writeTimeDateType.getMonth()+1).padStart(2, '0')}-${String(writeTimeDateType.getDate()).padStart(2, '0')}`;
          
          const title = xssPreventionReplace(post[0].title);
          const content = xssPreventionReplace(post[0].content);

          if(index === 0) {
            setPostDataHandler({
              id: post[0].id,
              category: post[0].category,
              title: title,
              content: content,
              createdAt: writeTimeFormat,
              viewCount: post[0].viewCount,
              recomendCount: post[0].recomendCount
            });
          } else if (index === 1) {
            setPrevPostDataHandler({
              id: post[0].id,
              category: post[0].category,
              title: title,
              content: content,
              createdAt: writeTimeFormat,
              viewCount: post[0].viewCount,
              recomendCount: post[0].recomendCount
            });
          } else if (index === 2) {
            setNextPostDataHandler({
              id: post[0].id,
              category: post[0].category,
              title: title,
              content: content,
              createdAt: writeTimeFormat,
              viewCount: post[0].viewCount,
              recomendCount: post[0].recomendCount
            });
          }
        }
      });

      return { status: true, result: result[0] };
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
