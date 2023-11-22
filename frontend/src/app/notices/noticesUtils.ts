import { Session } from "next-auth";
import { NoticePost } from "@/type/notice";

export const recomendEventHandler = (postId:number, session:Session | null, postData:NoticePost[] | NoticePost, setPostData:Function) => {
  if(session?.user?.email) {
    fetch(`/api/notices/recomend`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `bearer ${session?.user?.accessToken}`,
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
            }));
          }
        }
        
        if(res.status === 401 && res.redirect === true) {
          // alert('로그인이 만료되었습니다. 로그인 후 다시 시도해주세요');
          return {status: 401, redirect: true};
        }

        return {status: 200, redirect: false};
      })
      .catch(error => {
        // alert('에러가 발생하였습니다. 새로 고침 후 다시 시도해주세요');
        return {status: 500, redirect: false};
      })
  } else {
    // alert('로그인 후 추천 가능합니다');
    return {status: 401, redirect: false};
  }
  return {status: 500, redirect: false};
}