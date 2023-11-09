import { Session } from "next-auth";
import { NoticePost } from "@/type/notice";

export const recomendEventHandler = (postId:string, session:Session | null, postData:NoticePost[] | NoticePost, setPostData:Function) => {
  if(session?.user?.email) {
    fetch(`/api/notices/recomend`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        postId: postId,
      })
    })
      .then(res => res.json())
      .then(res => {
        // console.log('res ', res);
        if(res.status === 200) {

          if(Array.isArray(postData)) {
            const clonePostData = postData.map((el) => {
              if(el.id === postId) {
                el.recomendCount = Number(res.recomendCount);
              }
              return el;
            });
            setPostData(clonePostData);
          } else {
            setPostData((prev: NoticePost) => ({
              ...prev,
              recomendCount: Number(res.recomendCount)
            }))
          }
        }
        return ;
      })
      .catch(error => {
        alert('에러가 발생하였습니다. 새로 고침 후 다시 시도해주세요');
        return ;
      })
  } else {
    alert('로그인 후 추천 가능합니다');
    return ;
  }
}