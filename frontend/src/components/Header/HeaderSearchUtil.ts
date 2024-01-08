import { SearchCharacter } from '@/types/characters';


/*
최근 검색 데이터 저장 함수
@ type recently, favorite
@ searchValue input data
@ setStateFunction useStateFunction
*/

type searchDataType = {
  'name': string
  'job': string
  'itemLevel': string
  'server': string
}

// export const localStorageSaveHandler = (type:string, searchValue:string, setStateFunction:Function) => {
export const localStorageSaveHandler = (type:'recently'|'favorite', searchData:searchDataType) => {
  if(type === 'recently') {
    const recentlySearchStorage = localStorage.getItem('recentlySearchStorage');
    
    if(recentlySearchStorage !== null) {
      const recentlySearchStorageJson = JSON.parse(recentlySearchStorage);
      const isCheckName = recentlySearchStorageJson.filter((el:SearchCharacter) => el.name === searchData.name);

      if(isCheckName.length === 0) {
        recentlySearchStorageJson.unshift(searchData);
        
        if(recentlySearchStorageJson.length > 5) {
          recentlySearchStorageJson.pop();
        }

        localStorage.setItem('recentlySearchStorage', JSON.stringify(recentlySearchStorageJson));
      } else {
        const updateRecentlySearchStorageJson = recentlySearchStorageJson.filter((el:SearchCharacter) => el.name !== searchData.name);
        updateRecentlySearchStorageJson.unshift(searchData);

        if(updateRecentlySearchStorageJson.length > 5) {
          updateRecentlySearchStorageJson.pop();
        }

        localStorage.setItem('recentlySearchStorage', JSON.stringify(updateRecentlySearchStorageJson));
      }
    } else {
      const recentlySearchDataArray = [];
      recentlySearchDataArray.push(searchData);
      localStorage.setItem('recentlySearchStorage', JSON.stringify(recentlySearchDataArray));
    }
  } else {
    const favoriteSearchStorage = localStorage.getItem('favoriteCharactersStorage');

    if(favoriteSearchStorage !== null) {
      const favoriteSearchStorageJson = JSON.parse(favoriteSearchStorage);
      const isCheckName = favoriteSearchStorageJson.filter((el:SearchCharacter) => el.name === searchData.name);

      if(isCheckName.length === 0) {
        favoriteSearchStorageJson.unshift(searchData);
        
        if(favoriteSearchStorageJson.length > 5) {
          favoriteSearchStorageJson.pop();
        }

        localStorage.setItem('favoriteCharactersStorage', JSON.stringify(favoriteSearchStorageJson));
      } else {
        const updateFavoriteCharactersStorage = favoriteSearchStorageJson.filter((el:SearchCharacter) => el.name !== searchData.name);
        updateFavoriteCharactersStorage.unshift(searchData);

        if(updateFavoriteCharactersStorage.length > 5) {
          updateFavoriteCharactersStorage.pop();
        }

        localStorage.setItem('favoriteCharactersStorage', JSON.stringify(updateFavoriteCharactersStorage));
      }
    } else {
      const recentlySearchDataArray = [];
      recentlySearchDataArray.push(searchData);
      localStorage.setItem('favoriteCharactersStorage', JSON.stringify(recentlySearchDataArray));
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


export const deleteFavoriteDataHandler = (type:string, searchData:searchDataType) => {
  const favoriteSearchStorage = localStorage.getItem('favoriteCharactersStorage');

  if(favoriteSearchStorage !== null) {
    const favoriteSearchStorageJson = JSON.parse(favoriteSearchStorage);
    const isCheckName = favoriteSearchStorageJson.filter((el:SearchCharacter) => el.name === searchData.name);

    if(isCheckName.length > 0) {
      const updateFavoriteCharactersStorage = favoriteSearchStorageJson.filter((el:SearchCharacter) => el.name !== searchData.name);
      localStorage.setItem('favoriteCharactersStorage', JSON.stringify(updateFavoriteCharactersStorage));
    }
  }
  
  return ;
}