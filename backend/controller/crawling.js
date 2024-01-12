const cheerio = require('cheerio');
const axios = require('axios');
const { CharacterInfo } = require('../model/index');

exports.lostarkCharacterUpdateCrawling = async (req, res) => {
  // console.log('req ', req.query.characterName);
  const characterName = req.query.characterName;
  let server = '';
  let jobClass = '';
  let itemLevel = 0;
  let guildName = '';
  let itemLevelDate = new Date();
  
  if(characterName.trim() === '' || characterName === undefined || characterName === null) {
    // 캐릭터 이름 값 없음
    res.send('not search name');
    // return false;
  }
  
  try {
    const url = `https://lostark.game.onstove.com/Profile/Character/${characterName}`;
    const responseData = await axios({
      method: 'get',
      url: url
    });

    const $ = cheerio.load(responseData.data);

    server = $('div.content--profile > div.profile-character-info > span.profile-character-info__server').text();
    jobClass = $('div.content--profile > div.profile-character-info > img').attr('alt');
    

    const infoList = $('div.content--profile > div.profile-ingame > div.profile-info');
    itemLevel = $(infoList).find('div.level-info2 > div.level-info2__expedition > span:nth-child(2)').text().replace('Lv.', '').replace(',', '');
    guildName = $(infoList).find('div.game-info > div.game-info__guild > span:nth-child(2)').text();

    // console.log('server ', server.replace('@', '').trim());
    // console.log('jobClass ', jobClass);
    // console.log('itemLevel ', itemLevel);
    // console.log('guildName ', guildName);

    const updateInfo = {
      name: characterName,
      server: server.replace('@', ''),
      jobClass: jobClass,
      itemLevel: Number(itemLevel).toFixed(2),
      guildName: guildName,
      itemLevelDate: itemLevelDate
    }

    const updateResult = await lostarkCharacterUpdateInfo(updateInfo);

    if(updateResult) {
      // 업데이트 성공
      res.send(true);
      // return true;
    } else {
      // 업데이트 실패
      res.send(false);
      // return false;
    }

    
  } catch (err) {
    console.log('character info crawling err ', err);
    res.send(false);
    // return false;
  }
}

const lostarkCharacterUpdateInfo = async (info) => {
  try {
    const characterInfoFind = await CharacterInfo.findOne({
      where: {
        name: info.name
      }
    });

    if(characterInfoFind) {
      let updateInfoResult;

      if(characterInfoFind.itemLevel !== info.itemLevel) {
        updateInfoResult = await CharacterInfo.update({
          server: info.server,
          guildName: info.guildName,
          jobClass: info.jobClass,
        }, {
          where: {
            name: info.name
          }
        });
      } else {
        updateInfoResult = await CharacterInfo.update({
          server: info.server,
          guildName: info.guildName,
          jobClass: info.jobClass,
          itemLevel: info.itemLevel,
          itemLevelUpdateDate: info.itemLevelDate,
        }, {
          where: {
            name: info.name
          }
        });
      }

      if(updateInfoResult > 0) {
        // 업데이트 성공
        return true;
      } else {
        // 업데이트 실패 error
        return false;
      }
      
    } else {
      const createInfo = await CharacterInfo.create(info);
      if(createInfo) {
        // 데이터 새로 생성 성공
        return true;
      } else {
        // 데이터 새로 생성 실패 error
        return false;

      }
    }

  } catch (err) {
    console.log('character update info err ', err);
    return false;
  }
}