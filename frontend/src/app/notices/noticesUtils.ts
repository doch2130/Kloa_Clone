import { Session } from "next-auth";

export const recomendEventHandler = async (postId:number, session:Session | null) => {
  try {
    if(session?.user?.email) {
      const response = await fetch(`/api/notices/recomend`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `bearer ${session?.user?.accessToken}`,
        },
        body: JSON.stringify({
          postId: postId,
        })
      });

      const res = await response.json();
      // console.log('res ', res);

      if(res.status === 401 && res.redirect === true) {
        // alert('로그인이 만료되었습니다. 로그인 후 다시 시도해주세요');
        return {status: 401, redirect: true};
      }

      return res;
    } else {
      // alert('로그인 후 추천 가능합니다');
      return {status: 401, redirect: false};
    }
  } catch (error) {
    // alert('에러가 발생하였습니다. 새로 고침 후 다시 시도해주세요');
    return {status: 500, redirect: false};
  }
}


export const prevPageChangeHandler = (currentPage:number) => {
  if (currentPage <= 1) {
    return;
  }
  const prevPage = currentPage - 1;
  return `/notices?page=${prevPage}`;
};


export const nextPageChangeHandler = (currentPage:number, btnTotalCount:number) => {
  if (currentPage >= btnTotalCount) {
    return;
  }
  const nextPage = currentPage + 1;
  return `/notices?page=${nextPage}`;
};
