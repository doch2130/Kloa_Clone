const cheerio = require('cheerio');
const axios = require('axios');
const { CharacterInfo } = require('../model/index');

exports.lostarkCharacterUpdateCrawling = async (req, res) => {
  const characterName = req.body.characterName;
  const characterImageAddress = req.body.characterImage;
  const engravingList = [];
  const setArmorEffect = req.body.weapon;

  if(req.body.engravingList !== undefined && req.body.engravingList !== null && req.body.engravingList.length > 0) {
    req.body.engravingList.forEach((list) => {
      const level = list.slice(list.indexOf('Lv. ')+4, list.indexOf('Lv. ')+5);
      const name = list.slice(0, list.indexOf(' Lv.'));
      engravingList.push([level, name]);
    });
  }

  let server = '';
  let jobClass = '';
  let battleLevel = Number(req.body.battleLevel);
  let itemLevel = 0;
  let guildName = '';
  let guildMaster = '';
  let itemLevelDate = new Date();
  
  if(characterName.trim() === '' || characterName === undefined || characterName === null) {
    // 캐릭터 이름 값 없음
    res.status(400).send('not search name');
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
    guildMaster = $(infoList).find('div.game-info > div.game-info__guild > span:nth-child(2) > img').length > 0;
    
    const updateInfo = {
      name: characterName,
      server: server.replace('@', ''),
      jobClass: jobClass,
      battleLevel: battleLevel,
      itemLevel: Number(itemLevel).toFixed(2),
      guildName: guildName,
      guildMaster: guildMaster,
      itemLevelDate: itemLevelDate,
      setArmorEffect: setArmorEffect,
      jobEngraving: engravingList,
      imgAddress: characterImageAddress,
    }

    const updateResult = await lostarkCharacterUpdateInfo(updateInfo);

    if(updateResult) {
      // 업데이트 성공
      res.status(200).send({flag: true, message: 'success'});
      // return true;
    } else {
      // 업데이트 실패
      res.status(500).send({flag: true, message: 'fail'});
      // return false;
    }

    
  } catch (err) {
    console.log('character info crawling err ', err);
    res.status(500).send({flag: false, message: 'error'});
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

    let jobEngraving = '';

    if(info.jobEngraving.length > 1) {
      info.jobEngraving.forEach((list) => {
        // console.log('list ', list);
        // console.log('list.join() ', list.join(' '));
        jobEngraving += list.join(' ');
        jobEngraving += '\r\n';
      })
    } else if (info.jobEngraving.length > 0) {
      // console.log('list.join() ', info.jobEngraving[0].join(' '));
      jobEngraving += info.jobEngraving[0].join(' ');
    }

    if(characterInfoFind) {
      let updateInfoResult;

      if(characterInfoFind.itemLevel !== Number(info.itemLevel)) {
        // console.log('itemlevel change');
        updateInfoResult = await CharacterInfo.update({
          server: info.server,
          guildName: info.guildName,
          guildMaster: info.guildMaster,
          jobClass: info.jobClass,
          battleLevel: info.battleLevel,
          itemLevel: info.itemLevel,
          itemLevelUpdateDate: info.itemLevelDate,
          setArmorEffect: info.setArmorEffect,
          jobEngraving: jobEngraving,
          imgAddress: info.imgAddress,
        }, {
          where: {
            name: info.name
          }
        });
      } else {
        // console.log('itemlevel not change');
        updateInfoResult = await CharacterInfo.update({
          server: info.server,
          guildName: info.guildName,
          guildMaster: info.guildMaster,
          jobClass: info.jobClass,
          battleLevel: info.battleLevel,
          setArmorEffect: info.setArmorEffect,
          jobEngraving: jobEngraving,
          imgAddress: info.imgAddress,
        }, {
          where: {
            name: info.name
          }
        });
        
        // 업데이트를 해도 값의 변화가 없으면 [ 1 ] 이 아닌 [ 0 ] 값을 반환해서 return true 설정
        return true;
      }

      if(updateInfoResult > 0) {
        // 업데이트 성공
        return true;
      } else {
        // 업데이트 실패 error
        return false;
      }
      
    } else {
      const updateInfo = {
        name: info.name,
        server: info.server,
        guildName: info.guildName,
        guildMaster: info.guildMaster,
        jobClass: info.jobClass,
        battleLevel: info.battleLevel,
        itemLevel: info.itemLevel,
        itemLevelUpdateDate: info.itemLevelDate,
        setArmorEffect: info.setArmorEffect,
        jobEngraving: jobEngraving,
        imgAddress: info.imgAddress,
      }

      const createInfo = await CharacterInfo.create(updateInfo);
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