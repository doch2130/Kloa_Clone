import { SearchCharacter } from '@/types/characters';


/*
최근 검색 데이터 저장 함수
@ type recently, favorite
@ searchValue input data
@ setStateFunction useStateFunction
*/
export const localStorageSaveHandler = (type:string, searchValue:string, setStateFunction:Function) => {
  if(type === 'recently') {
    const recentlySearchStorage = localStorage.getItem('recentlySearchStorage');
    
    const searchData:SearchCharacter = {
      name: searchValue,
      job: '워로드',
      icon_url: 'http://aaa.com',
      level: 60,
      item_level: 1543,
      max_item_level: 1543,
      guild: '명품길드',
      server: 7
    }
    
    if(recentlySearchStorage !== null) {
      const recentlySearchStorageJson = JSON.parse(recentlySearchStorage);
      recentlySearchStorageJson.unshift(searchData);
      
      if(recentlySearchStorageJson.length > 5) {
        recentlySearchStorageJson.pop();
      }

      localStorage.setItem('recentlySearchStorage', JSON.stringify(recentlySearchStorageJson));
      setStateFunction(recentlySearchStorageJson);
    } else {
      const recentlySearchDataArray = [];
      recentlySearchDataArray.push(searchData);
      localStorage.setItem('recentlySearchStorage', JSON.stringify(recentlySearchDataArray));
      setStateFunction(recentlySearchDataArray);
    }
  }

  return ;
}


/*
검색 데이터 삭제 함수
@ type recently, favorite
@ characterName delete name
@ stateData useState
@ setStateFunction useStateFunction
*/
export const deleteSearchDataHandler = (type:string, characterName:string, stateData:SearchCharacter[], setStateFunction:Function) => {
  const filterData = stateData.filter((item:SearchCharacter) => item.name !== characterName);

  if(type === 'recently') {
    localStorage.setItem('recentlySearchStorage', JSON.stringify(filterData));
  } else {
    localStorage.setItem('favoriteCharactersStorage', JSON.stringify(filterData));
  }

  setStateFunction(filterData);

  return ;
}
