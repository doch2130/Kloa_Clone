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

      if(result === undefined || result === null) {
        return { status: false, result: null };
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

      return { status: true, result: null };
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
        })
        )
      }
    })
}



// // 게시글 삭제 함수
// const postDelete = async (id:number) => {
//   try {
//     const response = await fetch('/api/notices/delete', {
//       method: 'DELETE',
//       body: JSON.stringify({
//         id: id
//       })
//     });

//     const deleteResponse = await response.json();

//     // console.log('deleteResponse ', deleteResponse);

//     if(deleteResponse.status === 404) {
//       alert('존재하지 않는 게시글 입니다.');
//       router.push('/notices?page=1');

//       // 데이터를 삭제한 후 캐시에서 해당 데이터를 삭제
//       // caches.open('your-cache-name').then((cache) => {
//       //   cache.delete(`http://localhost:9999/mainNotices/${id}`);
//       // });

//       return ;
//     } else if(deleteResponse.status === 200) {
//       alert('게시글이 삭제되었습니다.');
//       router.push('/notices?page=1');

//       // 데이터를 삭제한 후 캐시에서 해당 데이터를 삭제
//       // caches.open('your-cache-name').then((cache) => {
//       //   cache.delete(`http://localhost:9999/mainNotices/${id}`);
//       // });

//       return ;
//     } else {
//       alert('삭제 중 에러가 발생하였습니다. 새로 고침 후 다시 시도해주세요.');
//       return ;
//     }

//   } catch (error) {
//     alert('삭제 중 에러가 발생하였습니다.');
//     return ;
//   }
// }